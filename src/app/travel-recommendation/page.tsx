'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';

interface TravelOption {
  id: string;
  label: string;
}

interface TravelSeason {
  id: string;
  label: string;
  months: string;
}

interface TravelRecommendation {
  destination: string;
  country: string;
  description: string;
  highlights: string[];
  bestTimeToVisit: string;
  estimatedBudget: string;
  image: string;
}

export default function TravelRecommendationPage() {
  // 사용자 선호도 상태
  const [purpose, setPurpose] = useState<string[]>([]);
  const [season, setSeason] = useState('');
  const [budget, setBudget] = useState('medium');
  const [continent, setContinent] = useState<string[]>([]);
  const [travelDays, setTravelDays] = useState('4-7');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<TravelRecommendation[]>([]);
  
  // 선택 옵션들
  const purposeOptions: TravelOption[] = [
    { id: 'nature', label: '자연/풍경' },
    { id: 'culture', label: '문화/역사' },
    { id: 'food', label: '미식 여행' },
    { id: 'activity', label: '액티비티' },
    { id: 'relaxation', label: '휴양/힐링' },
    { id: 'shopping', label: '쇼핑' }
  ];
  
  const seasonOptions: TravelSeason[] = [
    { id: 'spring', label: '봄', months: '3월-5월' },
    { id: 'summer', label: '여름', months: '6월-8월' },
    { id: 'fall', label: '가을', months: '9월-11월' },
    { id: 'winter', label: '겨울', months: '12월-2월' },
    { id: 'any', label: '상관없음', months: '아무 때나' }
  ];
  
  const budgetOptions: TravelOption[] = [
    { id: 'budget', label: '저비용 (50만원 이하)' },
    { id: 'medium', label: '중간 (50-150만원)' },
    { id: 'luxury', label: '고비용 (150만원 이상)' }
  ];
  
  const continentOptions: TravelOption[] = [
    { id: 'asia', label: '아시아' },
    { id: 'europe', label: '유럽' },
    { id: 'northAmerica', label: '북아메리카' },
    { id: 'southAmerica', label: '남아메리카' },
    { id: 'oceania', label: '오세아니아' },
    { id: 'africa', label: '아프리카' }
  ];
  
  const travelDaysOptions: TravelOption[] = [
    { id: '1-3', label: '1-3일 (단기여행)' },
    { id: '4-7', label: '4-7일 (일주일)' },
    { id: '8-14', label: '8-14일 (2주)' },
    { id: '15+', label: '15일 이상 (장기여행)' }
  ];
  
  // 목적 선택 토글
  const togglePurpose = (purposeId: string) => {
    if (purpose.includes(purposeId)) {
      setPurpose(purpose.filter(p => p !== purposeId));
    } else {
      setPurpose([...purpose, purposeId]);
    }
  };
  
  // 대륙 선택 토글
  const toggleContinent = (continentId: string) => {
    if (continent.includes(continentId)) {
      setContinent(continent.filter(c => c !== continentId));
    } else {
      setContinent([...continent, continentId]);
    }
  };
  
  // 여행지 추천 요청
  const handleRecommendation = () => {
    if (purpose.length === 0 || continent.length === 0 || !season) {
      alert('목적, 시즌, 대륙을 최소한 하나 이상 선택해주세요.');
      return;
    }
    
    setIsLoading(true);
    
    // 실제로는 API 호출이 필요하지만, 현재는 데모 응답 생성
    setTimeout(() => {
      // 더미 데이터 - 실제로는 백엔드에서 사용자 선호도에 맞게 생성될 것
      const dummyRecommendations: TravelRecommendation[] = [
        {
          destination: '교토',
          country: '일본',
          description: '전통과 현대가 공존하는 일본의 문화 중심지로, 수많은 사찰과 정원, 역사적 건물들이 있어 일본 전통 문화를 경험하기에 최적의 장소입니다.',
          highlights: [
            '금각사와 은각사 방문',
            '기온 거리에서 일본 전통 문화 체험',
            '교토 요리 체험',
            '아라시야마 대나무 숲 산책'
          ],
          bestTimeToVisit: '봄(벚꽃 시즌) 또는 가을(단풍 시즌)',
          estimatedBudget: '100-150만원 (7일 기준)',
          image: 'https://source.unsplash.com/random/?kyoto,japan'
        },
        {
          destination: '바르셀로나',
          country: '스페인',
          description: '가우디의 건축물과 지중해의 해변이 공존하는 도시로, 활기찬 분위기와 맛있는 음식, 풍부한 문화를 즐길 수 있습니다.',
          highlights: [
            '사그라다 파밀리아 방문',
            '구엘 공원 관람',
            '람블라스 거리 산책',
            '바르셀로네타 해변에서 휴식'
          ],
          bestTimeToVisit: '5월-6월 또는 9월-10월',
          estimatedBudget: '120-180만원 (7일 기준)',
          image: 'https://source.unsplash.com/random/?barcelona,spain'
        },
        {
          destination: '체스키 크룸로프',
          country: '체코',
          description: '마치 동화 속에 들어온 듯한 중세 도시로, 유네스코 세계문화유산으로 지정된 아름다운 구시가지를 가지고 있습니다.',
          highlights: [
            '체스키 크룸로프 성 탐방',
            '블타바 강에서 보트 타기',
            '구시가지 미로 같은 골목 탐험',
            '전통 체코 요리 체험'
          ],
          bestTimeToVisit: '5월-9월',
          estimatedBudget: '80-120만원 (5일 기준)',
          image: 'https://source.unsplash.com/random/?ceskyKrumlov,czechRepublic'
        }
      ];
      
      setRecommendations(dummyRecommendations);
      setIsLoading(false);
    }, 2000);
  };
  
  // 다시 검색하기
  const handleReset = () => {
    setRecommendations([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Layout>
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-white/20">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-4">✈️ 여행지 추천 AI</h1>
        <p className="text-gray-600 text-lg mb-6">선호도와 조건에 맞는 최적의 여행지를 추천해드립니다.</p>

        {recommendations.length === 0 ? (
          <div className="grid md:grid-cols-2 gap-8">
            {/* 왼쪽 섹션 - 선호도 입력 */}
            <div className="space-y-6">
              {/* 여행 목적 */}
              <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-blue-200">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="text-2xl mr-2">🎯</span>
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    여행 목적
                  </span>
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {purposeOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => togglePurpose(option.id)}
                      className={`px-4 py-3 rounded-lg text-sm transition-colors ${
                        purpose.includes(option.id)
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-blue-100'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 예상 시즌 */}
              <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-blue-200">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="text-2xl mr-2">🌤️</span>
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    여행 시즌
                  </span>
                </h2>
                <div className="space-y-3">
                  {seasonOptions.map((option) => (
                    <label
                      key={option.id}
                      className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                        season === option.id
                          ? 'bg-blue-50 border border-blue-300'
                          : 'bg-gray-50 border border-gray-200 hover:bg-blue-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="season"
                        className="hidden"
                        checked={season === option.id}
                        onChange={() => setSeason(option.id)}
                      />
                      <div className="flex-1">
                        <div className="font-medium">{option.label}</div>
                        <div className="text-sm text-gray-500">{option.months}</div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border ${
                        season === option.id 
                          ? 'border-blue-500 bg-blue-500' 
                          : 'border-gray-300'
                      }`}>
                        {season === option.id && (
                          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* 오른쪽 섹션 - 추가 조건 */}
            <div className="space-y-6">
              {/* 예산 */}
              <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-blue-200">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="text-2xl mr-2">💰</span>
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    예산
                  </span>
                </h2>
                <div className="space-y-3">
                  {budgetOptions.map((option) => (
                    <label
                      key={option.id}
                      className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                        budget === option.id
                          ? 'bg-blue-50 border border-blue-300'
                          : 'bg-gray-50 border border-gray-200 hover:bg-blue-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="budget"
                        className="hidden"
                        checked={budget === option.id}
                        onChange={() => setBudget(option.id)}
                      />
                      <div className="flex-1">
                        <div className="font-medium">{option.label}</div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border ${
                        budget === option.id 
                          ? 'border-blue-500 bg-blue-500' 
                          : 'border-gray-300'
                      }`}>
                        {budget === option.id && (
                          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* 대륙 */}
              <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-blue-200">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="text-2xl mr-2">🌎</span>
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    대륙
                  </span>
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {continentOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => toggleContinent(option.id)}
                      className={`px-4 py-3 rounded-lg text-sm transition-colors ${
                        continent.includes(option.id)
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-blue-100'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 여행 기간 */}
              <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-blue-200">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="text-2xl mr-2">📅</span>
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    여행 기간
                  </span>
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {travelDaysOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setTravelDays(option.id)}
                      className={`px-4 py-3 rounded-lg text-sm transition-colors ${
                        travelDays === option.id
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-blue-100'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          // 추천 결과
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">
                맞춤 여행지 추천 결과
              </h2>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg flex items-center gap-2 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
                <span>다시 검색하기</span>
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recommendations.map((recommendation, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl overflow-hidden shadow-lg border border-blue-100 transition-transform hover:transform hover:scale-105"
                >
                  <div className="h-48 overflow-hidden relative">
                    <div 
                      className="absolute inset-0 bg-center bg-cover"
                      style={{ backgroundImage: `url(${recommendation.image})` }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4 text-white">
                      <h3 className="text-xl font-bold">{recommendation.destination}</h3>
                      <p className="text-sm">{recommendation.country}</p>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-gray-700 mb-4">{recommendation.description}</p>
                    
                    <h4 className="font-bold text-gray-800 mb-2">주요 볼거리</h4>
                    <ul className="list-disc pl-5 text-gray-700 mb-4">
                      {recommendation.highlights.map((highlight, idx) => (
                        <li key={idx} className="mb-1">{highlight}</li>
                      ))}
                    </ul>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-800">최적 여행 시기:</span>
                        <p className="text-gray-700">{recommendation.bestTimeToVisit}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-800">예상 예산:</span>
                        <p className="text-gray-700">{recommendation.estimatedBudget}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 추천 버튼 */}
        {recommendations.length === 0 && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleRecommendation}
              disabled={isLoading}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl text-lg font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors shadow-md"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>여행지 분석 중...</span>
                </>
              ) : (
                <>
                  <span>맞춤 여행지 추천받기</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
} 