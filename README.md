# TypeScript & React 학습 커리큘럼

백엔드 개발자(Java/Spring)를 위한 8주 프론트엔드 학습 로드맵.

## 목표

- TypeScript로 타입 안전한 코드를 자연스럽게 작성한다
- React의 렌더링 모델을 정확히 이해하고 관용적인(idiomatic) 코드를 쓴다
- 실제 API와 연동되는 작은 앱을 처음부터 끝까지 완성한다

## 진행 방법

1. 각 주차 문서의 체크박스를 순서대로 진행한다
2. **읽기만 하지 않는다** — 모든 개념은 코드로 직접 쳐본다
3. 학습하며 알게 된 내용은 `notes/` 아래에 마크다운으로 정리한다
4. 실습 코드는 `playground/`(1~4주차), 프로젝트는 `project/`(5주차~)에 커밋한다
5. 주차는 가이드일 뿐이다. 빠르면 당겨도 되고, 막히면 늘려도 된다
6. 이 폴더에서 Claude Code를 열면 **튜터 모드**로 동작한다 ([CLAUDE.md](CLAUDE.md)):
   - `/explain <개념>` — 강사식 심화 설명 (백엔드 비유 → 원리 → 예제 → 함정 → 확인 질문)
   - `/quiz [주차|주제]` — 배운 범위에서 5문제 출제·채점·해설
   - `/review [경로]` — 실습 코드를 교육 관점으로 리뷰 (직접 고쳐주지 않음)

## 커리큘럼 구성

| 주차 | 문서 | 주제 |
|------|------|------|
| 1~2주 | [01-typescript.md](curriculum/01-typescript.md) | TypeScript 핵심 |
| 3~4주 | [02-react-fundamentals.md](curriculum/02-react-fundamentals.md) | React 기본기 |
| 5~6주 | [03-react-data-state.md](curriculum/03-react-data-state.md) | 데이터 페칭과 상태 관리 |
| 6~8주 | [04-project.md](curriculum/04-project.md) | 실전 프로젝트 |
| 이후 | [05-advanced.md](curriculum/05-advanced.md) | 심화 (Next.js, 테스팅, 성능) |

## 디렉터리 구조

```
ts-react-study/
├── README.md          ← 이 파일
├── curriculum/        ← 주차별 상세 커리큘럼
├── notes/             ← 학습 노트 (TIL)
├── playground/        ← 개념 실습용 코드
└── project/           ← 실전 프로젝트
```

## 핵심 원칙 (백엔드 개발자 관점)

- **TS는 Java가 아니다.** 클래스/상속보다 구조적 타이핑 + 함수형 스타일이 기본
- **렌더링 = 함수 재실행.** React 컴포넌트는 상태가 바뀔 때마다 통째로 다시 실행되는 함수다. 이 멘탈 모델이 모든 것의 기반
- **useEffect는 최후의 수단.** 백엔드 개발자가 가장 많이 오용하는 API
- **서버 상태와 클라이언트 상태는 다르다.** API 데이터는 TanStack Query, UI 상태만 useState/Zustand
