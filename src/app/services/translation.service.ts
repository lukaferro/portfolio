import { Injectable, signal, computed, inject, DOCUMENT } from '@angular/core';

type Translations = Record<string, string>;

export type Lang = 'it' | 'en';

const SUPPORTED_LANGS: readonly Lang[] = ['it', 'en'];
const STORAGE_KEY = 'portfolio-lang';

function isLang(value: unknown): value is Lang {
  return SUPPORTED_LANGS.includes(value as Lang);
}

function readStoredLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return isLang(stored) ? stored : 'it';
  } catch {
    return 'it';
  }
}

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private readonly document = inject(DOCUMENT);

  /** During pre-rendering there is no localStorage: readStoredLang() falls back to 'it'. */
  readonly currentLang = signal<Lang>(readStoredLang());

  constructor() {
    this.document.documentElement.lang = this.currentLang();
  }

  private readonly translations: Record<Lang, Translations> = {
    it: {
      'nav.home': 'HOME',
      'nav.formazione': 'FORMAZIONE',
      'nav.esperienze': 'ESPERIENZE',
      'nav.progetti': 'PROGETTI',
      'nav.contatti': 'CONTATTI',
      'nav.cv': 'CV',

      'meta.home.title': 'Full-Stack & Frontend Web Developer',
      'meta.home.desc': 'Portfolio di Luca Ferro, Full-Stack & Frontend Web Developer presso FM Group. Soluzioni web scalabili con Angular, Blazor (C#), REST API .NET, SQL, WCAG 2.1 AA e Claude API / MCP.',
      'meta.formazione.title': 'Formazione e Competenze',
      'meta.formazione.desc': 'Competenze tecniche e certificazioni: Angular, TypeScript, Blazor (C#), REST API .NET, Java, SQL, conformità WCAG 2.1 AA, Docker e certificazioni Anthropic 2026 (Claude API, MCP).',
      'meta.esperienze.title': 'Esperienze',
      'meta.esperienze.desc': 'Esperienze professionali di Luca Ferro come Full-Stack & Frontend Web Developer presso FM Group S.r.l. (produzione enterprise EasyWebParts e Aftersaleshub), Link IT Europe e Camera di Commercio.',
      'meta.progetti.title': 'Progetti',
      'meta.progetti.desc': 'Progetti in produzione e architetture web: piattaforma B2B EasyWebParts (.NET/Blazor), portale Aftersaleshub (Angular/WCAG 2.1 AA), UI Component Library Clay-Vue e web app full-stack.',
      'meta.contatti.title': 'Contatti',
      'meta.contatti.desc': 'Contatta Luca Ferro per collaborazioni e opportunità professionali come Full-Stack & Frontend Web Developer.',
      'meta.notfound.title': 'Pagina non trovata',
      'meta.notfound.desc': 'La pagina che stai cercando non esiste o è stata spostata.',

      'formazione.title': 'Formazione e Competenze',
      'formazione.education': 'Formazione',
      'formazione.certifications': 'Certificazioni',

      'home.subtitle': "Hello World, I'm",
      'home.description': 'Benvenuto nel mio sito personale.',
      'home.bio': 'Full-Stack & Frontend Web Developer attivo nello sviluppo e nella manutenzione evolutiva di piattaforme web B2B e portali in produzione presso FM Group. Coniugo competenze frontend specialistiche in Angular, TypeScript e Vue.js con un solido background backend in C#/.NET, Java (OOP), API REST e database SQL. Garantisco standard di accessibilità al 100% WCAG 2.1 AA, rigore architetturale, componentistica riutilizzabile e integrazione avanzata di strumenti AI (Claude API, Model Context Protocol).',

      'home.pitch': 'Sviluppo soluzioni web scalabili, responsive e accessibili: frontend enterprise con Angular e Blazor (C#), backend solido con API REST .NET e SQL, con conformità al 100% a WCAG 2.1 AA.',
      'home.cta_projects': 'Scopri i progetti →',
      'home.cta_contact': 'Contattami',
      'cv.it': 'Italiano (PDF)',
      'cv.en': 'English (PDF)',
      'cv.current': 'Attuale',

      'home.tech_stack': 'Tech Stack',
      'home.cta': 'Scopri i miei progetti →',

      'studi.title': 'Studi',
      'studi.item1.title': 'Diploma di Tecnico Superiore in Web Development (ITS – EQF 5)',
      'studi.item1.subtitle': 'Fondazione ITS Incom, Busto Arsizio (VA)',
      'studi.item1.date': 'Ott 2024 — Giu 2026',
      'studi.item1.desc': 'Votazione finale: 91/110. Percorso professionalizzante biennale di 2.000 ore orientato al ciclo di vita del software enterprise. Sviluppo frontend avanzato (Angular, TypeScript, JavaScript ES6+), architetture backend OOP (Java, PHP, API REST), database relazionali (MySQL/SQL), containerizzazione con Docker, CI/CD, Git e prompt engineering.',
      'studi.item2.title': 'Diploma in Manutenzione e Assistenza Tecnica',
      'studi.item2.subtitle': 'ISIS "Isaac Newton", Varese',
      'studi.item2.date': 'Set 2017 — Lug 2022',
      'studi.item2.desc': 'Indirizzo: Apparati, impianti e servizi tecnici industriali. Competenze logico-meccaniche, diagnostica di sistemi complessi ed elettrotecnica.',
      'studi.view_doc': 'Visualizza documento →',

      'esperienze.title': 'Esperienze',
      'esperienze.item1.title': 'Full-Stack & Frontend Web Developer',
      'esperienze.item1.subtitle': 'FM Group S.r.l., Gallarate',
      'esperienze.item1.date': 'Ago 2026 — Presente',
      'esperienze.item1.desc': 'Assunto a tempo pieno dopo lo stage formativo per seguire in autonomia lo sviluppo end-to-end della piattaforma B2B EasyWebParts e l\'evoluzione frontend del portale Aftersaleshub. Blazor & C#/.NET: ingegnerizzazione di oltre 10 componenti UI riutilizzabili ad alte prestazioni, viste interattive e tabelle dati complesse per la consultazione e gestione di cataloghi ricambi tecnici. Backend & SQL: implementazione di logica di business server-side, endpoint REST API documentati, validazione rigorosa dei payload e query SQL ottimizzate per database relazionali. Angular & TypeScript: sviluppo dell\'interfaccia cliente di Aftersaleshub, riducendo i tempi di risposta e migliorando l\'onboarding. Accessibilità & Qualità: conformità al 100% alle linee guida WCAG 2.1 AA (navigazione da tastiera, gestione attiva del focus, contrasti AAA/AA), refactoring modulare e supporto continuativo al troubleshooting applicativo in produzione.',
      'esperienze.item2.title': 'Web & Frontend Developer (Stage)',
      'esperienze.item2.subtitle': 'FM Group S.r.l., Gallarate',
      'esperienze.item2.date': 'Gen 2026 — Mag 2026',
      'esperienze.item2.desc': 'Stage curriculare ad alta intensità concluso con l\'inserimento stabile in azienda. Progettazione e sviluppo frontend da zero del portale istituzionale FM Group in Angular e TypeScript, partendo dai mockup Figma e implementando architettura i18n multilingua e layout responsive. Sviluppo Full-Stack del modulo di contatto con validazione asincrona lato client e microservizio backend in PHP per elaborazione dati e dispatch notifiche. Inserimento nel team EasyWebParts: sviluppo dell\'intero frontend Blazor (C#) e implementazione della component library interna per i flussi di consultazione ricambi.',
      'esperienze.item3.title': 'Frontend Web Developer (Stage)',
      'esperienze.item3.subtitle': 'Link IT Europe S.r.l., Buguggiate',
      'esperienze.item3.date': 'Giu 2025 — Lug 2025',
      'esperienze.item3.desc': 'Progettazione e sviluppo da zero della UI Component Library open-source \'clay-vue\' in Vue.js con oltre 15 componenti modulari (Accordion, Modal, Tab, Toast, Alert, Dropdown). Applicazione di architettura CSS3/SASS custom in stile Claymorphism, progressive enhancement, conformità WCAG 2.1 AA (gestione semantica del focus da tastiera, attributi ARIA e contrasti cromatici verificati) e compatibilità cross-browser totale.',
      'esperienze.item4.title': 'Operatore Volontario – Servizio Civile Universale',
      'esperienze.item4.subtitle': 'Camera di Commercio, Varese',
      'esperienze.item4.date': 'Mag 2023 — Mag 2024',
      'esperienze.item4.desc': 'Supporto ai servizi per le imprese del territorio, digitalizzazione di pratiche amministrative e assistenza all\'utenza.',

      'progetti.title': 'Progetti',
      'progetti.filter.aria': 'Filtra progetti per tecnologia',
      'progetti.filter.all': 'Tutti',
      'progetti.filter.angular': 'Angular',
      'progetti.filter.react': 'React / Next.js',
      'progetti.filter.blazor': 'Blazor / .NET',
      'progetti.filter.fullstack': 'Java / Backend',
      'progetti.filter.vanilla': 'HTML / CSS / JS',
      'progetti.item1.title': 'Aftersaleshub — Portale Angular',
      'progetti.item1.desc': 'Obiettivo: Realizzare il frontend responsive e multilingua del portale onboarding Aftersaleshub. Stack: Angular, TypeScript, CSS3/SASS, Figma, i18n, PHP. Risultato: Sviluppo da zero dell\'architettura SPA modulare, conformità 100% WCAG 2.1 AA e gestione asincrona end-to-end delle richieste demo e notifiche in produzione.',
      'progetti.item2.title': 'EasyWebParts — Piattaforma B2B Blazor',
      'progetti.item2.desc': 'Obiettivo: Digitalizzare e velocizzare la consultazione della documentazione ricambi per clienti industriali. Stack: Blazor (C#), .NET REST API, SQL, CSS3/SASS. Risultato: Oltre 10 componenti UI riutilizzabili ad alte performance, tabelle dinamiche con filtri avanzati e interfaccia accessibile (WCAG 2.1 AA) adottata in produzione su larga scala.',
      'progetti.item3.title': 'UI Component Library (Clay-Vue)',
      'progetti.item3.desc': 'Obiettivo: Creare un design system e component library modulare e accessibile per applicazioni Vue. Stack: Vue.js, TypeScript, CSS3/SASS, HTML5 semantico. Risultato: 15+ componenti UI reattivi (Modal, Accordion, Tab, Toast) con focus management avanzato, conformità WCAG 2.1 AA e 100% compatibilità cross-browser.',
      'progetti.item4.title': 'Portfolio Personale',
      'progetti.item4.desc': 'Obiettivo: Presentare profilo professionale e progetti con standard di produzione moderni. Stack: Angular, TypeScript, Signals, CSS3/SASS, Serverless Node.js, reCAPTCHA v3. Risultato: Single Page Application ad alte performance (Core Web Vitals eccellenti), conformità WCAG 2.1 AA, architettura i18n completa e zero dipendenze UI esterne.',
      'progetti.link.github': 'GitHub',
      'progetti.link.github_fe': 'GitHub FE',
      'progetti.link.github_be': 'GitHub BE',
      'progetti.link.demo': 'Live Demo →',
      'progetti.badge.private': 'Privato',

      'progetti.item5.title': 'Sito Ristorante',
      'progetti.item5.desc': 'Obiettivo: Sviluppare un sito web vetrina ad alta conversione per attività di ristorazione. Stack: HTML5 semantico, CSS3, JavaScript ES6+. Risultato: Layout 100% responsive, menu digitale navigabile, ottimizzazione delle immagini e punteggio SEO/Performance 95+.',

      'progetti.item6.title': 'Stand-Up Meeting App',
      'progetti.item6.desc': 'Obiettivo: Ottimizzare i tempi e l\'efficienza delle cerimonie agili quotidiane (daily stand-up). Stack: JavaScript ES6+, HTML5, CSS3. Risultato: Timer dinamico a turni, rotazione speaker casuale, persistenza dello storico sessione e zero dipendenze esterne.',

      'progetti.item7.title': 'Simulazione Project Work',
      'progetti.item7.desc': 'Obiettivo: Simulare un\'interfaccia di gestione aziendale per il monitoraggio di risorse e asset operativi. Stack: HTML5, CSS3, JavaScript. Risultato: Interfaccia utente interattiva con tabelle ordinate, filtri client-side e architettura CSS pulita.',

      'progetti.item8.title': 'CinemaHub',
      'progetti.item8.desc': 'Obiettivo: Realizzare un\'applicazione web interattiva per consultazione programmazione e simulazione prenotazione cinema. Stack: Angular, TypeScript, REST API (TMDB), CSS3. Risultato: PWA con selezione interattiva dei posti a sedere, caroselli animati, sincronizzazione dati in tempo reale e deploy su Vercel.',

      'progetti.item9.title': 'Dashboard F1',
      'progetti.item9.desc': 'Obiettivo: Visualizzare e analizzare metriche, tempi sul giro e statistiche del motorsport. Stack: Angular, TypeScript, OpenF1 REST API, CSS3. Risultato: Dashboard modulare ad aggiornamento rapido con tabelle comparative e statistiche dettagliate su piloti e scuderie.',

      'progetti.item10.title': 'App Gym',
      'progetti.item10.desc': 'Obiettivo: Sviluppare una web app per la pianificazione e il tracking progressivo di allenamenti fisici. Stack: Angular, TypeScript, LocalStorage/REST, CSS3. Risultato: Creazione dinamica di schede, calcolo carichi e timer integrato con interfaccia mobile-first.',

      'progetti.item11.title': 'PokeZone',
      'progetti.item11.desc': 'Obiettivo: Realizzare una web app per analisi e comparazione dati con visualizzazioni grafiche avanzate. Stack: Angular, TypeScript, ApexCharts, PokéAPI. Risultato: Dashboard reattiva con grafici radar e barre, filtri multidimensionali e pattern di architettura a componenti modulari.',

      'progetti.item12.title': 'TaskFlow',
      'progetti.item12.desc': 'Obiettivo: Costruire un\'architettura full-stack enterprise per la gestione di flussi di lavoro e task collaborativi. Stack: Angular, Quarkus (Java), API REST, JWT, SQL. Risultato: Sistema sicuro con autenticazione basata su ruoli (RBAC), gestione transazionale dei dati e interfaccia reattiva per il tracking di team.',

      'progetti.item13.title': 'Project Work Mona S.P.A.',
      'progetti.item13.desc': 'Obiettivo: Realizzare una piattaforma gestionale B2B per monitoraggio commesse e telemetria industriale. Stack: Quarkus (Java), Next.js, TypeScript, API REST, SQL. Risultato: Dashboard interattiva con grafici avanzati, gestione anagrafica relazionale e throughput API ottimizzato.',

      'progetti.item14.title': 'Manga & Anime',
      'progetti.item14.desc': 'Obiettivo: Piattaforma per catalogazione e monitoraggio anime e manga in tempo reale. Stack: Next.js, React, TypeScript, GraphQL (AniList API), Tailwind/CSS. Risultato: Rendering ibrido (SSR/CSR), gestione stato complessa, filtri avanzati, scroll infinito ottimizzato e dark/light mode.',

      'certificazioni.title': 'Certificazioni',
      'certificazioni.empty': 'Nessuna certificazione ancora.',
      'certificazioni.view_cert': 'Visualizza attestato →',
      'certificazioni.show_all': 'Mostra tutte le 21 certificazioni ↓',
      'certificazioni.show_less': 'Mostra solo le 6 principali ↑',
      'certificazioni.item1.title': 'ITS Web Developer (Livello EQF 5)',
      'certificazioni.item1.issuer': 'Fondazione ITS Incom Academy',
      'certificazioni.item1.date': '2026',
      'certificazioni.item1.desc': 'Attestato del corso biennale ITS Web Developer (ID 48332), 2000 ore, sessione giugno 2026 con esito idoneo e votazione 91/110.',

      'certificazioni.item2.title': 'Servizio Civile Universale',
      'certificazioni.item2.issuer': 'Presidenza del Consiglio dei Ministri',
      'certificazioni.item2.date': 'Mag 2023 — Mag 2024',
      'certificazioni.item2.desc': 'Progetto "La promozione del territorio - educazione al turismo sostenibile e sociale" presso Associazione Mosaico, Varese.',

      'certificazioni.item3.title': 'Addetto all\'Informazione',
      'certificazioni.item3.issuer': 'CE.SVI.P. Lombardia',
      'certificazioni.item3.date': '2024',
      'certificazioni.item3.desc': 'Corso di 30 ore su comunicazione pubblica, privacy, accessibilità e usabilità web. Regione Lombardia.',

      'certificazioni.item4.title': 'Anthropic: Claude AI & Deployments',
      'certificazioni.item4.issuer': 'Anthropic',
      'certificazioni.item4.date': '2026',
      'certificazioni.item4.desc': 'Certificazioni tecniche su Claude API, Model Context Protocol (MCP) & Subagents, Claude Code in Action e deploy cloud su AWS Bedrock e GCP (21 corsi ufficiali completati).',

      'competenze.title': 'Competenze',
      'competenze.technical': 'Competenze Tecniche',
      'competenze.concepts': 'Tecnologie e Concetti',
      'competenze.concept.responsive': 'Responsive Design',
      'competenze.concept.design_system': 'UI/UX Design System',
      'competenze.concept.a11y': 'Web Accessibility (WCAG 2.1 / a11y)',
      'competenze.concept.state': 'Gestione Stato',
      'competenze.concept.rest': 'Web API RESTful',
      'competenze.concept.validation': 'Form Validation',
      'competenze.concept.refactoring': 'Refactoring del Codice',
      'competenze.concept.cybersecurity': 'Sicurezza del codice',
      'competenze.concept.ai': 'Prompt Engineering & AI',

      'skill.html5': 'HTML5 semantico',
      'skill.responsive': 'Responsive Design',
      'skill.a11y': 'Accessibilità (WCAG 2.1)',
      'skill.react': 'React / Next.js',
      'skill.csharp_blazor': 'C# / .NET (Blazor & REST API)',
      'skill.sql': 'SQL relazionale',
      'skill.nosql': 'Fondamenti NoSQL',

      'competenze.soft': 'Competenze Trasversali',
      'competenze.cat.frontend': 'Frontend & UI',
      'competenze.cat.backend': 'Integrazione & Backend',
      'competenze.cat.database': 'Database',
      'competenze.cat.tools': 'Strumenti & AI Tooling',
      'competenze.teamwork': 'Lavoro in team',
      'competenze.communication': 'Comunicazione efficace',
      'competenze.organization': 'Organizzazione e gestione del tempo',
      'competenze.problemsolving': 'Problem solving',
      'competenze.adaptability': 'Adattabilità e flessibilità',
      'competenze.selflearning': 'Apprendimento continuo',
      'competenze.proactivity': 'Orientamento ai risultati',
      'competenze.empathy': 'Attenzione ai dettagli',

      'lingue.title': 'Lingue',
      'lingue.it': 'Italiano',
      'lingue.it.level': 'Madrelingua',
      'lingue.en': 'Inglese',
      'lingue.en.level': 'B2',
      'lingue.en.desc': 'Lettura fluida di documentazione tecnica e specifiche architetturali, stesura di note di rilascio.',

      'home.see_education': 'Vedi la formazione completa →',
      'home.view_all_skills': 'Vedi tutte le competenze →',
      'app.skip_link': 'Vai al contenuto principale',

      'contatti.title': 'Contatti',
      'contatti.email': 'Email',
      'contatti.location': 'Località',
      'contatti.location.value': '21100 Varese, Italia',
      'contatti.details': 'Recapiti',
      'contatti.toast.close': 'Chiudi notifica',
      'contatti.intro': 'Hai un progetto, un\'opportunità di lavoro o semplicemente una domanda? Scrivimi: di solito rispondo entro un paio di giorni.',
      'contatti.form.title': 'Scrivimi',
      'contatti.form.name': 'Nome',
      'contatti.form.name.placeholder': 'Il tuo nome',
      'contatti.form.email': 'Email',
      'contatti.form.email.placeholder': 'la.tua@email.com',
      'contatti.form.subject': 'Oggetto',
      'contatti.form.subject.placeholder': 'Oggetto del messaggio',
      'contatti.form.message': 'Messaggio',
      'contatti.form.message.placeholder': 'Scrivi il tuo messaggio...',
      'contatti.form.submit': 'Invia messaggio',
      'contatti.form.sending': 'Invio in corso...',
      'contatti.form.success': 'Messaggio inviato con successo! Ti risponderò al più presto.',
      'contatti.form.error.required': 'Tutti i campi sono obbligatori.',
      'contatti.form.error.email': 'Inserisci un indirizzo email valido.',
      'contatti.form.error.generic': 'Errore nell\'invio del messaggio. Riprova più tardi o scrivimi via email.',
      'contatti.form.error.connection': 'Errore di connessione. Riprova più tardi.',

      'notfound.title': 'Pagina non trovata',
      'notfound.desc': 'La pagina che stai cercando non esiste o è stata spostata.',
      'notfound.back': 'Torna alla Home',

      'nav.aria_main': 'Menu principale',
      'nav.aria_mobile': 'Menu di navigazione',
      'nav.menu_open': 'Apri menu',
      'nav.menu_close': 'Chiudi menu',
      'nav.switch_lang': 'Switch to English',
      'nav.cv_aria': 'Scarica il CV (PDF, si apre in una nuova scheda)',

      'home.journey': 'Esperienze e formazione',
      'home.see_experience': 'Vedi tutte le esperienze →',
      'esperienze.see_skills': 'Vedi competenze e formazione →',

      'level.advanced': 'Avanzato',
      'level.intermediate': 'Intermedio',
      'level.basic': 'Base',

      'tag.chamber_services': 'Servizi camerali',
      'tag.digitalization': 'Digitalizzazione',
      'tag.business_relations': 'Relazioni con utenza e imprese',
      'tag.document_management': 'Gestione documentale',
      'tag.public_comm': 'Comunicazione pubblica',
      'tag.web_a11y': 'Accessibilità web',
      'tag.web_usability': 'Usabilità web',

      'progetti.badge.nda': 'Progetto aziendale · NDA',

      'contatti.form.error.too_long': 'Uno dei campi supera la lunghezza massima consentita.',
      'contatti.form.error.captcha': 'Verifica anti-spam non superata. Riprova, oppure scrivimi direttamente via email.',
            'meta.card.title': 'Digital Business Card',
      'meta.card.desc': 'Biglietto da visita digitale di Luca Ferro — Full-Stack & Frontend Web Developer. Salva il contatto o collegati sui profili professionali.',
      'card.role': 'Full-Stack & Frontend Web Developer',
      'card.badge.location': 'Varese, IT',
      'card.badge.status': 'Disponibile / Remoto',
      'card.cta.save': 'Salva Contatto in Rubrica',
      'card.cta.saved': 'Contatto Scaricato!',
      'card.link.github': 'GitHub',
      'card.link.linkedin': 'LinkedIn',
      'card.link.email': 'Email',
      'card.link.phone': 'Telefono',
      'card.link.portfolio': 'Visita il sito completo',
      'card.wallet.btn': 'Aggiungi a Google Wallet',
      'card.qr.toggle': 'Mostra QR Code',
      'card.qr.close': 'Chiudi QR Code',
      'card.copy.success': 'Copiato negli appunti!',
      'contatti.form.recaptcha_notice': 'Questo sito è protetto da reCAPTCHA: si applicano la Privacy Policy e i Termini di servizio di Google.',
    },
    en: {
      'nav.home': 'HOME',
      'nav.formazione': 'EDUCATION',
      'nav.esperienze': 'EXPERIENCE',
      'nav.progetti': 'PROJECTS',
      'nav.contatti': 'CONTACT',
      'nav.cv': 'CV',

      'meta.home.title': 'Full-Stack & Frontend Web Developer',
      'meta.home.desc': 'Portfolio of Luca Ferro, Full-Stack & Frontend Web Developer at FM Group. Enterprise web solutions with Angular, Blazor (C#), .NET REST APIs, SQL, WCAG 2.1 AA compliance, and Claude API / MCP.',
      'meta.formazione.title': 'Education & Skills',
      'meta.formazione.desc': 'Technical skills and certifications: Angular, TypeScript, Blazor (C#), .NET REST APIs, Java, SQL, WCAG 2.1 AA compliance, Docker, and Anthropic 2026 certifications (Claude API, MCP).',
      'meta.esperienze.title': 'Experience',
      'meta.esperienze.desc': 'Professional experience of Luca Ferro as a Full-Stack & Frontend Web Developer at FM Group S.r.l. (enterprise production on EasyWebParts and Aftersaleshub), Link IT Europe, and Chamber of Commerce.',
      'meta.progetti.title': 'Projects',
      'meta.progetti.desc': 'Production projects and web architectures: EasyWebParts B2B platform (.NET/Blazor), Aftersaleshub portal (Angular/WCAG 2.1 AA), Clay-Vue UI Component Library, and full-stack web applications.',
      'meta.contatti.title': 'Contact',
      'meta.contatti.desc': 'Contact Luca Ferro for collaborations and career opportunities as a Full-Stack & Frontend Web Developer.',
      'meta.notfound.title': 'Page Not Found',
      'meta.notfound.desc': 'The page you are looking for does not exist or has been moved.',

      'formazione.title': 'Education & Skills',
      'formazione.education': 'Education',
      'formazione.certifications': 'Certifications',

      'home.subtitle': "Hello World, I'm",
      'home.description': 'Welcome to my personal website.',
      'home.bio': 'Full-Stack & Frontend Web Developer driving the development and maintenance of production B2B platforms and enterprise portals at FM Group. I pair advanced frontend expertise in Angular, TypeScript, and Vue.js with a solid backend background in C#/.NET, Java (OOP), REST APIs, and SQL databases. I deliver 100% WCAG 2.1 AA compliance, architectural clean code, high-performance reusable UI components, and modern AI tool integration (Claude API, Model Context Protocol).',

      'home.pitch': 'I engineer scalable, accessible, and high-performance web solutions: enterprise frontends with Angular and Blazor (C#), robust backends with .NET REST APIs and SQL, delivered with 100% WCAG 2.1 AA compliance.',
      'home.cta_projects': 'Explore projects →',
      'home.cta_contact': 'Contact me',
      'cv.it': 'Italian (PDF)',
      'cv.en': 'English (PDF)',
      'cv.current': 'Active',

      'home.tech_stack': 'Tech Stack',
      'home.cta': 'Discover my projects →',

      'studi.title': 'Education',
      'studi.item1.title': 'Higher Technical Diploma in Web Development (ITS – EQF 5)',
      'studi.item1.subtitle': 'Fondazione ITS Incom, Busto Arsizio (VA)',
      'studi.item1.date': 'Oct 2024 — Jun 2026',
      'studi.item1.desc': 'Final grade: 91/110. Two-year, 2,000-hour intensive diploma focused on the enterprise software lifecycle. Advanced frontend engineering (Angular, TypeScript, JavaScript ES6+), OOP backend architectures (Java, PHP, REST APIs), relational databases (MySQL/SQL), Docker containerization, CI/CD, and prompt engineering.',
      'studi.item2.title': 'Diploma in Maintenance and Technical Assistance',
      'studi.item2.subtitle': 'ISIS "Isaac Newton", Varese',
      'studi.item2.date': 'Sep 2017 — Jul 2022',
      'studi.item2.desc': 'Specialization: Industrial technical systems, equipment, and services. Logical-mechanical problem-solving, diagnostics of complex systems, and electrotechnics.',
      'studi.view_doc': 'View document →',

      'esperienze.title': 'Experience',
      'esperienze.item1.title': 'Full-Stack & Frontend Web Developer',
      'esperienze.item1.subtitle': 'FM Group S.r.l., Gallarate',
      'esperienze.item1.date': 'Aug 2026 — Present',
      'esperienze.item1.desc': 'Hired full-time after the internship to lead the end-to-end development of the EasyWebParts B2B platform and the frontend evolution of the Aftersaleshub portal. Blazor & C#/.NET: engineered 10+ high-performance reusable UI components, interactive catalog views, and complex data tables for technical parts documentation. Backend & SQL: implemented server-side business logic, documented REST APIs, robust input validation, and optimized relational SQL queries. Angular & TypeScript: developed client-facing features for Aftersaleshub, improving page responsiveness and user onboarding. Accessibility & Quality: 100% compliance with WCAG 2.1 AA guidelines (keyboard focus management, accessible contrasts), modular refactoring, and active production troubleshooting.',
      'esperienze.item2.title': 'Web & Frontend Developer (Internship)',
      'esperienze.item2.subtitle': 'FM Group S.r.l., Gallarate',
      'esperienze.item2.date': 'Jan 2026 — May 2026',
      'esperienze.item2.desc': 'High-impact curricular internship leading to full-time hiring. Designed and developed the corporate FM Group web portal from scratch using Angular and TypeScript, translating Figma mockups into responsive, i18n-ready architectures. Full-stack contact module implementation with asynchronous validation and PHP backend mail microservice. Transitioned into the EasyWebParts core engineering team to develop the Blazor (C#) frontend and internal UI component library for parts lookup.',
      'esperienze.item3.title': 'Frontend Web Developer (Internship)',
      'esperienze.item3.subtitle': 'Link IT Europe S.r.l., Buguggiate',
      'esperienze.item3.date': 'Jun 2025 — Jul 2025',
      'esperienze.item3.desc': 'Architected and built the open-source \'clay-vue\' UI component library in Vue.js with 15+ modular components (Accordion, Modal, Tab, Toast, Alert, Dropdown). Designed custom Claymorphism styling in CSS3/SASS with progressive enhancement, strict WCAG 2.1 AA accessibility (full keyboard navigation, ARIA attributes, color contrast), and 100% cross-browser compatibility.',
      'esperienze.item4.title': 'Volunteer Operator – Universal Civil Service',
      'esperienze.item4.subtitle': 'Chamber of Commerce, Varese',
      'esperienze.item4.date': 'May 2023 — May 2024',
      'esperienze.item4.desc': 'Support for services to local businesses, digitization of administrative procedures and user assistance.',

      'progetti.title': 'Projects',
      'progetti.filter.aria': 'Filter projects by technology',
      'progetti.filter.all': 'All',
      'progetti.filter.angular': 'Angular',
      'progetti.filter.react': 'React / Next.js',
      'progetti.filter.blazor': 'Blazor / .NET',
      'progetti.filter.fullstack': 'Java / Backend',
      'progetti.filter.vanilla': 'HTML / CSS / JS',
      'progetti.item1.title': 'Aftersaleshub — Angular Portal',
      'progetti.item1.desc': 'Objective: Build a responsive, multilingual onboarding portal for Aftersaleshub. Stack: Angular, TypeScript, CSS3/SASS, Figma, i18n, PHP. Result: Developed a modular SPA architecture from scratch, achieved 100% WCAG 2.1 AA compliance, and implemented asynchronous demo request pipelines in production.',
      'progetti.item2.title': 'EasyWebParts — Blazor B2B Platform',
      'progetti.item2.desc': 'Objective: Digitize and accelerate technical spare-parts documentation retrieval for B2B industrial clients. Stack: Blazor (C#), .NET REST APIs, SQL, CSS3/SASS. Result: Built 10+ high-performance reusable UI components, advanced filterable tables, and a WCAG 2.1 AA accessible interface deployed in active production.',
      'progetti.item3.title': 'UI Component Library (Clay-Vue)',
      'progetti.item3.desc': 'Objective: Create an accessible, modular design system and component library for Vue applications. Stack: Vue.js, TypeScript, CSS3/SASS, semantic HTML5. Result: 15+ interactive UI components with advanced focus management, WCAG 2.1 AA conformance, and 100% cross-browser compatibility.',
      'progetti.item4.title': 'Personal Portfolio',
      'progetti.item4.desc': 'Objective: Showcase technical background, architecture, and production impact with modern web standards. Stack: Angular, TypeScript, Signals, CSS3/SASS, Serverless Node.js, reCAPTCHA v3. Result: High-performance SPA with top Core Web Vitals, 100% WCAG 2.1 AA accessibility, full i18n, and zero third-party UI dependencies.',
      'progetti.link.github': 'GitHub',
      'progetti.link.github_fe': 'GitHub FE',
      'progetti.link.github_be': 'GitHub BE',
      'progetti.link.demo': 'Live Demo →',
      'progetti.badge.private': 'Private',

      'progetti.item5.title': 'Restaurant Website',
      'progetti.item5.desc': 'Objective: Deliver a high-conversion digital presence for a food service business. Stack: Semantic HTML5, CSS3, JavaScript ES6+. Result: 100% responsive layout, digital menu with interactive filters, optimized assets, and 95+ SEO and performance scores.',

      'progetti.item6.title': 'Stand-Up Meeting App',
      'progetti.item6.desc': 'Objective: Streamline daily agile stand-up meetings with time-boxed participant tracking. Stack: JavaScript ES6+, HTML5, CSS3. Result: Dynamic speaker rotation timer, local session persistence, and zero-dependency lightweight execution.',

      'progetti.item7.title': 'Project Work Simulation',
      'progetti.item7.desc': 'Objective: Simulate an enterprise portal interface for resource allocation and asset tracking. Stack: HTML5, CSS3, JavaScript. Result: Interactive data tables with client-side sorting and filtering, and clean modular CSS.',

      'progetti.item8.title': 'CinemaHub',
      'progetti.item8.desc': 'Objective: Build an interactive movie discovery and seat booking simulation platform. Stack: Angular, TypeScript, TMDB REST API, CSS3. Result: Progressive Web App with interactive seat layout selection, smooth carousels, and live data synchronization deployed on Vercel.',

      'progetti.item9.title': 'F1 Dashboard',
      'progetti.item9.desc': 'Objective: Visualize and analyze motorsport race telemetry, lap times, and driver standings. Stack: Angular, TypeScript, OpenF1 REST API, CSS3. Result: Low-latency reactive dashboard with comparative telemetry tables and driver performance statistics.',

      'progetti.item10.title': 'Gym App',
      'progetti.item10.desc': 'Objective: Build a responsive workout planner and progressive overload tracker. Stack: Angular, TypeScript, LocalStorage/REST, CSS3. Result: Dynamic routine builder, workload analytics, integrated rest timer, and mobile-first interface.',

      'progetti.item11.title': 'PokeZone',
      'progetti.item11.desc': 'Objective: Data visualization and analytics web app consuming external REST endpoints. Stack: Angular, TypeScript, ApexCharts, PokéAPI. Result: High-density interactive dashboard with radar/bar charts, complex client-side filters, and modular component architecture.',

      'progetti.item12.title': 'TaskFlow',
      'progetti.item12.desc': 'Objective: Deliver an enterprise-grade full-stack task management and collaboration solution. Stack: Angular, Quarkus (Java), REST APIs, JWT, SQL. Result: Role-based access control (RBAC), transactional data integrity, and a reactive dashboard for team project tracking.',

      'progetti.item13.title': 'Mona S.P.A. Project Work',
      'progetti.item13.desc': 'Objective: Build a B2B operations management dashboard for order tracking and telemetry data. Stack: Quarkus (Java), Next.js, TypeScript, REST APIs, SQL. Result: Interactive analytics charts, relational data management, and high-throughput REST backend services.',

      'progetti.item14.title': 'Manga & Anime',
      'progetti.item14.desc': 'Objective: Real-time discovery and tracking platform for anime and manga. Stack: Next.js, React, TypeScript, AniList GraphQL API, Tailwind/CSS. Result: Hybrid SSR/CSR rendering, robust state management, advanced search filters, virtualized infinite scrolling, and light/dark theme.',

      'certificazioni.title': 'Certifications',
      'certificazioni.empty': 'No certifications yet.',
      'certificazioni.view_cert': 'View certificate →',
      'certificazioni.show_all': 'Show all 21 certifications ↓',
      'certificazioni.show_less': 'Show 6 main certifications ↑',
      'certificazioni.item1.title': 'ITS Web Developer (EQF Level 5)',
      'certificazioni.item1.issuer': 'Fondazione ITS Incom Academy',
      'certificazioni.item1.date': '2026',
      'certificazioni.item1.desc': 'Attestation for the two-year ITS Web Developer course (ID 48332), 2000 hours, June 2026 session with pass result and 91/110 grade.',

      'certificazioni.item2.title': 'Universal Civil Service',
      'certificazioni.item2.issuer': 'Presidency of the Council of Ministers',
      'certificazioni.item2.date': 'May 2023 — May 2024',
      'certificazioni.item2.desc': 'Project "Territory promotion - Education for sustainable and social tourism" at Associazione Mosaico, Varese.',

      'certificazioni.item3.title': 'Information Officer',
      'certificazioni.item3.issuer': 'CE.SVI.P. Lombardia',
      'certificazioni.item3.date': '2024',
      'certificazioni.item3.desc': '30-hour course on public communication, privacy, web accessibility and usability. Regione Lombardia.',

      'certificazioni.item4.title': 'Anthropic: Claude AI & Deployments',
      'certificazioni.item4.issuer': 'Anthropic',
      'certificazioni.item4.date': '2026',
      'certificazioni.item4.desc': 'Technical certifications in Claude API, Model Context Protocol (MCP) & Subagents, Claude Code in Action, and cloud deployments on AWS Bedrock and GCP (21 official courses completed).',

      'competenze.title': 'Skills',
      'competenze.technical': 'Technical Skills',
      'competenze.concepts': 'Technologies & Concepts',
      'competenze.concept.responsive': 'Responsive Design',
      'competenze.concept.design_system': 'UI/UX Design System',
      'competenze.concept.a11y': 'Web Accessibility (WCAG 2.1 / a11y)',
      'competenze.concept.state': 'State Management',
      'competenze.concept.rest': 'RESTful Web APIs',
      'competenze.concept.validation': 'Form Validation',
      'competenze.concept.refactoring': 'Code Refactoring',
      'competenze.concept.cybersecurity': 'Code Security',
      'competenze.concept.ai': 'Prompt Engineering & AI',

      'skill.html5': 'Semantic HTML5',
      'skill.responsive': 'Responsive Design',
      'skill.a11y': 'Accessibility (WCAG 2.1)',
      'skill.react': 'React / Next.js',
      'skill.csharp_blazor': 'C# / .NET (Blazor & REST API)',
      'skill.sql': 'Relational SQL',
      'skill.nosql': 'NoSQL fundamentals',

      'competenze.soft': 'Soft Skills',
      'competenze.cat.frontend': 'Frontend & UI',
      'competenze.cat.backend': 'Integration & Backend',
      'competenze.cat.database': 'Database',
      'competenze.cat.tools': 'Tools & AI Tooling',
      'competenze.teamwork': 'Teamwork',
      'competenze.communication': 'Effective communication',
      'competenze.organization': 'Work organization & time management',
      'competenze.problemsolving': 'Problem solving',
      'competenze.adaptability': 'Adaptability & flexibility',
      'competenze.selflearning': 'Continuous learning',
      'competenze.proactivity': 'Results orientation',
      'competenze.empathy': 'Attention to detail',

      'lingue.title': 'Languages',
      'lingue.it': 'Italian',
      'lingue.it.level': 'Native',
      'lingue.en': 'English',
      'lingue.en.level': 'B2',
      'lingue.en.desc': 'Fluent reading of technical documentation and architectural specifications, plus writing of release notes.',

      'home.see_education': 'See full education →',
      'home.view_all_skills': 'View all skills →',
      'app.skip_link': 'Skip to main content',

      'contatti.title': 'Contact',
      'contatti.email': 'Email',
      'contatti.location': 'Location',
      'contatti.location.value': '21100 Varese, Italy',
      'contatti.details': 'Contact details',
      'contatti.toast.close': 'Dismiss notification',
      'contatti.intro': 'Have a project, a job opportunity or just a question? Drop me a message: I usually reply within a couple of days.',
      'contatti.form.title': 'Get in touch',
      'contatti.form.name': 'Name',
      'contatti.form.name.placeholder': 'Your name',
      'contatti.form.email': 'Email',
      'contatti.form.email.placeholder': 'your@email.com',
      'contatti.form.subject': 'Subject',
      'contatti.form.subject.placeholder': 'Message subject',
      'contatti.form.message': 'Message',
      'contatti.form.message.placeholder': 'Write your message...',
      'contatti.form.submit': 'Send message',
      'contatti.form.sending': 'Sending...',
      'contatti.form.success': 'Message sent successfully! I will reply as soon as possible.',
      'contatti.form.error.required': 'All fields are required.',
      'contatti.form.error.email': 'Please enter a valid email address.',
      'contatti.form.error.generic': 'Error sending the message. Please try again later or email me.',
      'contatti.form.error.connection': 'Connection error. Please try again later.',

      'notfound.title': 'Page Not Found',
      'notfound.desc': 'The page you are looking for does not exist or has been moved.',
      'notfound.back': 'Back to Home',

      'nav.aria_main': 'Main menu',
      'nav.aria_mobile': 'Navigation menu',
      'nav.menu_open': 'Open menu',
      'nav.menu_close': 'Close menu',
      'nav.switch_lang': 'Passa all\'italiano',
      'nav.cv_aria': 'Download CV (PDF, opens in a new tab)',

      'home.journey': 'Experience & Education',
      'home.see_experience': 'See all experience →',
      'esperienze.see_skills': 'See skills & education →',

      'level.advanced': 'Advanced',
      'level.intermediate': 'Intermediate',
      'level.basic': 'Basic',

      'tag.chamber_services': 'Chamber services',
      'tag.digitalization': 'Digitalization',
      'tag.business_relations': 'Public & business relations',
      'tag.document_management': 'Document management',
      'tag.public_comm': 'Public communication',
      'tag.web_a11y': 'Web accessibility',
      'tag.web_usability': 'Web usability',

      'progetti.badge.nda': 'Company project · NDA',

      'contatti.form.error.too_long': 'One of the fields exceeds the maximum allowed length.',
      'contatti.form.error.captcha': 'Anti-spam check failed. Please try again, or email me directly.',
            'meta.card.title': 'Digital Business Card',
      'meta.card.desc': 'Digital business card of Luca Ferro — Full-Stack & Frontend Web Developer. Save contact or connect on professional profiles.',
      'card.role': 'Full-Stack & Frontend Web Developer',
      'card.badge.location': 'Varese, IT',
      'card.badge.status': 'Available / Remote',
      'card.cta.save': 'Save Contact to Phonebook',
      'card.cta.saved': 'Contact Downloaded!',
      'card.link.github': 'GitHub',
      'card.link.linkedin': 'LinkedIn',
      'card.link.email': 'Email',
      'card.link.phone': 'Phone',
      'card.link.portfolio': 'Visit Full Portfolio',
      'card.wallet.btn': 'Add to Google Wallet',
      'card.qr.toggle': 'Show QR Code',
      'card.qr.close': 'Close QR Code',
      'card.copy.success': 'Copied to clipboard!',
      'contatti.form.recaptcha_notice': 'This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.',
    }
  };

  readonly tr = computed(() => this.translations[this.currentLang()]);

  setLang(lang: Lang): void {
    if (!isLang(lang)) return;
    this.currentLang.set(lang);
    this.document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Storage unavailable (private mode / blocked): language still applies for this session.
    }
  }

  t(key: string): string {
    return this.tr()[key] ?? key;
  }
}
