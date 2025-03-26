'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';

export default function ScraperPage() {
  const [url, setUrl] = useState('');
  const [keyword, setKeyword] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleScrape = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult('');

    try {
      const res = await fetch('https://e3d0-39-118-216-92.ngrok-free.app/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, keyword }),
      });

      const data = await res.json();
      setResult(data.result);
    } catch (err) {
      setResult('에러 발생! 서버가 켜져 있는지 확인해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-white/20">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">🌐 웹 스크래핑</h1>
        <p className="text-gray-600 text-lg mb-6">웹사이트의 정보를 자동으로 수집하고 분석하세요.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/50 backdrop-blur-sm p-6 rounded-xl shadow-md border border-white/20">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">🔍 데이터 수집</h2>
            <p className="text-gray-600">웹사이트의 텍스트, 이미지, 링크 등을 자동으로 수집합니다.</p>
          </div>
          <div className="bg-white/50 backdrop-blur-sm p-6 rounded-xl shadow-md border border-white/20">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">📊 데이터 분석</h2>
            <p className="text-gray-600">수집된 데이터를 분석하여 의미 있는 정보를 추출합니다.</p>
          </div>
        </div>

        <form onSubmit={handleScrape} className="space-y-4">
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
              웹사이트 URL
            </label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80"
              required
            />
          </div>

          <div>
            <label htmlFor="keyword" className="block text-sm font-medium text-gray-700 mb-1">
              검색 키워드 (선택)
            </label>
            <input
              type="text"
              id="keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="찾고 싶은 키워드를 입력하세요"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !url.trim()}
            className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>스크래핑 중...</span>
              </>
            ) : (
              '스크랩 시작'
            )}
          </button>
        </form>

        {result && (
          <div className="mt-8 bg-white/50 backdrop-blur-sm p-6 rounded-xl shadow-md border border-white/20">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">📝 스크래핑 결과</h2>
            <div className="text-gray-600 whitespace-pre-wrap">{result}</div>
          </div>
        )}
      </div>
    </Layout>
  );
}
