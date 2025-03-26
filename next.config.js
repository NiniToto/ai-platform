/** @type {import('next').NextConfig} */

const nextConfig = {
  /* config options here */
  images: {
    unoptimized: true, // Netlify 배포를 위한 설정
  },
  // API URL이 HTTPS인 경우 보안 헤더 추가
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig; 