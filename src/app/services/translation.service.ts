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
      'meta.home.desc': 'Portfolio di Luca Ferro, Web Developer Frontend & UI con formazione ITS. Interfacce web con Angular, TypeScript e Blazor/.NET, integrazione API REST e accessibilità (WCAG 2.1).',
      'meta.formazione.title': 'Formazione e Competenze',
      'meta.formazione.desc': 'Competenze tecniche, certificazioni e formazione: Angular, TypeScript, Blazor (C#/.NET), HTML5 semantico, CSS3/SASS, API REST, accessibilità (WCAG 2.1) e Claude API.',
      'meta.esperienze.title': 'Esperienze',
      'meta.esperienze.desc': 'Esperienze professionali di Luca Ferro come Web Developer Frontend & UI presso FM Group, Link IT Europe e Camera di Commercio di Varese.',
      'meta.progetti.title': 'Progetti',
      'meta.progetti.desc': 'Progetti di sviluppo web: portale vetrina Aftersaleshub, piattaforma B2B EasyWebParts, UI Component Library accessibile in Vue.js e applicazioni web.',
      'meta.contatti.title': 'Contatti',
      'meta.contatti.desc': 'Contatta Luca Ferro per collaborazioni, progetti o opportunità lavorative come Web Developer Frontend & UI.',
      'meta.notfound.title': 'Pagina non trovata',
      'meta.notfound.desc': 'La pagina che stai cercando non esiste o è stata spostata.',

      'formazione.title': 'Formazione e Competenze',
      'formazione.education': 'Formazione',
      'formazione.certifications': 'Certificazioni',

      'home.subtitle': "Hello World, I'm",
      'home.description': 'Benvenuto nel mio sito personale.',
      'home.bio': 'Web Developer con Diploma ITS in Web Development (EQF 5), orientato allo sviluppo Frontend, alla UI e all\'integrazione applicativa. In FM Group S.r.l. sviluppo interfacce in Angular e Blazor (C#) collegate a servizi backend tramite API REST, all\'interno di un ecosistema web B2B. Ho basi solide di programmazione a oggetti e di sviluppo web (HTML5 semantico, CSS3/SASS, TypeScript) e curo performance, accessibilità e fedeltà ai prototipi Figma.',

      'home.tech_stack': 'Tech Stack',
      'home.cta': 'Scopri i miei progetti →',

      'studi.title': 'Studi',
      'studi.item1.title': 'Diploma di Tecnico Superiore in Web Development (ITS – EQF 5)',
      'studi.item1.subtitle': 'Fondazione ITS Incom, Busto Arsizio (VA)',
      'studi.item1.date': 'Ott 2024 — Giu 2026',
      'studi.item1.desc': 'Votazione finale: 91/110. Percorso biennale di 2.000 ore (formazione in aula e stage in azienda), centrato sul ciclo di vita del software. OOP (Java, Python), Frontend (JavaScript, TypeScript, Angular), Backend PHP, database relazionali (MySQL). Git/GitHub, basi di Docker, sicurezza del codice, metodologie UX/UI, prompt engineering.',
      'studi.item2.title': 'Diploma in Manutenzione e Assistenza Tecnica',
      'studi.item2.subtitle': 'ISIS "Isaac Newton", Varese',
      'studi.item2.date': 'Set 2017 — Lug 2022',
      'studi.item2.desc': 'Indirizzo: Apparati, impianti e servizi tecnici industriali. Competenze logico-meccaniche, diagnostica di sistemi complessi ed elettrotecnica.',
      'studi.view_doc': 'Visualizza documento →',

      'esperienze.title': 'Esperienze',
      'esperienze.item1.title': 'Web Developer',
      'esperienze.item1.subtitle': 'FM Group S.r.l., Gallarate',
      'esperienze.item1.date': 'Ago 2026 — Presente',
      'esperienze.item1.desc': 'Sviluppo ed evoluzione delle interfacce della piattaforma EasyWebParts e del portale Aftersaleshub (ecosistema web B2B). Blazor (C#): viste interattive, tabelle dinamiche, modali e componenti riutilizzabili per consultare cataloghi e documentazione ricambi. Angular & TypeScript: sviluppo e manutenzione del portale vetrina/onboarding, migliorando caricamento, percorsi utente e reattività. Integrazione API REST: consumo asincrono di endpoint .NET per i dati di catalogo e validazione dei form lato client. UI consistency & accessibilità: coerenza visiva, navigazione da tastiera e contrasti in linea con le linee guida WCAG 2.1 AA.',
      'esperienze.item2.title': 'Web Developer (Stage)',
      'esperienze.item2.subtitle': 'FM Group S.r.l., Gallarate',
      'esperienze.item2.date': 'Gen 2026 — Mag 2026',
      'esperienze.item2.desc': 'Sviluppo da zero del frontend in Angular del portale Aftersaleshub, dai mockup Figma a layout responsive predisposti per il multilingua (i18n). Gestione asincrona dei form di richiesta demo, con script PHP per l\'inoltro e le notifiche email. Supporto alla prototipazione di componenti UI in Blazor per EasyWebParts.',
      'esperienze.item3.title': 'Web Developer (Stage)',
      'esperienze.item3.subtitle': 'Link IT Europe S.r.l., Buguggiate',
      'esperienze.item3.date': 'Giu 2025 — Lug 2025',
      'esperienze.item3.desc': 'Progettazione e sviluppo di una UI component library modulare in Vue.js con oltre 15 componenti (Accordion, Modal, Tab, Toast, Alert), HTML5 semantico e CSS3/SASS in stile Claymorphism. Approccio progressive enhancement per garantire compatibilità cross-browser. Accessibilità: gestione del focus, contrasti a norma e navigazione completa da tastiera.',
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
      'progetti.item1.desc': 'Frontend del portale vetrina/onboarding Aftersaleshub sviluppato da zero in Angular e TypeScript: dai mockup Figma a layout responsive predisposti per il multilingua (i18n), form di richiesta demo gestiti in modo asincrono con script PHP per inoltro e notifiche email.',
      'progetti.item2.title': 'EasyWebParts — Piattaforma B2B Blazor',
      'progetti.item2.desc': 'Interfacce della piattaforma B2B EasyWebParts in Blazor (C#/.NET): viste interattive, tabelle dinamiche, modali e componenti riutilizzabili per consultare cataloghi e documentazione ricambi, alimentati da endpoint REST .NET con coerenza visiva e accessibilità WCAG 2.1 AA.',
      'progetti.item3.title': 'UI Component Library (Clay-Vue)',
      'progetti.item3.desc': 'UI component library modulare in Vue.js con oltre 15 componenti (Accordion, Modal, Tab, Toast, Alert), HTML5 semantico e CSS3/SASS in stile Claymorphism: progressive enhancement per la compatibilità cross-browser, gestione del focus, contrasti a norma e navigazione completa da tastiera.',
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
      'progetti.item12.desc': 'Piattaforma di gestione task con frontend Angular 20 e backend Quarkus/Java. Autenticazione JWT, gestione progetti, collaboratori e notifiche.',

      'progetti.item13.title': 'Project Work Mona S.P.A.',
      'progetti.item13.desc': 'Project work scolastico con backend Quarkus/Java e frontend Next.js/TypeScript. Applicazione aziendale con grafici e gestione dati.',

      'progetti.item14.title': 'Manga & Anime',
      'progetti.item14.desc': 'App Next.js/React per scoprire e tracciare anime e manga tramite l\'API GraphQL di AniList. Catalogo con filtri e scroll infinito, calendario delle uscite, lista personale con statistiche, login AniList o modalità ospite, tema chiaro/scuro.',

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
      'skill.react': 'React (in approfondimento)',
      'skill.csharp_blazor': 'C# / .NET (lato Blazor)',
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
      'lingue.en.desc': 'Lettura di documentazione tecnica e specifiche.',

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
      'meta.home.desc': 'Portfolio of Luca Ferro, Frontend & UI Web Developer with ITS education. Web interfaces with Angular, TypeScript and Blazor/.NET, REST API integration and accessibility (WCAG 2.1).',
      'meta.formazione.title': 'Education & Skills',
      'meta.formazione.desc': 'Technical skills, certifications and education: Angular, TypeScript, Blazor (C#/.NET), semantic HTML5, CSS3/SASS, REST APIs, accessibility (WCAG 2.1) and Claude API.',
      'meta.esperienze.title': 'Experience',
      'meta.esperienze.desc': 'Professional experience of Luca Ferro as a Frontend & UI Web Developer at FM Group, Link IT Europe and Chamber of Commerce of Varese.',
      'meta.progetti.title': 'Projects',
      'meta.progetti.desc': 'Web development projects: Aftersaleshub showcase portal, EasyWebParts B2B platform, accessible Vue.js UI Component Library and web applications.',
      'meta.contatti.title': 'Contact',
      'meta.contatti.desc': 'Contact Luca Ferro for collaborations, projects or Frontend & UI Web Developer opportunities.',
      'meta.notfound.title': 'Page Not Found',
      'meta.notfound.desc': 'The page you are looking for does not exist or has been moved.',

      'formazione.title': 'Education & Skills',
      'formazione.education': 'Education',
      'formazione.certifications': 'Certifications',

      'home.subtitle': "Hello World, I'm",
      'home.description': 'Welcome to my personal website.',
      'home.bio': 'Web Developer with an ITS Diploma in Web Development (EQF 5), focused on Frontend development, UI and application integration. At FM Group S.r.l. I build interfaces in Angular and Blazor (C#) connected to backend services through REST APIs, within a B2B web ecosystem. I have a solid grounding in object-oriented programming and web development (semantic HTML5, CSS3/SASS, TypeScript) and I care about performance, accessibility and fidelity to Figma prototypes.',

      'home.tech_stack': 'Tech Stack',
      'home.cta': 'Discover my projects →',

      'studi.title': 'Education',
      'studi.item1.title': 'Higher Technical Diploma in Web Development (ITS – EQF 5)',
      'studi.item1.subtitle': 'Fondazione ITS Incom, Busto Arsizio (VA)',
      'studi.item1.date': 'Oct 2024 — Jun 2026',
      'studi.item1.desc': 'Final grade: 91/110. Two-year, 2,000-hour program (classroom training and company internships) focused on the software lifecycle. OOP (Java, Python), Frontend (JavaScript, TypeScript, Angular), PHP backend, relational databases (MySQL). Git/GitHub, Docker basics, code security, UX/UI methodologies, prompt engineering.',
      'studi.item2.title': 'Diploma in Maintenance and Technical Assistance',
      'studi.item2.subtitle': 'ISIS "Isaac Newton", Varese',
      'studi.item2.date': 'Sep 2017 — Jul 2022',
      'studi.item2.desc': 'Specialization: Industrial technical systems, equipment, and services. Logical-mechanical problem-solving, diagnostics of complex systems, and electrotechnics.',
      'studi.view_doc': 'View document →',

      'esperienze.title': 'Experience',
      'esperienze.item1.title': 'Web Developer',
      'esperienze.item1.subtitle': 'FM Group S.r.l., Gallarate',
      'esperienze.item1.date': 'Aug 2026 — Present',
      'esperienze.item1.desc': 'Development and evolution of the interfaces of the EasyWebParts platform and the Aftersaleshub portal (B2B web ecosystem). Blazor (C#): interactive views, dynamic tables, modals and reusable components for browsing spare parts catalogs and documentation. Angular & TypeScript: development and maintenance of the showcase/onboarding portal, improving load times, user flows and responsiveness. REST API integration: asynchronous consumption of .NET endpoints for catalog data and client-side form validation. UI consistency & accessibility: visual consistency, keyboard navigation and contrast in line with WCAG 2.1 AA guidelines.',
      'esperienze.item2.title': 'Web Developer (Internship)',
      'esperienze.item2.subtitle': 'FM Group S.r.l., Gallarate',
      'esperienze.item2.date': 'Jan 2026 — May 2026',
      'esperienze.item2.desc': 'Built the Angular frontend of the Aftersaleshub portal from scratch, from Figma mockups to responsive layouts ready for multilingual support (i18n). Asynchronous handling of demo request forms, with PHP scripts for forwarding and email notifications. Support in prototyping Blazor UI components for EasyWebParts.',
      'esperienze.item3.title': 'Web Developer (Internship)',
      'esperienze.item3.subtitle': 'Link IT Europe S.r.l., Buguggiate',
      'esperienze.item3.date': 'Jun 2025 — Jul 2025',
      'esperienze.item3.desc': 'Design and development of a modular Vue.js UI component library with over 15 components (Accordion, Modal, Tab, Toast, Alert), semantic HTML5 and CSS3/SASS in Claymorphism style. Progressive enhancement approach to ensure cross-browser compatibility. Accessibility: focus management, compliant contrast and full keyboard navigation.',
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
      'progetti.item1.desc': 'Frontend of the Aftersaleshub showcase/onboarding portal built from scratch in Angular and TypeScript: from Figma mockups to responsive layouts ready for multilingual support (i18n), with demo request forms handled asynchronously through PHP scripts for forwarding and email notifications.',
      'progetti.item2.title': 'EasyWebParts — Blazor B2B Platform',
      'progetti.item2.desc': 'Interfaces of the EasyWebParts B2B platform in Blazor (C#/.NET): interactive views, dynamic tables, modals and reusable components for browsing spare parts catalogs and documentation, fed by .NET REST endpoints with visual consistency and WCAG 2.1 AA accessibility.',
      'progetti.item3.title': 'UI Component Library (Clay-Vue)',
      'progetti.item3.desc': 'Modular Vue.js UI component library with 15+ components (Accordion, Modal, Tab, Toast, Alert), semantic HTML5 and CSS3/SASS in Claymorphism style: progressive enhancement for cross-browser compatibility, focus management, compliant contrast and full keyboard navigation.',
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
      'progetti.item12.desc': 'Task management platform with Angular 20 frontend and Quarkus/Java backend. JWT authentication, project management, collaborators and notifications.',

      'progetti.item13.title': 'Mona S.P.A. Project Work',
      'progetti.item13.desc': 'School project work with Quarkus/Java backend and Next.js/TypeScript frontend. Business application with charts and data management.',

      'progetti.item14.title': 'Manga & Anime',
      'progetti.item14.desc': 'Next.js/React app to discover and track anime and manga via the AniList GraphQL API. Catalog with filters and infinite scroll, airing schedule, personal list with stats, AniList login or guest mode, light/dark theme.',

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
      'skill.react': 'React (currently learning)',
      'skill.csharp_blazor': 'C# / .NET (Blazor side)',
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
      'lingue.en.desc': 'Reading technical documentation and specifications.',

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
