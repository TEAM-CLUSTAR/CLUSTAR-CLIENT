/**
 * 이슈/PR 작성자를 담당자(assignee)로 지정해요.
 */
module.exports = async ({ github, context }) => {
  const { pull_request: pullRequest, issue } = context.payload;
  const author = (pullRequest ?? issue).user.login;

  await github.rest.issues.addAssignees({
    ...context.repo,
    issue_number: context.issue.number,
    assignees: [author],
  });
};
