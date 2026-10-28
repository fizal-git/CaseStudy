import { BASE_CSS, SHARED_CSS } from "./styles.js";

const CARDS = [
  {
    href: "#/energyhub",
    num: "Case study 01",
    title: "EnergyHub — turning a stressful moving day into a three-minute setup.",
    text: "A multi-provider utilities signup funnel evolved into a responsive, multi-brand design system across desktop, tablet and mobile.",
    tags: ["Responsive web", "Design system", "Conversion funnel", "Multi-brand"],
    visual: <img className="cover-desktop" src="/energyhub-cover.jpg" alt="" />,
  },
  {
    href: "#/connectnow-agent",
    num: "Case study 02",
    title: "Connectnow Agent App — turning property agents into a referral channel.",
    text: "A mobile app for real estate agents to refer movers, track every connection and earn redeemable rewards — designed as a proof of concept.",
    tags: ["iOS mobile app", "Referrals", "Rewards & gamification", "POC"],
    visual: (
      <div className="phone-trio">
        <img src="/connectnow-agent/a03-new-referral.png" alt="" />
        <img src="/connectnow-agent/a02-home.png" alt="" />
        <img src="/connectnow-agent/a08-dashboard.png" alt="" />
      </div>
    ),
  },
  {
    href: "#/connectnow-customer",
    num: "Case study 03",
    title: "Connectnow Customer App — from an agent's text to power on.",
    text: "The customer side of the referral: Google or guest sign-in, scan-assisted ID, live connection tracking and one-tap cross-sell of internet and gas.",
    tags: ["iOS mobile app", "Onboarding", "Identity verification", "Cross-sell"],
    visual: (
      <div className="phone-trio">
        <img src="/connectnow-customer/c04-confirm-checklist.png" alt="" />
        <img src="/connectnow-customer/c01-welcome.png" alt="" />
        <img src="/connectnow-customer/c11-success.png" alt="" />
      </div>
    ),
  },
];

const HOME_CSS = `
  .home-root .hero-wordmark{top:0;}
`;

export default function Home() {
  return (
    <div className="cs-root home-root">
      <style>{BASE_CSS + SHARED_CSS + HOME_CSS}</style>

      <nav className="cs-nav">
        <div className="cs-nav-inner">
          <div className="cs-logo">Mohammed <span>Fizal</span> — Portfolio</div>
          <a className="cs-back" href="mailto:mohammedfizalart@gmail.com">Get in touch</a>
        </div>
      </nav>

      <header className="home-hero wrap">
        <div className="hero-wordmark" aria-hidden="true">
          {[0, 1, 2].map((i) => <span key={i}>{Array(10).fill("CASE STUDIES").join(" ")}</span>)}
        </div>
        <div className="hero-eyebrow" style={{ position: "relative", zIndex: 1 }}>Senior Product Designer · UX / UI</div>
        <h1>Designing calm, connected experiences for complicated moments.</h1>
        <p className="lede">
          Selected case studies from 10+ years of designing products end to end — from research and
          journey mapping to accessible, production-ready design systems.
        </p>
        <div className="home-links">
          <a href="https://fizaluxdesigner.vercel.app/" target="_blank" rel="noopener noreferrer">Resume ↗</a>
          <a href="https://www.linkedin.com/in/mohammed-fizal-18775812a/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
          <a href="mailto:mohammedfizalart@gmail.com">Email</a>
        </div>
      </header>

      <main className="wrap home-grid" aria-label="Case studies">
        {CARDS.map((c) => {
          const inner = (
            <>
              <div className="home-card-body">
                <span className="home-card-num">{c.num}</span>
                <h2>{c.title}</h2>
                <p>{c.text}</p>
                <div className="home-tags">{c.tags.map((t) => <span key={t}>{t}</span>)}</div>
                <span className="home-cta">{c.href ? "View case study →" : "In progress"}</span>
              </div>
              <div className="home-card-visual">{c.visual}</div>
            </>
          );
          return c.href ? (
            <a key={c.num} className="home-card" href={c.href}>{inner}</a>
          ) : (
            <div key={c.num} className="home-card is-soon" aria-disabled="true">{inner}</div>
          );
        })}
      </main>

      <footer className="cs-footer">
        Mohammed Fizal — Senior Product Designer · <a href="mailto:mohammedfizalart@gmail.com" className="footer-link">mohammedfizalart@gmail.com</a> · <a href="https://www.linkedin.com/in/mohammed-fizal-18775812a/" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a> · <a href="https://fizaluxdesigner.vercel.app/" target="_blank" rel="noopener noreferrer" className="footer-link">Resume</a>
      </footer>
    </div>
  );
}
