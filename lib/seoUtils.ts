// SEO utilities for crawler detection and hybrid pagination

export function isCrawler(): boolean {
  if (typeof window === 'undefined') {
    // Server-side: assume it's a crawler for SSR
    return true;
  }
  
  const userAgent = navigator.userAgent.toLowerCase();
  const crawlerPatterns = [
    'googlebot',
    'bingbot',
    'slurp',
    'duckduckbot',
    'baiduspider',
    'yandexbot',
    'facebookexternalhit',
    'twitterbot',
    'linkedinbot',
    'whatsapp',
    'telegrambot',
    'applebot',
    'crawler',
    'spider',
    'bot'
  ];
  
  return crawlerPatterns.some(pattern => userAgent.includes(pattern));
}

export function shouldUsePagination(): boolean {
  // Use pagination for crawlers and when JavaScript is disabled
  return isCrawler() || typeof window === 'undefined';
}
