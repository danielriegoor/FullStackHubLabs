// src/app/admin/login/page.tsx
'use client';

import { loginAction } from '@/actions/auth.actions';
import { Button } from '@/components/Button';
import { InputText } from '@/components/InputText';
import { useState } from 'react';

export default function LoginPage() {
  const [error, setError] =
    useState('');

  async function handleSubmit(
    formData: FormData,
  ) {
    const res =
      await loginAction(formData);
    if (res?.error) setError(res.error);
  }

  return (
    /**
     * O container principal agora usa flex-col para podermos controlar
     * o espaço no topo (pt-40) e centralizar horizontalmente (items-center).
     */
    <div className='w-full min-h-screen flex flex-col items-center p-40 px-4'>
      {/* A Box: 
          - max-w-sm: Mantém ela pequena e elegante.
          - backdrop-blur: Dá um efeito de transparência premium se houver algo atrás.
          - rounded-3xl: Curvatura moderna que você sugeriu.
      */}
      <div className=' bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl p-10 rounded-[2.5rem] border border-gray-200 dark:border-white/5 shadow-2xl'>
        <h1 className='text-xl font-black text-gray-900 dark:text-white mb-8 text-center uppercase tracking-widest'>
          Admin Access
        </h1>

        <form
          action={handleSubmit}
          className='flex flex-col gap-6'>
          <InputText
            labelText='Usuário'
            name='username'
            placeholder='Seu user'
          />
          <InputText
            labelText='Senha'
            name='password'
            type='password'
            placeholder='Sua senha'
          />

          {error && (
            <p className='text-rose-500 text-xs text-center font-bold bg-rose-500/10 py-2 rounded-lg'>
              {error}
            </p>
          )}

          <div className='mt-2'>
            <Button
              variant='default'
              type='submit'
              size='md'
              className='w-full'>
              Entrar no Painel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
