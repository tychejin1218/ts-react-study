// Week 1 보충: 함수 기본값(default parameter) + 사용자 정의 타입 가드(x is Foo)
// 실행: npx tsx week1-extras.ts / 타입 검사만: npx tsc

// 실습 1: 함수 기본값 — 인자를 안 넘기면 기본값 사용 (Java의 메서드 오버로딩 대체)
// 기본값이 있으면 그 매개변수의 타입은 자동 추론되어 : 타입 표기를 생략할 수 있다
// → 정리: `= 기본값`은 오버로딩 없이 "생략 가능한 인자"를 만든다. 기본값 매개변수는 오른쪽에 둔다
function greet(name: string, greeting = "안녕") {
  return `${greeting}, ${name}`;
}
console.log(greet("김", "반가워")); // 반가워, 김
console.log(greet("김")); // 안녕, 김 (greeting 생략 → 기본값)

// 선택적 매개변수(?) vs 기본값(=)의 차이:
//   x?: number     → 타입은 number | undefined (안 넘기면 undefined)
//   x: number = 10 → 타입은 number            (안 넘기면 10, undefined가 안 붙음)
function optionalParam(x?: number) {
  return x; // x: number | undefined
}
function defaultParam(x = 10) {
  return x; // x: number
}
console.log(optionalParam(), defaultParam()); // undefined 10

// 실습 2: 사용자 정의 타입 가드 — 반환 타입을 `x is Foo`로 쓰면 호출한 쪽에서 타입이 좁혀진다
// 일반 boolean 함수는 좁히기 효과가 없다. 로직이 같아도 반환 타입만 다르면 결과가 갈린다
// 주의: typeof x === "object" 뒤엔 반드시 x !== null (typeof null === "object"라 in 연산자가 터짐)
// → 정리: x is Foo는 "참이면 이 타입"이라는 약속. TS는 로직을 검증하지 않으니 몸통은 개발자 책임(as와 같은 성질)
type Person = { name: string };

function isPerson(x: unknown): x is Person {
  return typeof x === "object" && x !== null && "name" in x;
}

const raw: unknown = { name: "kim" };
if (isPerson(raw)) {
  console.log(raw.name); // raw가 Person으로 좁혀짐 → as 없이 안전 접근
} else {
  console.log("Person 아님");
}
console.log(isPerson(null), isPerson({ name: "lee" })); // false true

// 함정 기록: x !== null 을 빼면 isPerson(null) 호출 시
// typeof null === "object"가 true라 "name" in null 에서 런타임 TypeError 발생
