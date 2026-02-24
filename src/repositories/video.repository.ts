// src/repositories/video.repository.ts
import { VideoItem } from '@/models';
import { prisma } from '@/lib/prisma';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const mapToVideoItem = (
  // eslint-disable-next-line
  v: any,
): VideoItem => ({
  ...v,
  publishedAt:
    v.publishedAt instanceof Date
      ? formatDistanceToNow(
          v.publishedAt,
          {
            addSuffix: true,
            locale: ptBR,
          },
        )
      : String(v.publishedAt),
});

export const videoRepository = {
  async getVideos(
    categorySlug: string,
    query?: string,
  ): Promise<VideoItem[]> {
    // 1. LÓGICA DE BUSCA
    if (query) {
      const searchResults =
        await prisma.video.findMany({
          where: {
            OR: [
              {
                title: {
                  contains: query,
                  mode: 'insensitive',
                },
              },
              {
                source: {
                  contains: query,
                  mode: 'insensitive',
                },
              },
            ],
          },
          orderBy: {
            publishedAt: 'desc',
          },
        });
      return searchResults.map(
        mapToVideoItem,
      );
    }

    // 2. LÓGICA DE VITRINE (HOME E CATEGORIAS)
    const whereClause =
      categorySlug === 'recommended'
        ? {}
        : {
            categories: {
              some: {
                category: {
                  slug: categorySlug,
                },
              },
            },
          };

    const dbVideos =
      await prisma.video.findMany({
        where: whereClause,
        orderBy: {
          publishedAt: 'desc',
        },
        take: 35,
        include: {
          categories: {
            include: { category: true },
          },
        },
      });

    return dbVideos.map(mapToVideoItem);
  },

  async getVideoBySlug(
    slug: string,
  ): Promise<VideoItem | null> {
    const video =
      await prisma.video.findUnique({
        where: { slug },
        include: {
          categories: {
            include: { category: true },
          },
        },
      });

    return video
      ? mapToVideoItem(video)
      : null;
  },

  async getRelatedVideos(
    categoryId: string,
    excludeVideoId: string,
    limit: number = 8,
  ): Promise<VideoItem[]> {
    const related =
      await prisma.video.findMany({
        where: {
          categories: {
            some: {
              categoryId: categoryId,
            },
          },
          id: { not: excludeVideoId },
        },
        take: limit,
        orderBy: { views: 'desc' },
      });

    return related.map(mapToVideoItem);
  },

  async saveImportedVideo(
    // eslint-disable-next-line
    data: any,
  ): Promise<VideoItem> {
    const {
      categorySlug,
      ...videoData
    } = data;

    const video =
      await prisma.video.upsert({
        where: { slug: videoData.slug },
        update: {
          title: videoData.title,
          thumbnail:
            videoData.thumbnail,
          duration: videoData.duration,
        },
        create: {
          ...videoData,
          views: '0',
          isAiGenerated: true,
          categories: {
            create: {
              category: {
                connect: {
                  slug: categorySlug,
                },
              },
            },
          },
        },
      });

    return mapToVideoItem(video);
  },
};
