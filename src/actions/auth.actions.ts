'use server';

import { cookies } from 'next/headers';
import { encrypt } from '@/lib/auth';
import { redirect } from 'next/navigation';

export async function loginAction(
  formData: FormData,
) {
  const user = formData.get('username');
  const pass = formData.get('password');

  if (
    user ===
      process.env.ADMIN_USERNAME &&
    pass === process.env.ADMIN_PASSWORD
  ) {
    const expires = new Date(
      Date.now() + 2 * 60 * 60 * 1000,
    ); // 2h
    const session = await encrypt({
      user,
      expires,
    });

    (await cookies()).set(
      'session',
      session,
      {
        expires,
        httpOnly: true,
        secure:
          process.env.NODE_ENV ===
          'production',
      },
    );

    redirect('/admin/dashboard');
  }

  return {
    error: 'Credenciais inválidas',
  };
}

export async function logoutAction() {
  (await cookies()).delete('session');
  redirect('/admin/login');
}
