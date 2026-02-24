import { NextResponse } from 'next/server';
import { discoverNewCategoriesAction } from '@/actions/discovery.actions';
import { crawlCategoryAction } from '@/actions/scraper.actions';

export async function POST(
  request: Request,
) {
  try {
    // 1. SEGURANÇA: O Leão de Chácara
    const authHeader =
      request.headers.get(
        'authorization',
      );
    const secret =
      process.env.N8N_API_SECRET;

    if (
      !secret ||
      authHeader !== `Bearer ${secret}`
    ) {
      console.warn(
        '🚨 [API] Tentativa de acesso não autorizado na rota de Scrape!',
      );
      return NextResponse.json(
        {
          error:
            'Acesso Negado. Crachá inválido, parceiro.',
        },
        { status: 401 },
      );
    }

    // 2. Lendo as ordens do n8n
    const body = await request.json();
    const {
      command,
      categorySlug,
      targetUrl,
    } = body;

    // 3. ROTEADOR DE COMANDOS
    if (command === 'DISCOVERY') {
      console.log(
        '🤖 [API] n8n acionou o Discovery Mode...',
      );
      const discoveredSlugs =
        await discoverNewCategoriesAction();
      return NextResponse.json({
        success: true,
        type: 'discovery',
        message: `${discoveredSlugs.length} categorias dinâmicas encontradas.`,
        data: discoveredSlugs,
      });
    }

    if (command === 'SCRAPE') {
      if (!categorySlug || !targetUrl) {
        return NextResponse.json(
          {
            error:
              'Comando SCRAPE exige categorySlug e targetUrl no JSON.',
          },
          { status: 400 },
        );
      }
      console.log(
        `🤖 [API] n8n acionou o Scraper para a categoria: ${categorySlug}...`,
      );
      await crawlCategoryAction(
        categorySlug,
        targetUrl,
      );
      return NextResponse.json({
        success: true,
        type: 'scrape',
        message: `Categoria ${categorySlug} populada com sucesso.`,
      });
    }

    // Se o n8n mandar algo estranho
    return NextResponse.json(
      {
        error:
          'Comando desconhecido. Use DISCOVERY ou SCRAPE.',
      },
      { status: 400 },
    );
    // eslint-disable-next-line
  } catch (error: any) {
    console.error(
      '❌ [API] Erro Crítico no Motor:',
      error,
    );
    return NextResponse.json(
      { error: error.message },
      { status: 500 },
    );
  }
}
