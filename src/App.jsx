import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Navigate, NavLink, Route, Routes, useLocation, useSearchParams } from 'react-router-dom';
import {
  ArrowUpRight, AtSign, BriefcaseBusiness, Calendar, Check, CheckCircle2, ChevronDown, ChevronRight, Clock3, Code2, Database, Handshake,
  FileCheck, FileText, Globe2, HeartHandshake, Instagram, LineChart, Mail, Menu, Megaphone, PhoneCall, Copy, Search, Send, ShieldCheck,
  Sparkles, Target, UsersRound, WalletCards, Workflow, X, UserRoundSearch, Youtube, Zap
} from 'lucide-react';
import { businessTools, industries, roleFamilies, talent, tech } from './data';

const CALENDLY = 'https://calendly.com/tanishq-antiai/30min';

function useScrollTop() {
  const { pathname, hash } = useLocation();
  const prevPath = useRef(pathname);
  const prevHash = useRef(hash);
  const isInitialMount = useRef(true);

  // Track scroll position continuously and before reload
  useEffect(() => {
    let scrollTimeout;
    const savePosition = () => {
      try {
        sessionStorage.setItem('antiai_last_scroll_y', String(window.scrollY));
      } catch (e) {}
    };

    const handleScroll = () => {
      if (scrollTimeout) return;
      scrollTimeout = setTimeout(() => {
        scrollTimeout = null;
        savePosition();
      }, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('beforeunload', savePosition);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', savePosition);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);

  useEffect(() => {
    const navEntries = performance.getEntriesByType?.('navigation');
    const isReload = navEntries?.[0]?.type === 'reload' || window.performance?.navigation?.type === 1;

    if (isInitialMount.current) {
      isInitialMount.current = false;

      if (isReload) {
        // When refreshed, stay at the exact same scroll position!
        if (window.location.hash) {
          window.history.replaceState(null, '', window.location.pathname + window.location.search);
        }

        const savedScroll = sessionStorage.getItem('antiai_last_scroll_y');
        if (savedScroll !== null) {
          const targetY = parseFloat(savedScroll);
          window.scrollTo({ top: targetY, left: 0, behavior: 'instant' });
          requestAnimationFrame(() => {
            window.scrollTo({ top: targetY, left: 0, behavior: 'instant' });
          });
          setTimeout(() => {
            window.scrollTo({ top: targetY, left: 0, behavior: 'instant' });
          }, 60);
        }
        return;
      }

      // Initial visit (direct load, not reload) with hash
      if (hash) {
        const id = hash.replace('#', '');
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      }
      return;
    }

    // Subsequent client-side route/anchor changes within SPA:
    if (hash && hash !== prevHash.current) {
      const id = hash.replace('#', '');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else if (pathname !== prevPath.current) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }

    prevPath.current = pathname;
    prevHash.current = hash;
  }, [pathname, hash]);
}

function App() {
  useScrollTop();
  return <div className="app-shell">
    <Navbar />
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/staffing" element={<Home />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/talent" element={<Talent />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="/staffing" replace />} />
      </Routes>
    </main>
    <Footer />
    <MobileBookBar />
  </div>;
}

function Navbar() {
  const [open, setOpen] = useState(false);
  return <header className="nav-wrap">
    <div className="nav">
      <NavLink to="/staffing" className="brand" onClick={() => setOpen(false)}>
        <img src="/logo-red.svg" alt="ANTI.AI" style={{ height: '15px', width: 'auto', display: 'block' }} />
      </NavLink>
      <nav className={`nav-links ${open ? 'is-open' : ''}`}>
        <NavLink to="/staffing" onClick={() => setOpen(false)}>Staffing</NavLink>
        <NavLink to="/how-it-works" onClick={() => setOpen(false)}>How it works</NavLink>
        <NavLink to="/talent" onClick={() => setOpen(false)}>Talent</NavLink>
        <NavLink to="/industries" onClick={() => setOpen(false)}>Industries</NavLink>
        <NavLink to="/contact" onClick={() => setOpen(false)}>Contact</NavLink>
      </nav>
      <div className="nav-actions">
        <a className="text-link hide-mobile" href={CALENDLY} target="_blank" rel="noreferrer">Schedule a call <ArrowUpRight size={16}/></a>
        <button className="menu-btn" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
      </div>
    </div>
  </header>;
}

function PrimaryButton({ children='Schedule a meet', href=CALENDLY, dark=false }) {
  return <a href={href} target="_blank" rel="noreferrer" className={`btn ${dark ? 'btn-dark' : 'btn-red'}`}>{children}<ArrowUpRight size={17}/></a>;
}

function SectionLabel({ eyebrow, children }) {
  return <div className="section-label"><span>{eyebrow}</span><b>{children}</b></div>;
}

function RoleIcon({ type, size=21 }) {
  const props = { size, strokeWidth: 1.7 };
  const map = {
    code: <Code2 {...props}/>,
    growth: <LineChart {...props}/>,
    people: <UsersRound {...props}/>,
    finance: <WalletCards {...props}/>,
    marketing: <Megaphone {...props}/>,
    customer: <HeartHandshake {...props}/>,
  };
  return map[type] || <BriefcaseBusiness {...props}/>;
}

function Home() {
  return <>
    <section className="hero hero-home">
      <div className="hero-grid"></div>
      <div className="container hero-inner">
        <div className="hero-copy">
          <div className="eyebrow"><span className="status-dot"/> STAFFING, WITHOUT THE BOX</div>
          <h1>The people behind your next stage of <em>growth.</em></h1>
          <p className="hero-lead">ANTI.AI helps companies access the people they need across technology, sales, BDE, HR, finance, marketing, operations and customer-facing teams.</p>
          <div className="hero-actions"><PrimaryButton/><a className="ghost-link" href="#roles" onClick={(e) => { e.preventDefault(); document.getElementById('roles')?.scrollIntoView({ behavior: 'smooth' }); }}>Explore roles <ChevronRight size={17}/></a></div>
          <div className="micro-proof"><ShieldCheck size={17}/><span>One staffing partner. Multiple functions. A single path to get moving.</span></div>
          <div className="hero-pills"><span>TECH + AI</span><span>SALES + BDE</span><span>HR + TALENT</span><span>FINANCE + OPS</span><span>MARKETING</span></div>
        </div>
        <div className="hero-visual">
          <div className="hero-orbit orbit-a"></div><div className="hero-orbit orbit-b"></div><div className="hero-orbit orbit-c"></div>
          <div className="talent-panel">
            <div className="panel-top"><span>LIVE STAFFING SIGNAL</span><span className="live-pill"><span className="live-dot"/> OPEN</span></div>
            <div className="panel-title">The next person<br/><strong>could be right here.</strong></div>
            <div className="profile-stack">
              {talent.slice(0,4).map((t, i) => <div className="mini-profile" key={t.name}>
                <div className={`avatar avatar-${t.tone}`}>{t.code}</div>
                <div><b>{t.name}</b><span>{t.family}</span></div>
                <span className="profile-check">✓</span>
              </div>)}
            </div>
            <div className="panel-foot"><span><Clock3 size={15}/> Curated around the role</span><a href={CALENDLY} target="_blank" rel="noreferrer">Meet the team <ArrowUpRight size={14}/></a></div>
          </div>
          <div className="floating-stat stat-one"><span>Role coverage</span><strong>6 functions</strong></div>
          <div className="floating-stat stat-two"><span>Engagement</span><strong>Flexible</strong></div>
        </div>
      </div>
    </section>

    <Ticker label="TECH + DIGITAL" items={tech}/>

    <section className="section section-light role-intro" id="roles">
      <div className="container">
        <div className="section-head split-head"><div><SectionLabel eyebrow="01 / WHAT WE STAFF">More than tech hiring.</SectionLabel></div><p>Your roadmap needs more than developers. Build the whole layer around the work—from the engineer writing the product to the people selling it, supporting it and keeping the business running.</p></div>
        <RoleExplorer />
      </div>
    </section>

    <section className="section dark-section process-preview">
      <div className="container">
        <div className="section-head split-head light-head"><div><SectionLabel eyebrow="02 / HOW IT WORKS">One process. Any function.</SectionLabel></div><p>Whether the brief is for engineering, sales, HR, operations or finance, the path stays simple: understand the work, curate the right people, meet, then move.</p></div>
        <div className="process-grid">
          <ProcessStep number="01" title="Role Scoping" desc="Define competencies, seniority level, compensation, and team dynamics." kicker="REQUIREMENT BRIEF" icon={<Target/>} />
          <ProcessStep number="02" title="Candidate Screening" desc="Targeted sourcing and rigorous vetting to deliver top 2–3 finalists." kicker="TOP 3% TALENT" icon={<UserRoundSearch/>} />
          <ProcessStep number="03" title="Direct Interviews" desc="Speak directly with pre-screened finalists coordinated around your calendar." kicker="DIRECT DIALOGUE" icon={<Handshake/>} />
          <ProcessStep number="04" title="Placement & Onboarding" desc="Turnkey employment agreements, global payroll, compliance, and Day-1 ramp-up." kicker="TURNKEY SCALE" icon={<Workflow/>} />
        </div>
        <div className="dark-cta-row"><div><span className="tiny-overline">READY WHEN YOU ARE</span><strong>Scale your team with verified specialists.</strong></div><PrimaryButton dark>Start the conversation</PrimaryButton></div>
      </div>
    </section>

    <section className="section red-section statement-section">
      <div className="container statement-layout statement-layout-refined">
        <div className="statement-side">
          <span className="statement-index">ANTI.AI / 06 FUNCTIONS</span>
          <div className="statement-word">STAFF<br/>THE<br/>WHOLE</div>
          <div className="statement-side-note">Technology · Commercial · People · Finance · Growth · Support</div>
        </div>
        <div className="statement-main">
          <span className="tiny-overline">WHY ANTI.AI STAFFING</span>
          <h2>Not just the role.<br/><em>The people around it.</em></h2>
          <p>A strong team is rarely one job title. Build the technical, commercial and operational layer around the work—without turning every gap into a separate hiring project.</p>
          <div className="statement-chips">
            {['Technology & AI','Sales & BDE','HR & Talent','Finance & Operations','Marketing & Growth','Customer & Support'].map((item, i) => <span key={item} style={{'--i': i}}>{item}</span>)}
          </div>
          <PrimaryButton dark>Talk to a specialist</PrimaryButton>
        </div>
      </div>
    </section>

    <section className="section section-light showcase-section">
      <div className="container">
        <div className="section-head split-head"><div><SectionLabel eyebrow="03 / REPRESENTATIVE TALENT">See the range, not just the resume.</SectionLabel></div><p>Representative profiles show how ANTI.AI can present talent across functions. Connect this layer to the staffing portal when real profiles are ready.</p></div>
        <StaffingShowcaseWall />
      </div>
    </section>

    <section className="section cream-section">
      <div className="container"><div className="section-head split-head"><div><SectionLabel eyebrow="04 / ENGAGEMENTS">Choose the shape of the engagement.</SectionLabel></div><p>Use the model that matches the business need instead of forcing every requirement into the same hiring motion.</p></div>
        <div className="engagement-grid">
          <Engagement label="01" title="Staff Augmentation" desc="Add one specialist directly into an existing team or function." bullets={['Embedded with your team','Flexible capacity','You stay in control']} />
          <Engagement label="02" title="Dedicated Team" desc="Build a focused multi-role team around a product, process or growth target." bullets={['Multi-role team','Shared delivery ownership','Scale as needs change']} featured />
          <Engagement label="03" title="Project / Outcome" desc="Define the outcome and let the team own the path to completion." bullets={['Defined scope','Leadership included','Outcome-focused']} />
        </div>
      </div>
    </section>

    <section className="section section-light tools-section">
      <div className="container">
        <div className="section-head split-head"><div><SectionLabel eyebrow="05 / WORK WITH YOUR STACK">Technology is only one layer.</SectionLabel></div><p>We can align people with the tools your teams already use across engineering, sales, finance, operations, marketing and support.</p></div>
        <div className="tool-board">
          <div className="tool-board-head"><span>TECH + PRODUCT</span><span className="tool-count">01</span></div>
          <ToolCloud items={tech}/>
          <div className="tool-board-divider"></div>
          <div className="tool-board-head"><span>BUSINESS + OPERATIONS</span><span className="tool-count">02</span></div>
          <ToolCloud items={businessTools}/>
        </div>
      </div>
    </section>

    <section className="section section-light industries-preview">
      <div className="container"><div className="section-head split-head"><div><SectionLabel eyebrow="06 / INDUSTRIES">Built for teams with something to move.</SectionLabel></div><p>From startups to established businesses, staffing can be the fastest way to add capability without rebuilding the organisation around every new need.</p></div>
        <div className="industry-grid">{industries.map(([title,desc],i)=><div className="industry-card" key={title}><span>0{i+1}</span><h3>{title}</h3><p>{desc}</p></div>)}</div>
      </div>
    </section>

    <section className="final-cta">
      <div className="final-noise"></div>
      <div className="container final-cta-inner"><div><span className="tiny-overline">LET'S BUILD THE TEAM</span><h2>Your next hire should <em>change the pace.</em></h2></div><div className="final-side"><p>Tell us what is blocked, which function is missing and what you need the person to deliver. We’ll take it from there.</p><PrimaryButton dark>Schedule with ANTI.AI</PrimaryButton></div></div>
    </section>
  </>;
}

function Ticker({ label, items }) {
  return <section className="signal-strip"><div className="container signal-inner"><span>{label}</span><div className="tech-marquee"><div className="tech-marquee-track">{[...items, ...items].map((x,i)=><span key={`${x}-${i}`}>{x}</span>)}</div></div></div></section>;
}

function RoleExplorer() {
  const [active, setActive] = useState(roleFamilies[0].id);
  const current = roleFamilies.find(item => item.id === active) || roleFamilies[0];
  return <div className="role-explorer">
    <div className="role-nav">
      <div className="role-nav-title"><span>FUNCTIONS</span><strong>What does the team need?</strong></div>
      {roleFamilies.map((family, index) => <button key={family.id} className={active === family.id ? 'role-tab is-active' : 'role-tab'} onClick={() => setActive(family.id)}>
        <span className="role-tab-num">0{index + 1}</span><span className="role-tab-icon"><RoleIcon type={family.icon} size={17}/></span><span>{family.title}</span><ArrowUpRight size={15}/>
      </button>)}
    </div>
    <div className={`role-detail role-tone-${current.accent}`}>
      <div className="role-detail-top"><div><span className="role-kicker">{current.kicker}</span><h3>{current.title}</h3></div><div className="role-detail-icon"><RoleIcon type={current.icon} size={26}/></div></div>
      <p>{current.description}</p>
      <div className="role-list">{current.roles.map((role, i) => <div key={role} className="role-list-item"><span>0{i + 1}</span><b>{role}</b></div>)}</div>
      <div className="role-detail-foot"><span>Need a specific combination?</span><a href={CALENDLY} target="_blank" rel="noreferrer">Discuss the role <ArrowUpRight size={15}/></a></div>
    </div>
  </div>;
}

function TalentCardItem({ t, onSkillClick }) {
  const skillsList = t.skills || (t.stack ? t.stack.split(' · ') : []);

  return (
    <article className={`talent-card-modern tc-tone-${t.tone}`}>
      <div className="tc-header">
        <div className="tc-avatar-block">
          <div className={`tc-avatar tc-avatar-${t.tone}`}>
            {t.code}
          </div>
          <div className="tc-meta">
            <span className="tc-seniority">{t.seniority || 'Senior'}</span>
            <span className="tc-family">{t.family}</span>
          </div>
        </div>
        <div className="tc-status">
          <span className="tc-live-dot" />
          <span>AVAILABLE</span>
        </div>
      </div>

      <div className="tc-body">
        <h3 className="tc-title">{t.name}</h3>
        {t.highlight && <p className="tc-highlight">{t.highlight}</p>}
        <div className="tc-skills">
          {skillsList.slice(0, 4).map(skill => (
            <button
              type="button"
              className="tc-chip"
              key={skill}
              onClick={(e) => {
                e.stopPropagation();
                if (onSkillClick) onSkillClick(skill);
              }}
              title={onSkillClick ? `Filter by ${skill}` : undefined}
            >
              {skill}
            </button>
          ))}
          {skillsList.length > 4 && (
            <span className="tc-chip tc-chip-more">
              +{skillsList.length - 4} more
            </span>
          )}
        </div>
      </div>

      <div className="tc-footer">
        <div className="tc-tz">
          <Globe2 size={12} className="tc-tz-icon" />
          <span>{t.timezone || 'US & Global Overlap'}</span>
        </div>
        <div className="tc-actions-cluster">
          <a
            href={CALENDLY}
            target="_blank"
            rel="noreferrer"
            className="tc-action-btn"
            aria-label={`Discuss hiring for ${t.name}`}
          >
            <span>Discuss</span>
            <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </article>
  );
}

function StaffingCardItem({ t }) {
  return (
    <article
      className="staffing-card is-interactive"
      onClick={() => window.open(CALENDLY, '_blank', 'noopener,noreferrer')}
    >
      <div className="staffing-card-top">
        <div className={`staffing-card-badge staffing-badge-${t.tone || 'black'}`}>
          {t.code}
        </div>
        <div className="staffing-card-status">
          <span className="staffing-status-dot" />
          <span>AVAILABLE</span>
        </div>
      </div>
      <div className="staffing-card-body">
        <span className="staffing-card-meta">{t.meta}</span>
        <h3 className="staffing-card-title">{t.name}</h3>
        <p className="staffing-card-stack">{t.stack}</p>
      </div>
      <div className="staffing-card-foot">
        <span className="staffing-card-family">{t.family}</span>
        <a
          href={CALENDLY}
          target="_blank"
          rel="noreferrer"
          className="staffing-card-link"
          onClick={(e) => e.stopPropagation()}
          aria-label={`Discuss hiring for ${t.name}`}
        >
          <span>Discuss</span>
          <ArrowUpRight size={13} strokeWidth={2.2} />
        </a>
      </div>
    </article>
  );
}

function StaffingShowcaseWall() {
  const showcaseRoles = [
    'AI / ML Engineer',
    'Business Development Executive',
    'HR Executive',
    'Finance Associate',
    'Full-Stack Engineer'
  ];

  const items = showcaseRoles.map(roleName => {
    return talent.find(t => t.name === roleName) || {
      name: roleName,
      code: roleName.slice(0, 2).toUpperCase(),
      tone: 'black',
      meta: 'SENIOR',
      stack: '',
      family: 'ANTI.AI'
    };
  });

  return (
    <div className="staffing-talent-grid">
      {items.map((t) => (
        <StaffingCardItem t={t} key={t.name} />
      ))}
      <NavLink to="/talent" className="staffing-card staffing-card-explore is-interactive">
        <div className="staffing-card-top">
          <div className="staffing-card-badge staffing-badge-red">
            <ArrowUpRight size={18} strokeWidth={2.4} />
          </div>
          <div className="staffing-card-status">
            <span className="staffing-status-dot" />
            <span>AVAILABLE</span>
          </div>
        </div>
        <div className="staffing-card-body">
          <span className="staffing-card-meta">ALL 6 FUNCTIONS · ROSTER</span>
          <h3 className="staffing-card-title">Explore more</h3>
          <p className="staffing-card-stack">Browse 30+ pre-vetted specialists across all functions</p>
        </div>
        <div className="staffing-card-foot">
          <span className="staffing-card-family">All 6 Functions</span>
          <span className="staffing-card-link">
            <span>Explore all</span>
            <ArrowUpRight size={13} strokeWidth={2.2} />
          </span>
        </div>
      </NavLink>
    </div>
  );
}

function TalentWall({ items, showMoreCard = false }) {
  return <StaffingShowcaseWall />;
}

function ToolCloud({ items }) {
  return <div className="tool-cloud">{items.map((tool, i) => <span key={`${tool}-${i}`}>{tool}</span>)}</div>;
}

function ProcessStep({ number, title, desc, kicker, icon }) {
  return <div className="process-step">
    <div className="process-step-top"><span className="process-number">{number}</span><span className="process-kicker">{kicker}</span></div>
    <div className="process-icon">{icon}</div>
    <div className="process-step-copy"><h3>{title}</h3><p>{desc}</p></div>
    <div className="process-step-line" aria-hidden="true"/>
  </div>;
}

function Capability({ icon, title, desc, tag, large }) { return <article className={`cap-card ${large ? 'cap-large' : ''}`}><div className="cap-icon">{icon}</div><span className="card-tag">{tag}</span><h3>{title}</h3><p>{desc}</p><ArrowUpRight className="card-arrow" size={18}/></article> }
function Engagement({ label, title, desc, bullets, featured }) { return <article className={`eng-card ${featured ? 'eng-featured' : ''}`}><span>{label}</span><h3>{title}</h3><p>{desc}</p><div className="bullets">{bullets.map(b => <div key={b}><span>+</span>{b}</div>)}</div></article> }

function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: '01',
      title: 'Role Scoping',
      kicker: '01 / REQUIREMENT BRIEF',
      badge: '< 24H INTAKE',
      desc: 'Define role requirements, required competencies, and market compensation benchmarks.',
      timeline: 'Active in < 24h',
      process: [
        { label: '30-Min Intake Call', detail: 'Understand required skills, seniority level, and team dynamics.' },
        { label: 'Market Benchmarking', detail: 'Calibrate competitive salary benchmarks to attract high-caliber talent.' },
        { label: 'Role Specification', detail: 'Finalize core deliverables, KPIs, and structured interview rubrics.' }
      ],
      deliverables: [
        { title: 'Custom Hiring Specification', detail: 'Approved role scorecard mapped to your exact deliverables.' },
        { title: 'Dedicated Talent Lead', detail: 'Single point of contact managing the search from day one.' }
      ],
      tags: ['30-Min Intake', 'Market Benchmarking', 'Dedicated Talent Lead']
    },
    {
      number: '02',
      title: 'Candidate Screening',
      kicker: '02 / SOURCING & VETTING',
      badge: 'TOP 3% SCREENED',
      desc: 'Multi-stage screening for domain expertise, verified track records, and communication.',
      timeline: 'Shortlists in 48–72h',
      process: [
        { label: 'Targeted Sourcing', detail: 'Active search across our pre-screened talent network across all 6 business functions.' },
        { label: 'Skill & Background Checks', detail: 'Rigorous competency evaluations, work portfolio audits, and reference verification.' },
        { label: 'Culture & Communication', detail: 'In-depth interviews assessing work ethic, proactive communication, and ownership.' }
      ],
      deliverables: [
        { title: '2–3 Curated Finalist Dossiers', detail: 'Complete candidate profiles with work samples, notes, and transparent rates.' },
        { title: 'Zero Resume Dumps', detail: 'Only candidates matching 100% of your criteria reach your desk.' }
      ],
      tags: ['Top 3% Vetted', '2–3 Finalist Profiles', 'Reference Checks']
    },
    {
      number: '03',
      title: 'Direct Interviews',
      kicker: '03 / INTERVIEW COORDINATION',
      badge: 'DIRECT DIALOGUE',
      desc: 'Interview pre-screened finalists directly on your schedule with zero administrative friction.',
      timeline: 'Fast 48h Cycles',
      process: [
        { label: 'Direct Calendar Booking', detail: '1-click interview scheduling synced to your hiring managers’ availability.' },
        { label: 'Candidate Pre-Briefing', detail: 'Finalists arrive fully aligned on your company mission, roadmap, and expectations.' },
        { label: 'Same-Day Debriefs', detail: 'Rapid feedback coordination to maintain momentum and secure top candidates quickly.' }
      ],
      deliverables: [
        { title: 'Frictionless Scheduling', detail: 'Direct calendar integration with zero recruiter gatekeeping or delays.' },
        { title: 'Structured Scorecards', detail: 'Standardized evaluation criteria to compare finalists with total clarity.' }
      ],
      tags: ['Direct Calendar Booking', 'Pre-Briefed Candidates', 'Rapid Feedback Loops']
    },
    {
      number: '04',
      title: 'Placement & Onboarding',
      kicker: '04 / COMPLIANCE & RETENTION',
      badge: 'TURNKEY ONBOARDING',
      desc: 'Turnkey employment agreements, global payroll compliance, and seamless Day-1 onboarding.',
      timeline: 'Day-1 Ready',
      process: [
        { label: 'Compliant Contracts & IP', detail: 'Enforceable employment agreements, full IP protection, and confidentiality NDAs.' },
        { label: 'Global Payroll & Taxes', detail: 'Turnkey international payroll, statutory benefits, and tax compliance across 40+ countries.' },
        { label: 'Day-1 Ramp-Up Support', detail: 'Structured kickoff playbooks, system access setup, and ongoing 30/60/90-day checkpoints.' }
      ],
      deliverables: [
        { title: '100% Legal & IP Security', detail: 'Fully compliant international contracts safeguarding your business and IP.' },
        { title: 'Replacement Guarantee', detail: 'Continuous HR support and full replacement guarantee for complete confidence.' }
      ],
      tags: ['Turnkey Contracts', 'Global Payroll & EOR', 'Replacement Guarantee']
    }
  ];

  return (
    <PageFrame
      eyebrow="HOW IT WORKS"
      title={<>Built for velocity.<br/><em>Designed for exceptional teams.</em></>}
      intro="A streamlined, 4-step HR staffing solution connecting ambitious companies with vetted talent across technical, commercial, and operational functions."
    >
      <section className="section section-light" id="process">
        <div className="container">
          <div className="step-stack">
            {steps.map((s, i) => {
              const isActive = activeStep === i;
              return (
                <div
                  className={`big-step ${isActive ? 'is-active' : ''}`}
                  key={s.number}
                  onMouseEnter={() => setActiveStep(i)}
                  onClick={() => setActiveStep(isActive ? null : i)}
                >
                  <div className="big-step-header">
                    <div className="big-step-num-wrap">
                      <span className="big-step-num">{s.number}</span>
                      <span className="big-step-line-indicator" />
                    </div>
                    <div className="big-step-heading">
                      <div className="big-step-kicker-row">
                        <span className="big-step-kicker">{s.kicker}</span>
                        <span className="big-step-badge">{s.badge}</span>
                      </div>
                      <h3 className="big-step-title">{s.title}</h3>
                      <p className="big-step-desc">{s.desc}</p>
                    </div>
                    <div className="big-step-toggle-btn" aria-label="Toggle stage details">
                      <ChevronRight size={18} className="big-step-chevron" />
                    </div>
                  </div>

                  <div className="big-step-drawer">
                    <div className="big-step-drawer-inner">
                      <div className="big-step-body">
                        
                        {/* Left Column: HR Process (What We Do) */}
                        <div className="step-process-col">
                          <div className="step-col-head">
                            <span className="step-col-eyebrow">HR RECRUITMENT PROCESS</span>
                            <span className="step-col-sub">3-step precision workflow</span>
                          </div>
                          
                          <div className="step-process-list">
                            {s.process.map((p, pIdx) => (
                              <div className="step-process-item" key={p.label}>
                                <div className="step-marker-col">
                                  <span className="step-marker-dot">{pIdx + 1}</span>
                                  {pIdx < s.process.length - 1 && <span className="step-marker-line" />}
                                </div>
                                <div className="step-item-content">
                                  <h4 className="step-item-title">{p.label}</h4>
                                  <p className="step-item-desc">{p.detail}</p>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="step-tag-pills">
                            {s.tags.map(t => (
                              <span className="step-pill" key={t}>{t}</span>
                            ))}
                          </div>
                        </div>

                        {/* Right Column: Client Deliverables (What You Receive) */}
                        <div className="step-deliverable-card">
                          <div className="deliv-card-head">
                            <div className="deliv-title-wrap">
                              <span className="deliv-live-dot" />
                              <span className="deliv-head-title">CLIENT DELIVERABLES</span>
                            </div>
                            <span className="deliv-timeline-pill">{s.timeline}</span>
                          </div>

                          <div className="deliv-card-body">
                            {s.deliverables.map(d => (
                              <div className="deliv-item" key={d.title}>
                                <div className="deliv-icon-box">
                                  <CheckCircle2 size={15} />
                                </div>
                                <div className="deliv-text-box">
                                  <h4 className="deliv-item-title">{d.title}</h4>
                                  <p className="deliv-item-detail">{d.detail}</p>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="deliv-card-foot">
                            <ShieldCheck size={15} className="deliv-guarantee-icon" />
                            <span>Managed end-to-end by your dedicated ANTI.AI talent specialist.</span>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="section dark-section">
        <div className="container two-col-feature">
          <div>
            <SectionLabel eyebrow="THE OPERATING PRINCIPLE">Built for momentum.</SectionLabel>
            <h2>Engineered for quality, <em>driven by people.</em></h2>
          </div>
          <div className="feature-list">
            <div>
              <ShieldCheck/>
              <b>Curated Shortlists</b>
              <span>Top 2–3 pre-screened specialists delivered in 48–72 hours across any of our 6 core functions.</span>
            </div>
            <div>
              <UsersRound/>
              <b>Vetted for Execution</b>
              <span>Every candidate is evaluated for practical expertise, verified references, and culture fit.</span>
            </div>
            <div>
              <Zap/>
              <b>Turnkey HR & Compliance</b>
              <span>Seamless contracts, global payroll in 40+ countries, and complete hiring support.</span>
            </div>
          </div>
        </div>
      </section>
      <section className="section section-light">
        <div className="container cta-panel">
          <div>
            <span className="tiny-overline">READY TO BUILD</span>
            <h2>Bring exceptional talent into your next milestone.</h2>
          </div>
          <PrimaryButton/>
        </div>
      </section>
    </PageFrame>
  );
}

function Talent() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterParam = searchParams.get('filter') || 'All';
  const queryParam = searchParams.get('q') || '';

  const [filter, setFilterState] = useState(filterParam);
  const [searchQuery, setSearchQueryState] = useState(queryParam);

  useEffect(() => {
    const qf = searchParams.get('filter') || 'All';
    const qq = searchParams.get('q') || '';
    setFilterState(qf);
    setSearchQueryState(qq);
  }, [searchParams]);

  const updateFilters = (newFilter, newQuery) => {
    setFilterState(newFilter);
    setSearchQueryState(newQuery);
    const params = {};
    if (newFilter && newFilter !== 'All') params.filter = newFilter;
    if (newQuery && newQuery.trim()) params.q = newQuery.trim();
    setSearchParams(params, { replace: true });
  };

  const handleFilterChange = (cat) => {
    updateFilters(cat, searchQuery);
  };

  const handleSearchChange = (query) => {
    updateFilters(filter, query);
  };

  const handleClearSearch = () => {
    updateFilters(filter, '');
  };

  const handleResetAll = () => {
    updateFilters('All', '');
  };

  const handleSkillClick = (skill) => {
    updateFilters(filter, skill);
  };

  const filters = ['All', ...roleFamilies.map(f => f.title)];

  const matchesSearchTerm = (t, q) => {
    if (!q) return true;
    const tokens = q.toLowerCase().trim().split(/\s+/).filter(Boolean);
    const searchTarget = [
      t.name,
      t.family,
      t.seniority,
      t.code,
      t.timezone,
      t.meta,
      t.highlight,
      ...(t.skills || []),
      ...(t.stack ? t.stack.split(' · ') : [])
    ].filter(Boolean).join(' ').toLowerCase();

    return tokens.every(tok => searchTarget.includes(tok));
  };

  const categoryCounts = useMemo(() => {
    const counts = {};
    const q = searchQuery.trim();
    counts.All = talent.filter(t => matchesSearchTerm(t, q)).length;
    roleFamilies.forEach(f => {
      counts[f.title] = talent.filter(t => t.family === f.title && matchesSearchTerm(t, q)).length;
    });
    return counts;
  }, [searchQuery]);

  const totalMatchesAcrossAll = useMemo(() => {
    const q = searchQuery.trim();
    if (!q) return talent.length;
    return talent.filter(t => matchesSearchTerm(t, q)).length;
  }, [searchQuery]);

  const filtered = useMemo(() => {
    const q = searchQuery.trim();
    return talent.filter(t => {
      const matchesCategory = filter === 'All' || t.family === filter;
      const matchesSearch = matchesSearchTerm(t, q);
      return matchesCategory && matchesSearch;
    });
  }, [filter, searchQuery]);

  return (
    <PageFrame
      eyebrow="TALENT"
      title={<>Talent for the <em>next problem.</em></>}
      intro="A curated directory of pre-screened specialists across technical, commercial, HR, finance, marketing and operational functions."
    >
      <section className="section section-light talent-page-section" id="profiles">
        <div className="container">

          {/* Top Filter & Search Bar */}
          <div className="talent-filter-header">
            <div className="talent-search-row">
              <div className="talent-search-box">
                <Search size={15} className="talent-search-icon" />
                <input
                  type="text"
                  placeholder="Search by role, skill, seniority, timezone..."
                  value={searchQuery}
                  onChange={e => handleSearchChange(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Escape') handleClearSearch();
                  }}
                  className="talent-search-input"
                  aria-label="Search talent directory"
                />
                {searchQuery && (
                  <button
                    className="talent-search-clear"
                    onClick={handleClearSearch}
                    aria-label="Clear search"
                    title="Clear search (Esc)"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>

              {(searchQuery || filter !== 'All') && (
                <button
                  type="button"
                  className="talent-reset-btn"
                  onClick={handleResetAll}
                  title="Reset all filters and search"
                >
                  <X size={13} />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>

            <div className="talent-filter-tabs" role="tablist">
              {filters.map(item => {
                const count = categoryCounts[item] ?? 0;
                const isActive = filter === item;
                const isDisabled = count === 0 && searchQuery.trim() !== '';

                return (
                  <button
                    key={item}
                    role="tab"
                    aria-selected={isActive}
                    className={`talent-filter-tab ${isActive ? 'is-active' : ''} ${isDisabled ? 'is-zero' : ''}`}
                    onClick={() => handleFilterChange(item)}
                  >
                    <span>{item}</span>
                    <span className="tab-count">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results Summary Bar */}
          <div className="talent-results-meta">
            <div className="talent-meta-left">
              <span>
                Showing <b>{filtered.length}</b> verified candidate {filtered.length === 1 ? 'profile' : 'profiles'}
                {filter !== 'All' ? <> in <b>{filter}</b></> : ''}
                {searchQuery ? <> matching <b>"{searchQuery}"</b></> : ''}
              </span>
              {searchQuery && (
                <span className="talent-active-tag">
                  "{searchQuery}"
                  <button onClick={handleClearSearch} aria-label="Remove search filter">×</button>
                </span>
              )}
            </div>
            <span className="talent-meta-hint">⚡ Top 3% pre-screened & interview-ready</span>
          </div>

          {/* Talent Cards Grid */}
          {filtered.length > 0 ? (
            <div className="talent-grid-modern">
              {filtered.map(t => (
                <TalentCardItem
                  t={t}
                  key={t.name}
                  onSkillClick={handleSkillClick}
                />
              ))}
            </div>
          ) : (
            <div className="talent-empty-state">
              <Search size={34} className="empty-search-icon" />
              <h3>No matching candidates found</h3>
              {filter !== 'All' && totalMatchesAcrossAll > 0 ? (
                <p>
                  No candidates found in <strong>{filter}</strong> matching "{searchQuery}", but <strong>{totalMatchesAcrossAll}</strong> candidate {totalMatchesAcrossAll === 1 ? 'profile' : 'profiles'} match in other functions.
                </p>
              ) : (
                <p>
                  We actively source bespoke roles beyond our representative pool. Tell us your exact specifications or try another search term.
                </p>
              )}
              <div className="talent-empty-actions">
                {filter !== 'All' && totalMatchesAcrossAll > 0 && (
                  <button
                    type="button"
                    className="btn btn-red"
                    onClick={() => handleFilterChange('All')}
                  >
                    View {totalMatchesAcrossAll} matches across all functions
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={handleResetAll}
                >
                  Clear search & reset filters
                </button>
                <a
                  href={CALENDLY}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-ghost-dark"
                >
                  Request custom candidate search <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="section talent-bottom-cta">
        <div className="container talent-cta-grid">
          <div>
            <SectionLabel eyebrow="HIRE WITH INTENT">Need a specific combination?</SectionLabel>
            <h2>Describe the role.<br/><em>We shape the search.</em></h2>
          </div>
          <div>
            <p>Share the function, seniority, tools, timezone overlap, and deliverables you’re hiring for. Our HR team launches a custom search within 24 hours.</p>
            <PrimaryButton/>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}

function Industries() {
  return <PageFrame eyebrow="INDUSTRIES" title={<>Different businesses.<br/><em>Same need for momentum.</em></>} intro="Position ANTI.AI wherever the roadmap is constrained by skill gaps, hiring latency or a sudden increase in delivery demand.">
    <section className="section section-light" id="list"><div className="container industry-list">{industries.map(([title, desc], i) => <article key={title}><div className="industry-num">0{i + 1}</div><div><h3>{title}</h3><p>{desc}</p></div><div className="industry-roles"><span>Technology</span><span>Business</span><span>Operations</span></div></article>)}</div></section>
    <section className="section red-section"><div className="container two-col-feature red-feature"><div><span className="tiny-overline">FROM GAP TO CAPACITY</span><h2>Staffing is a lever, <em>not a destination.</em></h2></div><div><p>Accelerate critical milestones, add AI capability, expand sales capacity, strengthen HR or finance operations—and build an exceptional team around your growth priorities.</p><PrimaryButton dark>Plan an engagement</PrimaryButton></div></div></section>
  </PageFrame>;
}

function Contact() {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(CALENDLY);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2400);
  };

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText('services@antiai.ltd');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  const FAQS = [
    {
      q: 'How fast can we interview the first pre-screened candidates?',
      a: 'Within 48 hours of our initial scoping call. Our talent leads curate a targeted dossier of 2–3 pre-vetted finalists mapped to your specific deliverable scorecard and timezone overlap requirements.'
    },
    {
      q: 'How does the 14-day risk-free trial work?',
      a: 'Every specialist placement starts with a 14-day trial period. If you find the specialist is not the right fit for your team dynamic or deliverable pace, you pay nothing and we provide an immediate replacement.'
    },
    {
      q: 'Do you manage international contracts, IP protection, and payroll?',
      a: 'Yes, 100% turnkey. ANTI.AI administers compliant international employment agreements, strict intellectual property assignment, mutual NDAs, and global payroll so your team stays legally protected.'
    },
    {
      q: 'Can we hire across multiple non-engineering departments?',
      a: 'Yes. ANTI.AI provides full cross-functional coverage across 6 core domains: Technology & AI, Sales & Business Development, HR & People Ops, Finance & Operations, Marketing, and Customer Success.'
    }
  ];

  return (
    <PageFrame
      eyebrow="CONTACT"
      title={<>Let's talk about<br/><em>the work.</em></>}
      intro="Give us the context. We’ll make the next conversation immediately useful."
    >
      {/* SLA Guarantees Section */}
      <section className="contact-sla-strip">
        <div className="container">
          <div className="contact-sla-grid">
            <div className="sla-card">
              <div className="sla-card-header">
                <span className="sla-card-icon"><Clock3 size={16} /></span>
                <span className="sla-metric-tag">&lt; 24H SLA</span>
              </div>
              <h3 className="sla-card-title">Same-Day Intake Review</h3>
              <p className="sla-card-desc">Every role brief is analyzed and confirmed within 24 hours by a senior staffing partner.</p>
            </div>

            <div className="sla-card">
              <div className="sla-card-header">
                <span className="sla-card-icon"><Target size={16} /></span>
                <span className="sla-metric-tag">&lt; 48H SPEED</span>
              </div>
              <h3 className="sla-card-title">Pre-Screened Finalists</h3>
              <p className="sla-card-desc">Top 2–3 vetted candidates aligned to your technical stack and timezone overlap.</p>
            </div>

            <div className="sla-card">
              <div className="sla-card-header">
                <span className="sla-card-icon"><ShieldCheck size={16} /></span>
                <span className="sla-metric-tag">14-DAY TRIAL</span>
              </div>
              <h3 className="sla-card-title">Risk-Free Guarantee</h3>
              <p className="sla-card-desc">Zero financial commitment if the fit and deliverable velocity aren't seamless on Day 1.</p>
            </div>

            <div className="sla-card">
              <div className="sla-card-header">
                <span className="sla-card-icon"><Handshake size={16} /></span>
                <span className="sla-metric-tag">DIRECT ACCESS</span>
              </div>
              <h3 className="sla-card-title">Zero Recruiter Middlemen</h3>
              <p className="sla-card-desc">Direct dialogue with founders and engineering leads who understand production code.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Primary Action Hub: Calendly & Interactive Brief Builder */}
      <section className="section section-light contact-main-section" id="channels">
        <div className="container contact-hub-layout">
          
          {/* Left Column: Direct Calendly Booking */}
          <div className="contact-hub-card contact-calendly-card">
            <div className="ch-card-top">
              <span className="ch-overline">FASTEST ROUTE // LIVE CALENDAR</span>
              <span className="ch-live-pill"><span className="ch-live-dot" /> SLOTS OPEN</span>
            </div>

            <h2>Book a 30-minute scoping session.</h2>
            <p className="ch-card-lead">
              Skip back-and-forth emails. Reserve a direct video call with Tanishq & the ANTI.AI staffing leads to align on role scorecard, technical stack, and market compensation benchmarks.
            </p>

            <div className="ch-action-buttons">
              <PrimaryButton href={CALENDLY}>
                Open Calendly (30 Min)
              </PrimaryButton>
              <button
                type="button"
                className="btn btn-ghost-dark ch-copy-btn"
                onClick={handleCopyLink}
              >
                {copiedLink ? <Check size={15} color="#16a34a" /> : <Copy size={15} />}
                <span>{copiedLink ? 'Copied link!' : 'Copy invite link'}</span>
              </button>
            </div>

            <div className="ch-perks-list">
              <div className="ch-perk-item">
                <CheckCircle2 size={16} className="ch-perk-icon" />
                <div>
                  <strong>Direct Founder & Technical Presence</strong>
                  <span>No junior screener handoffs — structured scoping from the start.</span>
                </div>
              </div>
              <div className="ch-perk-item">
                <CheckCircle2 size={16} className="ch-perk-icon" />
                <div>
                  <strong>Market Compensation Calibration</strong>
                  <span>Benchmark realistic compensation bands for your exact stack.</span>
                </div>
              </div>
              <div className="ch-perk-item">
                <CheckCircle2 size={16} className="ch-perk-icon" />
                <div>
                  <strong>Candidate Delivery Date Locked In</strong>
                  <span>Leave the call with an agreed date for your first dossier (&lt;48h).</span>
                </div>
              </div>
            </div>

            <div className="ch-card-footer">
              <PhoneCall size={16} className="ch-foot-icon" />
              <span>Official scheduling link via ANTI.AI Calendly. Direct calendar booking in a new tab.</span>
            </div>
          </div>

          {/* Right Column: Direct Email & Scoping Context (No forms) */}
          <div className="contact-hub-card contact-email-card">
            <div className="ch-card-top">
              <span className="ch-overline">DIRECT CORRESPONDENCE</span>
              <span className="ch-sla-pill">&lt; 24H RESPONSE</span>
            </div>

            <h3>Prefer direct email?</h3>
            <p className="ch-card-lead">
              Send your job specification or rough skill wishlist straight to our staffing leads. A senior partner reviews role availability and responds within 24 hours.
            </p>

            <div className="ch-email-action-box">
              <a href="mailto:services@antiai.ltd" className="ch-mail-button">
                <Mail size={16} />
                <span>services@antiai.ltd</span>
                <ArrowUpRight size={15} className="ch-mail-arrow" />
              </a>
              <button
                type="button"
                className="btn btn-ghost-dark ch-copy-btn"
                onClick={handleCopyEmail}
              >
                {copiedEmail ? <Check size={15} color="#16a34a" /> : <Copy size={15} />}
                <span>{copiedEmail ? 'Copied email!' : 'Copy address'}</span>
              </button>
            </div>

            <div className="ch-context-guidelines">
              <span className="ch-guide-title">
                <FileText size={14} /> Helpful context to include
              </span>
              <ul className="ch-guide-list">
                <li>Target role(s), primary stack, and seniority level</li>
                <li>Desired start date and timezone overlap requirements</li>
                <li>Key 90-day deliverables or roadmap constraints</li>
                <li>Working cadence (embedded individual or dedicated team)</li>
              </ul>
            </div>

            <div className="ch-card-footer">
              <Clock3 size={15} className="ch-foot-icon" />
              <span>Dedicated partner review. No automated auto-responder dead-ends.</span>
            </div>
          </div>

        </div>
      </section>

      {/* Structured 30-Minute Agenda Breakdown */}
      <section className="section cream-section contact-agenda-section">
        <div className="container">
          <div className="section-head split-head">
            <div>
              <SectionLabel eyebrow="01 / WHAT TO EXPECT">The 30-Minute Call Breakdown.</SectionLabel>
            </div>
            <p>
              No high-pressure sales scripts. We run every discovery call like an engineering sprint calibration so you get immediate clarity on timing, talent availability, and market rates.
            </p>
          </div>

          <div className="contact-agenda-grid">
            <div className="agenda-card">
              <div className="agenda-time-pill">00 — 10 MIN</div>
              <h3>Role Calibration & Deliverables</h3>
              <p>We unpack the exact work to be done, technical stack, timezone overlap requirements, and primary 90-day success metrics.</p>
              <div className="agenda-bullets">
                <span>+ Skill matrix & competencies</span>
                <span>+ Team cadence & working hours</span>
              </div>
            </div>

            <div className="agenda-card">
              <div className="agenda-time-pill">10 — 20 MIN</div>
              <h3>Market Velocity & Comp Bands</h3>
              <p>We evaluate current market salary benchmarks and determine the right engagement model (embedded specialist vs dedicated team).</p>
              <div className="agenda-bullets">
                <span>+ Real-time salary benchmark check</span>
                <span>+ Engagement shape evaluation</span>
              </div>
            </div>

            <div className="agenda-card">
              <div className="agenda-time-pill">20 — 30 MIN</div>
              <h3>Dossier Roadmap & Next Steps</h3>
              <p>We finalize the role scorecard and agree on the specific delivery date for your first curated candidate dossier (&lt;48 hours).</p>
              <div className="agenda-bullets">
                <span>+ Custom hiring scorecard</span>
                <span>+ First dossier delivery timeline</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Synchronous Timezone Coverage & Direct Channels */}
      <section className="section section-light contact-coverage-section">
        <div className="container">
          <div className="section-head split-head">
            <div>
              <SectionLabel eyebrow="02 / GLOBAL REACH">Synchronous Global Operations.</SectionLabel>
            </div>
            <p>
              ANTI.AI maintains continuous staffing coverage across all major business timezones, ensuring seamless communication and Day-1 team integration.
            </p>
          </div>

          <div className="contact-channels-grid">
            <div className="channel-box">
              <div className="channel-box-top">
                <Globe2 size={20} className="channel-icon" />
                <span className="channel-pill">AMERICAS</span>
              </div>
              <h4>US East & West (EST / PST)</h4>
              <p>Structured 4–6 hour daily synchronous overlap with North American teams, supporting agile standups and sprint planning.</p>
              <div className="channel-foot">
                <span>Synchronous Hours</span>
                <b>09:00 — 18:00 EST</b>
              </div>
            </div>

            <div className="channel-box">
              <div className="channel-box-top">
                <Globe2 size={20} className="channel-icon" />
                <span className="channel-pill">EUROPE</span>
              </div>
              <h4>UK & Europe (GMT / CET)</h4>
              <p>Complete business hours alignment with London, Berlin, Amsterdam, and European hubs with native English fluency.</p>
              <div className="channel-foot">
                <span>Synchronous Hours</span>
                <b>09:00 — 17:30 GMT/CET</b>
              </div>
            </div>

            <div className="channel-box channel-box-email">
              <div className="channel-box-top">
                <Mail size={20} className="channel-icon" />
                <span className="channel-pill channel-pill-red">DIRECT EMAIL</span>
              </div>
              <h4>Direct Inquiries</h4>
              <p>Prefer writing directly to our partnership team? We respond to incoming client briefs within 4 hours during business days.</p>
              <div className="channel-email-row">
                <a href="mailto:services@antiai.ltd" className="channel-mail-link">
                  services@antiai.ltd
                </a>
                <button type="button" className="channel-copy-sm" onClick={handleCopyEmail} title="Copy email address">
                  {copiedEmail ? <Check size={13} color="#16a34a" /> : <Copy size={13} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="section dark-section contact-faq-section">
        <div className="container">
          <div className="section-head split-head light-head">
            <div>
              <SectionLabel eyebrow="03 / FAQ">Common Staffing Questions.</SectionLabel>
            </div>
            <p>Everything you need to know about our engagement models, onboarding guarantees, and turnaround times.</p>
          </div>

          <div className="contact-faq-stack">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.q}
                  className={`faq-item ${isOpen ? 'is-open' : ''}`}
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                >
                  <div className="faq-question">
                    <h4>{faq.q}</h4>
                    <span className="faq-icon-wrap">
                      <ChevronDown size={18} className={`faq-chevron ${isOpen ? 'is-rotated' : ''}`} />
                    </span>
                  </div>
                  {isOpen && (
                    <div className="faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom Final CTA */}
      <section className="final-cta">
        <div className="final-noise" />
        <div className="container final-cta-inner">
          <div>
            <span className="tiny-overline">SCALE WITH CONFIDENCE</span>
            <h2>Let's build the team <em>your roadmap needs.</em></h2>
          </div>
          <div className="final-side">
            <p>Share the function, the deliverables, and when you need them to start. We'll have your first curated candidate dossier ready within 48 hours.</p>
            <PrimaryButton dark href={CALENDLY}>
              Schedule 30-min call
            </PrimaryButton>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}

function HowItWorksHeroArt() {
  const [activeStep, setActiveStep] = useState(null);

  const STEPS = [
    {
      id: 0,
      number: '01',
      title: '01 // BRIEF',
      sub: '< 24H CONTEXT',
      detail: 'ROLE SPECIFICATION INTAKE',
      cx: 250,
      cy: 60,
      labelX: 250,
      labelY: 34,
      subY: 46,
      align: 'middle'
    },
    {
      id: 1,
      number: '02',
      title: '02 // CURATE',
      sub: 'TOP 3% DOSSIER',
      detail: '<48H CANDIDATE MATCHING',
      cx: 375,
      cy: 185,
      labelX: 392,
      labelY: 182,
      subY: 193,
      align: 'start'
    },
    {
      id: 2,
      number: '03',
      title: '03 // MEET',
      sub: 'TEAM INTERVIEW',
      detail: 'DIRECT FOUNDER REVIEW',
      cx: 250,
      cy: 310,
      labelX: 250,
      labelY: 334,
      subY: 345,
      align: 'middle'
    },
    {
      id: 3,
      number: '04',
      title: '04 // START',
      sub: '14-DAY RISK-FREE',
      detail: 'ONBOARD WITH ZERO RISK',
      cx: 125,
      cy: 185,
      labelX: 108,
      labelY: 182,
      subY: 193,
      align: 'end'
    }
  ];

  const active = activeStep !== null ? STEPS[activeStep] : null;

  return (
    <div className="inner-hero-art art-workflow">
      <div className="vertical-mark">01 → 04 MOTION KINETICS</div>
      <svg className="hero-art-svg" viewBox="0 0 500 370" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="wfSpiralGrad" x1="125" y1="60" x2="375" y2="185" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fbe8e9" />
            <stop offset="35%" stopColor="#b8121f" />
            <stop offset="85%" stopColor="#6e0b13" />
            <stop offset="100%" stopColor="#1c191a" />
          </linearGradient>
          <linearGradient id="wfCounterGrad" x1="375" y1="185" x2="125" y2="185" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#b8121f" />
            <stop offset="55%" stopColor="#2b2627" />
            <stop offset="100%" stopColor="#ded9d4" stopOpacity="0.4" />
          </linearGradient>
          <radialGradient id="wfCoreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#b8121f" stopOpacity="0.3" />
            <stop offset="65%" stopColor="#b8121f" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#b8121f" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Telemetry Calibration Watermarks */}
        <text x="20" y="20" fontFamily="'DM Mono', monospace" fontSize="7.5" fill="#b8121f" fontWeight="700" letterSpacing="0.8">CHRONO // 01→04 PIPELINE</text>
        <text x="20" y="30" fontFamily="'DM Mono', monospace" fontSize="6.5" fill="#8a827c" letterSpacing="0.4">SLA GUARANTEE · &lt;48H FIRST DOSSIER</text>
        <text x="20" y="358" fontFamily="'DM Mono', monospace" fontSize="6.5" fill="#9c938d" letterSpacing="0.4">14-DAY RISK-FREE TRIAL · DIRECT DIALOGUE · ZERO RECRUITER MIDDLEMEN</text>

        {/* Precision Technical Chrono Dial & Radial Hashmarks */}
        <g opacity="0.38" stroke="#ded8d2" strokeWidth="0.8">
          <circle cx="250" cy="185" r="145" strokeDasharray="3 3" />
          <circle cx="250" cy="185" r="125" />
          <circle cx="250" cy="185" r="85" strokeDasharray="2 4" />
          <line x1="60" y1="185" x2="440" y2="185" strokeDasharray="4 4" />
          <line x1="250" y1="20" x2="250" y2="350" strokeDasharray="4 4" />
        </g>

        {/* 12-Hour Chronometer Degree Ticks */}
        <g stroke="#a69c96" strokeWidth="1" opacity="0.65">
          <line x1="250" y1="36" x2="250" y2="44" />
          <line x1="391" y1="185" x2="399" y2="185" />
          <line x1="250" y1="326" x2="250" y2="334" />
          <line x1="101" y1="185" x2="109" y2="185" />
          {/* Diagonal Ticks */}
          <line x1="338" y1="97" x2="344" y2="91" />
          <line x1="338" y1="273" x2="344" y2="279" />
          <line x1="162" y1="273" x2="156" y2="279" />
          <line x1="162" y1="97" x2="156" y2="91" />
        </g>

        {/* Atmospheric Core Aura */}
        <circle cx="250" cy="185" r="105" fill="url(#wfCoreGlow)" />

        {/* Pulsing Acoustic Ring */}
        <circle cx="250" cy="185" r="60" stroke="#b8121f" strokeWidth="1" fill="none" opacity="0.4" className="art-pulse-ring" pointerEvents="none" />

        {/* Primary Momentum Arc (Stage 01 -> 02) */}
        <path
          d="M 250 60 A 125 125 0 0 1 375 185"
          stroke="url(#wfSpiralGrad)"
          strokeWidth="10"
          strokeLinecap="round"
          pointerEvents="none"
        />

        {/* Secondary Progression Ribbon (Stage 02 -> 03 -> 04) */}
        <path
          d="M 375 185 A 125 125 0 0 1 250 310 A 125 125 0 0 1 125 185"
          stroke="url(#wfCounterGrad)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="160 8"
          pointerEvents="none"
        />

        {/* Loop Closure Guide (Stage 04 -> 01) */}
        <path
          d="M 125 185 A 125 125 0 0 1 250 60"
          stroke="#dcd6cf"
          strokeWidth="1.8"
          strokeDasharray="4 4"
          pointerEvents="none"
        />

        {/* Precision Center Chronograph Disc */}
        <g className="art-rotate-slow" pointerEvents="none">
          <circle cx="250" cy="185" r="48" fill="#ffffff" stroke="#e0dad4" strokeWidth="1.5" />
          <circle cx="250" cy="185" r="36" fill="#b8121f" />
          <circle cx="250" cy="185" r="6" fill="#ffffff" />
          {/* Chrono Aperture Notches */}
          <line x1="250" y1="139" x2="250" y2="145" stroke="#ffffff" strokeWidth="1.5" />
          <line x1="296" y1="185" x2="290" y2="185" stroke="#ffffff" strokeWidth="1.5" />
          <line x1="250" y1="231" x2="250" y2="225" stroke="#ffffff" strokeWidth="1.5" />
          <line x1="204" y1="185" x2="210" y2="185" stroke="#ffffff" strokeWidth="1.5" />
        </g>

        {/* Center Telemetry Card Overlay */}
        <g pointerEvents="none" style={{ transition: 'all .25s ease' }}>
          <rect
            x="180"
            y="167"
            width="140"
            height="36"
            rx="8"
            fill="#ffffff"
            stroke="rgba(184, 18, 31, 0.28)"
            strokeWidth="1"
            filter="drop-shadow(0 4px 14px rgba(184,18,31,0.12))"
          />
          {active ? (
            <>
              <circle cx="194" cy="180" r="3.5" fill="#b8121f" />
              <text x="204" y="181" fontFamily="'DM Mono', monospace" fontSize="8" fill="#b8121f" fontWeight="700">
                {active.title}
              </text>
              <text x="204" y="193" fontFamily="'DM Mono', monospace" fontSize="6.5" fill="#5c5450">
                {active.detail}
              </text>
            </>
          ) : (
            <>
              <circle cx="194" cy="180" r="3.5" fill="#b8121f" className="radar-live-dot" />
              <text x="204" y="181" fontFamily="'DM Mono', monospace" fontSize="8" fill="#b8121f" fontWeight="700">
                4-STAGE PIPELINE
              </text>
              <text x="204" y="193" fontFamily="'DM Mono', monospace" fontSize="6.5" fill="#6b635e">
                &lt;48H FIRST DOSSIER
              </text>
            </>
          )}
        </g>

        {/* 4 Orbital Milestone Nodes with Dedicated Jitter-Free Hit Targets */}
        {STEPS.map((s, i) => {
          const isHovered = activeStep === i;
          return (
            <g
              key={s.id}
              className="art-node"
              onMouseEnter={() => setActiveStep(i)}
              onMouseLeave={() => setActiveStep(null)}
            >
              {/* Dedicated invisible hit circle */}
              <circle
                cx={s.cx}
                cy={s.cy}
                r="30"
                fill="transparent"
                pointerEvents="all"
              />

              {/* Pulse Ring */}
              <circle
                cx={s.cx}
                cy={s.cy}
                r={isHovered ? 13 : 9}
                stroke={s.id === 0 || s.id === 3 ? "#b8121f" : "#1c191a"}
                strokeWidth={isHovered ? 1.5 : 0.75}
                fill="none"
                opacity={isHovered ? 0.7 : 0.35}
                pointerEvents="none"
              />

              {/* Node Core */}
              <circle
                cx={s.cx}
                cy={s.cy}
                r={isHovered ? 6.5 : 5}
                fill="#ffffff"
                stroke={s.id === 0 || s.id === 3 ? "#b8121f" : "#1c191a"}
                strokeWidth={isHovered ? 3 : 2.2}
                className="node-core-ring"
                pointerEvents="none"
              />
              <circle
                cx={s.cx}
                cy={s.cy}
                r="2"
                fill={s.id === 0 || s.id === 3 ? "#b8121f" : "#1c191a"}
                pointerEvents="none"
              />

              {/* Node Labels */}
              <text
                x={s.labelX}
                y={s.labelY}
                textAnchor={s.align}
                fontFamily="'DM Mono', monospace"
                fontSize={isHovered ? "9" : "8.5"}
                fill={isHovered ? "#b8121f" : (s.id === 0 || s.id === 3 ? "#b8121f" : "#1c191a")}
                fontWeight="700"
                pointerEvents="none"
              >
                {s.title}
              </text>
              <text
                x={s.labelX}
                y={s.subY}
                textAnchor={s.align}
                fontFamily="'DM Mono', monospace"
                fontSize="7"
                fill={isHovered ? "#1c191a" : "#6d6560"}
                fontWeight={isHovered ? "600" : "400"}
                pointerEvents="none"
              >
                {s.sub}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function TalentHeroArt() {
  const [activeAxis, setActiveAxis] = useState(null);

  const AXES = [
    {
      id: 0,
      title: 'TECHNOLOGY & AI',
      short: 'TECH & AI',
      metric: 'AI/ML · FULL-STACK · CLOUD',
      score: '98%',
      filterCategory: 'Technology & AI',
      sla: '<48H FIRST DOSSIER · TOP 3%',
      x: 250,
      y: 65,
      labelX: 250,
      labelY: 34,
      subY: 46,
      align: 'middle'
    },
    {
      id: 1,
      title: 'SALES & BUSINESS',
      short: 'SALES & REVENUE',
      metric: 'SDRs · BDRs · PIPELINE',
      score: '95%',
      filterCategory: 'Sales & Business',
      sla: 'TIMEZONE-ALIGNED OUTBOUND',
      x: 353.9,
      y: 125,
      labelX: 368,
      labelY: 122,
      subY: 133,
      align: 'start'
    },
    {
      id: 2,
      title: 'MARKETING & GROWTH',
      short: 'GROWTH & DEMAND',
      metric: 'PERFORMANCE · SEO · BRAND',
      score: '94%',
      filterCategory: 'Marketing & Growth',
      sla: 'PROVEN ROI & ASSET EXECUTION',
      x: 353.9,
      y: 245,
      labelX: 368,
      labelY: 244,
      subY: 255,
      align: 'start'
    },
    {
      id: 3,
      title: 'CUSTOMER SUCCESS',
      short: 'CUSTOMER & CSAT',
      metric: 'SUPPORT · ONBOARDING · CSAT',
      score: '96%',
      filterCategory: 'Customer & Support',
      sla: '98%+ RETENTION BENCHMARK',
      x: 250,
      y: 305,
      labelX: 250,
      labelY: 326,
      subY: 337,
      align: 'middle'
    },
    {
      id: 4,
      title: 'FINANCE & OPERATIONS',
      short: 'FINANCE & OPS',
      metric: 'ANALYSTS · AP/AR · PROCESS',
      score: '93%',
      filterCategory: 'Finance & Operations',
      sla: 'AUDIT-READY PROCESS PRECISION',
      x: 146.1,
      y: 245,
      labelX: 132,
      labelY: 244,
      subY: 255,
      align: 'end'
    },
    {
      id: 5,
      title: 'HR & TALENT OPS',
      short: 'HR & TALENT',
      metric: 'RECRUITERS · PEOPLE OPS',
      score: '95%',
      filterCategory: 'HR & Talent',
      sla: 'SPEED-TO-HIRE OPTIMIZATION',
      x: 146.1,
      y: 125,
      labelX: 132,
      labelY: 122,
      subY: 133,
      align: 'end'
    }
  ];

  const vettedPoints = "250,65 353.9,125 353.9,245 250,305 146.1,245 146.1,125";
  const baselinePoints = "250,125 302,155 302,215 250,245 198,215 198,155";

  const activeData = activeAxis !== null ? AXES[activeAxis] : null;

  return (
    <div className="inner-hero-art art-talent">
      <div className="vertical-mark">CALIBER SPECTRUM</div>
      <svg className="hero-art-svg" viewBox="0 0 500 370" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Luminous Crimson Gradients & Filters */}
          <radialGradient id="vettedSpectrumGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#b8121f" stopOpacity="0.25" />
            <stop offset="65%" stopColor="#b8121f" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#b8121f" stopOpacity="0.02" />
          </radialGradient>
          <linearGradient id="vettedEdgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#b8121f" />
            <stop offset="50%" stopColor="#e61d2d" />
            <stop offset="100%" stopColor="#870a14" />
          </linearGradient>
          <linearGradient id="radarSweepGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#b8121f" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#b8121f" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="hubCenterAura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#b8121f" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#b8121f" stopOpacity="0" />
          </radialGradient>
          <filter id="crimsonGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* HUD Metadata Readouts */}
        <text x="20" y="20" fontFamily="'DM Mono', monospace" fontSize="7.5" fill="#b8121f" fontWeight="700" letterSpacing="0.8">ANTI.AI // VETTED TALENT SPECTRUM</text>
        <text x="20" y="30" fontFamily="'DM Mono', monospace" fontSize="6.5" fill="#8a827c" letterSpacing="0.4">6 CORE ROADMAP FUNCTIONS · PRE-SCREENED</text>
        <text x="20" y="358" fontFamily="'DM Mono', monospace" fontSize="6.5" fill="#9c938d" letterSpacing="0.4">SLA: 14-DAY RISK-FREE TRIAL · &lt;48H CANDIDATE DOSSIERS · TIMEZONE OVERLAP</text>

        {/* Legend */}
        <g transform="translate(320, 12)">
          <circle cx="6" cy="6" r="3" fill="#b8121f" />
          <text x="14" y="9" fontFamily="'DM Mono', monospace" fontSize="7" fill="#1c191a" fontWeight="700">ANTI.AI VETTED (96%)</text>
          <line x1="102" y1="6" x2="114" y2="6" stroke="#9e958f" strokeWidth="1.5" strokeDasharray="2 2" />
          <text x="120" y="9" fontFamily="'DM Mono', monospace" fontSize="7" fill="#78706b">MARKET BASELINE</text>
        </g>

        {/* Precision Concentric Hexagonal Caliber Rings */}
        <g stroke="#eae5df" strokeWidth="0.8">
          {/* 100% Boundary */}
          <polygon points="250,65 353.9,125 353.9,245 250,305 146.1,245 146.1,125" />
          {/* 75% Tier */}
          <polygon points="250,95 328,140 328,230 250,275 172,230 172,140" opacity="0.85" />
          {/* 50% Midline */}
          <polygon points="250,125 302,155 302,215 250,245 198,215 198,155" opacity="0.65" />
          {/* 25% Core */}
          <polygon points="250,155 276,170 276,200 250,215 224,200 224,170" opacity="0.45" />
        </g>

        {/* Concentric Circular Reticle Guides */}
        <g stroke="#e2ded9" strokeWidth="0.8" opacity="0.6">
          <circle cx="250" cy="185" r="120" strokeDasharray="3 3" />
          <circle cx="250" cy="185" r="90" />
          <circle cx="250" cy="185" r="60" strokeDasharray="2 3" />
          <circle cx="250" cy="185" r="30" />
        </g>

        {/* 6 Polar Radial Axis Spokes */}
        <g stroke="#d8d2cb" strokeWidth="0.8">
          <line x1="250" y1="185" x2="250" y2="65" />
          <line x1="250" y1="185" x2="353.9" y2="125" />
          <line x1="250" y1="185" x2="353.9" y2="245" />
          <line x1="250" y1="185" x2="250" y2="305" />
          <line x1="250" y1="185" x2="146.1" y2="245" />
          <line x1="250" y1="185" x2="146.1" y2="125" />
        </g>

        {/* Rotating Radar Scanner Sweep */}
        <g className="talent-radar-sweep" pointerEvents="none">
          <path d="M 250 185 L 250 55 A 130 130 0 0 1 342 93 Z" fill="url(#radarSweepGrad)" opacity="0.24" pointerEvents="none" />
          <line x1="250" y1="185" x2="250" y2="55" stroke="#b8121f" strokeWidth="1.2" opacity="0.65" pointerEvents="none" />
        </g>

        {/* Market Baseline Polygon */}
        <polygon
          points={baselinePoints}
          fill="rgba(160, 150, 144, 0.08)"
          stroke="#9e958f"
          strokeWidth="1"
          strokeDasharray="3 3"
          pointerEvents="none"
        />

        {/* ANTI.AI Vetted Spectrum Polygon */}
        <polygon
          points={vettedPoints}
          fill="url(#vettedSpectrumGlow)"
          stroke="url(#vettedEdgeGrad)"
          strokeWidth="2.2"
          strokeLinejoin="round"
          filter="url(#crimsonGlow)"
          pointerEvents="none"
        />

        {/* Ambient Center Aura */}
        <circle cx="250" cy="185" r="42" fill="url(#hubCenterAura)" pointerEvents="none" />

        {/* 6 Interactive Vertices with Rock-Solid Jitter-Free Hit Targets */}
        {AXES.map((axis, i) => {
          const isHovered = activeAxis === i;
          return (
            <g
              key={axis.id}
              className="radar-axis-node"
              onMouseEnter={() => setActiveAxis(i)}
              onMouseLeave={() => setActiveAxis(null)}
            >
              {/* Generous dedicated invisible hit target to guarantee hover stability */}
              <circle
                cx={axis.x}
                cy={axis.y}
                r="30"
                fill="transparent"
                pointerEvents="all"
              />

              {/* Outer Pulse Ping */}
              <circle
                cx={axis.x}
                cy={axis.y}
                r={isHovered ? 13 : 9}
                stroke="#b8121f"
                strokeWidth={isHovered ? 1.5 : 0.75}
                fill="none"
                opacity={isHovered ? 0.7 : 0.35}
                pointerEvents="none"
                className={isHovered ? undefined : 'radar-node-pulse'}
              />

              {/* Node Core */}
              <circle
                cx={axis.x}
                cy={axis.y}
                r={isHovered ? 6.5 : 5}
                fill="#ffffff"
                stroke="#b8121f"
                strokeWidth={isHovered ? 3 : 2.2}
                className="node-visual-core"
                pointerEvents="none"
              />
              <circle
                cx={axis.x}
                cy={axis.y}
                r="2"
                fill="#b8121f"
                pointerEvents="none"
              />

              {/* Node Typography */}
              <text
                x={axis.labelX}
                y={axis.labelY}
                textAnchor={axis.align}
                fontFamily="'DM Mono', monospace"
                fontSize={isHovered ? "9" : "8.5"}
                fill={isHovered ? "#b8121f" : "#1c191a"}
                fontWeight="700"
                pointerEvents="none"
              >
                {axis.title}
              </text>
              <text
                x={axis.labelX}
                y={axis.subY}
                textAnchor={axis.align}
                fontFamily="'DM Mono', monospace"
                fontSize="7"
                fill={isHovered ? "#1c191a" : "#6f6762"}
                fontWeight={isHovered ? "600" : "400"}
                pointerEvents="none"
              >
                {axis.metric}
              </text>
            </g>
          );
        })}

        {/* Central Telemetry Hub Card */}
        <g pointerEvents="none" style={{ transition: 'all .25s ease' }}>
          <rect
            x="170"
            y="162"
            width="160"
            height="46"
            rx="8"
            fill="#ffffff"
            stroke="rgba(184, 18, 31, 0.3)"
            strokeWidth="1"
            filter="drop-shadow(0 6px 20px rgba(184,18,31,0.12))"
          />
          {activeData ? (
            <>
              <circle cx="184" cy="176" r="3.5" fill="#b8121f" />
              <text
                x="195"
                y="178"
                fontFamily="'DM Mono', monospace"
                fontSize="8"
                fill="#b8121f"
                fontWeight="700"
              >
                {activeData.short} // {activeData.score}
              </text>
              <text
                x="195"
                y="190"
                fontFamily="'DM Mono', monospace"
                fontSize="7"
                fill="#1c191a"
                fontWeight="600"
              >
                {activeData.metric}
              </text>
              <text
                x="195"
                y="200"
                fontFamily="'DM Mono', monospace"
                fontSize="6.5"
                fill="#736b66"
              >
                {activeData.sla}
              </text>
            </>
          ) : (
            <>
              <circle cx="184" cy="176" r="3.5" fill="#b8121f" className="radar-live-dot" />
              <text
                x="195"
                y="178"
                fontFamily="'DM Mono', monospace"
                fontSize="8"
                fill="#b8121f"
                fontWeight="700"
              >
                TOP 3.0% ACCEPTANCE
              </text>
              <text
                x="195"
                y="190"
                fontFamily="'DM Mono', monospace"
                fontSize="7"
                fill="#1c191a"
                fontWeight="600"
              >
                14-DAY RISK-FREE TRIAL
              </text>
              <text
                x="195"
                y="200"
                fontFamily="'DM Mono', monospace"
                fontSize="6.5"
                fill="#736b66"
              >
                &lt;48H CANDIDATE DOSSIERS
              </text>
            </>
          )}
        </g>
      </svg>
    </div>
  );
}

function IndustriesHeroArt() {
  return (
    <div className="inner-hero-art art-industries">
      <div className="vertical-mark">ENTERPRISE SCALE &amp; TOPOLOGY</div>
      <svg className="hero-art-svg" viewBox="0 0 460 360" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="indCubeTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f3ede7" />
          </linearGradient>
          <linearGradient id="indCubeRed" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#b8121f" />
            <stop offset="100%" stopColor="#6e060f" />
          </linearGradient>
          <linearGradient id="indCubeDark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2b2829" />
            <stop offset="100%" stopColor="#141314" />
          </linearGradient>
        </defs>

        {/* Axonometric Isometric Grid */}
        <g opacity="0.4" stroke="#ded8d2" strokeWidth="0.8">
          <line x1="60" y1="80" x2="400" y2="276" strokeDasharray="3 3" />
          <line x1="60" y1="276" x2="400" y2="80" strokeDasharray="3 3" />
          <line x1="230" y1="25" x2="230" y2="335" strokeDasharray="4 4" />
          <circle cx="230" cy="180" r="140" strokeDasharray="2 4" />
        </g>

        {/* Isometric Platform / Ground Shadow */}
        <ellipse cx="230" cy="265" rx="135" ry="36" fill="#ede7e1" opacity="0.6" />

        {/* Left Monolith (Stepped Left: Fintech & High Frequency) */}
        <g transform="translate(100, 160)">
          <polygon points="0,-20 38,-40 76,-20 38,0" fill="url(#indCubeTop)" stroke="#ded8d2" strokeWidth="0.75" />
          <polygon points="0,-20 38,0 38,48 0,28" fill="url(#indCubeDark)" />
          <polygon points="38,0 76,-20 76,28 38,48" fill="url(#indCubeRed)" />
        </g>

        {/* Sector Monolith 2 (Main Center Forward: AI Systems Flagship) */}
        <g transform="translate(170, 95)" className="art-float-monolith">
          <polygon points="0,-32 60,-62 120,-32 60,-2" fill="#ffffff" stroke="#ded8d2" strokeWidth="1" />
          <polygon points="0,-32 60,-2 60,95 0,65" fill="url(#indCubeDark)" />
          <polygon points="60,-2 120,-32 120,65 60,95" fill="url(#indCubeRed)" />
          {/* Beacon Core on Top Plane */}
          <circle cx="60" cy="-32" r="4.5" fill="#b8121f" />
          <circle cx="60" cy="-32" r="9" stroke="#b8121f" strokeWidth="0.8" opacity="0.5" strokeDasharray="2 2" />
        </g>

        {/* Right Monolith (Stepped Right: Cloud, SaaS & Health) */}
        <g transform="translate(265, 155)">
          <polygon points="0,-22 42,-44 84,-22 42,0" fill="url(#indCubeTop)" stroke="#ded8d2" strokeWidth="0.75" />
          <polygon points="0,-22 42,0 42,50 0,28" fill="url(#indCubeDark)" opacity="0.88" />
          <polygon points="42,0 84,-22 84,28 42,50" fill="url(#indCubeRed)" opacity="0.88" />
        </g>

        {/* Architectural Datum Lines & Precise Callouts */}
        <g stroke="#b8121f" strokeWidth="1">
          {/* Datum 1: AI */}
          <line x1="230" y1="63" x2="330" y2="35" strokeDasharray="2 2" />
          <circle cx="230" cy="63" r="3" fill="#b8121f" />
          <text x="338" y="38" fontFamily="'DM Mono', monospace" fontSize="8.5" fill="#1c191a" fontWeight="700">FOUNDATION AI</text>
          <text x="338" y="49" fontFamily="'DM Mono', monospace" fontSize="7" fill="#6d6560">LLM &amp; INFERENCE CORE</text>

          {/* Datum 2: Fintech */}
          <line x1="140" y1="205" x2="60" y2="245" strokeDasharray="2 2" />
          <circle cx="140" cy="205" r="3" fill="#b8121f" />
          <text x="24" y="258" fontFamily="'DM Mono', monospace" fontSize="8.5" fill="#1c191a" fontWeight="700">FINTECH · LOW LATENCY</text>
          <text x="24" y="269" fontFamily="'DM Mono', monospace" fontSize="7" fill="#6d6560">TRADING &amp; PAYMENTS</text>

          {/* Datum 3: Healthtech */}
          <line x1="305" y1="205" x2="355" y2="235" strokeDasharray="2 2" />
          <circle cx="305" cy="205" r="3" fill="#1c191a" />
          <text x="330" y="255" fontFamily="'DM Mono', monospace" fontSize="8.5" fill="#5c5450" fontWeight="600">HEALTH &amp; BIO</text>
          <text x="330" y="266" fontFamily="'DM Mono', monospace" fontSize="7" fill="#8a827d">COMPLIANCE &amp; SOC2</text>
        </g>

        <text x="38" y="44" fontFamily="'DM Mono', monospace" fontSize="7.5" fill="#9c938d" letterSpacing="1">AXIS // X·Y·Z SCALE TOPOLOGY</text>
        <text x="38" y="55" fontFamily="'DM Mono', monospace" fontSize="7" fill="#b3a9a3" letterSpacing="0.8">SOC2 · HIPAA · 40+ REGIONS DEPLOYED</text>
      </svg>
    </div>
  );
}

function ContactHeroArt() {
  const [activeChannel, setActiveChannel] = useState(null);

  const CHANNELS = [
    {
      id: 0,
      badge: '01 // SCOPING',
      title: '01 // CLIENT BRIEF',
      sub: 'Role Scorecard & Stack',
      detail: 'MAPPED TO DELIVERABLE MILESTONES',
      x: 95,
      y: 95,
      labelX: 95,
      labelY1: 48,
      labelY2: 60,
      align: 'middle',
      color: '#1c191a'
    },
    {
      id: 1,
      badge: '02 // SOURCING',
      title: '02 // ANTI.AI SOURCING',
      sub: 'Top 3% Vetted Specialists',
      detail: 'PRODUCTION-TESTED CANDIDATES',
      x: 425,
      y: 95,
      labelX: 425,
      labelY1: 48,
      labelY2: 60,
      align: 'middle',
      color: '#b8121f'
    },
    {
      id: 2,
      badge: '03 // DOSSIER',
      title: '03 // CANDIDATE DOSSIER',
      sub: '< 48h Direct Calendar Delivery',
      detail: '2–3 INTERVIEW-READY FINALISTS',
      x: 260,
      y: 250,
      labelX: 260,
      labelY1: 284,
      labelY2: 296,
      align: 'middle',
      color: '#1c191a'
    }
  ];

  const active = activeChannel !== null ? CHANNELS[activeChannel] : null;

  return (
    <div className="inner-hero-art art-contact">
      <svg className="hero-art-svg" viewBox="0 0 520 320" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Subtle Architectural Corner Annotations */}
        <text x="20" y="24" fontFamily="'DM Mono', monospace" fontSize="7.5" fill="#8a827c" fontWeight="600" letterSpacing="0.8">
          ANTI.AI // DIRECT PIPELINE
        </text>
        <text x="500" y="24" textAnchor="end" fontFamily="'DM Mono', monospace" fontSize="7.5" fill="#8a827c" fontWeight="600" letterSpacing="0.8">
          RESPONSE SLA: &lt; 24H
        </text>
        <text x="20" y="306" fontFamily="'DM Mono', monospace" fontSize="7" fill="#a19992" letterSpacing="0.4">
          US · EU · IST SYNCHRONOUS OVERLAP
        </text>
        <text x="500" y="306" textAnchor="end" fontFamily="'DM Mono', monospace" fontSize="7" fill="#a19992" letterSpacing="0.4">
          ZERO RECRUITER MIDDLEMEN
        </text>

        {/* Clean Static Datum Guidelines */}
        <g stroke="#eae5de" strokeWidth="1" opacity="0.8">
          <circle cx="260" cy="155" r="135" strokeDasharray="3 4" />
          <circle cx="260" cy="155" r="80" />
          <line x1="45" y1="155" x2="475" y2="155" strokeDasharray="4 4" />
          <line x1="260" y1="28" x2="260" y2="285" strokeDasharray="4 4" />
        </g>

        {/* Coordinate Crosshairs */}
        <g stroke="#beb6ae" strokeWidth="1">
          <line x1="260" y1="18" x2="260" y2="24" />
          <line x1="260" y1="286" x2="260" y2="292" />
          <line x1="42" y1="155" x2="48" y2="155" />
          <line x1="472" y1="155" x2="478" y2="155" />
        </g>

        {/* Direct Vector Connectors from 3 Ingestion Nodes to Hub */}
        {/* Stream 1: Top-Left Client Brief -> Center */}
        <line x1="95" y1="95" x2="165" y2="136" stroke="#d5ceca" strokeWidth="1.5" />
        <line x1="95" y1="95" x2="165" y2="136" stroke="#b8121f" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

        {/* Stream 2: Top-Right Sourcing -> Center */}
        <line x1="425" y1="95" x2="355" y2="136" stroke="#d5ceca" strokeWidth="1.5" />
        <line x1="425" y1="95" x2="355" y2="136" stroke="#b8121f" strokeWidth="1" strokeDasharray="3 3" opacity="0.75" />

        {/* Stream 3: Bottom Candidate Dossier -> Center */}
        <line x1="260" y1="250" x2="260" y2="190" stroke="#d5ceca" strokeWidth="1.5" />
        <line x1="260" y1="250" x2="260" y2="190" stroke="#b8121f" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

        {/* Central Static Focal Card (Clean, Minimal, Architectural) */}
        <g>
          {/* Base Card */}
          <rect
            x="162"
            y="125"
            width="196"
            height="60"
            rx="12"
            fill="#ffffff"
            stroke="#b8121f"
            strokeWidth="1.5"
            filter="drop-shadow(0 4px 14px rgba(184, 18, 31, 0.08))"
          />

          {/* Indicator Dot */}
          <circle cx="180" cy="142" r="3" fill="#b8121f" />

          {/* Badge Label */}
          <text
            x="190"
            y="144"
            fontFamily="'DM Mono', monospace"
            fontSize="7.5"
            fontWeight="700"
            fill="#b8121f"
            letterSpacing="0.8"
          >
            {active ? active.badge : 'DIRECT PIPELINE'}
          </text>

          {/* Primary Hub Headline */}
          <text
            x="260"
            y="161"
            textAnchor="middle"
            fontFamily="'Space Grotesk', sans-serif"
            fontSize="11.5"
            fontWeight="700"
            fill="#1c191a"
            letterSpacing="-0.2px"
          >
            {active ? active.title : '30-MIN STRATEGY CALL'}
          </text>

          {/* Subtitle / Telemetry Detail */}
          <text
            x="260"
            y="173"
            textAnchor="middle"
            fontFamily="'DM Mono', monospace"
            fontSize="7"
            fill="#6d6560"
            letterSpacing="0.3"
          >
            {active ? active.detail : 'DIRECT FOUNDER REVIEW · CALENDLY'}
          </text>
        </g>

        {/* 3 Interactive Ingestion Nodes */}
        {CHANNELS.map((ch, i) => {
          const isHovered = activeChannel === i;
          return (
            <g
              key={ch.id}
              className="art-node"
              onMouseEnter={() => setActiveChannel(i)}
              onMouseLeave={() => setActiveChannel(null)}
            >
              {/* Hit target */}
              <circle cx={ch.x} cy={ch.y} r="26" fill="transparent" pointerEvents="all" />

              {/* Node Outer Ring */}
              <circle
                cx={ch.x}
                cy={ch.y}
                r="12"
                fill="#ffffff"
                stroke={isHovered ? '#b8121f' : ch.color === '#b8121f' ? '#f0c7ca' : '#d8d2ca'}
                strokeWidth={isHovered ? 2 : 1.5}
                pointerEvents="none"
              />

              {/* Node Center Dot */}
              <circle
                cx={ch.x}
                cy={ch.y}
                r="4.5"
                fill={ch.color}
                pointerEvents="none"
              />

              {/* Labels with guaranteed safety clearance */}
              <text
                x={ch.labelX}
                y={ch.labelY1}
                textAnchor={ch.align}
                fontFamily="'DM Mono', monospace"
                fontSize="8.5"
                fontWeight="700"
                fill={isHovered ? '#b8121f' : ch.color}
                letterSpacing="0.4"
                pointerEvents="none"
              >
                {ch.title}
              </text>
              <text
                x={ch.labelX}
                y={ch.labelY2}
                textAnchor={ch.align}
                fontFamily="'DM Mono', monospace"
                fontSize="7"
                fill="#736c67"
                pointerEvents="none"
              >
                {ch.sub}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function PageFrame({ eyebrow, title, intro, children, customArt }) {
  const renderHeroArt = () => {
    if (customArt) return customArt;
    if (eyebrow === 'HOW IT WORKS') return <HowItWorksHeroArt />;
    if (eyebrow === 'TALENT') return <TalentHeroArt />;
    if (eyebrow === 'INDUSTRIES') return <IndustriesHeroArt />;
    if (eyebrow === 'CONTACT') return <ContactHeroArt />;
    return (
      <div className="inner-hero-art">
        <div className="vertical-mark">ANTI.AI STAFFING</div>
        <div className="art-circle" />
        <div className="art-grid" />
      </div>
    );
  };

  return (
    <div className="inner-page">
      <section className="inner-hero">
        <div className="container inner-hero-grid">
          <div>
            <div className="eyebrow"><span className="status-dot"/> {eyebrow}</div>
            <h1>{title}</h1>
            <p>{intro}</p>
            <PrimaryButton/>
            {eyebrow === 'TALENT' && (
              <div className="hero-micro-badges">
                <div className="hm-badge">
                  <span className="hm-dot" />
                  <span>Top 3.0% Screened</span>
                </div>
                <div className="hm-badge">
                  <Clock3 size={12} />
                  <span>&lt;48h First Dossier</span>
                </div>
                <div className="hm-badge">
                  <ShieldCheck size={12} />
                  <span>14-Day Risk-Free Trial</span>
                </div>
              </div>
            )}
          </div>
          {renderHeroArt()}
        </div>
      </section>
      {children}
    </div>
  );
}

function LinkedInIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="10" x2="5" y2="19" />
      <circle cx="5" cy="5" r="1.2" fill="currentColor" stroke="none" />
      <path d="M10.5 19V14.2a3.8 3.8 0 0 1 3.8-3.7 3.8 3.8 0 0 1 3.8 3.7V19" />
      <line x1="10.5" y1="10" x2="10.5" y2="19" />
    </svg>
  );
}

function Footer() {
  return <footer className="footer">
    <div className="footer-topline"></div>
    <div className="container">
      <div className="footer-hero">
        <div>
          <span className="tiny-overline">WHEN THE BUSINESS NEEDS MORE PEOPLE, MOVE WITH INTENT.</span>
          <h2>Build the right team.<br/><em>Then get back to building.</em></h2>
        </div>
        <div className="footer-hero-side"><p>Tell us the function, the role and the outcome. We’ll help you shape the requirement and the next conversation.</p><PrimaryButton dark>Schedule a staffing call</PrimaryButton></div>
      </div>

      <div className="footer-tools-block">
        <div className="footer-tools-head"><span>COMMON TOOLS ACROSS FUNCTIONS</span><b>01 — 02</b></div>
        <div className="footer-marquee-wrap"><div className="footer-marquee"><div className="footer-marquee-track">{[...businessTools, ...businessTools].map((tool, i) => <span key={`${tool}-${i}`}>{tool}</span>)}</div></div><div className="footer-marquee-note">and the tools your team already uses</div></div>
      </div>

      <div className="footer-main">
        <div className="footer-brand-col">
          <img src="/logo-white.svg" alt="ANTI.AI" style={{ height: 'clamp(34px, 4.5vw, 52px)', width: 'auto', marginBottom: '26px', display: 'block' }} />
          <p className="footer-tagline">Staffing across technology, sales, HR, finance, operations, marketing and customer teams—designed around the work that needs to get done.</p>
          <div className="footer-socials">
            <a href="https://www.instagram.com/antiaishield?igsh=MTY2aGkxdjRiOWhvMA%3D%3D" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram size={18} strokeWidth={1.8} />
            </a>
            <a href="https://www.threads.com/@antiaishield?igshid=NTc4MTIwNjQ2YQ%3D%3D" target="_blank" rel="noopener noreferrer" aria-label="Threads">
              <AtSign size={18} strokeWidth={1.8} />
            </a>
            <a href="https://www.youtube.com/@anti.ai_15" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <Youtube size={18} strokeWidth={1.8} />
            </a>
            <a href="https://www.linkedin.com/company/anti-ai/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <LinkedInIcon size={18} />
            </a>
          </div>
        </div>
        <FooterColumn title="STAFFING" links={[['Staffing', '/staffing'], ['How it works', '/how-it-works#process'], ['Talent', '/talent#profiles'], ['Industries', '/industries#list'], ['Contact', '/contact#details']]} />
        <FooterColumn title="FUNCTIONS" links={roleFamilies.map(f => [f.title, `/talent?filter=${encodeURIComponent(f.title)}#profiles`])} />
        <div className="footer-column"><span className="footer-column-title">TALK TO US</span><a className="footer-big-link" href={CALENDLY} target="_blank" rel="noreferrer">Book a 30-min call <ArrowUpRight size={16}/></a><a className="footer-mail" href="mailto:services@antiai.ltd">services@antiai.ltd</a><p>Have a role, team or capacity problem? Start with a direct conversation.</p></div>
      </div>

      <div className="footer-bottom"><span>© 2026 ANTI.AI. All rights reserved.</span><span className="footer-motto">अन्ते सत्यं विजयते। <b>THE TRUTH PREVAILS.</b></span></div>
    </div>
  </footer>;
}

function FooterColumn({ title, links }) {
  return <div className="footer-column"><span className="footer-column-title">{title}</span>{links.map(([label, href]) => <NavLink key={label} to={href}>{label}</NavLink>)}</div>;
}

function MobileBookBar() {
  return <div className="mobile-book"><span>Need people?</span><a href={CALENDLY} target="_blank" rel="noreferrer">Book a call <ArrowUpRight size={15}/></a></div>;
}

export default App;
