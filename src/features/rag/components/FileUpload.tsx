import { useRef } from 'react';
import { api } from '@/lib/api/index';

interface FileUploadProps {
  isAdmin: boolean;
  onUploadComplete: () => void;
}

export default function FileUpload({ isAdmin, onUploadComplete }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.pdf')) {
      alert('PDF 파일만 업로드할 수 있습니다.');
      return;
    }

    try {
      await api.rag.uploadFile(file);
      alert('파일 업로드가 완료되었습니다.');
      onUploadComplete();
    } catch (error) {
      console.error('파일 업로드 실패:', error);
      alert('파일 업로드에 실패했습니다.');
    }
  };

  const triggerFileInput = () => {
    if (!isAdmin) {
      alert('관리자로 로그인하세요.');
      return;
    }
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white/50 backdrop-blur-sm p-6 rounded-xl shadow-md border border-white/20">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">📄 PDF 업로드</h2>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <input
          type="file"
          accept=".pdf"
          onChange={handleUpload}
          className="hidden"
          ref={fileInputRef}
          disabled={!isAdmin}
        />
        <div
          onClick={triggerFileInput}
          className={`cursor-pointer ${!isAdmin && 'opacity-70'}`}
        >
          <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="mt-2 text-sm text-gray-600">
            {isAdmin ? 'PDF 파일을 드래그하거나 클릭하여 업로드' : 'PDF 업로드는 관리자만 가능합니다'}
          </p>
        </div>
      </div>
    </div>
  );
} 