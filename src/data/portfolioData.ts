import { Project, Door, TimelineMilestone, SkillCategory } from '../types';

export const PERSONAL_INFO = {
  name: 'REKAPALLI SRI CHARAN',
  displayName: 'Sri Charan',
  initials: 'SC',
  tagline: 'Aspiring Software Developer & Technology Enthusiast',
  bio: 'Computer Science and Engineering undergraduate at Loyola Academy, passionate about building robust full-stack platforms, explainable AI systems, and human-centric software. Finalist in Smart India Hackathon 2026 (Explainable Credit Ledger) and certified in Python via Cisco & TASK.',
  education: 'Loyola Academy Degree & PG College, Secunderabad',
  degree: 'B.Sc Computer Science & Engineering (Semester V / Third Year)',
  email: 'workofcharan@gmail.com',
  github: 'https://github.com/workofcharan',
  linkedin: 'https://linkedin.com/in/workofcharan',
  location: 'Secunderabad / Hyderabad, India',
  status: 'Open to Software Engineering Roles & Internships',
  roles: [
    'Full-Stack Developer',
    'AI & ML Systems Builder',
    'FinTech & Explainable AI Engineer',
    'Modern Web Architect'
  ]
};

export const DOORS: Door[] = [
  {
    id: 'fullstack',
    nameplate: 'FULL STACK WEB',
    title: 'Full-Stack Web & Platforms',
    subtitle: 'From pixel-perfect editorial UX to production-grade web applications.',
    doorColor: 'from-zinc-800 via-neutral-900 to-black',
    doorBorderColor: 'border-zinc-600',
    glowColor: 'rgba(255, 255, 255, 0.45)',
    tag: 'PRODUCTION WEB ENGINES',
    icon: 'Globe',
    summary: 'High-converting user interfaces, responsive component hierarchies, and performant web engines.',
    bullets: [
      'Component-driven React & Next.js architectures',
      'Micro-interactions, physics animations & smooth scrolling',
      'API integration, state management & edge deployment',
      '100% mobile-first design with high accessibility'
    ]
  },
  {
    id: 'ai-ml',
    nameplate: 'AI & ML SYSTEMS',
    title: 'Explainable AI & Machine Learning',
    subtitle: 'Intelligent decision engines built for transparent human-in-the-loop auditing.',
    doorColor: 'from-neutral-800 via-zinc-900 to-black',
    doorBorderColor: 'border-zinc-600',
    glowColor: 'rgba(255, 255, 255, 0.45)',
    tag: 'INTELLIGENT DECISION ENGINES',
    icon: 'Brain',
    summary: 'Predictive modeling, ethical algorithmic routing, and precision analytical tools.',
    bullets: [
      'Dual-Score creditworthiness & fraud detection architecture',
      'Zero black-box automated rejections: ethical AI governance',
      'Environmental telemetry & agricultural crop recommendation ML',
      'Interactive real-time inference dashboards'
    ]
  },
  {
    id: 'systems',
    nameplate: 'COGNITIVE TECH',
    title: 'Cognitive & Assistive Systems',
    subtitle: 'Human-centric digital companions and privacy-first local graph memory.',
    doorColor: 'from-stone-800 via-zinc-900 to-black',
    doorBorderColor: 'border-zinc-600',
    glowColor: 'rgba(255, 255, 255, 0.45)',
    tag: 'HUMAN-CENTRIC ARCHITECTURES',
    icon: 'Sparkles',
    summary: 'Accessible memory companions, living knowledge graphs, and autonomous system health tools.',
    bullets: [
      'Living Memory Graph with multi-level associative cues',
      'Rule-based caregiver copilot running 100% client-side',
      'Zero external API dependency: total privacy preservation',
      'Autonomous system self-healing & telemetry pipelines'
    ]
  },
  {
    id: 'iot',
    nameplate: 'IoT & FLEET TECH',
    title: 'IoT & Hardware Automation',
    subtitle: 'Real-time robotics coordination, hardware telemetry, and order routing.',
    doorColor: 'from-zinc-900 via-black to-zinc-950',
    doorBorderColor: 'border-zinc-600',
    glowColor: 'rgba(255, 255, 255, 0.45)',
    tag: 'HARDWARE FLEET CONTROL',
    icon: 'Cpu',
    summary: 'Fleet telemetry, asynchronous order queue dispatch, and operator command dashboards.',
    bullets: [
      'Robotics telemetry & prep station queue monitoring',
      'Asynchronous command distribution across robotic units',
      'Real-time status indicators and emergency stop protocols',
      'Hardware state machine orchestration'
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'credit-ledger',
    title: 'Explainable Credit Ledger',
    subtitle: 'AI-Powered Fraud Detection & Explainable Dual-Score Credit Engine',
    category: 'ai-ml',
    categoryBadge: 'SMART INDIA HACKATHON 2026 • FINTECH AI',
    description: 'An enterprise credit-officer dashboard engineered so no automated black-box algorithm can reject an applicant. The engine auto-approves verified clean cases; all edge cases, thin credit profiles, or potential fraud alerts are routed to human officers with factor-by-factor transparency.',
    highlights: [
      'Pioneered the Dual-Score Architecture separating statistical creditworthiness from fraud probability',
      'Interactive factor breakdown showing exact weightings and alternative data indicators for unbanked users',
      'Smart India Hackathon 2026 Team Batman flagship innovation for nationwide financial inclusion',
      'Live metric KPI monitoring with real-time risk heatmaps and officer approval workflows'
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Scoring Models', 'Chart.js', 'Vercel'],
    githubUrl: 'https://github.com/workofcharan/credit-ledger',
    liveUrl: 'https://credit-ledger-henna.vercel.app',
    accentColor: '#ffffff',
    iconName: 'ShieldCheck',
    stats: { label: 'Hackathon', value: 'SIH 2026' },
    previewType: 'dashboard'
  },
  {
    id: 'sampradaya-events',
    title: 'Sampradaya Events',
    subtitle: "Hyderabad's Premier Luxury Wedding & Cultural Celebration Platform",
    category: 'fullstack',
    categoryBadge: 'PRODUCTION CLIENT WEBSITE • 31K+ AUDIENCE',
    description: 'The official customer-facing digital flagship for Sampradaya Events, Hyderabad’s top luxury event planning house. Built with royal aesthetics, Vedic authenticity, Lenis smooth scrolling, and cinematic digital storytelling.',
    highlights: [
      'Crafted sacred ivory (#FBF4E6) & royal maroon (#7A1F2B) luxury design system with bespoke typography',
      'Integrated Lenis buttery smooth scroll engine and Framer Motion choreography',
      'Interactive celebration portfolio, dynamic package discovery, and instant booking inquiry funnel',
      'High-performance asset loading delivering sub-1.2s First Contentful Paint'
    ],
    techStack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Lenis', 'Vercel'],
    githubUrl: 'https://github.com/workofcharan/sampradayaevents',
    liveUrl: 'https://sampradayaevents.vercel.app',
    accentColor: '#ffffff',
    iconName: 'Sparkles',
    stats: { label: 'Brand Reach', value: '31K+ Followers' },
    previewType: 'desktop'
  },
  {
    id: 'crave-plus',
    title: 'Crave+ (CravePulse)',
    subtitle: 'Trilingual Food Discovery & Interactive Smart Ordering Engine',
    category: 'fullstack',
    categoryBadge: 'CONSUMER TECH • WEB SPEECH API',
    description: 'An interactive food discovery platform showcasing 76+ iconic dishes across 26 food capitals. Features 1-click Swiggy & Zomato deep-linking, trilingual voice narration (English, Telugu, Hindi), physics-based flavor roulettes, and step-by-step cook-alongs.',
    highlights: [
      'Web Speech API integration powering native English, Telugu, and Hindi dish narrations',
      'Direct 1-click ordering pipelines deep-linking into Swiggy and Zomato restaurants',
      'Physics-simulated flavor roulette wheel helping indecisive diners discover their next meal',
      'Interactive recipe cook-along mode with progressive timers and ingredient scaling'
    ],
    techStack: ['React', 'JavaScript', 'Web Speech API', 'Tailwind CSS', 'Lucide Icons', 'Vercel'],
    githubUrl: 'https://github.com/workofcharan/crave-plus',
    liveUrl: 'https://crave-plus.vercel.app',
    accentColor: '#ffffff',
    iconName: 'Utensils',
    stats: { label: 'Dishes Cataloged', value: '76+ Items' },
    previewType: 'mobile'
  },
  {
    id: 'yaadri',
    title: 'YAADRI — AI Memory Companion',
    subtitle: 'Cognitive Assistive System & Living Memory Graph for Patients & Families',
    category: 'systems',
    categoryBadge: 'HEALTH TECH • COGNITIVE UI',
    description: 'A personalized cognitive companion designed to support memory retention through interactive Memory Capsules, a dynamic Living Memory Graph, three cognitive recall games, and a 5-level Memory Rescue mechanism.',
    highlights: [
      'Constructed dynamic node-link Living Memory Graph mapping familial connections and life events',
      '100% private, client-side execution running without any paid external cloud or AI dependencies',
      'Tiered 5-level progressive Memory Rescue system providing gentle contextual hints',
      'Caregiver Copilot dashboard tracking interaction consistency and cognitive trends'
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Graph Visualization', 'LocalStorage', 'Vercel'],
    githubUrl: 'https://github.com/workofcharan/yaadri',
    liveUrl: 'https://yaadri.vercel.app',
    accentColor: '#ffffff',
    iconName: 'HeartHandshake',
    stats: { label: 'Privacy', value: '100% Local' },
    previewType: 'dashboard'
  },
  {
    id: 'fincore',
    title: 'FINCORE Consultancy',
    subtitle: 'Corporate Financial Advisory & Strategic Wealth Management Portal',
    category: 'fullstack',
    categoryBadge: 'ENTERPRISE • CONSULTING',
    description: 'An executive corporate advisory portal for corporate financial consulting practices, delivering structured service breakdowns, financial health assessment tools, and automated consultation scheduling.',
    highlights: [
      'Structured financial service architecture with interactive fee calculators and scope estimators',
      'Minimalist corporate typography and high-contrast accessibility compliance',
      'Client intake funnel with form validation and automated dispatch'
    ],
    techStack: ['TypeScript', 'React', 'Tailwind CSS', 'Vercel'],
    githubUrl: 'https://github.com/workofcharan/FINCORE',
    liveUrl: 'https://fincoreconsultancy.vercel.app',
    accentColor: '#ffffff',
    iconName: 'TrendingUp',
    stats: { label: 'Type', value: 'Consultancy' },
    previewType: 'desktop'
  },
  {
    id: 'revpulse',
    title: 'RevPulse (Smart QR Feedback)',
    subtitle: 'Contactless Dynamic QR Feedback & Instant Sentiment Analytics Engine',
    category: 'fullstack',
    categoryBadge: 'HOSPITALITY TECH • QR ANALYTICS',
    description: 'A contactless feedback collection engine enabling physical restaurants and retail venues to generate dynamic QR codes per table/counter, capture 15-second customer reviews, and calculate live Net Promoter Scores.',
    highlights: [
      'Real-time dynamic QR code generation mapped to store sections and table IDs',
      'Instant sentiment telemetry with automated alerts to managers for low ratings',
      'Lightweight, friction-free mobile web UI with zero app install required'
    ],
    techStack: ['React', 'JavaScript', 'QR Code API', 'Tailwind CSS', 'Node.js', 'Vercel'],
    githubUrl: 'https://github.com/workofcharan/review',
    liveUrl: 'https://revpulse1.vercel.app',
    accentColor: '#ffffff',
    iconName: 'QrCode',
    stats: { label: 'Response Time', value: '< 15 sec' },
    previewType: 'mobile'
  },
  {
    id: 'crop-recommendation',
    title: 'CropMind (Crop Recommendation)',
    subtitle: 'Precision Agriculture Multi-Variable ML Advisory System',
    category: 'ai-ml',
    categoryBadge: 'AGRITECH • PREDICTIVE ML',
    description: 'An agricultural decision system utilizing multi-variable machine learning to recommend optimal crop choices based on real-time soil nutrient levels (Nitrogen, Phosphorus, Potassium), soil pH, rainfall, and ambient temperature.',
    highlights: [
      'Multi-parameter feature analysis mapping chemical and environmental indicators',
      'Confidence-weighted crop ranking with localized planting guidance',
      'Accessible, clean farmer dashboard with intuitive metric sliders'
    ],
    techStack: ['Python', 'Scikit-Learn', 'Flask', 'HTML5', 'Modern CSS', 'Vercel'],
    githubUrl: 'https://github.com/workofcharan/crop-recommendation-system',
    liveUrl: 'https://cropmindcrs.vercel.app',
    accentColor: '#ffffff',
    iconName: 'Sprout',
    stats: { label: 'Parameters', value: '7 Factors' },
    previewType: 'dashboard'
  },
  {
    id: 'kitchen-bots',
    title: 'Kitchen Bots Robotics & Fleet Dashboard',
    subtitle: 'Automated Kitchen Robotics Fleet Monitoring & Order Telemetry System',
    category: 'iot',
    categoryBadge: 'ROBOTICS IoT • FLEET MANAGEMENT',
    description: 'An IoT robotics fleet management and ordering system coordinating autonomous kitchen robotic units, tracking real-time preparation states, ingredient inventories, and hardware telemetry.',
    highlights: [
      'Real-time robotic telemetry monitoring station temperature, prep state, and queue latency',
      'Asynchronous order dispatch coordinating physical hardware stations',
      'Interactive operator dashboard with emergency stop protocols and inventory triggers'
    ],
    techStack: ['TypeScript', 'React', 'IoT Telemetry', 'Tailwind CSS', 'State Machine'],
    githubUrl: 'https://github.com/workofcharan/kitchen-bots',
    accentColor: '#ffffff',
    iconName: 'Cpu',
    stats: { label: 'Architecture', value: 'IoT Fleet' },
    previewType: 'dashboard'
  }
];

export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    id: 'm1',
    year: '2026',
    period: 'OCT 2026 - PRESENT',
    title: 'Explainable Credit Ledger — Smart India Hackathon',
    role: 'Team Batman / Lead Architect & Developer',
    organization: 'Smart India Hackathon (SIH 2026)',
    location: 'National Level, India',
    badge: 'SIH 2026 FINALIST',
    summary: 'Engineered an AI-powered fraud detection & explainable dual-score credit engine for nationwide financial inclusion, eliminating black-box automated rejections.',
    bullets: [
      'Architected dual-score system separating fraud detection from creditworthiness scoring',
      'Built factor-by-factor explainable UI giving officers complete visibility into risk decisions',
      'Authored the pitch script and live demonstration praised by evaluation panels'
    ],
    type: 'hackathon'
  },
  {
    id: 'm2',
    year: '2026',
    period: 'JUL 2026 - NOV 2026',
    title: 'B.Sc Computer Science & Engineering (Semester V)',
    role: 'Undergraduate Student',
    organization: 'Loyola Academy Degree & PG College',
    location: 'Secunderabad, Telangana',
    badge: 'ACADEMIC EXCELLENCE',
    summary: 'Third-year advanced undergraduate study covering Advanced Java, Big Data Analytics, Computer Networks, Software Engineering, Mobile App Development, and Operations Research.',
    bullets: [
      'Hands-on laboratory investigations across Java enterprise patterns and Big Data pipelines',
      'Active developer building production systems alongside academic curriculum',
      'Consistent focus on clean architecture, systems engineering, and problem-solving'
    ],
    type: 'education'
  },
  {
    id: 'm3',
    year: '2025',
    period: 'AUG 2025',
    title: 'Python Essentials 1 Certification',
    role: 'Certified Python Practitioner',
    organization: 'Cisco Networking Academy & TASK',
    location: 'Telangana Academy for Skill and Knowledge',
    badge: 'VERIFIED CREDENTIAL',
    summary: 'Completed rigorous curriculum and examination in foundational and intermediate Python programming, algorithmic thinking, and data handling.',
    bullets: [
      'Credential ID: 6d2d7764-f14b-4576-b113-9e24f54d545a',
      'Mastered core Python idioms, memory structures, OOP, and data pipelines',
      'Applied directly to machine learning experiments and automation scripts'
    ],
    type: 'certification'
  },
  {
    id: 'm4',
    year: '2024',
    period: 'JAN 2024 - MAR 2024',
    title: 'Cyber Security Internship Program',
    role: 'Cyber Security Intern',
    organization: 'Embrizon Technologies',
    location: 'Hyderabad, India',
    badge: 'INDUSTRY INTERNSHIP',
    summary: 'Participated in cybersecurity training and project execution focusing on secure coding, application vulnerability analysis, and network protocols.',
    bullets: [
      'Analyzed OWASP Top 10 vulnerabilities in modern web applications',
      'Explored network penetration testing, authentication flows, and cryptographic standards',
      'Delivered capstone security project on defensive infrastructure'
    ],
    type: 'internship'
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Programming Languages',
    subtitle: 'The foundational languages I use to build scalable systems.',
    skills: [
      { name: 'TypeScript', level: 'Advanced', category: 'Languages' },
      { name: 'JavaScript (ES6+)', level: 'Advanced', category: 'Languages' },
      { name: 'Python', level: 'Advanced', category: 'Languages' },
      { name: 'Java', level: 'Core', category: 'Languages' },
      { name: 'SQL', level: 'Core', category: 'Languages' },
      { name: 'HTML5 & CSS3', level: 'Advanced', category: 'Languages' }
    ]
  },
  {
    title: 'Frontend Engineering',
    subtitle: 'Crafting responsive, editorial, and micro-interactive interfaces.',
    skills: [
      { name: 'React.js', level: 'Advanced', category: 'Frontend' },
      { name: 'Next.js', level: 'Core', category: 'Frontend' },
      { name: 'Tailwind CSS', level: 'Advanced', category: 'Frontend' },
      { name: 'Framer Motion', level: 'Advanced', category: 'Frontend' },
      { name: 'Vite', level: 'Advanced', category: 'Frontend' },
      { name: 'Web Speech API', level: 'Core', category: 'Frontend' }
    ]
  },
  {
    title: 'Backend & Data Engineering',
    subtitle: 'Building resilient APIs, ML scoring logic, and data storage.',
    skills: [
      { name: 'Node.js & Express', level: 'Core', category: 'Backend' },
      { name: 'Flask / Python APIs', level: 'Core', category: 'Backend' },
      { name: 'Machine Learning (Scikit-Learn)', level: 'Core', category: 'AI/ML' },
      { name: 'Big Data Analytics', level: 'Core', category: 'Data' },
      { name: 'RESTful API Architecture', level: 'Advanced', category: 'Backend' },
      { name: 'Explainable AI Scoring', level: 'Advanced', category: 'AI/ML' }
    ]
  },
  {
    title: 'Tools, DevOps & Cloud',
    subtitle: 'Deployment pipelines, version control, and developer workflows.',
    skills: [
      { name: 'Vercel Deployment', level: 'Advanced', category: 'Cloud' },
      { name: 'Git & GitHub', level: 'Advanced', category: 'DevOps' },
      { name: 'Linux / Shell Automation', level: 'Core', category: 'DevOps' },
      { name: 'VS Code & Antigravity', level: 'Advanced', category: 'Tools' },
      { name: 'QR Code Systems', level: 'Advanced', category: 'Tools' }
    ]
  }
];
