import {
  NextRequest,
  NextResponse,
} from 'next/server';
import { decrypt } from '@/lib/auth';

export async function proxy(
  request: NextRequest,
) {
  const session =
    request.cookies.get(
      'session',
    )?.value;
  const { pathname } = request.nextUrl;

  // Permite acesso à página de login
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  // Protege todas as outras rotas /admin
  if (pathname.startsWith('/admin')) {
    if (!session) {
      return NextResponse.redirect(
        new URL(
          '/admin/login',
          request.url,
        ),
      );
    }

    try {
      await decrypt(session);
      return NextResponse.next();
      // eslint-disable-next-line
    } catch (e) {
      return NextResponse.redirect(
        new URL(
          '/admin/login',
          request.url,
        ),
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
