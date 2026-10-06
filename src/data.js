export const roleFamilies = [
  {
    id: 'technology',
    kicker: 'TECH + AI',
    title: 'Technology & AI',
    description: 'Build, modernise and scale with engineers and technical specialists across product, data and infrastructure.',
    icon: 'code',
    accent: 'dark',
    roles: ['AI / ML Engineer', 'Full-Stack Engineer', 'Data Engineer', 'Cloud / DevOps', 'QA Automation', 'Cybersecurity']
  },
  {
    id: 'business',
    kicker: 'GROWTH',
    title: 'Sales & Business',
    description: 'Add people who create pipeline, build relationships and turn business opportunities into revenue.',
    icon: 'growth',
    accent: 'red',
    roles: ['Business Development Executive', 'SDR / BDR', 'Inside Sales', 'Account Manager', 'Partnerships', 'Sales Operations']
  },
  {
    id: 'people',
    kicker: 'PEOPLE',
    title: 'HR & Talent',
    description: 'Strengthen hiring, people operations and the day-to-day systems that keep teams working well.',
    icon: 'people',
    accent: 'cream',
    roles: ['HR Executive', 'Talent Acquisition', 'Recruiter', 'People Operations', 'HR Generalist', 'L&D / Training']
  },
  {
    id: 'finance',
    kicker: 'FINANCE + OPS',
    title: 'Finance & Operations',
    description: 'Support the business behind the scenes with finance, admin, process and operations talent.',
    icon: 'finance',
    accent: 'sand',
    roles: ['Finance Associate', 'Accounts Executive', 'AP / AR', 'Financial Analyst', 'Operations Executive', 'Procurement']
  },
  {
    id: 'marketing',
    kicker: 'MARKETING',
    title: 'Marketing & Growth',
    description: 'Build awareness, demand and content with people who know how to move an audience to action.',
    icon: 'marketing',
    accent: 'dark',
    roles: ['Performance Marketer', 'Content Strategist', 'SEO Specialist', 'Social Media', 'Graphic Designer', 'Growth Associate']
  },
  {
    id: 'customer',
    kicker: 'CUSTOMER',
    title: 'Customer & Support',
    description: 'Give customers a better experience with reliable people across success, support and implementation.',
    icon: 'customer',
    accent: 'red',
    roles: ['Customer Success', 'Customer Support', 'Implementation', 'Client Servicing', 'Technical Support', 'Service Operations']
  }
];

export const talent = [
  // --- Technology & AI (5 roles) ---
  {
    name: 'AI / ML Engineer',
    family: 'Technology & AI',
    seniority: 'Senior · 6+ Yrs',
    highlight: 'Architects production RAG pipelines & fine-tuned LLM reasoning agents.',
    skills: ['Python', 'LLMs', 'RAG', 'FastAPI', 'PyTorch'],
    stack: 'Python · LLMs · RAG · FastAPI',
    meta: 'TECH · SENIOR',
    code: 'AI',
    tone: 'black',
    timezone: 'US & EU Overlap'
  },
  {
    name: 'Full-Stack Engineer',
    family: 'Technology & AI',
    seniority: 'Senior · 7+ Yrs',
    highlight: 'Builds scalable web applications with resilient TypeScript APIs & modern React frontends.',
    skills: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'AWS'],
    stack: 'React · Node · PostgreSQL · AWS',
    meta: 'TECH · SENIOR',
    code: 'FS',
    tone: 'black',
    timezone: 'Synchronous IST/EU'
  },
  {
    name: 'Data Engineer',
    family: 'Technology & AI',
    seniority: 'Senior · 5+ Yrs',
    highlight: 'Scales high-throughput ETL pipelines, automated data lakes, and Snowflake warehouses.',
    skills: ['Snowflake', 'Spark', 'Airflow', 'dbt', 'Python'],
    stack: 'Airflow · Spark · Snowflake · dbt',
    meta: 'DATA · SENIOR',
    code: 'DE',
    tone: 'black',
    timezone: 'US & Global Overlap'
  },
  {
    name: 'Cloud / DevOps Engineer',
    family: 'Technology & AI',
    seniority: 'Lead · 8+ Yrs',
    highlight: 'Infrastructure as Code, zero-downtime CI/CD workflows, and SOC2 cloud compliance.',
    skills: ['Kubernetes', 'Terraform', 'AWS', 'Docker', 'CI/CD'],
    stack: 'Kubernetes · Terraform · AWS · CI/CD',
    meta: 'CLOUD · SENIOR',
    code: 'DO',
    tone: 'black',
    timezone: 'US & EU Overlap'
  },
  {
    name: 'Frontend / UI Engineer',
    family: 'Technology & AI',
    seniority: 'Senior · 5+ Yrs',
    highlight: 'Crafts responsive interfaces, fluid micro-interactions, and enterprise design systems.',
    skills: ['React', 'TypeScript', 'Tailwind', 'Next.js', 'Framer'],
    stack: 'React · TypeScript · Tailwind · Next.js',
    meta: 'TECH · SENIOR',
    code: 'FE',
    tone: 'black',
    timezone: 'Synchronous IST/EU'
  },

  // --- Sales & Business (5 roles) ---
  {
    name: 'Business Development Executive',
    family: 'Sales & Business',
    seniority: 'Senior · 5+ Yrs',
    highlight: 'Drives outbound prospecting, executive outreach, and high-value B2B pipeline growth.',
    skills: ['Enterprise Sales', 'CRM Outreach', 'Lead Gen', 'Prospecting'],
    stack: 'Lead Generation · CRM · Outreach',
    meta: 'GROWTH · MID / SENIOR',
    code: 'BD',
    tone: 'red',
    timezone: 'US Timezone Aligned'
  },
  {
    name: 'Sales Development Rep (SDR)',
    family: 'Sales & Business',
    seniority: 'Mid · 3+ Yrs',
    highlight: 'Consistently hits 130%+ quota on qualified demo meetings with multi-channel outreach.',
    skills: ['Apollo.io', 'Salesforce', 'Cold Calling', 'Email Sequences'],
    stack: 'Outbound · Apollo · Salesforce · Cold Email',
    meta: 'SALES · MID',
    code: 'SD',
    tone: 'red',
    timezone: 'US & EU Timezones'
  },
  {
    name: 'Account Executive (AE)',
    family: 'Sales & Business',
    seniority: 'Senior · 6+ Yrs',
    highlight: 'Full-cycle deal closing, software demos, and multi-stakeholder contract negotiation.',
    skills: ['Deal Closing', 'Product Demos', 'B2B SaaS', 'Negotiation'],
    stack: 'Deal Closing · Product Demos · B2B SaaS',
    meta: 'SALES · SENIOR',
    code: 'AE',
    tone: 'red',
    timezone: 'US & Global Hours'
  },
  {
    name: 'Partnerships & Alliances Lead',
    family: 'Sales & Business',
    seniority: 'Lead · 7+ Yrs',
    highlight: 'Builds revenue-sharing co-selling partnerships and strategic ecosystem alliances.',
    skills: ['Channel Sales', 'Strategic Alliances', 'BD', 'Co-Marketing'],
    stack: 'Channel Sales · Alliances · Ecosystem',
    meta: 'GROWTH · LEAD',
    code: 'PL',
    tone: 'red',
    timezone: 'Flexible Worldwide'
  },
  {
    name: 'Sales Operations Analyst',
    family: 'Sales & Business',
    seniority: 'Senior · 5+ Yrs',
    highlight: 'Optimizes sales funnels, CRM workflows, quota planning, and RevOps analytics.',
    skills: ['HubSpot CRM', 'RevOps', 'Pipeline Analytics', 'Salesforce'],
    stack: 'HubSpot · RevOps · Pipeline Analytics',
    meta: 'GROWTH · SENIOR',
    code: 'SO',
    tone: 'red',
    timezone: 'US & EU Overlap'
  },

  // --- HR & Talent (5 roles) ---
  {
    name: 'Talent Acquisition Specialist',
    family: 'HR & Talent',
    seniority: 'Senior · 5+ Yrs',
    highlight: 'Full-cycle recruiting across engineering and business roles with high offer acceptance.',
    skills: ['Tech Sourcing', 'Screening', 'ATS Management', 'Offer Closing'],
    stack: 'Sourcing · Screening · ATS · Tech Hiring',
    meta: 'PEOPLE · MID / SENIOR',
    code: 'TA',
    tone: 'taupe',
    timezone: 'Synchronous Global'
  },
  {
    name: 'HR Executive',
    family: 'HR & Talent',
    seniority: 'Mid · 4+ Yrs',
    highlight: 'Oversees employee onboarding, HR compliance, workplace policies, and operations.',
    skills: ['Employee Relations', 'HR Ops', 'Labor Laws', 'Compliance'],
    stack: 'Recruitment · HR Ops · Employee Relations',
    meta: 'PEOPLE · MID',
    code: 'HR',
    tone: 'taupe',
    timezone: 'Flexible Overlap'
  },
  {
    name: 'People Operations Lead',
    family: 'HR & Talent',
    seniority: 'Lead · 7+ Yrs',
    highlight: 'Builds scalable people infrastructure, culture initiatives, and performance cycles.',
    skills: ['Onboarding', 'HRMS Systems', 'Performance Reviews', 'Retention'],
    stack: 'Onboarding · Policy · Performance · HRMS',
    meta: 'PEOPLE · LEAD',
    code: 'PO',
    tone: 'taupe',
    timezone: 'US & EU Overlap'
  },
  {
    name: 'Compensation & Benefits Specialist',
    family: 'HR & Talent',
    seniority: 'Senior · 5+ Yrs',
    highlight: 'Calibrates global compensation bands, equity plans, and statutory benefit packages.',
    skills: ['Salary Benchmarking', 'Equity / ESOPs', 'Payroll', 'Benefits'],
    stack: 'Benchmarking · Compensation · Payroll',
    meta: 'PEOPLE · SENIOR',
    code: 'CB',
    tone: 'taupe',
    timezone: 'US & Global Overlap'
  },
  {
    name: 'Learning & Enablement Specialist',
    family: 'HR & Talent',
    seniority: 'Mid · 4+ Yrs',
    highlight: 'Designs training curriculums, employee onboarding academies, and skill assessments.',
    skills: ['Training Programs', 'L&D Workshops', 'LMS', 'Upskilling'],
    stack: 'Enablement · L&D · Training Programs',
    meta: 'PEOPLE · MID',
    code: 'LD',
    tone: 'taupe',
    timezone: 'Synchronous Hours'
  },

  // --- Finance & Operations (5 roles) ---
  {
    name: 'Financial Analyst',
    family: 'Finance & Operations',
    seniority: 'Senior · 6+ Yrs',
    highlight: 'Builds predictive FP&A models, cash runway forecasts, and board financial reports.',
    skills: ['Financial Modeling', 'Valuation', 'Forecasting', 'Power BI'],
    stack: 'FP&A · Valuation · Forecasting · Power BI',
    meta: 'FINANCE · SENIOR',
    code: 'FA',
    tone: 'gray',
    timezone: 'US Timezone Aligned'
  },
  {
    name: 'Finance Associate',
    family: 'Finance & Operations',
    seniority: 'Mid · 4+ Yrs',
    highlight: 'Manages accounts payable/receivable, ledger reconciliation, and tax filings.',
    skills: ['AP / AR', 'General Ledger', 'Excel MIS', 'Reconciliation'],
    stack: 'Accounts · Excel · MIS · Reconciliation',
    meta: 'FINANCE · MID',
    code: 'FN',
    tone: 'gray',
    timezone: 'Flexible Timezone'
  },
  {
    name: 'Operations Manager',
    family: 'Finance & Operations',
    seniority: 'Lead · 7+ Yrs',
    highlight: 'Optimizes organizational SOPs, logistics management, and resource allocation.',
    skills: ['Process Optimization', 'SOPs', 'Automation', 'Resource Planning'],
    stack: 'Operations · SOPs · Process Optimization',
    meta: 'OPERATIONS · LEAD',
    code: 'OM',
    tone: 'gray',
    timezone: 'US & EU Overlap'
  },
  {
    name: 'Global Payroll Specialist',
    family: 'Finance & Operations',
    seniority: 'Senior · 5+ Yrs',
    highlight: 'Administers international contractor payroll, tax withholdings, and EOR platforms.',
    skills: ['Global Payroll', 'Deel / Remote', 'Tax Compliance', 'Auditing'],
    stack: 'Payroll · Tax Compliance · Global EOR',
    meta: 'FINANCE · SENIOR',
    code: 'GP',
    tone: 'gray',
    timezone: 'Synchronous Hours'
  },
  {
    name: 'Procurement Specialist',
    family: 'Finance & Operations',
    seniority: 'Mid · 4+ Yrs',
    highlight: 'Negotiates enterprise software licensing, vendor agreements, and RFP evaluations.',
    skills: ['Vendor Management', 'Cost Optimization', 'RFP', 'Contracts'],
    stack: 'Procurement · Vendor Management · RFPs',
    meta: 'OPERATIONS · MID',
    code: 'PV',
    tone: 'gray',
    timezone: 'US & Global Overlap'
  },

  // --- Marketing & Growth (5 roles) ---
  {
    name: 'Performance Marketer',
    family: 'Marketing & Growth',
    seniority: 'Senior · 6+ Yrs',
    highlight: 'Scales paid acquisition across Google & Meta Ads with strict ROAS and CAC targets.',
    skills: ['Google Ads', 'Meta Ads', 'ROAS Strategy', 'GA4 Analytics'],
    stack: 'Google Ads · Meta Ads · Analytics',
    meta: 'MARKETING · SENIOR',
    code: 'PM',
    tone: 'red',
    timezone: 'US & Global Overlap'
  },
  {
    name: 'Content & Brand Strategist',
    family: 'Marketing & Growth',
    seniority: 'Senior · 5+ Yrs',
    highlight: 'Produces high-converting landing page copy, technical whitepapers, and brand voice.',
    skills: ['B2B Copywriting', 'SEO Editorial', 'Thought Leadership', 'Storytelling'],
    stack: 'Copywriting · SEO · Thought Leadership',
    meta: 'GROWTH · MID / SENIOR',
    code: 'CS',
    tone: 'red',
    timezone: 'Flexible Worldwide'
  },
  {
    name: 'Technical SEO Specialist',
    family: 'Marketing & Growth',
    seniority: 'Mid · 4+ Yrs',
    highlight: 'Drives compounding organic traffic through technical site audits, schema, and keywords.',
    skills: ['Technical SEO', 'Ahrefs', 'Site Architecture', 'Core Web Vitals'],
    stack: 'Ahrefs · Technical SEO · Keyword Strategy',
    meta: 'GROWTH · MID',
    code: 'SE',
    tone: 'red',
    timezone: 'US & EU Overlap'
  },
  {
    name: 'Product Marketing Manager',
    family: 'Marketing & Growth',
    seniority: 'Senior · 6+ Yrs',
    highlight: 'Develops go-to-market strategies, user personas, sales decks, and feature positioning.',
    skills: ['GTM Strategy', 'User Personas', 'Competitive Intel', 'Positioning'],
    stack: 'GTM Strategy · Product Messaging · PMM',
    meta: 'MARKETING · SENIOR',
    code: 'MM',
    tone: 'red',
    timezone: 'US Timezone Aligned'
  },
  {
    name: 'Social & Community Lead',
    family: 'Marketing & Growth',
    seniority: 'Mid · 3+ Yrs',
    highlight: 'Builds viral corporate social engagement and runs developer community channels.',
    skills: ['LinkedIn Growth', 'Community Building', 'Twitter / X', 'Brand Tone'],
    stack: 'Social Media · Community · LinkedIn',
    meta: 'MARKETING · MID',
    code: 'SM',
    tone: 'red',
    timezone: 'Flexible Worldwide'
  },

  // --- Customer & Support (5 roles) ---
  {
    name: 'Customer Success Manager',
    family: 'Customer & Support',
    seniority: 'Senior · 6+ Yrs',
    highlight: 'Maximizes customer retention, quarterly business reviews (QBRs), and upsell expansion.',
    skills: ['Client Retention', 'Account Health', 'Renewals', 'Zendesk'],
    stack: 'Onboarding · Retention · Renewals · Zendesk',
    meta: 'CUSTOMER · MID / SENIOR',
    code: 'CS',
    tone: 'gray',
    timezone: 'US & EU Overlap'
  },
  {
    name: 'Technical Support Specialist',
    family: 'Customer & Support',
    seniority: 'Mid · 4+ Yrs',
    highlight: 'Resolves complex API, webhook, and SQL database issues with fast SLA resolution.',
    skills: ['API Troubleshooting', 'SQL Queries', 'Zendesk', 'SLA Response'],
    stack: 'API Troubleshooting · SQL · Ticketing · SLA',
    meta: 'SUPPORT · MID',
    code: 'TS',
    tone: 'gray',
    timezone: '24/7 Shift Flexibility'
  },
  {
    name: 'Implementation Specialist',
    family: 'Customer & Support',
    seniority: 'Senior · 5+ Yrs',
    highlight: 'Guides enterprise clients through software setup, data migration, and team onboarding.',
    skills: ['SaaS Deployment', 'Data Migration', 'Client Training', 'Integration'],
    stack: 'Deployment · Migration · Client Setup',
    meta: 'CUSTOMER · SENIOR',
    code: 'IS',
    tone: 'gray',
    timezone: 'US Timezone Aligned'
  },
  {
    name: 'Client Servicing Executive',
    family: 'Customer & Support',
    seniority: 'Mid · 3+ Yrs',
    highlight: 'Ensures ongoing client satisfaction, weekly status reporting, and ticket escalation.',
    skills: ['Account Servicing', 'Weekly Reporting', 'Escalations', 'CSAT'],
    stack: 'Client Servicing · Reporting · CSAT',
    meta: 'SUPPORT · MID',
    code: 'CE',
    tone: 'gray',
    timezone: 'Flexible Hours'
  },
  {
    name: 'Customer Support Lead',
    family: 'Customer & Support',
    seniority: 'Lead · 7+ Yrs',
    highlight: 'Manages multi-tier support operations, team scheduling, and CSAT quality metrics.',
    skills: ['Shift Management', 'CSAT & NPS', 'Help Center CMS', 'Coaching'],
    stack: 'Support Leadership · CSAT · Scheduling',
    meta: 'SUPPORT · LEAD',
    code: 'SL',
    tone: 'gray',
    timezone: 'Global Follow-the-Sun'
  }
];

export const industries = [
  ['SaaS & Product', 'Ship more without building every function in-house.'],
  ['FinTech', 'Add specialist capacity around data, finance and technology.'],
  ['Healthcare', 'Build high-trust teams across technology and operations.'],
  ['Real Estate', 'Strengthen sales, operations, technology and support functions.'],
  ['E-commerce', 'Scale growth, customer teams, technology and back-office capacity.'],
  ['Startups', 'Plug capability gaps while the company is still moving fast.']
];

export const tech = [
  'React', 'Next.js', 'Node.js', 'Python', 'FastAPI', 'Django', 'Java', 'PostgreSQL', 'AWS', 'Docker', 'Kubernetes', 'LLMs', 'RAG', 'Figma', 'Jira', 'Notion'
];

export const businessTools = [
  'Salesforce', 'HubSpot', 'Zoho CRM', 'SAP', 'Tally', 'QuickBooks', 'Excel', 'Power BI', 'Google Ads', 'Meta Ads', 'Freshdesk', 'Zendesk', 'Slack', 'Notion', 'Jira', 'Figma'
];
