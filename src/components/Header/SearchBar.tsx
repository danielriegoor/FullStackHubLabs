// src/components/Header/SearchBar.tsx
'use client';

import React, { useState } from 'react';
import {
  Search,
  X,
} from 'lucide-react';
import {
  useRouter,
  useSearchParams,
} from 'next/navigation';
import clsx from 'clsx';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export default function SearchBar({
  isMobileOpen,
  onCloseMobile,
}: SearchBarProps) {
  const router = useRouter();
  const searchParams =
    useSearchParams();
  const [localQuery, setLocalQuery] =
    useState(
      searchParams.get('q') || '',
    );

  // Lógica de roteamento encapsulada no próprio componente
  const handleSearchSubmit = (
    e: React.FormEvent,
  ) => {
    e.preventDefault();
    if (localQuery.trim()) {
      router.push(
        `/?q=${encodeURIComponent(localQuery)}`,
      );
    } else {
      router.push('/');
    }
    onCloseMobile(); // Fecha no mobile após buscar
  };

  return (
    <form
      onSubmit={handleSearchSubmit}
      className={
        styles.searchContainer
      }>
      <div
        className={clsx(
          styles.searchInputWrapper,
          'relative overflow-hidden rounded-full shadow-inner bg-slate-100 dark:bg-dark-950 border border-slate-200 dark:border-white/10 focus-within:border-rose-500 focus-within:ring-2 focus-within:ring-rose-500/20',
        )}>
        <input
          type='text'
          placeholder='Pesquisar vídeos...'
          value={localQuery}
          onChange={(e) =>
            setLocalQuery(
              e.target.value,
            )
          }
          className='w-full bg-transparent py-3 pl-6 pr-12 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none'
        />
        <button
          type='submit'
          className='absolute right-1 top-1 bottom-1 px-4 rounded-full bg-white dark:bg-white/5 flex items-center justify-center text-gray-400 hover:text-rose-500 transition-colors'>
          <Search className='h-5 w-5' />
        </button>
      </div>

      {/* Botão de Fechar Exclusivo do Mobile */}
      {isMobileOpen && (
        <button
          type='button'
          onClick={onCloseMobile}
          className={clsx(
            styles.mobileCloseButton,
            'md:hidden ml-3 p-2 text-gray-400 hover:text-rose-500 bg-gray-100 dark:bg-white/5 rounded-full',
          )}>
          <X className='w-5 h-5' />
        </button>
      )}
    </form>
  );
}
