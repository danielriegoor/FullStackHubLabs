import '@/app/globals.css';
import RootClientLayout from './RootClientLayout';
import { Suspense } from 'react';

export const metadata = {
  title:
    'FullStackHubLabs - Seu learning hub Full Stack',
  description:
    'FullStackHubLabs - Seu learning hub Full Stack',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='pt-br' className='dark'>
      <body className='antialiased'>
        <Suspense
          fallback={
            <div className='min-h-screen bg-dark-950 animate-pulse' />
          }>
          <RootClientLayout>
            {children}
          </RootClientLayout>
        </Suspense>
      </body>
    </html>
  );
}
