'use client';

import React, {
  useState,
  useRef,
  useEffect,
} from 'react';
import {
  Search,
  Settings,
  Globe,
  DollarSign,
  Image as ImageIcon,
  Moon,
  VenusAndMars,
  ChevronRight,
} from 'lucide-react';
import { useNavigation } from '@/context';
import {
  useRouter,
  useSearchParams,
} from 'next/navigation';
import Image from 'next/image';
import clsx from 'clsx';
const Header: React.FC = () => {
  const { isTheaterMode } =
    useNavigation();
  const {
    isDarkMode,
    toggleTheme,
    largeThumbnails,
    toggleLargeThumbnails,
  } = useNavigation();
  const router = useRouter();
  const searchParams =
    useSearchParams();

  const [localQuery, setLocalQuery] =
    useState(
      searchParams.get('q') || '',
    );
  const [
    isSettingsOpen,
    setIsSettingsOpen,
  ] = useState(false);
  const settingsRef =
    useRef<HTMLDivElement>(null);

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
  };

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
  }, [settingsRef]);

  return (
    <header
      className={clsx(
        'bg-white/90',
        'dark:bg-dark-900/95',
        'backdrop-blur-md',
        'border-b',
        'border-gray-200',
        'dark:border-white/5',
        'transition-colors',
        'duration-300',
        'shadow-sm',
        'relative',
        'z-50',
        `... transition-transform duration-500 ${isTheaterMode ? '-translate-y-full' : 'translate-y-0'}`,
      )}>
      <div className='container mx-auto max-w-450 h-20 px-4 flex items-center justify-between gap-4'>
        {/* Left: Creative Logo */}
        <div
          className='flex items-center gap-2 cursor-pointer select-none min-w-fit'
          onClick={() =>
            router.push('/')
          }>
          <div className='flex items-baseline group'>
            <span className='text-3xl font-black tracking-tighter text-rose-500 group-hover:text-rose-400 transition-colors drop-shadow-sm'>
              FullStackHubLabs
            </span>
            <span className='text-xl font-bold text-slate-500 dark:text-slate-400'>
              .com
            </span>
          </div>
        </div>

        {/* Center Area: Images + Search */}
        <div className='flex-1 max-w-5xl flex items-center justify-center gap-3 sm:gap-6 px-2'>
          {/* Left Image (ml.png) */}
          <div className='hidden md:block shrink-0 hover:scale-105 transition-transform'>
            <Image
              src='/ml.png'
              alt='Featured Left'
              className='h-12 w-auto object-contain'
              width={400}
              height={225}
            />
          </div>

          {/* Search Bar */}
          <form
            onSubmit={
              handleSearchSubmit
            }
            className='flex-1 relative group w-full max-w-2xl'>
            <div className='relative overflow-hidden rounded-full shadow-inner bg-slate-100 dark:bg-dark-950 border border-slate-200 dark:border-white/10 focus-within:border-rose-500 focus-within:ring-2 focus-within:ring-rose-500/20 transition-all duration-300'>
              <input
                type='text'
                placeholder='Pesquisar vídeos de 59.787.780 ...'
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
          </form>

          {/* Right Image (bda.png) */}
          <div className='hidden md:block shrink-0 hover:scale-105 transition-transform'>
            <Image
              src='/bda.png'
              alt='Featured Right'
              className='h-12 w-auto object-contain'
              width={400}
              height={225}
            />
          </div>
        </div>

        {/* Right: Settings & Icons */}
        <div className='flex items-center gap-3 relative min-w-fit'>
          {/* Gender Preference Icon */}
          <div
            className='hidden sm:flex items-center justify-center p-2.5 text-rose-500 bg-rose-50 dark:bg-rose-900/10 rounded-xl hover:bg-rose-100 dark:hover:bg-rose-900/20 transition-colors cursor-pointer border border-rose-100 dark:border-rose-900/20'
            title='Preferências de gênero'>
            <VenusAndMars className='w-5 h-5' />
          </div>

          {/* Settings Menu */}
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
                  <div className='px-5 py-3.5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer border-b border-gray-100 dark:border-white/5 group'>
                    <div className='flex items-center gap-3 text-gray-700 dark:text-gray-200'>
                      <div className='p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-500'>
                        <Globe className='w-4 h-4' />
                      </div>
                      <div className='flex flex-col'>
                        <span className='text-sm font-semibold group-hover:text-blue-500 transition-colors'>
                          Idioma
                        </span>
                        <span className='text-xs text-gray-400'>
                          Português
                          (Brasileiro)
                        </span>
                      </div>
                    </div>
                    <ChevronRight className='w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors' />
                  </div>

                  <div className='px-5 py-3.5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer border-b border-gray-100 dark:border-white/5 group'>
                    <div className='flex items-center gap-3 text-gray-700 dark:text-gray-200'>
                      <div className='p-2 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-500'>
                        <DollarSign className='w-4 h-4' />
                      </div>
                      <div className='flex flex-col'>
                        <span className='text-sm font-semibold group-hover:text-green-500 transition-colors'>
                          Preços
                        </span>
                        <span className='text-xs text-gray-400'>
                          Grátis e
                          Premium
                        </span>
                      </div>
                    </div>
                    <ChevronRight className='w-4 h-4 text-gray-300 group-hover:text-green-500 transition-colors' />
                  </div>

                  <div className='px-5 py-3.5 flex items-center justify-between'>
                    <div className='flex items-center gap-3 text-gray-700 dark:text-gray-200'>
                      <div className='p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-500'>
                        <ImageIcon className='w-4 h-4' />
                      </div>
                      <div className='flex flex-col'>
                        <span className='text-sm font-semibold'>
                          Thumbnails
                          grandes
                        </span>
                        <span className='text-xs text-gray-400'>
                          {largeThumbnails
                            ? 'Ativado'
                            : 'Desativado'}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={
                        toggleLargeThumbnails
                      }
                      className={`w-11 h-6 rounded-full relative transition-colors duration-200 ${largeThumbnails ? 'bg-purple-500' : 'bg-gray-200 dark:bg-gray-700'}`}>
                      <div
                        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${largeThumbnails ? 'translate-x-5' : 'translate-x-0'}`}
                      />
                    </button>
                  </div>

                  <div className='px-5 py-3.5 flex items-center justify-between'>
                    <div className='flex items-center gap-3 text-gray-700 dark:text-gray-200'>
                      <div className='p-2 bg-slate-100 dark:bg-white/10 rounded-lg text-slate-500 dark:text-slate-300'>
                        <Moon className='w-4 h-4' />
                      </div>
                      <div className='flex flex-col'>
                        <span className='text-sm font-semibold'>
                          Modo noturno
                        </span>
                        <span className='text-xs text-gray-400'>
                          {isDarkMode
                            ? 'Ativado'
                            : 'Desativado'}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={
                        toggleTheme
                      }
                      className={`w-11 h-6 rounded-full relative transition-colors duration-200 ${isDarkMode ? 'bg-slate-700' : 'bg-gray-200 dark:bg-gray-700'}`}>
                      <div
                        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${isDarkMode ? 'translate-x-5' : 'translate-x-0'}`}
                      />
                    </button>
                  </div>

                  <div className='bg-gray-50/50 dark:bg-black/20 mt-2 py-2 border-t border-gray-100 dark:border-white/5'>
                    <div className='px-6 py-2 text-sm text-gray-500 hover:text-rose-500 cursor-pointer transition-colors font-medium'>
                      Ajuda
                    </div>
                    <div className='px-6 py-2 text-sm text-gray-500 hover:text-rose-500 cursor-pointer transition-colors font-medium'>
                      Enviar feedback
                    </div>
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
