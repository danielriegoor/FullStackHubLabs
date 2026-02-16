// src/app/admin/import/page.tsx

'use client';

import React, { useState } from 'react';
import { importExternalVideoAction } from '@/actions/scraper.actions';
import { CATEGORIES } from '@/lib/constants'; //
import {
  Loader2,
  Send,
} from 'lucide-react';

export default function AdminImportPage() {
  const [url, setUrl] = useState('');
  const [category, setCategory] =
    useState('recommended');
  const [loading, setLoading] =
    useState(false);
  const [status, setStatus] = useState<{
    type: 'success' | 'error';
    msg: string;
  } | null>(null);

  const handleImport = async (
    e: React.FormEvent,
  ) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const result =
      await importExternalVideoAction(
        url,
        category,
      );

    if (result.success) {
      setStatus({
        type: 'success',
        msg: `Vídeo "${result.video?.title}" importado com sucesso!`,
      });
      setUrl('');
    } else {
      setStatus({
        type: 'error',
        msg:
          result.error ||
          'Erro desconhecido',
      });
    }
    setLoading(false);
  };

  return (
    <div className='container mx-auto max-w-2xl pt-32 p-6'>
      <div className='bg-white dark:bg-dark-900 rounded-3xl p-8 border border-gray-200 dark:border-white/5 shadow-xl'>
        <h1 className='text-2xl font-black mb-6 flex items-center gap-3'>
          <div className='p-2 bg-rose-500 rounded-lg text-white'>
            <Send className='w-5 h-5' />
          </div>
          Importar Vídeo Externo
        </h1>

        <form
          onSubmit={handleImport}
          className='space-y-6'>
          {/* Input de URL */}
          <div className='flex flex-col gap-2'>
            <label className='text-sm font-bold text-gray-500'>
              URL do Vídeo Original
            </label>
            <input
              type='url'
              required
              placeholder='https://xhamster.com/videos/...'
              value={url}
              onChange={(e) =>
                setUrl(e.target.value)
              }
              className='w-full bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-rose-500 outline-none transition-all'
            />
          </div>

          {/* Select de Categoria */}
          <div className='flex flex-col gap-2'>
            <label className='text-sm font-bold text-gray-500'>
              Categoria Destino
            </label>
            <select
              value={category}
              onChange={(e) =>
                setCategory(
                  e.target.value,
                )
              }
              className='w-full bg-slate-50 dark:bg-dark-950 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none'>
              {CATEGORIES.map((cat) => (
                <option
                  key={cat.slug}
                  value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <button
            disabled={loading}
            className='w-full bg-rose-500 hover:bg-rose-600 disabled:bg-gray-400 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-rose-500/20'>
            {loading ? (
              <Loader2 className='animate-spin w-5 h-5' />
            ) : (
              'Processar e Agregar'
            )}
          </button>
        </form>

        {status && (
          <div
            className={`mt-6 p-4 rounded-xl text-sm font-medium ${status.type === 'success' ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-rose-50 text-rose-600 border border-rose-200'}`}>
            {status.msg}
          </div>
        )}
      </div>
    </div>
  );
}
