# 3~4주차: React 기본기

> 목표: React의 렌더링 모델을 정확히 이해한다.
> 교재는 [react.dev](https://react.dev/learn) 공식 문서 하나면 충분하다 (한국어: [ko.react.dev](https://ko.react.dev/learn)).

## 환경 준비

- [ ] `playground/react/` 에 프로젝트 생성: `npm create vite@latest . -- --template react-ts`
- [ ] WebStorm에서 열기 — JSX/TSX 지원, 컴포넌트 자동 완성, Emmet 모두 기본 내장 (별도 플러그인 불필요)
  - `rsc` 등 라이브 템플릿으로 컴포넌트 뼈대 생성 가능 (Settings → Editor → Live Templates → React)
  - 실행/디버그: npm 스크립트 창에서 `dev` 실행, 또는 JavaScript Debug 구성으로 브라우저 디버깅
- [ ] React DevTools 브라우저 확장 설치 — **디버깅 필수 도구**

## Week 3: 컴포넌트와 상태

### Day 1-2: JSX와 컴포넌트
- [ ] [Describing the UI](https://react.dev/learn/describing-the-ui) 섹션 전체
- [ ] JSX 규칙: 단일 루트, `className`, `{}` 표현식, 조건부 렌더링(`&&`, 삼항), 리스트와 `key`
- [ ] 컴포넌트 = props를 받아 JSX를 반환하는 **순수 함수**
- [ ] props 타입 정의: `function Card({ title }: { title: string })` 패턴
- [ ] `children` prop으로 컴포넌트 합성 — 상속이 아니라 합성(composition)이 React의 방식
- [ ] **핵심 멘탈 모델**: 렌더링 = 컴포넌트 함수 재실행. 상태가 바뀌면 함수가 처음부터 다시 실행된다

### Day 3-4: 상태(State)
- [ ] [Adding Interactivity](https://react.dev/learn/adding-interactivity) 섹션 전체
- [ ] `useState` — 상태 선언, setter로만 변경
- [ ] 이벤트 핸들러: `onClick`, `onChange`, 폼 `onSubmit` + `preventDefault`
- [ ] **상태는 스냅샷** — setter 호출 후에도 현재 렌더의 변수값은 안 바뀐다 (여기서 다들 한 번 헤맨다)
- [ ] 함수형 업데이트 `setCount(c => c + 1)` 가 필요한 이유
- [ ] 객체/배열 상태는 **반드시 새 객체로** — 불변 업데이트 (2주차에 연습한 전개 연산자)

### Day 5-7: 상태 설계
- [ ] [Managing State](https://react.dev/learn/managing-state) 섹션 전체
- [ ] 상태 끌어올리기(lifting state up) — 형제 컴포넌트 간 공유
- [ ] 파생 가능한 값은 상태로 두지 않는다 (렌더 중 계산) — **DB 정규화와 같은 원리**
- [ ] 제어 컴포넌트(controlled) vs 비제어 컴포넌트
- [ ] `key`로 컴포넌트 상태 리셋하기

### Week 3 실습 과제
- [ ] Todo 앱: 추가/완료 토글/삭제/필터(전체·완료·미완료) — 라이브러리 없이 `useState`만으로
- [ ] 조건: Todo 타입을 TS로 정의, 필터 상태는 리터럴 유니온 타입으로

## Week 4: Effect와 훅

### Day 8-10: useEffect 제대로 이해하기
- [ ] [Escape Hatches](https://react.dev/learn/escape-hatches) 섹션 전체
- [ ] Effect = **외부 시스템과의 동기화** (API, 타이머, DOM 직접 조작, 구독)
- [ ] 의존성 배열의 의미 — "언제 실행할지"가 아니라 "무엇과 동기화하는지"
- [ ] 클린업 함수 — 구독 해제, 타이머 정리, fetch 중단
- [ ] **필독**: [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
  - 이벤트에 대한 반응 → 이벤트 핸들러에서
  - 파생 값 계산 → 렌더 중에
  - Effect가 정당한 경우는 생각보다 적다
- [ ] Strict Mode에서 Effect가 두 번 실행되는 이유

### Day 11-12: 나머지 핵심 훅
- [ ] `useRef` — 렌더링과 무관한 값 보관, DOM 참조
- [ ] `useContext` — prop drilling 해소. 단, 자주 바뀌는 값에 쓰면 성능 문제
- [ ] `useMemo` / `useCallback` — **일단 개념만**. 미리 최적화하지 말 것
- [ ] 커스텀 훅 만들기: `useLocalStorage`, `useDebounce` 직접 구현
  - 커스텀 훅 = 상태 로직의 재사용 단위 (Spring의 서비스 계층 추출과 비슷한 감각)

### Day 13-14: 스타일링 + 정리
- [ ] 스타일링 방식 하나 선택해서 익히기 — **Tailwind CSS 권장** (유틸리티 클래스, 러닝커브 낮음)
- [ ] 컴포넌트 폴더 구조 컨벤션 훑기 (기능별 분리 vs 타입별 분리)

### Week 4 실습 과제
- [ ] 공개 API 검색 앱: 검색어 입력 → 디바운스 → fetch → 목록 표시
  - 로딩/에러/빈 결과 상태를 판별 유니온으로 관리
  - `useDebounce` 커스텀 훅 직접 구현
  - 클린업으로 경쟁 상태(race condition) 방지 — AbortController 사용

## 자주 빠지는 함정 (백엔드 개발자 특화)

| 함정 | 교정 |
|------|------|
| 상태를 직접 변경 (`arr.push()`) | 항상 새 객체/배열 생성 |
| `useEffect`로 파생 상태 계산 | 렌더 중에 그냥 계산 |
| API 호출 결과를 여러 상태로 분산 | 판별 유니온 하나로 (`loading/success/error`) |
| 클래스로 로직 캡슐화 시도 | 커스텀 훅 + 순수 함수로 분리 |

## 참고 자료

- [react.dev - Learn React](https://react.dev/learn) — 유일한 필수 교재
- [React DevTools 사용법](https://react.dev/learn/react-developer-tools)
