'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function logoutAction() {
  const cookieStore = await cookies();

  // Substitua 'token' pelo nome exato do cookie que você configurou no seu login
  cookieStore.delete('token');

  // Redireciona para a home passando a mensagem na URL para o front-end exibir o Toast
  redirect(
    '/?message=✅ Logout efetuado com sucesso!',
  );
}
