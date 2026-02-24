// src/utils/utils.ts

/**
 * Mapeamento de regras para conversão de URL de página em URL de Player (Embed)
 * Focado nos domínios alvo do DotF4p.com
 */
export function getEmbedContent(
  url?: string | null,
): string {
  if (!url) return '';

  try {
    const parsedUrl = new URL(url);
    const host =
      parsedUrl.hostname.replace(
        'www.',
        '',
      );
    const path = parsedUrl.pathname;

    // 1. xHamster (xhcdn ou xhamster.com)
    if (host.includes('xhamster.com')) {
      // Ex: /videos/nome-do-video-xh123 -> /embed/xh123
      const match = path.match(
        /\/videos\/.*-(xh[\w\d]+)/,
      );
      if (match)
        return `https://xhamster.com/embed/${match[1]}`;
    }

    // 2. EPORNER
    if (host.includes('eporner.com')) {
      // Ex: /hd-porn/video-id/ -> /embed/video-id/
      const match = path.match(
        /\/hd-porn\/([^\/]+)/,
      );
      if (match)
        return `https://www.eporner.com/embed/${match[1]}/`;
    }

    // 3. FapHouse
    if (host.includes('faphouse.com')) {
      const match = path.match(
        /\/videos\/([^\/]+)/,
      );
      if (match)
        return `https://faphouse.com/embed/${match[1]}`;
    }

    // 4. BabesTube / Pornicom / FreePorn8 (Muitos usam esse padrão de ID)
    if (
      host.includes('babestube.com') ||
      host.includes('pornicom.com') ||
      host.includes('freeporn8.com')
    ) {
      const match = path.match(
        /\/video\/(\d+)/,
      );
      if (match)
        return `https://${host}/embed/${match[1]}`;
    }

    // 5. SleazyNEasy / MomVids / TrashReality / XTits (Geralmente WP-based ou padrão embed direto)
    if (
      host.includes(
        'sleazyneasy.com',
      ) ||
      host.includes('momvids.com') ||
      host.includes(
        'trashreality.com',
      ) ||
      host.includes('xtits.xxx')
    ) {
      // Se já vier com /embed/, retorna. Se não, tenta converter o final da URL
      if (path.includes('/embed/'))
        return url;
      const videoId = path
        .split('/')
        .filter(Boolean)
        .pop();
      return `https://${host}/embed/${videoId}`;
    }

    // 6. xGroovy
    if (host.includes('xgroovy.com')) {
      const match = path.match(
        /\/video\/(\d+)/,
      );
      if (match)
        return `https://pt.xgroovy.com/embed/${match[1]}`;
    }

    // 7. CamSoda (Geralmente é Live, usamos o padrão de sala)
    if (host.includes('camsoda.com')) {
      const room = path
        .split('/')
        .filter(Boolean)
        .pop();
      return `https://www.camsoda.com/embed/${room}`;
    }

    // Fallback: Se não casar com nenhuma regra mas já parecer um embed, manda bala
    if (path.includes('embed'))
      return url;

    return url; // Retorna a original caso não consiga converter
    // eslint-disable-next-line
  } catch (e) {
    return url || ''; // Se der erro no parser de URL, tenta retornar a string pura
  }
}
