# Repository Guidelines

## Project Structure & Module Organization
- `package.json`, `package-lock.json`: 확장 메타정보, 스크립트, 의존성 고정.
- `out/extension.js`: 확장 진입점. `onStartupFinished` 에서 Screencast 모드를 전역 설정으로 활성화.
- `.vscodeignore`: VSIX 패키징 시 포함하지 않을 항목 정의.
- `.gitignore`: 로컬 산출물(`node_modules/`, `*.vsix`) 제외.
- 아직 `src/`, `test/` 디렉터리는 없다. 새 모듈·테스트 추가 시 디렉터리를 만든 뒤 README를 함께 갱신한다.

## Build, Test, and Development Commands
- `npm install` — 의존성 설치. Node 20 LTS 이상 필수.
- `npm run lint` — 현재는 자리표시자. 추후 ESLint 혹은 Prettier를 연결하면 여기서 실행하도록 한다.
- `npm run package` — `npx --yes @vscode/vsce package` 로 VSIX 생성. 산출물 이름은 `always-screencast-<version>.vsix`.
- `npm run install:vscode` — 위 패키징을 수행한 뒤 `code --install-extension always-screencast-*.vsix` 로 VS Code에 설치한다. VS Code CLI가 PATH에 있어야 한다.

## Coding Style & Naming Conventions
- JavaScript는 ES2020 이상 기준. `async/await` 사용, `console.error` 로 에러 로깅.
- 설정 키는 VS Code 공식 명칭(`screencastMode.enabled`) 그대로 사용.
- 새 코드 파일은 2칸 스페이스 인덴트를 기본으로 한다. 필요 시 `npm run lint` 확장 계획에 맞춰 포매터 도입.
- 배포 시점에 미사용 의존성은 추가하지 않는다. Node 20 미만 환경 호환은 고려하지 않는다.

## Testing Guidelines
- 현재 자동화 테스트 없음. 기능 추가 시 `vscode-test` 기반 통합 테스트를 `test/` 폴더에 배치하고 `npm test` 스크립트 추가.
- 수동 검증 절차: 확장 설치 → VS Code 재시작 → Screencast Mode가 자동 활성화되는지 확인 → 필요 시 개발자 도구 콘솔에서 에러 체크.
- 버그 재현과 수동 테스트 체크리스트는 README 또는 이 문서에 기록해 반복 검증 가능하도록 한다.

## Commit & Pull Request Guidelines
- 커밋 메시지 권장 형식: `type(scope): summary`. 예) `feat(core): enforce screencast mode at startup`.
- PR에는 목적, 구현 요약, 수동 테스트 결과, 관련 이슈 링크를 포함한다. UI 변경 시 적용된 UX 톤을 명시.
- PR 전 `git status` 로 불필요한 산출물(.vsix, node_modules 등)이 없는지 확인한다.
- 변경된 스크립트는 실제로 실행 가능한 환경(Node 20+, VS Code CLI)에서 한 번 이상 실행해 본다.
- `main` 으로 머지하기 전 `package.json` 버전을 올려서 자동 릴리즈 태그 충돌을 방지한다.

## UI Writing Style Reference

<uxui_writing_style>
톤: 토스 구어체형 높임말  
특징:
- 자연스럽고 친근한 구어체 높임말 사용
- 구체적인 상황·시간 정보를 포함해 사용자가 혼란 없도록 안내
- 필요 시 추가 행동 유도 문장을 더하되 부담스럽지 않게 표현
- 엔드유저(UI) 메시지 전용 규칙이며, 에이전트가 유저에게 답변할 때 쓰는 말투가 아님  
예시:
1. 지금 설정을 바꾸는 중이에요. 조금만 기다려 주세요!
2. Screencast 모드 아직 켜는 중이에요. 보통 몇 초 뒤에 끝나요.
3. 입력 기록을 바로 보여드릴게요. 필요하면 언제든 꺼도 돼요.
4. 지금은 이미 켜져 있어요. 바로 사용하셔도 좋아요.
5. 설정 반환 중이에요. 곧 원래대로 돌아갈 거예요.
</uxui_writing_style>
