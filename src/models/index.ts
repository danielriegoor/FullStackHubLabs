// src/models/index.ts

/**
 * Interface para Categorias
 */
export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: React.ReactNode;
}

/**
 * Interface Principal de Vídeo
 * Atualizada para suportar a relação plural do Prisma (Muitos-para-Muitos)
 */
export interface VideoItem {
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
  duration: string;
  views: string;
  source: string;
  publishedAt: string;
  externalUrl?: string;
  isAiGenerated?: boolean;
  width?: number;
  height?: number;

  /**
   * Relação de Categorias
   * Substitui o antigo campo 'category: string' para permitir
   * que um vídeo pertença a múltiplas categorias (ex: Tech + Recommended)
   */
  categories?: {
    categoryId: string;
    category: Category;
  }[];
}

/**
 * Interface para itens de navegação
 */
export interface NavItem {
  label: string;
  href: string;
}

/**
 * Modos de visualização para o Grid de vídeos
 */
export enum ViewMode {
  Grid = 'GRID',
  List = 'LIST',
}
