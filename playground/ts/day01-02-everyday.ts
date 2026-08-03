// TS Handbook - Everyday Types 실습 기록
// 실행: npx tsx day01-02-everyday.ts / 타입 검사만: npx tsc

// 실습 1: 타입 추론과 넓히기(widening) — let은 넓게, const는 좁게
// let a = "hello" → string (재할당 가능하니 넓힘) / const b = "hello" → "hello" 리터럴
// let msg2 = msg 도 let이라 다시 string으로 넓혀짐
// → 정리: 추론의 폭은 값이 아니라 "변수가 앞으로 변할 수 있는가"가 정한다
let a = "hello";
const b = "hello";
let n = 42;
let flag = true;
const msg = "hello";
let msg2 = msg;
console.log(a, b, n, flag, msg2);

// 실습 2: 배열·객체 타입 + 구조적 타이핑
// number[] , 타입이 섞이면 (string | number)[] / 객체 타입은 { x: number; y: number } 인라인
// 여분 프로퍼티(z)가 있는 변수 p는 통과 = 필요한 모양만 갖추면 OK (구조적 타이핑)
// 단, 리터럴을 직접 넘길 때만 초과 프로퍼티 검사가 오타 방어로 막는다
// → 정리: 구조적 타이핑이 기본, 리터럴 직접 전달 시에만 초과 프로퍼티 검사 발동
let nums = [1, 2, 3];
let mixed = [1, "two"];
function printCoord(pt: { x: number; y: number }) {
  console.log(`x=${pt.x}, y=${pt.y}`);
}
printCoord({ x: 3, y: 7 });
const p = { x: 3, y: 7, z: 99 };
printCoord(p); // ✅ 변수는 통과 (구조적 타이핑)
// printCoord({ x: 3, y: 7, z: 99 }); // ❌ 리터럴 직접 → 초과 프로퍼티 검사 (z가 타입에 없음)
console.log(nums, mixed);

// 실습 3: 함수 타입과 화살표 함수 — {} 쓰면 return 필수
// 같은 함수를 3가지로: 함수 선언문 / 함수 표현식 / 화살표 (React는 화살표를 주로 씀)
// map 콜백의 s는 타입을 안 써도 string으로 추론됨 (문맥적 타입 부여)
// → 정리: 화살표에 {}를 쓰면 return을 명시해야 하고, 안 쓰면 그 식이 곧 반환값
function add1(a: number, b: number) {
  return a + b;
}
const add2 = function (a: number, b: number) {
  return a + b;
};
const add3 = (a: number, b: number): number => a + b;
console.log(add1(1, 2), add2(3, 4), add3(5, 6));

const upperNames = ["Alice", "Bob"].map((s) => s.toUpperCase());
console.log(upperNames);

// 함정: {}를 쓰고 return을 빠뜨리면 undefined가 반환된다
const wrong = [1, 2, 3].map((x) => {
  x * 2;
}); // → [undefined, undefined, undefined]
const right = [1, 2, 3].map((x) => x * 2); // → [2, 4, 6]
console.log(wrong, right);

// 실습 4: 유니온 타입과 좁히기(narrowing)
// number | string 에서 공통이 아닌 메서드(toUpperCase)는 좁혀야 쓸 수 있다
// typeof 분기 블록 안에서만 타입이 좁혀지고, 블록을 나오면 다시 원래 유니온으로 돌아감
// slice처럼 양쪽 공통 메서드는 좁히기 없이 바로 사용 가능
// → 정리: narrowing은 그 분기 블록 안에서만 살아있다
function printId(id: number | string) {
  if (typeof id === "string") {
    console.log(id.toUpperCase()); // 여기 id: string
  } else {
    console.log(id); // 여기 id: number
  }
}
printId("abc");
printId(42);
function firstThree(x: number[] | string) {
  return x.slice(0, 3); // 공통 메서드라 좁히기 불필요
}
console.log(firstThree([1, 2, 3, 4]), firstThree("hello"));

// 실습 5: 타입 별칭(type) vs 인터페이스(interface) + 구조적 타이핑
// 객체 모양은 둘 다 가능 / 유니온·유틸리티 타입은 type만 가능
// Dog 모양 변수를 Animal(name만 요구)에 대입 → 통과 (implements 없이 구조만 맞으면 OK)
// → 정리: 구조가 호환되면 상속 선언 없이 대입된다 (Java 명목적 타이핑과의 핵심 차이)
type Animal = { name: string };
interface Dog {
  name: string;
  bark: () => void;
}
const dog: Dog = { name: "바둑이", bark: () => console.log("멍") };
const someAnimal: Animal = dog; // ✅ 구조적 타이핑
console.log(someAnimal.name);

// 실습 6: 타입 단언(as)의 위험 + 리터럴 추론 함정
// as는 런타임 검증이 아니라 "믿어줘"라는 약속 → 실제와 다르면 런타임에 터진다
// 아래 raw는 name이 없는데 as Person으로 우긴 예: 컴파일은 통과, 실행 시 💥 (그래서 주석)
// → 정리: 외부 데이터(unknown)는 as로 우기지 말고 typeof/in으로 구조 검사 후 좁혀 쓴다
type Person = { name: string };
// const raw = JSON.parse('{"age": 99}');
// const person = raw as Person;           // 컴파일 통과 (as로 우김)
// console.log(person.name.toUpperCase()); // 런타임 💥 name이 undefined

// 안전한 방식: unknown으로 받아 구조를 직접 검사한 뒤 좁힌다
function toPerson(raw: unknown): Person | null {
  if (typeof raw === "object" && raw !== null && "name" in raw) {
    return raw as Person; // 검사를 통과했으니 근거 있는 as
  }
  return null;
}
console.log(toPerson({ name: "kim" }), toPerson({ age: 99 }));

// 리터럴 추론 함정: 객체 프로퍼티 method는 string으로 넓혀져 "GET"|"POST"에 안 맞음
// as const로 값을 좁혀서 해결한다
function handleRequest(url: string, method: "GET" | "POST") {
  console.log(url, method);
}
// const req = { url: "https://x.com", method: "GET" };
// handleRequest(req.url, req.method); // ❌ method가 string으로 넓혀져 에러
const req2 = { url: "https://x.com", method: "GET" as const }; // method만 "GET"으로 고정
handleRequest(req2.url, req2.method);
const req3 = { url: "https://x.com", method: "GET" } as const; // 객체 전체를 readonly 리터럴로
handleRequest(req3.url, req3.method);
