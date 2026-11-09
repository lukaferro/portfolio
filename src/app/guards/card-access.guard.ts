import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';

// Chiave o parametro segreto richiesto per accedere alla digital card tramite QR code del wallet
export const WALLET_ACCESS_KEY = 'lf-wallet-pass';

/**
 * Protegge la pagina /card:
 * È accessibile SOLO scansionando il QR Code ufficiale con la chiave autorizzata.
 * Se un visitatore digita direttamente /card nella barra degli indirizzi, viene rimandato alla home.
 */
export const cardAccessGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  const isBrowser = isPlatformBrowser(platformId);

  const source = route.queryParamMap.get('source');
  const key = route.queryParamMap.get('key');
  const token = route.queryParamMap.get('token');

  const hasValidAuth = (source === 'wallet' && (key === WALLET_ACCESS_KEY || !key)) ||
    key === WALLET_ACCESS_KEY ||
    token === WALLET_ACCESS_KEY;

  if (isBrowser) {
    if (hasValidAuth) {
      sessionStorage.setItem('lf_card_authorized', 'true');
      sessionStorage.setItem('lf_origin_was_card', 'true');
      if (sessionStorage.getItem('lf_site_button_clicked') !== 'true') {
        sessionStorage.setItem('lf_site_button_clicked', 'false');
      }
      return true;
    }

    if (sessionStorage.getItem('lf_card_authorized') === 'true') {
      return true;
    }
  } else {
    if (hasValidAuth) {
      return true;
    }
  }

  // Accesso non autorizzato (digitazione manuale di /card nella barra URL): rimanda alla home
  return router.parseUrl('/');
};

/**
 * Protegge le pagine del sito per chi è atterrato sulla card:
 * Chi è atterrato sulla card NON può raggiungere le altre pagine del sito
 * digitandone l'URL nella barra degli indirizzi. Può accedervi solo cliccando
 * l'apposito pulsante "Visita il sito completo" presente sulla card.
 */
export const siteAccessFromCardGuard: CanActivateFn = () => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    const originWasCard = sessionStorage.getItem('lf_origin_was_card') === 'true';
    const siteButtonClicked = sessionStorage.getItem('lf_site_button_clicked') === 'true';

    // Se l'utente proviene dalla card ma non ha ancora usato il pulsante apposito per sbloccare il sito
    if (originWasCard && !siteButtonClicked) {
      return router.parseUrl('/card');
    }
  }

  return true;
};
