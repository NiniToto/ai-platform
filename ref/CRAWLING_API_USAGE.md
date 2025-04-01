# 크롤링 API 사용 가이드

이 문서는 `tnlabs-backend` 프로젝트에 추가된 크롤링 API의 사용 방법을 설명합니다.

## 1. 네이버 금융 시가총액 크롤링

네이버 금융의 시가총액 데이터를 크롤링합니다.

- **엔드포인트:** `/api/crawling/naver-finance`
- **HTTP 메서드:** `GET`
- **쿼리 파라미터:**
    - `pages` (integer, optional, default: 1): 크롤링할 페이지 수를 지정합니다. (최소: 1, 최대: 10)
- **성공 응답 (200 OK):**
    - **Content-Type:** `application/json`
    - **Body:** 크롤링된 주식 데이터 리스트 (JSON 배열)
      ```json
      [
          {
              "종목명": "삼성전자",
              "현재가": 75000.0,
              "전일비": 100.0,
              "등락률": 0.13,
              "거래량": 1000000.0,
              "거래대금": 75000000000.0,
              "매수호가": 75000.0,
              "매도호가": 75100.0,
              "시가총액": 4470000.0, // 단위: 억
              "PER": 15.0,
              "ROE": 10.0
          },
          // ... 추가 데이터
      ]
      ```
- **오류 응답:**
    - `404 Not Found`: 데이터를 찾을 수 없는 경우
      ```json
      {
          "detail": "데이터를 찾을 수 없습니다."
      }
      ```
    - `500 Internal Server Error`: 크롤링 중 서버 오류 발생 시
      ```json
      {
          "detail": "크롤링 중 서버 오류가 발생했습니다."
      }
      ```

**예시 요청:**

```bash
curl -X GET "http://127.0.0.1:8000/api/crawling/naver-finance?pages=2"
```

## 2. 쿠팡 제품 검색 크롤링

쿠팡에서 키워드로 제품을 검색하여 결과를 반환합니다.

- **엔드포인트:** `/api/crawling/coupang`
- **HTTP 메서드:** `GET`
- **쿼리 파라미터:**
    - `keyword` (string, required): 검색할 키워드를 지정합니다.
    - `max_items` (integer, optional, default: 10): 최대 검색 항목 수를 지정합니다. (최소: 1, 최대: 50)
- **성공 응답 (200 OK):**
    - **Content-Type:** `application/json`
    - **Body:** 검색된 제품 정보 리스트 (JSON 배열)
      ```json
      [
          {
              "제품명": "Apple 2023 맥북 프로 14",
              "가격": 2500000.0,
              "평점": 5.0,
              "리뷰수": 100.0,
              "링크": "https://www.coupang.com/..."
          },
          // ... 추가 데이터
      ]
      ```
- **오류 응답:**
    - `404 Not Found`: 검색 결과가 없는 경우
      ```json
      {
          "detail": "검색 결과가 없습니다."
      }
      ```
    - `500 Internal Server Error`: 크롤링 중 서버 오류 발생 시
      ```json
      {
          "detail": "크롤링 중 서버 오류가 발생했습니다."
      }
      ```

**예시 요청:**

```bash
curl -X GET "http://127.0.0.1:8000/api/crawling/coupang?keyword=%EB%85%B8%ED%8A%B8%EB%B6%81&max_items=5"
```

## 3. 네이버 부동산 매물 크롤링

네이버 부동산에서 특정 단지의 매물 정보를 크롤링합니다.

- **엔드포인트:** `/api/crawling/naver-realestate`
- **HTTP 메서드:** `GET`
- **쿼리 파라미터:**
    - `complex_no` (integer, required): 네이버 부동산 단지 번호를 지정합니다. (예: 래미안 첼리투스 = 102737)
    - `trade_type` (string, optional, default: 'A1'): 거래 유형을 지정합니다. (A1: 매매, B1: 전세, B2: 월세)
    - `page` (integer, optional, default: 1): 조회할 페이지 번호를 지정합니다.
- **성공 응답 (200 OK):**
    - **Content-Type:** `application/json`
    - **Body:** 검색된 매물 정보 리스트 (JSON 배열)
      ```json
      [
          {
              "매물번호": "2508514668",
              "매물명": "래미안 첼리투스",
              "거래유형": "매매",
              "층정보": "중/42",
              "가격": "45억",
              "면적명": "165",
              "공급면적": 165.0,
              "전용면적": 124.0,
              "방향": "남향",
              "확인일자": "20250217",
              "특징": "한강뷰 로얄층 급매",
              "태그": "대형평수, 한강뷰, 역세권",
              "건물동": "101동",
              "중개사": "XX부동산",
              "위도": "37.526...".
              "경도": "127.018..."
          },
          // ... 추가 데이터
      ]
      ```
- **오류 응답:**
    - `404 Not Found`: 매물 정보를 찾을 수 없는 경우
      ```json
      {
          "detail": "매물 정보를 찾을 수 없습니다."
      }
      ```
    - `500 Internal Server Error`: 크롤링 중 서버 오류 발생 시
      ```json
      {
          "detail": "크롤링 중 서버 오류가 발생했습니다."
      }
      ```

**예시 요청:**

```bash
curl -X GET "http://127.0.0.1:8000/api/crawling/naver-realestate?complex_no=102737&trade_type=A1&page=1"
``` 