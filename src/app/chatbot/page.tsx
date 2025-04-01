'use client';

import { useState, useEffect, useRef } from 'react';
import Layout from '@/components/layout/Layout';
import FileList from '@/features/rag/components/FileList';
import FileUpload from '@/features/rag/components/FileUpload';
import ChatBox from '@/features/rag/components/ChatBox';
import { api } from '@/lib/api/index';

interface UploadedFile {
  name: string;
  uploaded_at: string;
  size: number;
  llm_model: string;
  embedding_model: string;
}

const models = [
  { id: 'llama-3.1', name: 'Llama 3.1', icon: '🦙', description: '기본 모델' },
  { id: 'gemma-3-12b', name: 'Gemma 3 12B', icon: '💎', description: '고성능 모델' },
  { id: 'deepseek-r1-8b', name: 'Deepseek R1 8B', icon: '🔍', description: '정확도 중심 모델' },
];

// Helper component for panel sections
const PanelSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200/90 p-4 flex flex-col min-h-0">
    <h2 className="text-md font-semibold text-gray-700 mb-3 flex-shrink-0">{title}</h2>
    {children}
  </div>
);

export default function ChatbotPage() {
  const [selectedModel, setSelectedModel] = useState('llama-3.1');
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const fileListRef = useRef<HTMLDivElement>(null); // Ref to update FileList

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsAdmin(!!token);
    setLoading(false);
  }, []);

  // Function to trigger file list refresh (could be passed down or use context/state management)
  const refreshFileList = () => {
    // This is a placeholder. Ideally, FileList exposes a refresh method or listens to an event.
    // For now, we rely on the internal fetch of FileList upon deletion/upload completion.
  };

  const handleDeleteFile = async (filename: string) => {
    if (!isAdmin) {
      alert('관리자만 파일을 삭제할 수 있습니다.');
      return;
    }
    if (!confirm(`'${filename}' 파일을 삭제하시겠습니까?`)) return;

    try {
      await api.rag.deleteFile(filename);
      alert('파일이 삭제되었습니다.');
      // We don't need to manually update state here as FileList refetches
    } catch (error) {
      console.error('파일 삭제 실패:', error);
      alert('파일 삭제에 실패했습니다.');
    }
  };

  const handleUploadSuccess = () => {
    // FileList should ideally update itself, or we need a way to trigger it.
    // For this example, we assume FileUpload completion might trigger FileList update logic if needed.
    console.log("Upload successful, FileList should refresh if designed to do so.");
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[calc(85vh)]">
          <p className="text-gray-500">로딩 중...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Use a subtle background for the page container */}
      <div className="container mx-auto px-4 py-6 sm:py-8 h-[calc(85vh)]">
        {/* Use items-stretch to make columns equal height if possible */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 h-full items-stretch">
          
          {/* Left Panel */}
          {/* Added flex-grow to PanelSections and adjust spacing */}
          <div className="lg:col-span-1 flex flex-col space-y-4 sm:space-y-5">
            {/* Applied flex-grow to allow this section to expand */}
            <PanelSection title="문서 목록"> 
              <FileList isAdmin={isAdmin} onDelete={handleDeleteFile} />
            </PanelSection>
            <PanelSection title="문서 업로드">
              <FileUpload isAdmin={isAdmin} onUploadComplete={handleUploadSuccess} />
            </PanelSection>
            {/* Removed mt-auto, relying on flex distribution */}
            <PanelSection title="LLM 모델 선택">
              {/* LLM model selection UI */}
               <div className="grid grid-cols-1 gap-2">
                {models.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => setSelectedModel(model.id)}
                    className={`p-3 rounded-lg border transition-all text-left flex items-center space-x-3 ${
                      selectedModel === model.id
                        ? 'border-blue-500 bg-blue-50 shadow-sm ring-1 ring-blue-300'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-xl flex-shrink-0 w-6 text-center">{model.icon}</span>
                    <div className="flex-grow">
                      <div className="font-medium text-sm text-gray-800">{model.name}</div>
                      <div className="text-xs text-gray-500">{model.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </PanelSection>
          </div>

          {/* Right Panel */}
          {/* Use flex-col and h-full to utilize stretched grid height */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200/90 flex flex-col h-full">
            {/* ChatBox Container - Adjusted padding and removed overflow/min-height */}
            {/* Let ChatBox handle its internal scrolling */}
            <div className="flex-1 p-3 sm:p-4 flex flex-col">
              <ChatBox selectedModel={selectedModel} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
