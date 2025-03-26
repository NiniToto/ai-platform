'use client';

import { useState, useRef, useEffect } from 'react';
import Layout from '@/components/Layout';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function CounselingPage() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: '안녕하세요, 당신의 심리 상담사 AI입니다. 오늘 어떤 고민이 있으신가요? 편안하게 이야기해주세요.' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 자동 스크롤
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    // 실제로는 API 호출이 필요하지만, 현재는 데모 응답 생성
    setTimeout(() => {
      const responses = [
        "그런 고민이 있으셨군요. 더 자세히 말씀해주시겠어요?",
        "그 상황에서 어떤 감정을 느끼셨나요?",
        "많이 힘드셨겠네요. 유사한 상황에서 어떻게 대처하셨나요?",
        "그런 생각이 드는 것은 자연스러운 일이에요. 어떤 부분이 가장 걱정되시나요?",
        "스트레스 상황에서는 잠시 심호흡을 하고 자신의 감정을 인식하는 게 도움이 될 수 있어요."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: randomResponse
      }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Layout>
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-white/20">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">💭 심리상담 AI</h1>
        <p className="text-gray-600 text-lg mb-6">AI와 대화하며 심리 상태를 분석하고 상담받으세요.</p>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* 왼쪽 섹션 - 설명 및 가이드 */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-purple-200">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="text-2xl mr-2">📌</span>
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  상담 가이드
                </span>
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-purple-50/80 rounded-lg border border-purple-100">
                  <p className="text-purple-800 font-medium">1. 자신의 감정에 집중하세요</p>
                  <p className="text-sm text-purple-600 mt-1">현재 느끼는 감정을 구체적으로 표현해보세요.</p>
                </div>
                <div className="p-4 bg-purple-50/80 rounded-lg border border-purple-100">
                  <p className="text-purple-800 font-medium">2. 판단 없이 이야기하세요</p>
                  <p className="text-sm text-purple-600 mt-1">옳고 그름보다 경험과 감정에 집중해주세요.</p>
                </div>
                <div className="p-4 bg-purple-50/80 rounded-lg border border-purple-100">
                  <p className="text-purple-800 font-medium">3. 솔직하게 표현하세요</p>
                  <p className="text-sm text-purple-600 mt-1">AI는 비판 없이 여러분의 이야기를 들을 준비가 되어있습니다.</p>
                </div>
              </div>
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                <p className="text-yellow-800 text-sm flex items-start">
                  <span className="text-lg mr-2">⚠️</span>
                  <span>심각한 심리적 문제가 있다면 전문가를 찾아 상담하는 것을 권장합니다.</span>
                </p>
              </div>
            </div>
          </div>

          {/* 오른쪽 섹션 - 채팅 인터페이스 */}
          <div className="lg:col-span-2">
            <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-md border border-white/20 h-[calc(100vh-12rem)] flex flex-col">
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
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center text-white mr-2">
                        💭
                      </div>
                    )}
                    <div
                      className={`max-w-[70%] rounded-2xl p-4 shadow-md ${
                        message.role === 'user'
                          ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-tr-none'
                          : 'bg-white/90 text-gray-800 rounded-tl-none border border-gray-200'
                      }`}
                    >
                      {message.content}
                      <div className="mt-1 text-right text-xs opacity-70">
                        {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </div>
                    </div>
                    {message.role === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white ml-2">
                        👤
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center text-white mr-2">
                      💭
                    </div>
                    <div className="bg-white/90 rounded-2xl rounded-tl-none p-4 text-gray-800 border border-gray-200 shadow-md flex items-center gap-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                      </div>
                      <span className="ml-2">생각 중...</span>
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
                    placeholder="오늘 어떤 일이 있으셨나요?"
                    className="flex-1 rounded-full border border-gray-300 px-6 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/90 shadow-sm"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-full hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors shadow-sm"
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