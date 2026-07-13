# 1~2주차: TypeScript 핵심

> 목표: TS 문법을 "아는" 수준이 아니라, 에러 메시지를 읽고 스스로 타입을 설계할 수 있는 수준.
> Java 경험자 기준으로 문법 자체는 쉽다. 함정은 Java식 사고를 그대로 가져오는 것.

## 환경 준비

- [ ] Node.js LTS 설치 (nvm 권장: `brew install nvm`)
- [ ] WebStorm 설정 (IntelliJ와 단축키·워크플로 동일):
  - Settings → Languages & Frameworks → JavaScript → Prettier → **Automatic Prettier configuration** + Run on save 체크
  - ESLint는 프로젝트에 설정 파일이 있으면 자동 인식됨 (Automatic ESLint configuration 확인)
- [ ] 실습 환경: `playground/ts/` 에 `npm create vite@latest . -- --template vanilla-ts` 또는 [TS Playground](https://www.typescriptlang.org/play) 활용

## Week 1: 기본 타입 시스템

### Day 1-2: 기본 문법
- [ ] [TS Handbook - The Basics](https://www.typescriptlang.org/docs/handbook/2/basic-types.html) 읽기
- [ ] 원시 타입, 배열, 객체 타입 선언
- [ ] `let` vs `const`와 타입 추론 — **명시적 타입 선언을 최소화하고 추론에 맡기는 게 관용적**
- [ ] 함수 타입: 매개변수, 반환 타입, 선택적 매개변수(`?`), 기본값
- [ ] 화살표 함수 문법 완전히 익히기 (React에서 계속 쓴다)

### Day 3-4: TS의 핵심 차별점
- [ ] **구조적 타이핑(structural typing)** 이해 — Java의 명목적(nominal) 타이핑과의 결정적 차이
  - 같은 구조면 같은 타입. `implements` 없이도 호환된다
- [ ] **유니온 타입** `string | null` — Java의 Optional을 타입 레벨로 끌어온 것
- [ ] **리터럴 타입** `type Status = 'pending' | 'active' | 'done'` — enum보다 이걸 먼저, 더 자주 쓴다
- [ ] `interface` vs `type` — 실무 기준: 객체 형태는 아무거나 일관되게, 유니온/유틸리티는 `type`
- [ ] `null` vs `undefined`, 옵셔널 체이닝 `?.`, null 병합 `??`

### Day 5-7: 타입 좁히기(Narrowing)
- [ ] [TS Handbook - Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) 정독
- [ ] `typeof`, `in`, `instanceof` 가드
- [ ] **판별 유니온(discriminated union)** — TS에서 가장 중요한 패턴
  ```ts
  type ApiResponse<T> =
    | { status: 'success'; data: T }
    | { status: 'error'; message: string };
  ```
- [ ] `never`를 이용한 완전성 검사(exhaustiveness check) — switch문에서 케이스 누락을 컴파일 에러로
- [ ] 사용자 정의 타입 가드 (`x is Foo`)

### Week 1 실습 과제
- [ ] 백엔드에서 다루던 도메인 하나(예: 주문, 결제)를 TS 타입으로 모델링해보기
  - 상태 전이가 있는 도메인을 판별 유니온으로 표현할 것

## Week 2: 제네릭과 실전 패턴

### Day 8-10: 제네릭
- [ ] 제네릭 함수, 제네릭 타입 — Java 제네릭과 거의 같지만 추론이 훨씬 강력
- [ ] 제약 조건 `<T extends { id: string }>`
- [ ] `keyof`, 인덱스 접근 타입 `T[K]`
- [ ] 유틸리티 타입 암기 수준으로: `Partial`, `Required`, `Pick`, `Omit`, `Record`, `ReturnType`

### Day 11-12: 안전성 관련
- [ ] `any` vs `unknown` — `any`는 금지, 외부 데이터는 `unknown`으로 받고 좁혀서 사용
- [ ] 타입 단언 `as`의 위험성 — 컴파일러를 속이는 것이지 변환이 아님
- [ ] `strict: true`가 켜는 옵션들 이해 (`strictNullChecks`가 핵심)
- [ ] `tsconfig.json` 주요 옵션 한 번 훑기: `target`, `module`, `strict`, `paths`

### Day 13-14: 비동기 + 모던 JS 문법 보충
- [ ] `Promise<T>`, `async/await` — CompletableFuture보다 훨씬 단순함
- [ ] 구조 분해 할당, 전개 연산자(`...`) — React에서 매일 쓴다
- [ ] 배열 메서드 체이닝: `map`, `filter`, `reduce`, `find`, `some`, `every` — Stream API와 대응
- [ ] 불변 업데이트 패턴: `{ ...obj, name: 'new' }`, `[...arr, item]` — **React 상태 관리의 전제조건**
- [ ] ES 모듈: `import`/`export`, default export vs named export

### Week 2 실습 과제
- [ ] `fetch`로 공개 API(예: https://jsonplaceholder.typicode.com) 호출해서:
  - 응답 타입 정의 → `unknown`으로 받아 검증 → 화면 없이 콘솔에 가공 출력
  - 에러 케이스를 판별 유니온 `Result<T, E>` 타입으로 감싸보기

## 이 단계에서 하지 말 것

- ❌ type-challenges 같은 고급 타입 퍼즐 (재미있지만 지금은 수익률 낮음)
- ❌ 데코레이터, namespace, enum 깊이 파기 (레거시/특수 용도)
- ❌ 클래스 중심 설계 — TS/React 생태계는 함수 + 객체 리터럴이 기본

## 참고 자료

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) — 공식, 필독
- [TypeScript Deep Dive (한국어)](https://radlohead.gitbook.io/typescript-deep-dive) — 사전처럼 참고용
- 인프런 캡틴판교 「타입스크립트 입문」 — 강의 선호 시
