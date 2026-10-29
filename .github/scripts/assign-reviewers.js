/**
 * 최근 리뷰 이력을 기준으로 리뷰 부담이 가장 적은 사람을 리뷰어로 지정해요.
 * 리뷰어 목록과 옵션은 .github/reviewer-assignment.json 에서 관리해요.
 */
const fs = require('fs');
const path = require('path');

const CONFIG_PATH = path.join(__dirname, '..', 'reviewer-assignment.json');
const DEFAULT_REVIEWER_COUNT = 1;
const DEFAULT_LOOKBACK_DAYS = 60;

function loadConfig() {
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));

  return {
    reviewers: config.reviewers ?? [],
    reviewerCount: config.reviewerCount ?? DEFAULT_REVIEWER_COUNT,
    lookbackDays: config.lookbackDays ?? DEFAULT_LOOKBACK_DAYS,
  };
}

/** 비활성화됐거나 가중치가 0 이하인 사람, PR 작성자 본인은 제외해요. */
function getCandidates(reviewers, author) {
  return reviewers
    .filter(({ login, enabled = true, weight = 1 }) => {
      return enabled && weight > 0 && login !== author;
    })
    .map(({ login, weight = 1 }) => ({ login, weight }));
}

function getSinceDate(lookbackDays) {
  const since = new Date();
  since.setDate(since.getDate() - lookbackDays);
  return since.toISOString().slice(0, 10);
}

/** 한 PR에서 리뷰를 요청받았거나 리뷰를 남긴 후보자 목록을 구해요. */
async function getPullRequestReviewers({
  github,
  owner,
  repo,
  number,
  candidateLogins,
}) {
  const { data: pullRequest } = await github.rest.pulls.get({
    owner,
    repo,
    pull_number: number,
  });

  const reviews = await github.paginate(github.rest.pulls.listReviews, {
    owner,
    repo,
    pull_number: number,
    per_page: 100,
  });

  const logins = [
    ...pullRequest.requested_reviewers.map(({ login }) => login),
    ...reviews.map(({ user }) => user?.login),
  ];

  return new Set(logins.filter((login) => candidateLogins.has(login)));
}

/** 조회 기간 내 PR들을 돌며 후보자별 리뷰 횟수를 세요. */
async function countRecentReviews({
  github,
  owner,
  repo,
  currentNumber,
  candidates,
  lookbackDays,
}) {
  const candidateLogins = new Set(candidates.map(({ login }) => login));
  const reviewCounts = Object.fromEntries(
    candidates.map(({ login }) => [login, 0]),
  );

  const pullRequests = await github.paginate(
    github.rest.search.issuesAndPullRequests,
    {
      q: `repo:${owner}/${repo} is:pr created:>=${getSinceDate(lookbackDays)}`,
      per_page: 100,
    },
  );

  for (const { number } of pullRequests) {
    if (number === currentNumber) continue;

    const reviewers = await getPullRequestReviewers({
      github,
      owner,
      repo,
      number,
      candidateLogins,
    });

    for (const reviewer of reviewers) {
      reviewCounts[reviewer] += 1;
    }
  }

  return reviewCounts;
}

/** (리뷰 횟수 / 가중치)가 낮은 순, 같으면 리뷰 횟수가 적은 순, 그래도 같으면 무작위로 골라요. */
function pickReviewers({
  candidates,
  reviewCounts,
  alreadyRequested,
  reviewerCount,
}) {
  return candidates
    .filter(({ login }) => !alreadyRequested.has(login))
    .map(({ login, weight }) => ({
      login,
      score: reviewCounts[login] / weight,
      count: reviewCounts[login],
      tieBreaker: Math.random(),
    }))
    .sort(
      (a, b) =>
        a.score - b.score || a.count - b.count || a.tieBreaker - b.tieBreaker,
    )
    .slice(0, reviewerCount)
    .map(({ login }) => login);
}

module.exports = async ({ github, context, core }) => {
  const { owner, repo } = context.repo;
  const currentPullRequest = context.payload.pull_request;
  const { reviewers, reviewerCount, lookbackDays } = loadConfig();

  const candidates = getCandidates(reviewers, currentPullRequest.user.login);

  if (candidates.length === 0 || reviewerCount <= 0) {
    core.info('No eligible reviewer candidates.');
    return;
  }

  const reviewCounts = await countRecentReviews({
    github,
    owner,
    repo,
    currentNumber: currentPullRequest.number,
    candidates,
    lookbackDays,
  });

  const alreadyRequested = new Set(
    currentPullRequest.requested_reviewers.map(({ login }) => login),
  );

  const selectedReviewers = pickReviewers({
    candidates,
    reviewCounts,
    alreadyRequested,
    reviewerCount,
  });

  if (selectedReviewers.length === 0) {
    core.info('No new reviewers to request.');
    return;
  }

  await github.rest.pulls.requestReviewers({
    owner,
    repo,
    pull_number: currentPullRequest.number,
    reviewers: selectedReviewers,
  });

  core.info(`Requested reviewers: ${selectedReviewers.join(', ')}`);
};
