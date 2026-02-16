import { logoutAction } from '@/actions/auth.actions';
import clsx from 'clsx';
import { LogOutIcon } from 'lucide-react';
import { linkClasses } from './NavAdmin';

// No return, após os Links:
<button
  onClick={() => logoutAction()}
  className={clsx(
    linkClasses,
    'text-rose-400 hover:bg-rose-900/20',
  )}>
  <LogOutIcon />
  Sair
</button>;
