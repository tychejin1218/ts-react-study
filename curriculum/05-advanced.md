# 심화 과정 (프로젝트 완성 이후)

> 필요해질 때 꺼내 보는 로드맵. 순서 강제 없음 — 프로젝트에서 실제로 부딪힌 순서대로.

## 1. Next.js (App Router)

백엔드 지식이 가장 큰 강점이 되는 영역. SSR/캐싱/스트리밍은 서버 개발 그 자체.

- [ ] [Next.js Learn 코스](https://nextjs.org/learn) 완주
- [ ] 렌더링 방식 구분: SSR / SSG / ISR / CSR — 각각 언제 쓰는지
- [ ] React Server Components(RSC) 멘탈 모델 — 서버 컴포넌트 vs 클라이언트 컴포넌트 경계
- [ ] `fetch` 캐싱과 revalidation (`revalidatePath`, `revalidateTag`)
- [ ] Server Actions로 폼 처리
- [ ] 미들웨어로 인증 처리
- [ ] 실습: 완성한 프로젝트를 Next.js로 포팅 또는 신규 미니 프로젝트

## 2. 테스팅

- [ ] **Vitest** — 단위 테스트 (JUnit 감각 그대로)
- [ ] **React Testing Library** — 철학 먼저: 구현이 아니라 사용자 관점으로 테스트
  - `getByRole` 우선, 스냅샷 테스트는 지양
- [ ] **MSW(Mock Service Worker)** — API 모킹 표준. 백엔드 개발자에게 특히 직관적
- [ ] **Playwright** — E2E 핵심 플로우 2~3개만
- [ ] 실습: 프로젝트의 핵심 기능(폼 제출, 목록 필터)에 테스트 붙이기

## 3. 성능 최적화

**측정 먼저, 최적화는 나중.** 문제가 보일 때만.

- [ ] React DevTools Profiler로 리렌더링 측정
- [ ] `memo` / `useMemo` / `useCallback` — 정확한 적용 기준
- [ ] React 19 Compiler 현황 확인 (수동 메모이제이션 상당 부분 대체)
- [ ] 코드 스플리팅: `lazy` + `Suspense`, 라우트 단위 분할
- [ ] 번들 분석: `rollup-plugin-visualizer`
- [ ] Lighthouse / Core Web Vitals (LCP, CLS, INP) 이해

## 4. 타입스크립트 심화

- [ ] 조건부 타입, `infer`, 매핑된 타입(mapped types)
- [ ] 템플릿 리터럴 타입
- [ ] 제네릭 컴포넌트 설계 (`<Table<T>>` 같은)
- [ ] 이제 [type-challenges](https://github.com/type-challenges/type-challenges) easy~medium 풀어볼 시기
- [ ] 라이브러리 타입 정의(`d.ts`) 읽는 법 — 소스에서 타입 추적하기

## 5. 생태계 넓히기 (관심 가는 것만)

- [ ] 모노레포: pnpm workspace, Turborepo
- [ ] 상태 관리 스펙트럼 이해: Jotai(atomic), Redux Toolkit(팀 표준일 때)
- [ ] 애니메이션: Framer Motion
- [ ] 컴포넌트 문서화: Storybook
- [ ] 접근성(a11y) 기본기

## 꾸준히 볼 것

- [TkDodo's blog](https://tkdodo.eu/blog) — React Query와 React 패턴
- [Josh Comeau](https://www.joshwcomeau.com/) — CSS/React 인터랙티브 글
- [Kent C. Dodds](https://kentcdodds.com/blog) — 테스팅과 React 철학
- React 공식 블로그 — 버전별 변경사항
