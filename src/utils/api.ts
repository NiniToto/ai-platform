// API 기본 URL 설정
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

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
        // 실제 구현 시 아래 주석을 해제하고 서버에 요청
        /*
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
          throw new Error('로그인에 실패했습니다');
        }

        return await response.json();
        */

        // 데모 목적으로 목업 데이터 반환
        if (username === 'admin' && password === 'password') {
          return {
            access_token: 'demo_token_12345',
            user: {
              username: 'admin',
              role: 'admin'
            }
          };
        } else {
          throw new Error('아이디 또는 비밀번호가 올바르지 않습니다');
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
        // 실제 구현 시 아래 주석을 해제하고 서버에 요청
        /*
        const response = await fetch(`${API_BASE_URL}/rag/files`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('파일 목록을 가져오는데 실패했습니다');
        }

        return await response.json();
        */

        // 데모 목적으로 목업 데이터 반환
        return [
          {
            name: 'project_report.pdf',
            uploaded_at: '2023-10-01T09:30:00Z',
            size: 1024 * 1024 * 2.5, // 2.5MB
            llm_model: 'llama-3.1',
            embedding_model: 'text-embedding-3-large',
          },
          {
            name: 'user_guide.pdf',
            uploaded_at: '2023-09-28T15:45:00Z',
            size: 1024 * 1024 * 1.2, // 1.2MB
            llm_model: 'gemma-3-12b',
            embedding_model: 'text-embedding-3-large',
          }
        ];
      } catch (error) {
        console.error('파일 목록 조회 에러:', error);
        throw error;
      }
    },

    // 파일 업로드
    async uploadFile(file: File) {
      try {
        // 실제 구현 시 아래 주석을 해제하고 서버에 요청
        /*
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`${API_BASE_URL}/rag/upload`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error('파일 업로드에 실패했습니다');
        }

        return await response.json();
        */

        // 데모 목적으로 업로드 성공으로 가정
        return {
          success: true,
          file: {
            name: file.name,
            uploaded_at: new Date().toISOString(),
            size: file.size,
            llm_model: 'llama-3.1',
            embedding_model: 'text-embedding-3-large',
          }
        };
      } catch (error) {
        console.error('파일 업로드 에러:', error);
        throw error;
      }
    },

    // 파일 삭제
    async deleteFile(filename: string) {
      try {
        // 실제 구현 시 아래 주석을 해제하고 서버에 요청
        /*
        const response = await fetch(`${API_BASE_URL}/rag/files/${filename}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('파일 삭제에 실패했습니다');
        }

        return await response.json();
        */

        // 데모 목적으로 삭제 성공으로 가정
        return {
          success: true,
          message: `${filename} 파일이 삭제되었습니다.`
        };
      } catch (error) {
        console.error('파일 삭제 에러:', error);
        throw error;
      }
    },

    // 채팅 API
    async chat(message: string, model: string) {
      try {
        // 실제 구현 시 아래 주석을 해제하고 서버에 요청
        /*
        const response = await fetch(`${API_BASE_URL}/rag/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
          body: JSON.stringify({ 
            message, 
            model,
          }),
        });

        if (!response.ok) {
          throw new Error('챗봇 응답을 받는데 실패했습니다');
        }

        return await response.json();
        */

        // 데모 목적으로 목업 응답 생성
        // 실제로는 서버에서 RAG 처리 후 응답
        return new Promise(resolve => {
          setTimeout(() => {
            resolve({
              answer: `질문하신 내용에 대해 ${model} 모델을 사용하여 답변드립니다. "${message}"에 관한 정보는 업로드된 문서에서 확인한 결과, 중요한 내용은 다음과 같습니다. 첫째, 해당 주제는 최근 많은 관심을 받고 있으며 프로젝트 보고서에서 자세히 다루고 있습니다. 둘째, 이 개념은 현대적인 접근 방식에서 핵심적인 요소로 간주됩니다. 추가 질문이 있으시면 언제든지 물어보세요.`
            });
          }, 1000);
        });
      } catch (error) {
        console.error('챗봇 에러:', error);
        throw error;
      }
    },
  },
}; 