'use client';

import { useState, useRef, useEffect } from 'react';
import Layout from '@/components/Layout';
import Image from 'next/image';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ImageChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: '안녕하세요, 이미지 분석 AI입니다. 사진을 업로드하면 사진에 대해 대화할 수 있어요.' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imageProcessing, setImageProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 자동 스크롤
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 이미지 처리 중 상태 표시
    setImageProcessing(true);

    // 파일 리더로 이미지 읽기
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const imageUrl = event.target.result as string;
        setUploadedImage(imageUrl);
        
        // 이미지 업로드 후 기본 메시지 추가
        setTimeout(() => {
          setMessages(prev => [
            ...prev, 
            { 
              role: 'assistant', 
              content: '이미지를 성공적으로 분석했습니다. 이 이미지에 대해 어떤 것이 궁금하신가요?' 
            }
          ]);
          setImageProcessing(false);
        }, 1500);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !uploadedImage) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    // 실제로는 API 호출이 필요하지만, 현재는 데모 응답 생성
    setTimeout(() => {
      const responses = [
        "이 이미지에서는 다양한 색상과 패턴이 보입니다. 어떤 부분이 더 궁금하신가요?",
        "이미지의 중앙 부분에 있는 개체는 특히 흥미로운 특징을 가지고 있네요.",
        "이 사진에서 가장 두드러진 부분은 빛과 그림자의 대비입니다.",
        "이미지의 구도가 매우 독특합니다. 특별한 의도가 있으셨나요?",
        "이 이미지에서 보이는 텍스처는 자연스러운 환경에서 흔히 볼 수 있는 패턴입니다."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: randomResponse
      }]);
      setIsLoading(false);
    }, 1000);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <Layout>
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-white/20">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-4">🎨 이미지 대화 AI</h1>
        <p className="text-gray-600 text-lg mb-6">사진을 업로드하고 실시간으로 대화하며 이미지를 분석하세요.</p>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* 왼쪽 섹션 - 이미지 업로드 및 표시 */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-teal-200">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="text-2xl mr-2">🖼️</span>
                <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                  이미지 분석
                </span>
              </h2>
              
              {/* 이미지 업로드 영역 */}
              <div className="mt-4">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                  ref={fileInputRef}
                />

                {uploadedImage ? (
                  <div className="relative">
                    <div className="relative aspect-square overflow-hidden rounded-lg border border-teal-200 mb-4">
                      <Image 
                        src={uploadedImage} 
                        alt="업로드된 이미지" 
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <button
                      onClick={triggerFileInput}
                      className="w-full py-3 border border-teal-300 text-teal-700 rounded-lg hover:bg-teal-50 transition-colors"
                      disabled={imageProcessing}
                    >
                      이미지 변경
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={triggerFileInput}
                    className="border-2 border-dashed border-teal-300 rounded-lg p-8 text-center cursor-pointer hover:bg-teal-50 transition-colors"
                  >
                    <div className="text-4xl mb-2 text-teal-500">🖼️</div>
                    <p className="text-teal-700">클릭하여 이미지 업로드</p>
                    <p className="text-xs text-teal-500 mt-2">JPG, PNG, GIF 등 지원</p>
                  </div>
                )}
              </div>

              {/* 이미지 분석 가이드 */}
              <div className="mt-6 space-y-3">
                <div className="p-3 bg-teal-50 rounded-lg">
                  <p className="text-sm text-teal-800">
                    <span className="font-medium">💡 Tip:</span> 특정 부분에 대해 질문하면 더 자세한 분석을 받을 수 있어요.
                  </p>
                </div>
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
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-teal-600 flex items-center justify-center text-white mr-2">
                        🎨
                      </div>
                    )}
                    <div
                      className={`max-w-[70%] rounded-2xl p-4 shadow-md ${
                        message.role === 'user'
                          ? 'bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-tr-none'
                          : 'bg-white/90 text-gray-800 rounded-tl-none border border-gray-200'
                      }`}
                    >
                      {message.content}
                      <div className="mt-1 text-right text-xs opacity-70">
                        {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </div>
                    </div>
                    {message.role === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white ml-2">
                        👤
                      </div>
                    )}
                  </div>
                ))}
                {imageProcessing && (
                  <div className="flex justify-start">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-teal-600 flex items-center justify-center text-white mr-2">
                      🎨
                    </div>
                    <div className="bg-white/90 rounded-2xl rounded-tl-none p-4 text-gray-800 border border-gray-200 shadow-md flex items-center gap-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                      </div>
                      <span className="ml-2">이미지 분석 중...</span>
                    </div>
                  </div>
                )}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-teal-600 flex items-center justify-center text-white mr-2">
                      🎨
                    </div>
                    <div className="bg-white/90 rounded-2xl rounded-tl-none p-4 text-gray-800 border border-gray-200 shadow-md flex items-center gap-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                      </div>
                      <span className="ml-2">응답 생성 중...</span>
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
                    placeholder={uploadedImage ? "이미지에 대해 질문하세요..." : "먼저 이미지를 업로드해주세요"}
                    className="flex-1 rounded-full border border-gray-300 px-6 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white/90 shadow-sm"
                    disabled={isLoading || !uploadedImage}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim() || !uploadedImage}
                    className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-3 rounded-full hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors shadow-sm"
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