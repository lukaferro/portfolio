import { Injectable, signal, computed } from '@angular/core';

type Translations = Record<string, string>;

interface TranslationSet {
  [lang: string]: Translations;
  it: Translations;
  en: Translations;
}

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private readonly storageKey = 'portfolio-lang';

  readonly currentLang = signal<string>(
    (typeof localStorage !== 'undefined' ? localStorage.getItem(this.storageKey) : null) || 'it'
  );

  private readonly translations: TranslationSet = {
    it: {
      'nav.home': 'HOME',
      'nav.formazione': 'FORMAZIONE',
      'nav.esperienze': 'ESPERIENZE',
      'nav.progetti': 'PROGETTI',
      'nav.contatti': 'CONTATTI',
      'nav.cv': 'CV',

      'formazione.title': 'Formazione e Competenze',
      'formazione.education': 'Formazione',
      'formazione.certifications': 'Certificazioni',

'home.subtitle': "Hello World, I'm",
'home.description': 'Benvenuto nel mio sito personale.',
'home.bio': 'Sono uno sviluppatore front-end specializzato nella creazione di web app moderne, performanti e accessibili. Con una solida esperienza in Angular, React e Java, trasformo idee in esperienze digitali.',

      'home.tech_stack': 'Tech Stack',
'home.cta': 'Scopri i miei progetti →',

      'studi.title': 'Studi',
      'studi.item1.title': 'ITS Incom — Web Developer',
      'studi.item1.subtitle': 'Fondazione ITS Incom, Busto Arsizio (VA)',
      'studi.item1.date': 'Ott 2024 — Giu 2026',
      'studi.item1.desc': 'Percorso biennale di alta formazione per lo sviluppo software e web (esami conclusi, in attesa di valutazione finale). Il piano di studi ha coperto l\'intero ciclo di vita del software: progettazione UX e interfacce front-end (HTML5, CSS3, JS), programmazione back-end (Java, Python), gestione database (MySQL) e applicazione di metodologie DevOps e Project Management.',
      'studi.item2.title': 'Diploma in Manutenzione e Assistenza Tecnica',
      'studi.item2.subtitle': 'ISIS "Isaac Newton", Varese',
      'studi.item2.date': 'Set 2017 — Lug 2022',
      'studi.item2.desc': 'Approfondimento in Apparati, Impianti e Servizi Tecnici Industriali.',

      'esperienze.title': 'Esperienze',
      'esperienze.item1.title': 'Stage Web Developer',
      'esperienze.item1.subtitle': 'FM Group S.r.l.',
      'esperienze.item1.date': 'Gen 2026 — Mag 2026',
      'esperienze.item1.desc': 'Sviluppo di un sito vetrina in Angular (autonomo) e una piattaforma B2B in Blazor (in team). Analisi, progettazione Figma, frontend, responsive, multilingua, form contatti PHP, componenti riutilizzabili, UI/UX, validazione form, localizzazione.',
      'esperienze.item2.title': 'Stage Web Developer',
      'esperienze.item2.subtitle': 'Link IT Europe S.r.l.',
      'esperienze.item2.date': 'Giu 2025 — Lug 2025',
      'esperienze.item2.desc': 'Sviluppo di una UI Component Library in stile Claymorphism, con focus su accessibilità, semantica HTML e componenti riutilizzabili (Alert, Toast, Accordion, Tabs).',
      'esperienze.item3.title': 'Servizio Civile Universale',
      'esperienze.item3.subtitle': 'Camera di Commercio, Varese',
      'esperienze.item3.date': 'Mag 2023 — Mag 2024',
      'esperienze.item3.desc': 'Progetto "La promozione del territorio - Educazione al turismo sostenibile e sociale". Supporto alle attività promozionali e relazionali dell\'ente.',
      'esperienze.item4.title': 'Stagista Elettricista',
      'esperienze.item4.subtitle': 'Pintaudi, Varese',
      'esperienze.item4.date': 'Giu 2021',
      'esperienze.item4.desc': 'Installazione e manutenzione di impianti elettrici civili: collegamento prese, condizionatori, lampade e faretti.',

      'progetti.title': 'Progetti',
      'progetti.item1.title': 'Sito Vetrina Angular',
      'progetti.item1.desc': 'Sito vetrina sviluppato autonomamente durante lo stage in Angular. Sito multilingua con form contatti PHP, componenti riutilizzabili e design responsive.',
      'progetti.item2.title': 'Piattaforma B2B Blazor',
      'progetti.item2.desc': 'Piattaforma B2B sviluppata in team con Blazor. Analisi, progettazione UI/UX in Figma, sviluppo frontend e back-end, localizzazione e validazione form.',
      'progetti.item3.title': 'UI Component Library',
      'progetti.item3.desc': 'Libreria di componenti UI in stile Claymorphism. Componenti accessibili e riutilizzabili: Alert, Toast, Accordion, Tabs con semantica HTML.',
      'progetti.item4.title': 'Portfolio Personale',
      'progetti.item4.desc': 'Portfolio personale sviluppato con Angular 22, design dark/orange, animazioni particellari, form contatti serverless e view transitions.',
      'progetti.link.github': 'GitHub',
      'progetti.link.github_fe': 'GitHub FE',
      'progetti.link.github_be': 'GitHub BE',
      'progetti.link.demo': 'Live Demo →',
      'progetti.badge.private': 'Privato',

      'progetti.item5.title': 'Sito Ristorante',
      'progetti.item5.desc': 'Sito vetrina per ristorante realizzato con HTML, CSS e JavaScript. Layout responsive con design pulito e navigazione fluida.',

      'progetti.item6.title': 'Stand-Up Meeting App',
      'progetti.item6.desc': 'Applicazione per la gestione di stand-up meeting con dashboard, storico e tracciamento attivita. Interfaccia reattiva con JavaScript vanilla.',

      'progetti.item7.title': 'Simulazione Projet Work',
      'progetti.item7.desc': 'Simulazione di progetto lavorativo con interfaccia interattiva, gestione asset e layout responsive. Sviluppato con HTML, CSS e JavaScript.',

      'progetti.item9.title': 'Dashboard F1',
      'progetti.item9.desc': 'Dashboard interattiva sulla Formula 1 sviluppata con Angular. Visualizzazione dati, statistiche piloti e statistiche团队 con TypeScript.',

      'progetti.item10.title': 'App Gym',
      'progetti.item10.desc': 'Applicazione Angular per la gestione di schede di allenamento e esercizi. Interface moderna con componenti riutilizzabili e design responsive.',

      'progetti.item11.title': 'PokeZone',
      'progetti.item11.desc': 'Applicazione Angular per l\'esplorazione dei dati Pokemon utilizzando PokéAPI. Dashboard con grafici ApexCharts, filtri avanzati e design glassmorphism. Progetto team.',

      'progetti.item12.title': 'TaskFlow',
      'progetti.item12.desc': 'Piattaforma di gestione task full-stack con frontend Angular 20 e backend Quarkus/Java. Autenticazione JWT, gestione progetti, collaboratori e notifiche.',

      'progetti.item13.title': 'Project Work Mona S.P.A.',
      'progetti.item13.desc': 'Project work scolastico full-stack con backend Quarkus/Java e frontend Next.js/TypeScript. Applicazione aziendale con grafici e gestione dati.',

      'certificazioni.title': 'Certificazioni',
      'certificazioni.empty': 'Nessuna certificazione ancora.',
      'certificazioni.item1.title': 'ITS Web Developer',
      'certificazioni.item1.issuer': 'ITS Incom Academy',
      'certificazioni.item1.date': '2026',
      'certificazioni.item1.desc': 'Attestato sostitutivo del corso biennale ITS Web Developer (ID 48332), 2000 ore, sessione giugno 2026 con esito idoneo e votazione 91/110.',

      'certificazioni.item2.title': 'Servizio Civile Universale',
      'certificazioni.item2.issuer': 'Presidenza del Consiglio dei Ministri',
      'certificazioni.item2.date': 'Mag 2023 — Mag 2024',
      'certificazioni.item2.desc': 'Progetto "La promozione del territorio - educazione al turismo sostenibile e sociale" presso Associazione Mosaico, Varese.',

      'certificazioni.item3.title': 'Addetto all\'Informazione',
      'certificazioni.item3.issuer': 'CE.SVI.P. Lombardia',
      'certificazioni.item3.date': '2024',
      'certificazioni.item3.desc': 'Corso di 30 ore su comunicazione pubblica, privacy, accessibilità e usabilità web. Regione Lombardia.',

      'certificazioni.item4.title': 'Certificazioni Anthropic (Claude AI)',
      'certificazioni.item4.issuer': 'Anthropic',
      'certificazioni.item4.date': '2025 — 2026',
      'certificazioni.item4.desc': 'Completamento di 11 corsi ufficiali Anthropic su Claude, AI Fluency e Model Context Protocol.',

      'competenze.title': 'Competenze',
      'competenze.technical': 'Competenze Tecniche',
      'competenze.soft': 'Soft Skills',
      'competenze.cat.frontend': 'Frontend',
      'competenze.cat.backend': 'Backend',
      'competenze.cat.database': 'Database',
      'competenze.cat.tools': 'DevOps & Tools',
      'competenze.teamwork': 'Lavoro in team',
      'competenze.communication': 'Comunicazione',
      'competenze.organization': 'Organizzazione',
      'competenze.problemsolving': 'Problem solving',
      'competenze.adaptability': 'Adattabilità',
      'competenze.selflearning': 'Auto-apprendimento',
      'competenze.proactivity': 'Proattività',
      'competenze.empathy': 'Empatia',

      'home.see_education': 'Vedi la formazione completa →',
      'home.view_all_skills': 'Vedi tutte le competenze →',

      'contatti.title': 'Contatti',
      'contatti.email': 'Email',
      'contatti.phone': 'Telefono',
      'contatti.location': 'Ubicazione',
      'contatti.location.value': 'Varese, Italia',
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
      'contatti.form.error.generic': 'Errore nell\'invio del messaggio.',
      'contatti.form.error.connection': 'Errore di connessione. Riprova più tardi.',

      'notfound.title': 'Pagina non trovata',
      'notfound.desc': 'La pagina che stai cercando non esiste o è stata spostata.',
      'notfound.back': 'Torna alla Home',
    },
    en: {
      'nav.home': 'HOME',
      'nav.formazione': 'EDUCATION',
      'nav.esperienze': 'EXPERIENCE',
      'nav.progetti': 'PROJECTS',
      'nav.contatti': 'CONTACT',
      'nav.cv': 'CV',

      'formazione.title': 'Education & Skills',
      'formazione.education': 'Education',
      'formazione.certifications': 'Certifications',

      'home.subtitle': "Hello World, I'm",
      'home.description': 'Welcome to my personal website.',
      'home.bio': 'I\'m a front-end developer specialized in building modern, performant and accessible web applications. With solid experience in Angular, React and Java, I turn ideas into digital experiences.',
      'home.tech_stack': 'Tech Stack',
      'home.cta': 'Discover my projects →',

      'studi.title': 'Education',
      'studi.item1.title': 'ITS Incom — Web Developer',
      'studi.item1.subtitle': 'Fondazione ITS Incom, Busto Arsizio (VA)',
      'studi.item1.date': 'Oct 2024 — Jun 2026',
      'studi.item1.desc': 'Two-year advanced training program in software and web development (exams completed, awaiting final evaluation). The curriculum covered the entire software lifecycle: UX design and front-end interfaces (HTML5, CSS3, JS), back-end programming (Java, Python), database management (MySQL), and DevOps and Project Management methodologies.',
      'studi.item2.title': 'Diploma in Maintenance and Technical Assistance',
      'studi.item2.subtitle': 'ISIS "Isaac Newton", Varese',
      'studi.item2.date': 'Sep 2017 — Jul 2022',
      'studi.item2.desc': 'Focus on Industrial Technical Systems, Equipment and Services.',

      'esperienze.title': 'Experience',
      'esperienze.item1.title': 'Web Developer Intern',
      'esperienze.item1.subtitle': 'FM Group S.r.l.',
      'esperienze.item1.date': 'Jan 2026 — May 2026',
      'esperienze.item1.desc': 'Developed a showcase website in Angular (solo) and a B2B platform in Blazor (team). Analysis, Figma design, frontend, responsive, multilingual, PHP contact form, reusable components, UI/UX, form validation, localization.',
      'esperienze.item2.title': 'Web Developer Intern',
      'esperienze.item2.subtitle': 'Link IT Europe S.r.l.',
      'esperienze.item2.date': 'Jun 2025 — Jul 2025',
      'esperienze.item2.desc': 'Developed a Claymorphism-style UI Component Library, focusing on accessibility, semantic HTML and reusable components (Alert, Toast, Accordion, Tabs).',
      'esperienze.item3.title': 'Universal Civil Service',
      'esperienze.item3.subtitle': 'Chamber of Commerce, Varese',
      'esperienze.item3.date': 'May 2023 — May 2024',
      'esperienze.item3.desc': 'Project "Territory promotion - Education for sustainable and social tourism". Support for promotional and relational activities.',
      'esperienze.item4.title': 'Electrician Intern',
      'esperienze.item4.subtitle': 'Pintaudi, Varese',
      'esperienze.item4.date': 'Jun 2021',
      'esperienze.item4.desc': 'Installation and maintenance of residential electrical systems: socket connections, air conditioners, lamps and spotlights.',

      'progetti.title': 'Projects',
      'progetti.item1.title': 'Angular Showcase Website',
      'progetti.item1.desc': 'Showcase website developed during my internship in Angular. Multilingual site with PHP contact form, reusable components and responsive design.',
      'progetti.item2.title': 'B2B Blazor Platform',
      'progetti.item2.desc': 'B2B platform developed in a team with Blazor. Analysis, UI/UX design in Figma, frontend and back-end development, localization and form validation.',
      'progetti.item3.title': 'UI Component Library',
      'progetti.item3.desc': 'Claymorphism-style UI Component Library. Accessible and reusable components: Alert, Toast, Accordion, Tabs with semantic HTML.',
      'progetti.item4.title': 'Personal Portfolio',
      'progetti.item4.desc': 'Personal portfolio built with Angular 22, dark/orange theme, particle animations, serverless contact form and view transitions.',
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
      'certificazioni.item1.title': 'ITS Web Developer',
      'certificazioni.item1.issuer': 'ITS Incom Academy',
      'certificazioni.item1.date': '2026',
      'certificazioni.item1.desc': 'Substitute attestation for the two-year ITS Web Developer course (ID 48332), 2000 hours, June 2026 session with pass result and 91/110 grade.',

      'certificazioni.item2.title': 'Universal Civil Service',
      'certificazioni.item2.issuer': 'Presidency of the Council of Ministers',
      'certificazioni.item2.date': 'May 2023 — May 2024',
      'certificazioni.item2.desc': 'Project "Territory promotion - Education for sustainable and social tourism" at Associazione Mosaico, Varese.',

      'certificazioni.item3.title': 'Information Officer',
      'certificazioni.item3.issuer': 'CE.SVI.P. Lombardia',
      'certificazioni.item3.date': '2024',
      'certificazioni.item3.desc': '30-hour course on public communication, privacy, web accessibility and usability. Regione Lombardia.',

      'certificazioni.item4.title': 'Anthropic Certifications (Claude AI)',
      'certificazioni.item4.issuer': 'Anthropic',
      'certificazioni.item4.date': '2025 — 2026',
      'certificazioni.item4.desc': 'Completion of 11 official Anthropic courses on Claude, AI Fluency and Model Context Protocol.',

      'competenze.title': 'Skills',
      'competenze.technical': 'Technical Skills',
      'competenze.soft': 'Soft Skills',
      'competenze.cat.frontend': 'Frontend',
      'competenze.cat.backend': 'Backend',
      'competenze.cat.database': 'Database',
      'competenze.cat.tools': 'DevOps & Tools',
      'competenze.teamwork': 'Teamwork',
      'competenze.communication': 'Communication',
      'competenze.organization': 'Organization',
      'competenze.problemsolving': 'Problem Solving',
      'competenze.adaptability': 'Adaptability',
      'competenze.selflearning': 'Self-learning',
      'competenze.proactivity': 'Proactivity',
      'competenze.empathy': 'Empathy',

      'home.see_education': 'See full education →',
      'home.view_all_skills': 'View all skills →',

      'contatti.title': 'Contact',
      'contatti.email': 'Email',
      'contatti.phone': 'Phone',
      'contatti.location': 'Location',
      'contatti.location.value': 'Varese, Italy',
      'contatti.form.title': 'Write me',
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
      'contatti.form.error.generic': 'Error sending message.',
      'contatti.form.error.connection': 'Connection error. Please try again later.',

      'notfound.title': 'Page Not Found',
      'notfound.desc': 'The page you are looking for does not exist or has been moved.',
      'notfound.back': 'Back to Home',
    }
  };

  readonly tr = computed(() => this.translations[this.currentLang()]);

  setLang(lang: string): void {
    this.currentLang.set(lang);
    localStorage.setItem(this.storageKey, lang);
  }

  t(key: string): string {
    return this.tr()[key] || key;
  }
}
