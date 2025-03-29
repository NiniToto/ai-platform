'use client';

import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import FileList from '@/features/rag/components/FileList';
import FileUpload from '@/features/rag/components/FileUpload';
import ChatBox from '@/features/rag/components/ChatBox';
import { api } from '@/lib/api/index';

const models = [
  { id: 'llama-3.1', name: 'Llama 3.1', icon: '🦙', description: '기본 모델' },
  { id: 'gemma-3-12b', name: 'Gemma 3 12B', icon: '💎', description: '고성능 모델' },
  { id: 'deepseek-r1-8b', name: 'Deepseek R1 8B', icon: '🔍', description: '정확도 중심 모델' },
];

export default function ChatbotPage() {
  const [selectedModel, setSelectedModel] = useState('llama-3.1');
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsAdmin(!!token);
    setLoading(false);
  }, []);

  const handleDeleteFile = async (filename: string) => {
    if (!isAdmin) {
      alert('관리자만 파일을 삭제할 수 있습니다.');
      return;
    }

    if (!confirm('이 파일을 삭제하시겠습니까?')) return;

    try {
      await api.rag.deleteFile(filename);
      alert('파일이 삭제되었습니다.');
      // FileList 컴포넌트가 자동으로 새로고침됩니다.
    } catch (error) {
      console.error('파일 삭제 실패:', error);
      alert('파일 삭제에 실패했습니다.');
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen">
          <p className="text-gray-500">로딩 중...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-white/20">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">🤖 RAG 챗봇</h1>
        <p className="text-gray-600 text-lg mb-6">PDF 문서를 업로드하고 AI와 대화하세요.</p>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* 왼쪽 사이드바 */}
          <div className="lg:col-span-1 space-y-6">
            {/* 파일 상태 섹션 */}
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-blue-200 transition-all hover:shadow-blue-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="text-2xl mr-2">📁</span>
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  활성화된 문서
                </span>
              </h2>
              <FileList isAdmin={isAdmin} onDelete={handleDeleteFile} />
            </div>

            {/* PDF 업로드 섹션 */}
            <FileUpload isAdmin={isAdmin} onUploadComplete={() => {}} />

            {/* 모델 선택 섹션 */}
            <div className="bg-white/50 backdrop-blur-sm p-6 rounded-xl shadow-md border border-white/20">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">🤖 모델 선택</h2>
              <div className="space-y-2">
                {models.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => setSelectedModel(model.id)}
                    className={`w-full p-3 rounded-lg flex items-center gap-2 transition-colors ${
                      selectedModel === model.id
                        ? 'bg-blue-100 text-blue-800 border border-blue-200'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <span className="text-2xl">{model.icon}</span>
                    <div className="text-left">
                      <div className="font-medium">{model.name}</div>
                      <div className="text-sm opacity-75">{model.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 채팅 영역 */}
          <div className="lg:col-span-2">
            <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-md border border-white/20 h-[calc(100vh-12rem)] flex flex-col">
              <ChatBox selectedModel={selectedModel} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
