'use server';

import { videoRepository } from '@/repositories/video.repository';
import { generateDynamicContent } from '@/lib/gemini'; // Usando a IA para o "RAG" simples

export async function discoveryTechVideos() {
  const keywords = [
    'nextjs 15 app router',
    'react server components',
    'typescript tips 2026',
    'react 2026',
    'JavaScript tips',
    'vite',
    'PostgreSQL',
    'Prisma ORM',
  ];

  console.log(
    '🤖 Iniciando robô de descoberta...',
  );

  for (const term of keywords) {
    try {
      // 1. "RAG" Simples: Pedimos ao Gemini para sugerir metadados reais de vídeos populares
      // Em vez de gerar do nada, a IA atua como um 'curador' de conteúdo.
      const suggestedVideos =
        await generateDynamicContent(
          term,
        );

      for (const videoData of suggestedVideos) {
        // 2. Chamamos o Repository para salvar (Upsert)
        // Isso garante que se o vídeo já existir pelo slug, ele não duplique.
        await videoRepository.saveImportedVideo(
          {
            title: videoData.title,
            slug: videoData.title
              .toLowerCase()
              .replace(/ /g, '-'),
            thumbnail:
              videoData.thumbnail,
            externalUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(videoData.title)}`, // Link de busca ou ID real
            duration:
              videoData.duration,
            source: 'YouTube Discovery',
            categorySlug: 'recommended', // Alimenta a sua Home
          },
        );
      }

      console.log(
        `✅ Conteúdo para "${term}" processado com sucesso.`,
      );
    } catch (error) {
      console.error(
        `❌ Erro ao processar termo ${term}:`,
        error,
      );
    }
  }
}
