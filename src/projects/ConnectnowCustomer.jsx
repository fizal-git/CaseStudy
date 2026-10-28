import { useState, useEffect, useRef } from "react";
import { ShieldCheck, Lightbulb, Target, Eye } from "lucide-react";
import { BASE_CSS, SHARED_CSS } from "../styles.js";
import { makePhone, SiteMapTree, PersonaCard, CN_CSS } from "./connectnowShared.jsx";

/* ------------------------------------------------------------------ */
/* Content sourced from the Figma file "Connectnow-Mobile-App",        */
/* customer flow section: Google path ("Customer") and guest path.     */
/* Screen copy, names and numbers are the design's own sample data.    */
/* ------------------------------------------------------------------ */

const S = (f) => `/connectnow-customer/${f}`;

const SCREENS = {
  welcome: { code: "C01", src: S("c01-welcome.png"), title: "Welcome — Google or guest", h: 844 },
  google: { code: "C02", src: S("c02-google.png"), title: "Google sign-in — choose an account", h: 844 },
  confirm: { code: "C03", src: S("c04-confirm-checklist.png"), title: "Your new home — confirm details + move-in checklist", h: 1371 },
  about: { code: "C04", src: S("c05-about-you.png"), title: "About you — prefilled details and consent", h: 1267 },
  verify: { code: "C05", src: S("c06-verify-id.png"), title: "Verify identity — licence or passport", h: 844 },
  scan: { code: "C06", src: S("c07-scan-licence.png"), title: "Scan your licence — camera capture", h: 844 },
  scanned: { code: "C07", src: S("c08-scanned.png"), title: "Scanned — fields filled from the photo", h: 925 },
  passport: { code: "C08", src: S("c09-passport.png"), title: "Passport — alternative ID", h: 838 },
  billing: { code: "C09", src: S("c10-billing-consent.png"), title: "Billing & consent — preferences and terms", h: 1042 },
  success: { code: "C10", src: S("c11-success.png"), title: "Submitted — live status + add services", h: 1338 },
  home: { code: "C11", src: S("c12-home.png"), title: "Home — connection status + checklist", h: 991 },
  guestConfirm: { code: "G01", src: S("g01-guest-confirm.png"), title: "Guest — confirm your new home", h: 844 },
  guestSuccess: { code: "G02", src: S("g02-guest-success.png"), title: "Guest — submitted + save to Google", h: 972 },
};

const Phone = makePhone(SCREENS, "Connectnow customer app");

const PERSONAS = [
  {
    id: "sarah",
    badge: "PRIMARY USER · MOVER",
    name: "Sarah Smith",
    role: "Tenant moving to 24 Smith St, Richmond",
    stats: [["Move-in", "20 Nov"], ["Invited by", "Her agent"], ["Device", "iPhone"]],
    background:
      "Sarah has just signed a lease through Richmond Property Group. Between packing, bond and booking removalists, utilities are something she knows she should sort but keeps putting off.",
    situation:
      "Her agent has sent her a Connectnow link by SMS. She'll give it a few minutes on her phone — if it asks for too much, looks like marketing or feels unsafe, she'll close it and deal with it “later”.",
    goals: [
      { title: "Get the power on by move-in day", desc: "Know it's booked and guaranteed for 20 November without calling anyone." },
      { title: "Type as little as possible", desc: "Reuse what her agent and her phone already know about her." },
      { title: "Stay in control", desc: "Choose whether to create an account, how she's billed and what marketing she receives." },
      { title: "Not forget anything else", desc: "Internet, gas, removalists and cleaning all need sorting before the move." },
    ],
  },
];

const JOURNEY = [
  {
    phase: "01", shot: "welcome", title: "Open the invite",
    text: "Sarah taps the link from her agent. The welcome screen says who sent her and why, lists three promises — simple and secure, a few minutes, power ready for move day — and offers Continue with Google or Continue as a guest.",
    decision: { title: "Account optional, value explicit", text: "Google sign-in is the primary action and its benefit is spelled out underneath (track your connection live). Guests are never blocked from completing the job." },
  },
  {
    phase: "02", shot: "google", title: "Sign in with Google",
    text: "The standard Google account chooser appears, showing exactly what will be shared with Connectnow.",
    decision: { title: "Use a pattern people already trust", text: "A familiar, platform-standard sign-in sheet is faster and more trusted than a bespoke sign-up form — and it supplies a verified email instantly." },
  },
  {
    phase: "03", shot: "confirm", title: "Confirm your new home",
    text: "Step 1 of 3. The address and move-in date sent by the agent are shown for confirmation, with a contact-your-agent escape hatch. Below, a move-in checklist counts down the days and lists everything else to arrange.",
    decision: { title: "Confirm, don't ask", text: "Details the agent already entered are shown for a single yes — and the checklist reveals the wider value of the app before any form begins." },
  },
  {
    phase: "04", shot: "about", title: "About you",
    text: "Name, date of birth and mobile arrive prefilled from the agent; email comes from Google. A banner explains the source of each field. Contact consent is required; marketing is a separate, optional opt-in.",
    decision: { title: "Explain where data came from", text: "Prefilling saves effort, but unexplained prefilled data feels invasive. Naming the source builds trust and invites corrections." },
  },
  {
    phase: "05", shot: "scanned", title: "Verify identity",
    text: "Step 3 of 4. Sarah picks Driver Licence or Passport, taps the camera icon and photographs her card. Four fields are filled from the photo for her to check.",
    decision: { title: "Scan instead of type", text: "ID numbers are long, easy to mistype and hard to read on a card. Camera capture with a review step is faster and more accurate." },
  },
  {
    phase: "06", shot: "billing", title: "Billing & consent",
    text: "Step 4 of 4. Email or paper billing (with the paper fee stated up front), then each required document — retail contract, Power On Guarantee, important information, terms — with a “Viewed” marker before a final declaration and Submit.",
    decision: { title: "Make compliance scannable", text: "Each legal document is its own row with a viewed state, so required disclosures are visibly completed rather than buried in one long block of text." },
  },
  {
    phase: "07", shot: "success", title: "Submitted",
    text: "“Your power's on the way!” A live five-step status, Add move-in to Calendar, Save to Google Wallet, and a one-tap offer to add internet and gas using the details she's already verified.",
    decision: { title: "Cross-sell at the moment of momentum", text: "The offer appears right after success, reuses everything already entered (“no more forms”) and is clearly optional." },
  },
  {
    phase: "08", shot: "home", title: "Track & prepare",
    text: "Home greets Sarah, shows the connection at Step 3 of 5 (Booking with AGL), the move-in checklist with days to go, and an invite for anyone moving in with her.",
    decision: { title: "A reason to come back", text: "Status, the checklist and household sharing turn a one-off form into an app worth keeping until move-in day — the core goal of account creation." },
  },
];

const STORIES = [
  {
    group: "Get started",
    items: [
      {
        k: "welcome",
        about: "The first screen after tapping the agent's link. It frames the task (“Let's get your new home connected”), credits the agent for the invite, lists three reassurances and offers two ways in: Continue with Google, or Continue as a guest.",
        research: [
          "The brief's goal is account creation via Google so customers can track status and be cross-sold — but forcing sign-up before value is a well-known cause of abandonment, so the guest path keeps the connection itself unblocked.",
          "Unexpected links are treated with suspicion. Naming the agent as the source and stating the Power On Guarantee answers “why am I here?” before anything is asked.",
          "The line under the Google button (“Track your connection live and manage all your move services”) states the benefit of an account at the moment of choice.",
        ],
        value: {
          user: "Understands why she's here, what it takes and gets to choose how to proceed.",
          business: "Steers most customers to Google accounts without losing those who won't sign up.",
        },
      },
      {
        k: "google",
        about: "The standard Google account chooser, showing the Connectnow app and the data Google will share — name, email, language preference and profile picture — with links to privacy policy and terms.",
        research: [
          "Familiar platform patterns reduce cognitive load (Jakob's law): people already know this sheet from other apps.",
          "Social sign-in removes password creation and gives Connectnow a verified email in one tap, which also feeds later prefilling.",
        ],
        value: {
          user: "An account in one tap, with no password to create.",
          business: "Verified email and a persistent account to support tracking and future services.",
        },
      },
      {
        k: "guestConfirm",
        about: "On the guest path, Step 1 of 4 shows the property address and move-in date from the agent, with a “Looks right?” note telling the customer to contact their agent if anything is wrong.",
        research: [
          "Guests still benefit from the agent's data: confirming is faster and less error-prone than re-entering an address.",
          "Directing corrections to the agent keeps one source of truth for property data and avoids conflicting addresses.",
        ],
        value: {
          user: "A fast start with no account and nothing to type.",
          business: "Guest conversions still complete, with accurate address data.",
        },
      },
    ],
  },
  {
    group: "Set up the connection",
    items: [
      {
        k: "confirm",
        about: "Signed-in customers see their property at the top, a New connection card (Step 1 of 3) to confirm address and move-in date, and a move-in checklist: days until move-in, progress (1 of 7 sorted) and tasks for electricity, internet, gas, removalists, water, pay TV and cleaning — each with timing guidance.",
        research: [
          "Moving involves many tasks with different lead times; the checklist puts them in order and flags time-critical ones (e.g. NBN can take 2–3 weeks).",
          "A countdown and “1 of 7 sorted” make progress tangible, using the goal-gradient effect to encourage completing more tasks.",
          "Showing this before the form demonstrates the account's value immediately — supporting the brief's cross-sell goal without a hard sell.",
        ],
        value: {
          user: "One place that tells her what to sort for the move, and when.",
          business: "Natural, well-timed entry points for internet, gas and partner services.",
        },
      },
      {
        k: "about",
        about: "Step 2 of 4. Title, first, middle and last name, date of birth, mobile and email — prefilled where possible, with a banner explaining which came from the agent and which from Google. A required contact consent and a separate optional marketing opt-in, each with policy links.",
        research: [
          "Prefilling cuts typing on mobile, where form entry is slowest — but people distrust data that appears from nowhere, so the banner names each source.",
          "Privacy obligations require consent to contact the customer about their connection, so it is explicit and labelled (Required).",
          "Marketing consent is unbundled from service consent and marked Optional, so customers can say yes to the connection without agreeing to offers.",
        ],
        value: {
          user: "Most of the form is already done, and she stays in control of marketing.",
          business: "Accurate, consented customer records and a clean marketing opt-in list.",
        },
      },
      {
        k: "verify",
        about: "Step 3 of 4. A segmented control to choose Driver Licence or Passport. Licence asks for licence number, card number, state and expiry, each number field with a camera button, plus consent for the retailer's credit and ID check.",
        research: [
          "Retailers must verify identity before arranging a connection, so this step can't be removed — only made easier.",
          "Offering two common ID types avoids dead ends for people without a licence.",
          "The camera icon sits inside the field it fills, so the shortcut is discovered exactly where it's useful.",
        ],
        value: {
          user: "A choice of ID and a shortcut to avoid typing long numbers.",
          business: "Fewer failed ID checks caused by typos and missing documents.",
        },
      },
      {
        k: "scan",
        about: "Tapping the camera opens capture with a green guide frame around the card.",
        research: [
          "Licence and card numbers are small, dense and easy to misread — automated capture reduces transcription errors.",
          "A visible frame shows exactly where to position the card, reducing retakes.",
        ],
        value: {
          user: "Identity details captured in seconds.",
          business: "Higher accuracy at the ID-check step that most often stalls applications.",
        },
      },
      {
        k: "scanned",
        about: "After scanning, a confirmation banner says four fields were filled from the photo and asks the customer to check them. Licence number, card number, state and expiry are populated.",
        research: [
          "Automation can be wrong, so the customer is always asked to review — keeping a human in the loop for legal identity data.",
          "Telling people how many fields were filled sets clear expectations of what to check.",
        ],
        value: {
          user: "Confidence the scan worked, with the final say on her details.",
          business: "Verified, reviewed ID data submitted to the retailer.",
        },
      },
      {
        k: "passport",
        about: "The Passport option asks for passport number, country and expiry, with the same scan shortcut and consent.",
        research: [
          "Not everyone has a driver licence — international renters and non-drivers are common in rental markets, so an alternative ID is essential.",
          "Keeping the same layout and controls across ID types means nothing new to learn when switching.",
        ],
        value: {
          user: "No dead end if she doesn't drive.",
          business: "Applications that would otherwise be abandoned can still complete.",
        },
      },
      {
        k: "billing",
        about: "Step 4 of 4. Email or paper billing (paper fee shown), then the AGL Standard Retail Contract, Power On Guarantee, Important information and Terms and conditions as separate rows with a Viewed state, a final declaration and Submit.",
        research: [
          "Energy retail rules require key documents to be presented before sign-up; a single wall of legal text is rarely read.",
          "Showing the paper fee next to the option is fee transparency — no surprises on the first bill.",
          "Viewed states give a clear record that each required document was opened.",
        ],
        value: {
          user: "Clear billing choice and an easy-to-scan checklist of what she's agreeing to.",
          business: "Compliant disclosure with an auditable trail.",
        },
      },
    ],
  },
  {
    group: "After submitting",
    items: [
      {
        k: "success",
        about: "“Your power's on the way!” with the reference and an emailed copy. Live connection status from Application submitted to Power on; Add move-in to Calendar and Save to Google Wallet; then “Add internet & gas in one tap” with toggles for NBN and gas, reusing the verified details.",
        research: [
          "Visibility of system status (Nielsen #1): after submitting, people want to know what happens next — the timeline answers that without a call.",
          "Calendar and Wallet put the move-in date where the customer already looks, rather than relying on them returning to the app.",
          "The cross-sell comes at a point of success and removes the biggest barrier — another form — by reusing verified details.",
        ],
        value: {
          user: "Peace of mind, reminders in her own tools and other services added in one tap.",
          business: "Cross-sell conversion at the highest-intent moment, as the brief set out.",
        },
      },
      {
        k: "home",
        about: "Returning to the app, Home shows a greeting, the connection progress (Step 3 of 5 · Booking with AGL), the move-in checklist with days to go and status per task, and an invite for anyone moving in with her.",
        research: [
          "The brief's purpose for accounts is tracking status — so the connection card is the first thing on Home.",
          "Households move together; inviting a partner or housemate shares the load and brings another person into the app.",
        ],
        value: {
          user: "Always knows where her connection is up to and what's left to do.",
          business: "Repeat engagement until move-in, plus organic reach to other household members.",
        },
      },
      {
        k: "guestSuccess",
        about: "Guests get “You're all set!” with reference, address and move-in date — then a dark card, “Don't lose track of your connection”, listing three benefits of saving the application to Google, with Continue with Google or Maybe later.",
        research: [
          "Asking for an account after the job is done (deferred sign-up) converts people who were unwilling at the start, because they now have something to save.",
          "Listing concrete benefits — live updates, a move-in reminder, one place for other services — makes the trade clear.",
          "“Maybe later” is equally visible, so the request never feels like a trap.",
        ],
        value: {
          user: "Finished without an account, with a clear reason to create one.",
          business: "A second chance to convert guests into tracked, cross-sellable accounts.",
        },
      },
    ],
  },
];

const PATHS = [
  ["Entry", "Continue with Google", "Continue as a guest"],
  ["Personal details", "Prefilled from the agent + Google email", "Prefilled from the agent"],
  ["First step", "Confirm details + move-in checklist", "Confirm address and move-in date"],
  ["Identity & billing", "Same scan-assisted steps", "Same scan-assisted steps"],
  ["After submitting", "Live status, Calendar, Wallet, add internet & gas", "Confirmation + prompt to save to Google"],
  ["Coming back", "Home with status and checklist", "Only if they save to Google"],
];

const IA = {
  root: "Customer app",
  branches: [
    { name: "Onboarding", items: ["Welcome", "Google sign-in", "Continue as guest"] },
    { name: "Connection setup", items: ["Your new home", "About you", "Verify identity", "Billing & consent"] },
    { name: "After submit", items: ["Confirmation", "Connection status", "Add internet & gas", "Save to Google (guest)"] },
    { name: "Home", items: ["Connection card", "Move-in checklist", "Invite household"] },
  ],
};

const FLOWS = [
  { title: "Google path", steps: ["Agent link", "Welcome", "Google sign-in", "Confirm home", "About you", "Verify ID", "Billing & consent", "Submitted", "Home"] },
  { title: "Guest path", steps: ["Agent link", "Welcome", "Continue as guest", "Confirm home", "About you", "Verify ID", "Billing & consent", "You're all set"] },
  { title: "Guest converts later", steps: ["You're all set", "Continue with Google", "Home with live status"] },
  { title: "Cross-sell", steps: ["Submitted", "Toggle internet / gas", "Add 2 services"] },
];

const CC_CSS = `
  .path-table{width:100%; border-collapse:separate; border-spacing:0; background:var(--paper2); border-radius:16px; overflow:hidden; font-size:14px;}
  .path-table th, .path-table td{padding:14px 18px; text-align:left; vertical-align:top; border-bottom:1px solid rgba(0,0,0,.06);}
  .path-table tr:last-child td{border-bottom:none;}
  .path-table thead th{font-family:'IBM Plex Mono'; font-weight:600; font-size:11px; letter-spacing:.06em; text-transform:uppercase; color:var(--accent); background:var(--accentSoft);}
  .path-table tbody th{font-weight:600; width:24%;}
  .path-table td{color:var(--muted);}
  .path-wrap{overflow-x:auto;}
`;

export default function ConnectnowCustomer() {
  const [openPersona, setOpenPersona] = useState("sarah");
  const [activePhase, setActivePhase] = useState(0);
  const [activeSection, setActiveSection] = useState("overview");
  const sectionRefs = useRef({});

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveSection(e.target.dataset.section)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    Object.values(sectionRefs.current).forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const setRef = (id) => (el) => (sectionRefs.current[id] = el);
  const NAV = [
    ["overview", "Overview"],
    ["context", "Context"],
    ["problem", "Problem"],
    ["personas", "Persona"],
    ["journey", "Journey"],
    ["screens", "Screens"],
    ["paths", "Two paths"],
    ["decisions", "Decisions"],
    ["ia", "IA"],
    ["role", "My Role"],
  ];
  const J = JOURNEY[activePhase];

  return (
    <div className="cs-root cn-root">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600&display=swap');` + BASE_CSS + SHARED_CSS + CN_CSS + CC_CSS}</style>

      <nav className="cs-nav">
        <div className="cs-nav-inner">
          <div className="cs-nav-left">
            <a href="#/" className="cs-back">← All projects</a>
            <div className="cs-logo">Connect<span>now</span> Customer — Case Study</div>
          </div>
          <ul className="cs-navlinks">
            {NAV.map(([id, label]) => (
              <li key={id}>
                <button className={activeSection === id ? "active" : ""} onClick={() => sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth" })}>
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* HERO */}
      <header className="hero wrap" data-section="overview" ref={setRef("overview")}>
        <div className="hero-wordmark" aria-hidden="true">
          {[0, 1, 2].map((i) => <span key={i}>{Array(10).fill("CONNECTNOW").join(" ")}</span>)}
        </div>
        <div className="hero-eyebrow">SENIOR PRODUCT DESIGNER · MOBILE APP CASE STUDY</div>
        <h1>From an agent's text message to power on — in a few minutes.</h1>
        <p className="lede">
          The Connectnow customer app picks up where the agent referral ends: a mover taps the link,
          confirms their new home, verifies their identity with a quick scan and submits — then tracks
          the connection live and adds internet and gas in one tap.
        </p>
        <div className="hero-meta">
          <div><label>Role</label>Senior UX/UI Designer</div>
          <div><label>Stage</label>Proof of concept · Customer flow</div>
          <div><label>Scope</label>Google + guest paths · 13 screens</div>
          <div><label>Platform</label>iOS · 390 × 844</div>
        </div>
        <div className="hero-shot">
          <div className="cn-hero-phones">
            <Phone k="confirm" eager />
            <Phone k="welcome" eager />
            <Phone k="success" eager />
          </div>
        </div>
      </header>

      {/* FOCUS */}
      <section className="wrap focus-section" data-section="focus">
        <div className="kicker">Focus</div>
        <div className="focus-pills">
          {["Mobile onboarding", "Google sign-in", "Identity verification", "Status tracking", "Cross-sell", "Accessibility (WCAG AA)"].map((f) => (
            <span className="focus-pill" key={f}>{f}</span>
          ))}
        </div>
      </section>

      {/* CONTEXT */}
      <section className="wrap" data-section="context" ref={setRef("context")}>
        <div className="kicker">01 — Project context</div>
        <h2 className="h2">The other half of the referral.</h2>
        <p className="lead-p">
          In the agent app, a property agent sends a customer a secure Connectnow link. This case study
          covers what happens next — the customer side of the same proof of concept — designed for
          people who've just been referred and need their electricity connected before they move in.
        </p>
        <div className="context-steps">
          {[
            ["The agent sends a link", "By SMS, email or QR — with the address and move-in date already captured."],
            ["Choose how to continue", "Sign in with Google for tracking and extras, or continue as a guest."],
            ["Confirm and complete", "Confirm the home, check prefilled details, scan an ID and agree to terms."],
            ["Track the connection", "Live status from submission to power on, backed by the Power On Guarantee."],
            ["Sort the rest of the move", "Add internet and gas in one tap and follow a move-in checklist."],
          ].map(([t, d], i) => (
            <div className="context-step" key={t}>
              <span className="context-step-num">{String(i + 1).padStart(2, "0")}</span>
              <div><b>{t}</b><p>{d}</p></div>
            </div>
          ))}
        </div>
        <p className="note" style={{ marginTop: "20px" }}>
          Companion case study: <a className="footer-link" href="#/connectnow-agent">Connectnow Agent App</a>.
        </p>
      </section>

      {/* PROBLEM */}
      <section className="wrap" data-section="problem" ref={setRef("problem")}>
        <div className="kicker">02 — The problem</div>
        <h2 className="h2">The business wants accounts. Movers want to be done.</h2>
        <div className="problem-grid">
          <div>
            <p className="lead-p">
              Connectnow wants customers to create accounts so it can keep them informed and offer other
              services. But a mover tapping a link from their agent has one goal — get the power on — and
              every extra field, password or legal block is a reason to leave.
            </p>
            <p className="lead-p">
              The challenge was to make the connection itself as short as possible, make an account
              genuinely worth having, and never let the account become a barrier to the connection.
            </p>
          </div>
          <div className="brief-card">
            <h4><Target size={15} /> The brief</h4>
            <ul>
              <li>Designed for customers who've placed a new connection request via Connectnow.</li>
              <li>Use Google sign-in to create customer accounts.</li>
              <li>Let customers track the status of their connection.</li>
              <li>Create opportunities to cross-sell other services.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* PERSONA */}
      <section className="wrap" data-section="personas" ref={setRef("personas")}>
        <div className="kicker">03 — Who this is for</div>
        <h2 className="h2">Sarah has a lease, a move date and no time.</h2>
        <p className="lead-p">
          A proto-persona built around the scenario used throughout the design — the same tenant Jordan
          referred in the agent app.
        </p>
        {PERSONAS.map((p) => (
          <PersonaCard key={p.id} p={p} open={openPersona === p.id} onToggle={() => setOpenPersona(openPersona === p.id ? null : p.id)} />
        ))}
      </section>

      {/* JOURNEY */}
      <section className="wrap" data-section="journey" ref={setRef("journey")}>
        <div className="kicker">04 — The customer journey</div>
        <h2 className="h2">Following Sarah from the link to move-in.</h2>
        <p className="lead-p">Eight moments on the Google path, each with its screen and the decision behind it.</p>

        <div className="journey-persona">
          <div className="av">SS</div>
          <span><b>Sarah Smith</b> <span className="muted">· moving to 24 Smith St, Richmond · 20 Nov</span></span>
        </div>

        <div className="journey-track">
          <div className="journey-track-line" style={{ left: `${100 / (JOURNEY.length * 2)}%`, right: `${100 / (JOURNEY.length * 2)}%` }} />
          <div className="journey-track-fill" style={{ left: `${100 / (JOURNEY.length * 2)}%`, width: `${((100 * (JOURNEY.length - 1)) / JOURNEY.length) * (activePhase / (JOURNEY.length - 1))}%` }} />
          <div className="journey-nodes">
            {JOURNEY.map((j, i) => (
              <button key={j.phase} className={`journey-node ${activePhase === i ? "active" : ""}`} onClick={() => setActivePhase(i)} aria-label={`Phase ${j.phase}: ${j.title}`}>
                <span className="journey-node-dot" />
                <span className="journey-node-label">{j.phase}<b>{j.title}</b></span>
              </button>
            ))}
          </div>
        </div>

        <div className="journey-panel">
          <div className="journey-panel-top">
            <div className="journey-phase-title"><span className="mono">PHASE {J.phase}</span> {J.title}</div>
            <span className="journey-mood" style={{ background: "var(--accentSoft)", color: "var(--accent)" }}>
              <Eye size={13} /> Screen {SCREENS[J.shot].code}
            </span>
          </div>
          <div className="journey-panel-body journey-fade" key={activePhase}>
            <div>
              <div className="journey-block">
                <div className="journey-block-label">WHAT HAPPENS</div>
                <p className="journey-text">{J.text}</p>
              </div>
              <div className="journey-block">
                <div className="journey-block-label">DESIGN DECISION</div>
                <div className="journey-opp">
                  <Lightbulb size={18} />
                  <div><strong>{J.decision.title}</strong><span>{J.decision.text}</span></div>
                </div>
              </div>
            </div>
            <div className="cn-journey-shot"><Phone k={J.shot} fixed eager /></div>
          </div>
          <div className="journey-nav-btns">
            <button disabled={activePhase === 0} onClick={() => setActivePhase((p) => Math.max(0, p - 1))}>← Previous</button>
            <button disabled={activePhase === JOURNEY.length - 1} onClick={() => setActivePhase((p) => Math.min(JOURNEY.length - 1, p + 1))}>Next →</button>
          </div>
        </div>
      </section>

      {/* SCREENS */}
      <section className="wrap" data-section="screens" ref={setRef("screens")}>
        <div className="kicker">05 — The screens</div>
        <h2 className="h2">Every screen, and why it's there.</h2>
        <p className="lead-p">
          The customer flow across both paths, grouped by stage — each with what it does, the research
          and reasoning behind it, and the value it adds for customers and for Connectnow.
        </p>
        {STORIES.map((g) => (
          <div className="story-group" key={g.group}>
            <h3 className="story-group-title">{g.group}</h3>
            {g.items.map((it, idx) => {
              const sc = SCREENS[it.k];
              const [name, detail] = sc.title.split(" — ");
              return (
                <article className={`story ${idx % 2 ? "flip" : ""}`} key={it.k}>
                  <div className="story-shot"><Phone k={it.k} fixed /></div>
                  <div className="story-copy">
                    <span className="mono story-code">Screen {sc.code}</span>
                    <h4 className="story-title">{name}</h4>
                    <p className="story-sub">{detail.charAt(0).toUpperCase() + detail.slice(1)}</p>
                    <div className="story-block">
                      <div className="journey-block-label">WHAT THIS SCREEN DOES</div>
                      <p className="story-about">{it.about}</p>
                    </div>
                    <div className="story-block">
                      <div className="journey-block-label">RESEARCH &amp; RATIONALE</div>
                      <ul className="story-research">{it.research.map((r) => <li key={r}>{r}</li>)}</ul>
                    </div>
                    <div className="story-block">
                      <div className="journey-block-label">VALUE ADDED</div>
                      <div className="story-value">
                        <div><b>For customers</b><span>{it.value.user}</span></div>
                        <div><b>For Connectnow</b><span>{it.value.business}</span></div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ))}
      </section>

      {/* TWO PATHS */}
      <section className="wrap" data-section="paths" ref={setRef("paths")}>
        <div className="kicker">06 — Two paths, one connection</div>
        <h2 className="h2">Google when it helps, guest when it doesn't.</h2>
        <p className="lead-p">
          Both paths complete exactly the same connection. Signing in adds tracking, reuse and extras —
          and guests are offered the same benefits once their application is safely submitted.
        </p>
        <div className="path-wrap">
          <table className="path-table">
            <thead>
              <tr><th scope="col">Stage</th><th scope="col">Google path</th><th scope="col">Guest path</th></tr>
            </thead>
            <tbody>
              {PATHS.map(([a, b, c]) => (
                <tr key={a}><th scope="row">{a}</th><td>{b}</td><td>{c}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* DECISIONS */}
      <section className="wrap" data-section="decisions" ref={setRef("decisions")}>
        <div className="kicker">07 — Key design decisions</div>
        <h2 className="h2">Less typing, more trust.</h2>
        <p className="lead-p">The patterns doing the most work across the flow.</p>
        <div className="decision-grid">
          {[
            ["Conversion", "Account is optional, never a gate", "Guests complete the same connection; the Google prompt returns after success, when there's something worth saving."],
            ["Speed", "Confirm instead of re-enter", "Address, move-in date, name, birth date and mobile come from the agent; email comes from Google."],
            ["Trust", "Say where prefilled data came from", "A banner names each source so prefilled details feel helpful, not invasive."],
            ["Accuracy", "Scan-assisted identity", "The camera fills licence or passport fields, followed by a review step."],
            ["Inclusion", "Licence or passport", "Two ID types avoid dead ends for non-drivers and international renters."],
            ["Privacy", "Unbundled consents", "Required contact consent and optional marketing consent are separate, each with policy links."],
            ["Transparency", "Fees and documents up front", "The paper bill fee is shown beside the option; each required document has a Viewed state."],
            ["Reassurance", "Live status to power on", "A five-step timeline, the Power On Guarantee and Calendar / Wallet shortcuts."],
            ["Growth", "One-tap cross-sell", "Internet and gas are added with toggles, reusing verified details — no more forms."],
            ["Retention", "Move-in checklist", "A countdown and ordered tasks give customers a reason to return before move-in day."],
          ].map(([tag, t, d]) => (
            <div className="decision-card" key={t}>
              <span className="mono">{tag}</span>
              <b>{t}</b>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* IA */}
      <section className="wrap" data-section="ia" ref={setRef("ia")}>
        <div className="kicker">08 — Information architecture & flows</div>
        <h2 className="h2">A short funnel that becomes a companion app.</h2>
        <p className="lead-p">
          A focused four-step setup leads into a lightweight home that lives alongside the move — status,
          checklist and household sharing.
        </p>
        <SiteMapTree data={IA} />
        <h3 className="flows-heading">Key user flows</h3>
        <div className="flows">
          {FLOWS.map((f) => (
            <div className="flow-card" key={f.title}>
              <div className="flow-title">{f.title}</div>
              <div className="flow-steps">
                {f.steps.map((s, i) => (
                  <span key={s} className="flow-step-wrap">
                    <span className="flow-step">{s}</span>
                    {i < f.steps.length - 1 && <span className="flow-arrow" aria-hidden="true">→</span>}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ROLE */}
      <section className="wrap" data-section="role" ref={setRef("role")}>
        <div className="kicker">09 — What this project demonstrates</div>
        <h2 className="h2">My Role — Senior UX/UI Designer</h2>
        <p className="role-oneliner">I designed the customer side of the referral — from first tap to move-in — balancing conversion, compliance and trust.</p>
        <p className="lead-p">
          Working from the brief, I designed both the Google and guest paths, the four-step connection
          setup with scan-assisted identity checks, the post-submission status and cross-sell experience,
          and the customer home — built on the same components and tokens as the agent app so the two
          sides feel like one product.
        </p>
        <div className="resp-grid">
          {[
            ["UX Strategy", "Reconciled the business goal of account creation with the customer's goal of finishing fast, through an optional, deferred sign-up."],
            ["Flow & IA", "Designed parallel Google and guest paths that share every core step and diverge only where value differs."],
            ["UI Design", "Designed all screens and states — prefilled, scanned, empty and error — across both paths."],
            ["Accessibility", "Designed to WCAG AA: labelled controls, text alongside colour in status pills, and clear required / optional labelling."],
          ].map(([t, d]) => (
            <div className="resp-card" key={t}><b>{t}</b><p>{d}</p></div>
          ))}
        </div>
        <div className="role-grid" style={{ marginTop: "var(--s6)" }}>
          {[
            "Google sign-in with a full guest alternative",
            "Prefilled details from agent and Google",
            "Scan-assisted licence and passport verification",
            "Compliant billing, consent and disclosure step",
            "Live connection status with Calendar and Wallet",
            "One-tap internet and gas cross-sell",
          ].map((t) => (
            <div className="role-item" key={t}><ShieldCheck size={16} /><span>{t}</span></div>
          ))}
        </div>

        <div className="next-card" style={{ marginTop: "var(--s7)" }}>
          <div>
            <div className="kicker">See the other side</div>
            <h3>The Connectnow agent app</h3>
            <p>How property agents create the referral this customer receives — and earn rewards for it.</p>
          </div>
          <a href="#/connectnow-agent">View agent case study</a>
        </div>
      </section>

      <footer className="cs-footer">
        Mohammed Fizal — Senior Product Designer · <a href="mailto:mohammedfizalart@gmail.com" className="footer-link">mohammedfizalart@gmail.com</a> · <a href="https://www.linkedin.com/in/mohammed-fizal-18775812a/" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a> · <a href="https://fizaluxdesigner.vercel.app/" target="_blank" rel="noopener noreferrer" className="footer-link">Resume</a> · <a href="#/" className="footer-link">All projects</a>
      </footer>
    </div>
  );
}
