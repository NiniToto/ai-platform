import { getHeaders } from '@/lib/utils/headers';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://8cc7-39-118-216-92.ngrok-free.app';

export const api = {
  auth: {
    async login(username: string, password: string) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
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
      } catch (error) {
        console.error('로그인 에러:', error);
        throw error;
      }
    },
  },
  rag: {
    async getFiles() {
      try { 
        const formData = new FormData();
        const response = await fetch(`${API_BASE_URL}/api/rag/files`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: formData,
          });

        if (!response.ok) {
          throw new Error('파일 목록을 가져오는데 실패했습니다');
        }

        const text = await response.text();
        try {
          return JSON.parse(text);
        } catch (e) {
          console.error('파일 목록 응답 텍스트:', text);
          throw new Error('응답을 파싱하는데 실패했습니다');
        }
      } catch (error) {
        console.error('파일 목록 조회 에러:', error);
        throw error;
      }
    },

    async uploadFile(file: File) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        console.log('업로드 요청:', {
          url: `${API_BASE_URL}/api/rag/upload`,
          method: 'POST',
          headers: getHeaders(true),
          file: {
            name: file.name,
            type: file.type,
            size: file.size
          }
        });

        const response = await fetch(`${API_BASE_URL}/api/rag/upload`, {
          method: 'POST',
          headers: {
            ...getHeaders(true),
            'Accept': 'application/json'
          },
          body: formData,
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('서버 응답:', errorText);
          throw new Error(`파일 업로드 실패: ${errorText}`);
        }

        const result = await response.json();
        console.log('업로드 성공:', result);
        return result;
      } catch (error) {
        console.error('파일 업로드 에러:', error);
        throw error;
      }
    },

    async deleteFile(filename: string) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/rag/delete/${encodeURIComponent(filename)}`, {
          method: 'DELETE',
          headers: getHeaders(true),
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

    async chat(message: string, model: string) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/rag/ask`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            query: message, 
            model,
          }),
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
  }
}; 