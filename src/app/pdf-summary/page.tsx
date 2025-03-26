'use client';

import Layout from '@/components/Layout';
import { useState } from 'react';

export default function PdfSummaryPage() {
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setSummary('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('https://e3d0-39-118-216-92.ngrok-free.app/pdf-summary', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      setSummary('에러가 발생했습니다. 서버가 실행 중인지 확인해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-white/20">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">📑 PDF 요약</h1>
        <p className="text-gray-600 text-lg mb-6">PDF 문서를 업로드하면 AI가 핵심 내용을 요약해드립니다.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/50 backdrop-blur-sm p-6 rounded-xl shadow-md border border-white/20">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">📄 문서 업로드</h2>
            <p className="text-gray-600">PDF 파일을 업로드하여 AI가 분석할 수 있도록 합니다.</p>
          </div>
          <div className="bg-white/50 backdrop-blur-sm p-6 rounded-xl shadow-md border border-white/20">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">🤖 AI 요약</h2>
            <p className="text-gray-600">AI가 문서의 핵심 내용을 자동으로 요약해드립니다.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">
              PDF 파일 선택
            </label>
            <input
              type="file"
              id="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || !file}
            className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>요약 중...</span>
              </>
            ) : (
              '요약 시작'
            )}
          </button>
        </form>

        {summary && (
          <div className="mt-8 bg-white/50 backdrop-blur-sm p-6 rounded-xl shadow-md border border-white/20">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">📝 요약 결과</h2>
            <div className="text-gray-600 whitespace-pre-wrap">{summary}</div>
          </div>
        )}
      </div>
    </Layout>
  );
} 