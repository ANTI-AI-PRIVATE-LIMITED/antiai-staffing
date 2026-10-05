import React, { useEffect, useState } from 'react';
import { Navigate, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { ArrowUpRight, ChevronDown, ChevronRight, Clock3, Code2, Cpu, Database, Globe2, Layers3, Menu, PhoneCall, ShieldCheck, Sparkles, X, Zap } from 'lucide-react';
import { industries, talent, tech } from './data';

const CALENDLY = 'https://calendly.com/tanishq-antiai/30min';

function useScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [pathname]);
}

function App() {
  useScrollTop();
  return <div className="app-shell"><Navbar /><main><Routes>
    <Route path="/" element={<Home />} />
    <Route path="/staffing" element={<Home />} />
    <Route path="/how-it-works" element={<HowItWorks />} />
    <Route path="/talent" element={<Talent />} />
    <Route path="/industries" element={<Industries />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="*" element={<Navigate to="/staffing" replace />} />
  </Routes></main><Footer /><MobileBookBar /></div>;
}

function Navbar() {
  const [open, setOpen] = useState(false);
  return <>
    <header className="nav-wrap">
      <div className="nav">
        <NavLink to="/staffing" className="brand" onClick={() => setOpen(false)}>
          <img src="/antiai-mark.svg" alt="ANTI.AI" />
          <span><b>ANTI</b><i>.AI</i><small>STAFFING</small></span>
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
          <button className="menu-btn" aria-label="Toggle menu" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
        </div>
      </div>
    </header>
  </>;
}

function PrimaryButton({ children='Schedule a 30-min call', href=CALENDLY, dark=false }) {
  return <a href={href} target="_blank" rel="noreferrer" className={`btn ${dark ? 'btn-dark' : 'btn-red'}`}>{children}<ArrowUpRight size={17}/></a>;
}

function SectionLabel({ eyebrow, children }) { return <div className="section-label"><span>{eyebrow}</span><b>{children}</b></div> }

function Home() {
  return <>
    <section className="hero hero-home">
      <div className="hero-grid"></div>
      <div className="container hero-inner">
        <div className="hero-copy">
          <div className="eyebrow"><span className="status-dot"/> AI & software talent, on demand</div>
          <h1>Build the team your roadmap <em>actually</em> needs.</h1>
          <p className="hero-lead">ANTI.AI helps companies access vetted engineers, AI specialists and technical talent without turning every project into another long hiring cycle.</p>
          <div className="hero-actions"><PrimaryButton/><a className="ghost-link" href="#capabilities">Explore capabilities <ChevronRight size={17}/></a></div>
          <div className="micro-proof"><ShieldCheck size={17}/><span>Built for product teams, startups and growing technology businesses.</span></div>
        </div>
        <div className="hero-visual">
          <div className="hero-orbit orbit-a"></div><div className="hero-orbit orbit-b"></div><div className="hero-orbit orbit-c"></div>
          <div className="talent-panel">
            <div className="panel-top"><span>LIVE TALENT SIGNAL</span><span className="live-pill"><span className="live-dot"/> OPEN</span></div>
            <div className="panel-title">The right specialist<br/><strong>for the next sprint.</strong></div>
            <div className="profile-stack">
              {talent.slice(0,4).map((t, i) => <div className="mini-profile" key={t.name}><div className={`avatar avatar-${i}`}>{t.code}</div><div><b>{t.name}</b><span>{t.stack.split(' · ').slice(0,2).join(' · ')}</span></div><span className="profile-check">✓</span></div>)}
            </div>
            <div className="panel-foot"><span><Clock3 size={15}/> Structured to move fast</span><a href={CALENDLY} target="_blank" rel="noreferrer">Meet the team <ArrowUpRight size={14}/></a></div>
          </div>
          <div className="floating-stat stat-one"><span>Talent mapped</span><strong>AI-first</strong></div>
          <div className="floating-stat stat-two"><span>Engagement</span><strong>Flexible</strong></div>
        </div>
      </div>
    </section>

    <section className="signal-strip">
      <div className="container signal-inner">
        <span>TECHNICAL CAPABILITIES</span>
        <div className="tech-marquee">{[...tech,...tech].map((x,i)=><span key={i}>{x}</span>)}</div>
      </div>
    </section>

    <section className="section section-light" id="capabilities">
      <div className="container">
        <div className="section-head split-head"><div><SectionLabel eyebrow="01 / CAPABILITIES">Talent that fits the work.</SectionLabel></div><p>From a specialist who joins tomorrow to a complete engineering pod, we shape staffing around the problem in front of you.</p></div>
        <div className="cap-grid">
          <Capability icon={<Cpu/>} title="AI & ML" desc="AI engineers, LLM specialists, RAG builders, ML and applied intelligence." tag="AI-FIRST" large />
          <Capability icon={<Code2/>} title="Software Engineering" desc="Frontend, backend, full-stack and mobile talent for production systems." tag="BUILD" />
          <Capability icon={<Database/>} title="Data & Analytics" desc="Data engineering, analytics and platform specialists for decision-ready systems." tag="SCALE" />
          <Capability icon={<Zap/>} title="Cloud & DevOps" desc="Cloud, CI/CD and reliability specialists that remove infrastructure bottlenecks." tag="SHIP" />
          <Capability icon={<ShieldCheck/>} title="QA & Automation" desc="Automation and quality engineering that keeps delivery moving safely." tag="QUALITY" />
          <Capability icon={<Layers3/>} title="Product & Design" desc="UX, product and technical leadership when the roadmap needs more than code." tag="PRODUCT" />
        </div>
      </div>
    </section>

    <section className="section dark-section process-preview">
      <div className="container">
        <div className="section-head split-head light-head"><div><SectionLabel eyebrow="02 / HOW IT WORKS">A shorter path to the right people.</SectionLabel></div><p>We keep the operating model simple: understand the brief, curate the right profiles, meet the people you like, and move.</p></div>
        <div className="process-grid">
          <ProcessStep number="01" title="Tell us what you need" desc="Share the role, stack, scope and context. A short call is enough to start." />
          <ProcessStep number="02" title="We shape the shortlist" desc="We focus the search around capability, working style and your delivery environment." />
          <ProcessStep number="03" title="Meet the shortlist" desc="Talk to the people who could actually do the work. No endless sourcing chain." />
          <ProcessStep number="04" title="Start building" desc="Choose the engagement model that fits your team and get moving." />
        </div>
        <div className="dark-cta-row"><div><span className="tiny-overline">READY WHEN YOU ARE</span><strong>Bring us the hard-to-fill role.</strong></div><PrimaryButton dark>Start the conversation</PrimaryButton></div>
      </div>
    </section>

    <section className="section red-section">
      <div className="container statement-layout"><div className="statement-mark">ANTI</div><div><span className="tiny-overline">WHY ANTI.AI</span><h2>Not a resume dump.<br/><em>A delivery partner.</em></h2><p>Strong staffing is not about sending more profiles. It is about understanding the work well enough to place people who can contribute inside your team.</p><PrimaryButton dark>Talk to a specialist</PrimaryButton></div></div>
    </section>

    <section className="section section-light showcase-section">
      <div className="container">
        <div className="section-head split-head"><div><SectionLabel eyebrow="03 / SAMPLE TALENT">See the kind of talent we speak.</SectionLabel></div><p>Representative profiles to show how the service can be presented. Connect this section to real talent data when the staffing platform is ready.</p></div>
        <div className="talent-grid">{talent.map((t,i)=><TalentCard key={t.name} t={t} i={i}/>)}</div>
      </div>
    </section>

    <section className="section cream-section">
      <div className="container"><div className="section-head"><SectionLabel eyebrow="04 / ENGAGEMENTS">Choose the shape of the engagement.</SectionLabel></div>
        <div className="engagement-grid">
          <Engagement label="01" title="Staff Augmentation" desc="Add a specialist to your existing team, process and sprint cadence." bullets={['Embedded with your team','Flexible capacity','You stay in control']} />
          <Engagement label="02" title="Dedicated Team" desc="Build a focused engineering pod around a product, initiative or roadmap." bullets={['Multi-role team','Shared delivery ownership','Scale as needs change']} featured />
          <Engagement label="03" title="Project Delivery" desc="Hand over a defined outcome and let the delivery team own the path to release." bullets={['Defined scope','Technical leadership','Outcome-focused']} />
        </div>
      </div>
    </section>

    <section className="section section-light industries-preview">
      <div className="container"><div className="section-head split-head"><div><SectionLabel eyebrow="05 / INDUSTRIES">Built for teams with something to ship.</SectionLabel></div><p>Our positioning can flex from a startup hiring its first senior engineer to an established product team filling a specialist gap.</p></div>
        <div className="industry-grid">{industries.map(([title,desc],i)=><div className="industry-card" key={title}><span>0{i+1}</span><h3>{title}</h3><p>{desc}</p><ArrowUpRight size={18}/></div>)}</div>
      </div>
    </section>

    <section className="final-cta">
      <div className="final-noise"></div>
      <div className="container final-cta-inner"><div><span className="tiny-overline">LET'S BUILD THE TEAM</span><h2>Your next hire<br/><em>should unlock the roadmap.</em></h2></div><div className="final-side"><p>Tell us what you’re building, what is blocked, and which skills are missing. We’ll take it from there.</p><PrimaryButton dark>Schedule with ANTI.AI</PrimaryButton></div></div>
    </section>
  </>;
}

function Capability({ icon,title,desc,tag,large }) { return <article className={`cap-card ${large?'cap-large':''}`}><div className="cap-icon">{icon}</div><span className="card-tag">{tag}</span><h3>{title}</h3><p>{desc}</p><ArrowUpRight className="card-arrow" size={18}/></article> }
function ProcessStep({number,title,desc}) { return <div className="process-step"><span>{number}</span><div><h3>{title}</h3><p>{desc}</p></div></div> }
function TalentCard({t,i}) { return <article className="talent-card"><div className="talent-card-top"><div className={`large-avatar avatar-${i%4}`}>{t.code}</div><span className="available">AVAILABLE <b>●</b></span></div><span className="talent-meta">{t.meta}</span><h3>{t.name}</h3><p>{t.stack}</p><div className="talent-card-bottom"><span>ANTI.AI pool</span><a href={CALENDLY} target="_blank" rel="noreferrer">Discuss a role <ArrowUpRight size={15}/></a></div></article> }
function Engagement({label,title,desc,bullets,featured}) { return <article className={`eng-card ${featured?'eng-featured':''}`}><span>{label}</span><h3>{title}</h3><p>{desc}</p><div className="bullets">{bullets.map(b=><div key={b}><span>+</span>{b}</div>)}</div><ArrowUpRight className="eng-arrow" size={18}/></article> }

function HowItWorks(){
  return <PageFrame eyebrow="HOW IT WORKS" title={<>A clean hiring motion.<br/><em>Less friction, more progress.</em></>} intro="A strong staffing experience should feel like an extension of your team—not another system to manage.">
    <section className="section section-light"><div className="container"><div className="step-stack">
      {[
        ['01','Brief','Tell us the role, the stack, the delivery context and what success looks like.'],
        ['02','Curate','We turn the brief into a focused search and shortlist the profiles that actually fit.'],
        ['03','Meet','Your team talks directly to the candidates. Evaluate technical depth, communication and fit.'],
        ['04','Start','Select the engagement model and get the person or pod into the work.'],
      ].map(([n,t,d],i)=><div className="big-step" key={n}><span>{n}</span><div><div className="big-step-kicker">{String(i+1).padStart(2,'0')} / {t.toUpperCase()}</div><h3>{t}</h3><p>{d}</p></div><ChevronRight size={24}/></div>)}
    </div></div></section>
    <section className="section dark-section"><div className="container two-col-feature"><div><SectionLabel eyebrow="THE OPERATING PRINCIPLE">The work stays human.</SectionLabel><h2>We use process to remove noise, <em>not people.</em></h2></div><div className="feature-list"><div><ShieldCheck/><b>Curated over crowded</b><span>A smaller, clearer shortlist is easier to evaluate than a wall of resumes.</span></div><div><Globe2/><b>Context over keywords</b><span>We care about the environment a person will work in, not just the tools on a CV.</span></div><div><Zap/><b>Momentum over ceremony</b><span>The site makes the next step obvious, so conversations can start quickly.</span></div></div></div></section>
    <section className="section section-light"><div className="container cta-panel"><div><span className="tiny-overline">READY TO START</span><h2>Tell us the role you cannot afford to get wrong.</h2></div><PrimaryButton/></div></section>
  </PageFrame>
}

function Talent(){
  return <PageFrame eyebrow="TALENT" title={<>Talent for the <em>next problem.</em></>} intro="A presentation layer for the staffing pool: technical depth, clear skill signals and a direct path to a conversation.">
    <section className="section section-light"><div className="container"><div className="talent-filter"><span>Showing representative profiles</span><div><button className="filter-active">All</button><button>AI & ML</button><button>Software</button><button>Data</button><button>Cloud</button></div></div><div className="talent-grid talent-grid-wide">{talent.concat(talent.slice(0,2)).map((t,i)=><TalentCard t={t} i={i} key={`${t.name}-${i}`}/>)}</div></div></section>
    <section className="section cream-section"><div className="container talent-cta-grid"><div><SectionLabel eyebrow="HIRE WITH INTENT">Need a specific combination?</SectionLabel><h2>Describe the role.<br/><em>We shape the search.</em></h2></div><div><p>Share your stack, level, location/time-zone needs and the outcome you’re hiring for. The staffing team can turn that into a focused requirement.</p><PrimaryButton/></div></div></section>
  </PageFrame>
}

function Industries(){
  return <PageFrame eyebrow="INDUSTRIES" title={<>Different businesses.<br/><em>Same need for momentum.</em></>} intro="Position ANTI.AI wherever the roadmap is constrained by skill gaps, hiring latency or a sudden increase in delivery demand.">
    <section className="section section-light"><div className="container industry-list">{industries.map(([title,desc],i)=><article key={title}><div className="industry-num">0{i+1}</div><div><h3>{title}</h3><p>{desc}</p></div><div className="industry-roles">{['Engineering','AI / Data','Product'].map(r=><span key={r}>{r}</span>)}</div><ArrowUpRight/></article>)}</div></section>
    <section className="section red-section"><div className="container two-col-feature red-feature"><div><span className="tiny-overline">FROM GAP TO CAPACITY</span><h2>Staffing is a lever, <em>not a destination.</em></h2></div><div><p>Use the service to relieve a bottleneck, accelerate a release, add AI capability or build a team around a new product line—without redesigning your entire organisation around the hire.</p><PrimaryButton dark>Plan an engagement</PrimaryButton></div></div></section>
  </PageFrame>
}

function Contact(){
  return <PageFrame eyebrow="CONTACT" title={<>Let's talk about<br/><em>the work.</em></>} intro="Give us the context. We’ll make the next conversation useful.">
    <section className="section section-light"><div className="container contact-layout"><div className="contact-card"><span className="tiny-overline">FASTEST ROUTE</span><h2>Book a 30-minute conversation.</h2><p>Choose a time that works for your team. No long contact form—just a direct conversation about the staffing requirement.</p><PrimaryButton>Open Calendly</PrimaryButton><div className="contact-note"><PhoneCall size={17}/><span>Calendly opens in a new tab using the official ANTI.AI staffing scheduling link.</span></div></div><div className="contact-side"><div><span>Prefer email?</span><a href="mailto:hello@antiai.in">hello@antiai.in <ArrowUpRight size={15}/></a></div><div><span>What to bring</span><p>Role(s), stack, level, expected start, working model and the outcome you’re trying to accelerate.</p></div></div></div></section>
  </PageFrame>
}

function PageFrame({eyebrow,title,intro,children}){ return <div className="inner-page"><section className="inner-hero"><div className="container inner-hero-grid"><div><div className="eyebrow"><span className="status-dot"/> {eyebrow}</div><h1>{title}</h1><p>{intro}</p><PrimaryButton/></div><div className="inner-hero-art"><div className="vertical-mark">ANTI.AI</div><div className="art-circle"></div><div className="art-grid"></div></div></div></section>{children}</div> }

function Footer(){ return <footer className="footer">
  <div className="container">
    <div className="footer-brand-block">
      <h2 className="footer-big-brand">ANTI<span className="footer-dot">.</span>AI</h2>
      <p className="footer-tagline">A software company focused on responsible, human-governed artificial intelligence. Powerful, auditable, aligned with real-world accountability.</p>
      <div className="footer-socials">
        <a href="https://instagram.com/antiai.in" target="_blank" rel="noreferrer" aria-label="Instagram">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
        </a>
        <a href="https://threads.net/@antiai" target="_blank" rel="noreferrer" aria-label="Threads">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><text x="12" y="16" textAnchor="middle" fill="currentColor" stroke="none" fontSize="12" fontWeight="600">@</text></svg>
        </a>
        <a href="https://youtube.com/@antiai" target="_blank" rel="noreferrer" aria-label="YouTube">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/></svg>
        </a>
        <a href="https://linkedin.com/company/antiai" target="_blank" rel="noreferrer" aria-label="LinkedIn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
        </a>
      </div>
    </div>
    <div className="footer-motto-divider"></div>
    <div className="footer-motto-strip">
      <span className="motto-sanskrit">अन्ते सत्यं विजयते।</span>
      <span className="motto-english">THE TRUTH PREVAILS.</span>
    </div>
  </div>
</footer> }
function MobileBookBar(){ return <div className="mobile-book"><span>Need talent?</span><a href={CALENDLY} target="_blank" rel="noreferrer">Book a call <ArrowUpRight size={15}/></a></div> }

export default App;
