// TS Handbook Day 5-7 실습 기록
// 실행: npx tsx day05-07-narrowing.ts / 타입 검사만: npx tsc

// 실습 1: 타입 가드 3종 — typeof / in / instanceof
// typeof: 원시 타입 구분(string/number/boolean) / in: 프로퍼티 존재로 객체 모양 구분
// instanceof: 클래스 인스턴스 구분 (interface엔 못 씀 — 런타임에 소거되므로)
// 각 분기 블록 안에서 타입이 자동으로 좁혀진다(narrowing)
// → 정리: 무엇을 확인하느냐(원시/프로퍼티/클래스)에 따라 가드를 골라 쓴다
function double(x: number | string) {
  if (typeof x === "number") return x * 2; // x: number
  return x.repeat(2); // x: string
}
console.log(double(10), double("ab")); // 20 abab

type Dog = { bark: () => string };
type Cat = { meow: () => string };
function speak(animal: Dog | Cat) {
  if ("bark" in animal) return animal.bark(); // animal: Dog
  return animal.meow(); // animal: Cat
}
console.log(speak({ bark: () => "멍" })); // 멍

function whenIso(x: Date | string) {
  if (x instanceof Date) return x.toISOString(); // x: Date
  return x; // x: string
}
console.log(whenIso(new Date("2026-01-01T00:00:00Z")));

// 함정: typeof null === "object" (JS의 유명한 버그). null 걸러낼 땐 x === null 로 직접 비교
function nullableLen(x: string | null) {
  if (x === null) return 0; // typeof "object" 대신 직접 비교가 명확
  return x.length;
}
console.log(nullableLen("hello"), nullableLen(null)); // 5 0

// 실습 2: 판별 유니온(discriminated union) — TS에서 가장 중요한 패턴
// 각 멤버에 같은 이름의 리터럴 필드(kind)를 두면, 그 필드 하나로 나머지 필드까지 좁혀진다
// switch + default의 never로 완전성 검사 → 도형을 추가하고 case를 안 만들면 컴파일 에러
// → 정리: 공통 리터럴 태그(판별자)로 좁히면 좁히기 + 완전성 검사 + 자동완성이 한 번에
type Circle = { kind: "circle"; radius: number };
type Square = { kind: "square"; side: number };
type Rectangle = { kind: "rectangle"; width: number; height: number };
type Shape = Circle | Square | Rectangle;

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2; // shape: Circle
    case "square":
      return shape.side ** 2; // shape: Square
    case "rectangle":
      return shape.width * shape.height; // shape: Rectangle
    default:
      // 모든 케이스를 처리하면 여기서 shape는 never로 좁혀져 통과.
      // Shape에 새 도형을 추가하고 case를 안 만들면 이 줄에서 컴파일 에러가 난다.
      const _exhaustive: never = shape;
      return _exhaustive;
  }
}
console.log(area({ kind: "circle", radius: 2 }).toFixed(2)); // 12.57
console.log(area({ kind: "square", side: 3 })); // 9
console.log(area({ kind: "rectangle", width: 2, height: 5 })); // 10

// 실습 3: 판별 유니온으로 API 응답 모델링 (실무·React에서 그대로 등장)
// status로 좁히기 전엔 공통 필드 외엔 못 쓴다 → data/message에 안전하게만 접근하도록 강제
// 예: success를 걸러내도 남은 loading엔 message가 없으므로, error까지 좁혀야 message 접근 가능
// → 정리: 각 상태에만 있는 필드는 그 상태로 좁힌 뒤에만 쓸 수 있다. 모든 케이스를 다뤄야 한다
type ApiResult<T> =
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; message: string };

function render(result: ApiResult<string>): string {
  if (result.status === "success") return result.data; // result: success
  if (result.status === "error") return result.message; // result: error
  return "로딩 중..."; // result: loading
}
console.log(render({ status: "success", data: "완료!" }));
console.log(render({ status: "error", message: "실패" }));
console.log(render({ status: "loading" }));
