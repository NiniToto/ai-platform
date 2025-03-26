'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { api } from '@/utils/api';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface UploadedFile {
  name: string;
  uploaded_at: string;
  size: number;
  llm_model: string;
  embedding_model: string;
}

interface ChatResponse {
  answer: string;
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('llama-3.1');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const models = [
    { id: 'llama-3.1', name: 'Llama 3.1', icon: '🦙', description: '기본 모델' },
    { id: 'gemma-3-12b', name: 'Gemma 3 12B', icon: '💎', description: '고성능 모델' },
    { id: 'deepseek-r1-8b', name: 'Deepseek R1 8B', icon: '🔍', description: '정확도 중심 모델' },
  ];

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const token = localStorage.getItem('access_token');
        setIsAdmin(!!token);
        
        const files = await api.rag.getFiles();
        setUploadedFiles(Array.isArray(files) ? files : []);
      } catch (err) {
        console.error('파일 목록을 가져오는데 실패했습니다:', err);
        setUploadedFiles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isAdmin) {
      alert('관리자만 파일을 업로드할 수 있습니다.');
      return;
    }

    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await api.rag.uploadFile(file);
      // 파일 목록 새로고침
      const files = await api.rag.getFiles();
      setUploadedFiles(Array.isArray(files) ? files : []);
    } catch (error) {
      console.error('파일 업로드 실패:', error);
      alert('파일 업로드에 실패했습니다.');
    }
  };

  const handleDeleteFile = async (filename: string) => {
    if (!isAdmin) {
      alert('관리자만 파일을 삭제할 수 있습니다.');
      return;
    }

    if (!confirm('이 파일을 삭제하시겠습니까?')) return;

    try {
      await api.rag.deleteFile(filename);
      // 파일 목록 새로고침
      const files = await api.rag.getFiles();
      setUploadedFiles(Array.isArray(files) ? files : []);
    } catch (error) {
      console.error('파일 삭제 실패:', error);
      alert('파일 삭제에 실패했습니다.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !selectedModel) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await api.rag.chat(userMessage, selectedModel) as ChatResponse;
      setMessages(prev => [...prev, { role: 'assistant', content: response.answer }]);
    } catch (error) {
      console.error('채팅 요청 실패:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: '죄송합니다. 응답을 생성하는 중 오류가 발생했습니다.' 
      }]);
    } finally {
      setIsLoading(false);
    }

    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

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
              {uploadedFiles.length > 0 ? (
                <div className="space-y-4">
                  {uploadedFiles.map((file) => (
                    <div key={file.name} className="flex items-center justify-between p-4 bg-blue-50/80 rounded-lg border border-blue-100 hover:bg-blue-50/100 transition-colors">
                      <div>
                        <div className="font-medium text-blue-800">{file.name}</div>
                        <div className="text-sm text-blue-600">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                            {file.llm_model}
                          </span>
                          <span className="text-blue-600 text-xs">
                            {new Date(file.uploaded_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      {isAdmin && (
                        <button
                          onClick={() => handleDeleteFile(file.name)}
                          className="text-red-500 hover:text-red-700 w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-100"
                          title="삭제"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-gray-500">업로드된 문서가 없습니다</p>
                  <p className="text-sm text-gray-400 mt-1">문서를 업로드하여 AI와 대화해보세요</p>
                </div>
              )}
            </div>

            {/* PDF 업로드 섹션 */}
            <div className="bg-white/50 backdrop-blur-sm p-6 rounded-xl shadow-md border border-white/20">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">📄 PDF 업로드</h2>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept=".pdf"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                  disabled={!isAdmin}
                />
                <label
                  htmlFor="file-upload"
                  className={`cursor-pointer block ${!isAdmin && 'opacity-70'}`}
                  onClick={(e) => {
                    if (!isAdmin) {
                      e.preventDefault();
                      alert('관리자로 로그인하세요.');
                    }
                  }}
                >
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="mt-2 text-sm text-gray-600">
                    {isAdmin ? 'PDF 파일을 드래그하거나 클릭하여 업로드' : 'PDF 업로드는 관리자만 가능합니다'}
                  </p>
                </label>
              </div>
            </div>

            {/* 모델 선택 섹션 */}
            <div className="bg-white/50 backdrop-blur-sm p-6 rounded-xl shadow-md border border-white/20">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">🔄 LLM 모델 선택</h2>
              <div className="grid grid-cols-1 gap-4">
                {models.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => setSelectedModel(model.id)}
                    className={`p-4 rounded-lg border transition-colors ${
                      selectedModel === model.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{model.icon}</span>
                      <div className="text-left">
                        <div className="font-medium">{model.name}</div>
                        <div className="text-sm text-gray-500">{model.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 오른쪽 채팅 섹션 */}
          <div className="lg:col-span-2">
            <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-md border border-white/20 h-[calc(100vh-12rem)] flex flex-col">
              {/* 알림 메시지 */}
              {uploadedFiles.length > 0 && (
                <div className="bg-blue-100 border-l-4 border-blue-500 p-3 m-3 rounded-lg flex items-center gap-2 animate-pulse">
                  <div className="text-blue-500 text-xl">💡</div>
                  <div>
                    <p className="text-blue-800 font-medium">이런 질문을 해보세요!</p>
                    <p className="text-blue-600 text-sm">
                      - "{uploadedFiles[0]?.name.replace('.pdf', '')}에 대한 핵심 내용을 알려주세요!"
                    </p>
                  </div>
                </div>
              )}
              
              {/* 채팅 메시지 영역 */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white mr-2">
                        🤖
                      </div>
                    )}
                    <div
                      className={`max-w-[70%] rounded-2xl p-4 shadow-md ${
                        message.role === 'user'
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-tr-none'
                          : 'bg-white/90 text-gray-800 rounded-tl-none border border-gray-200'
                      }`}
                    >
                      {message.content}
                      <div className="mt-1 text-right text-xs opacity-70">
                        {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </div>
                    </div>
                    {message.role === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white ml-2">
                        👤
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white mr-2">
                      🤖
                    </div>
                    <div className="bg-white/90 rounded-2xl rounded-tl-none p-4 text-gray-800 border border-gray-200 shadow-md flex items-center gap-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                      </div>
                      <span className="ml-2">응답을 생성하는 중...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* 입력 영역 */}
              <div className="border-t border-gray-200 p-4 bg-gray-50/50">
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="메시지를 입력하세요..."
                    className="flex-1 rounded-full border border-gray-300 px-6 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/90 shadow-sm"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-full hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors shadow-sm"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>처리중...</span>
                      </>
                    ) : (
                      <>
                        <span>전송</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
