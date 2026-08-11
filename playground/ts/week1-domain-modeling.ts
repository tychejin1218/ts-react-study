// Week 1 실습 과제: 상태 전이가 있는 도메인(주문)을 판별 유니온으로 모델링
// 실행: npx tsx week1-domain-modeling.ts / 타입 검사만: npx tsc

// 설계: "고유 vs 공통"을 먼저 나눈다 (nullable 컬럼일수록 특정 상태에만 있는 고유 데이터)
//
// [공통] 모든 상태가 가짐:  orderId, items(상품 목록), totalPrice
// [상태별 고유]
//   cart(장바구니)            | (없음)
//   pending_payment(결제대기) | (없음)   — 고유 데이터 없는 상태도 정상 (ApiResult의 loading처럼)
//   paid(결제완료)            | paymentId, paidAt
//   shipping(배송중)          | trackingNumber(송장번호)
//   delivered(배송완료)       | deliveredAt
//   canceled(취소)            | reason, canceledAt
//
// → 정리: 각 상태가 그 상태에서만 유효한 데이터를 갖게 하면,
//         "장바구니 주문의 결제ID 접근" 같은 불가능한 조합이 컴파일 타임에 봉쇄된다

// 방법 A(기본형): 공통 필드를 각 상태에 그대로 반복해도 동작한다 (단, 중복이 많음)
// type OrderCart = { kind: "cart"; orderId: string; items: string[]; totalPrice: number };
// type OrderPaid = { kind: "paid"; orderId: string; items: string[]; totalPrice: number; paymentId: string; paidAt: Date };
// ... (나머지 상태도 동일하게 공통 3필드 반복) ...
// type Order = OrderCart | OrderPaid | ...;

// 방법 B(개선형): 공통 필드를 OrderBase로 빼고 교집합(&)으로 결합해 중복 제거
// & = intersection(이것도 갖고 저것도 갖는다), | = union(둘 중 하나) — 서로 반대 개념
type OrderBase = {
  orderId: string;
  items: string[];
  totalPrice: number;
};

type Order = OrderBase &
  (
    | { kind: "cart" }
    | { kind: "pending_payment" }
    | { kind: "paid"; paymentId: string; paidAt: Date }
    | { kind: "shipping"; trackingNumber: string }
    | { kind: "delivered"; deliveredAt: Date }
    | { kind: "canceled"; reason: string; canceledAt: Date }
  );

// 처리 함수: switch(order.kind) 로 좁히면 각 case에서 그 상태의 고유 필드에만 접근 가능
// default의 never = 완전성 검사 → Order에 상태를 추가하고 case를 안 만들면 컴파일 에러
function describe(order: Order): string {
  switch (order.kind) {
    case "cart":
      return `장바구니: ${order.items.length}개, ${order.totalPrice}원`;
    case "pending_payment":
      return `결제 대기: ${order.totalPrice}원`;
    case "paid":
      return `결제 완료: ${order.paymentId} (${order.paidAt.toISOString()})`;
    case "shipping":
      return `배송 중: 송장 ${order.trackingNumber}`;
    case "delivered":
      return `배송 완료: ${order.deliveredAt.toISOString()}`;
    case "canceled":
      return `취소됨: ${order.reason}`;
    default:
      const _exhaustive: never = order;
      return _exhaustive;
  }
}

const paid: Order = {
  kind: "paid",
  orderId: "A1",
  items: ["p1", "p2"],
  totalPrice: 30000,
  paymentId: "PAY-9",
  paidAt: new Date("2026-01-01T00:00:00Z"),
};
const cart: Order = { kind: "cart", orderId: "A2", items: ["p3"], totalPrice: 5000 };
console.log(describe(paid));
console.log(describe(cart));

// 직접 해본 실험(둘 다 컴파일 에러를 유발하므로 주석):
// 1) 좁히기: case "cart" 안에서 order.paymentId 접근 → cart엔 없는 필드라 에러
// 2) 완전성 검사: Order에 { kind: "refunded"; refundedAt: Date } 추가 후 case 미작성
//    → describe의 never 줄에서 "refunded는 never에 대입 불가" 컴파일 에러
