import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration, withNoIncrementalHydration } from '@angular/platform-browser';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withViewTransitions(),
      withInMemoryScrolling({ scrollPositionRestoration: 'top', anchorScrolling: 'enabled' })
    ),
    // Pages are pre-rendered at build time: reuse that DOM instead of re-creating it.
    // Incremental hydration (on by default) brings event replay, which injects inline scripts
    // that the CSP (script-src 'self') blocks. Not needed: the app uses no @defer blocks.
    provideClientHydration(withNoIncrementalHydration())
  ]
};
