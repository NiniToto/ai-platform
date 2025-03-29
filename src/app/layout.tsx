import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Layout from '@/components/Layout';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const geist_mono = inter;

export const metadata: Metadata = {
  title: 'TNLabs',
  description: 'TNLabs - AI 서비스 통합 플랫폼',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={`${inter.variable} ${geist_mono.variable} font-sans bg-[var(--background)] text-[var(--foreground)]`}>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
