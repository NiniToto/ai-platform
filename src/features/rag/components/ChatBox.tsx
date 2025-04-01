import { useState, useRef, useEffect } from 'react';
import { api } from '@/lib/api/index';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatBoxProps {
  selectedModel: string;
}

const loadingMessages = [
  "답변을 생성하고 있습니다...",
  "열심히 생각하는 중...",
  "데이터를 분석하고 있어요...",
  "잠시만 기다려주세요...",
  "거의 다 됐어요...",
  "정확한 답변을 위해 노력 중!",
];

const initialGreeting: Message = {
  role: 'assistant',
  content: '안녕하세요! 👋 궁금한 점이 있으시면 언제든지 물어보세요. 왼쪽에 있는 문서 목록의 내용을 기반으로 답변해 드릴 수 있습니다.',
};

export default function ChatBox({ selectedModel }: ChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([initialGreeting]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentLoadingMessage, setCurrentLoadingMessage] = useState(loadingMessages[0]);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const loadingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isLoading) {
      loadingIntervalRef.current = setInterval(() => {
        setCurrentLoadingMessage(prev => {
          const currentIndex = loadingMessages.indexOf(prev);
          const nextIndex = (currentIndex + 1) % loadingMessages.length;
          return loadingMessages[nextIndex];
        });
      }, 2500);
    } else {
      if (loadingIntervalRef.current) {
        clearInterval(loadingIntervalRef.current);
        loadingIntervalRef.current = null;
      }
      setCurrentLoadingMessage(loadingMessages[0]);
    }

    return () => {
      if (loadingIntervalRef.current) {
        clearInterval(loadingIntervalRef.current);
      }
    };
  }, [isLoading]);

  useEffect(() => {
    scrollToBottom();
  }, [messages.length]);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      setTimeout(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTo({
              top: messagesContainerRef.current.scrollHeight,
              behavior: 'smooth'
            });
        }
      }, 0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await api.rag.chat(userMessage, selectedModel);
      setMessages(prev => [...prev, { role: 'assistant', content: response.answer }]);
    } catch (error) {
      console.error('챗봇 에러:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: '죄송합니다. 응답을 생성하는 중 오류가 발생했습니다.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatMessage = (content: string) => {
    const sections = content.split(/(?=핵심내용:|상세내용:|출처:)/);
    
    return sections.map((section, index) => {
      const trimmedSection = section.trim();
      if (!trimmedSection) return null;

      if (trimmedSection.startsWith('핵심내용:')) {
        return (
          <div key={index} className="bg-blue-50 p-3 rounded-lg mb-2 ring-1 ring-blue-200/50">
            <h3 className="font-semibold text-blue-800 text-sm mb-1">핵심내용</h3>
            <p className="text-blue-900 text-sm">{trimmedSection.replace('핵심내용:', '').trim()}</p>
          </div>
        );
      }
      if (trimmedSection.startsWith('상세내용:')) {
        return (
          <div key={index} className="bg-gray-100 p-3 rounded-lg mb-2 ring-1 ring-gray-200/50">
            <h3 className="font-semibold text-gray-800 text-sm mb-1">상세내용</h3>
            <p className="text-gray-900 text-sm whitespace-pre-wrap">{trimmedSection.replace('상세내용:', '').trim()}</p>
          </div>
        );
      }
      if (trimmedSection.startsWith('출처:')) {
        const sources = trimmedSection.replace('출처:', '').trim().split(/\n- |\n/).map(s => s.trim()).filter(Boolean);
        return (
          <div key={index} className="bg-green-50 p-3 rounded-lg ring-1 ring-green-200/50">
            <h3 className="font-semibold text-green-800 text-sm mb-1">출처</h3>
            <ul className="list-disc list-inside space-y-0.5">
              {sources.map((source, i) => (
                <li key={i} className="text-green-900 text-sm">{source}</li>
              ))}
            </ul>
          </div>
        );
      }
      return <p key={index} className="text-sm whitespace-pre-wrap mb-2 last:mb-0">{trimmedSection}</p>;
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div ref={messagesContainerRef} className="flex-grow overflow-y-auto space-y-4 pr-2 scroll-smooth mb-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} ${index === messages.length - 1 ? 'opacity-0 animate-fade-in' : ''}`}
          >
            <div
              className={`max-w-[85%] rounded-xl p-3 text-sm shadow-sm ${ 
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-gray-200/80'
              }`}
            >
              {message.role === 'user' ? (
                <p className="whitespace-pre-wrap">{message.content}</p>
              ) : (
                <div className="space-y-2">
                  {formatMessage(message.content)}
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start opacity-0 animate-fade-in" style={{animationDelay: '100ms'}}>
            <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-sm flex items-center space-x-2">
              <div className="flex space-x-1">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></span>
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
              </div>
              <span className="text-sm text-gray-600 transition-opacity duration-500">{currentLoadingMessage}</span>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 pt-4 border-t border-gray-200/80 flex-shrink-0">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="메시지를 입력하세요... (Shift+Enter로 줄바꿈)"
          className="flex-1 p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm transition-shadow shadow-sm focus:shadow-md"
          disabled={isLoading}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e as unknown as React.FormEvent);
            }
          }}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all text-sm font-medium shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          전송
        </button>
      </form>
    </div>
  );
} 