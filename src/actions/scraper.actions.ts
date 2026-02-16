'use server';

import axios from 'axios';
import * as cheerio from 'cheerio';
import { videoRepository } from '@/repositories/video.repository';
import { getAffiliateUrl } from '@/lib/publshings';

export async function importExternalVideoAction(
  url: string,
  categorySlug: string,
) {
  try {
    // 1. Simula um navegador real para não ser bloqueado
    const { data: html } =
      await axios.get(url, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/119.0.0.0 Safari/537.36',
        },
      });

    const $ = cheerio.load(html);

    // 2. Lógica de extração (Exemplo genérico para ePorner/Xhamster)
    // Nota: Cada site tem seletores diferentes, precisaremos de um 'mapa' por provedor.
    const title =
      $('h1').text().trim() ||
      $('title').text().trim();
    const thumbnail =
      $(
        'meta[property="og:image"]',
      ).attr('content') || '';
    const duration =
      $('.duration').text().trim() ||
      '10:00';

    // 3. Injeção de Afiliado (CPA/CPM) - Dinâmico via constants
    const affiliateUrl =
      getAffiliateUrl(url);
    const slug = title
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');

    // 4. Salva no PostgreSQL via Repository
    const video =
      await videoRepository.saveImportedVideo(
        {
          title,
          slug,
          thumbnail,
          externalUrl: affiliateUrl,
          duration,
          source: new URL(
            url,
          ).hostname.replace(
            'www.',
            '',
          ),
          categorySlug,
        },
      );

    return { success: true, video };
  } catch (error) {
    console.error(
      'Erro no scraping:',
      error,
    );
    return {
      success: false,
      error: 'Falha ao importar vídeo',
    };
  }
}
