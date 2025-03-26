// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';

const categories = [
  {
    title: '💬 채팅 & 대화',
    features: [
      {
        title: '📚 RAG 챗봇',
        description: 'PDF 문서를 업로드하고 대화하며 정보를 탐색하세요.',
        href: '/chatbot',
        icon: '🤖',
        isReady: true,
      },
      {
        title: '💭 심리상담 AI',
        description: 'AI와 대화하며 심리 상태를 분석하고 상담받으세요.',
        href: '/counseling',
        icon: '💫',
        isReady: false,
      },
      {
        title: '🎨 이미지 대화 AI',
        description: '사진을 업로드하고 실시간으로 대화하며 이미지를 분석하세요.',
        href: '/image-chat',
        icon: '🖼️',
        isReady: false,
      },
    ],
  },
  {
    title: '📝 문서 & 텍스트',
    features: [
      {
        title: '📄 문서 요약 AI',
        description: 'PDF 문서를 자동으로 요약하고 핵심 내용을 파악하세요.',
        href: '/pdf-summary',
        icon: '📑',
        isReady: false,
      },
      {
        title: '✍️ 한글 문서 AI',
        description: 'AI가 한글 문서를 작성하고 편집해드립니다.',
        href: '/hwp-writer',
        icon: '📝',
        isReady: false,
      },
    ],
  },
  {
    title: '🔍 정보 수집 & 분석',
    features: [
      {
        title: '🔍 웹 스크래핑 AI',
        description: '웹사이트에서 원하는 정보를 자동으로 추출하고 분석하세요.',
        href: '/scraper',
        icon: '🌐',
        isReady: false,
      },
      {
        title: '💼 기업분석 AI',
        description: '자기소개서 작성을 위한 맞춤형 기업 분석을 받으세요.',
        href: '/company-analysis',
        icon: '🏢',
        isReady: false,
      },
      {
        title: '✈️ 여행지 추천 AI',
        description: '선호도와 조건에 맞는 최적의 여행지를 추천해드립니다.',
        href: '/travel-recommendation',
        icon: '🌍',
        isReady: false,
      },
    ],
  },
];

export default function Home() {
  return (
    <Layout>
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-white/20">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            TNLabs AI 플랫폼
          </h1>
          <p className="text-gray-600 text-xl">
            다양한 AI 서비스를 한곳에서 경험해보세요.
          </p>
        </div>

        <div className="space-y-12">
          {categories.map((category, index) => (
            <div key={index}>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{category.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.features.map((feature, featureIndex) => (
                  <Link
                    href={feature.href}
                    key={featureIndex}
                    className="bg-white/50 backdrop-blur-sm p-6 rounded-xl shadow-md border border-white/20 transition-transform hover:transform hover:scale-105 hover:shadow-lg relative"
                  >
                    {feature.isReady ? (
                      <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-bl-lg rounded-tr-lg z-10 flex items-center">
                        <span className="mr-1">✓</span> 이용 가능
                      </div>
                    ) : (
                      <div className="absolute top-0 right-0 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-bl-lg rounded-tr-lg z-10">
                        공사중 🚧
                      </div>
                    )}
                    <div className="text-4xl mb-3">{feature.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
