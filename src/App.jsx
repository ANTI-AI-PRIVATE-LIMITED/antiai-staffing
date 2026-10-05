import React, { useEffect, useMemo, useState } from 'react';
import { Navigate, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import {
  ArrowUpRight, BriefcaseBusiness, ChevronRight, Clock3, Code2, Database, Handshake,
  Globe2, HeartHandshake, LineChart, Menu, Megaphone, PhoneCall, Search, ShieldCheck,
  UsersRound, WalletCards, Workflow, X, UserRoundSearch, Zap
} from 'lucide-react';
import { businessTools, industries, roleFamilies, talent, tech } from './data';

const CALENDLY = 'https://calendly.com/tanishq-antiai/30min';

function useScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);
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
        <img src="/logo.svg" alt="ANTI.AI" style={{ height: '36px', width: 'auto' }} />
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
          <div className="hero-actions"><PrimaryButton/><a className="ghost-link" href="#roles">Explore roles <ChevronRight size={17}/></a></div>
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
        <div className="section-head split-head light-head"><div><SectionLabel eyebrow="02 / HOW IT WORKS">One process. Any function.</SectionLabel></div><p>Whether the brief is for a senior engineer, BDE, recruiter or finance associate, the path stays simple: understand the work, curate the right people, meet, then move.</p></div>
        <div className="process-grid">
          <ProcessStep number="01" title="Define the brief" desc="Role, outcomes, level, tools, location and working context." kicker="CLARITY FIRST" icon={<Search/>} />
          <ProcessStep number="02" title="Shape the shortlist" desc="We narrow the search around real requirements, not keyword noise." kicker="LESS NOISE" icon={<UserRoundSearch/>} />
          <ProcessStep number="03" title="Meet the people" desc="Your team speaks directly with the shortlist and evaluates fit." kicker="REAL FIT" icon={<Handshake/>} />
          <ProcessStep number="04" title="Start the work" desc="Choose the engagement model and bring the right capacity in." kicker="MOVE FORWARD" icon={<Workflow/>} />
        </div>
        <div className="dark-cta-row"><div><span className="tiny-overline">READY WHEN YOU ARE</span><strong>Bring us the hard-to-fill role.</strong></div><PrimaryButton dark>Start the conversation</PrimaryButton></div>
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
            {['Technology & AI','Sales & BDE','HR & Talent','Finance & Operations','Marketing & Growth','Customer & Support'].map((item, i) => <span key={item} style={{'--i': i}}>{item}<ArrowUpRight size={13}/></span>)}
          </div>
          <PrimaryButton dark>Talk to a specialist</PrimaryButton>
        </div>
      </div>
    </section>

    <section className="section section-light showcase-section">
      <div className="container">
        <div className="section-head split-head"><div><SectionLabel eyebrow="03 / REPRESENTATIVE TALENT">See the range, not just the resume.</SectionLabel></div><p>Representative profiles show how ANTI.AI can present talent across functions. Connect this layer to the staffing portal when real profiles are ready.</p></div>
        <TalentWall items={talent.slice(0,6)} />
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
        <div className="industry-grid">{industries.map(([title,desc],i)=><div className="industry-card" key={title}><span>0{i+1}</span><h3>{title}</h3><p>{desc}</p><ArrowUpRight size={18}/></div>)}</div>
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
      <div className="role-list">{current.roles.map((role, i) => <div key={role} className={i === 0 ? 'role-list-item is-featured' : 'role-list-item'}><span>0{i + 1}</span><b>{role}</b><ArrowUpRight size={15}/></div>)}</div>
      <div className="role-detail-foot"><span>Need a specific combination?</span><a href={CALENDLY} target="_blank" rel="noreferrer">Discuss the role <ArrowUpRight size={15}/></a></div>
    </div>
  </div>;
}

function TalentWall({ items }) {
  return <div className="talent-wall">{items.map((t, i) => <article className={`talent-tile talent-tile-${i % 6}`} key={t.name}>
    <div className="talent-tile-top"><span className={`talent-code code-${t.tone}`}>{t.code}</span><span className="availability"><i></i> AVAILABLE</span></div>
    <div className="talent-tile-copy"><span className="talent-meta">{t.meta}</span><h3>{t.name}</h3><p>{t.stack}</p></div>
    <div className="talent-tile-bottom"><span>{t.family}</span><a href={CALENDLY} target="_blank" rel="noreferrer">Discuss <ArrowUpRight size={14}/></a></div>
  </article>)}</div>;
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
    <span className="process-step-arrow" aria-hidden="true"><ArrowUpRight size={15}/></span>
  </div>;
}

function Capability({ icon, title, desc, tag, large }) { return <article className={`cap-card ${large ? 'cap-large' : ''}`}><div className="cap-icon">{icon}</div><span className="card-tag">{tag}</span><h3>{title}</h3><p>{desc}</p><ArrowUpRight className="card-arrow" size={18}/></article> }
function TalentCard({ t, i }) { return <article className="talent-card"><div className="talent-card-top"><div className={`large-avatar avatar-${t.tone}`}>{t.code}</div><span className="available">AVAILABLE <b>●</b></span></div><span className="talent-meta">{t.meta}</span><h3>{t.name}</h3><p>{t.stack}</p><div className="talent-card-bottom"><span>{t.family}</span><a href={CALENDLY} target="_blank" rel="noreferrer">Discuss <ArrowUpRight size={15}/></a></div></article> }
function Engagement({ label, title, desc, bullets, featured }) { return <article className={`eng-card ${featured ? 'eng-featured' : ''}`}><span>{label}</span><h3>{title}</h3><p>{desc}</p><div className="bullets">{bullets.map(b => <div key={b}><span>+</span>{b}</div>)}</div><ArrowUpRight className="eng-arrow" size={18}/></article> }

function HowItWorks() {
  return <PageFrame eyebrow="HOW IT WORKS" title={<>A clean staffing motion.<br/><em>Less friction, more progress.</em></>} intro="The same simple operating model works whether you are hiring for a technical, commercial or business function.">
    <section className="section section-light"><div className="container"><div className="step-stack">
      {[
        ['01', 'Brief', 'Tell us the role, the tools, the delivery context and what success looks like.'],
        ['02', 'Curate', 'We turn the brief into a focused search and shortlist the profiles that actually fit.'],
        ['03', 'Meet', 'Your team talks directly with the people in the shortlist and evaluates fit.'],
        ['04', 'Start', 'Choose the engagement model and get the person or team into the work.'],
      ].map(([n, t, d], i) => <div className="big-step" key={n}><span>{n}</span><div><div className="big-step-kicker">{String(i + 1).padStart(2, '0')} / {t.toUpperCase()}</div><h3>{t}</h3><p>{d}</p></div><ChevronRight size={24}/></div>)}
    </div></div></section>
    <section className="section dark-section"><div className="container two-col-feature"><div><SectionLabel eyebrow="THE OPERATING PRINCIPLE">The work stays human.</SectionLabel><h2>We use process to remove noise, <em>not people.</em></h2></div><div className="feature-list"><div><ShieldCheck/><b>Curated over crowded</b><span>A smaller, clearer shortlist is easier to evaluate than a wall of resumes.</span></div><div><Globe2/><b>Context over keywords</b><span>We care about the environment a person will work in, not just the tools on a CV.</span></div><div><Zap/><b>Momentum over ceremony</b><span>The site makes the next step obvious, so conversations can start quickly.</span></div></div></div></section>
    <section className="section section-light"><div className="container cta-panel"><div><span className="tiny-overline">READY TO START</span><h2>Tell us the role you cannot afford to get wrong.</h2></div><PrimaryButton/></div></section>
  </PageFrame>;
}

function Talent() {
  const [filter, setFilter] = useState('All');
  const filters = ['All', ...roleFamilies.map(f => f.title)];
  const filtered = useMemo(() => filter === 'All' ? talent : talent.filter(t => t.family === filter), [filter]);
  return <PageFrame eyebrow="TALENT" title={<>Talent for the <em>next problem.</em></>} intro="A presentation layer for the staffing pool across technical, commercial, people and business functions.">
    <section className="section section-light"><div className="container"><div className="talent-filter"><span>Representative profiles</span><div>{filters.map(item => <button key={item} className={filter === item ? 'filter-active' : ''} onClick={() => setFilter(item)}>{item}</button>)}</div></div><div className="talent-wall">{filtered.map((t, i) => <article className={`talent-tile talent-tile-${i % 6}`} key={`${t.name}-${i}`}><div className="talent-tile-top"><span className={`talent-code code-${t.tone}`}>{t.code}</span><span className="availability"><i></i> AVAILABLE</span></div><div className="talent-tile-copy"><span className="talent-meta">{t.meta}</span><h3>{t.name}</h3><p>{t.stack}</p></div><div className="talent-tile-bottom"><span>{t.family}</span><a href={CALENDLY} target="_blank" rel="noreferrer">Discuss <ArrowUpRight size={14}/></a></div></article>)}</div></div></section>
    <section className="section cream-section"><div className="container talent-cta-grid"><div><SectionLabel eyebrow="HIRE WITH INTENT">Need a specific combination?</SectionLabel><h2>Describe the role.<br/><em>We shape the search.</em></h2></div><div><p>Share the function, level, tools, location/time-zone needs and the outcome you’re hiring for. The staffing team can turn that into a focused requirement.</p><PrimaryButton/></div></div></section>
  </PageFrame>;
}

function Industries() {
  return <PageFrame eyebrow="INDUSTRIES" title={<>Different businesses.<br/><em>Same need for momentum.</em></>} intro="Position ANTI.AI wherever the roadmap is constrained by skill gaps, hiring latency or a sudden increase in delivery demand.">
    <section className="section section-light"><div className="container industry-list">{industries.map(([title, desc], i) => <article key={title}><div className="industry-num">0{i + 1}</div><div><h3>{title}</h3><p>{desc}</p></div><div className="industry-roles"><span>Technology</span><span>Business</span><span>Operations</span></div><ArrowUpRight/></article>)}</div></section>
    <section className="section red-section"><div className="container two-col-feature red-feature"><div><span className="tiny-overline">FROM GAP TO CAPACITY</span><h2>Staffing is a lever, <em>not a destination.</em></h2></div><div><p>Use the service to relieve a bottleneck, accelerate a release, add AI capability, build sales capacity, strengthen HR or finance operations—or assemble a team around a new business priority.</p><PrimaryButton dark>Plan an engagement</PrimaryButton></div></div></section>
  </PageFrame>;
}

function Contact() {
  return <PageFrame eyebrow="CONTACT" title={<>Let's talk about<br/><em>the work.</em></>} intro="Give us the context. We’ll make the next conversation useful.">
    <section className="section section-light"><div className="container contact-layout"><div className="contact-card"><span className="tiny-overline">FASTEST ROUTE</span><h2>Book a 30-minute conversation.</h2><p>Choose a time that works for your team. No long contact form—just a direct conversation about the staffing requirement.</p><PrimaryButton>Open Calendly</PrimaryButton><div className="contact-note"><PhoneCall size={17}/><span>Calendly opens in a new tab using the official ANTI.AI staffing scheduling link.</span></div></div><div className="contact-side"><div><span>Prefer email?</span><a href="mailto:hello@antiai.in">hello@antiai.in <ArrowUpRight size={15}/></a></div><div><span>What to bring</span><p>Role(s), function, level, expected start, working model, tools and the outcome you’re trying to accelerate.</p></div><div><span>Typical briefs</span><p>AI / engineering, sales / BDE, HR / talent, finance / operations, marketing and customer-facing roles.</p></div></div></div></section>
  </PageFrame>;
}

function PageFrame({ eyebrow, title, intro, children }) {
  return <div className="inner-page"><section className="inner-hero"><div className="container inner-hero-grid"><div><div className="eyebrow"><span className="status-dot"/> {eyebrow}</div><h1>{title}</h1><p>{intro}</p><PrimaryButton/></div><div className="inner-hero-art"><div className="vertical-mark">ANTI.AI STAFFING</div><div className="art-circle"></div><div className="art-grid"></div></div></div></section>{children}</div>;
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
          <img src="/logo-red.svg" alt="ANTI.AI" style={{ height: 'clamp(50px, 7vw, 90px)', marginBottom: '26px', display: 'block' }} />
          <p className="footer-tagline">Staffing across technology, sales, HR, finance, operations, marketing and customer teams—designed around the work that needs to get done.</p>
          <div className="footer-socials">
            <a href="https://www.linkedin.com/company/antiai" target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a>
            <a href="https://instagram.com/antiai.in" target="_blank" rel="noreferrer" aria-label="Instagram">ig</a>
            <a href="mailto:hello@antiai.in" aria-label="Email">@</a>
          </div>
        </div>
        <FooterColumn title="STAFFING" links={[['Staffing', '/staffing'], ['How it works', '/how-it-works'], ['Talent', '/talent'], ['Industries', '/industries'], ['Contact', '/contact']]} />
        <FooterColumn title="FUNCTIONS" links={roleFamilies.map(f => [f.title, '/talent'])} />
        <div className="footer-column"><span className="footer-column-title">TALK TO US</span><a className="footer-big-link" href={CALENDLY} target="_blank" rel="noreferrer">Book a 30-min call <ArrowUpRight size={16}/></a><a className="footer-mail" href="mailto:hello@antiai.in">hello@antiai.in</a><p>Have a role, team or capacity problem? Start with a direct conversation.</p></div>
      </div>

      <div className="footer-bottom"><span>© 2026 ANTI.AI. All rights reserved.</span><span className="footer-motto">अन्ते सत्यं विजयते। <b>THE TRUTH PREVAILS.</b></span></div>
    </div>
  </footer>;
}

function FooterColumn({ title, links }) {
  return <div className="footer-column"><span className="footer-column-title">{title}</span>{links.map(([label, href]) => <NavLink key={label} to={href}>{label}<ArrowUpRight size={12}/></NavLink>)}</div>;
}

function MobileBookBar() {
  return <div className="mobile-book"><span>Need people?</span><a href={CALENDLY} target="_blank" rel="noreferrer">Book a call <ArrowUpRight size={15}/></a></div>;
}

export default App;
