import { CATEGORIES } from '@/lib/constants';

export const categoryQueries = {
  getCategoryName: (slug: string, searchQuery?: string) => {
    if (searchQuery) return `Resultados para: "${searchQuery}"`;
    return CATEGORIES.find((c) => c.slug === slug)?.name || 'Vídeos';
  },
};
