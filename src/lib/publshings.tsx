// Mapeamento de Provedor para Parâmetro de Afiliado
export const AFFILIATE_CONFIG: Record<
  string,
  string
> = {
  'xhamster.com':
    'aff=FullStackHubLabs',
  'eporner.com': 'id=FullStackHubLabs',
  'pornhub.com':
    'viewkey=FullStackHubLabs',
  default: 'ref=FullStackHubLabs',
};

/**
 * Função utilitária para gerar a URL com afiliado baseada no host
 */
export const getAffiliateUrl = (
  url: string,
): string => {
  try {
    const { hostname } = new URL(url);
    const domain = hostname.replace(
      'www.',
      '',
    );
    const param =
      AFFILIATE_CONFIG[domain] ||
      AFFILIATE_CONFIG['default'];

    // Verifica se a URL já tem interrogação para não quebrar a query string
    const separator = url.includes('?')
      ? '&'
      : '?';
    return `${url}${separator}${param}`;
  } catch {
    return url;
  }
};
