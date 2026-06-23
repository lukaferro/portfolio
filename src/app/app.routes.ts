import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'studi', loadComponent: () => import('./pages/studi/studi.component').then(c => c.StudiComponent) },
    { path: 'esperienze', loadComponent: () => import('./pages/esperienze/esperienze.component').then(c => c.EsperienzeComponent) },
    { path: 'contatti', loadComponent: () => import('./pages/contatti/contatti.component').then(c => c.ContattiComponent) },
    { path: '**', loadComponent: () => import('./pages/not-found/not-found.component').then(c => c.NotFoundComponent) }
];
