// TS Handbook Day 3-4 실습 기록 (2026-07-30)
// 실행: npx tsx day03-04-core.ts / 타입 검사만: npx tsc

// 실습 1: null vs undefined, 옵셔널 체이닝(?.), null 병합(??)
// undefined = "아직 값 없음"(시스템이 자동 생성) / null = "의도적으로 비움"(사람이 대입)
// 함수가 return 없거나 없는 프로퍼티 접근 시 → undefined
// ?. : 앞이 null/undefined면 거기서 멈추고 undefined 반환 (Optional.map 체인)
// ?? : 왼쪽이 null/undefined면 오른쪽 기본값 사용 (Optional.orElse)
// → 정리: 없음을 안전하게 다룰 땐 ?. 로 접근하고 ?? 로 기본값을 준다
let x: undefined = undefined; // 아직 값 없음
let y: null = null; // 의도적으로 비움

function noReturn() {}
console.log(noReturn()); // undefined (return 없음)

const obj = { a: 1 };
console.log((obj as any).b); // undefined (없는 프로퍼티)

type User = { name: string; address?: { city: string } };
const u1: User = { name: "Kim", address: { city: "Seoul" } };
const u2: User = { name: "Lee" }; // address 없음
console.log(u1.address?.city); // "Seoul"
console.log(u2.address?.city); // undefined (터지지 않음)
console.log(u1.address?.city ?? "도시 미상"); // "Seoul"
console.log(u2.address?.city ?? "도시 미상"); // "도시 미상"

// 함정: || 는 falsy(0, "", false)까지 "없음"으로 취급 → 유효한 0을 덮어씀. 기본값엔 ?? 를 써라
type Config = { timeout?: number };
const c: Config = { timeout: 0 }; // 0 = "즉시"라는 유효한 설정
console.log(c.timeout || 3000); // 3000  ❌ 0을 falsy로 보고 덮어씀 (버그)
console.log(c.timeout ?? 3000); // 0     ✅ 0은 null/undefined가 아니므로 존중

// 실습 2: 리터럴 유니온으로 도메인 모델링 + never 완전성 검사
// type Status = "a" | "b" | ... : 정해진 값들 중 하나만 허용 (enum 대신 커뮤니티 표준)
// 장점: 오타/미정의 값을 컴파일 타임 차단, 런타임 소거로 번들 영향 0, 그냥 문자열이라 API와 바로 호환
// switch + default에서 never로 받으면, Status에 값이 추가됐는데 처리 안 하면 컴파일 에러가 난다
// → 정리: catch-all return은 안전망을 없앤다. 모든 케이스 명시 + never로 케이스 누락을 컴파일 에러화
type Status = "pending" | "active" | "done" | "canceled";

// let s: Status = "active"; // ✅
// s = "activ";              // ❌ 오타를 컴파일 타임에 차단
// s = "deleted";            // ❌ 정의 안 된 상태도 차단

function badge(status: Status): string {
  switch (status) {
    case "pending": return "대기";
    case "active": return "활성";
    case "done": return "완료";
    case "canceled": return "취소";
    default:
      // 모든 케이스를 처리했으면 여기서 status는 never로 좁혀져 통과.
      // 만약 Status에 새 값을 추가하고 case를 안 만들면 이 줄에서 컴파일 에러가 난다.
      const _exhaustive: never = status;
      return _exhaustive;
  }
}
console.log(badge("pending"), badge("active"), badge("done"), badge("canceled"));
// badge("파괴됨"); // ❌ Status에 없는 값 → 컴파일 에러
