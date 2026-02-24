import * as dotenv from 'dotenv';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import { crawlCategoryAction } from '../actions/scraper.actions';
import { discoverNewCategoriesAction } from '../actions/discovery.actions';

// 1. CARREGAMENTO DE AMBIENTE
dotenv.config({
  path: path.resolve(
    process.cwd(),
    '.env',
  ),
});

const prisma = new PrismaClient();

async function main() {
  console.log(
    '🌱 [SEED] Iniciando Motor DotF4p.com...',
  );

  // 2. CATEGORIAS ALVO (As 19 raízes garantidas)
  const targetCategories = [
    {
      dbSlug: 'amateur',
      target: 'amateur',
    },
    { dbSlug: 'anal', target: 'anal' },
    {
      dbSlug: 'asian',
      target: 'asian',
    },
    {
      dbSlug: 'brazilian',
      target: 'brazilian',
    }, // Typos corrigidos
    { dbSlug: 'bbw', target: 'bbw' },
    {
      dbSlug: 'big-ass',
      target: 'big-ass',
    },
    {
      dbSlug: 'big-tits',
      target: 'big-tits',
    }, // Typos corrigidos
    {
      dbSlug: 'blonde',
      target: 'blonde',
    },
    {
      dbSlug: 'blowjob',
      target: 'blowjob',
    },
    {
      dbSlug: 'brunette',
      target: 'brunette',
    },
    {
      dbSlug: 'creampie',
      target: 'creampie',
    },
    {
      dbSlug: 'cumshot',
      target: 'cumshot',
    },
    {
      dbSlug: 'double-penetration',
      target: 'double-penetration',
    },
    {
      dbSlug: 'ebony',
      target: 'ebony',
    },
    {
      dbSlug: 'footjob',
      target: 'footjob',
    },
    {
      dbSlug: 'hd-1080p',
      target: 'hd-1080p',
    },
    {
      dbSlug: 'hd-sex',
      target: 'hd-sex',
    },
    {
      dbSlug: 'pornstar',
      target: 'pornstar',
    },
  ];

  // Sincroniza as categorias raízes no banco
  console.log(
    `📂 [SEED] Verificando ${targetCategories.length} categorias raízes...`,
  );
  for (const cat of targetCategories) {
    await prisma.category.upsert({
      where: { slug: cat.dbSlug },
      update: {},
      create: {
        slug: cat.dbSlug,
        name:
          cat.dbSlug
            .charAt(0)
            .toUpperCase() +
          cat.dbSlug
            .slice(1)
            .replace(/-/g, ' '),
      },
    });
  }

  // 3. DISCOVERY MODE (O Cérebro Autônomo)
  console.log(
    '\n🕵️ [DISCOVERY] Iniciando busca por novas categorias dinâmicas...',
  );
  let dynamicCategories: {
    dbSlug: string;
    target: string;
  }[] = [];
  try {
    const discoveredSlugs =
      await discoverNewCategoriesAction();
    dynamicCategories =
      discoveredSlugs.map((slug) => ({
        dbSlug: slug,
        target: slug,
      }));
    console.log(
      `✅ [DISCOVERY] ${dynamicCategories.length} novas categorias prontas para scraping!`,
    );
  } catch (err) {
    console.error(
      '❌ [DISCOVERY] Erro na descoberta:',
      err,
    );
  }

  // 4. O PULO DO GATO: Unindo Raízes + Dinâmicas
  // Usa um Map para garantir que não vamos raspar a mesma categoria duas vezes se o robô achar uma que já temos
  const allTargetsMap = new Map();
  [
    ...targetCategories,
    ...dynamicCategories,
  ].forEach((cat) => {
    allTargetsMap.set(cat.dbSlug, cat);
  });
  const allTargets = Array.from(
    allTargetsMap.values(),
  );

  console.log(
    `\n🤖 [MOTOR] Iniciando Puppeteer para ${allTargets.length} categorias no total...`,
  );

  // 5. SCRAPING EM MASSA
  for (const cat of allTargets) {
    try {
      console.log(
        `\n🔎 [SCRAPER] Minerando: ${cat.dbSlug.toUpperCase()}...`,
      );
      await crawlCategoryAction(
        cat.dbSlug,
        cat.target,
      );
      console.log(
        `✅ [SCRAPER] ${cat.dbSlug.toUpperCase()} populada com sucesso.`,
      );
    } catch (err) {
      console.error(
        `❌ [SCRAPER] Falha em ${cat.dbSlug}:`,
        err,
      );
    }
  }

  console.log(
    '\n🚀 [SUCESSO] Processo de Seed e Scraping finalizado! DotF4p está online e gordo.',
  );
}

main()
  .catch((e) => {
    console.error(
      '🚨 [CRÍTICO] Erro fatal no Seed:',
      e,
    );
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
