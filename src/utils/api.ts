// API 기본 URL 설정
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://e974-39-118-216-92.ngrok-free.app';
// 기본 헤더 설정 함수
const getHeaders = (includeAuth: boolean = false, isFormData: boolean = false) => {
  const headers: Record<string, string> = {};

  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  if (includeAuth) {
    const token = localStorage.getItem('access_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
};

// API 요청 함수
export const api = {
  // 인증이 필요한 요청
  auth: {
    // 로그인 API
    async login(username: string, password: string) {
      try {
        console.log(`로그인 API 호출: ${API_BASE_URL}/api/auth/login`);
        
        // 백엔드 API 요청
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
          credentials: 'omit', // 인증 정보를 전송하지 않음
        });

        console.log('로그인 응답 상태:', response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('로그인 실패 응답:', errorText);
          throw new Error(`로그인에 실패했습니다: ${response.status}`);
        }

        const responseText = await response.text();
        console.log('로그인 응답 텍스트:', responseText);
        
        try {
          // 빈 응답이 아닌 경우에만 JSON 파싱 시도
          if (responseText.trim()) {
            return JSON.parse(responseText);
          }
          return {};
        } catch (parseError) {
          console.error('JSON 파싱 에러:', parseError, responseText);
          throw new Error('응답을 파싱하는데 실패했습니다');
        }
      } catch (error) {
        console.error('로그인 에러:', error);
        throw error;
      }
    },
  },

  // RAG 관련 요청
  rag: {
    // 파일 목록 조회
    async getFiles() {
      try {
        console.log(`파일 목록 API 호출: ${API_BASE_URL}/api/rag/files`);
        
        // 백엔드 API 요청
        const response = await fetch(`${API_BASE_URL}/api/rag/files`, {
          headers: getHeaders(true),
          credentials: 'omit', // 인증 정보를 전송하지 않음
        });

        console.log('파일 목록 응답 상태:', response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('파일 목록 실패 응답:', errorText);
          throw new Error(`파일 목록을 가져오는데 실패했습니다: ${response.status}`);
        }

        const responseText = await response.text();
        console.log('파일 목록 응답 텍스트:', responseText.substring(0, 100) + '...');
        
        try {
          // 빈 응답이 아닌 경우에만 JSON 파싱 시도
          if (responseText.trim()) {
            return JSON.parse(responseText);
          }
          return [];
        } catch (parseError) {
          console.error('JSON 파싱 에러:', parseError, responseText.substring(0, 100) + '...');
          throw new Error('응답을 파싱하는데 실패했습니다');
        }
      } catch (error) {
        console.error('파일 목록 조회 에러:', error);
        throw error;
      }
    },

    // 파일 업로드
    async uploadFile(file: File) {
      try {
        // 백엔드 API 요청
        const formData = new FormData();
        formData.append('file', file);

        // FormData 사용시 Content-Type 헤더를 브라우저가 자동으로 설정하도록 함
        const headers: Record<string, string> = {};
        const token = localStorage.getItem('access_token');
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        console.log(`파일 업로드 API 호출: ${API_BASE_URL}/api/rag/upload`);
        console.log('업로드 시작:', file.name, file.size);
        
        const response = await fetch(`${API_BASE_URL}/api/rag/upload`, {
          method: 'POST',
          headers,
          body: formData,
          credentials: 'omit', // 인증 정보를 전송하지 않음
        });

        console.log('업로드 응답 상태:', response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('업로드 실패 응답:', errorText);
          throw new Error(`파일 업로드에 실패했습니다: ${response.status}`);
        }

        const responseText = await response.text();
        console.log('업로드 응답 텍스트:', responseText);
        
        try {
          // 빈 응답이 아닌 경우에만 JSON 파싱 시도
          if (responseText.trim()) {
            return JSON.parse(responseText);
          }
          return {};
        } catch (parseError) {
          console.error('JSON 파싱 에러:', parseError, responseText);
          throw new Error('응답을 파싱하는데 실패했습니다');
        }
      } catch (error) {
        console.error('파일 업로드 에러:', error);
        throw error;
      }
    },

    // 파일 삭제
    async deleteFile(filename: string) {
      try {
        console.log(`파일 삭제 API 호출: ${API_BASE_URL}/api/rag/delete/${encodeURIComponent(filename)}`);
        
        // 백엔드 API 요청
        const response = await fetch(`${API_BASE_URL}/api/rag/delete/${encodeURIComponent(filename)}`, {
          method: 'DELETE',
          headers: getHeaders(true),
          credentials: 'omit', // 인증 정보를 전송하지 않음
        });

        console.log('파일 삭제 응답 상태:', response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('파일 삭제 실패 응답:', errorText);
          throw new Error(`파일 삭제에 실패했습니다: ${response.status}`);
        }

        const responseText = await response.text();
        console.log('파일 삭제 응답 텍스트:', responseText);
        
        try {
          // 빈 응답이 아닌 경우에만 JSON 파싱 시도
          if (responseText.trim()) {
            return JSON.parse(responseText);
          }
          return {};
        } catch (parseError) {
          console.error('JSON 파싱 에러:', parseError, responseText);
          throw new Error('응답을 파싱하는데 실패했습니다');
        }
      } catch (error) {
        console.error('파일 삭제 에러:', error);
        throw error;
      }
    },

    // 채팅 API
    async chat(message: string, model: string) {
      try {
        console.log(`채팅 API 호출: ${API_BASE_URL}/api/rag/ask`, { message, model });
        
        // 백엔드 API 요청
        const response = await fetch(`${API_BASE_URL}/api/rag/ask`, {
          method: 'POST',
          headers: getHeaders(true),
          body: JSON.stringify({ 
            query: message, 
            model,
          }),
          credentials: 'omit', // 인증 정보를 전송하지 않음
        });

        console.log('채팅 응답 상태:', response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('채팅 실패 응답:', errorText);
          throw new Error(`챗봇 응답을 받는데 실패했습니다: ${response.status}`);
        }

        const responseText = await response.text();
        console.log('채팅 응답 텍스트:', responseText.substring(0, 100) + '...');
        
        try {
          // 빈 응답이 아닌 경우에만 JSON 파싱 시도
          if (responseText.trim()) {
            return JSON.parse(responseText);
          }
          return {};
        } catch (parseError) {
          console.error('JSON 파싱 에러:', parseError, responseText.substring(0, 100) + '...');
          throw new Error('응답을 파싱하는데 실패했습니다');
        }
      } catch (error) {
        console.error('챗봇 에러:', error);
        throw error;
      }
    },
  },
}; 