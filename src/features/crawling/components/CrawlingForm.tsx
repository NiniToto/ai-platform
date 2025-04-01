import React, { useState } from 'react';

// Define allowed site types
export type CrawlingSite = 'naver_finance' | 'coupang' | 'naver_realestate';

interface CrawlingFormProps {
  onSubmit: (site: CrawlingSite, params: any) => void;
  isLoading: boolean;
}

export default function CrawlingForm({ onSubmit, isLoading }: CrawlingFormProps) {
  const [site, setSite] = useState<CrawlingSite>('naver_finance');
  
  // Naver Finance state
  const [nfPages, setNfPages] = useState<number>(1);
  
  // Coupang state
  const [cpKeyword, setCpKeyword] = useState<string>('');
  const [cpMaxItems, setCpMaxItems] = useState<number>(10);

  // Naver Real Estate state
  const [nreComplexNo, setNreComplexNo] = useState<string>(''); // Use string for input flexibility
  const [nreTradeType, setNreTradeType] = useState<string>('A1');
  const [nrePage, setNrePage] = useState<number>(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    let params = {};
    if (site === 'naver_finance') {
      params = { pages: nfPages };
    } else if (site === 'coupang') {
      if (!cpKeyword.trim()) {
        alert('쿠팡 검색 키워드를 입력해주세요.');
        return;
      }
      params = { keyword: cpKeyword, max_items: cpMaxItems };
    } else if (site === 'naver_realestate') {
      const complexNo = parseInt(nreComplexNo);
      if (!nreComplexNo || isNaN(complexNo) || complexNo <= 0) {
          alert('유효한 네이버 부동산 단지 번호를 입력해주세요.');
          return;
      }
      params = { complex_no: complexNo, trade_type: nreTradeType, page: nrePage };
    }
    onSubmit(site, params);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-sm border border-gray-200/90 space-y-6">
      {/* Site Selection */}
      <div>
        <label htmlFor="site-select" className="block text-sm font-medium text-gray-700 mb-1">크롤링 대상</label>
        <select
          id="site-select"
          value={site}
          onChange={(e) => setSite(e.target.value as CrawlingSite)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm"
        >
          <option value="naver_finance">네이버 금융 (시가총액)</option>
          <option value="coupang">쿠팡 (제품 검색)</option>
          <option value="naver_realestate">네이버 부동산 (매물)</option>
        </select>
      </div>

      {/* Naver Finance Options */}
      {site === 'naver_finance' && (
        <div>
          <label htmlFor="naver-pages" className="block text-sm font-medium text-gray-700 mb-1">페이지 수 (1~10)</label>
          <input
            type="number"
            id="naver-pages"
            value={nfPages}
            onChange={(e) => setNfPages(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
            min="1"
            max="10"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      )}

      {/* Coupang Options */}
      {site === 'coupang' && (
        <div className="space-y-4">
          <div>
            <label htmlFor="coupang-keyword" className="block text-sm font-medium text-gray-700 mb-1">검색 키워드</label>
            <input
              type="text"
              id="coupang-keyword"
              value={cpKeyword}
              onChange={(e) => setCpKeyword(e.target.value)}
              placeholder="예: 노트북, 마스크"
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="coupang-maxitems" className="block text-sm font-medium text-gray-700 mb-1">최대 검색 항목 수 (1~50)</label>
            <input
              type="number"
              id="coupang-maxitems"
              value={cpMaxItems}
              onChange={(e) => setCpMaxItems(Math.max(1, Math.min(50, parseInt(e.target.value) || 1)))}
              min="1"
              max="50"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
      )}

      {/* Naver Real Estate Options */}
      {site === 'naver_realestate' && (
        <div className="space-y-4">
           <div>
            <label htmlFor="nre-complexno" className="block text-sm font-medium text-gray-700 mb-1">단지 번호</label>
            <input
              type="number" // Use number but handle validation
              id="nre-complexno"
              value={nreComplexNo}
              onChange={(e) => setNreComplexNo(e.target.value)} 
              placeholder="예: 102737 (래미안 첼리투스)"
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="nre-tradetype" className="block text-sm font-medium text-gray-700 mb-1">거래 유형</label>
            <select
              id="nre-tradetype"
              value={nreTradeType}
              onChange={(e) => setNreTradeType(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm"
            >
              <option value="A1">매매</option>
              <option value="B1">전세</option>
              <option value="B2">월세</option>
            </select>
          </div>
           <div>
            <label htmlFor="nre-page" className="block text-sm font-medium text-gray-700 mb-1">페이지 번호</label>
            <input
              type="number"
              id="nre-page"
              value={nrePage}
              onChange={(e) => setNrePage(Math.max(1, parseInt(e.target.value) || 1))}
              min="1"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center justify-center px-5 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
        >
          {/* Loading indicator */}
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              크롤링 실행 중...
            </>
          ) : (
            '크롤링 실행'
          )}
        </button>
      </div>
    </form>
  );
} 