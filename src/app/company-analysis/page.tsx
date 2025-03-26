'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';

interface CompanyInfo {
  title: string;
  content: string;
}

interface AnalysisResult {
  company: string;
  overview: string;
  keyValues: string[];
  coreBusinesses: CompanyInfo[];
  recentNews: CompanyInfo[];
  interviewTips: string[];
}

export default function CompanyAnalysisPage() {
  const [companyName, setCompanyName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [error, setError] = useState('');
  
  const placeholderCompanies = ['삼성전자', 'LG전자', '네이버', '카카오'];

  const handleAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!companyName.trim()) {
      setError('기업명을 입력해주세요');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    // 실제로는 API 호출이 필요하지만, 현재는 데모 응답 생성
    setTimeout(() => {
      // 예시 분석 결과
      const result: AnalysisResult = {
        company: companyName,
        overview: `${companyName}는 대한민국의 대표적인 기업 중 하나로, 혁신적인 제품과 서비스로 글로벌 시장에서 경쟁력을 유지하고 있습니다. 
        ${companyName}는 지속 가능한 성장을 위해 디지털 트랜스포메이션과 환경 친화적인 비즈니스 모델을 추구하고 있으며, 
        최근에는 인공지능, 빅데이터, 클라우드 등 미래 기술에 대한 투자를 확대하고 있습니다.`,
        
        keyValues: [
          "혁신과 창의성",
          "고객 중심",
          "지속 가능한 경영",
          "사회적 책임",
          "글로벌 경쟁력"
        ],
        
        coreBusinesses: [
          {
            title: "주력 사업 1",
            content: `${companyName}의 가장 중요한 사업 영역으로, 시장 점유율 XX%를 차지하고 있습니다. 최근 디지털 전환을 통해 경쟁력을 강화하고 있으며, 지속적인 R&D 투자로 혁신적인 제품을 출시하고 있습니다.`
          },
          {
            title: "주력 사업 2",
            content: `최근 급성장하고 있는 분야로, ${companyName}의 미래 성장 동력으로 주목받고 있습니다. 지난 5년간 연평균 성장률 XX%를 기록하며 시장 영향력을 확대하고 있습니다.`
          },
          {
            title: "신규 사업",
            content: `${companyName}가 최근 투자를 확대하고 있는 분야로, 디지털 혁신과 지속 가능한 성장을 위한 전략적 중요성을 가지고 있습니다. 이 분야는 향후 5년 내 기업 매출의 주요 부분을 차지할 것으로 예상됩니다.`
          }
        ],
        
        recentNews: [
          {
            title: "최근 인수합병 소식",
            content: `${companyName}는 최근 XX 기업을 인수하여 기술 역량을 강화했습니다. 이번 인수를 통해 신규 시장 진출 및 기존 사업 영역 확장이 기대됩니다.`
          },
          {
            title: "ESG 경영 강화",
            content: `${companyName}는 환경, 사회, 지배구조(ESG) 경영을 강화하기 위한 중장기 전략을 발표했습니다. 2030년까지 탄소 중립 달성, 사회공헌 확대, 이사회 다양성 증진 등의 목표를 제시했습니다.`
          },
          {
            title: "신제품 출시",
            content: `${companyName}는 최근 혁신적인 신제품을 출시하여 시장의 주목을 받고 있습니다. 이 제품은 기존 문제점을 해결하고 사용자 경험을 크게 개선했다는 평가를 받고 있습니다.`
          }
        ],
        
        interviewTips: [
          `${companyName}의 기업 가치와 문화를 이해하고, 이에 맞는 자기소개서를 작성하세요.`,
          `단순히 성과만 나열하기보다 문제 해결 과정과 배운 점을 구체적으로 서술하세요.`,
          `${companyName}의 최근 트렌드와 뉴스를 파악하고, 이에 관련된 경험이나 관심을 표현하세요.`,
          `지원 직무와 관련된 역량과 경험을 강조하되, 진정성 있는 표현을 사용하세요.`,
          `면접에서는 논리적 사고력과 커뮤니케이션 능력을 보여주는 것이 중요합니다.`
        ]
      };
      
      setAnalysisResult(result);
      setIsLoading(false);
      setActiveTab('overview'); // 결과가 로드되면 개요 탭을 기본으로 표시
    }, 2000);
  };
  
  const tabs = [
    { id: 'overview', label: '기업 개요', icon: '🏢' },
    { id: 'values', label: '핵심 가치', icon: '💎' },
    { id: 'businesses', label: '주요 사업', icon: '📊' },
    { id: 'news', label: '최근 소식', icon: '📰' },
    { id: 'tips', label: '자소서 팁', icon: '✍️' },
  ];

  return (
    <Layout>
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-white/20">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent mb-4">💼 기업분석 AI</h1>
        <p className="text-gray-600 text-lg mb-6">자기소개서 작성을 위한 맞춤형 기업 분석을 받으세요.</p>

        {/* 검색 폼 */}
        <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-indigo-200 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="text-2xl mr-2">🔍</span>
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              기업 검색
            </span>
          </h2>
          
          <form onSubmit={handleAnalysis} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="분석할 기업명을 입력하세요"
                  className="w-full rounded-lg border border-indigo-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/80"
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                <div className="mt-2 flex flex-wrap gap-2">
                  {placeholderCompanies.map((company) => (
                    <button
                      key={company}
                      type="button"
                      onClick={() => setCompanyName(company)}
                      className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full hover:bg-indigo-100 transition-colors"
                    >
                      {company}
                    </button>
                  ))}
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-6 py-3 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 md:w-auto w-full"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>분석 중...</span>
                  </>
                ) : (
                  <>
                    <span>기업 분석하기</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* 분석 결과 */}
        {isLoading ? (
          <div className="bg-white/60 backdrop-blur-sm p-10 rounded-xl shadow-lg border border-indigo-200 flex flex-col items-center justify-center min-h-[40vh]">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600"></div>
            <p className="mt-6 text-lg text-indigo-700 font-medium">
              {companyName} 기업 정보를 분석 중입니다...
            </p>
            <p className="text-gray-500 mt-2">
              잠시만 기다려주세요. 자기소개서 작성에 도움이 되는 정보를 수집하고 있습니다.
            </p>
          </div>
        ) : analysisResult ? (
          <div className="bg-white/60 backdrop-blur-sm rounded-xl shadow-lg border border-indigo-200">
            {/* 탭 네비게이션 */}
            <div className="flex overflow-x-auto border-b border-indigo-100 sticky top-0 bg-white/80 backdrop-blur-sm rounded-t-xl">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`px-4 py-3 flex items-center gap-1 text-sm font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-b-2 border-indigo-600 text-indigo-700'
                      : 'text-gray-500 hover:text-indigo-600 hover:bg-indigo-50'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
            
            {/* 탭 콘텐츠 */}
            <div className="p-6">
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-indigo-700 mb-1">{analysisResult.company}</h2>
                <div className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
                  {new Date().toLocaleDateString()} 기준 분석
                </div>
              </div>
              
              {/* 기업 개요 */}
              {activeTab === 'overview' && (
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-5 shadow-sm border border-indigo-100">
                    <h3 className="text-lg font-medium text-gray-800 mb-3">기업 개요</h3>
                    <p className="text-gray-700 leading-relaxed">{analysisResult.overview}</p>
                  </div>
                </div>
              )}
              
              {/* 핵심 가치 */}
              {activeTab === 'values' && (
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-5 shadow-sm border border-indigo-100">
                    <h3 className="text-lg font-medium text-gray-800 mb-3">핵심 가치</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {analysisResult.keyValues.map((value, idx) => (
                        <div key={idx} className="bg-indigo-50 p-4 rounded-lg flex items-start">
                          <span className="text-indigo-600 text-lg mr-2 font-bold">#{idx + 1}</span>
                          <span className="text-gray-800">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {/* 주요 사업 */}
              {activeTab === 'businesses' && (
                <div className="space-y-4">
                  {analysisResult.coreBusinesses.map((business, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-5 shadow-sm border border-indigo-100">
                      <h3 className="text-lg font-medium text-gray-800 mb-2">{business.title}</h3>
                      <p className="text-gray-700">{business.content}</p>
                    </div>
                  ))}
                </div>
              )}
              
              {/* 최근 소식 */}
              {activeTab === 'news' && (
                <div className="space-y-4">
                  {analysisResult.recentNews.map((news, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-5 shadow-sm border border-indigo-100">
                      <div className="flex items-start">
                        <div className="bg-indigo-100 text-indigo-600 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                          <span>N</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-800 mb-2">{news.title}</h3>
                          <p className="text-gray-700">{news.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* 자소서 팁 */}
              {activeTab === 'tips' && (
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-5 shadow-sm border border-indigo-100">
                    <h3 className="text-lg font-medium text-gray-800 mb-3">자기소개서 작성 팁</h3>
                    <ul className="space-y-3">
                      {analysisResult.interviewTips.map((tip, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="text-gray-700">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white/60 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-indigo-200 text-center py-16">
            <div className="text-5xl mb-4">💼</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">기업을 검색해보세요</h2>
            <p className="text-gray-600 max-w-md mx-auto">
              기업명을 입력하고 분석 버튼을 클릭하면 자기소개서 작성에 도움이 되는 맞춤형 기업 정보를 제공해드립니다.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
} 