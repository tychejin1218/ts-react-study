// TS Handbook - The Basics 실습 기록 (2026-07-20)
// 실행: npx tsx basics.ts / 타입 검사만: npx tsc

// 실습 1: 정적 타입 검사 — TS는 "실행 전에" 오류를 잡는다
// string 값을 함수처럼 호출 → 에디터가 즉시 에러 표시 (This expression is not callable)
// 단, tsx는 타입 검사 없이 실행만 하므로 그대로 돌리면 런타임 TypeError로 터진다
// → 정리: TS에서 "타입 검사"와 "실행"은 완전히 분리된 별개 단계다
// const message = "hello typescripot"
// message();

// 실습 2: 타입 소거(type erasure) — 컴파일하면 타입은 흔적 없이 사라진다
// npx tsc로 나온 .js에는 person: string, date: Date의 타입 표기가 전부 제거됨
// Java는 .class에 시그니처가 남고 JVM이 런타임 검증하지만, TS 런타임엔 타입이 아예 없다
// → 정리: 타입은 개발 시점의 도구일 뿐. 런타임에 들어오는 외부 데이터는 지켜주지 못한다
// function greet(person: string, date: Date) {
//   console.log(`Hello ${person}, today is ${date.toDateString()}!`);
// }
//
// greet("jinyeong", new Date());

// 실습 3: strictNullChecks + 타입 좁히기(narrowing) 맛보기
// string | null 은 "null일 수 있음"을 타입으로 명시 → 검사 없이 s.length 접근하면 컴파일 에러
// if (s == null) return 0; 뒤에서는 컴파일러가 s를 string으로 좁혀줘서(narrowing) 통과
// → 정리: Java의 NPE를 컴파일 타임으로 끌어온 것. 좁히기는 Day 5-7에서 본격적으로
// function len(s: string | null): number {
//   if(s == null) return 0;
//   return s.length;
// }

// 실습 4: interface는 런타임에 존재하지 않는다 — instanceof 불가
// x instanceof User → error TS2693: 'User' only refers to a type, but is being used as a value here.
// instanceof는 JS 런타임 연산자라 오른쪽에 "값"이 필요한데, interface는 컴파일 시 완전히 소거됨
// Java는 인터페이스가 런타임에 Class 객체로 존재해서 instanceof가 되지만 TS는 불가능
// (예외: class는 컴파일 후에도 생성자 함수로 남아서 instanceof 가능)
// → 정리: 런타임 타입 확인은 구조를 직접 검사한다 — typeof, in (Day 5-7의 narrowing)
// interface User {
//   name: string;
// }
//
// const x: unknown = { name: "jinyeong" };
//
// if (x instanceof User) {
//   console.log("User다!");
// }

// 보너스: tsc는 타입 에러가 있어도 기본적으로 .js를 생성한다 (--noEmitOnError로 차단 가능)
// → 정리: Java의 "컴파일 실패 = 빌드 중단"과 달리, TS는 그것조차 옵션이다
