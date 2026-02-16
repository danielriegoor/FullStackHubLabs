// src/db/seed.ts
import { discoveryTechVideos } from '@/actions/discovery.actions';
import { prisma } from '../lib/prisma';

async function main() {
  console.log(
    '🌱 Populando FullStackHubLabs com conteúdo Tech para Portfólio...',
  );
  const categories = [
    'tech',
    'gaming',
    'recommended',
  ];

  for (const slug of categories) {
    await prisma.category.upsert({
      where: { slug },
      update: {},
      create: {
        slug,
        name:
          slug.charAt(0).toUpperCase() +
          slug.slice(1),
      },
    });
  }

  const techVideos = [
    {
      title:
        'Mastering Next.js 15 App Router',
      source: 'YouTube',
      categorySlug: 'recommended',
      externalUrl:
        'https://www.youtube.com/watch?v=wm5gMKuwSYk', // Exemplo real
      duration: '18:42',
      views: '150K',
    },
    {
      title:
        'React Server Components Explained',
      source: 'YouTube',
      categorySlug: 'recommended',
      externalUrl:
        'https://www.youtube.com/watch?v=TQQlZhbC5ps',
      duration: '12:15',
      views: '85K',
    },
    {
      title: 'Conhecendo o prisma 7',
      source: 'YouTube',
      categorySlug: 'recommended',
      externalUrl:
        'https://www.youtube.com/watch?v=AmIXJHL-sBU',
      duration: '44:28',
      views: '42K',
    },
  ];

  for (const v of techVideos) {
    const slug = v.title
      .toLowerCase()
      .replace(/ /g, '-');
    await prisma.video.upsert({
      where: { slug },
      update: {},
      create: {
        title: v.title,
        slug,
        thumbnail: `https://img.youtube.com/vi/${v.externalUrl.split('v=')[1]}/maxresdefault.jpg`,
        duration: v.duration,
        views: v.views,
        source: v.source,
        externalUrl: v.externalUrl,
        categories: {
          create: {
            category: {
              connect: {
                slug: v.categorySlug,
              },
            },
          },
        },
      },
    });
  }
  await discoveryTechVideos();
}
main()
  .catch((e) => {
    console.error(
      '❌ Erro no Seed:',
      e,
    );
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
