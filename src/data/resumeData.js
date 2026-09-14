// ─── Personal Info ────────────────────────────────────────────────────────────
export const personal = {
  name: 'Kashyap Ajudiya',
  role: 'Software Engineer',
  tagline: 'Building scalable .NET full-stack applications with Angular, REST APIs, and Azure',
  email: 'kashyapajudiya11@gmail.com',
  phone: '+91 7383567059',
  github: 'https://github.com/Kashyap3003',       // update with real URL
  linkedin: 'https://www.linkedin.com/in/kashyapajudiya/', // update with real URL
  location: 'Ahmedabad, Gujarat',
  resumeFile: '/Kashyap_CV.pdf',
  avatar: '/avatar.jpg',
};

// ─── About ────────────────────────────────────────────────────────────────────
export const aboutText =
  'Software Engineer specializing in .NET Full Stack Development, building scalable web applications using ' +
  '.NET Core, ASP.NET Core, Angular, REST APIs, and Azure. Experienced in developing workflow-driven and ' +
  'event-based systems with a focus on reliable, maintainable software solutions.';

export const stats = [
  { value: '20+', label: 'Isolated Tenants' },
  { value: '40%', label: 'Workflow Effort Reduced' },
  { value: '500+', label: 'Events / Day Processed' },
  { value: '350+', label: 'DSA Problems Solved' },
];

// ─── Skills ───────────────────────────────────────────────────────────────────
export const skillGroups = [
  {
    category: 'Frontend',
    colorClass: 'text-violet-600 dark:text-violet-400',
    bgClass: 'bg-violet-50 dark:bg-violet-500/10',
    borderClass: 'border-violet-200 dark:border-violet-500/20',
    items: ['Angular', 'JavaScript', 'HTML', 'CSS', 'REST API Integration'],
  },
  {
    category: 'Backend',
    colorClass: 'text-blue-600 dark:text-blue-400',
    bgClass: 'bg-blue-50 dark:bg-blue-500/10',
    borderClass: 'border-blue-200 dark:border-blue-500/20',
    items: ['.NET Core', 'ASP.NET Core', 'ASP.NET MVC', 'C#', 'REST APIs', 'Entity Framework Core'],
  },
  {
    category: 'Architecture',
    colorClass: 'text-rose-600 dark:text-rose-400',
    bgClass: 'bg-rose-50 dark:bg-rose-500/10',
    borderClass: 'border-rose-200 dark:border-rose-500/20',
    items: ['Full Stack Development', 'Workflow Management', 'Event-Driven Architecture', 'SOLID Principles', 'OOP'],
  },
  {
    category: 'Cloud & Infra',
    colorClass: 'text-sky-600 dark:text-sky-400',
    bgClass: 'bg-sky-50 dark:bg-sky-500/10',
    borderClass: 'border-sky-200 dark:border-sky-500/20',
    items: ['Microsoft Azure', 'Azure Service Bus', 'Azure Functions', 'GCP (Basic)', 'Docker'],
  },
  {
    category: 'Databases',
    colorClass: 'text-emerald-600 dark:text-emerald-400',
    bgClass: 'bg-emerald-50 dark:bg-emerald-500/10',
    borderClass: 'border-emerald-200 dark:border-emerald-500/20',
    items: ['SQL Server', 'MySQL', 'PostgreSQL', 'MongoDB', 'SQLite'],
  },
  {
    category: 'Tools',
    colorClass: 'text-orange-600 dark:text-orange-400',
    bgClass: 'bg-orange-50 dark:bg-orange-500/10',
    borderClass: 'border-orange-200 dark:border-orange-500/20',
    items: ['Git', 'GitLab', 'SonarQube', 'ClickUp', 'ClaudeAI', 'Cursor IDE', 'Datadog'],
  },
];

// ─── Projects ─────────────────────────────────────────────────────────────────
export const projects = [
  {
    title: 'OpenDental Report Utility',
    subtitle: 'Healthcare Data ETL Pipeline',
    problem:
      'Healthcare providers needed a reliable, automated way to extract incremental data from 40+ Open Dental locations and deliver it to a central cloud platform — without data loss, duplication, or manual intervention.',
    solution:
      'Designed a config-driven ETL pipeline that extracts delta records from Open Dental (MySQL), stages them in encrypted SQLite, maps schemas, and packages them as Avro files for GCP upload. Built-in retry logic, JWT auth, and Datadog integration ensure reliability and full observability.',
    impact:
      'Deployed across 42+ Open Dental locations with consistent data processing. Datadog dashboards provide real-time error tracking and operational visibility for every sync cycle.',
    tech: ['.NET Core', 'MySQL', 'SQLite', 'Avro', 'GCP', 'Datadog', 'JWT', 'ETL'],
    github: '#',
    demo: null,
    featured: true,
  },
  {
    title: 'Answerly',
    subtitle: 'Community Q&A Platform',
    problem:
      'Developers and learners lacked a dedicated, interactive space for technical Q&A with quality content management, rich user profiles, and community engagement features.',
    solution:
      'Built a full-stack MERN platform featuring JWT authentication, CRUD operations for questions, answers, and blogs via RESTful APIs, plus interactive features like likes, nested comments, and user profiles.',
    impact:
      'A fully functional community platform demonstrating full-stack capability — clean REST API design, auth flows, and a reactive frontend that keeps users engaged.',
    tech: ['MongoDB', 'Express.js', 'React', 'Node.js', 'REST APIs', 'JWT'],
    github: 'https://github.com/Kashyap3003/Answerly-A_Question_Answer_Forum',
    demo: null,
    featured: true,
  },
];

// ─── Experience ───────────────────────────────────────────────────────────────
export const experience = [
  {
    title: 'Software Engineer',
    company: 'Outamation Technologies Pvt. Ltd.',
    location: 'Ahmedabad, Gujarat',
    period: 'May 2026 – Present',
    type: 'Full-time',
    bullets: [
      'Developed a full-stack Legal Case Management System for VIA, a U.S.-based mortgage technology company, using .NET Core, Angular, SQL Server, and Docker.',
      'Built a schema-driven dynamic form engine that dynamically adapts UI components and form behavior based on workflow state, enabling configurable case-management processes.',
      'Implemented a multi-tenant architecture supporting 20+ isolated tenants, enabling tenant-specific configuration and secure data separation.',
      'Developed a rule-based work queue for automated case assignment and workflow-driven task management, improving operational efficiency.',
      'Implemented workflow version propagation, reducing manual effort required to apply legal workflow updates by 40%.',
      'Developed end-to-end features across Angular and .NET Core, building REST APIs, integrating dynamic frontend components, and implementing workflow activities and execution logic.',
    ],
  },
  {
    title: 'Software Engineer',
    company: 'NSR Information Systems Pvt Ltd',
    location: 'Remote, India',
    period: 'Aug 2025 – May 2026',
    type: 'Full-time',
    bullets: [
      'Engineered event-driven healthcare integration systems that process 500+ events/day, enabling real-time data synchronization across 15+ Practice Management Systems.',
      'Built scalable REST APIs in .NET Core; integrated Azure Service Bus and Azure Functions for reliable distributed cloud event processing.',
      'Implemented asynchronous writeback workflows and a config-driven ETL pipeline, reducing manual data-processing overhead significantly.',
      'Improved codebase quality with SonarQube — resolved code smells, reduced cyclomatic complexity, and addressed security hotspots.',
      'Achieved higher test coverage by writing unit tests with xUnit and NSubstitute, increasing system reliability.',
      'Used Cursor IDE for AI-assisted development, accelerating debugging velocity and feature delivery cycles.',
    ],
  },
  {
    title: 'Software Engineer Intern',
    company: 'NSR Information Systems Pvt Ltd',
    location: 'Remote, India',
    period: 'Jan 2025 – Aug 2025',
    type: 'Internship',
    bullets: [
      'Migrated a legacy monolithic system to an event-driven architecture using Azure Service Bus and Azure Functions — improving processing reliability and reducing system downtime.',
      'Developed and debugged backend integration modules in a cloud-based healthcare platform supporting data exchange across multiple Practice Management Systems.',
    ],
  },
];

// ─── Education ────────────────────────────────────────────────────────────────
export const education = {
  degree: 'B.Tech in Computer Engineering',
  school: 'Dharmsinh Desai University',
  location: 'Nadiad, Gujarat, India',
  graduation: 'May 2025',
  cpi: '7.92 / 10.00',
};

// ─── Achievements ─────────────────────────────────────────────────────────────
export const achievements = [
  {
    icon: '🏆',
    title: 'Microsoft Certified: Azure Fundamentals',
    detail: 'AZ-900 – April 2025',
    link: 'https://learn.microsoft.com/api/credentials/share/en-us/KashyapAjudiya-5660/C4420F306DF85161?sharingId=CC9713057CE18951',
  },
  {
    icon: '🥇',
    title: 'AceHack 3.0 — Top 30',
    detail: 'Ranked top 30 out of 400+ teams',
  },
  {
    icon: '💡',
    title: '350+ DSA Problems Solved',
    detail: 'LeetCode · CodeChef · HackerRank',
  },
];
