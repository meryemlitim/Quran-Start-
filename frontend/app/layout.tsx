import type { Metadata } from 'next';
import { Noto_Sans, Noto_Naskh_Arabic } from 'next/font/google';
import './globals.css';

const notoSans = Noto_Sans({
  subsets: ['latin'],
  variable: '--font-latin',
});

const notoArabic = Noto_Naskh_Arabic({
  subsets: ['arabic'],
  variable: '--font-arabic',
});

export const metadata: Metadata = {
  title: 'Quran Start',
  description: 'Learn Quran with Joy',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${notoSans.variable} ${notoArabic.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}