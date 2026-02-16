import {
  NextRequest,
  NextResponse,
} from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(
  request: NextRequest,
) {
  const secret =
    request.nextUrl.searchParams.get(
      'secret',
    );

  // Proteção básica: Só revalida se o token bater [cite: 2026-02-16]
  if (
    secret !==
    process.env.REVALIDATE_TOKEN
  ) {
    return NextResponse.json(
      { message: 'Invalid token' },
      { status: 401 },
    );
  }

  // Limpa o cache de todas as páginas baseadas no layout [cite: 2026-02-16]
  revalidatePath('/', 'layout');

  return NextResponse.json({
    revalidated: true,
    now: Date.now(),
  });
}
