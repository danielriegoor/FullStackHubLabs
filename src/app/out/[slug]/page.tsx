import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation'; // <-- Linter feliz: 'redirect' removido
import RedirectTimer from './RedirectTimer';

const prisma = new PrismaClient();

interface OutPageProps {
  params: Promise<{ slug: string }>;
}

export default async function OutPage({
  params,
}: OutPageProps) {
  // 2. O Pulo do Gato: Aguardar a resolução do params
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  // 3. Server First: Busca a URL real no banco usando o slug garantido
  const video =
    await prisma.video.findUnique({
      where: { slug: slug },
      select: {
        externalUrl: true,
        title: true,
      },
    });

  // 4. O Type Guard: Blinda o TypeScript
  if (!video || !video.externalUrl) {
    return notFound();
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4'>
      {/* ESPAÇO CPM 1: Banner TrafficStars Topo */}
      <div className='w-full max-w-3xl h-22.5 bg-gray-800 border border-gray-700 flex items-center justify-center mb-8'>
        <span className='text-gray-500'>
          Ad Spot (728x90) -
          TrafficStars
        </span>
      </div>

      <div className='text-center max-w-2xl bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700'>
        <h1 className='text-2xl font-bold mb-4 text-pink-500'>
          Você está saindo do DotF4p...
        </h1>
        <p className='text-gray-300 mb-6'>
          Preparando o vídeo: <br />
          <strong className='text-white'>
            {video.title}
          </strong>
        </p>

        {/* Agora o TypeScript tem 100% de certeza que targetUrl é uma string válida */}
        <RedirectTimer
          targetUrl={video.externalUrl}
        />
      </div>

      {/* ESPAÇO CPM 2: Popunder / Native Ads */}
      <div className='w-full max-w-3xl h-62.5 bg-gray-800 border border-gray-700 flex items-center justify-center mt-8'>
        <span className='text-gray-500'>
          Ad Spot (300x250) - CPA /
          Affiliate
        </span>
      </div>
    </div>
  );
}
