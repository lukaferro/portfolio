# Luca Ferro — Portfolio

Portfolio personale sviluppato con **Angular 22** (standalone components), tema scuro con accento arancione, animazioni particellari, accessibilità WCAG (a11y) e supporto multilingua (IT/EN).

🔗 **Live Demo:** [portfolio-five-sand-51.vercel.app](https://portfolio-five-sand-51.vercel.app)

## Tecnologie

- **Angular 22** — framework standalone con lazy loading, signals e view transitions
- **TypeScript 6** — strict mode
- **CSS3** — custom properties, glassmorphism, view transitions, `prefers-reduced-motion`
- **Vercel** — deployment con serverless function per il form contatti e reCAPTCHA v3
- **Nodemailer** — invio email dal form contatti

## Struttura

| Pagina | Rotta | Descrizione |
|--------|-------|-------------|
| Home | `/` | Hero con typewriter, bio professionale, top skills e timeline sintetica |
| Formazione e Competenze | `/formazione` | Competenze tecniche, Tecnologie e Concetti, Certificazioni, Soft Skills e Studi |
| Esperienze | `/esperienze` | Timeline esperienze lavorative e professionali con tech tags |
| Progetti | `/progetti` | Griglia progetti filtrabile per tecnologia (Angular, Blazor/.NET, Full-Stack, HTML/CSS/JS) |
| Contatti | `/contatti` | Info contatto + form serverless con validazione e reCAPTCHA |
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
- `RECAPTCHA_SECRET_KEY` — chiave segreta Google reCAPTCHA v3

## Contatti

- GitHub: [lukaferro](https://github.com/lukaferro)
- LinkedIn: [Luca Ferro](https://www.linkedin.com/in/luca-ferro-849a212b8/)
- Email: luca.ferro2003@gmail.com
