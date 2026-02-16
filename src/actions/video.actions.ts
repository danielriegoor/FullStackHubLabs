'use server';

import { videoRepository } from '@/repositories/video.repository';
import { VideoItem } from '@/models';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getVideosAction(
  category: string = 'recommended',
  query?: string,
): Promise<VideoItem[]> {
  // Simula um delay de rede
  await new Promise((resolve) =>
    setTimeout(resolve, 500),
  );
  return videoRepository.getVideos(
    category,
    query,
  );
}

export async function incrementVideoViewsAction(
  videoId: string,
) {
  try {
    // Buscamos o vídeo atual
    const video =
      await prisma.video.findUnique({
        where: { id: videoId },
        select: {
          views: true,
          slug: true,
        },
      });

    if (!video) return;

    // Incrementamos o valor (convertendo string para número e voltando)
    const currentViews =
      parseInt(
        video.views.replace(/\D/g, ''),
      ) || 0;
    const newViews = (
      currentViews + 1
    ).toLocaleString('pt-BR');

    await prisma.video.update({
      where: { id: videoId },
      data: { views: newViews },
    });

    // Limpa o cache para mostrar o número novo na tela
    revalidatePath(
      `/video/${video.slug}`,
    );
  } catch (error) {
    console.error(
      'Erro ao incrementar views:',
      error,
    );
  }
}
