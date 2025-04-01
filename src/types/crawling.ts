// 네이버 금융 시가총액 데이터 타입
export interface NaverFinanceItem {
  종목명: string;
  현재가: number;
  전일비: number;
  등락률: number;
  거래량: number;
  거래대금: number;
  매수호가: number;
  매도호가: number;
  시가총액: number; // 단위: 억
  PER: number;
  ROE: number;
}

// 쿠팡 제품 검색 결과 타입
export interface CoupangItem {
  제품명: string;
  가격: number;
  평점: number | null; // 평점이 없을 수도 있음
  리뷰수: number | null; // 리뷰 수가 없을 수도 있음
  링크: string;
}

// --- Add Naver Real Estate Type --- 
export interface NaverRealEstateItem {
  매물번호: string;
  매물명: string;
  거래유형: string; // "매매", "전세", "월세"
  층정보: string; // 예: "중/42"
  가격: string; // 예: "45억", "10억 / 500"
  면적명: string; // 예: "165"
  공급면적: number;
  전용면적: number;
  방향: string;
  확인일자: string; // 예: "20250217"
  특징?: string; // Optional
  태그?: string; // Optional, comma-separated
  건물동?: string; // Optional
  중개사?: string; // Optional
  위도?: string; // Optional
  경도?: string; // Optional
} 