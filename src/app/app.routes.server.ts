import { RenderMode, ServerRoute } from '@angular/ssr';

/**
 * Static site generation: every real page is pre-rendered to its own HTML file at build time,
 * so crawlers and link previews get full content and per-page meta tags without running JS.
 * Unknown URLs fall back to the client-rendered shell (index.csr.html), which shows the 404 page.
 */
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'formazione', renderMode: RenderMode.Prerender },
  { path: 'esperienze', renderMode: RenderMode.Prerender },
  { path: 'progetti', renderMode: RenderMode.Prerender },
  { path: 'contatti', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Client }
];
