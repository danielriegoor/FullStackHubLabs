// src/components/Header/index.tsx
'use client';

import React, {
  useState,
  useRef,
  useEffect,
} from 'react';
import {
  Search,
  Settings,
  VenusAndMars,
  Check,
} from 'lucide-react';
import { useNavigation } from '@/context';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import SearchBar from './SearchBar';

const Header: React.FC = () => {
  const {
    isTheaterMode,
    isDarkMode,
    toggleTheme,
  } = useNavigation();

  const [
    isSettingsOpen,
    setIsSettingsOpen,
  ] = useState(false);
  const [
    isMobileSearchOpen,
    setIsMobileSearchOpen,
  ] = useState(false);
  const [
    isGenderMenuOpen,
    setIsGenderMenuOpen,
  ] = useState(false);

  const settingsRef =
    useRef<HTMLDivElement>(null);
  const genderRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(
      event: MouseEvent,
    ) {
      if (
        settingsRef.current &&
        !settingsRef.current.contains(
          event.target as Node,
        )
      ) {
        setIsSettingsOpen(false);
      }
      if (
        genderRef.current &&
        !genderRef.current.contains(
          event.target as Node,
        )
      ) {
        setIsGenderMenuOpen(false);
      }
    }
    document.addEventListener(
      'mousedown',
      handleClickOutside,
    );
    return () =>
      document.removeEventListener(
        'mousedown',
        handleClickOutside,
      );
  }, []);

  return (
    <header
      className={clsx(
        'bg-white/90 dark:bg-dark-900/95 backdrop-blur-md border-b border-gray-200 dark:border-white/5 transition-colors duration-300 shadow-sm relative z-120',
        `transition-transform duration-500 ${isTheaterMode ? '-translate-y-full' : 'translate-y-0'}`,
      )}>
      <div className='container mx-auto max-w-450 h-20 px-4 flex items-center justify-between gap-4'>
        {/* LOGO */}
        <Link
          href='/'
          className={clsx(
            'items-center gap-2 select-none min-w-fit',
            isMobileSearchOpen
              ? 'hidden md:flex'
              : 'flex',
          )}>
          <div className='flex items-baseline group'>
            <span className='text-3xl font-black tracking-tighter text-rose-500 group-hover:text-rose-400 transition-colors drop-shadow-sm'>
              DotF4p
            </span>
            <span className='text-xl font-bold text-slate-500 dark:text-slate-400'>
              .com
            </span>
          </div>
        </Link>

        {/* SEARCH & IMAGES */}
        <div
          className={clsx(
            'flex-1 max-w-5xl items-center justify-center gap-3 sm:gap-6 px-2',
            isMobileSearchOpen
              ? 'flex'
              : 'hidden md:flex',
          )}>
          <div className='hidden md:block shrink-0 hover:scale-105 transition-transform'>
            <Image
              src='/ml.png'
              alt='Featured Left'
              width={150}
              height={50}
              className='h-12 w-auto object-contain'
            />
          </div>

          <div className='flex-1 w-full max-w-2xl'>
            <SearchBar
              isMobileOpen={
                isMobileSearchOpen
              }
              onCloseMobile={() =>
                setIsMobileSearchOpen(
                  false,
                )
              }
            />
          </div>

          <div className='hidden md:block shrink-0 hover:scale-105 transition-transform'>
            <Image
              src='/bda.png'
              alt='Featured Right'
              width={150}
              height={50}
              className='h-12 w-auto object-contain'
            />
          </div>
        </div>

        {/* ICONS RIGHT */}
        <div
          className={clsx(
            'items-center gap-3 relative min-w-fit',
            isMobileSearchOpen
              ? 'hidden md:flex'
              : 'flex',
          )}>
          <button
            className='md:hidden p-2 text-gray-500 hover:text-rose-500 transition-colors bg-gray-100 dark:bg-white/5 rounded-full'
            onClick={() =>
              setIsMobileSearchOpen(
                true,
              )
            }>
            <Search className='w-5 h-5' />
          </button>

          {/* GENDER DUMMY */}
          <div
            className='relative hidden sm:block'
            ref={genderRef}>
            <button
              onClick={() =>
                setIsGenderMenuOpen(
                  !isGenderMenuOpen,
                )
              }
              className={clsx(
                'flex items-center justify-center p-2.5 rounded-xl transition-colors border',
                isGenderMenuOpen
                  ? 'bg-rose-100 dark:bg-rose-900/30 border-rose-200 dark:border-rose-900/50 text-rose-600'
                  : 'text-rose-500 bg-rose-50 dark:bg-rose-900/10 border-rose-100 dark:border-rose-900/20 hover:bg-rose-100 dark:hover:bg-rose-900/20',
              )}>
              <VenusAndMars className='w-5 h-5' />
            </button>

            {isGenderMenuOpen && (
              <div className='absolute right-0 top-full mt-4 w-48 bg-white dark:bg-dark-900 rounded-xl shadow-xl border border-gray-200 dark:border-white/10 z-50 py-2'>
                <div className='px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-white/5 mb-2'>
                  Preferência
                </div>
                <button className='w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-white/5 flex items-center justify-between'>
                  <span>Hétero</span>{' '}
                  <Check className='w-4 h-4 text-rose-500' />
                </button>
                <button className='w-full text-left px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5 flex items-center justify-between'>
                  <span>
                    Gay (Em breve)
                  </span>
                </button>
                <button className='w-full text-left px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5 flex items-center justify-between'>
                  <span>
                    Trans (Em breve)
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* SETTINGS */}
          <div
            className='relative'
            ref={settingsRef}>
            <button
              onClick={() =>
                setIsSettingsOpen(
                  !isSettingsOpen,
                )
              }
              className={`p-2.5 rounded-xl transition-all duration-200 border ${isSettingsOpen ? 'bg-gray-100 dark:bg-white/10 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white' : 'border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'}`}>
              <Settings className='w-5 h-5' />
            </button>

            {isSettingsOpen && (
              <div className='absolute right-0 top-full mt-4 w-80 bg-white dark:bg-dark-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-white/10 z-50 py-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200'>
                <div className='flex flex-col'>
                  <div className='px-5 py-3.5 flex items-center justify-between'>
                    <span className='text-sm font-semibold dark:text-white'>
                      Modo Noturno
                    </span>
                    <button
                      onClick={
                        toggleTheme
                      }
                      className={`w-11 h-6 rounded-full relative transition-colors duration-200 ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200 dark:bg-gray-700'}`}>
                      <div
                        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${isDarkMode ? 'translate-x-5' : 'translate-x-0'}`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
