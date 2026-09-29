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

      'meta.home.title': 'Home',
      'meta.home.desc': 'Portfolio di Luca Ferro, Web Developer specializzato in Angular, TypeScript, Blazor, C# e .NET. Scopri i miei progetti, competenze ed esperienze.',
      'meta.formazione.title': 'Formazione e Competenze',
      'meta.formazione.desc': 'Competenze tecniche, certificazioni e percorso di studi: Angular, TypeScript, Blazor, C#, .NET, Java, PHP e Anthropic Claude AI.',
      'meta.esperienze.title': 'Esperienze',
      'meta.esperienze.desc': 'Le mie esperienze lavorative come Web Developer presso FM Group, Link IT Europe e Camera di Commercio di Varese.',
      'meta.progetti.title': 'Progetti',
      'meta.progetti.desc': 'I miei progetti di sviluppo web: siti aziendali in Angular, piattaforme B2B in Blazor/.NET, UI Component Library accessibili e applicazioni full-stack.',
      'meta.contatti.title': 'Contatti',
      'meta.contatti.desc': 'Contatta Luca Ferro per collaborazioni, progetti o opportunità lavorative come Web Developer.',
      'meta.notfound.title': 'Pagina non trovata',
      'meta.notfound.desc': 'La pagina che stai cercando non esiste o è stata spostata.',

      'formazione.title': 'Formazione e Competenze',
      'formazione.education': 'Formazione',
      'formazione.certifications': 'Certificazioni',

      'home.subtitle': "Hello World, I'm",
      'home.description': 'Benvenuto nel mio sito personale.',
      'home.bio': 'Web Developer con formazione ITS specializzato nello sviluppo frontend e architetture web moderne. Sviluppo applicazioni web e siti vetrina ad alte prestazioni con Angular e TypeScript, contribuendo parallelamente all\'evoluzione di piattaforme B2B basate su Blazor, C# e .NET, con forte sensibilità per UI/UX, responsive design e accessibilità.',

      'home.tech_stack': 'Tech Stack',
      'home.cta': 'Scopri i miei progetti →',

      'studi.title': 'Studi',
      'studi.item1.title': 'ITS Incom — Web Developer',
      'studi.item1.subtitle': 'Fondazione ITS Incom, Busto Arsizio (VA)',
      'studi.item1.date': 'Ott 2024 — Giu 2026',
      'studi.item1.desc': 'Percorso biennale di alta formazione per lo sviluppo software e web. Il piano di studi ha coperto l\'intero ciclo di vita del software: progettazione UX e interfacce front-end (HTML5, CSS3, JS), programmazione back-end (Java, Python), gestione database (MySQL) e applicazione di metodologie DevOps e Project Management.',
      'studi.item2.title': 'Diploma in Manutenzione e Assistenza Tecnica',
      'studi.item2.subtitle': 'ISIS "Isaac Newton", Varese',
      'studi.item2.date': 'Set 2017 — Lug 2022',
      'studi.item2.desc': 'Approfondimento in Apparati, Impianti e Servizi Tecnici Industriali.',
      'studi.view_doc': 'Visualizza documento →',

      'esperienze.title': 'Esperienze',
      'esperienze.item1.title': 'Web Developer',
      'esperienze.item1.subtitle': 'FM Group S.r.l.',
      'esperienze.item1.date': 'Ago 2026 — Presente',
      'esperienze.item1.desc': 'Sviluppo e manutenzione del frontend di siti web aziendali e portali B2B. Implementazione di interfacce web modulari e responsive mediante Angular, TypeScript, HTML e CSS, integrate con backend PHP. Sviluppo e implementazione di nuove funzionalità per la piattaforma B2B con architettura Blazor, C# e .NET, progettando interfacce utente coerenti con standard elevati di usabilità e performance.',
      'esperienze.item2.title': 'Stagista Web Developer',
      'esperienze.item2.subtitle': 'FM Group S.r.l.',
      'esperienze.item2.date': 'Gen 2026 — Mag 2026',
      'esperienze.item2.desc': 'Sviluppo in autonomia del frontend di un sito vetrina in Angular: dall\'analisi e prototipazione su Figma alla realizzazione di layout responsive, gestione multilingua, form validation in PHP e correzione bug. Sviluppo della piattaforma B2B in Blazor: creazione di componenti riutilizzabili, gestione UI/UX, modali, sistema di notifiche e ottimizzazione dell\'interazione utente. Attività trasversali di refactoring del codice, miglioramento dell\'accessibilità e ottimizzazione della navigazione.',
      'esperienze.item3.title': 'Stagista Web Developer',
      'esperienze.item3.subtitle': 'Link IT Europe S.r.l.',
      'esperienze.item3.date': 'Giu 2025 — Lug 2025',
      'esperienze.item3.desc': 'Sviluppo di una UI Component Library in stile Claymorphism incentrata su accessibilità, semantica HTML e modularità. Implementazione di componenti UI (Alert, Toast, Accordion, Tabs) in HTML5 e CSS3 puro, garantendo il pieno funzionamento e accessibilità anche con JavaScript disabilitato. Cura dell\'usabilità tramite gestione dettagliata di stati attivi e focus con outline a contrasto elevato.',
      'esperienze.item4.title': 'Servizio Civile Universale',
      'esperienze.item4.subtitle': 'Camera di Commercio, Varese',
      'esperienze.item4.date': 'Mag 2023 — Mag 2024',
      'esperienze.item4.desc': 'Progetto "Educazione al turismo sostenibile e sociale": supporto operativo alle attività promozionali, gestione della documentazione e relazioni con l\'utenza.',

      'progetti.title': 'Progetti',
      'progetti.filter.all': 'Tutti',
      'progetti.filter.angular': 'Angular',
      'progetti.filter.blazor': 'Blazor / .NET',
      'progetti.filter.fullstack': 'Java / Full-Stack',
      'progetti.filter.vanilla': 'HTML / CSS / JS',
      'progetti.item1.title': 'Siti Vetrina Aziendali Angular',
      'progetti.item1.desc': 'Sviluppo e manutenzione in autonomia del frontend di siti vetrina aziendali in Angular e TypeScript: dall\'analisi e prototipazione su Figma alla realizzazione di layout responsive, gestione multilingua e form validation in PHP.',
      'progetti.item2.title': 'Piattaforma B2B Blazor',
      'progetti.item2.desc': 'Sviluppo di nuove funzionalità per la piattaforma B2B aziendale con architettura Blazor, C# e .NET: creazione di componenti riutilizzabili, gestione UI/UX, modali, sistema di notifiche e ottimizzazione dell\'interazione utente.',
      'progetti.item3.title': 'UI Component Library',
      'progetti.item3.desc': 'Libreria di componenti UI in stile Claymorphism (Alert, Toast, Accordion, Tabs) realizzata in HTML5 e CSS3 puro, garantendo pieno funzionamento e accessibilità anche con JavaScript disabilitato e focus ad alto contrasto.',
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
      'progetti.item6.desc': 'Applicazione per la gestione di stand-up meeting con dashboard, storico e tracciamento attività. Interfaccia reattiva con JavaScript vanilla.',

      'progetti.item7.title': 'Simulazione Project Work',
      'progetti.item7.desc': 'Simulazione di progetto lavorativo con interfaccia interattiva, gestione asset e layout responsive. Sviluppato con HTML, CSS e JavaScript.',

      'progetti.item8.title': 'CinemaHub',
      'progetti.item8.desc': 'Piattaforma cinematografica con catalogo film TMDB, prenotazione posti con selezione sedili, carosello animato e design dark/gold. PWA Angular con API REST e deploy Vercel.',

      'progetti.item9.title': 'Dashboard F1',
      'progetti.item9.desc': 'Dashboard interattiva sulla Formula 1 sviluppata con Angular. Visualizzazione dati, statistiche piloti e statistiche scuderie con TypeScript.',

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
      'certificazioni.view_cert': 'Visualizza attestato →',
      'certificazioni.show_all': 'Mostra tutte le 21 certificazioni ↓',
      'certificazioni.show_less': 'Mostra solo le 6 principali ↑',
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
      'certificazioni.item4.date': '2026',
      'certificazioni.item4.desc': 'Certificazioni tecniche su Building with the Claude API, Model Context Protocol (MCP) Advanced Topics, Claude Code in Action, Claude in Amazon Bedrock (AWS), Claude on Google Cloud (GCP) e Introduction to Subagents (21 corsi ufficiali completati).',

      'competenze.title': 'Competenze',
      'competenze.technical': 'Competenze Tecniche',
      'competenze.concepts': 'Tecnologie e Concetti',
      'competenze.concept.responsive': 'Responsive Design',
      'competenze.concept.design_system': 'UI/UX Design System',
      'competenze.concept.a11y': 'Accessibilità (a11y)',
      'competenze.concept.state': 'Gestione Stato',
      'competenze.concept.rest': 'API REST',
      'competenze.concept.validation': 'Form Validation',
      'competenze.concept.refactoring': 'Refactoring',
      'competenze.soft': 'Competenze Trasversali',
      'competenze.cat.frontend': 'Frontend & Framework',
      'competenze.cat.backend': 'Backend',
      'competenze.cat.database': 'Database',
      'competenze.cat.tools': 'Strumenti',
      'competenze.teamwork': 'Lavoro in team',
      'competenze.communication': 'Comunicazione efficace',
      'competenze.organization': 'Organizzazione del lavoro',
      'competenze.problemsolving': 'Problem solving',
      'competenze.adaptability': 'Adattabilità',
      'competenze.selflearning': 'Auto-apprendimento',
      'competenze.proactivity': 'Proattività',
      'competenze.empathy': 'Empatia',

      'home.see_education': 'Vedi la formazione completa →',
      'home.view_all_skills': 'Vedi tutte le competenze →',
      'app.skip_link': 'Vai al contenuto principale',

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
      'contatti.form.error.email': 'Inserisci un indirizzo email valido.',
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

      'meta.home.title': 'Home',
      'meta.home.desc': 'Portfolio of Luca Ferro, Web Developer specialized in Angular, TypeScript, Blazor, C# and .NET. Discover my projects, skills and experience.',
      'meta.formazione.title': 'Education & Skills',
      'meta.formazione.desc': 'Technical skills, certifications and education: Angular, TypeScript, Blazor, C#, .NET, Java, PHP and Anthropic Claude AI.',
      'meta.esperienze.title': 'Experience',
      'meta.esperienze.desc': 'My professional experience as a Web Developer at FM Group, Link IT Europe and Chamber of Commerce of Varese.',
      'meta.progetti.title': 'Projects',
      'meta.progetti.desc': 'My web development projects: Angular corporate websites, Blazor/.NET B2B platforms, accessible UI Component Libraries and full-stack applications.',
      'meta.contatti.title': 'Contact',
      'meta.contatti.desc': 'Contact Luca Ferro for collaborations, projects or Web Developer job opportunities.',
      'meta.notfound.title': 'Page Not Found',
      'meta.notfound.desc': 'The page you are looking for does not exist or has been moved.',

      'formazione.title': 'Education & Skills',
      'formazione.education': 'Education',
      'formazione.certifications': 'Certifications',

      'home.subtitle': "Hello World, I'm",
      'home.description': 'Welcome to my personal website.',
      'home.bio': 'ITS-trained Web Developer specialized in frontend development and modern web architectures. I build high-performance web applications and showcase websites with Angular and TypeScript, while contributing to B2B platforms built with Blazor, C# and .NET, with a strong focus on UI/UX, responsive design and accessibility.',
      'home.tech_stack': 'Tech Stack',
      'home.cta': 'Discover my projects →',

      'studi.title': 'Education',
      'studi.item1.title': 'ITS Incom — Web Developer',
      'studi.item1.subtitle': 'Fondazione ITS Incom, Busto Arsizio (VA)',
      'studi.item1.date': 'Oct 2024 — Jun 2026',
      'studi.item1.desc': 'Two-year advanced training program in software and web development. The curriculum covered the entire software lifecycle: UX design and front-end interfaces (HTML5, CSS3, JS), back-end programming (Java, Python), database management (MySQL), and DevOps and Project Management methodologies.',
      'studi.item2.title': 'Diploma in Maintenance and Technical Assistance',
      'studi.item2.subtitle': 'ISIS "Isaac Newton", Varese',
      'studi.item2.date': 'Sep 2017 — Jul 2022',
      'studi.item2.desc': 'Focus on Industrial Technical Systems, Equipment and Services.',
      'studi.view_doc': 'View document →',

      'esperienze.title': 'Experience',
      'esperienze.item1.title': 'Web Developer',
      'esperienze.item1.subtitle': 'FM Group S.r.l.',
      'esperienze.item1.date': 'Aug 2026 — Present',
      'esperienze.item1.desc': 'Frontend development and maintenance of corporate websites and B2B portals. Implementation of modular, responsive web interfaces using Angular, TypeScript, HTML and CSS integrated with PHP backends. Development of new features for the B2B platform built with Blazor, C# and .NET, designing consistent user interfaces with high usability and performance standards.',
      'esperienze.item2.title': 'Web Developer Intern',
      'esperienze.item2.subtitle': 'FM Group S.r.l.',
      'esperienze.item2.date': 'Jan 2026 — May 2026',
      'esperienze.item2.desc': 'Autonomous frontend development of an Angular showcase website: from Figma analysis and prototyping to responsive layouts, multilingual support, PHP form validation and bug fixing. B2B platform development in Blazor: creation of reusable components, UI/UX management, modals, notification system and user interaction optimization. Cross-cutting code refactoring, accessibility improvements and navigation optimization.',
      'esperienze.item3.title': 'Web Developer Intern',
      'esperienze.item3.subtitle': 'Link IT Europe S.r.l.',
      'esperienze.item3.date': 'Jun 2025 — Jul 2025',
      'esperienze.item3.desc': 'Development of a Claymorphism-style UI Component Library focused on accessibility, HTML semantics and modularity. Implementation of UI components (Alert, Toast, Accordion, Tabs) in pure HTML5 and CSS3, ensuring full functionality and accessibility even with JavaScript disabled. Enhanced usability through detailed active states and high-contrast focus outlines.',
      'esperienze.item4.title': 'Universal Civil Service',
      'esperienze.item4.subtitle': 'Chamber of Commerce, Varese',
      'esperienze.item4.date': 'May 2023 — May 2024',
      'esperienze.item4.desc': 'Project "Education for sustainable and social tourism": operational support for promotional activities, documentation management and user relations.',

      'progetti.title': 'Projects',
      'progetti.filter.all': 'All',
      'progetti.filter.angular': 'Angular',
      'progetti.filter.blazor': 'Blazor / .NET',
      'progetti.filter.fullstack': 'Java / Full-Stack',
      'progetti.filter.vanilla': 'HTML / CSS / JS',
      'progetti.item1.title': 'Corporate Angular Showcase Websites',
      'progetti.item1.desc': 'Autonomous frontend development and maintenance of corporate showcase websites in Angular and TypeScript: from Figma analysis and prototyping to responsive layouts, multilingual support and PHP form validation.',
      'progetti.item2.title': 'B2B Blazor Platform',
      'progetti.item2.desc': 'Development of new features for the corporate B2B platform built with Blazor, C# and .NET: creation of reusable components, UI/UX management, modals, notification system and user interaction optimization.',
      'progetti.item3.title': 'UI Component Library',
      'progetti.item3.desc': 'Claymorphism-style UI Component Library (Alert, Toast, Accordion, Tabs) built in pure HTML5 and CSS3, ensuring full functionality and accessibility even with JavaScript disabled and high-contrast focus outlines.',
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
      'certificazioni.item4.date': '2026',
      'certificazioni.item4.desc': 'Technical certifications in Building with the Claude API, Model Context Protocol (MCP) Advanced Topics, Claude Code in Action, Claude in Amazon Bedrock (AWS), Claude on Google Cloud (GCP) and Introduction to Subagents (21 official courses completed).',

      'competenze.title': 'Skills',
      'competenze.technical': 'Technical Skills',
      'competenze.concepts': 'Technologies & Concepts',
      'competenze.concept.responsive': 'Responsive Design',
      'competenze.concept.design_system': 'UI/UX Design System',
      'competenze.concept.a11y': 'Accessibility (a11y)',
      'competenze.concept.state': 'State Management',
      'competenze.concept.rest': 'REST APIs',
      'competenze.concept.validation': 'Form Validation',
      'competenze.concept.refactoring': 'Refactoring',
      'competenze.soft': 'Soft Skills',
      'competenze.cat.frontend': 'Frontend & Frameworks',
      'competenze.cat.backend': 'Backend',
      'competenze.cat.database': 'Database',
      'competenze.cat.tools': 'Tools',
      'competenze.teamwork': 'Teamwork',
      'competenze.communication': 'Effective communication',
      'competenze.organization': 'Work organization',
      'competenze.problemsolving': 'Problem Solving',
      'competenze.adaptability': 'Adaptability',
      'competenze.selflearning': 'Self-learning',
      'competenze.proactivity': 'Proactivity',
      'competenze.empathy': 'Empathy',

      'home.see_education': 'See full education →',
      'home.view_all_skills': 'View all skills →',
      'app.skip_link': 'Skip to main content',

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
      'contatti.form.error.email': 'Please enter a valid email address.',
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
    document.documentElement.lang = lang;
  }

  t(key: string): string {
    return this.tr()[key] || key;
  }
}
