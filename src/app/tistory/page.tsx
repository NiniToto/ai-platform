import Layout from '@/components/Layout';

export default function TistoryPage() {
  return (
    <Layout>
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-white/20">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">📝 티스토리</h1>
        <p className="text-gray-600 text-lg">티스토리 페이지입니다.</p>
      </div>
    </Layout>
  );
} 