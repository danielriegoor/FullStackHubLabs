'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getVideosAction(
  searchQuery?: string,
  categorySlug?: string,
) {
  // eslint-disable-next-line
  const whereClause: any = {};

  if (searchQuery) {
    whereClause.title = {
      contains: searchQuery,
      mode: 'insensitive',
    };
  }

  if (
    categorySlug &&
    categorySlug !== 'recommended'
  ) {
    whereClause.categories = {
      some: {
        category: {
          slug: categorySlug,
        },
      },
    };
  }

  return prisma.video.findMany({
    where: whereClause,
    orderBy: { publishedAt: 'desc' },
    take: 60, // Quantidade de vídeos na vitrine
  });
}
