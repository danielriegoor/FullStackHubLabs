import VideoPage from '@/components/VideoPageMain';

export const dynamic = 'force-static';

export default async function HomePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <>
      <VideoPage params={params} />
    </>
  );
}
