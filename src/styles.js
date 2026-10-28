/* Shared case-study styles (originally from the EnergyHub page) */
export const BASE_CSS = `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Work+Sans:ital,wght@0,400;0,500;0,600;1,400&family=IBM+Plex+Mono:wght@400;500&family=Caveat:wght@500;700&display=swap');

        .cs-root{
          --ink:#171717; --paper:#FFFFFF; --paper2:#F5F5F5; --paper3:#F3F3F4;
          --accent:#2E9E5B; --accentSoft:#E5F5EA; --line:#E9E9E9;
          --muted:#525252; --mutedLight:#A3A3A3;
          --s1:8px; --s2:12px; --s3:16px; --s4:20px; --s5:24px; --s6:32px; --s7:40px; --s8:56px; --s9:76px;
          background:var(--paper); color:var(--ink);
          font-family:'Work Sans', sans-serif;
          line-height:1.6; -webkit-font-smoothing:antialiased;
          overflow-x:hidden;
        }
        .cs-root *{box-sizing:border-box;}
        .mono{font-family:'IBM Plex Mono'; font-size:11px; letter-spacing:.06em; text-transform:uppercase; color:var(--mutedLight); font-weight:500;}
        .disp{font-family:'Playfair Display'; font-weight:800;}
        .wrap{max-width:1080px; margin:0 auto; padding-left:28px; padding-right:28px;}
        @media (prefers-reduced-motion: reduce){ .cs-root *{animation:none !important; transition:none !important;} }

        /* NAV */
        .cs-nav{position:sticky; top:0; z-index:40; backdrop-filter:blur(8px); background:rgba(255,255,255,.86); border-bottom:1px solid var(--line);}
        .cs-nav-inner{max-width:1080px; margin:0 auto; padding:16px 28px; display:flex; align-items:center; justify-content:space-between; gap:24px;}
        .cs-logo{font-family:'Playfair Display'; font-weight:700; font-size:15px; letter-spacing:-.01em;}
        .cs-logo span{color:var(--accent);}
        .cs-navlinks{display:flex; gap:22px; list-style:none; margin:0; padding:0;}
        .cs-navlinks button{background:none;border:none;cursor:pointer;font-size:13.5px;color:var(--muted);font-family:'Work Sans'; font-weight:500; padding:4px 0; border-bottom:2px solid transparent;}
        .cs-navlinks button.active{color:var(--ink); border-color:var(--accent);}
        @media (max-width:760px){ .cs-navlinks{display:none;} }

        /* HERO */
        .hero{padding:var(--s9) 0 var(--s9) 0; position:relative; scroll-margin-top:72px;}
        .hero-wordmark{position:absolute; top:-10px; left:50%; width:100vw; margin-left:-50vw; z-index:0; pointer-events:none; overflow:hidden; height:340px;}
        .hero-wordmark span{display:block; font-family:'Work Sans'; font-weight:800; font-size:min(11vw,108px); line-height:1; color:var(--paper3); white-space:nowrap; letter-spacing:.01em;}
        .hero-eyebrow, .hero h1, .hero p.lede, .hero-meta, .hero-shot{position:relative; z-index:1;}
        .hero-eyebrow{font-family:'IBM Plex Mono'; font-weight:600; font-size:11px; letter-spacing:.08em; text-transform:uppercase; color:var(--accent); display:flex; align-items:center; gap:8px; margin-bottom:18px;}
        .hero-eyebrow::before{content:''; width:7px; height:7px; border-radius:50%; background:var(--accent); display:inline-block;}
        .hero h1{font-family:'Playfair Display'; font-weight:700; font-size:clamp(34px,6vw,58px); line-height:1.08; letter-spacing:-.01em; max-width:760px; margin:0 0 20px;}
        .hero p.lede{font-size:18px; color:var(--muted); max-width:540px; margin:0 0 32px;}
        .hero-meta{display:flex; flex-wrap:wrap; gap:28px; margin-top:40px; padding-top:28px; border-top:1px solid var(--line);}
        .hero-meta div{font-size:13.5px;}
        .hero-meta label{display:block; color:var(--mutedLight); font-family:'IBM Plex Mono'; font-weight:500; font-size:11px; text-transform:uppercase; letter-spacing:.05em; margin-bottom:5px;}
        .hero-shot{margin-top:56px; border-radius:14px; overflow:hidden; box-shadow:0 30px 60px -30px rgba(23,23,23,.3); background:#fff;}
        .hero-shot img{width:100%; display:block;}
        .browser-chrome{position:relative; justify-content:space-between;}
        .bp-toggle{display:flex; gap:4px;}
        .bp-toggle button{font-family:'Work Sans'; font-weight:500; font-size:11.5px; padding:5px 12px; border-radius:20px; border:none; background:transparent; color:var(--muted); cursor:pointer;}
        .bp-toggle button.active{background:var(--ink); color:#fff;}
        .hero-shot-frame{background:var(--paper3); display:flex; justify-content:center;}
        .bp-mobile .hero-shot-frame img, .bp-tablet .hero-shot-frame img{width:auto; max-width:100%; margin:0 auto;}
        .bp-mobile .hero-shot-frame{padding:18px 0;}
        .bp-mobile .hero-shot-frame img{height:520px; width:auto; border-radius:14px; box-shadow:0 20px 40px rgba(0,0,0,.15);}
        .bp-tablet .hero-shot-frame{padding:14px 0;}
        .bp-tablet .hero-shot-frame img{height:560px; width:auto; border-radius:8px; box-shadow:0 20px 40px rgba(0,0,0,.12);}
        .browser-chrome{background:var(--ink); padding:10px 14px; display:flex; align-items:center; gap:6px;}
        .browser-chrome span{width:9px;height:9px;border-radius:50%;background:rgba(255,255,255,.25);display:inline-block;}

        section{padding:var(--s9) 0; border-bottom:1px solid var(--line); scroll-margin-top:72px;}
        .kicker{font-family:'IBM Plex Mono'; font-weight:600; font-size:11px; letter-spacing:.08em; text-transform:uppercase; color:var(--accent); margin-bottom:var(--s3);}
        h2.h2{font-family:'Playfair Display'; font-weight:700; font-size:clamp(24px,3.4vw,36px); margin:0 0 var(--s4); max-width:640px; letter-spacing:-.01em;}
        .lead-p{font-size:17px; color:var(--muted); max-width:620px; margin:0 0 var(--s6);}

        .focus-section{max-width:640px; margin:calc(var(--s9) - var(--s6)) auto; padding:var(--s6) var(--s6); background:var(--ink); border-radius:20px; color:#fff;}
        .focus-section .kicker{color:#9AE0B5;}
        .focus-pills{display:flex; flex-wrap:wrap; gap:var(--s2); justify-content:center;}
        .focus-pill{font-family:'Work Sans'; font-weight:500; font-size:14px; padding:var(--s2) var(--s4); border-radius:30px; border:1px solid rgba(255,255,255,.3); background:transparent; color:#fff;}

        /* PROJECT CONTEXT */
        .context-steps{display:grid; gap:var(--s3); margin-top:var(--s6);}
        .context-step{display:flex; gap:var(--s4); align-items:flex-start; background:var(--paper2); border-radius:14px; padding:var(--s4) var(--s5);}
        .context-step-num{font-family:'Work Sans'; font-weight:700; font-size:13px; color:#fff; background:var(--accent); border-radius:50%; width:30px; height:30px; display:flex; align-items:center; justify-content:center; flex-shrink:0;}
        .context-step b{font-family:'Work Sans'; font-weight:600; font-size:15px; display:block; margin-bottom:3px;}
        .context-step p{font-size:13.5px; color:var(--muted); margin:0;}

        /* PROBLEM */
        .problem-grid{display:grid; grid-template-columns:1.1fr .9fr; gap:56px; align-items:start;}
        @media (max-width:820px){ .problem-grid{grid-template-columns:1fr;} }
        .evidence{background:var(--paper2); border-radius:14px; padding:var(--s5) var(--s5); margin-top:8px;}
        .evidence h4{font-family:'Work Sans'; font-weight:600; font-size:14px; margin:0 0 8px; display:flex; gap:8px; align-items:center;}
        .evidence p{font-size:14px; color:var(--muted); margin:0;}
        .sketch-block{margin-top:var(--s7); max-width:500px;}
        .sketch-card{border-radius:8px; overflow:hidden; box-shadow:0 20px 40px -20px rgba(23,23,23,.3); transform:rotate(-0.6deg);}

        /* PERSONAS */
        .persona-card{border-radius:16px; margin-bottom:14px; background:var(--paper2); overflow:hidden;}
        .persona-head{width:100%; display:flex; align-items:center; gap:16px; padding:var(--s4) var(--s5); background:none; border:none; cursor:pointer; text-align:left;}
        .persona-avatar{width:52px;height:52px;border-radius:50%; background:var(--accent); color:#fff; display:flex; align-items:center; justify-content:center; font-family:'Work Sans'; font-weight:700; flex-shrink:0;}
        .persona-headtext{flex:1;}
        .persona-badge{font-family:'IBM Plex Mono'; font-weight:600; font-size:10.5px; letter-spacing:.06em; text-transform:uppercase; color:var(--accent);}
        .persona-headtext h3{font-family:'Playfair Display'; font-weight:700; margin:3px 0 2px; font-size:19px;}
        .persona-headtext p{margin:0; color:var(--muted); font-size:14px;}
        .persona-chev{transition:transform .25s ease; color:var(--mutedLight); flex-shrink:0;}
        .persona-chev.rot{transform:rotate(180deg);}
        .persona-stats{display:flex; gap:28px; padding:0 var(--s5) var(--s4) 90px; font-size:13.5px;}
        .persona-stats label{display:block; color:var(--mutedLight); font-family:'IBM Plex Mono'; font-weight:500; text-transform:uppercase; letter-spacing:.05em; font-size:10.5px; margin-top:3px;}
        .persona-body{padding:var(--s2) var(--s5) var(--s5); border-top:1px solid rgba(0,0,0,.06);}
        .persona-cols{display:grid; grid-template-columns:1fr 1fr; gap:24px; margin:20px 0;}
        @media (max-width:640px){ .persona-cols{grid-template-columns:1fr;} }
        .persona-body h4{font-family:'Work Sans'; font-weight:600; font-size:12.5px; text-transform:uppercase; letter-spacing:.05em; margin:20px 0 10px; color:var(--accent);}
        .persona-body p{font-size:14.5px; color:var(--muted); margin:0;}
        .persona-goals{list-style:none; margin:0; padding:0; display:grid; gap:12px;}
        .persona-goals li{display:flex; flex-direction:column; gap:2px; font-size:14px;}
        .persona-goals strong{font-size:14.5px;}
        .persona-goals span{color:var(--muted); font-size:13.5px;}
        .persona-traits{display:grid; gap:14px; max-width:520px;}
        .trait-label{display:flex; justify-content:space-between; font-size:12.5px; margin-bottom:5px;}
        .trait-track{height:5px; background:var(--paper3); border-radius:3px; overflow:hidden;}
        .trait-fill{height:100%; background:var(--accent); border-radius:3px;}

        /* JOURNEY */
        .journey-persona{display:flex; align-items:center; gap:12px; margin-bottom:28px; padding:12px 16px; background:var(--paper2); border-radius:12px; max-width:fit-content;}
        .journey-persona .av{width:36px;height:36px;border-radius:50%;background:var(--accent);color:#fff;display:flex;align-items:center;justify-content:center;font-family:'Work Sans';font-weight:700;font-size:13px;flex-shrink:0;}
        .journey-persona span{font-size:13.5px;}
        .journey-persona b{font-family:'Work Sans'; font-weight:600;}
        .journey-persona .muted{color:var(--muted);}

        .journey-track{position:relative; padding:0 0 34px; margin-bottom:0;}
        .journey-track-line{position:absolute; top:15px; height:2px; background:var(--line);}
        .journey-track-fill{position:absolute; top:15px; height:2px; background:var(--accent); transition:width .4s cubic-bezier(.4,0,.2,1);}
        .journey-nodes{position:relative; display:flex; justify-content:space-between; gap:4px;}
        .journey-node{background:none; border:none; cursor:pointer; display:flex; flex-direction:column; align-items:center; gap:10px; flex:1; padding:0;}
        .journey-node-dot{width:14px; height:14px; border-radius:50%; background:#fff; border:2px solid var(--line); position:relative; z-index:2; transition:transform .25s cubic-bezier(.4,0,.2,1), border-color .25s ease, background .25s ease, box-shadow .25s ease;}
        .journey-node.active .journey-node-dot{transform:scale(1.4); box-shadow:0 0 0 4px #fff, 0 0 0 5px var(--line);}
        .journey-node-label{font-family:'Work Sans'; font-weight:500; font-size:10px; color:var(--mutedLight); text-align:center; line-height:1.3;}
        .journey-node.active .journey-node-label{color:var(--ink);}
        .journey-node-label b{display:block; font-family:'Work Sans'; font-size:11.5px; font-weight:600; margin-top:2px;}
        @media (max-width:760px){ .journey-node-label{display:none;} .journey-node.active .journey-node-label{display:block; position:absolute; top:24px; white-space:nowrap; background:#fff; padding:2px 8px; border-radius:4px; box-shadow:0 2px 8px rgba(0,0,0,.12);} }

        .journey-panel{border-radius:16px; padding:var(--s6); background:var(--paper2); overflow:hidden;}
        @keyframes journeyFade{ from{opacity:0; transform:translateY(6px);} to{opacity:1; transform:translateY(0);} }
        .journey-fade{animation:journeyFade .35s ease both;}
        .journey-panel-body{display:grid; grid-template-columns:1fr 220px; gap:32px;}
        @media (max-width:700px){ .journey-panel-body{grid-template-columns:1fr;} }
        .journey-shot{border-radius:12px; overflow:hidden; background:#fff; align-self:start; max-width:220px; box-shadow:0 16px 32px -18px rgba(23,23,23,.35);}
        .journey-shot img{width:100%; display:block;}
        .journey-panel-top{display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px; margin-bottom:20px; padding-bottom:20px; border-bottom:1px solid rgba(0,0,0,.08);}
        .journey-phase-title{font-family:'Playfair Display'; font-size:20px; font-weight:700; display:flex; align-items:baseline; gap:10px;}
        .journey-phase-title .mono{font-size:12px; color:var(--mutedLight); font-weight:500; text-transform:none;}
        .journey-mood{display:inline-flex; align-items:center; gap:8px; font-family:'Work Sans'; font-weight:500; font-size:11.5px; padding:5px 12px; border-radius:20px;}
        .journey-mood .dot{width:8px;height:8px;border-radius:50%;}
        .journey-block{margin-bottom:20px;}
        .journey-block:last-child{margin-bottom:0;}
        .journey-block-label{font-family:'IBM Plex Mono'; font-weight:600; font-size:10.5px; letter-spacing:.06em; text-transform:uppercase; color:var(--accent); margin-bottom:8px; display:flex; align-items:center; gap:6px;}
        .journey-text{font-size:16px; max-width:640px; margin:0;}
        .journey-sys{font-size:13.5px; color:var(--muted); background:var(--paper3); border-left:3px solid var(--accent); padding:12px 16px; max-width:640px; margin:0; border-radius:0 8px 8px 0;}
        .journey-opp{display:flex; gap:12px; align-items:flex-start; max-width:640px; background:var(--accentSoft); border-radius:10px; padding:14px 16px;}
        .journey-opp svg{color:var(--accent); flex-shrink:0; margin-top:2px;}
        .journey-opp strong{display:block; font-size:14.5px; margin-bottom:3px;}
        .journey-opp span{font-size:13.5px; color:var(--muted);}
        .journey-nav-btns{display:flex; justify-content:space-between; margin-top:20px;}
        .journey-nav-btns button{font-family:'Work Sans'; font-weight:500; font-size:12.5px; background:#fff; border:none; border-radius:20px; padding:8px 18px; cursor:pointer; color:var(--ink);}
        .journey-nav-btns button:disabled{opacity:.35; cursor:default;}

        /* COMPARISON */
        .cmp-caption{font-size:13px; color:var(--muted); margin-top:12px;}
        .cmp-block{margin-bottom:56px;}
        .cmp-block h3{font-family:'Playfair Display'; font-weight:700; font-size:18px; margin:0 0 16px;}
        .bp-row{display:flex; align-items:flex-start; gap:16px; width:100%;}
        .bp-item{display:flex; flex-direction:column; align-items:center; gap:10px; min-width:0;}
        .bp-item img{width:100%; height:auto; display:block; border-radius:10px; box-shadow:0 16px 32px -18px rgba(23,23,23,.35);}
        .bp-item-label{font-family:'Work Sans'; font-weight:500; font-size:11.5px; color:var(--muted);}
        .single-shot{border-radius:10px; overflow:hidden; background:#fff;}
        .single-shot img{width:100%; display:block;}
        .funnel-tabs{display:flex; flex-wrap:wrap; gap:8px; margin-bottom:20px;}
        .funnel-tabs button{font-family:'Work Sans'; text-align:left; background:var(--paper2); border:none; border-radius:10px; padding:10px 14px; cursor:pointer; color:var(--muted); display:flex; flex-direction:column; gap:2px; min-width:120px;}
        .funnel-tabs button .mono{font-size:10.5px; color:var(--mutedLight);}
        .funnel-tabs button b{font-family:'Work Sans'; font-size:13px; color:var(--ink); font-weight:600;}
        .funnel-tabs button.active{background:var(--accentSoft);}
        .funnel-tabs button.active .mono{color:var(--accent);}
        @keyframes funnelFade{ from{opacity:0; transform:translateY(4px);} to{opacity:1; transform:translateY(0);} }
        .funnel-fade{animation:funnelFade .3s ease both;}
        @media (max-width:640px){ .bp-row{flex-wrap:wrap;} .bp-item{flex:1 1 100% !important;} }

        /* ROLE / IMPACT */
        .role-grid{display:grid; grid-template-columns:repeat(2,1fr); gap:14px;}
        @media (max-width:640px){ .role-grid{grid-template-columns:1fr;} }
        .role-item{display:flex; gap:10px; align-items:flex-start; padding:var(--s3) var(--s5); border-radius:12px; background:var(--paper2); font-size:14px;}
        .role-item svg{color:var(--accent); flex-shrink:0; margin-top:2px;}
        .role-oneliner{font-family:'Playfair Display'; font-weight:600; font-size:19px; color:var(--ink); max-width:640px; margin:0 0 var(--s5); line-height:1.4;}
        .resp-grid{display:grid; grid-template-columns:repeat(2,1fr); gap:var(--s3);}
        @media (max-width:640px){ .resp-grid{grid-template-columns:1fr;} }
        .resp-card{background:var(--paper2); border-radius:14px; padding:var(--s4) var(--s5);}
        .resp-card b{font-family:'Work Sans'; font-weight:700; font-size:14.5px; display:block; margin-bottom:6px;}
        .resp-card p{font-size:13.5px; color:var(--muted); margin:0;}


        .cs-footer{padding:48px 28px; text-align:center; font-size:13px; color:var(--mutedLight);}
        .footer-link{color:var(--accent); font-weight:500; text-decoration:underline;}
        .note{font-size:12px; color:var(--mutedLight); font-style:italic; margin-top:8px;}

        /* DESIGN SYSTEM */
        .ds-card{background:var(--paper2); border-radius:16px; padding:var(--s6); margin-top:var(--s3);}
        .ds-card h3{font-family:'Playfair Display'; font-weight:700; font-size:19px; margin:0 0 var(--s2);}
        .ds-card-body p{font-size:14.5px; color:var(--muted); margin:0 0 var(--s4); max-width:620px;}
        .ds-list{list-style:none; margin:0 0 var(--s5); padding:0; display:grid; gap:var(--s1); grid-template-columns:repeat(2,1fr);}
        .ds-list li{font-size:13.5px; color:var(--ink); background:#fff; border-radius:8px; padding:var(--s2) var(--s3);}
        @media (max-width:600px){ .ds-list{grid-template-columns:1fr;} }
        .ds-link{display:inline-flex; align-items:center; gap:6px; font-family:'Work Sans'; font-weight:600; font-size:14px; color:var(--accent); text-decoration:none; border-bottom:1.5px solid var(--accent); padding-bottom:2px;}

        /* SITEMAP & FLOWS */
        .sitemap-tree{display:flex; flex-direction:column; align-items:center; margin-bottom:56px;}
        .sitemap-root{font-family:'Playfair Display'; font-weight:700; font-size:16px; background:#262626; color:#fff; padding:14px 32px; border-radius:16px; white-space:nowrap;}
        .sitemap-canvas{position:relative; width:100%; margin-top:0;}
        .sitemap-lines{position:absolute; top:0; left:0; width:100%; height:64px; display:block; overflow:visible;}
        .sitemap-lines path{fill:none; stroke:#B9B9B9; stroke-width:1.6px; stroke-linecap:round;}
        .sitemap-columns{display:flex; gap:20px; padding-top:64px; width:100%; align-items:flex-start;}
        .sitemap-col{flex:1; min-width:0; display:flex; flex-direction:column; align-items:stretch;}
        .sitemap-branch{background:#fff; border:1.5px solid #E4E4E4; border-radius:14px; padding:16px 8px; text-align:center; font-family:'Work Sans'; font-weight:700; font-size:14.5px;}
        .sitemap-col-line{width:1.6px; height:22px; background:#D6D6D6; margin:0 auto;}
        .sitemap-children{display:flex; flex-direction:column; gap:10px;}
        .sitemap-item{background:var(--paper2); border:1px solid #ECECEC; border-radius:10px; padding:11px 10px; text-align:center; font-size:13px; color:var(--muted);}
        @media (max-width:700px){ .sitemap-columns{overflow-x:auto;} .sitemap-col{min-width:130px;} }

        .flows-heading{font-family:'Playfair Display'; font-weight:700; font-size:18px; margin:0 0 18px;}
        .flows{display:grid; gap:14px;}
        .flow-card{background:var(--paper2); border-radius:14px; padding:var(--s4) var(--s5);}
        .flow-title{font-family:'Work Sans'; font-weight:600; font-size:13.5px; color:var(--muted); margin-bottom:14px;}
        .flow-steps{display:flex; flex-wrap:wrap; align-items:center; gap:8px;}
        .flow-step-wrap{display:inline-flex; align-items:center; gap:8px;}
        .flow-step{font-family:'Work Sans'; font-weight:500; font-size:13.5px; background:#fff; border-radius:20px; padding:8px 16px; white-space:nowrap;}
        .flow-arrow{color:var(--accent); font-weight:600;}

        /* FUNNEL PAGE DETAIL */
        .fpage-card{background:var(--paper2); border-radius:14px; margin-bottom:12px; overflow:hidden;}
        .fpage-head{width:100%; display:flex; align-items:center; gap:16px; padding:var(--s3) var(--s4); background:none; border:none; cursor:pointer; text-align:left;}
        .fpage-num{font-family:'Work Sans'; font-weight:700; font-size:13px; color:var(--accent); background:#fff; border-radius:50%; width:34px; height:34px; display:flex; align-items:center; justify-content:center; flex-shrink:0;}
        .fpage-headtext{flex:1; display:flex; flex-direction:column; gap:2px;}
        .fpage-headtext b{font-family:'Work Sans'; font-weight:700; font-size:15.5px;}
        .fpage-headtext span{font-size:13px; color:var(--muted);}
        .fpage-body{padding:0 var(--s5) var(--s5) 70px;}
        .fpage-block-label{font-family:'IBM Plex Mono'; font-weight:600; font-size:10.5px; letter-spacing:.06em; text-transform:uppercase; color:var(--accent); margin:16px 0 8px;}
        .fpage-body .fpage-block-label:first-child{margin-top:0;}
        .fpage-sections{list-style:none; margin:0; padding:0; display:grid; gap:8px;}
        .fpage-sections li{font-size:13.5px; color:var(--muted); background:#fff; border-radius:8px; padding:9px 12px;}
        .fpage-row{display:flex; flex-wrap:wrap; gap:24px;}
        .fpage-bps{display:flex; gap:8px;}
        .fpage-bp{font-family:'Work Sans'; font-weight:500; font-size:12px; padding:6px 12px; border-radius:20px;}
        .fpage-bp.yes{background:var(--accentSoft); color:var(--accent);}
        .fpage-bp.no{background:#EFEFEF; color:var(--mutedLight); text-decoration:line-through;}
        .fpage-oldnew{font-size:13.5px; color:var(--muted); margin:0; max-width:640px;}
      `;

/* Shared additions: project navigation, homepage, phone screens */
export const SHARED_CSS = `
.cs-nav-left{display:flex; align-items:center; gap:16px; min-width:0;}
.cs-back{font-family:'Work Sans'; font-weight:500; font-size:13px; color:var(--muted); text-decoration:none; padding:6px 12px; border-radius:20px; background:var(--paper2); white-space:nowrap;}
.cs-back:hover{color:var(--ink); background:var(--paper3);}
.cs-back:focus-visible, .home-card:focus-visible, .cs-navlinks button:focus-visible, .shot-tabs button:focus-visible{outline:2px solid var(--accent); outline-offset:3px;}
@media (max-width:520px){ .cs-logo{display:none;} }

/* HOME */
.home-hero{padding:var(--s9) 0 var(--s8); position:relative;}
.home-hero h1{font-family:'Playfair Display'; font-weight:700; font-size:clamp(34px,6vw,58px); line-height:1.08; letter-spacing:-.01em; max-width:780px; margin:0 0 20px; position:relative; z-index:1;}
.home-hero p.lede{font-size:18px; color:var(--muted); max-width:560px; margin:0; position:relative; z-index:1;}
.home-links{display:flex; flex-wrap:wrap; gap:10px; margin-top:28px; position:relative; z-index:1;}
.home-links a{font-family:'Work Sans'; font-weight:500; font-size:13.5px; color:var(--ink); text-decoration:none; padding:8px 16px; border-radius:20px; background:var(--paper2);}
.home-links a:hover{background:var(--accentSoft);}
.home-grid{display:grid; gap:20px; padding-bottom:var(--s9);}
.home-card{display:grid; grid-template-columns:1fr 1.1fr; gap:0; background:var(--paper2); border-radius:20px; overflow:hidden; text-decoration:none; color:inherit; transition:transform .25s ease, box-shadow .25s ease;}
a.home-card:hover{transform:translateY(-3px); box-shadow:0 24px 48px -28px rgba(23,23,23,.35);}
.home-card-body{padding:var(--s7) var(--s6); display:flex; flex-direction:column; gap:14px;}
.home-card-num{font-family:'IBM Plex Mono'; font-weight:600; font-size:11px; letter-spacing:.08em; text-transform:uppercase; color:var(--accent);}
.home-card h2{font-family:'Playfair Display'; font-weight:700; font-size:clamp(22px,2.8vw,30px); line-height:1.15; margin:0;}
.home-card p{font-size:15px; color:var(--muted); margin:0;}
.home-tags{display:flex; flex-wrap:wrap; gap:6px;}
.home-tags span{font-family:'Work Sans'; font-weight:500; font-size:12px; padding:5px 11px; border-radius:20px; background:#fff; color:var(--muted);}
.home-cta{margin-top:auto; font-family:'Work Sans'; font-weight:600; font-size:14px; color:var(--accent); display:inline-flex; align-items:center; gap:6px;}
.home-card-visual{background:var(--paper3); position:relative; min-height:320px; overflow:hidden; display:flex; align-items:flex-end; justify-content:center;}
.home-card-visual img.cover-desktop{position:absolute; top:36px; left:36px; width:calc(100% - 36px); border-radius:10px 0 0 0; box-shadow:0 20px 40px -20px rgba(0,0,0,.3);}
.home-card.is-soon{opacity:1;}
.home-card.is-soon .home-card-visual{background:repeating-linear-gradient(135deg, var(--paper3) 0 14px, #ECECEC 14px 28px); align-items:center;}
.soon-badge{font-family:'IBM Plex Mono'; font-weight:600; font-size:11px; letter-spacing:.08em; text-transform:uppercase; background:var(--ink); color:#fff; padding:8px 14px; border-radius:20px;}
@media (max-width:820px){ .home-card{grid-template-columns:1fr;} .home-card-visual{min-height:260px; order:-1;} }

/* PHONE TRIO (cover + hero) */
.phone-trio{display:flex; align-items:flex-end; justify-content:center; gap:16px; padding:32px 16px 0;}
.phone-trio img{width:30%; max-width:200px; border-radius:22px 22px 0 0; box-shadow:0 20px 40px -18px rgba(0,0,0,.35); display:block;}
.phone-trio img:nth-child(2){width:34%; max-width:230px;}

/* PHONE SCREEN */
.phone{background:#fff; border-radius:26px; padding:6px; box-shadow:0 22px 44px -22px rgba(23,23,23,.4), 0 0 0 1px rgba(0,0,0,.06); }
.phone img{width:100%; display:block; border-radius:21px;}
`;
