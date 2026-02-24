// src/db/cleanup.ts
import * as dotenv from 'dotenv';
import path from 'path';
import { PrismaClient } from '@prisma/client';

dotenv.config({
  path: path.resolve(
    process.cwd(),
    '.env',
  ),
});
const prisma = new PrismaClient();

const junkList = [
  'A orgia de elisa sanchez',
  'Cock shock lilith reacts',
  'Horny milf cumpilation cum on tits',
  'Hot couple having hardcore romantic sex',
  'Hqcollect 2545 bambi black cum',
  'Is therian mishell morales',
  'Lina henao got milk ask the milf next door ride',
];

async function main() {
  console.log(
    '🧹 Iniciando limpeza de categorias lixo...',
  );

  // Converte a string bizarra pro slug que o Prisma salvou no banco
  const slugsToRemove = junkList.map(
    (name) =>
      name
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, ''),
  );

  try {
    const result =
      await prisma.category.deleteMany({
        where: {
          slug: { in: slugsToRemove },
        },
      });
    console.log(
      `✅ Sucesso! O Anti-seed evaporou ${result.count} categorias bizarras.`,
    );
  } catch (err) {
    console.error(
      '❌ Erro ao limpar banco:',
      err,
    );
  }
}

main().finally(async () => {
  await prisma.$disconnect();
});
