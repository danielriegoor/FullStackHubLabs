import { getVideosAction } from '@/actions/video.actions';
import { categoryQueries } from '@/lib/queries/category.queries';
import VideoGrid from '@/components/VideoGrid';
import { Zap } from 'lucide-react';
// import { VideoItem } from '@/models';

interface PageProps {
  searchParams: Promise<{
    cat?: string;
    q?: string;
  }>;
}

export default async function Page({
  searchParams,
}: PageProps) {
  const params = await searchParams;
  const activeCategory =
    params.cat || 'recommended';
  const searchQuery = params.q;

  const videos = await getVideosAction(
    activeCategory,
    searchQuery,
  );

  const currentCategoryName =
    categoryQueries.getCategoryName(
      activeCategory,
      searchQuery,
    );

  const isAiMode =
    !searchQuery &&
    (videos[0]?.isAiGenerated ||
      activeCategory === 'tech' ||
      activeCategory === 'gaming');

  return (
    <div className='container mx-auto p-4 max-w-450 pb-20'>
      <div className='mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
        <div>
          <h1 className='text-xl font-bold tracking-tight flex items-center gap-2'>
            {currentCategoryName}
            {isAiMode && (
              <span className='text-xs font-normal px-2 py-0.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center gap-1'>
                <Zap className='w-3 h-3' />{' '}
                Gerado por IA
              </span>
            )}
          </h1>
          <p className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
            Exibindo {videos.length}{' '}
            vídeos.
          </p>
        </div>
      </div>

      <VideoGrid
        videos={videos}
        isAiMode={isAiMode}
      />
    </div>
  );
}
