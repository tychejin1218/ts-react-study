# 5~6주차: 데이터 페칭과 상태 관리

> 목표: 실무 React 앱의 표준 구성을 익힌다 — 라우팅, 서버 상태, 클라이언트 상태, 폼.
> 백엔드 경험이 가장 큰 무기가 되는 구간. 캐싱/무효화/낙관적 업데이트 개념이 이미 익숙할 것.

## 핵심 관점: 상태의 두 종류

| | 서버 상태 | 클라이언트 상태 |
|---|---|---|
| 예시 | API로 받아온 사용자 목록 | 모달 열림 여부, 선택된 탭 |
| 소유자 | 서버 (프론트는 캐시일 뿐) | 프론트 |
| 도구 | **TanStack Query** | useState / Zustand |

이 구분을 못 하면 useEffect + useState로 캐시를 직접 구현하는 지옥이 열린다.

## Week 5: 라우팅과 서버 상태

### Day 1-2: React Router
- [ ] `react-router` 설치, 기본 라우트 구성
- [ ] 동적 세그먼트 `/users/:id` + `useParams`
- [ ] 중첩 라우트와 `<Outlet>` — 레이아웃 공유
- [ ] `<Link>` vs `useNavigate`
- [ ] 쿼리 파라미터: `useSearchParams`

### Day 3-5: TanStack Query (핵심)
- [ ] [공식 문서 Quick Start](https://tanstack.com/query/latest/docs/framework/react/quick-start)
- [ ] `useQuery` — queryKey 설계가 전부 (캐시 키 설계와 동일한 감각)
- [ ] 로딩/에러/성공 상태 처리 (`isPending`, `isError`, `data`)
- [ ] `staleTime` vs `gcTime` — 캐시 신선도 정책
- [ ] `useMutation` + `invalidateQueries` — 쓰기 후 캐시 무효화
- [ ] 의존 쿼리(`enabled`), 페이지네이션(`placeholderData`)
- [ ] DevTools 붙여서 캐시 동작 눈으로 확인

### Day 6-7: API 레이어 설계
- [ ] `fetch` 래퍼 또는 `axios`로 API 클라이언트 모듈 분리
- [ ] **Zod**로 응답 런타임 검증: `schema.parse(json)` — 타입은 컴파일 타임, Zod는 런타임
  - `z.infer<typeof schema>`로 타입과 검증을 단일 소스로
- [ ] 에러 처리 전략: HTTP 에러 → 도메인 에러로 변환하는 계층

### Week 5 실습 과제
- [ ] 게시판 CRUD (jsonplaceholder 또는 직접 만든 Spring API 연동):
  - 목록(페이지네이션) / 상세 / 작성 / 삭제
  - TanStack Query로만 서버 상태 관리 — useEffect로 fetch 금지
  - Zod로 모든 응답 검증

## Week 6: 클라이언트 상태와 폼

### Day 8-9: Zustand
- [ ] [공식 문서](https://zustand.docs.pmnd.rs/) — 문서가 짧다. 반나절이면 충분
- [ ] 스토어 생성, 셀렉터로 구독 범위 최소화
- [ ] Context + useState 대비 언제 Zustand가 정당한지 판단 기준 세우기
  - 전역 UI 상태(테마, 사이드바), 여러 페이지가 공유하는 클라이언트 상태
- [ ] ❌ Redux는 지금 배우지 않는다 (팀이 쓰면 그때)

### Day 10-12: React Hook Form + Zod
- [ ] [React Hook Form](https://react-hook-form.com/) 기본: `register`, `handleSubmit`, `formState.errors`
- [ ] `zodResolver`로 Zod 스키마를 폼 검증에 연결 — **API 검증과 폼 검증을 같은 스키마로**
- [ ] 제어 컴포넌트가 필요한 경우 `Controller` 사용 (셀렉트, 날짜 picker 등)
- [ ] 서버 에러를 폼 에러로 매핑하기 (`setError`)

### Day 13-14: 인증 흐름
- [ ] 로그인 → 토큰 저장 전략 (메모리 vs localStorage vs httpOnly 쿠키 — 트레이드오프)
- [ ] 인증 상태에 따른 라우트 보호 (ProtectedRoute 패턴)
- [ ] axios 인터셉터 / fetch 래퍼로 토큰 자동 첨부 + 401 처리(리프레시)

### Week 6 실습 과제
- [ ] 5주차 게시판에 추가:
  - 로그인/로그아웃 (백엔드 직접 만들거나 mock)
  - 글 작성 폼을 RHF + Zod로 재작성
  - 낙관적 업데이트로 좋아요 버튼 구현

## 참고 자료

- [TanStack Query 공식 문서](https://tanstack.com/query/latest)
- [TkDodo's blog - Practical React Query](https://tkdodo.eu/blog/practical-react-query) — TanStack Query 메인테이너의 실전 시리즈, 강력 추천
- [Zod 공식 문서](https://zod.dev/)
