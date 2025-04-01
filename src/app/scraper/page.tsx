'use client';

import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import CrawlingForm, { CrawlingSite } from '@/features/crawling/components/CrawlingForm';
import CrawlingResults from '@/features/crawling/components/CrawlingResults';
import { api } from '@/lib/api/index';
import { NaverFinanceItem, CoupangItem, NaverRealEstateItem } from '@/types/crawling';

type CrawlingResultData = NaverFinanceItem[] | CoupangItem[] | NaverRealEstateItem[];

export default function ScraperPage() {
  const [results, setResults] = useState<CrawlingResultData>([]);
  const [currentSite, setCurrentSite] = useState<CrawlingSite | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCrawlSubmit = async (site: CrawlingSite, params: any) => {
    setIsLoading(true);
    setError(null);
    setResults([]);
    setCurrentSite(site);

    try {
      let responseData;
      if (site === 'naver_finance') {
        responseData = await api.crawling.naverFinance(params.pages);
      } else if (site === 'coupang') {
        responseData = await api.crawling.coupang(params.keyword, params.max_items);
      } else if (site === 'naver_realestate') {
        responseData = await api.crawling.naverRealEstate(
          params.complex_no,
          params.trade_type,
          params.page
        );
      }
      setResults(Array.isArray(responseData) ? responseData : []);
    } catch (err: any) {
      console.error('크롤링 요청 실패:', err);
      setError(err.message || '크롤링 중 오류가 발생했습니다.');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getSiteDisplayName = (site: CrawlingSite | null): string => {
    switch(site) {
      case 'naver_finance': return '네이버 금융';
      case 'coupang': return '쿠팡';
      case 'naver_realestate': return '네이버 부동산';
      default: return '';
    }
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">🌐 웹 스크래핑 AI</h1>
        <p className="text-gray-600 text-lg mb-8">네이버 금융, 쿠팡, 네이버 부동산에서 정보를 검색하고 수집합니다.</p>

        <CrawlingForm onSubmit={handleCrawlSubmit} isLoading={isLoading} />

        {error && (
          <div className="mt-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg shadow-sm">
            <p className="font-medium mb-1">⚠️ 오류 발생</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {!isLoading && !error && currentSite !== null && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">📊 크롤링 결과 ({getSiteDisplayName(currentSite)})</h2>
            <CrawlingResults results={results} site={currentSite} />
          </div>
        )}
        
        {isLoading && (
          <div className="mt-8 text-center py-10">
            <div className="inline-flex items-center gap-3 bg-white p-4 rounded-lg shadow-md border border-gray-200">
              <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-gray-700 font-medium">데이터를 수집하고 있습니다...</span>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
