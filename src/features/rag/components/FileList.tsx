import { useState, useEffect } from 'react';
import { api } from '@/lib/api/index';

interface UploadedFile {
  name: string;
  uploaded_at: string;
  size: number;
  llm_model: string;
  embedding_model: string;
}

interface FileListProps {
  isAdmin: boolean;
  onDelete: (filename: string) => void;
}

export default function FileList({ isAdmin, onDelete }: FileListProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await api.rag.getFiles();
        setFiles(response.files || []);
      } catch (err) {
        console.error('파일 목록을 가져오는데 실패했습니다:', err);
        setFiles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-6">
        <p className="text-gray-500">파일 목록을 불러오는 중...</p>
      </div>
    );
  }

  if (files.length === 0) {
    return (
      <div className="text-center py-6 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-500">업로드된 문서가 없습니다</p>
        <p className="text-sm text-gray-400 mt-1">문서를 업로드하여 AI와 대화해보세요</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {files.map((file) => (
        <div key={file.name} className="flex items-center justify-between p-4 bg-blue-50/80 rounded-lg border border-blue-100 hover:bg-blue-50/100 transition-colors">
          <div>
            <div className="font-medium text-blue-800">{file.name}</div>
            <div className="text-sm text-blue-600">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                {file.llm_model}
              </span>
              <span className="text-blue-600 text-xs">
                {new Date(file.uploaded_at).toLocaleDateString()}
              </span>
            </div>
          </div>
          {isAdmin && (
            <button
              onClick={() => onDelete(file.name)}
              className="text-red-500 hover:text-red-700 w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-100"
              title="삭제"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
      ))}
    </div>
  );
} 