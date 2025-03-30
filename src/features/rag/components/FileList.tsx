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

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const response = await api.rag.getFiles();
      const sortedFiles = (response.files || []).sort((a: UploadedFile, b: UploadedFile) => 
        new Date(b.uploaded_at).getTime() - new Date(a.uploaded_at).getTime()
      );
      setFiles(sortedFiles);
    } catch (err) {
      console.error('파일 목록을 가져오는데 실패했습니다:', err);
      setFiles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleDeleteAndUpdate = async (filename: string) => {
    await onDelete(filename);
    fetchFiles();
  };

  if (loading) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-500 text-sm">파일 목록 로딩 중...</p>
      </div>
    );
  }

  if (files.length === 0) {
    return (
      <div className="text-center py-4 px-3 bg-gray-50 rounded-md border border-dashed border-gray-300">
        <p className="text-gray-500 text-sm">업로드된 문서가 없습니다.</p>
        <p className="text-xs text-gray-400 mt-1">문서를 업로드하면 여기에 표시됩니다.</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200/80 max-h-[200px] overflow-y-auto border rounded-md scroll-smooth flex-grow min-h-0">
      {files.map((file, index) => (
        <div 
          key={file.name} 
          className="group p-2.5 flex items-center justify-between text-sm opacity-0 animate-fade-in transition-all duration-150 ease-in-out hover:bg-indigo-50 hover:shadow-sm hover:scale-[1.02] hover:z-10 relative"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className="flex-1 min-w-0 mr-2">
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
              <span className="font-medium text-gray-800 truncate block group-hover:text-indigo-800" title={file.name}>
                {file.name}
              </span>
              {file.llm_model && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 flex-shrink-0 shadow-xs group-hover:shadow-sm transition-shadow">
                  {file.llm_model}
                </span>
              )}
            </div>
            <div className="mt-0.5 text-xs text-gray-500 pl-6">
              {(file.size / 1024 / 1024).toFixed(2)} MB • {new Date(file.uploaded_at).toLocaleDateString()}
            </div>
          </div>
          {isAdmin && (
            <button
              onClick={() => handleDeleteAndUpdate(file.name)}
              className="p-1 text-gray-400 hover:text-red-600 focus:outline-none focus:ring-1 focus:ring-red-300 rounded-md transition-all flex-shrink-0 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
              title="파일 삭제"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      ))}
    </div>
  );
} 