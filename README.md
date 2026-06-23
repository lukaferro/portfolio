# Luca Ferro — Portfolio

Portfolio personale sviluppato con **Angular 22** (standalone components), tema scuro con accento arancione, animazioni particellari e supporto multilingua.

## Tecnologie

- **Angular 22** — framework standalone con lazy loading
- **TypeScript 6** — strict mode
- **CSS3** — custom properties, glassmorphism, view transitions
- **Vercel** — deployment con serverless function per il form contatti
- **Nodemailer** — invio email dal form contatti

## Struttura

| Pagina | Rotta | Descrizione |
|--------|-------|-------------|
| Home | `/` | Hero con typewriter, foto profilo |
| Studi | `/studi` | Timeline percorso formativo |
| Esperienze | `/esperienze` | Timeline esperienze lavorative |
| Progetti | `/progetti` | Card progetti con tech tags |
| Certificazioni | `/certificazioni` | Elenco certificazioni |
| Competenze | `/competenze` | Skill cloud e soft skills |
| Contatti | `/contatti` | Info contatto + form |
| 404 | `**` | Pagina personalizzata |

## Sviluppo

```bash
ng serve        # Avvia dev server su http://localhost:4200
ng build        # Build produzione in dist/
ng test         # Esegui test unitari
```

## Deploy

Il sito è deployato su **Vercel**. Build automatica su push al branch `master`.

```bash
npx vercel --prod
```

## Variabili d'ambiente

Per il form contatti, configurare su Vercel:

- `EMAIL_USER` — indirizzo Gmail
- `EMAIL_PASS` — app password Gmail

## Contatti

- GitHub: [lukaferro](https://github.com/lukaferro)
- LinkedIn: [Luca Ferro](https://www.linkedin.com/in/luca-ferro-849a212b8/)
- Email: luca.ferro2003@gmail.com
