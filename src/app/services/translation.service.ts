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

      'meta.home.title': 'Home',
      'meta.home.desc': 'Portfolio di Luca Ferro, Full-Stack Web Developer con formazione ITS. Sviluppo web completo con Angular, TypeScript, Blazor, C#, .NET, PHP, Java e API REST.',
      'meta.formazione.title': 'Formazione e Competenze',
      'meta.formazione.desc': 'Competenze tecniche, certificazioni e formazione: Angular, TypeScript, Blazor, C#, .NET, Java, PHP, API REST, database relazionali e conformità a11y (WCAG 2.1).',
      'meta.esperienze.title': 'Esperienze',
      'meta.esperienze.desc': 'Esperienze professionali di Luca Ferro come Full-Stack Web Developer presso FM Group, Link IT Europe e Camera di Commercio di Varese.',
      'meta.progetti.title': 'Progetti',
      'meta.progetti.desc': 'Progetti di sviluppo web: portale vetrina Aftersaleshub, piattaforma B2B EasyWebParts, UI Component Library accessibile e applicazioni full-stack.',
      'meta.contatti.title': 'Contatti',
      'meta.contatti.desc': 'Contatta Luca Ferro per collaborazioni, progetti o opportunità lavorative come Full-Stack Web Developer.',
      'meta.notfound.title': 'Pagina non trovata',
      'meta.notfound.desc': 'La pagina che stai cercando non esiste o è stata spostata.',

      'formazione.title': 'Formazione e Competenze',
      'formazione.education': 'Formazione',
      'formazione.certifications': 'Certificazioni',

      'home.subtitle': "Hello World, I'm",
      'home.description': 'Benvenuto nel mio sito personale.',
      'home.bio': 'Software Developer con formazione terziaria professionalizzante ITS (EQF 5) e solida esperienza operativa maturata su architetture applicative complete, dall\'interfaccia utente alla gestione dati. Attualmente in FM Group S.r.l., dove contribuisco allo sviluppo e all\'evoluzione end-to-end dell\'ecosistema per l\'assistenza post-vendita industriale, integrando architetture backend in C#/.NET e PHP con frontend reattivi in Angular e Blazor. Unisco la solida preparazione informatica di base (Java, Python, TypeScript, Docker) acquisita all\'ITS a una forte esperienza applicativa sul campo su .NET, API REST, database relazionali e conformità all\'accessibilità web (WCAG 2.1 AA).',

      'home.tech_stack': 'Tech Stack',
      'home.cta': 'Scopri i miei progetti →',

      'studi.title': 'Studi',
      'studi.item1.title': 'Diploma di Tecnico Superiore (ITS – EQF 5) in Web Development',
      'studi.item1.subtitle': 'Fondazione ITS Incom, Busto Arsizio (VA)',
      'studi.item1.date': 'Ott 2024 — Giu 2026',
      'studi.item1.desc': 'Percorso biennale post-diploma (2.000 ore) dedicato all\'ingegneria del software, allo sviluppo full-stack e al ciclo di vita applicativo (votazione finale: 91/110). Ambiti di studio: OOP con Java e Python, sviluppo backend in PHP, frontend con JavaScript e TypeScript, gestione database relazionali (MySQL) e introduzione NoSQL. Architetture cloud e containerizzazione con Docker, principi di cybersecurity applicata al codice, Prompt Engineering per sviluppatori e metodologie di UX/UI Design accessibile. Project work applicativi complessi integrati a database e API esterne.',
      'studi.item2.title': 'Diploma in Manutenzione e Assistenza Tecnica',
      'studi.item2.subtitle': 'ISIS "Isaac Newton", Varese',
      'studi.item2.date': 'Set 2017 — Lug 2022',
      'studi.item2.desc': 'Indirizzo: Apparati, impianti e servizi tecnici industriali. Competenze logico-meccaniche, diagnostica di sistemi complessi ed elettrotecnica.',
      'studi.view_doc': 'Visualizza documento →',

      'esperienze.title': 'Esperienze',
      'esperienze.item1.title': 'Web Developer',
      'esperienze.item1.subtitle': 'FM Group S.r.l., Gallarate',
      'esperienze.item1.date': 'Ago 2026 — Presente',
      'esperienze.item1.desc': 'Sviluppo ed evoluzione dell\'ecosistema web B2B per l\'assistenza post-vendita industriale, articolato tra la piattaforma applicativa EasyWebParts (gestione ricambi e documentazione tecnica in Blazor, C#, .NET e SQL) e il portale Aftersaleshub (onboarding e accesso demo in Angular e TypeScript). Progettazione e implementazione di endpoint API RESTful, flussi asincroni per il recupero dati dei cataloghi e validazione form lato server. Implementazione di una libreria di componenti conforme agli standard WCAG 2.1 (AA), garantendo consistenza visiva, navigabilità completa da tastiera e contrasti conformi.',
      'esperienze.item2.title': 'Stagista Web Developer',
      'esperienze.item2.subtitle': 'FM Group S.r.l., Gallarate',
      'esperienze.item2.date': 'Gen 2026 — Mag 2026',
      'esperienze.item2.desc': 'Prototipazione e sviluppo in autonomia del frontend in Angular per il sito vetrina aziendale: dall\'analisi dell\'interfaccia e dei percorsi utente su Figma fino all\'integrazione di layout responsive multilingua (i18n) e validazione asincrona dei form in PHP. Creazione di componenti riutilizzabili per la piattaforma in Blazor (finestre modali per consultazione tavole ricambi, tabelle dinamiche, notifiche di sistema e ottimizzazione dell\'interazione utente). Revisione della semantica HTML5, miglioramento delle prestazioni e debugging cross-browser.',
      'esperienze.item3.title': 'Stagista Web Developer',
      'esperienze.item3.subtitle': 'Link IT Europe S.r.l., Buguggiate',
      'esperienze.item3.date': 'Giu 2025 — Lug 2025',
      'esperienze.item3.desc': 'Progettazione e rilascio di una libreria di oltre 15 componenti UI (Alert, Toast, Accordion, Tab) in stile Claymorphism, concepita per l\'integrazione scalabile in progetti web aziendali. Implementazione architetturale in HTML5 semantico e CSS3 puro con Progressive Enhancement, garantendo piena fruibilità, accessibilità e funzionamento strutturale anche in ambienti con JavaScript disabilitato. Meticolosa gestione del focus da tastiera, indicatori di stato attivi e contrasti visivi conformi agli standard di accessibilità (WCAG 2.1).',
      'esperienze.item4.title': 'Servizio Civile Universale',
      'esperienze.item4.subtitle': 'Camera di Commercio, Varese',
      'esperienze.item4.date': 'Mag 2023 — Mag 2024',
      'esperienze.item4.desc': 'Supporto operativo all\'erogazione di servizi camerali, gestione della documentazione e relazioni quotidiane con l\'utenza e le imprese locali. Digitalizzazione pratiche amministrative e collaborazione attiva alle attività promozionali per il territorio.',

      'progetti.title': 'Progetti',
      'progetti.filter.aria': 'Filtra progetti per tecnologia',
      'progetti.filter.all': 'Tutti',
      'progetti.filter.angular': 'Angular',
      'progetti.filter.blazor': 'Blazor / .NET',
      'progetti.filter.fullstack': 'Java / Full-Stack',
      'progetti.filter.vanilla': 'HTML / CSS / JS',
      'progetti.item1.title': 'Siti Vetrina Aziendali Angular',
      'progetti.item1.desc': 'Sviluppo e manutenzione in autonomia del frontend di siti vetrina aziendali in Angular e TypeScript: dall\'analisi e prototipazione su Figma alla realizzazione di layout responsive, gestione multilingua (i18n) e form validation in PHP.',
      'progetti.item2.title': 'EasyWebParts — Piattaforma B2B Blazor',
      'progetti.item2.desc': 'Sviluppo ed espansione dei moduli applicativi e dell\'ambiente demo interattivo per la piattaforma B2B EasyWebParts mediante architettura Blazor, C# e .NET: gestione ricambi, documentazione tecnica, tabelle dinamiche, finestre modali e integrazione con modelli dati relazionali (SQL).',
      'progetti.item3.title': 'UI Component Library (Clay-Vue)',
      'progetti.item3.desc': 'Libreria di oltre 15 componenti UI (Alert, Toast, Accordion, Tab) in stile Claymorphism realizzata in HTML5 semantico e CSS3 puro: progressive enhancement garantito anche con JavaScript disabilitato, gestione focus da tastiera e contrasti elevati conformi a11y.',
      'progetti.item4.title': 'Portfolio Personale',
      'progetti.item4.desc': 'Portfolio personale sviluppato con Angular 22, architettura a componenti standalone, segnali, animazioni particellari su Canvas, form contatti serverless con reCAPTCHA v3 e supporto multilingua (IT/EN).',
      'progetti.link.github': 'GitHub',
      'progetti.link.github_fe': 'GitHub FE',
      'progetti.link.github_be': 'GitHub BE',
      'progetti.link.demo': 'Live Demo →',
      'progetti.badge.private': 'Privato',

      'progetti.item5.title': 'Sito Ristorante',
      'progetti.item5.desc': 'Sito vetrina per ristorante realizzato con HTML, CSS e JavaScript. Layout responsive con design pulito e navigazione fluida.',

      'progetti.item6.title': 'Stand-Up Meeting App',
      'progetti.item6.desc': 'Applicazione per la gestione di stand-up meeting con dashboard, storico e tracciamento attività. Interfaccia reattiva con JavaScript vanilla.',

      'progetti.item7.title': 'Simulazione Project Work',
      'progetti.item7.desc': 'Simulazione di progetto lavorativo con interfaccia interattiva, gestione asset e layout responsive. Sviluppato con HTML, CSS e JavaScript.',

      'progetti.item8.title': 'CinemaHub',
      'progetti.item8.desc': 'Piattaforma cinematografica con catalogo film TMDB, prenotazione posti con selezione sedili, carosello animato e design dark/gold. PWA Angular con API REST e deploy Vercel.',

      'progetti.item9.title': 'Dashboard F1',
      'progetti.item9.desc': 'Dashboard interattiva sulla Formula 1 sviluppata con Angular. Visualizzazione dati, statistiche piloti e statistiche scuderie con TypeScript.',

      'progetti.item10.title': 'App Gym',
      'progetti.item10.desc': 'Applicazione Angular per la gestione di schede di allenamento e esercizi. Interfaccia moderna con componenti riutilizzabili e design responsive.',

      'progetti.item11.title': 'PokeZone',
      'progetti.item11.desc': 'Applicazione Angular per l\'esplorazione dei dati Pokemon con PokéAPI. Dashboard con grafici ApexCharts, filtri avanzati e design glassmorphism. Progetto in team.',

      'progetti.item12.title': 'TaskFlow',
      'progetti.item12.desc': 'Piattaforma di gestione task full-stack con frontend Angular 20 e backend Quarkus/Java. Autenticazione JWT, gestione progetti, collaboratori e notifiche.',

      'progetti.item13.title': 'Project Work Mona S.P.A.',
      'progetti.item13.desc': 'Project work scolastico full-stack con backend Quarkus/Java e frontend Next.js/TypeScript. Applicazione aziendale con grafici e gestione dati.',

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
      'competenze.concept.cybersecurity': 'Cybersecurity Applicata',
      'competenze.concept.ai': 'Prompt Engineering & AI',

      'competenze.soft': 'Competenze Trasversali',
      'competenze.cat.frontend': 'Frontend & Web',
      'competenze.cat.backend': 'Linguaggi & Backend',
      'competenze.cat.database': 'Database',
      'competenze.cat.tools': 'DevOps, Tool & Metodologie',
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
      'lingue.en.level': 'Livello B2 – Tecnico',
      'lingue.en.desc': 'Autonomia nella comprensione e redazione di documentazione tecnica, lettura specifiche e scrittura codice.',

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
      'contatti.form.recaptcha_notice': 'Questo sito è protetto da reCAPTCHA: si applicano la Privacy Policy e i Termini di servizio di Google.',
    },
    en: {
      'nav.home': 'HOME',
      'nav.formazione': 'EDUCATION',
      'nav.esperienze': 'EXPERIENCE',
      'nav.progetti': 'PROJECTS',
      'nav.contatti': 'CONTACT',
      'nav.cv': 'CV',

      'meta.home.title': 'Home',
      'meta.home.desc': 'Portfolio of Luca Ferro, Full-Stack Web Developer with ITS education. Full web development with Angular, TypeScript, Blazor, C#, .NET, PHP, Java and REST APIs.',
      'meta.formazione.title': 'Education & Skills',
      'meta.formazione.desc': 'Technical skills, certifications and education: Angular, TypeScript, Blazor, C#, .NET, Java, PHP, REST APIs, relational databases and a11y compliance (WCAG 2.1).',
      'meta.esperienze.title': 'Experience',
      'meta.esperienze.desc': 'Professional experience of Luca Ferro as a Full-Stack Web Developer at FM Group, Link IT Europe and Chamber of Commerce of Varese.',
      'meta.progetti.title': 'Projects',
      'meta.progetti.desc': 'Web development projects: Aftersaleshub showcase portal, EasyWebParts B2B platform, accessible UI Component Library and full-stack applications.',
      'meta.contatti.title': 'Contact',
      'meta.contatti.desc': 'Contact Luca Ferro for collaborations, projects or Full-Stack Web Developer opportunities.',
      'meta.notfound.title': 'Page Not Found',
      'meta.notfound.desc': 'The page you are looking for does not exist or has been moved.',

      'formazione.title': 'Education & Skills',
      'formazione.education': 'Education',
      'formazione.certifications': 'Certifications',

      'home.subtitle': "Hello World, I'm",
      'home.description': 'Welcome to my personal website.',
      'home.bio': 'Software Developer with ITS professional higher education (EQF Level 5) and solid operational experience across complete application architectures, from user interface to data management. Currently at FM Group S.r.l., contributing to the end-to-end development and evolution of the industrial after-sales ecosystem, integrating C#/.NET and PHP backend architectures with reactive frontends in Angular and Blazor. Combining a solid IT foundation (Java, Python, TypeScript, Docker) acquired at ITS with strong hands-on experience in .NET, REST APIs, relational databases, and web accessibility standards (WCAG 2.1 AA).',

      'home.tech_stack': 'Tech Stack',
      'home.cta': 'Discover my projects →',

      'studi.title': 'Education',
      'studi.item1.title': 'Higher Technical Institute Diploma (ITS – EQF 5) in Web Development',
      'studi.item1.subtitle': 'Fondazione ITS Incom, Busto Arsizio (VA)',
      'studi.item1.date': 'Oct 2024 — Jun 2026',
      'studi.item1.desc': 'Two-year post-diploma program (2,000 hours) dedicated to software engineering, full-stack development, and application lifecycle (final grade: 91/110). Core subjects: Object-Oriented Programming with Java and Python, backend development in PHP, frontend with JavaScript and TypeScript, relational databases (MySQL) and NoSQL introduction. Cloud architectures and containerization with Docker, code cybersecurity principles, Prompt Engineering for developers, and accessible UX/UI Design methodologies. Complex dedicated application project works integrated with databases and external APIs.',
      'studi.item2.title': 'Diploma in Maintenance and Technical Assistance',
      'studi.item2.subtitle': 'ISIS "Isaac Newton", Varese',
      'studi.item2.date': 'Sep 2017 — Jul 2022',
      'studi.item2.desc': 'Specialization: Industrial technical systems, equipment, and services. Logical-mechanical problem-solving, diagnostics of complex systems, and electrotechnics.',
      'studi.view_doc': 'View document →',

      'esperienze.title': 'Experience',
      'esperienze.item1.title': 'Web Developer',
      'esperienze.item1.subtitle': 'FM Group S.r.l., Gallarate',
      'esperienze.item1.date': 'Aug 2026 — Present',
      'esperienze.item1.desc': 'Development and evolution of the B2B web ecosystem for industrial after-sales support, encompassing the EasyWebParts application platform (spare parts management and technical documentation in Blazor, C#, .NET, and SQL) and the Aftersaleshub portal (customer onboarding and demo access in Angular and TypeScript). Design and implementation of RESTful API endpoints, asynchronous catalog data retrieval, and server-side form validation. Implementation of a WCAG 2.1 (AA) compliant component library ensuring visual consistency, full keyboard navigation, and accessible contrast.',
      'esperienze.item2.title': 'Web Developer Intern',
      'esperienze.item2.subtitle': 'FM Group S.r.l., Gallarate',
      'esperienze.item2.date': 'Jan 2026 — May 2026',
      'esperienze.item2.desc': 'Autonomous prototyping and frontend development in Angular for the corporate showcase website: from UI and user flow analysis in Figma to responsive multilingual layouts (i18n) and asynchronous form validation in PHP. Development of reusable components for the Blazor platform (spare parts table modals, dynamic data tables, system notifications). HTML5 semantic refactoring, performance optimization, and cross-browser debugging.',
      'esperienze.item3.title': 'Web Developer Intern',
      'esperienze.item3.subtitle': 'Link IT Europe S.r.l., Buguggiate',
      'esperienze.item3.date': 'Jun 2025 — Jul 2025',
      'esperienze.item3.desc': 'Design and release of a Claymorphism-style UI component library with over 15 components (Alert, Toast, Accordion, Tab), conceived for scalable integration into corporate web projects. Architectural implementation in semantic HTML5 and pure CSS3 with Progressive Enhancement, ensuring complete functionality and accessibility even in environments with JavaScript disabled. Meticulous keyboard focus management, active state indicators, and visual contrast compliant with accessibility standards (WCAG 2.1).',
      'esperienze.item4.title': 'Universal Civil Service',
      'esperienze.item4.subtitle': 'Chamber of Commerce, Varese',
      'esperienze.item4.date': 'May 2023 — May 2024',
      'esperienze.item4.desc': 'Operational support for chamber services delivery, document management, and daily interactions with users and local businesses. Digitization of administrative procedures and active collaboration in territorial promotional activities.',

      'progetti.title': 'Projects',
      'progetti.filter.aria': 'Filter projects by technology',
      'progetti.filter.all': 'All',
      'progetti.filter.angular': 'Angular',
      'progetti.filter.blazor': 'Blazor / .NET',
      'progetti.filter.fullstack': 'Java / Full-Stack',
      'progetti.filter.vanilla': 'HTML / CSS / JS',
      'progetti.item1.title': 'Corporate Angular Showcase Websites',
      'progetti.item1.desc': 'Autonomous frontend development and maintenance of corporate showcase websites in Angular and TypeScript: from Figma analysis and prototyping to responsive layouts, multilingual support (i18n) and PHP form validation.',
      'progetti.item2.title': 'EasyWebParts — Blazor B2B Platform',
      'progetti.item2.desc': 'Development and expansion of application modules and interactive demo environment for the EasyWebParts B2B platform using Blazor, C#, and .NET: spare parts management, technical documentation lookup, dynamic tables, modals, and integration with relational data models (SQL).',
      'progetti.item3.title': 'UI Component Library (Clay-Vue)',
      'progetti.item3.desc': 'Claymorphism-style UI component library with 15+ components (Alert, Toast, Accordion, Tab) built with semantic HTML5 and pure CSS3 with Progressive Enhancement: full accessibility even with JavaScript disabled, keyboard focus management, and compliant high contrast.',
      'progetti.item4.title': 'Personal Portfolio',
      'progetti.item4.desc': 'Personal portfolio built with Angular 22, standalone component architecture, signals, Canvas particle animations, serverless contact form with reCAPTCHA v3, and multilingual support (IT/EN).',
      'progetti.link.github': 'GitHub',
      'progetti.link.github_fe': 'GitHub FE',
      'progetti.link.github_be': 'GitHub BE',
      'progetti.link.demo': 'Live Demo →',
      'progetti.badge.private': 'Private',

      'progetti.item5.title': 'Restaurant Website',
      'progetti.item5.desc': 'Restaurant showcase website built with HTML, CSS and JavaScript. Responsive layout with clean design and smooth navigation.',

      'progetti.item6.title': 'Stand-Up Meeting App',
      'progetti.item6.desc': 'Application for managing stand-up meetings with dashboard, history and activity tracking. Reactive interface with vanilla JavaScript.',

      'progetti.item7.title': 'Project Work Simulation',
      'progetti.item7.desc': 'Work project simulation with interactive interface, asset management and responsive layout. Built with HTML, CSS and JavaScript.',

      'progetti.item8.title': 'CinemaHub',
      'progetti.item8.desc': 'Cinema platform with TMDB movie catalog, seat booking with seat selection, animated carousel and dark/gold design. Angular PWA with REST APIs and Vercel deployment.',

      'progetti.item9.title': 'F1 Dashboard',
      'progetti.item9.desc': 'Interactive Formula 1 dashboard built with Angular. Data visualization, driver statistics and team stats with TypeScript.',

      'progetti.item10.title': 'Gym App',
      'progetti.item10.desc': 'Angular application for managing workout plans and exercises. Modern interface with reusable components and responsive design.',

      'progetti.item11.title': 'PokeZone',
      'progetti.item11.desc': 'Angular application for exploring Pokemon data using PokéAPI. Dashboard with ApexCharts graphs, advanced filters and glassmorphism design. Team project.',

      'progetti.item12.title': 'TaskFlow',
      'progetti.item12.desc': 'Full-stack task management platform with Angular 20 frontend and Quarkus/Java backend. JWT authentication, project management, collaborators and notifications.',

      'progetti.item13.title': 'Mona S.P.A. Project Work',
      'progetti.item13.desc': 'School project work full-stack with Quarkus/Java backend and Next.js/TypeScript frontend. Business application with charts and data management.',

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
      'competenze.concept.cybersecurity': 'Applied Cybersecurity',
      'competenze.concept.ai': 'Prompt Engineering & AI',

      'competenze.soft': 'Soft Skills',
      'competenze.cat.frontend': 'Frontend & Web',
      'competenze.cat.backend': 'Languages & Backend',
      'competenze.cat.database': 'Database',
      'competenze.cat.tools': 'DevOps, Tools & Methodologies',
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
      'lingue.en.level': 'Level B2 – Technical',
      'lingue.en.desc': 'Autonomy in technical documentation, reading specifications, and writing code.',

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
