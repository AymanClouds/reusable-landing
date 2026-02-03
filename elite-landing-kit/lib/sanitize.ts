import DOMPurify from 'dompurify';

export function sanitizeMarkup(markup: string) {
  return DOMPurify.sanitize(markup, { USE_PROFILES: { svg: true, html: true } });
}
