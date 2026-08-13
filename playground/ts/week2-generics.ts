// TS Handbook Day 8-10 실습 기록: 제네릭(Generics)
// 실행: npx tsx week2-generics.ts / 타입 검사만: npx tsc

// 실습 1: 제네릭 함수 — 입력 타입과 출력 타입을 T로 연결
// any로 뭉개면 반환이 any라 안전성을 잃지만, <T>는 타입 정보를 유지한 채 재사용된다
// 호출 시 인자를 보고 T를 자동 역추론 (Java처럼 <number>를 명시하지 않아도 됨)
// → 정리: 제네릭은 "타입을 나중에 정하는" 함수. 입출력 타입 관계를 T로 묶어 안전하게 재사용
function first<T>(arr: T[]): T {
  // tsconfig의 noUncheckedIndexedAccess가 켜져 arr[0]은 T | undefined로 잡힌다
  // (빈 배열 가능성). 여기선 비어있지 않다고 단언(!) — Day 11-12에서 unknown/단언 다룸
  return arr[0]!;
}
const n = first([10, 20, 30]); // n: number (T=number 추론)
const s = first(["a", "b"]); // s: string (T=string 추론)
console.log(n, s); // 10 a

// 하나의 T는 하나의 타입으로 통일된다. 서로 다른 타입을 받으려면 타입 매개변수를 나눈다
// pair<T>(a: T, b: T) 에 (1, "x")를 넘기면 T가 number|string으로 넓혀짐(또는 에러)
// → 각자 다른 타입을 받으려면 <A, B> 로 분리하고 튜플 [A, B] 반환
function pair<A, B>(a: A, b: B): [A, B] {
  return [a, b];
}
const p = pair(1, "x"); // p: [number, string]
console.log(p); // [ 1, 'x' ]

// 실습 2: 제네릭 제약 — <T extends 조건>으로 T가 갖춰야 할 모양을 강제
// 순수 <T>는 T에 대해 아무것도 가정 못 함(.length 접근 불가). 제약을 걸면 그 프로퍼티 사용 가능
// extends는 상속이 아니라 "이 모양을 포함/이 타입에 할당 가능"이라는 구조적 의미
// → 정리: 제약은 "아무 타입"을 "조건을 만족하는 타입"으로 좁혀, 몸통에서 안전하게 쓰게 한다
function len<T extends { length: number }>(x: T): number {
  return x.length; // T가 length를 반드시 가지므로 안전
}
console.log(len("hello"), len([1, 2, 3])); // 5 3
// len(42); // ❌ number엔 length가 없어 에러

type Status = "active" | "inactive" | "pending";
function pickStatus<T extends Status>(s: T): T {
  return s; // extends가 "Status 유니온의 멤버여야 한다"는 제약 (상속 아님)
}
console.log(pickStatus("active")); // active

// 실습 3: keyof / 인덱스 접근 타입 T[K] — 객체에서 키로 값을 타입 안전하게 꺼내기
// keyof T = T의 키들의 리터럴 유니온 / T[K] = 그 키에 해당하는 타입
// K extends keyof T 제약 → 없는 키(오타)는 컴파일 에러, 반환 타입은 키마다 정확
// → 정리: keyof + T[K] + 제약 = "키 안전 + 반환 타입 정확"이 동시에 (실무 관용구)
function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
const user = { name: "kim", age: 30 };
const userName = getProp(user, "name"); // string
const userAge = getProp(user, "age"); // number
console.log(userName, userAge); // kim 30
// getProp(user, "email"); // ❌ "email"은 keyof user가 아니라 에러

const config = { timeout: 3000, retry: true, url: "http://x" };
const retry = getProp(config, "retry"); // boolean
console.log(retry); // true
