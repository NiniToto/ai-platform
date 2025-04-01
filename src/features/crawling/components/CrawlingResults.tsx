import React from 'react';
import { NaverFinanceItem, CoupangItem, NaverRealEstateItem } from '@/types/crawling';
import { CrawlingSite } from './CrawlingForm'; // Import site type

type CrawlingResult = NaverFinanceItem | CoupangItem | NaverRealEstateItem;

interface CrawlingResultsProps {
  results: CrawlingResult[];
  site: CrawlingSite;
}

const formatNumber = (num: number | null | undefined): string => {
  if (num === null || num === undefined) return '-';
  return num.toLocaleString();
};

const formatPercentage = (num: number | null | undefined): string => {
  if (num === null || num === undefined) return '-';
  return `${num.toFixed(2)}%`;
};

// Helper to format date string (YYYYMMDD to YYYY.MM.DD)
const formatDate = (dateString: string | undefined): string => {
  if (!dateString || dateString.length !== 8) return '-';
  return `${dateString.substring(0, 4)}.${dateString.substring(4, 6)}.${dateString.substring(6, 8)}`;
};

export default function CrawlingResults({ results, site }: CrawlingResultsProps) {
  if (!results || results.length === 0) {
    return (
      <div className="mt-6 text-center text-gray-500 bg-gray-50 p-6 rounded-lg border border-dashed border-gray-300">
        크롤링 결과가 없습니다.
      </div>
    );
  }

  const renderNaverTable = (data: NaverFinanceItem[]) => (
    <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden">
      <thead className="bg-gray-50">
        <tr>
          {['종목명', '현재가', '전일비', '등락률', '거래량', '거래대금', '시가총액(억)', 'PER', 'ROE'].map((header) => (
            <th key={header} scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((item, index) => (
          <tr key={index} className="hover:bg-gray-50/50 transition-colors">
            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{item.종목명}</td>
            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 text-right">{formatNumber(item.현재가)}</td>
            <td className={`px-4 py-3 whitespace-nowrap text-sm text-right ${item.전일비 > 0 ? 'text-red-600' : item.전일비 < 0 ? 'text-blue-600' : 'text-gray-700'}`}>
              {item.전일비 > 0 ? '▲' : item.전일비 < 0 ? '▼' : ''} {formatNumber(Math.abs(item.전일비))}
            </td>
            <td className={`px-4 py-3 whitespace-nowrap text-sm text-right ${item.등락률 > 0 ? 'text-red-600' : item.등락률 < 0 ? 'text-blue-600' : 'text-gray-700'}`}>
              {formatPercentage(item.등락률)}
            </td>
            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 text-right">{formatNumber(item.거래량)}</td>
            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 text-right">{formatNumber(item.거래대금)}</td>
            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 text-right">{formatNumber(item.시가총액)}</td>
            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 text-right">{item.PER?.toFixed(2) ?? '-'}</td>
            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 text-right">{item.ROE?.toFixed(2) ?? '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderCoupangTable = (data: CoupangItem[]) => (
    <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden">
      <thead className="bg-gray-50">
        <tr>
          {['제품명', '가격', '평점', '리뷰수'].map((header) => (
            <th key={header} scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((item, index) => (
          <tr key={index} className="hover:bg-gray-50/50 transition-colors">
            <td className="px-4 py-3 text-sm font-medium text-gray-900">
              <a href={item.링크} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 hover:underline line-clamp-2" title={item.제품명}>
                {item.제품명}
              </a>
            </td>
            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 text-right">{formatNumber(item.가격)}원</td>
            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 text-right">
              {item.평점 !== null ? 
                <span className="flex items-center justify-end">
                  <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                  {item.평점.toFixed(1)}
                </span>
                : '-'
              }
            </td>
            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 text-right">{formatNumber(item.리뷰수)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  // --- Add Naver Real Estate Table Renderer ---
  const renderNaverRealEstateTable = (data: NaverRealEstateItem[]) => (
    <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden">
      <thead className="bg-gray-50">
        <tr>
          {['매물명', '동', '거래', '가격', '면적(공급/전용)', '층', '방향', '확인일자', '특징'].map((header) => (
            <th key={header} scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((item) => (
          <tr key={item.매물번호} className="hover:bg-gray-50/50 transition-colors">
            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{item.매물명}</td>
            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{item.건물동 ?? '-'}</td>
            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{item.거래유형}</td>
            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{item.가격}</td>
            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{item.공급면적?.toFixed(1)}㎡ / {item.전용면적?.toFixed(1)}㎡ ({item.면적명})</td>
            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{item.층정보}</td>
            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{item.방향}</td>
            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{formatDate(item.확인일자)}</td>
            <td className="px-4 py-3 text-sm text-gray-700 min-w-[150px] truncate" title={item.특징 ?? ''}>{item.특징 ?? '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  // Render the correct table based on the site prop
  const renderTable = () => {
    switch(site) {
      case 'naver_finance':
        return renderNaverTable(results as NaverFinanceItem[]);
      case 'coupang':
        return renderCoupangTable(results as CoupangItem[]);
      case 'naver_realestate':
        return renderNaverRealEstateTable(results as NaverRealEstateItem[]);
      default:
        return null;
    }
  }

  return (
    <div className="mt-6 overflow-x-auto">
      <div className="inline-block min-w-full align-middle">
        {renderTable()} 
      </div>
    </div>
  );
} 