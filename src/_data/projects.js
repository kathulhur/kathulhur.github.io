/**
 * Selected work — the four real projects that drive the home-page scroller.
 *
 * Each entry is public-facing copy distilled from the detailed briefs in
 * docs/projects/. Those briefs remain the source of truth; this is the trimmed,
 * shippable version. Fields:
 *   name     — display title on the slide
 *   blurb    — one/two sentences: what it is + what's technically notable
 *   tags     — 3–4 short chips (stack / capability)
 *   liveUrl  — public URL when there is one (renders a "Visit live site" link)
 *   slug     — reserved for the future per-project case-study page
 *   visual   — abstract inline SVG preview (no screenshots; never distracts)
 */
module.exports = [
  {
    name: "KuryenteWatch",
    slug: "kuryentewatch",
    blurb:
      "A live, community-sourced electricity-status map for Infanta, Quezon. Volunteer scouts report barangay-level outages while residents watch a real-time map and subscribe to per-barangay push alerts — a Rails 8 Hotwire PWA with an all-database real-time stack and no Redis.",
    tags: ["Rails 8", "Hotwire", "Leaflet", "Web Push"],
    liveUrl: "https://infanta.kuryentewatch.app",
    visual: `<svg width="86%" viewBox="0 0 320 170" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="16" y="16" width="86" height="70" rx="10" fill="var(--identity)" opacity="0.85"/>
      <rect x="112" y="16" width="120" height="44" rx="10" fill="var(--surface-2)"/>
      <rect x="242" y="16" width="62" height="70" rx="10" fill="var(--identity)" opacity="0.5"/>
      <rect x="112" y="70" width="120" height="84" rx="10" fill="var(--identity)" opacity="0.85"/>
      <rect x="16" y="96" width="86" height="58" rx="10" fill="var(--surface-2)"/>
      <rect x="242" y="96" width="62" height="58" rx="10" fill="var(--surface-2)"/>
      <circle cx="59" cy="51" r="7" fill="var(--bg)"/>
      <circle cx="172" cy="112" r="7" fill="var(--bg)"/>
    </svg>`,
  },
  {
    name: "Lakad",
    slug: "lakad",
    blurb:
      "A SaaS that turns the tangled, multi-agency process of registering a Philippine micro-business into one guided roadmap. Built on a rules-as-data engine that encodes frequently-changing government regulations as effective-dated records — so the law can change without a code change.",
    tags: ["Rails 8", "Hotwire", "PostgreSQL", "PWA"],
    visual: `<svg width="86%" viewBox="0 0 320 170" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M40 60 H280" stroke="var(--ink-faint)" stroke-width="2.5" opacity="0.3" stroke-dasharray="3 9" stroke-linecap="round"/>
      <circle cx="40" cy="60" r="12" fill="var(--identity)" opacity="0.9"/>
      <circle cx="120" cy="60" r="12" fill="var(--identity)" opacity="0.9"/>
      <circle cx="200" cy="60" r="12" fill="var(--identity)" opacity="0.45"/>
      <circle cx="280" cy="60" r="12" fill="var(--surface-2)"/>
      <rect x="24" y="92" width="32" height="8" rx="4" fill="var(--ink-faint)" opacity="0.4"/>
      <rect x="104" y="92" width="32" height="8" rx="4" fill="var(--ink-faint)" opacity="0.4"/>
      <rect x="184" y="92" width="32" height="8" rx="4" fill="var(--ink-faint)" opacity="0.25"/>
      <rect x="264" y="92" width="32" height="8" rx="4" fill="var(--ink-faint)" opacity="0.25"/>
      <rect x="40" y="118" width="240" height="7" rx="3.5" fill="var(--surface-2)"/>
      <rect x="40" y="118" width="120" height="7" rx="3.5" fill="var(--identity)" opacity="0.6"/>
    </svg>`,
  },
  {
    name: "Aqualytix",
    slug: "aqualytix",
    blurb:
      "A water-quality monitoring platform that digitizes a local water district's manual pumping-station logs — offline-first field capture, per-station alert thresholds, trend charts, and generated PDF reports. Deployed to AWS with Kamal and CloudWatch alerting.",
    tags: ["Rails", "Hotwire", "PWA", "AWS"],
    visual: `<svg width="86%" viewBox="0 0 320 170" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="16" y="16" width="130" height="60" rx="9" fill="var(--surface-2)"/>
      <rect x="154" y="16" width="70" height="60" rx="9" fill="var(--surface-2)"/>
      <rect x="232" y="16" width="72" height="60" rx="9" fill="var(--identity)" opacity="0.85"/>
      <rect x="16" y="86" width="288" height="68" rx="9" fill="var(--surface-2)"/>
      <polyline points="30,132 66,116 102,124 138,98 174,108 210,84 246,96 290,70" stroke="var(--identity)" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="0.9"/>
      <rect x="28" y="30" width="60" height="9" rx="4" fill="var(--ink-faint)" opacity="0.45"/>
      <rect x="28" y="50" width="40" height="9" rx="4" fill="var(--ink-faint)" opacity="0.3"/>
    </svg>`,
  },
  {
    name: "Payout na po ba?",
    slug: "payout-na-po-ba",
    blurb:
      "A voice-of-customer analytics pipeline that scraped and NLP-coded 55,000+ public comments from LANDBANK's 4Ps beneficiaries to pinpoint their #1 pain point — payout timing — then packaged the evidence into a board-ready recommendation. Built in Node.js with a custom lexicon coder for Taglish and Bisaya text.",
    tags: ["Node.js", "Playwright", "NLP", "Data pipeline"],
    visual: `<svg width="86%" viewBox="0 0 320 170" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="16" y="20" width="150" height="14" rx="7" fill="var(--identity)" opacity="0.9"/>
      <rect x="16" y="48" width="90" height="12" rx="6" fill="var(--identity)" opacity="0.45"/>
      <rect x="16" y="72" width="70" height="12" rx="6" fill="var(--surface-2)"/>
      <rect x="16" y="96" width="56" height="12" rx="6" fill="var(--surface-2)"/>
      <rect x="16" y="120" width="44" height="12" rx="6" fill="var(--surface-2)"/>
      <rect x="16" y="144" width="34" height="12" rx="6" fill="var(--surface-2)"/>
      <rect x="250" y="20" width="54" height="14" rx="7" fill="var(--ink-faint)" opacity="0.4"/>
      <rect x="262" y="48" width="42" height="12" rx="6" fill="var(--ink-faint)" opacity="0.25"/>
    </svg>`,
  },
];
