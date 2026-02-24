// src/components/CategoryCard/index.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Layers } from 'lucide-react';

interface CategoryCardProps {
  category: {
    name: string;
    slug: string;
    count: number;
    thumbnail: string;
  };
}

export default function CategoryCard({
  category,
}: CategoryCardProps) {
  return (
    <Link
      href={`/?cat=${category.slug}`}
      className='group relative block w-full overflow-hidden rounded-xl bg-dark-800 border border-white/5 transition-all hover:scale-[1.02] hover:border-rose-500/50 hover:shadow-2xl hover:shadow-rose-500/20'>
      <div className='relative aspect-video w-full overflow-hidden bg-black'>
        <Image
          src={category.thumbnail}
          alt={category.name}
          fill
          className='object-cover opacity-80 transition-opacity group-hover:opacity-100'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />

        <div className='absolute bottom-2 left-2 flex items-center gap-1 rounded bg-black/70 px-2 py-1 text-xs font-bold text-white backdrop-blur-md border border-white/10'>
          <Layers className='w-3 h-3 text-rose-500' />
          <span>
            {category.count} vídeos
          </span>
        </div>
      </div>
      <div className='p-3'>
        <h3 className='font-bold text-gray-200 group-hover:text-rose-500 transition-colors capitalize'>
          {category.name}
        </h3>
      </div>
    </Link>
  );
}
