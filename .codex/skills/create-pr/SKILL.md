---
name: create-pr
description: >-
  현재 브랜치의 커밋과 diff를 분석해 프로젝트 템플릿에 맞는 한국어 PR 제목과
  본문을 작성하고 gh CLI로 PR을 생성하거나 업데이트한다.
  "PR 만들어줘", "PR 작성해줘", "PR 설명 작성", "PR description 써줘",
  "PR 올려줘", "PR 수정해줘", "create-pr" 요청에 사용한다.
---

# PR 작성 자동화

실제 변경을 설명하는 PR을 작성한다. 아래 문체 규칙은 **생성되는 PR 본문**에 적용한다. 명령은 해당 조건에 필요한 것만 실행한다.

## Step 1. 요청 범위와 대상 확인

저장소의 지침과 PR 템플릿을 읽고 실행 환경을 확인한다.

```sh
git rev-parse --git-dir
git status --short
HEAD_BRANCH=$(git rev-parse --abbrev-ref HEAD)
git remote -v
gh --version
gh auth status
```

사용자가 지정한 PR이 있으면 `gh pr view`로 조회한다. 없으면 현재 브랜치의 열린 PR을 찾는다.

```sh
gh pr list --head "$HEAD_BRANCH" --state open \
  --json number,state,title,body,baseRefName,headRefName,url
```

대상 PR의 번호를 `PR_NUMBER`에 저장하고 조회한 제목·본문·base를 재사용한다. 여러 PR 중 대상을 특정할 수 없으면 확인한다. 조회 실패를 PR 없음으로 취급하지 않는다.

| 요청                         | 실행 경로                            |
| ---------------------------- | ------------------------------------ |
| 설명·초안만 작성             | 작성 결과 출력                       |
| PR 생성·게시, 열린 PR 없음   | 신규 생성                            |
| 기존 PR 전체 재작성          | 전체 업데이트                        |
| 기존 PR 특정 내용 추가·수정  | 부분 수정                            |
| 생성 요청이지만 열린 PR 있음 | 기존 내용 확인 후 업데이트 범위 결정 |

**부분 수정은 요청한 영역에만 작성 규칙을 적용한다.** 기존 문장·섹션·링크·이미지를 일괄 정리하지 않는다. 수정 범위가 불명확하면 사용자에게 확인한다. 기존 본문이 비었거나 템플릿 안내만 있으면 전체 본문을 작성할 수 있다.

## Step 2. 분석 대상과 base 확정

먼저 이번 설명이 다룰 변경을 정한다.

| 작업                                    | 분석 대상                             |
| --------------------------------------- | ------------------------------------- |
| 현재 브랜치 초안·신규 생성·새 커밋 게시 | 로컬 HEAD의 커밋된 변경               |
| 기존 PR 설명만 업데이트                 | GitHub에 게시된 PR의 변경             |
| 기존 문구만 일부 수정                   | 기존 본문과 요청한 수정에 필요한 근거 |

기존 PR에 현재 로컬 작업도 반영해달라는 요청이면 로컬 HEAD와 게시된 PR head의 차이를 확인하고, 미게시 커밋은 Step 5의 커밋 게시 흐름으로 처리한다. 본문은 기존 내용에 해당 작업만 반영한다.

문구만 고치는 작업은 불필요한 fetch·base 재선정·전체 diff 분석을 생략한다. 구현 설명을 추가한다면 해당 변경을 확인한다. 커밋되지 않은 변경은 PR 범위에서 제외하고, 존재할 경우 사용자에게 알린다.

### Base 선택

원격 기준 분석이나 게시가 필요하면 PR 대상 저장소의 원격을 `REMOTE`에 넣고 갱신한다. 이 저장소에서는 일반적으로 `origin`을 사용한다.

```sh
git fetch "$REMOTE" --prune
git branch --remotes
```

`BASE_BRANCH`는 아래 우선순위로 결정한다.

1. 사용자가 명시한 대상 브랜치
2. 기존 PR의 `baseRefName`
3. 신규 stacked PR의 확인된 직전 부모 브랜치
4. 일반 작업 브랜치는 `develop` → `main` → `master` 중 존재하는 첫 브랜치. 현재 브랜치가 `develop`이면 `main`

`BASE_BRANCH`는 게시용 이름, `BASE_REF`는 분석용 원격 참조로 구분한다. 예: `develop`, `origin/develop`. 자기 자신을 base로 삼거나 대상이 불명확한 경우에는 확인한다. 기존 PR의 base를 바꾸려면 Step 5의 변경 조건을 적용한다.

### Stacked PR인 경우

`develop ← feat/a ← feat/b`라면 `feat/b`의 base는 `feat/a`다.

- 사용자가 지정한 부모 브랜치·PR, 기존 base, 명시된 의존 관계를 근거로 판단한다. 다른 미병합 PR의 변경이 포함되어 있으면 부모 후보와 커밋 관계를 확인한다.
- 브랜치명·생성 시점·upstream·공통 조상만으로 부모를 확정하지 않는다. 부모가 이후 진행되었을 수 있으므로 최신 부모 tip이 HEAD의 조상이어야 한다고 강제하지 않는다.
- 부모가 불명확하면 질문하고 게시를 보류한다. 일반 base로 임의 대체하지 않는다.

부모 후보를 `PARENT_BRANCH`에 넣어 필요할 때 검증한다.

```sh
gh pr list --head "$PARENT_BRANCH" --state all \
  --json number,state,baseRefName,headRefName,url
git log --graph --oneline --left-right "${REMOTE}/${PARENT_BRANCH}...HEAD"
```

부모가 확정되면 해당 브랜치와 원격 참조를 base로 사용한다. 부모가 원격에 없으면 먼저 게시가 필요하다고 알린다. 부모 PR을 임의로 생성하지 않는다.

부모 PR이 병합·종료되었거나 브랜치가 삭제되면 관계를 다시 확인한다. 병합된 경우 부모 PR의 base를 새 후보로 검토한다. squash/rebase 병합으로 부모 변경이 다시 diff에 나타날 수 있으므로, 새 비교 범위에 이번 작업만 남는지 확인한다. 임의로 base를 변경하거나 커밋을 정리하지 않는다.

## Step 3. Issue와 변경 사항 확인

### 변경 분석

게시된 PR을 설명할 때는 아래 정보를 사용한다.

```sh
gh pr view "$PR_NUMBER" --json commits
gh pr diff "$PR_NUMBER" --name-only
gh pr diff "$PR_NUMBER"
```

로컬 변경은 `ANALYSIS_HEAD=HEAD`로 분석한다. 기존 PR의 base만 변경하는 경우에는 게시된 PR의 head 커밋을 확보해 `ANALYSIS_HEAD`에 넣고 새 `BASE_REF`와 비교한다. 이때 이전 base의 `gh pr diff`나 미게시 로컬 커밋을 기준으로 작성하지 않는다.

```sh
git log "${BASE_REF}..${ANALYSIS_HEAD}" --oneline
git diff "${BASE_REF}...${ANALYSIS_HEAD}" --name-status
git diff "${BASE_REF}...${ANALYSIS_HEAD}"
```

같은 변경의 전체 diff를 gh와 git으로 중복 조회하지 않는다. 대용량이면 `--stat`으로 범위를 파악하고 `git diff "${BASE_REF}...${ANALYSIS_HEAD}" -- 경로` 등으로 나눠 읽는다. 게시된 PR을 로컬에서 분석할 때도 해당 PR의 head를 사용한다. 미확인 범위는 사용자에게 알린다.

변경 목적, 구현된 기능, 이전과 달라진 동작, 주요 설계 결정, 영향받는 패키지, UI 변화와 리뷰 요청을 파악한다. 커밋 메시지는 의도 파악에 참고하고 최종 구현은 diff로 검증한다. 되돌려진 작업이나 근거 없는 테스트 성공·버그 원인·성능 개선을 작성하지 않는다.

stacked PR은 부모 대비 이번 단계의 작업만 설명한다. 부모 작업을 현재 PR의 성과로 중복 작성하지 않는다.

### 관련 Issue

Issue 번호는 사용자 입력 → 기존 PR 연결 정보 → 명시적인 브랜치명 → 커밋 메시지 순서로 확인한다. 기존 PR에서는 조회한 본문의 명시적 Issue 참조 또는 GitHub에서 확인한 연결 정보를 사용한다. 임의의 숫자를 Issue로 해석하지 않는다.

```sh
gh issue view "$ISSUE_NUMBER" --json number,title,url
```

새 본문·제목 작성에 필요한 번호나 제목을 확인할 수 없으면 사용자에게 직접 입력을 요청한다. 다른 분석은 계속하되 해당 결과의 확정·게시를 보류하며 대체값을 넣지 않는다. Issue와 무관한 부분 수정까지 차단하지 않는다.

## Step 4. 제목과 본문 작성

### PR 제목 작성 규칙

**연결된 Issue 제목의 핵심 표현과 목적을 유지한다.** `{Type}({scope}): {Issue 제목 문구}` 형식이며 scope는 필요할 때만 붙인다. 제목 문구는 아래 Type 목록에 해당하는 `[Feat]`, `Feat:`, `Feat(client):` 등 인식 가능한 type·scope 접두어만 제외한 부분을 사용하고, diff만으로 새 제목을 만들지 않는다.

- **Type:** 관련 Issue 제목의 prefix를 가장 우선해서 사용한다. Issue 제목에서 판단할 수 없으면 브랜치명 → Issue 목적과 diff 순서로 결정한다. 판단이 어려우면 임의로 정하지 않고 사용자에게 확인한다.

  사용 가능한 Type:
  - `Feat`
  - `Init`
  - `Fix`
  - `Docs`
  - `Refactor`
  - `Perf`
  - `HOTFIX`
  - `Test`
  - `Chore`

- **Scope:** 실제 변경 경로와 workspace 정의에서 `client`, `cds-ui`, `cds-icon`, `cds-token` 등을 확인한다. 핵심 기능·API·UI·구조가 바뀐 패키지만 포함하고, 여러 개면 `client, cds-ui`처럼 나열한다. 부수적인 import·lockfile·생성물 변경은 제외한다. 오탈자·서식·문서 수정처럼 범위 설명에 도움이 되지 않으면 생략하고, 루트 공통 변경을 특정 패키지에 억지로 귀속시키지 않는다.
- **여러 Issue:** 사용자가 지정한 대표 Issue를 따른다. 지정이 없으면 핵심 작업의 Issue를 선택하고 불명확하면 확인한다. Summary에는 실제 관련 Issue를 모두 기재한다.
- **일부 구현:** stacked PR 등은 Issue 표현을 유지하며 이번 단계의 범위만 최소한으로 덧붙인다. Issue 제목과 실제 변경이 맞지 않으면 제목을 확인한다.

예: Issue가 `Feat: 메모 편집 기능 추가`이고 client가 핵심 변경 범위라면 `Feat(client): 메모 편집 기능 추가`로 작성한다.

### PR 본문

설명 문장은 자연스러운 `~해요`, `~했어요` 체로 작성하고 `~합니다`, `~했습니다`는 사용하지 않는다. Summary·Tasks·소제목은 명사형이어도 된다.

필수 제목·이모지·순서는 **Summary → Tasks → Describe**로 고정한다. 선택 섹션은 그 뒤에 **To Reviewer → Screenshot** 순서로 둔다.

| 섹션                | 작성 규칙                                                                                                                                                    |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `## 📌 Summary`     | 맨 위에 Issue 인용 목록을 두고, 아래에 PR 전체 변경을 1~2문장으로 요약한다. 세부 구현은 나열하지 않는다.                                                     |
| `## 📚 Tasks`       | 기능·의도 단위의 bullet. 하나에 의미 있는 작업 하나를 담고 비슷한 변경은 합친다. 파일명·함수명 나열이나 커밋 메시지 복사를 피한다.                           |
| `## 🔍 Describe`    | 반드시 `### 소제목 + 설명 문단`. 기존 문제, 변경 이유·동작, 설계 결정을 필요한 만큼 설명한다. 보통 2~4문장을 기준으로 조절하며 Tasks를 단순 반복하지 않는다. |
| `## 👀 To Reviewer` | 구체적인 설계 논의, 요구사항 해석, 집중 검토·검증 요청이 있을 때만 작성한다. 형식적인 리뷰 요청은 쓰지 않는다.                                               |
| `## 📸 Screenshot`  | 화면·레이아웃·스타일·인터랙션·사용자에게 보이는 상태 변화가 있을 때만 첨부 영역을 남긴다. UI 파일 수정 여부만으로 판단하지 않는다.                           |

Summary의 Issue 목록은 반드시 다음 형식으로 작성한다.

```markdown
> - #133
> - #145
```

Screenshot을 추가할 때는 다음 형식을 사용한다. 이미지 경로·Markdown 이미지 문법을 만들거나 필요 없는 As-is / To-be 테이블을 추가하지 않는다.

```markdown
## 📸 Screenshot

<!-- 스크린샷을 첨부해주세요. -->
```

새로 작성하는 영역에는 템플릿 안내와 placeholder를 제거한다. Screenshot 첨부 주석은 유지하고, 활성화한 섹션 제목은 주석으로 감싸지 않는다.

## Step 5. 요청에 맞게 적용

초안 요청이면 작성 결과만 출력한다. GitHub에 반영할 때는 아래 조건에 따라 실행한다.

### 기존 PR 업데이트 조건

- **전체 업데이트:** 실제 본문이 있으면 교체 초안을 보여주고 전체 교체 여부를 확인한다. 이미 명시적으로 전체 교체를 요청했다면 재확인하지 않는다. 빈 본문이나 템플릿 안내만 있는 경우에는 확인을 생략할 수 있다.
- **부분 수정:** 기존 본문에 요청한 부분만 반영한다. `--body-file`은 전체 본문을 교체하므로 보존할 내용까지 포함한 완성본을 전달한다.
- **제목·base:** 각각 요청 범위에 포함된 경우에만 변경한다. base 변경을 제안하는 경우에는 새 base와 변경 범위를 보여주고 동의를 받는다.

적용 직전에 기존 PR의 상태·제목·본문·base를 다시 조회한다. 이후 수정된 내용이 있으면 초안을 재구성하고, 닫히거나 병합된 PR은 임의로 수정하거나 다시 열지 않는다.

### 필요한 커밋 게시

PR 생성·게시 요청에는 해당 브랜치의 일반 push를 포함한다. 설명만 작성·수정하는 요청으로 push하지 않는다. 기존 PR이 있으면 대상 PR의 head와 현재 브랜치가 일치하는지 확인한다.

fetch한 원격 참조로 상태를 확인한다. 참조가 없으면 `git ls-remote --heads "$REMOTE" "refs/heads/$HEAD_BRANCH"`로 존재 여부를 확인하고, 존재하면 참조를 갱신한 뒤 비교한다.

```sh
git rev-list --left-right --count "${REMOTE}/${HEAD_BRANCH}...HEAD"
```

출력은 `원격에만 있는 커밋 수 로컬에만 있는 커밋 수`다. 둘 다 0이면 생략하고, 로컬만 양수이면 `git push "$REMOTE" "$HEAD_BRANCH"`를 실행한다. 원격 브랜치가 없으면 `git push -u "$REMOTE" "$HEAD_BRANCH"`로 게시한다. 원격 쪽이 양수이거나 조회·push에 실패하면 게시를 중단하고 이유를 알린다.

### 생성·수정 명령

완성된 본문은 `mktemp`로 만든 UTF-8 파일 `PR_BODY_FILE`에 기록하고 같은 shell 세션의 `trap`으로 정리한다. 변수는 인용하고, 파일 쓰기에는 구조화된 도구 또는 인용된 heredoc을 사용해 본문의 backtick·`$()`가 실행되지 않게 한다.

열린 PR이 없을 때만 생성한다.

```sh
gh pr create --base "$BASE_BRANCH" --head "$HEAD_BRANCH" \
  --title "$PR_TITLE" --body-file "$PR_BODY_FILE"
```

기존 PR의 base 변경은 승인된 경우에만 먼저 적용하고 새 diff가 분석 범위와 일치하는지 확인한다.

```sh
gh pr edit "$PR_NUMBER" --base "$BASE_BRANCH"
gh pr diff "$PR_NUMBER"
```

본문 수정에는 아래 명령을 사용한다. 제목만 수정할 때는 `--body-file` 대신 `--title "$PR_TITLE"`을 사용하고, 둘 다 수정할 때만 함께 지정한다.

```sh
gh pr edit "$PR_NUMBER" --body-file "$PR_BODY_FILE"
```

## Step 6. 결과 확인

PR 제목·본문·base·URL을 조회해 적용 결과를 확인한다. push 또는 base 변경이 있었다면 게시된 diff와 설명도 일치하는지 확인한다. 생성 실패·시간 초과 시에는 PR 생성 여부를 먼저 조회해 중복 생성을 방지한다. 성공한 작업과 URL, 수행하지 못한 작업이 있으면 그 이유를 알린다.

## 예외 처리

- Git 저장소가 아니면 중단한다. detached HEAD 또는 확정할 수 없는 대상에서는 필요한 정보를 확인한다.
- gh 미설치·인증 실패·권한 부족이면 가능한 로컬 초안을 작성하고 게시 불가 사유와 필요한 gh 설치·`gh auth login` 등을 안내한다.
- fetch 실패 시 최신 상태로 간주하지 않는다. 확인 가능한 범위의 분석만 진행하고, 최신 원격 확인이 필요한 게시는 보류한다.
- 비교 기준 대비 실질적인 변경이 없으면 빈 PR을 생성하지 않는다.
- Issue 조회 실패와 확인된 사용자 제공 정보는 구분하고, 번호·제목을 추측하지 않는다.

## 중요 규칙

- 실제 diff와 커밋에서 확인되는 내용만 작성한다.
- Issue 번호를 임의로 만들지 않는다.
- Summary는 1~2문장, Tasks는 bullet, Describe는 `### 소제목 + 설명` 구조를 사용한다.
- 실제 PR 본문의 설명 문장은 `~해요`, `~했어요` 체를 사용한다.
- To Reviewer는 논의/확인이 필요한 경우에만 작성한다.
- Screenshot은 UI 변경이 있을 때만 남긴다.
- 기존 PR이 있으면 사용자의 기존 내용을 최대한 유지하고 요청한 부분만 수정한다.
- commit, staging, rebase, force push, merge는 하지 않는다.
