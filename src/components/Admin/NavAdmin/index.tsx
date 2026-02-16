'use client';

import { logoutAction } from '@/actions/auth.actions';
import clsx from 'clsx';
import {
  CircleXIcon,
  FileTextIcon,
  HouseIcon,
  LogOutIcon,
  MenuIcon,
  PlusIcon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  useEffect,
  useState,
} from 'react';

// Exportando linkClasses para ser acessível externamente
export const linkClasses = clsx(
  '[&>svg]:w-4] [&>svg]:h-4 px-4 rounded-lg',
  'flex items-center justify-start gap-2 cursor-pointer',
  'transition hover:bg-slate-600',
  'h-8',
  'shrink-0',
);

export function NavAdmin() {
  const [isOpen, setIsOpen] =
    useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setIsOpen(false);
  }, [pathname]);

  const navClasses = clsx(
    'bg-slate-900 text-slate-100 rounded-lg',
    'flex flex-col mb-4',
    'sm:flex-row sm:flex-wrap',
    !isOpen && 'h-10',
    !isOpen && 'overflow-hidden',
    'sm:overflow-visible sm:h-auto',
  );

  // Re-definindo linkClasses aqui dentro se necessário ou apenas usando a exportada
  // Se você quiser que a classe base seja sobrescrita com outras regras aqui, descomente e ajuste:
  /*
  linkClasses = clsx(
    linkClasses, // Pega a base exportada
    'transition hover:bg-slate-600', // Adiciona novas regras se precisar
  );
  */

  const openCloseBtnClasses = clsx(
    linkClasses, // Usando a linkClasses exportada
    'text-blue-200 italic',
    'sm:hidden',
  );

  return (
    <nav className={navClasses}>
      <button
        onClick={() =>
          setIsOpen((s) => !s)
        }
        className={openCloseBtnClasses}>
        {!isOpen && (
          <>
            <MenuIcon />
            Menu
          </>
        )}

        {isOpen && (
          <>
            <CircleXIcon />
            Fechar
          </>
        )}
      </button>

      <a
        className={linkClasses}
        href='/'
        target='_blank'>
        <HouseIcon />
        Home
      </a>
      <Link
        className={linkClasses}
        href='/admin/post'>
        <FileTextIcon />
        Posts
      </Link>

      <Link
        className={linkClasses}
        href='/admin/post/new'>
        <PlusIcon />
        Novo post
      </Link>

      <button
        onClick={() => logoutAction()}
        className={clsx(
          linkClasses,
          'text-rose-400 hover:bg-rose-900/20',
        )}>
        <LogOutIcon />
        Sair
      </button>
    </nav>
  );
}
