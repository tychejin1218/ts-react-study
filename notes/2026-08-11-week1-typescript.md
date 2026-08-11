# Week 1: TypeScript 핵심 (TIL)

> 목표였던 "에러 메시지를 읽고 스스로 타입을 설계하는 수준" 도달.
> 관통하는 한 문장: **TS 타입은 런타임에 소거된다. 그래서 안전은 "컴파일 타임에" 확보해야 한다.**

## 1. 타입 소거 (type erasure)

- 컴파일하면 타입 표기(`: string` 등)가 **전부** 사라진 순수 JS만 남는다.
- Java 제네릭은 *부분* 소거(`List`는 런타임에 남음), TS는 *전체* 소거.
- 결과: `interface`는 런타임에 없다 → `x instanceof MyInterface` **불가**.
- 런타임 타입 확인은 구조를 직접 검사해야 함 → `typeof`, `in`, [[2026-08-11-week1-typescript]]의 narrowing.
- `tsx`는 타입 검사 없이 실행만 함. 타입 검사는 `tsc --noEmit`으로 별도.

## 2. 타입 추론과 넓히기 (widening)

- 추론의 폭은 값이 아니라 **"변수가 앞으로 변할 수 있는가"**가 정한다.
- `let a = "hello"` → `string` (넓힘) / `const b = "hello"` → `"hello"` (리터럴).
- 객체는 `const`여도 프로퍼티가 넓혀짐(`{ x: 0 }`의 x는 `number`) — 내용물은 바뀔 수 있으니.
- 좁게 고정하려면 `as const`.

## 3. 구조적 타이핑 (structural typing)

- 이름이 아니라 **구조(모양)**로 타입 호환을 판단. `implements` 없이 모양만 맞으면 대입 OK.
- Java의 명목적(nominal) 타이핑과 갈리는 결정적 차이.
- 예외: 객체 **리터럴을 직접** 넘길 때만 초과 프로퍼티 검사가 오타를 잡는다.

## 4. null / undefined 다루기

- `undefined` = 시스템이 만드는 없음(미할당/없는 프로퍼티/무반환), `null` = 사람이 넣는 없음.
- `?.` (옵셔널 체이닝): 앞이 null/undefined면 멈추고 undefined 반환.
- `??` (null 병합): 왼쪽이 null/undefined일 때만 기본값 사용.
- **함정**: 기본값에 `||`를 쓰면 `0`, `""`, `false`까지 덮어씀 → 기본값에는 `??`.

## 5. 리터럴 유니온으로 도메인 모델링

- `type Status = "pending" | "active" | "done"` — enum보다 먼저, 더 자주.
- 장점: 오타/미정의 값 컴파일 타임 차단, 런타임 소거(번들 0), 그냥 문자열이라 API와 바로 호환.

## 6. 좁히기 (narrowing)

- 가드 3종: `typeof`(원시) / `in`(프로퍼티 존재) / `instanceof`(클래스, interface엔 불가).
- narrowing은 **그 분기 블록 안에서만** 유효. 블록을 나오면 원래 유니온으로 복귀.
- 함정: `typeof null === "object"` → null은 `x === null`로 직접 비교.

## 7. 판별 유니온 (discriminated union) ⭐ 이번 주 핵심

- 각 멤버에 공통 이름의 **리터럴 판별자**(`kind`)를 둔다.
- 판별자로 `switch`하면 각 case에서 그 상태의 고유 필드에만 접근 가능(좁히기).
- `default`에서 `const _: never = x`로 **완전성 검사** → 상태 추가 후 처리 누락 시 컴파일 에러.
- 공통 필드는 `Base & (…|…)` 교집합(intersection)으로 중복 제거.
- 실전: `ApiResult<T>` (loading/success/error), 주문 상태 모델링. React(3주차)에서 그대로 등장.

## 8. as / unknown

- `as`는 런타임 검증이 아니라 "믿어줘"라는 **약속** → 실제와 다르면 런타임에 터짐.
- 외부 데이터는 `any`(검사 끄기)가 아니라 `unknown`으로 받고, 구조 검사 후 좁혀 쓴다.
- 검사를 통과한 뒤의 `as`는 근거가 있으니 괜찮음. (실무에선 Zod가 대신 — 5주차)

## 아직 안 한 것 (Week 1 잔여)

- 함수 기본값(default parameter) `function f(x = 10)`.
- 사용자 정의 타입 가드 `function isFoo(x): x is Foo`.
