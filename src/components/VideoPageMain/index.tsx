// src/components/VideoPageMain/index.tsx
import VideoPageClient from '@/app/video/[slug]/VideoPageClient';
import { videoRepository } from '@/repositories/video.repository';
import { notFound } from 'next/navigation';
// Importe o componente cliente

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function VideoPageMain({
  params,
}: PageProps) {
  const { slug } = await params;
  const video =
    await videoRepository.getVideoBySlug(
      slug,
    );

  if (!video) notFound();

  const categoryId =
    video.categories?.[0]?.categoryId;
  const relatedVideos = categoryId
    ? await videoRepository.getRelatedVideos(
        categoryId,
        video.id,
      )
    : [];

  // O "return" agora entrega a responsabilidade visual para o Client Component
  return (
    <VideoPageClient
      video={video}
      relatedVideos={relatedVideos}
    />
  );
}
