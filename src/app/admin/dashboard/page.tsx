import { prisma } from '@/lib/prisma';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'; // Supondo shadcn-ui [cite: 2025-12-19]

export default async function DashboardPage() {
  // Queries rápidas para o Dashboard [cite: 2026-02-16]
  const totalVideos =
    await prisma.video.count();
  const aiDiscoveries =
    await prisma.video.count({
      where: { isAiGenerated: true },
    });
  const lastUpdate =
    await prisma.video.findFirst({
      orderBy: { createdAt: 'desc' },
    });

  return (
    <div className='p-8 space-y-6 bg-dark-950 min-h-screen text-white'>
      <h1 className='text-3xl font-bold tracking-tight text-rose-500'>
        Discoveries Dashboard
      </h1>

      <div className='grid gap-4 md:grid-cols-3'>
        <Card className='bg-dark-900 border-white/5'>
          <CardHeader>
            <CardTitle className='text-sm font-medium'>
              Total de Conteúdos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {totalVideos}
            </div>
          </CardContent>
        </Card>

        <Card className='bg-dark-900 border-white/5'>
          <CardHeader>
            <CardTitle className='text-sm font-medium'>
              Descobertas via IA
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-rose-400'>
              {aiDiscoveries}
            </div>
          </CardContent>
        </Card>

        <Card className='bg-dark-900 border-white/5'>
          <CardHeader>
            <CardTitle className='text-sm font-medium'>
              Última Sincronização
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-sm text-gray-400'>
              {lastUpdate?.createdAt
                ? new Date(
                    lastUpdate.createdAt,
                  ).toLocaleString(
                    'pt-BR',
                  )
                : 'Aguardando...'}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
