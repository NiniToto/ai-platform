// API 기본 URL 설정
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://e3d0-39-118-216-92.ngrok-free.app';
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
        // 백엔드 API 요청
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
          credentials: 'include',
          mode: 'cors',
        });

        if (!response.ok) {
          throw new Error('로그인에 실패했습니다');
        }

        return await response.json();
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
        // 백엔드 API 요청
        const response = await fetch(`${API_BASE_URL}/api/rag/files`, {
          headers: getHeaders(true),
          credentials: 'include',
          mode: 'cors',
        });

        if (!response.ok) {
          console.error('파일 목록 조회 실패:', response.status, response.statusText);
          throw new Error('파일 목록을 가져오는데 실패했습니다');
        }

        return await response.json();
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

        console.log('업로드 시작:', file.name, file.size);
        console.log('API URL:', API_BASE_URL);
        
        const response = await fetch(`${API_BASE_URL}/api/rag/upload`, {
          method: 'POST',
          headers,
          body: formData,
          credentials: 'include',
          mode: 'cors',
        });

        console.log('업로드 응답 상태:', response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('업로드 실패 응답:', errorText);
          throw new Error(`파일 업로드에 실패했습니다: ${response.status}`);
        }

        return await response.json();
      } catch (error) {
        console.error('파일 업로드 에러:', error);
        throw error;
      }
    },

    // 파일 삭제
    async deleteFile(filename: string) {
      try {
        // 백엔드 API 요청
        const response = await fetch(`${API_BASE_URL}/api/rag/delete/${encodeURIComponent(filename)}`, {
          method: 'DELETE',
          headers: getHeaders(true),
          credentials: 'include',
          mode: 'cors',
        });

        if (!response.ok) {
          throw new Error('파일 삭제에 실패했습니다');
        }

        return await response.json();
      } catch (error) {
        console.error('파일 삭제 에러:', error);
        throw error;
      }
    },

    // 채팅 API
    async chat(message: string, model: string) {
      try {
        // 백엔드 API 요청
        const response = await fetch(`${API_BASE_URL}/api/rag/ask`, {
          method: 'POST',
          headers: getHeaders(true),
          body: JSON.stringify({ 
            query: message, 
            model,
          }),
          credentials: 'include',
          mode: 'cors',
        });

        if (!response.ok) {
          throw new Error('챗봇 응답을 받는데 실패했습니다');
        }

        return await response.json();
      } catch (error) {
        console.error('챗봇 에러:', error);
        throw error;
      }
    },
  },
}; 