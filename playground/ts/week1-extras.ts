// Week 1 보충: 함수 기본값(default parameter)
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
