// src/repositories/video.repository.ts
import { VideoItem } from '@/models';
import { prisma } from '@/lib/prisma';
import { generateDynamicContent } from '@/lib/gemini';
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
    // --- 1. BUSCA (SEARCH) ---
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

    // --- 2. LÓGICA DE RECOMENDADOS (HOME) ---
    // Se for 'recommended', não filtramos por slug de categoria
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
        take: 12,
        include: {
          categories: {
            include: { category: true },
          },
        },
      });

    // --- 3. GERAÇÃO DINÂMICA (IA) ---
    const shouldTriggerAI =
      dbVideos.length < 4 &&
      [
        'tech',
        'gaming',
        'recommended',
      ].includes(categorySlug);

    if (
      shouldTriggerAI &&
      process.env.API_KEY
    ) {
      try {
        const aiGenerated =
          await generateDynamicContent(
            categorySlug,
          );
        for (const v of aiGenerated) {
          await prisma.video.upsert({
            where: {
              slug: v.title
                .toLowerCase()
                .replace(/ /g, '-'),
            },
            update: {},
            create: {
              title: v.title,
              slug: v.title
                .toLowerCase()
                .replace(/ /g, '-'),
              thumbnail: v.thumbnail,
              duration: v.duration,
              views: v.views,
              source: v.source,
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
        }
        return [
          ...dbVideos,
          ...aiGenerated,
        ].map(mapToVideoItem);
      } catch (e) {
        console.error(
          'Falha na geração AI:',
          e,
        );
      }
    }

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

    // CORREÇÃO: Aqui retornamos apenas o vídeo formatado, sem o .map
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
    const video =
      await prisma.video.upsert({
        where: { slug: data.slug },
        update: {
          title: data.title,
          thumbnail: data.thumbnail,
          duration: data.duration,
        },
        create: {
          ...data,
          views: '0',
          categories: {
            create: {
              category: {
                connect: {
                  slug: data.categorySlug,
                },
              },
            },
          },
        },
      });
    return mapToVideoItem(video);
  },
};
