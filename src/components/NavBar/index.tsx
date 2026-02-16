'use client';

import {
  useState,
  useRef,
  useEffect,
} from 'react';
import { ChevronDown } from 'lucide-react';
import { CATEGORIES } from '@/lib/constants';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import clsx from 'clsx';
import { useNavigation } from '@/context';

const NavBar: React.FC = () => {
  const { isTheaterMode } =
    useNavigation();
  const searchParams =
    useSearchParams();
  const activeCategory =
    searchParams.get('cat') ||
    'recommended';
  const [isCatOpen, setIsCatOpen] =
    useState(false);
  const catRef =
    useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(
      event: MouseEvent,
    ) {
      if (
        catRef.current &&
        !catRef.current.contains(
          event.target as Node,
        )
      ) {
        setIsCatOpen(false);
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
  }, [catRef]);

  const navItems = [
    {
      label: 'Vídeos',
      href: '/?cat=recommended',
    },
    {
      label: 'Live cams',
      href: '#',
    }, // Placeholder
    {
      label: 'AI chat',
      href: '#',
    }, // Placeholder
    {
      label: 'Nossa rede',
      href: '#',
    }, // Placeholder
  ];

  return (
    <div
      className={clsx(
        'w-full',
        'bg-white',
        'dark:bg-dark-900',
        'border-b',
        'border-gray-200',
        'dark:border-white/5',
        'relative',
        'z-40',
        'transition-colors',
        'duration-300',
        `... transition-transform duration-500 ${isTheaterMode ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`,
      )}>
      <div className='container mx-auto max-w-[1800px px-4'>
        <div
          className={clsx(
            'flex',
            'items-center',
            'gap-6',
            'py-3',
            'text-sm',
            'font-medium',
            'text-gray-700',
            'dark:text-gray-300',
            'overflow-x-auto',
            'no-scrollbar',
          )}>
          {/* Static Item */}
          <Link
            href='/?cat=recommended'
            className={clsx(
              'whitespace-nowrap',
              'hover:text-primary-500',
              'transition-colors',
              `${activeCategory === 'recommended' ? 'text-primary-500' : ''}`,
            )}>
            Vídeos
          </Link>

          {/* Categories Dropdown */}
          <div
            className='relative'
            ref={catRef}>
            <button
              onClick={() =>
                setIsCatOpen(!isCatOpen)
              }
              className={clsx(
                'flex',
                'items-center',
                'gap-1',
                'whitespace-nowrap',
                'hover:text-primary-500',
                'transition-colors',
                `${isCatOpen ? 'text-primary-500' : ''}`,
              )}>
              Categorias
              <ChevronDown
                className={`w-4 h-4 transition-transform ${isCatOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Dropdown Menu */}
            {isCatOpen && (
              <div className='absolute top-full left-0 mt-2 w-64 bg-white dark:bg-dark-800 rounded-md shadow-xl border border-gray-200 dark:border-white/10 overflow-hidden py-2 z-50'>
                {CATEGORIES.map(
                  (cat) => (
                    <Link
                      key={cat.id}
                      href={`/?cat=${cat.slug}`}
                      onClick={() => {
                        setIsCatOpen(
                          false,
                        );
                      }}
                      className={`
                      w-full text-left px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-white/5 flex items-center gap-3 transition-colors
                      ${activeCategory === cat.slug ? 'text-primary-500 bg-gray-50 dark:bg-white/5' : 'text-gray-700 dark:text-gray-300'}
                    `}>
                      <span className='text-gray-400 dark:text-gray-500'>
                        {cat.icon}
                      </span>
                      {cat.name}
                    </Link>
                  ),
                )}
              </div>
            )}
          </div>

          {/* Other Static Items */}
          {navItems
            .slice(1)
            .map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className='whitespace-nowrap hover:text-primary-500 transition-colors'>
                {item.label}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
