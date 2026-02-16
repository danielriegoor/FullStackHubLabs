import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import 'dotenv/config';

// 1. Configura o pool de conexão do driver 'pg'
const pool = new pg.Pool({
  connectionString:
    process.env.DATABASE_URL,
});

// 2. Instancia o adaptador do Prisma para o PostgreSQL
const adapter = new PrismaPg(pool);

// 3. Passa o adaptador no CONSTRUTOR (Isso resolve o erro de opções vazias)
export const prisma = new PrismaClient({
  adapter,
});
