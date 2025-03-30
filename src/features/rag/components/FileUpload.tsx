import { useState, useRef, useCallback } from 'react';
import { api } from '@/lib/api/index';

interface FileUploadProps {
  isAdmin: boolean;
  onUploadComplete: () => void;
}

export default function FileUpload({ isAdmin, onUploadComplete }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const showAdminLoginAlert = useCallback(() => {
    alert('파일 업로드는 관리자 권한이 필요합니다. 관리자로 로그인해주세요.');
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isAdmin) {
      showAdminLoginAlert();
      // Clear the input value if the user somehow selected a file without admin rights
      if (event.target) event.target.value = '';
      return;
    }
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!isAdmin || !selectedFile) return;

    setIsUploading(true);
    try {
      await api.rag.uploadFile(selectedFile);
      alert('파일 업로드가 완료되었습니다.');
      onUploadComplete();
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Clear file input after successful upload
      }
    } catch (error) {
      console.error('파일 업로드 실패:', error);
      alert('파일 업로드에 실패했습니다. 콘솔 로그를 확인해주세요.');
    } finally {
      setIsUploading(false);
    }
  };

  // Drag and Drop Handlers
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAdmin) return;
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAdmin) return;
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // Optionally add visual feedback here if needed
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAdmin) {
      showAdminLoginAlert();
      setIsDragging(false);
      return;
    }

    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      // Basic validation (can be expanded)
      const allowedTypes = ['.pdf', '.doc', '.docx', '.txt'];
      const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
      if (allowedTypes.includes(fileExtension)) {
        setSelectedFile(file);
      } else {
        alert('지원하지 않는 파일 형식입니다. (PDF, DOC, DOCX, TXT)');
      }
      // Clear the native file input if it was somehow used
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    if (!isAdmin) {
      showAdminLoginAlert();
      return;
    }
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-3">
      <div 
        className={`relative flex flex-col items-center justify-center px-4 py-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${ 
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        } ${!isAdmin ? 'cursor-not-allowed opacity-70' : ''}`}
        onClick={!isAdmin ? showAdminLoginAlert : undefined} // Show alert on click if not admin
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <svg className="mx-auto h-10 w-10 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="flex text-sm text-gray-600 mt-2">
          <span 
            className={`relative rounded-md font-medium ${isAdmin ? 'text-blue-600 hover:text-blue-500 cursor-pointer' : 'text-gray-500'}`}
            onClick={isAdmin ? triggerFileInput : undefined} // Only trigger file input if admin
          >
            파일 선택
          </span>
          <p className="pl-1">또는 드래그 앤 드롭</p>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          PDF, DOC, DOCX, TXT (최대 10MB)
        </p>
        <input
          id="file-upload"
          name="file-upload"
          type="file"
          className="sr-only"
          accept=".pdf,.doc,.docx,.txt" // Ensure consistency
          onChange={handleFileChange}
          ref={fileInputRef}
          disabled={!isAdmin} // Keep disabled for non-admins
          onClick={(e) => { // Prevent click propagation if not admin
            if (!isAdmin) e.preventDefault();
          }}
        />
        {selectedFile && (
          <div className="mt-3 text-center text-sm text-gray-700 bg-gray-100 px-3 py-1 rounded-md">
            선택: <span className="font-medium">{selectedFile.name}</span> ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
          </div>
        )}
      </div>
      
      {isAdmin && (
        <div className="flex justify-end">
          <button
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
          >
            {isUploading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                업로드 중...
              </>
            ) : (
              '선택 파일 업로드'
            )}
          </button>
        </div>
      )}
    </div>
  );
} 