import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { cardAccessGuard, siteAccessFromCardGuard } from './guards/card-access.guard';

export const routes: Routes = [
    { 
      path: '', 
      component: HomeComponent,
      canActivate: [siteAccessFromCardGuard]
    },
    { 
      path: 'formazione', 
      loadComponent: () => import('./pages/formazione/formazione.component').then(c => c.FormazioneComponent),
      canActivate: [siteAccessFromCardGuard]
    },
    { 
      path: 'esperienze', 
      loadComponent: () => import('./pages/esperienze/esperienze.component').then(c => c.EsperienzeComponent),
      canActivate: [siteAccessFromCardGuard]
    },
    { 
      path: 'progetti', 
      loadComponent: () => import('./pages/progetti/progetti.component').then(c => c.ProgettiComponent),
      canActivate: [siteAccessFromCardGuard]
    },
    { 
      path: 'contatti', 
      loadComponent: () => import('./pages/contatti/contatti.component').then(c => c.ContattiComponent),
      canActivate: [siteAccessFromCardGuard]
    },
    { 
      path: 'card', 
      loadComponent: () => import('./pages/card/card.component').then(c => c.CardComponent),
      canActivate: [cardAccessGuard]
    },
    { path: 'connect', redirectTo: 'card', pathMatch: 'full' },
    { path: '**', loadComponent: () => import('./pages/not-found/not-found.component').then(c => c.NotFoundComponent) }
];
