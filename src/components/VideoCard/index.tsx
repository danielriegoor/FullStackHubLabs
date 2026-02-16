import { useState } from 'react';
import { VideoItem } from '@/models';
import {
  Play,
  Sparkles,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface VideoCardProps {
  video: VideoItem;
  slug: string;
}

export default function VideoCard({
  video,
}: VideoCardProps) {
  const [isHovered, setIsHovered] =
    useState(false);

  return (
    <Link
      href={`/video/${video.slug}`}
      className='group relative flex flex-col gap-2 cursor-pointer'>
      <div
        className='group relative flex flex-col gap-2 cursor-pointer'
        onMouseEnter={() =>
          setIsHovered(true)
        }
        onMouseLeave={() =>
          setIsHovered(false)
        }>
        {/* Thumbnail Container */}
        <div className='relative aspect-video w-full overflow-hidden rounded-lg bg-slate-200 dark:bg-dark-800 shadow-md ring-1 ring-black/5 dark:ring-white/5 transition-all duration-300 group-hover:shadow-xl group-hover:ring-rose-500/50'>
          {/* Image */}
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            className={`object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
            loading='lazy'
          />

          {/* Overlay Gradient */}
          <div className='absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60' />

          {/* Duration Badge */}
          <div className='absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-[11px] font-bold text-white backdrop-blur-sm'>
            {video.duration}
          </div>

          {/* AI Badge if generated */}
          {video.isAiGenerated && (
            <div className='absolute top-2 left-2 rounded bg-rose-600/90 px-1.5 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm flex items-center gap-1'>
              <Sparkles className='w-3 h-3' />{' '}
              AI
            </div>
          )}

          {/* Play Icon Overlay (On Hover) */}
          <div
            className={`absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px] transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <div className='rounded-full bg-rose-500 p-3 shadow-lg shadow-rose-500/40 transform transition-transform duration-300 hover:scale-110'>
              <Play className='w-6 h-6 text-white fill-white' />
            </div>
          </div>
        </div>

        {/* Meta Info */}
        <div className='flex flex-col px-1'>
          <h3 className='line-clamp-2 text-sm font-bold text-gray-900 dark:text-gray-100 group-hover:text-rose-500 dark:group-hover:text-rose-400 transition-colors leading-tight'>
            {video.title}
          </h3>
          <div className='mt-1.5 flex flex-col gap-0.5 text-[12px] text-gray-600 dark:text-gray-400'>
            <span className='font-semibold text-gray-800 dark:text-gray-300 hover:text-rose-500 dark:hover:text-rose-400 transition-colors'>
              {video.source}
            </span>
            <div className='flex items-center gap-1.5 italic opacity-85'>
              <span>{video.views}</span>
              <span className='w-1 h-1 rounded-full bg-gray-400' />
              <span>
                {video.publishedAt}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
