'use client';

import React from 'react';
import Header from '@/components/Header';
import NavBar from '@/components/NavBar';
import { NavigationProvider } from '@/context'; // Mantém o provider aqui

export default function RootClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NavigationProvider>
      <div className="min-h-screen bg-sky-200 dark:bg-dark-950 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
        <div className="fixed top-0 left-0 right-0 z-50">
          <Header />
          <NavBar />
        </div>

        <main className="pt-32 min-h-screen">
          {children}
        </main>
      </div>
    </NavigationProvider>
  );
}
