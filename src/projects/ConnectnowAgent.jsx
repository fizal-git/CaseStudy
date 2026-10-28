import { useState, useEffect, useRef } from "react";
import { ShieldCheck, Lightbulb, ChevronDown, Target, Eye } from "lucide-react";
import { BASE_CSS, SHARED_CSS } from "../styles.js";
import { makePhone, SiteMapTree, PersonaCard, CN_CSS } from "./connectnowShared.jsx";

/* ------------------------------------------------------------------ */
/* Content sourced from the Figma file "Connectnow-Mobile-App",        */
/* agent flow section (screens A01–A13 + menu prototype frames).  */
/* Screen copy, names and numbers are the design's own sample data.    */
/* ------------------------------------------------------------------ */

const S = (f) => `/connectnow-agent/${f}`;

const SCREENS = {
  signin: { code: "A01", src: S("a01-sign-in.png"), title: "Sign in — magic link", h: 844 },
  home: { code: "A02", src: S("a02-home.png"), title: "Home — stats, nudges, quick actions", h: 844 },
  newref: { code: "A03", src: S("a03-new-referral.png"), title: "New referral — quick fill, duplicate check, consent", h: 1349 },
  send: { code: "A04", src: S("a04-send.png"), title: "Send — multi-channel + message preview", h: 838 },
  qr: { code: "A05", src: S("a05-qr.png"), title: "QR code — instant in-person referral", h: 815 },
  referrals: { code: "A06", src: S("a06-referrals.png"), title: "Referrals — search, filters, status", h: 844 },
  detail: { code: "A07", src: S("a07-detail.png"), title: "Referral detail — timeline + actions", h: 979 },
  dashboard: { code: "A08", src: S("a08-dashboard.png"), title: "Dashboard — funnel, rank, accessible KPIs", h: 844 },
  rewards: { code: "A09", src: S("a09-rewards.png"), title: "Rewards — balance, tier, how to earn, history", h: 972 },
  redeem: { code: "A10", src: S("a10-redeem.png"), title: "Redeem — catalogue + confirm sheet", h: 844 },
  notifications: { code: "A11", src: S("a11-notifications.png"), title: "Notifications — events that need you", h: 844 },
  menu: { code: "A12", src: S("a12-menu.png"), title: "Hamburger menu — open", h: 844 },
  logout: { code: "A13", src: S("a13-logout.png"), title: "Logout — confirm", h: 844 },
};

const PERSONAS = [
  {
    id: "agent",
    badge: "PRIMARY USER · REFERRER",
    name: "Jordan Lee",
    role: "Property Manager, Richmond Property Group",
    stats: [["Location", "Melbourne"], ["Device", "iPhone"], ["Context", "Between inspections"]],
    background:
      "Jordan manages leases and sales handovers across a busy inner-city rental book. New tenants constantly ask the same question — “how do I get the power on?” — and Jordan has no fast, trustworthy way to help.",
    situation:
      "Referrals today depend on paper forms, forwarded emails and memory. Once a tenant is passed on, Jordan has no visibility of whether they ever connected — and no reason to keep referring.",
    goals: [
      { title: "Refer in under a minute", desc: "Capture a tenant's details between appointments without re-typing what's already in the application or CRM." },
      { title: "Know where every referral stands", desc: "See who opened, who stalled and who is connected — and get told when to step in." },
      { title: "Get recognised for the effort", desc: "Earn points per connection that are simple to understand and easy to redeem for the team." },
    ],
  },
  {
    id: "customer",
    badge: "SECONDARY USER · RECEIVER",
    name: "Sarah Smith",
    role: "Tenant moving to 24 Smith St, Richmond",
    stats: [["Move-in", "20 Nov"], ["Channel", "SMS + email"], ["Time to finish", "~4 min"]],
    background:
      "Sarah has just signed a lease and is juggling removalists, bond and a new commute. Utilities are the last thing on her list until the day she arrives to a dark apartment.",
    situation:
      "She receives the referral link from her agent. It must feel personal, safe and fast — or she'll ignore it like any other marketing message.",
    goals: [
      { title: "Trust the message", desc: "Recognise who sent the link and why, before tapping it." },
      { title: "Finish quickly", desc: "Complete her connection in a few minutes on her phone, without calling anyone." },
      { title: "Power on by move-in day", desc: "Know the connection is confirmed for her move-in date." },
    ],
  },
];

const JOURNEY = [
  {
    phase: "01", shot: "signin", title: "Sign in",
    text: "Jordan enters a work email and gets a one-tap sign-in link — no new password to remember. Face ID is offered for next time.",
    decision: { title: "Passwordless by default", text: "A magic link tied to the agency email domain, followed by Face ID, removes the biggest drop-off for a tool agents open a few times a week." },
  },
  {
    phase: "02", shot: "home", title: "Home",
    text: "The home screen answers “what needs me today?”: monthly referrals, connections and conversion, two clear actions (New referral / QR referral), and a “Needs your attention” card for stalled customers.",
    decision: { title: "Surface stalls, not just stats", text: "Nudge and Call actions sit right next to customers who haven't opened their link or stopped at the ID check — so follow-ups happen in one tap." },
  },
  {
    phase: "03", shot: "newref", title: "Create a referral",
    text: "Step 1 of 2. Jordan can prefill from a scanned application, the CRM or contacts, then confirms the property, move-in date and customer details — with the customer's consent captured explicitly.",
    decision: { title: "Duplicate check at the address", text: "If the address already has a referral, an inline warning offers “View referral” instead of letting two agents spam the same tenant." },
  },
  {
    phase: "04", shot: "send", title: "Choose how to send",
    text: "Step 2 of 2. SMS, email and QR can be combined. A live preview shows exactly what Sarah will receive, written in Jordan's voice and naming the agency.",
    decision: { title: "Show the message before it's sent", text: "Previewing (and editing) the SMS builds trust on both sides, and the footnote sets expectations: link expires in 7 days, automatic reminder after 48 hours." },
  },
  {
    phase: "05", shot: "qr", title: "Share in person",
    text: "When Sarah is with Jordan in person, he can show a QR code instead of sending an SMS or email. It opens the same secure link, so Sarah scans it with her phone camera and starts her application on the spot. Live status (“Waiting for Sarah to scan…”) confirms it worked.",
    decision: { title: "QR is just another channel", text: "The QR carries exactly the same referral link as SMS and email — no new flow to learn. In person, it removes the wait for a message to arrive, so the customer can proceed instantly while the agent is there to help." },
  },
  {
    phase: "06", shot: "detail", title: "Track progress",
    text: "Referrals are grouped by “Needs action” and “This week” with counted filters. Each referral opens to a five-step timeline from invitation sent to power connected.",
    decision: { title: "One status language everywhere", text: "The same pills (Needs action, Invited, In progress, Submitted, Connected) are used in lists, filters and the timeline — plus “+100 points pending” ties progress to reward." },
  },
  {
    phase: "07", shot: "dashboard", title: "See performance",
    text: "The dashboard shows points and tier, the referral funnel (Sent → Opened → Submitted → Connected), KPI tiles and an office leaderboard.",
    decision: { title: "Insight, not just charts", text: "The funnel names the biggest drop and what fixes it (“Nudging after 48h lifts opens”). KPI changes use arrows and text, never colour alone." },
  },
  {
    phase: "08", shot: "redeem", title: "Earn & redeem",
    text: "Rewards explain exactly how points are earned. Redeeming opens a catalogue (gift cards, team treats, give back) and a confirm sheet with cost, balance after and delivery email.",
    decision: { title: "Confirm before anything irreversible", text: "Points can't be refunded once redeemed, so the bottom sheet spells out the trade-off before the final tap." },
  },
];

const IA = {
  root: "Agent app",
  branches: [
    { name: "Home", items: ["Monthly stats", "New referral", "QR referral", "Needs your attention", "Recent referrals"] },
    { name: "Referrals", items: ["Search", "Status filters", "Referral detail", "Resend / call / SMS"] },
    { name: "Dashboard", items: ["Referral funnel", "KPIs", "Office leaderboard", "Rewards & redeem"] },
    { name: "Header & menu", items: ["Notifications", "My profile", "Resources", "Logout"] },
  ],
};

const FLOWS = [
  { title: "Refer remotely", steps: ["Home", "New referral", "Property + customer details", "Choose SMS / email", "Sent", "Track in Referrals"] },
  { title: "Refer in person", steps: ["Home", "QR referral", "Customer scans with camera", "Same secure link opens", "Customer proceeds instantly"] },
  { title: "Follow up a stalled customer", steps: ["Notification / Needs attention", "Referral detail", "Nudge, call or resend"] },
  { title: "Redeem rewards", steps: ["Dashboard", "Rewards", "Redeem", "Confirm sheet", "Voucher emailed"] },
];

/* Screen-by-screen story. "Research" draws on the brief and on established
   UX principles (named) — not on invented study data. */
const STORIES = [
  {
    group: "Get in",
    items: [
      {
        k: "signin",
        about: "Agents sign in with their work email and receive a one-tap magic link. Face ID is offered for every visit after that, and new agencies can request access.",
        research: [
          "The brief positions this as a tool agents open in short bursts between inspections — so any password, reset or 2FA step is friction that competes with their real job.",
          "Recognition over recall (Nielsen heuristic #6): a work email is something agents already know; a new password is something they must remember.",
          "Tying access to a work email domain lets Connectnow confirm which agency the agent belongs to without a manual approval step.",
        ],
        value: {
          agent: "No password to create, remember or reset — first sign-in in a single tap.",
          business: "Verified agency identity from day one, and fewer support requests for locked accounts.",
        },
      },
      {
        k: "home",
        about: "Home answers “what needs me today?”: a greeting with points balance, the Power On Guarantee, this month's referrals / connections / conversion, the two primary actions, customers who need attention, and recent referrals.",
        research: [
          "Visibility of system status (Nielsen #1): agents need to see results without hunting — so the three numbers that matter sit above the fold.",
          "Hick's law: only two primary actions (New referral, QR referral) keep the main decision instant.",
          "Agents rarely go looking for problems, so stalled customers are pushed to them with the fix (Nudge / Call) attached rather than buried in a list.",
        ],
        value: {
          agent: "Everything urgent and every action is reachable within one screen and one tap.",
          business: "Stalled referrals get followed up instead of silently dropping out of the funnel.",
        },
      },
      {
        k: "menu",
        about: "The side menu holds the agent's profile card (name, agency, points and tier), My profile, Resources, Logout and the app version.",
        research: [
          "Frequency of use drives placement: profile and resources are occasional tasks, so they live behind the menu instead of taking space in the bottom navigation.",
          "Repeating the points and tier in the profile card reinforces the reward loop every time the agent opens the menu.",
        ],
        value: {
          agent: "A clean bottom nav for daily tasks, with account items still one tap away.",
          business: "A home for training material and resources that can grow without redesigning navigation.",
        },
      },
      {
        k: "logout",
        about: "Logging out asks for confirmation and reassures the agent that referrals and points are saved, with a clear Cancel next to the destructive action.",
        research: [
          "Error prevention (Nielsen #5): logging out is easy to tap by accident next to menu items, and the magic-link sign-in makes getting back in a multi-step process.",
          "Stating what is kept (“Your referrals and points are saved”) addresses loss aversion — the main fear when leaving an app holding rewards.",
        ],
        value: {
          agent: "No accidental logouts, and no anxiety about losing earned points.",
          business: "Fewer support contacts from agents who think their history has gone.",
        },
      },
    ],
  },
  {
    group: "Refer",
    items: [
      {
        k: "newref",
        about: "Step 1 of 2. Agents can prefill from a scanned application, the CRM or contacts, then confirm the property address, unit, state, move-in date and the customer's name, mobile and email — with explicit customer consent before continuing.",
        research: [
          "The brief requires agents to enter customer details; agents already hold those details in rental applications and CRMs, so retyping them is pure waste — hence the quick-fill chips.",
          "Error prevention: the duplicate-address warning stops two agents (or one agent twice) contacting the same tenant, which would erode customer trust.",
          "Privacy obligations mean consent must be recorded before a customer is contacted, so it is a required, plainly worded checkbox rather than small print.",
          "A visible 2-step progress bar sets expectations and uses the goal-gradient effect — people speed up as they see the end.",
        ],
        value: {
          agent: "A referral in well under a minute when details can be imported.",
          business: "Cleaner, consented, de-duplicated leads entering the connection pipeline.",
        },
      },
      {
        k: "send",
        about: "Step 2 of 2. Agents choose one or more channels — SMS, email or QR in person — and see a live, editable preview of the message the customer will receive, plus the link expiry and reminder rules.",
        research: [
          "The brief names email, SMS and QR; agents know which channel each customer actually reads, so channels are multi-select rather than one forced choice.",
          "Customers are wary of unexpected links. A message that names the agent, agency, address and move-in date is far more recognisable than a generic one — so the preview makes that personal content visible and editable.",
          "Stating “expires in 7 days · reminder after 48 hours” gives the agent a clear mental model of what happens next without them chasing.",
        ],
        value: {
          agent: "Confidence in exactly what their customer will see, sent in their own voice.",
          business: "Higher open rates from trusted, personal messages and automated reminders.",
        },
      },
      {
        k: "qr",
        about: "The QR code works the same way as the SMS and email options — it opens the same secure referral link. When the customer is in person, the agent shows the code, the customer scans it with their phone camera and proceeds straight into their application. Live status (“Waiting for Sarah to scan…”) confirms the scan, with options to copy or share the link.",
        research: [
          "SMS and email depend on the message arriving and the customer acting on it later — when it can be missed, filtered or forgotten. Face to face, a QR code lets them start immediately.",
          "Using one link for every channel keeps a single flow to design, build and support — and a consistent experience for the customer, however they received it.",
          "Live status gives immediate feedback (Nielsen #1) so the agent knows the scan worked, and can answer questions while the customer gets started.",
        ],
        value: {
          agent: "The customer starts on the spot — no waiting for an SMS or email to arrive.",
          business: "Applications begin at the highest-intent moment, while the agent is there to help.",
        },
      },
    ],
  },
  {
    group: "Track",
    items: [
      {
        k: "referrals",
        about: "All referrals with search by name, address or reference, filter chips with counts (All, Needs action, Invited, In progress, Submitted, Connected), and grouping by Needs action and This week.",
        research: [
          "The brief asks for status tracking. Agents think in terms of “who do I need to chase?”, so Needs action is always grouped first.",
          "Counts on every filter let agents see the shape of their pipeline before tapping anything.",
          "Status pills always carry a text label, so meaning never depends on colour alone (WCAG 1.4.1).",
        ],
        value: {
          agent: "Find any customer in seconds and see who needs a nudge at a glance.",
          business: "A consistent status language shared between app, agents and support.",
        },
      },
      {
        k: "detail",
        about: "A single referral: reference, status, address, move-in date and contact details; quick actions to Call, SMS, Resend or Copy link; a five-step progress timeline; and the points pending on connection.",
        research: [
          "Agents are asked by customers and landlords “is the power going to be on?” — a timeline from invitation to power connected lets them answer with confidence.",
          "Putting the follow-up actions next to the status removes the gap between noticing a problem and fixing it.",
          "Showing “+100 points pending” links each referral to its reward, applying the endowed-progress effect to keep agents invested until connection.",
        ],
        value: {
          agent: "Full visibility of each customer's progress and the tools to move it forward.",
          business: "More referrals reach Connected because agents can see — and remove — blockers.",
        },
      },
      {
        k: "notifications",
        about: "Events that need the agent, grouped by Today and Earlier: a link opened, power connected with points added, an invite not opened (with Send a nudge), a tier reached and a monthly summary.",
        research: [
          "Notifications are limited to events that either reward the agent or need their action — anything else is noise that trains people to ignore alerts.",
          "Inline actions (Send a nudge, View summary) let agents act from the notification itself rather than navigating.",
        ],
        value: {
          agent: "Told only when something matters, with the next step built in.",
          business: "Timely follow-ups and positive reinforcement that keep agents engaged.",
        },
      },
    ],
  },
  {
    group: "Earn",
    items: [
      {
        k: "dashboard",
        about: "Points and tier with Redeem, the referral funnel (Sent → Opened → Submitted → Connected) with counts and percentages, KPI tiles for conversion, days to submit and in progress, and an office leaderboard.",
        research: [
          "The brief asks agents to track conversions. A funnel shows where referrals are lost, and the caption names the biggest drop and the fix, turning data into an action.",
          "KPI changes pair arrows with values and text, never colour alone, so they read correctly for colour-blind users (WCAG 1.4.1).",
          "A small, local leaderboard (“2 more connections to take #1”) uses social comparison to motivate without making most people feel they can never win.",
        ],
        value: {
          agent: "Clear progress, a concrete next goal and a reason to keep referring.",
          business: "Agents self-correct (e.g. nudging sooner), improving overall conversion.",
        },
      },
      {
        k: "rewards",
        about: "Available balance, Silver tier progress towards Gold and its perk, a Redeem points action, how points are earned (+100 connected, +50 add-on, +200 monthly bonus, +20 QR), and recent activity.",
        research: [
          "The brief specifies redeemable points per conversion. Incentives only change behaviour when people understand the rules — so “How you earn” lists every rule with its value.",
          "The progress bar to Gold and its perk use the goal-gradient effect: a visible, near target motivates more than an abstract balance.",
          "Bonus rules (add-ons, QR, monthly streak) deliberately reward the behaviours Connectnow wants more of.",
        ],
        value: {
          agent: "Transparent, predictable rewards they can plan around.",
          business: "A lever to encourage cross-sell, in-person referrals and consistent monthly activity.",
        },
      },
      {
        k: "redeem",
        about: "A rewards catalogue filtered by Gift cards, Team treats and Give back, with a confirm sheet showing cost, balance after and the delivery email before redeeming.",
        research: [
          "Agents work in teams, so rewards include team treats and charity alongside personal gift cards — recognising that not everyone is motivated by the same thing.",
          "Error prevention: redemption can't be undone, so the confirm sheet states the cost, the remaining balance and where the voucher goes.",
        ],
        value: {
          agent: "Rewards that suit them or their office, with no surprises at checkout.",
          business: "Tangible pay-off that closes the loop and sustains the referral habit.",
        },
      },
    ],
  },
];

const TOKENS = [
  { name: "Button / icon", hex: "#2EA347", note: "Colour token" },
  { name: "Text medium", hex: "#444444", note: "Colour token" },
  { name: "White", hex: "#FFFFFF", note: "Colour token" },
  { name: "App background", hex: "#EEEEEE", note: "Sampled from screens" },
  { name: "Rewards surface", hex: "#0B2713", note: "Sampled from screens" },
  { name: "Guarantee highlight", hex: "#E3F78C", note: "Sampled from screens" },
  { name: "Warning surface", hex: "#FFF3DB", note: "Sampled from screens" },
  { name: "Destructive", hex: "#BA0517", note: "Sampled from screens" },
];

/* ------------------------------------------------------------------ */

const Phone = makePhone(SCREENS, "Connectnow agent app");

export default function ConnectnowAgent() {
  const [openPersona, setOpenPersona] = useState("agent");
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
    ["personas", "Personas"],
    ["journey", "Journey"],
    ["screens", "Screens"],
    ["decisions", "Decisions"],
    ["ia", "IA"],
    ["designsystem", "Design System"],
    ["role", "My Role"],
  ];
  const J = JOURNEY[activePhase];

  return (
    <div className="cs-root cn-root">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600&display=swap');` + BASE_CSS + SHARED_CSS + CN_CSS}</style>

      <nav className="cs-nav">
        <div className="cs-nav-inner">
          <div className="cs-nav-left">
            <a href="#/" className="cs-back">← All projects</a>
            <div className="cs-logo">Connect<span>now</span> Agent — Case Study</div>
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
        <h1>Turning property agents into a referral channel — one tenant at a time.</h1>
        <p className="lede">
          The Connectnow agent app lets real estate agents refer movers by SMS, email or QR code,
          track every connection through to power-on, and earn rewards for each one — designed to
          feel effortless between inspections.
        </p>
        <div className="hero-meta">
          <div><label>Role</label>Senior UX/UI Designer</div>
          <div><label>Stage</label>Proof of concept · Agent flow</div>
          <div><label>Scope</label>13 screens + menu prototype</div>
          <div><label>Platform</label>iOS · 390 × 844</div>
        </div>
        <div className="hero-shot">
          <div className="cn-hero-phones">
            <Phone k="newref" eager />
            <Phone k="home" eager />
            <Phone k="dashboard" eager />
          </div>
        </div>
      </header>

      {/* FOCUS */}
      <section className="wrap focus-section" data-section="focus">
        <div className="kicker">Focus</div>
        <div className="focus-pills">
          {["Mobile UX/UI", "Referral flow", "Status tracking", "Rewards & gamification", "Accessibility (WCAG AA)"].map((f) => (
            <span className="focus-pill" key={f}>{f}</span>
          ))}
        </div>
      </section>

      {/* CONTEXT */}
      <section className="wrap" data-section="context" ref={setRef("context")}>
        <div className="kicker">01 — Project context</div>
        <h2 className="h2">Moves start with an agent. So should the connection.</h2>
        <p className="lead-p">
          Connectnow helps people moving house connect their utilities. The Connectnow mobile app is a
          proof of concept with two sides: a customer app for people who've placed a connection
          request (sign in with Google, track status, discover other services), and an agent app for
          the real estate agents who meet those customers first. This case study covers the agent side.
        </p>
        <div className="context-steps">
          {[
            ["Agents meet movers first", "Leases and settlements are where a move begins — the natural moment to offer a connection."],
            ["Capture the customer", "Agents enter or import customer and property details in a short, two-step form."],
            ["Send a secure referral", "The customer receives a personal link by SMS, email or an in-person QR code."],
            ["Track every connection", "Status flows back to the agent: opened, in progress, submitted, connected."],
            ["Reward each conversion", "Agents earn points per connection and redeem them for gift cards, team treats or charity."],
          ].map(([t, d], i) => (
            <div className="context-step" key={t}>
              <span className="context-step-num">{String(i + 1).padStart(2, "0")}</span>
              <div><b>{t}</b><p>{d}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* PROBLEM */}
      <section className="wrap" data-section="problem" ref={setRef("problem")}>
        <div className="kicker">02 — The problem</div>
        <h2 className="h2">Referring is easy to promise and easy to forget.</h2>
        <div className="problem-grid">
          <div>
            <p className="lead-p">
              Agents are busy, mobile and measured on leases — not utilities. If referring a tenant takes
              more than a minute, or if they never hear what happened next, the referral simply doesn't get made.
            </p>
            <p className="lead-p">
              The design challenge was to make referring fast enough to do between appointments or face to face, transparent
              enough that agents trust it, and rewarding enough that they keep doing it — while making
              the message the customer receives feel personal rather than like marketing.
            </p>
          </div>
          <div className="brief-card">
            <h4><Target size={15} /> The brief</h4>
            <ul>
              <li>Agents enter customer details and create a referral request.</li>
              <li>Referrals can be sent by email, SMS or QR code.</li>
              <li>Agents track referral status and conversions.</li>
              <li>Agents earn redeemable points for every conversion.</li>
              <li>The experience must be easy and aesthetic.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* PERSONAS */}
      <section className="wrap" data-section="personas" ref={setRef("personas")}>
        <div className="kicker">03 — Who this is for</div>
        <h2 className="h2">One referral, two people who both need to trust it.</h2>
        <p className="lead-p">
          Proto-personas built around the scenario used throughout the design — the agent who sends the
          referral and the tenant who receives it.
        </p>
        {PERSONAS.map((p) => (
          <PersonaCard key={p.id} p={p} open={openPersona === p.id} onToggle={() => setOpenPersona(openPersona === p.id ? null : p.id)} />
        ))}
      </section>

      {/* JOURNEY */}
      <section className="wrap" data-section="journey" ref={setRef("journey")}>
        <div className="kicker">04 — The agent journey</div>
        <h2 className="h2">Following Jordan from sign-in to reward.</h2>
        <p className="lead-p">
          Eight moments across the app, each paired with the screen that serves it and the design
          decision behind it.
        </p>

        <div className="journey-persona">
          <div className="av">JL</div>
          <span><b>Jordan Lee</b> <span className="muted">· Richmond Property Group · referring Sarah Smith</span></span>
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
            <div className="cn-journey-shot">
              <Phone k={J.shot} fixed eager />
            </div>
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
          All 13 screens from the agent flow, grouped by what the agent is trying to do — each with what it does, the research and reasoning behind it, and the value it adds for agents and for Connectnow.
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
                      <ul className="story-research">
                        {it.research.map((r) => <li key={r}>{r}</li>)}
                      </ul>
                    </div>
                    <div className="story-block">
                      <div className="journey-block-label">VALUE ADDED</div>
                      <div className="story-value">
                        <div><b>For agents</b><span>{it.value.agent}</span></div>
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

      {/* DECISIONS */}
      <section className="wrap" data-section="decisions" ref={setRef("decisions")}>
        <div className="kicker">06 — Key design decisions</div>
        <h2 className="h2">Small details that keep referrals moving.</h2>
        <p className="lead-p">The patterns that do the most work across the flow.</p>
        <div className="decision-grid">
          {[
            ["Speed", "Quick fill from existing data", "Scan application, From CRM and Contacts chips sit above the form so agents rarely type from scratch."],
            ["Trust", "Explicit customer consent", "A required checkbox confirms the customer agreed to be contacted about their electricity connection before anything is sent."],
            ["Quality", "Duplicate address warning", "Catches a second referral to the same property and routes the agent to the existing one."],
            ["Trust", "Personal, previewable message", "The SMS names the agent and agency, the move-in date and address — and can be edited before sending."],
            ["Follow-through", "Automatic reminders + nudges", "Customers are reminded after 48 hours; agents see who's stalled with one-tap Nudge and Call actions."],
            ["Transparency", "Five-step progress timeline", "From invitation sent to power connected, with timestamps and the points that will land at the end."],
            ["Motivation", "Tiers, streaks and a leaderboard", "Silver → Gold progress, monthly bonuses and an office ranking (“2 more connections to take #1”) keep goals concrete."],
            ["Safety", "Confirmation for irreversible actions", "Redeeming points and logging out both use a clear confirmation step with the consequence spelled out."],
            ["Reassurance", "Power On Guarantee up front", "The guarantee banner on Home gives agents a simple promise to repeat to customers."],
            ["Accessibility", "Accessible KPIs", "Trends pair arrows with text values; status pills always carry a label, so meaning never relies on colour alone."],
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
        <div className="kicker">07 — Information architecture & flows</div>
        <h2 className="h2">Three tabs, one header, no dead ends.</h2>
        <p className="lead-p">
          A bottom navigation for the three things agents do most, with notifications and account items
          tucked into the header and side menu.
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

      {/* DESIGN SYSTEM */}
      <section className="wrap" data-section="designsystem" ref={setRef("designsystem")}>
        <div className="kicker">08 — Design system</div>
        <h2 className="h2">A friendly, high-contrast visual language.</h2>
        <p className="lead-p">
          Built on the Connectnow green with a deep green surface for rewards, Outfit for type, and a
          shared set of components — referral rows, status pills, stat tiles, tracker steps and buttons —
          reused across every screen.
        </p>
        <div className="swatch-grid">
          {TOKENS.map((t) => (
            <div className="swatch" key={t.name}>
              <div className="swatch-chip" style={{ background: t.hex }} />
              <div className="swatch-meta"><b>{t.name}</b><code>{t.hex}</code><small>{t.note}</small></div>
            </div>
          ))}
        </div>
        <div className="type-sample">
          <div className="mono" style={{ color: "var(--accent)", marginBottom: 8 }}>Typeface · Outfit</div>
          <div className="big">Good morning, Jordan</div>
          <span className="btn">New referral</span>
          <p>Button style: Outfit SemiBold 20 · spacing tokens 10 / 12 / 24.</p>
        </div>
        <div className="ds-card">
          <div className="ds-card-body">
            <h3>Reusable components</h3>
            <ul className="ds-list">
              <li>App header &amp; bottom nav</li>
              <li>Stat tile (value + trend)</li>
              <li>Referral row with status pill</li>
              <li>Tracker step (timeline)</li>
              <li>Form fields — email, phone, date, search</li>
              <li>Primary button &amp; chips</li>
              <li>Side menu &amp; menu item</li>
              <li>Bottom sheet &amp; dialog</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ROLE */}
      <section className="wrap" data-section="role" ref={setRef("role")}>
        <div className="kicker">09 — What this project demonstrates</div>
        <h2 className="h2">My Role — Senior UX/UI Designer</h2>
        <p className="role-oneliner">I shaped a referral-and-rewards concept into a complete, testable mobile app flow.</p>
        <p className="lead-p">
          Working from the brief, I defined the agent journey, information architecture and every screen
          of the agent flow — from passwordless sign-in through referral creation, multi-channel sending,
          tracking and rewards — and built it from reusable components and tokens so it can grow into
          the customer side of the app.
        </p>
        <div className="resp-grid">
          {[
            ["UX Strategy", "Translated the business goal — more connections via agents — into a flow agents would actually use between appointments."],
            ["Journey & IA", "Mapped the agent journey end to end and structured the app around three tabs plus header and menu."],
            ["UI Design", "Designed all 13 screens and states, including warnings, sheets, dialogs and the menu prototype."],
            ["Accessibility", "Designed to WCAG AA: labelled status pills, text alongside colour, large tap targets and clear focus of primary actions."],
          ].map(([t, d]) => (
            <div className="resp-card" key={t}><b>{t}</b><p>{d}</p></div>
          ))}
        </div>
        <div className="role-grid" style={{ marginTop: "var(--s6)" }}>
          {[
            "Two-step referral with quick fill, duplicate check and consent",
            "Multi-channel sending — SMS, email and in-person QR",
            "Referral tracking with filters and a five-step timeline",
            "Dashboard with funnel insight, KPIs and leaderboard",
            "Points, tiers and a redeemable rewards catalogue",
            "Component-based UI built on Connectnow tokens",
          ].map((t) => (
            <div className="role-item" key={t}><ShieldCheck size={16} /><span>{t}</span></div>
          ))}
        </div>

        <div className="next-card" style={{ marginTop: "var(--s7)" }}>
          <div>
            <div className="kicker">See the other side</div>
            <h3>The Connectnow customer app</h3>
            <p>What Sarah sees when she taps Jordan's link — Google or guest sign-in, scan-assisted ID and live tracking.</p>
          </div>
          <a href="#/connectnow-customer">View customer case study</a>
        </div>
      </section>

      <footer className="cs-footer">
        Mohammed Fizal — Senior Product Designer · <a href="mailto:mohammedfizalart@gmail.com" className="footer-link">mohammedfizalart@gmail.com</a> · <a href="https://www.linkedin.com/in/mohammed-fizal-18775812a/" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a> · <a href="https://fizaluxdesigner.vercel.app/" target="_blank" rel="noopener noreferrer" className="footer-link">Resume</a>
      </footer>
    </div>
  );
}
