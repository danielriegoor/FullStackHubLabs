'use client';

import { useEffect } from 'react';
import { incrementVideoViewsAction } from '@/actions/video.actions';
import { useNavigation } from '@/context';
import VideoGrid from '@/components/VideoGrid';
import { VideoItem } from '@/models';
import { Clapperboard } from 'lucide-react'; // Sugestão para o ícone
import { motion } from 'framer-motion';
import { getYouTubeEmbedUrl } from '@/utils/utils';

interface VideoPageClientProps {
  video: VideoItem;
  relatedVideos: VideoItem[];
}

export default function VideoPageClient({
  video,
  relatedVideos,
}: VideoPageClientProps) {
  useEffect(() => {
    // Dispara a view real ao carregar a página
    if (video.id) {
      incrementVideoViewsAction(
        video.id,
      );
    }
  }, [video.id]);

  const {
    isTheaterMode,
    toggleTheaterMode,
  } = useNavigation();

  return (
    <div
      className={`transition-all duration-500 ease-in-out ${isTheaterMode ? 'pt-0 bg-black/95' : 'container mx-auto p-4 max-w-7xl pt-24'}`}>
      {/* Container do Player */}
      <div
        className={`relative mx-auto transition-all duration-500 ${isTheaterMode ? 'w-full h-11/12 aspect-21/9' : 'aspect-video rounded-2xl shadow-2xl overflow-hidden'}`}>
        <div className='w-full h-full bg-slate-900 flex items-center justify-center text-gray-500 border border-white/5'>
          {/* Placeholder do Player */}
          <iframe
            className='w-full h-full'
            src={
              getYouTubeEmbedUrl(
                video.externalUrl,
              ) || ''
            }
            title={video.title}
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          />
        </div>

        {/* Botão do Modo Cinema Flutuante */}
        <button
          onClick={toggleTheaterMode}
          className='absolute bottom-4 right-4 p-2 bg-black/50 backdrop-blur-md rounded-lg text-white hover:bg-rose-500 transition-colors z-10 group'
          title='Modo Cinema'>
          <motion.div
            animate={{
              rotate: isTheaterMode
                ? 180
                : 0,
              scale: isTheaterMode
                ? 1.2
                : 1,
            }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
            }}>
            <Clapperboard
              className={`w-5 h-5 transition-transform duration-300 ${isTheaterMode ? 'scale-110 text-rose-400' : 'group-hover:rotate-12'}`}
            />
          </motion.div>
        </button>
      </div>

      {/* Área de Conteúdo abaixo do Player */}
      <div
        className={`mt-8 transition-opacity duration-500 ${isTheaterMode ? 'container mx-auto px-4 pb-20' : ''}`}>
        <div className='flex flex-col gap-4 border-b border-gray-200 dark:border-white/5 pb-6'>
          <h1 className='text-2xl font-bold'>
            {video.title}
          </h1>
          <p className='text-sm text-gray-500'>
            {video.views} views •{' '}
            {video.publishedAt}
          </p>
        </div>

        <div className='mt-10'>
          <h2 className='text-xl font-bold mb-6'>
            Vídeos Relacionados
          </h2>
          <VideoGrid
            videos={relatedVideos}
          />
        </div>
      </div>
    </div>
  );
}
