'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import LoginModal from '@/components/LoginModal';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  
  const isMainPage = pathname === '/';

  // 로컬 스토리지에서 관리자 상태 가져오기
  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(adminStatus);
  }, []);

  // 관리자 모드 요청 처리
  const requestAdminMode = () => {
    if (isAdmin) {
      // 이미 관리자인 경우 일반 모드로 전환
      setIsAdmin(false);
      localStorage.setItem('isAdmin', 'false');
      setIsModalOpen(false);
    } else {
      // 일반 모드인 경우 로그인 모달 표시
      setShowLoginModal(true);
      setIsModalOpen(false);
    }
  };

  // 로그인 성공 처리
  const handleLoginSuccess = () => {
    setIsAdmin(true);
    localStorage.setItem('isAdmin', 'true');
    setShowLoginModal(false);
  };

  const menuItems = [
    { href: '/', label: '🏠 홈', description: '메인 페이지로 돌아갑니다' },
    { href: '/chatbot', label: '🤖 RAG 챗봇', description: 'PDF 문서를 업로드하고 질문하세요' },
    { href: '/scraper', label: '🌐 웹 스크래핑', description: '웹 페이지 정보를 수집하고 분석합니다' },
    { href: '/pdf-summary', label: '📑 PDF 요약', description: 'PDF 문서를 자동으로 요약합니다' },
    { href: '/tistory', label: '📝 티스토리', description: '블로그 게시글을 확인합니다' },
    { href: '/resume', label: '📄 이력서', description: '이력서 정보를 확인합니다' },
    { href: '/about', label: '👤 About Me', description: '개발자 소개 페이지입니다' },
  ];
  
  // 현재 페이지에 대한 메뉴 항목 찾기
  const currentMenuItem = menuItems.find(item => item.href === pathname);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* 메인 컨텐츠 */}
      <div className="py-10 px-6">
        <div className="max-w-6xl mx-auto">
          {/* 뒤로가기 버튼 (AI 기능 페이지에서만 표시) */}
          {!isMainPage && (
            <div className="mb-6 flex items-center">
              <button 
                onClick={() => router.back()}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>뒤로 가기</span>
              </button>
              
              {currentMenuItem && (
                <div className="ml-4 flex items-center">
                  <span className="text-gray-400 mx-2">|</span>
                  <span className="text-gray-600">현재: {currentMenuItem.label}</span>
                </div>
              )}
            </div>
          )}
          
          {/* 페이지 컨텐츠 */}
          {children}
        </div>
      </div>

      {/* 플로팅 버튼 영역 */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
        {/* 메뉴 버튼 */}
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* 관리자 모드 버튼 */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
        >
          <span className="text-2xl">{isAdmin ? '👑' : '🔒'}</span>
        </button>
      </div>

      {/* 메뉴 오버레이 */}
      {isMenuOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" onClick={() => setIsMenuOpen(false)} />
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-xl shadow-xl z-50 w-[90%] max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">메뉴</h3>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex items-center justify-center mb-8">
              <img src="/favicon.ico" alt="TNLabs Logo" className="w-20 h-20" />
              <div className="ml-4">
                <h2 className="text-2xl font-bold text-gray-800">TNLabs</h2>
                <p className="text-gray-600">AI 서비스 플랫폼</p>
              </div>
            </div>
            <nav className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {menuItems.map((item, index) => (
                <Link 
                  key={index} 
                  href={item.href}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="font-medium text-gray-800 group-hover:text-blue-600">{item.label}</div>
                  <div className="text-sm text-gray-500">{item.description}</div>
                </Link>
              ))}
            </nav>
          </div>
        </>
      )}

      {/* 관리자 모드 모달 */}
      {isModalOpen && (
        <>
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50" onClick={() => setIsModalOpen(false)} />
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-xl shadow-xl z-50 w-80">
            <div className="text-center mb-6">
              <div className="text-4xl mb-2">{isAdmin ? '👑' : '🔒'}</div>
              <h3 className="text-xl font-bold text-gray-800">{isAdmin ? '관리자 모드' : '일반 모드'}</h3>
              <p className="text-gray-600 mt-2">
                {isAdmin 
                  ? '현재 관리자 권한으로 접속 중입니다. 일반 사용자로 전환하시겠습니까?' 
                  : '관리자 권한으로 전환하시겠습니까?'}
              </p>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                취소
              </button>
              <button 
                onClick={requestAdminMode}
                className={`flex-1 py-2 px-4 rounded-lg text-white ${isAdmin ? 'bg-amber-500 hover:bg-amber-600' : 'bg-blue-500 hover:bg-blue-600'} transition-colors`}
              >
                {isAdmin ? '일반 모드로 전환' : '관리자 모드로 전환'}
              </button>
            </div>
          </div>
        </>
      )}

      {/* 로그인 모달 */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
} 