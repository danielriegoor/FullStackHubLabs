const VideoSkeleton = () => {
  return (
    <div className='flex flex-col gap-2 animate-pulse'>
      {/* Thumbnail Placeholder */}
      <div className='aspect-video w-full rounded-lg bg-slate-200 dark:bg-dark-800' />

      {/* Meta Info Placeholder */}
      <div className='flex flex-col px-1 gap-2'>
        <div className='h-4 w-3/4 bg-slate-200 dark:bg-dark-800 rounded' />
        <div className='h-3 w-1/2 bg-slate-100 dark:bg-dark-900 rounded' />
        <div className='h-3 w-1/3 bg-slate-100 dark:bg-dark-900 rounded italic opacity-50' />
      </div>
    </div>
  );
};

export default VideoSkeleton;
