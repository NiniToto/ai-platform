'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';

export default function HwpWriterPage() {
  const [topic, setTopic] = useState('');
  const [style, setStyle] = useState('formal');
  const [length, setLength] = useState('medium');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const styleOptions = [
    { id: 'formal', label: '공식적', description: '비즈니스, 보고서에 적합한 스타일' },
    { id: 'casual', label: '일상적', description: '블로그, 소셜 미디어에 적합한 스타일' },
    { id: 'academic', label: '학술적', description: '논문, 연구 보고서에 적합한 스타일' },
    { id: 'creative', label: '창의적', description: '스토리텔링, 에세이에 적합한 스타일' },
  ];

  const lengthOptions = [
    { id: 'short', label: '짧게', description: '약 300자 내외' },
    { id: 'medium', label: '보통', description: '약 600자 내외' },
    { id: 'long', label: '길게', description: '약 1000자 내외' },
  ];

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setErrorMessage('주제를 입력해주세요');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setGeneratedContent('');

    // 실제로는 API 호출이 필요하지만, 현재는 데모 응답 생성
    setTimeout(() => {
      // 예시 생성 텍스트
      const exampleContents: Record<string, string> = {
        formal: `[${topic}에 관한 공식 문서]

안녕하세요, 이 문서는 ${topic}에 관한 공식 보고서입니다.

1. 개요
${topic}은(는) 현대 사회에서 중요한 의미를 가지고 있습니다. 최근 연구에 따르면, 이러한 주제는 다양한 산업 분야에서 주목받고 있으며 그 영향력이 점차 확대되고 있습니다.

2. 현황 분석
현재 ${topic}의 시장 규모는 지속적으로 성장하고 있으며, 주요 기업들은 이 분야에 대한 투자를 확대하고 있습니다. 특히 디지털 전환 시대에 맞춰 ${topic}의 중요성은 더욱 부각되고 있습니다.

3. 향후 전망
앞으로 ${topic}은(는) 더욱 발전하여 새로운 가치를 창출할 것으로 예상됩니다. 기술 발전과 함께 ${topic}의 활용 범위는 더욱 확대될 전망입니다.

본 보고서가 ${topic}에 대한 이해를 높이는 데 도움이 되기를 바랍니다.`,

        casual: `[${topic}에 대한 일상적인 글]

안녕하세요! 오늘은 ${topic}에 대해 이야기해볼게요.

요즘 ${topic}에 대한 관심이 정말 뜨겁더라고요. 제 주변에서도 많은 사람들이 ${topic}에 대해 이야기하고 있어요. 특히 SNS에서는 ${topic} 관련 콘텐츠가 정말 인기가 많아요.

제가 개인적으로 ${topic}에 관심을 갖게 된 계기는 우연히 본 유튜브 영상이었어요. 그 후로 ${topic}에 대해 더 알아보게 되었죠. 여러분도 한번 ${topic}에 대해 찾아보시는 걸 추천해요!

${topic}의 매력은 아무래도 누구나 쉽게 접근할 수 있다는 점인 것 같아요. 여러분도 ${topic}에 대해 어떻게 생각하시나요? 댓글로 의견 남겨주세요~`,

        academic: `[${topic}에 관한 학술적 고찰]

초록: 본 연구는 ${topic}에 관한 학술적 분석을 통해 그 특성과 영향력을 고찰하고자 한다. ${topic}은 현대 사회의 중요한 연구 주제로, 다양한 학문 분야에서 논의되고 있다.

1. 서론
${topic}은 현대 학술 연구에서 중요한 위치를 차지하고 있다. 본 논문에서는 ${topic}의 개념적 정의와 함께 관련 선행 연구를 검토하고자 한다.

2. 이론적 배경
${topic}에 관한 이론적 논의는 크게 세 가지 관점에서 이루어져 왔다. 첫째, 기능적 접근법은 ${topic}의 실용적 측면을 강조한다. 둘째, 구조적 접근법은 ${topic}의 체계적 특성을 분석한다. 셋째, 비판적 접근법은 ${topic}의 사회적 함의를 고찰한다.

3. 결론 및 제언
${topic}에 관한 학술적 논의는 앞으로도 지속적으로 발전할 것으로 예상된다. 향후 연구에서는 ${topic}의 다학제적 접근이 필요하며, 실증적 연구를 통한 검증이 요구된다.

참고문헌: (생략)`,

        creative: `[${topic}에 관한 창작 에세이]

${topic}의 비밀

첫 번째 만남은 항상 특별하다. ${topic}과(와) 내가 처음 만났던 그날도 마찬가지였다.

햇살이 유난히 빛나던 오후, 우연히 마주친 ${topic}은(는) 나의 호기심을 단번에 사로잡았다. 모든 이야기가 그렇듯 ${topic}에도 말로 표현할 수 없는 묘한 매력이 있었다.

"${topic}이란 무엇일까?" 나는 종종 혼자 생각에 잠기곤 했다. 어떤 날에는 ${topic}이 거대한 우주처럼 느껴졌고, 또 어떤 날에는 작은 모래알처럼 느껴졌다.

시간이 흐르면서 ${topic}과 나 사이에는 특별한 이야기가 쌓여갔다. 때로는 기쁨을, 때로는 슬픔을 안겨주던 ${topic}. 그렇게 우리의 이야기는 계속되고 있다.

결국 ${topic}이란, 각자의 경험과 상상력으로 완성되는 하나의 여정이 아닐까? 나의 ${topic} 이야기는 아직 끝나지 않았다. 당신의 ${topic} 이야기는 어떤가?`
      };

      // 길이에 따른 텍스트 조정
      let content = exampleContents[style] || exampleContents.formal;
      if (length === 'short') {
        content = content.split('\n\n').slice(0, 2).join('\n\n');
      } else if (length === 'long') {
        content = content + '\n\n' + content;
      }

      setGeneratedContent(content);
      setIsLoading(false);
    }, 2000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    alert('내용이 클립보드에 복사되었습니다.');
  };

  const handleDownload = () => {
    const blob = new Blob([generatedContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${topic || '문서'}_${new Date().toLocaleDateString()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Layout>
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-white/20">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent mb-4">✍️ 한글 문서 AI</h1>
        <p className="text-gray-600 text-lg mb-6">AI가 한글 문서를 작성하고 편집해드립니다.</p>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* 왼쪽 섹션 - 입력 폼 */}
          <div className="space-y-6">
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-orange-200">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="text-2xl mr-2">📝</span>
                <span className="bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                  문서 생성하기
                </span>
              </h2>
              
              {/* 주제 입력 */}
              <div className="mb-4">
                <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">
                  주제 또는 키워드
                </label>
                <input
                  type="text"
                  id="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="예: 디지털 트랜스포메이션, 환경 보호의 중요성, 인공지능의 미래..."
                  className="w-full rounded-lg border border-orange-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white/80"
                />
              </div>

              {/* 스타일 선택 */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  작성 스타일
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {styleOptions.map((option) => (
                    <div
                      key={option.id}
                      className={`cursor-pointer border p-3 rounded-lg transition-colors ${
                        style === option.id
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-300 hover:border-orange-300'
                      }`}
                      onClick={() => setStyle(option.id)}
                    >
                      <div className="font-medium text-gray-800">{option.label}</div>
                      <div className="text-xs text-gray-500">{option.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 길이 선택 */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  문서 길이
                </label>
                <div className="flex gap-2">
                  {lengthOptions.map((option) => (
                    <div
                      key={option.id}
                      className={`flex-1 cursor-pointer border p-3 rounded-lg text-center transition-colors ${
                        length === option.id
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-300 hover:border-orange-300'
                      }`}
                      onClick={() => setLength(option.id)}
                    >
                      <div className="font-medium text-gray-800">{option.label}</div>
                      <div className="text-xs text-gray-500">{option.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 생성 버튼 */}
              <button
                onClick={handleGenerate}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-3 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4 shadow-sm"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>문서 생성 중...</span>
                  </>
                ) : (
                  <>
                    <span>문서 생성하기</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                  </>
                )}
              </button>

              {errorMessage && (
                <div className="mt-3 text-red-500 text-sm">
                  {errorMessage}
                </div>
              )}
            </div>

            {/* 사용 가이드 */}
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-md border border-orange-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">💡 사용 팁</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span>구체적인 주제나 키워드를 입력할수록 더 좋은 결과를 얻을 수 있어요.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span>다양한 스타일과 길이 옵션을 조합하여 원하는 문서를 만들어보세요.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span>만족스러운 결과물은 복사하거나 다운로드하여 활용할 수 있습니다.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 오른쪽 섹션 - 결과 미리보기 */}
          <div>
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-orange-200 h-full flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <span className="text-2xl mr-2">📄</span>
                  <span className="bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                    생성된 문서
                  </span>
                </h2>
                {generatedContent && (
                  <div className="flex gap-2">
                    <button
                      onClick={handleCopy}
                      className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                      title="복사하기"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                        <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
                      </svg>
                    </button>
                    <button
                      onClick={handleDownload}
                      className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                      title="다운로드"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
              <div className="flex-1 bg-white rounded-lg border border-gray-200 p-4 overflow-auto whitespace-pre-wrap">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="flex flex-col items-center">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
                      <p className="text-orange-500 mt-4">문서 생성 중입니다...</p>
                    </div>
                  </div>
                ) : generatedContent ? (
                  <div className="text-gray-700 font-light">{generatedContent}</div>
                ) : (
                  <div className="text-gray-400 flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="text-4xl mb-2">📄</div>
                      <p>문서를 생성하면 여기에 결과가 표시됩니다.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 