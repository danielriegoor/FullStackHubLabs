// src/actions/category.actions.ts
'use server';

import { prisma } from '@/lib/prisma';

export async function getCategoriesWithStatsAction() {
  try {
    const categories =
      await prisma.category.findMany({
        include: {
          _count: {
            select: { videos: true },
          },
          // Acessando a tabela pivô para pegar a thumb do vídeo mais recente
          videos: {
            take: 1,
            orderBy: {
              video: {
                publishedAt: 'desc',
              },
            }, // Ordena pelo campo do vídeo
            include: {
              video: {
                select: {
                  thumbnail: true,
                },
              },
            },
          },
        },
        orderBy: { name: 'asc' },
      });

    return categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      count: cat._count.videos,
      // Se não houver vídeo, usamos o placeholder padrão do projeto
      thumbnail:
        cat.videos[0]?.video
          ?.thumbnail ||
        '/sex_default_thumb.png',
    }));
  } catch (error) {
    console.error(
      'Erro ao buscar categorias:',
      error,
    );
    return [];
  }
}
