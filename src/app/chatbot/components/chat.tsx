// src/app/chatbot/components/chat.tsx
'use client';

import { useState } from 'react';
import { sendPrompt, uploadFiles } from '@/lib/api';

export default function Chatbot() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<FileList | null>(null);

  const handleUpload = async () => {
    if (!files) return;
    const fileArray = Array.from(files);
    await uploadFiles(fileArray, "Llama-3.1");
    alert("업로드 완료!");
  };

  const handleSend = async () => {
    setLoading(true);
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    const response = await sendPrompt(input);
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setInput('');
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📄 Chat with your PDF</h2>

      <input type="file" multiple onChange={e => setFiles(e.target.files)} />
      <button className="mt-2 mb-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={handleUpload}>
        업로드 & 인덱싱
      </button>

      <div className="border p-4 rounded h-96 overflow-y-auto bg-gray-50 mb-4">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className="block px-2 py-1 bg-white rounded shadow inline-block">
              <strong>{msg.role === 'user' ? '👤' : '🤖'}</strong> {msg.content}
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-grow border px-3 py-2 rounded"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="질문을 입력하세요"
        />
        <button onClick={handleSend} disabled={loading} className="px-4 py-2 bg-green-500 text-white rounded">
          {loading ? '로딩중...' : '전송'}
        </button>
      </div>
    </div>
  );
}
