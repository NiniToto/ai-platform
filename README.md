# TNLabs AI 플랫폼

다양한 AI 서비스를 한곳에서 사용할 수 있는 웹 애플리케이션입니다.

## 기능

- 📚 RAG 챗봇 - PDF 문서를 업로드하고 대화하며 정보를 탐색
- 💭 심리상담 AI - AI와 대화하며 심리 상태를 분석하고 상담 
- 🎨 이미지 대화 AI - 사진을 업로드하고 실시간으로 대화하며 이미지를 분석
- 📄 문서 요약 AI - PDF 문서를 자동으로 요약하고 핵심 내용을 파악
- ✍️ 한글 문서 AI - AI가 한글 문서를 작성하고 편집
- 🔍 웹 스크래핑 AI - 웹사이트에서 원하는 정보를 자동으로 추출하고 분석
- 💼 기업분석 AI - 자기소개서 작성을 위한 맞춤형 기업 분석
- ✈️ 여행지 추천 AI - 선호도와 조건에 맞는 최적의 여행지를 추천

## 개발 환경 설정

### 필요 조건

- Node.js 18 이상
- npm 또는 yarn 패키지 매니저

### 설치 방법

1. 저장소를 클론합니다:
```bash
git clone https://github.com/yourusername/tnlabs.git
cd tnlabs
```

2. 의존성을 설치합니다:
```bash
npm install
# 또는
yarn install
```

3. 환경 변수를 설정합니다:
`.env.local` 파일을 생성하고 다음 내용을 추가합니다:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

4. 개발 서버를 실행합니다:
```bash
npm run dev
# 또는
yarn dev
```

5. 브라우저에서 `http://localhost:3000`으로 접속합니다.

## 백엔드 연결

이 프로젝트는 백엔드 API와 연동되어 작동합니다. 백엔드 서버를 로컬에서 실행하거나 원격 서버에 연결할 수 있습니다.

1. 로컬 백엔드 서버를 사용하는 경우:
   - `.env.local` 파일에 `NEXT_PUBLIC_API_URL=http://localhost:8000`을 설정하세요.

2. 원격 백엔드 서버를 사용하는 경우:
   - `.env.local` 파일에 `NEXT_PUBLIC_API_URL=https://your-api-server.com`을 설정하세요.

## 라이선스

MIT
