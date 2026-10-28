import { ChevronDown } from "lucide-react";

/* Shared building blocks for the Connectnow case studies */

function elbowPath(x1, y1, x2, y2, r) {
  if (Math.abs(x2 - x1) < 0.5) return `M ${x1} ${y1} L ${x2} ${y2}`;
  const midY = y1 + (y2 - y1) / 2;
  const dir = x2 > x1 ? 1 : -1;
  const rr = Math.min(r, Math.abs(x2 - x1) / 2, Math.abs(midY - y1), Math.abs(y2 - midY));
  return `M ${x1} ${y1} L ${x1} ${midY - rr} Q ${x1} ${midY} ${x1 + dir * rr} ${midY} L ${x2 - dir * rr} ${midY} Q ${x2} ${midY} ${x2} ${midY + rr} L ${x2} ${y2}`;
}

export function SiteMapTree({ data }) {
  const n = data.branches.length;
  const branchX = (i) => ((i + 0.5) / n) * 100;
  return (
    <div className="sitemap-tree">
      <div className="sitemap-root">{data.root}</div>
      <div className="sitemap-canvas">
        <svg className="sitemap-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {data.branches.map((b, i) => (
            <path key={b.name} d={elbowPath(50, 0, branchX(i), 100, 18)} vectorEffect="non-scaling-stroke" />
          ))}
        </svg>
        <div className="sitemap-columns">
          {data.branches.map((b) => (
            <div className="sitemap-col" key={b.name}>
              <div className="sitemap-branch">{b.name}</div>
              <div className="sitemap-col-line" />
              <div className="sitemap-children">
                {b.items.map((it) => <div className="sitemap-item" key={it}>{it}</div>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function makePhone(SCREENS, appLabel) {
  return function Phone({ k, eager, fixed }) {
    const s = SCREENS[k];
    const img = <img src={s.src} alt={`${appLabel} — ${s.title}`} width="390" height={s.h} loading={eager ? "eager" : "lazy"} />;
    if (!fixed) return <div className="phone">{img}</div>;
    const tall = s.h > 860;
    return (
      <div className="phone phone-fixed">
        <div className="phone-scroll" tabIndex={tall ? 0 : undefined} aria-label={tall ? `${s.title} — scrollable screen` : undefined}>{img}</div>
        {tall && <span className="scroll-hint" aria-hidden="true">Scroll ↕</span>}
      </div>
    );
  };
}

export function PersonaCard({ p, open, onToggle }) {
  return (
    <div className={`persona-card ${open ? "is-open" : ""}`}>
      <button className="persona-head" onClick={onToggle} aria-expanded={open}>
        <div className="persona-avatar" aria-hidden="true">{p.name.split(" ").map((n) => n[0]).join("")}</div>
        <div className="persona-headtext">
          <span className="persona-badge">{p.badge}</span>
          <h3>{p.name}</h3>
          <p>{p.role}</p>
        </div>
        <ChevronDown className={`persona-chev ${open ? "rot" : ""}`} size={20} />
      </button>
      <div className="persona-stats">
        {p.stats.map(([l, v]) => <div key={l}><span>{v}</span><label>{l}</label></div>)}
      </div>
      {open && (
        <div className="persona-body">
          <div className="persona-cols">
            <div><h4>Background</h4><p>{p.background}</p></div>
            <div><h4>Current situation</h4><p>{p.situation}</p></div>
          </div>
          <h4>Core goals</h4>
          <ul className="persona-goals">
            {p.goals.map((g) => <li key={g.title}><strong>{g.title}</strong><span>{g.desc}</span></li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

export const CN_CSS = `
  .cn-root{ --accent:#1C7C36; --accentSoft:#E7F5EA; --brand:#2EA347; --brandDark:#0B2713; }
  .cn-root .hero-shot{background:var(--paper3); box-shadow:none;}
  .cn-hero-phones{display:flex; justify-content:center; align-items:flex-start; gap:24px; padding:40px 24px 0; max-height:560px; overflow:hidden; position:relative;}
  .cn-hero-phones::after{content:''; position:absolute; left:0; right:0; bottom:0; height:90px; background:linear-gradient(transparent, var(--paper3));}
  .cn-hero-phones .phone{width:260px; flex-shrink:0;}
  .cn-hero-phones .phone:nth-child(1), .cn-hero-phones .phone:nth-child(3){margin-top:60px;}
  @media (max-width:760px){ .cn-hero-phones .phone:nth-child(1), .cn-hero-phones .phone:nth-child(3){display:none;} }

  .brief-card{background:var(--paper2); border-radius:16px; padding:var(--s5) var(--s6);}
  .brief-card h4{font-family:'Work Sans'; font-weight:600; font-size:14px; margin:0 0 10px; display:flex; gap:8px; align-items:center;}
  .brief-card ul{margin:0; padding-left:18px; display:grid; gap:8px;}
  .brief-card li{font-size:14px; color:var(--muted);}

  .persona-stats span{font-weight:500;}
  @media (max-width:640px){ .cn-root .persona-stats{padding-left:var(--s5); flex-wrap:wrap; gap:16px 24px;} }

  .cn-journey-shot{width:100%; max-width:240px; align-self:start;}
  .phone-fixed{position:relative;}
  .phone-scroll{aspect-ratio:390/844; overflow-y:auto; border-radius:21px; scrollbar-width:thin;}
  .phone-scroll:focus-visible{outline:2px solid var(--accent); outline-offset:2px;}
  .scroll-hint{position:absolute; bottom:14px; left:50%; transform:translateX(-50%); font-family:'Work Sans'; font-weight:600; font-size:11px; background:rgba(23,23,23,.82); color:#fff; padding:5px 10px; border-radius:20px; pointer-events:none;}
  .cn-root .journey-panel-body{grid-template-columns:1fr 240px;}
  @media (max-width:700px){ .cn-root .journey-panel-body{grid-template-columns:1fr;} .cn-journey-shot{max-width:260px;} }
  .journey-node.active .journey-node-dot{border-color:var(--accent); background:var(--accent);}

  .story-group{margin-bottom:var(--s8);}
  .story-group-title{font-family:'IBM Plex Mono'; font-weight:600; font-size:12px; letter-spacing:.08em; text-transform:uppercase; color:var(--accent); margin:0 0 var(--s5); padding-bottom:12px; border-bottom:1px solid var(--line);}
  .story{display:grid; grid-template-columns:280px 1fr; gap:var(--s8); align-items:start; padding:var(--s6) 0; border-bottom:1px solid var(--line);}
  .story:last-child{border-bottom:none;}
  .story.flip{grid-template-columns:1fr 280px;}
  .story.flip .story-shot{order:2;}
  .story-shot{position:sticky; top:96px;}
  .story-code{color:var(--accent); font-weight:600;}
  .story-title{font-family:'Playfair Display'; font-weight:700; font-size:clamp(22px,2.6vw,28px); margin:6px 0 4px; line-height:1.2;}
  .story-sub{font-size:14px; color:var(--mutedLight); margin:0 0 var(--s5);}
  .story-block{margin-bottom:var(--s5);}
  .story-block:last-child{margin-bottom:0;}
  .story-about{font-size:16px; margin:0; max-width:620px;}
  .story-research{list-style:none; margin:0; padding:0; display:grid; gap:10px; max-width:620px;}
  .story-research li{font-size:14px; color:var(--muted); background:var(--paper2); border-radius:10px; padding:12px 14px 12px 36px; position:relative;}
  .story-research li::before{content:''; position:absolute; left:15px; top:19px; width:7px; height:7px; border-radius:50%; background:var(--accent);}
  .story-value{display:grid; grid-template-columns:1fr 1fr; gap:12px; max-width:620px;}
  .story-value div{background:var(--accentSoft); border-radius:10px; padding:14px 16px;}
  .story-value b{display:block; font-family:'Work Sans'; font-weight:600; font-size:13px; color:var(--accent); margin-bottom:4px;}
  .story-value span{font-size:14px; color:var(--ink);}
  @media (max-width:820px){
    .story, .story.flip{grid-template-columns:1fr; gap:var(--s5);}
    .story.flip .story-shot{order:0;}
    .story-shot{position:static; max-width:280px; width:100%; margin:0 auto;}
    .story-value{grid-template-columns:1fr;}
  }
  .decision-grid{display:grid; grid-template-columns:repeat(2,1fr); gap:var(--s3);}
  @media (max-width:640px){ .decision-grid{grid-template-columns:1fr;} }
  .decision-card{background:var(--paper2); border-radius:14px; padding:var(--s4) var(--s5);}
  .decision-card .mono{color:var(--accent); font-weight:600;}
  .decision-card b{font-family:'Work Sans'; font-weight:700; font-size:15px; display:block; margin:6px 0;}
  .decision-card p{font-size:13.5px; color:var(--muted); margin:0;}

  .swatch-grid{display:grid; grid-template-columns:repeat(4,1fr); gap:12px; margin-bottom:var(--s5);}
  @media (max-width:700px){ .swatch-grid{grid-template-columns:repeat(2,1fr);} }
  .swatch{background:#fff; border-radius:12px; overflow:hidden; border:1px solid var(--line);}
  .swatch-chip{height:64px; border-bottom:1px solid var(--line);}
  .swatch-meta{padding:10px 12px; font-size:12.5px;}
  .swatch-meta b{display:block; font-weight:600;}
  .swatch-meta code{font-family:'IBM Plex Mono'; font-size:11.5px; color:var(--muted);}
  .swatch-meta small{display:block; font-size:11px; color:var(--mutedLight); margin-top:2px;}
  .type-sample{background:#fff; border-radius:12px; padding:var(--s4) var(--s5); border:1px solid var(--line); margin-bottom:var(--s4);}
  .type-sample .big{font-family:'Outfit', sans-serif; font-size:34px; font-weight:400; line-height:1.15;}
  .type-sample .btn{display:inline-block; margin-top:14px; font-family:'Outfit', sans-serif; font-weight:600; font-size:20px; background:var(--brand); color:#fff; border-radius:12px; padding:14px 28px;}
  .type-sample p{font-size:13px; color:var(--muted); margin:10px 0 0;}

  .next-card{background:var(--ink); color:#fff; border-radius:20px; padding:var(--s6); display:flex; flex-wrap:wrap; gap:20px; align-items:center; justify-content:space-between;}
  .next-card .kicker{color:#9AE0B5; margin-bottom:6px;}
  .next-card h3{font-family:'Playfair Display'; font-weight:700; font-size:22px; margin:0;}
  .next-card p{margin:6px 0 0; color:rgba(255,255,255,.75); font-size:14px; max-width:520px;}
  .next-card a{font-family:'Work Sans'; font-weight:600; font-size:14px; color:var(--ink); background:#fff; padding:10px 18px; border-radius:24px; text-decoration:none; white-space:nowrap;}
`;

