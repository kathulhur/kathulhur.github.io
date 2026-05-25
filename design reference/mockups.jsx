// Five portfolio direction mockups. Each is a ~1280x800 "homepage" preview.

// ============================================================
// 1. TERMINAL / IDE
// ============================================================
const terminalStyles = {
  wrap: { width: '100%', height: '100%', background: '#0d1117', color: '#c9d1d9', fontFamily: '"JetBrains Mono", "SF Mono", ui-monospace, monospace', fontSize: 13, display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  titlebar: { height: 28, background: '#161b22', borderBottom: '1px solid #30363d', display: 'flex', alignItems: 'center', padding: '0 12px', gap: 8, fontSize: 11, color: '#8b949e' },
  dot: (c) => ({ width: 11, height: 11, borderRadius: '50%', background: c }),
  body: { flex: 1, display: 'flex', minHeight: 0 },
  sidebar: { width: 220, background: '#0d1117', borderRight: '1px solid #21262d', padding: '12px 0', fontSize: 12 },
  sideHead: { padding: '4px 16px', fontSize: 10, letterSpacing: 1.2, color: '#6e7681', textTransform: 'uppercase' },
  file: (active) => ({ padding: '3px 16px 3px 28px', color: active ? '#fff' : '#c9d1d9', background: active ? '#1f6feb33' : 'transparent', display: 'flex', alignItems: 'center', gap: 6, borderLeft: active ? '2px solid #1f6feb' : '2px solid transparent', cursor: 'pointer' }),
  folder: { padding: '3px 16px', color: '#c9d1d9', display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' },
  main: { flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 },
  tabs: { height: 32, background: '#0d1117', borderBottom: '1px solid #21262d', display: 'flex' },
  tab: (active) => ({ padding: '0 14px', height: '100%', display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: active ? '#fff' : '#8b949e', background: active ? '#0d1117' : '#161b22', borderRight: '1px solid #21262d', borderTop: active ? '1px solid #1f6feb' : '1px solid transparent', cursor: 'pointer' }),
  editor: { flex: 1, padding: '20px 24px', overflow: 'hidden', lineHeight: 1.7 },
  ln: { display: 'inline-block', width: 28, color: '#484f58', textAlign: 'right', marginRight: 16, userSelect: 'none' },
  h: { color: '#79c0ff' },
  k: { color: '#ff7b72' },
  s: { color: '#a5d6ff' },
  c: { color: '#8b949e', fontStyle: 'italic' },
  v: { color: '#d2a8ff' },
  fn: { color: '#d2a8ff' },
  term: { height: 140, borderTop: '1px solid #21262d', background: '#010409', padding: '10px 14px', fontSize: 12, color: '#c9d1d9' },
  prompt: { color: '#7ee787' },
  status: { height: 22, background: '#1f6feb', color: '#fff', fontSize: 11, display: 'flex', alignItems: 'center', padding: '0 10px', gap: 14 },
};

function TerminalMock() {
  const t = terminalStyles;
  return (
    <div style={t.wrap}>
      <div style={t.titlebar}>
        <div style={t.dot('#ff5f57')}></div>
        <div style={t.dot('#febc2e')}></div>
        <div style={t.dot('#28c840')}></div>
        <div style={{ flex: 1, textAlign: 'center' }}>alex-chen — portfolio — zsh</div>
      </div>
      <div style={t.body}>
        <div style={t.sidebar}>
          <div style={t.sideHead}>Explorer</div>
          <div style={t.folder}>▾ 📁 portfolio</div>
          <div style={t.file(false)}>📄 README.md</div>
          <div style={t.file(true)}>📄 about.md</div>
          <div style={t.folder}>&nbsp;&nbsp;▾ 📁 projects</div>
          <div style={{ ...t.file(false), paddingLeft: 40 }}>📄 ledger.tsx</div>
          <div style={{ ...t.file(false), paddingLeft: 40 }}>📄 atlas.tsx</div>
          <div style={{ ...t.file(false), paddingLeft: 40 }}>📄 quill.tsx</div>
          <div style={{ ...t.file(false), paddingLeft: 40 }}>📄 mira.tsx</div>
          <div style={t.folder}>&nbsp;&nbsp;▸ 📁 writing</div>
          <div style={t.file(false)}>📄 skills.json</div>
          <div style={t.file(false)}>📄 contact.ts</div>
          <div style={{ ...t.sideHead, marginTop: 16 }}>Outline</div>
          <div style={{ ...t.file(false), color: '#8b949e' }}>＃ summary</div>
          <div style={{ ...t.file(false), color: '#8b949e' }}>＃ stack</div>
          <div style={{ ...t.file(false), color: '#8b949e' }}>＃ now</div>
        </div>
        <div style={t.main}>
          <div style={t.tabs}>
            <div style={t.tab(false)}>README.md ●</div>
            <div style={t.tab(true)}>about.md <span style={{ opacity: 0.5 }}>×</span></div>
            <div style={t.tab(false)}>ledger.tsx</div>
          </div>
          <div style={t.editor}>
            <div><span style={t.ln}>1</span><span style={t.h}># Alex Chen</span></div>
            <div><span style={t.ln}>2</span></div>
            <div><span style={t.ln}>3</span>Software engineer building <span style={t.k}>**tools**</span> for</div>
            <div><span style={t.ln}>4</span>data teams. Currently at <span style={t.s}>@vercel</span>,</div>
            <div><span style={t.ln}>5</span>previously <span style={t.s}>@stripe</span>.</div>
            <div><span style={t.ln}>6</span></div>
            <div><span style={t.ln}>7</span><span style={t.h}>## Stack</span></div>
            <div><span style={t.ln}>8</span></div>
            <div><span style={t.ln}>9</span><span style={t.c}>{'// daily drivers'}</span></div>
            <div><span style={t.ln}>10</span><span style={t.k}>const</span> <span style={t.v}>stack</span> = [<span style={t.s}>'ts'</span>, <span style={t.s}>'rust'</span>, <span style={t.s}>'pg'</span>];</div>
            <div><span style={t.ln}>11</span></div>
            <div><span style={t.ln}>12</span><span style={t.h}>## Now</span></div>
            <div><span style={t.ln}>13</span></div>
            <div><span style={t.ln}>14</span>– shipping a query planner</div>
            <div><span style={t.ln}>15</span>– reading <span style={t.s}>"Designing Data-Intensive Apps"</span></div>
          </div>
          <div style={t.term}>
            <div><span style={t.prompt}>~/portfolio ❯</span> ls projects/</div>
            <div style={{ color: '#8b949e', paddingLeft: 0 }}>ledger.tsx&nbsp;&nbsp;atlas.tsx&nbsp;&nbsp;quill.tsx&nbsp;&nbsp;mira.tsx</div>
            <div style={{ marginTop: 4 }}><span style={t.prompt}>~/portfolio ❯</span> cat projects/ledger.tsx | head</div>
            <div style={{ marginTop: 4 }}><span style={t.prompt}>~/portfolio ❯</span> <span style={{ background: '#c9d1d9', color: '#0d1117', width: 8, height: 14, display: 'inline-block', verticalAlign: 'middle' }}></span></div>
          </div>
        </div>
      </div>
      <div style={t.status}>
        <span>⎇ main</span>
        <span>● 0 errors</span>
        <span>about.md</span>
        <span style={{ marginLeft: 'auto' }}>Ln 14, Col 23</span>
        <span>UTF-8</span>
        <span>Markdown</span>
      </div>
    </div>
  );
}

// ============================================================
// 2. EDITORIAL / MAGAZINE
// ============================================================
const editStyles = {
  wrap: { width: '100%', height: '100%', background: '#f5f1ea', color: '#1a1715', fontFamily: '"EB Garamond", "Iowan Old Style", Georgia, serif', display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  nav: { display: 'flex', alignItems: 'baseline', padding: '24px 56px', borderBottom: '1px solid #1a171520', fontSize: 13, letterSpacing: 0.5 },
  brand: { fontFamily: '"EB Garamond", Georgia, serif', fontSize: 18, fontWeight: 500, fontStyle: 'italic', letterSpacing: 0 },
  navLinks: { marginLeft: 'auto', display: 'flex', gap: 32, fontFamily: 'ui-sans-serif, system-ui, sans-serif', fontSize: 11, letterSpacing: 1.4, textTransform: 'uppercase' },
  hero: { padding: '52px 56px 32px', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 48 },
  kicker: { fontFamily: 'ui-sans-serif, system-ui', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: '#7a6a5a' },
  headline: { fontSize: 72, lineHeight: 0.95, fontWeight: 500, margin: '14px 0 24px', letterSpacing: -1.5 },
  lede: { fontSize: 18, lineHeight: 1.5, color: '#3a3530', maxWidth: '32ch' },
  heroImg: { background: 'linear-gradient(135deg, #d4c5b0, #b89e80)', borderRadius: 2, position: 'relative', overflow: 'hidden', minHeight: 320 },
  imgLabel: { position: 'absolute', bottom: 14, left: 18, fontFamily: 'ui-monospace, monospace', fontSize: 10, color: '#fff', letterSpacing: 1, textTransform: 'uppercase', opacity: 0.85 },
  rule: { borderTop: '1px solid #1a171530', margin: '0 56px' },
  featured: { padding: '32px 56px 0', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 32 },
  story: {},
  storyImg: (c) => ({ background: c, height: 130, borderRadius: 2, marginBottom: 14 }),
  storyKicker: { fontFamily: 'ui-sans-serif, system-ui', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: '#9a8a7a', marginBottom: 6 },
  storyTitle: { fontSize: 22, lineHeight: 1.1, fontWeight: 500, marginBottom: 6, letterSpacing: -0.3 },
  storyDek: { fontSize: 13, lineHeight: 1.5, color: '#5a5048' },
};

function EditorialMock() {
  const e = editStyles;
  return (
    <div style={e.wrap}>
      <div style={e.nav}>
        <div style={e.brand}>Alex Chen</div>
        <div style={e.navLinks}>
          <span>Index</span><span>Writing</span><span>About</span><span>Contact</span>
        </div>
      </div>
      <div style={e.hero}>
        <div>
          <div style={e.kicker}>Vol. IX · 2024–2026</div>
          <div style={e.headline}>An engineer<br />who builds<br /><em>quiet tools.</em></div>
          <div style={e.lede}>Selected work, essays, and field notes from twelve years of writing software for data teams, designers, and the people who use both.</div>
        </div>
        <div style={e.heroImg}>
          <div style={e.imgLabel}>Portrait · Studio · 2025</div>
        </div>
      </div>
      <div style={e.rule}></div>
      <div style={e.featured}>
        <div style={e.story}>
          <div style={e.storyImg('linear-gradient(160deg,#2a4a4e,#1a3236)')}></div>
          <div style={e.storyKicker}>Case Study · No. 01</div>
          <div style={e.storyTitle}>Rebuilding Ledger from the type system up</div>
          <div style={e.storyDek}>How a two-week refactor turned into an eighteen-month migration—and why it was worth it.</div>
        </div>
        <div style={e.story}>
          <div style={e.storyImg('linear-gradient(160deg,#c9a878,#a8825a)')}></div>
          <div style={e.storyKicker}>Essay · No. 14</div>
          <div style={e.storyTitle}>On API design as a kind of writing</div>
          <div style={e.storyDek}>Notes on clarity, omission, and the right verbs.</div>
        </div>
        <div style={e.story}>
          <div style={e.storyImg('linear-gradient(160deg,#8a6a8a,#5a3e5a)')}></div>
          <div style={e.storyKicker}>Project · Atlas</div>
          <div style={e.storyTitle}>A search index for half a billion documents</div>
          <div style={e.storyDek}>Built in Rust over a long winter.</div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// 3. LIVE DASHBOARD
// ============================================================
const dashStyles = {
  wrap: { width: '100%', height: '100%', background: '#0a0e14', color: '#cbd5e1', fontFamily: '"Inter", ui-sans-serif, system-ui, sans-serif', fontSize: 13, display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  top: { padding: '16px 24px', borderBottom: '1px solid #1e2937', display: 'flex', alignItems: 'center', gap: 16 },
  brand: { fontFamily: 'ui-monospace, monospace', fontWeight: 600, fontSize: 14, color: '#fff', letterSpacing: 0.5 },
  liveDot: { width: 8, height: 8, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e' },
  navItem: (active) => ({ fontSize: 12, color: active ? '#fff' : '#64748b', padding: '6px 10px', borderRadius: 4, background: active ? '#1e2937' : 'transparent', cursor: 'pointer' }),
  timestamp: { marginLeft: 'auto', fontFamily: 'ui-monospace, monospace', fontSize: 11, color: '#64748b' },
  body: { flex: 1, padding: 20, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gridTemplateRows: 'auto 1fr auto', gap: 14, minHeight: 0 },
  card: { background: '#0f1620', border: '1px solid #1e2937', borderRadius: 6, padding: '14px 16px', display: 'flex', flexDirection: 'column' },
  metric: { fontFamily: 'ui-monospace, monospace', fontSize: 28, color: '#fff', fontWeight: 500, letterSpacing: -0.5 },
  metricLabel: { fontSize: 10, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 6 },
  delta: (pos) => ({ fontSize: 11, color: pos ? '#22c55e' : '#ef4444', fontFamily: 'ui-monospace, monospace', marginTop: 4 }),
  chartCard: { gridColumn: 'span 2', gridRow: 'span 2', background: '#0f1620', border: '1px solid #1e2937', borderRadius: 6, padding: '14px 16px', display: 'flex', flexDirection: 'column' },
  projCard: { gridColumn: 'span 2', background: '#0f1620', border: '1px solid #1e2937', borderRadius: 6, padding: '14px 16px' },
  projRow: { display: 'flex', alignItems: 'center', gap: 12, padding: '7px 0', borderTop: '1px solid #1e2937', fontSize: 12 },
  statusPill: (c) => ({ width: 7, height: 7, borderRadius: '50%', background: c, boxShadow: `0 0 6px ${c}` }),
  logCard: { gridColumn: 'span 4', background: '#0f1620', border: '1px solid #1e2937', borderRadius: 6, padding: '12px 16px' },
  logLine: { fontFamily: 'ui-monospace, monospace', fontSize: 11, color: '#94a3b8', padding: '2px 0' },
};

function DashMock() {
  const d = dashStyles;
  return (
    <div style={d.wrap}>
      <div style={d.top}>
        <div style={d.brand}>alex.chen<span style={{ color: '#22c55e' }}>/</span>portfolio</div>
        <div style={d.liveDot}></div>
        <span style={{ fontSize: 11, color: '#22c55e', fontFamily: 'ui-monospace, monospace' }}>LIVE</span>
        <div style={{ display: 'flex', gap: 4, marginLeft: 24 }}>
          <div style={d.navItem(true)}>Overview</div>
          <div style={d.navItem(false)}>Projects</div>
          <div style={d.navItem(false)}>Activity</div>
          <div style={d.navItem(false)}>About</div>
        </div>
        <div style={d.timestamp}>Last sync: 12s ago · 2026-05-25 14:32 UTC</div>
      </div>
      <div style={d.body}>
        <div style={d.card}>
          <div style={d.metricLabel}>Commits / 7d</div>
          <div style={d.metric}>247</div>
          <div style={d.delta(true)}>↑ 18% vs prev</div>
        </div>
        <div style={d.card}>
          <div style={d.metricLabel}>Deploys / 30d</div>
          <div style={d.metric}>62</div>
          <div style={d.delta(true)}>↑ 4 today</div>
        </div>
        <div style={d.chartCard}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
            <div>
              <div style={d.metricLabel}>Activity · last 90 days</div>
              <div style={{ ...d.metric, fontSize: 22 }}>1,842 events</div>
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              <div style={{ fontSize: 10, padding: '3px 8px', background: '#1e2937', borderRadius: 3, color: '#94a3b8' }}>7D</div>
              <div style={{ fontSize: 10, padding: '3px 8px', background: '#22c55e22', borderRadius: 3, color: '#22c55e' }}>90D</div>
              <div style={{ fontSize: 10, padding: '3px 8px', background: '#1e2937', borderRadius: 3, color: '#94a3b8' }}>1Y</div>
            </div>
          </div>
          <svg viewBox="0 0 400 140" preserveAspectRatio="none" style={{ flex: 1, width: '100%' }}>
            <defs>
              <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#22c55e" stopOpacity="0.4" />
                <stop offset="1" stopColor="#22c55e" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,110 L20,95 L40,100 L60,80 L80,85 L100,70 L120,72 L140,55 L160,60 L180,40 L200,48 L220,30 L240,42 L260,35 L280,25 L300,30 L320,18 L340,25 L360,12 L380,20 L400,15 L400,140 L0,140 Z" fill="url(#g1)" />
            <path d="M0,110 L20,95 L40,100 L60,80 L80,85 L100,70 L120,72 L140,55 L160,60 L180,40 L200,48 L220,30 L240,42 L260,35 L280,25 L300,30 L320,18 L340,25 L360,12 L380,20 L400,15" stroke="#22c55e" strokeWidth="1.5" fill="none" />
          </svg>
        </div>
        <div style={d.card}>
          <div style={d.metricLabel}>Uptime</div>
          <div style={d.metric}>99.98<span style={{ fontSize: 16, color: '#64748b' }}>%</span></div>
          <div style={d.delta(true)}>● operational</div>
        </div>
        <div style={d.card}>
          <div style={d.metricLabel}>Open PRs</div>
          <div style={d.metric}>7</div>
          <div style={{ ...d.delta(false), color: '#fbbf24' }}>3 awaiting review</div>
        </div>
        <div style={d.projCard}>
          <div style={{ ...d.metricLabel, marginBottom: 10 }}>Projects · 12 total</div>
          <div style={{ ...d.projRow, borderTop: 'none' }}>
            <div style={d.statusPill('#22c55e')}></div>
            <span style={{ color: '#fff', flex: 1 }}>ledger</span>
            <span style={{ color: '#64748b', fontFamily: 'ui-monospace, monospace', fontSize: 11 }}>typescript</span>
            <span style={{ color: '#22c55e', fontFamily: 'ui-monospace, monospace', fontSize: 11 }}>● operational</span>
          </div>
          <div style={d.projRow}>
            <div style={d.statusPill('#22c55e')}></div>
            <span style={{ color: '#fff', flex: 1 }}>atlas</span>
            <span style={{ color: '#64748b', fontFamily: 'ui-monospace, monospace', fontSize: 11 }}>rust</span>
            <span style={{ color: '#22c55e', fontFamily: 'ui-monospace, monospace', fontSize: 11 }}>● operational</span>
          </div>
          <div style={d.projRow}>
            <div style={d.statusPill('#fbbf24')}></div>
            <span style={{ color: '#fff', flex: 1 }}>quill</span>
            <span style={{ color: '#64748b', fontFamily: 'ui-monospace, monospace', fontSize: 11 }}>go</span>
            <span style={{ color: '#fbbf24', fontFamily: 'ui-monospace, monospace', fontSize: 11 }}>◐ in dev</span>
          </div>
          <div style={d.projRow}>
            <div style={d.statusPill('#3b82f6')}></div>
            <span style={{ color: '#fff', flex: 1 }}>mira</span>
            <span style={{ color: '#64748b', fontFamily: 'ui-monospace, monospace', fontSize: 11 }}>python</span>
            <span style={{ color: '#3b82f6', fontFamily: 'ui-monospace, monospace', fontSize: 11 }}>○ archived</span>
          </div>
        </div>
        <div style={d.logCard}>
          <div style={{ ...d.metricLabel, marginBottom: 8 }}>Activity stream</div>
          <div style={d.logLine}><span style={{ color: '#64748b' }}>14:31:02</span> <span style={{ color: '#22c55e' }}>commit</span> ledger@main · "fix: clamp pagination cursor on empty result"</div>
          <div style={d.logLine}><span style={{ color: '#64748b' }}>14:18:44</span> <span style={{ color: '#3b82f6' }}>deploy</span> atlas → production · build #1842 · 47s</div>
          <div style={d.logLine}><span style={{ color: '#64748b' }}>13:52:10</span> <span style={{ color: '#a855f7' }}>publish</span> writing/on-api-design-as-writing.md</div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// 4. SPATIAL CANVAS
// ============================================================
const spatialStyles = {
  wrap: { width: '100%', height: '100%', background: '#fafaf7', position: 'relative', overflow: 'hidden', fontFamily: '"Inter", ui-sans-serif, system-ui, sans-serif' },
  grid: { position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, #00000018 1px, transparent 1px)', backgroundSize: '24px 24px' },
  topbar: { position: 'absolute', top: 16, left: 16, right: 16, display: 'flex', alignItems: 'center', gap: 10, zIndex: 5 },
  pill: { background: '#fff', border: '1px solid #e5e5e0', borderRadius: 999, padding: '8px 14px', fontSize: 13, fontWeight: 500, color: '#1a1715', boxShadow: '0 1px 2px #0000000a' },
  zoom: { marginLeft: 'auto', background: '#fff', border: '1px solid #e5e5e0', borderRadius: 6, padding: '4px', display: 'flex', alignItems: 'center', gap: 2, fontSize: 12, boxShadow: '0 1px 2px #0000000a' },
  zoomBtn: { width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 4, cursor: 'pointer', color: '#5a5048' },
  card: (x, y, w, h, c) => ({ position: 'absolute', left: x, top: y, width: w, height: h, background: c || '#fff', border: '1px solid #d4d0c8', borderRadius: 8, padding: 14, boxShadow: '0 2px 8px #00000010', display: 'flex', flexDirection: 'column' }),
  cardTag: { fontSize: 10, letterSpacing: 1.2, textTransform: 'uppercase', color: '#7a6a5a', marginBottom: 6 },
  cardTitle: { fontSize: 16, fontWeight: 600, color: '#1a1715', marginBottom: 4 },
  cardDek: { fontSize: 11, color: '#5a5048', lineHeight: 1.4 },
  stack: { display: 'flex', gap: 4, marginTop: 'auto' },
  chip: { fontSize: 9, padding: '2px 6px', background: '#f0ede5', borderRadius: 3, color: '#5a5048', fontFamily: 'ui-monospace, monospace' },
  bubble: (x, y, label) => ({ position: 'absolute', left: x, top: y, fontSize: 10, color: '#7a6a5a', letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 500 }),
  minimap: { position: 'absolute', bottom: 16, right: 16, width: 140, height: 90, background: '#fff', border: '1px solid #e5e5e0', borderRadius: 4, boxShadow: '0 2px 8px #00000010', overflow: 'hidden' },
};

function SpatialMock() {
  const s = spatialStyles;
  return (
    <div style={s.wrap}>
      <div style={s.grid}></div>
      {/* Connection lines */}
      <svg style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} viewBox="0 0 1280 800" preserveAspectRatio="none">
        <path d="M 280 230 Q 380 260 460 290" stroke="#c8c2b6" strokeWidth="1.5" fill="none" strokeDasharray="3 4" />
        <path d="M 600 320 Q 700 380 800 420" stroke="#c8c2b6" strokeWidth="1.5" fill="none" strokeDasharray="3 4" />
        <path d="M 280 470 Q 400 460 460 430" stroke="#c8c2b6" strokeWidth="1.5" fill="none" strokeDasharray="3 4" />
        <path d="M 920 280 Q 980 340 920 420" stroke="#c8c2b6" strokeWidth="1.5" fill="none" strokeDasharray="3 4" />
        <path d="M 600 540 Q 720 580 820 580" stroke="#c8c2b6" strokeWidth="1.5" fill="none" strokeDasharray="3 4" />
      </svg>

      <div style={s.topbar}>
        <div style={s.pill}>◇ Alex Chen</div>
        <div style={{ ...s.pill, color: '#7a6a5a', fontWeight: 400 }}>Map of work · 2014–2026</div>
        <div style={s.zoom}>
          <div style={s.zoomBtn}>−</div>
          <div style={{ padding: '0 8px', fontFamily: 'ui-monospace, monospace', fontSize: 11 }}>62%</div>
          <div style={s.zoomBtn}>+</div>
          <div style={{ ...s.zoomBtn, marginLeft: 4 }}>⊡</div>
        </div>
      </div>

      <div style={s.bubble(110, 130, '')}>
        <div style={{ fontSize: 10, color: '#7a6a5a', letterSpacing: 1.5, textTransform: 'uppercase' }}>Cluster · Infrastructure</div>
      </div>

      <div style={s.card(110, 160, 200, 90, '#fff')}>
        <div style={s.cardTag}>2024 · Ledger</div>
        <div style={s.cardTitle}>Query Planner</div>
        <div style={s.stack}><span style={s.chip}>rust</span><span style={s.chip}>pg</span></div>
      </div>
      <div style={s.card(330, 200, 180, 110, '#fff')}>
        <div style={s.cardTag}>2023 · Atlas</div>
        <div style={s.cardTitle}>Search Index</div>
        <div style={s.cardDek}>500M docs, 12ms p99.</div>
        <div style={s.stack}><span style={s.chip}>rust</span><span style={s.chip}>rocksdb</span></div>
      </div>
      <div style={s.card(110, 380, 200, 120, '#fff')}>
        <div style={s.cardTag}>2022 · Quill</div>
        <div style={s.cardTitle}>Markdown CMS</div>
        <div style={s.cardDek}>Open source · 3.2k stars.</div>
        <div style={s.stack}><span style={s.chip}>go</span><span style={s.chip}>sqlite</span></div>
      </div>

      <div style={s.bubble(540, 240, '')}>
        <div style={{ fontSize: 10, color: '#7a6a5a', letterSpacing: 1.5, textTransform: 'uppercase' }}>Cluster · Developer tools</div>
      </div>
      <div style={s.card(530, 270, 220, 100, '#1a3a3a')}>
        <div style={{ ...s.cardTag, color: '#a8c5c5' }}>2025 · Featured</div>
        <div style={{ ...s.cardTitle, color: '#fff' }}>Mira</div>
        <div style={{ ...s.cardDek, color: '#c8d8d8' }}>Local-first DB browser.</div>
        <div style={s.stack}><span style={{ ...s.chip, background: '#2a4a4a', color: '#c8d8d8' }}>ts</span><span style={{ ...s.chip, background: '#2a4a4a', color: '#c8d8d8' }}>tauri</span></div>
      </div>
      <div style={s.card(560, 510, 200, 90, '#fff')}>
        <div style={s.cardTag}>2021</div>
        <div style={s.cardTitle}>Sift CLI</div>
        <div style={s.stack}><span style={s.chip}>go</span></div>
      </div>

      <div style={s.bubble(830, 200, '')}>
        <div style={{ fontSize: 10, color: '#7a6a5a', letterSpacing: 1.5, textTransform: 'uppercase' }}>Cluster · Writing</div>
      </div>
      <div style={s.card(810, 230, 180, 90, '#fff')}>
        <div style={s.cardTag}>Essay · 14</div>
        <div style={s.cardTitle}>API as writing</div>
      </div>
      <div style={s.card(840, 380, 200, 100, '#fff')}>
        <div style={s.cardTag}>Essay · 11</div>
        <div style={s.cardTitle}>The shape of bugs</div>
        <div style={s.cardDek}>On debugging as cartography.</div>
      </div>
      <div style={s.card(800, 540, 200, 90, '#fff')}>
        <div style={s.cardTag}>Talk · Strange Loop</div>
        <div style={s.cardTitle}>Querying graphs</div>
      </div>

      <div style={s.minimap}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, #00000010 1px, transparent 1px)', backgroundSize: '6px 6px' }}></div>
        <div style={{ position: 'absolute', left: 12, top: 18, width: 28, height: 14, background: '#c8c2b6', borderRadius: 2 }}></div>
        <div style={{ position: 'absolute', left: 48, top: 24, width: 22, height: 12, background: '#1a3a3a', borderRadius: 2 }}></div>
        <div style={{ position: 'absolute', left: 12, top: 42, width: 28, height: 16, background: '#c8c2b6', borderRadius: 2 }}></div>
        <div style={{ position: 'absolute', left: 84, top: 22, width: 24, height: 12, background: '#c8c2b6', borderRadius: 2 }}></div>
        <div style={{ position: 'absolute', left: 84, top: 46, width: 28, height: 14, background: '#c8c2b6', borderRadius: 2 }}></div>
        <div style={{ position: 'absolute', left: 20, top: 26, width: 70, height: 38, border: '1.5px solid #c96442', borderRadius: 2, background: '#c9644215' }}></div>
      </div>
    </div>
  );
}

// ============================================================
// 5. NOTEBOOK / JOURNAL
// ============================================================
const noteStyles = {
  wrap: { width: '100%', height: '100%', background: '#f4ede0', position: 'relative', overflow: 'hidden', fontFamily: '"Caveat", "Bradley Hand", cursive', color: '#2a2418' },
  paper: { position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(#c8b89a40 1px, transparent 1px), linear-gradient(90deg, #c8b89a40 1px, transparent 1px)', backgroundSize: '22px 22px' },
  redline: { position: 'absolute', left: 80, top: 0, bottom: 0, width: 1, background: '#d4564a60' },
  edge: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 18, background: 'linear-gradient(90deg, #00000010, transparent)' },
  header: { position: 'absolute', top: 30, left: 110, right: 60 },
  date: { fontFamily: '"JetBrains Mono", ui-monospace, monospace', fontSize: 11, color: '#7a6a5a', letterSpacing: 2, textTransform: 'uppercase' },
  title: { fontFamily: '"Caveat", cursive', fontSize: 56, lineHeight: 1, marginTop: 6, fontWeight: 700, color: '#1a1408' },
  underline: { width: 280, height: 6, background: 'no-repeat center/contain', marginTop: 4 },
  body: { position: 'absolute', top: 150, left: 110, right: 60, bottom: 30, display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 28 },
  prose: { fontFamily: '"Caveat", cursive', fontSize: 24, lineHeight: 1.25, color: '#2a2418' },
  marginTag: { position: 'absolute', fontFamily: '"Caveat", cursive', fontSize: 18, color: '#7a3a2a', transform: 'rotate(-4deg)' },
  postit: (c, rot, x, y) => ({ position: 'absolute', left: x, top: y, width: 180, padding: '14px 14px 16px', background: c, transform: `rotate(${rot}deg)`, boxShadow: '0 3px 8px #00000018', fontFamily: '"Caveat", cursive', fontSize: 19, lineHeight: 1.2, color: '#2a2418' }),
  sketchBox: { border: '2px solid #2a2418', borderRadius: 4, padding: 12, background: '#fffdf6cc', fontFamily: '"Caveat", cursive', fontSize: 18, position: 'relative' },
  arrow: { position: 'absolute', fontFamily: '"Caveat", cursive', fontSize: 22, color: '#7a3a2a' },
  list: { fontFamily: '"Caveat", cursive', fontSize: 22, lineHeight: 1.4, color: '#2a2418' },
  tab: { position: 'absolute', right: -8, padding: '6px 14px 6px 10px', background: '#d4a868', color: '#2a2418', fontFamily: '"Caveat", cursive', fontSize: 18, transform: 'rotate(2deg)', boxShadow: '1px 2px 4px #00000020' },
};

function NotebookMock() {
  const n = noteStyles;
  return (
    <div style={n.wrap}>
      <div style={n.paper}></div>
      <div style={n.redline}></div>
      <div style={n.edge}></div>

      {/* Page tabs on the right */}
      <div style={{ ...n.tab, top: 90 }}>About</div>
      <div style={{ ...n.tab, top: 130, background: '#7ea66e' }}>Projects</div>
      <div style={{ ...n.tab, top: 170, background: '#c98e8a' }}>Writing</div>
      <div style={{ ...n.tab, top: 210, background: '#a89cc8' }}>Contact</div>

      <div style={n.header}>
        <div style={n.date}>Entry 142 · May 25, 2026</div>
        <div style={n.title}>Alex Chen — engineer's notebook</div>
        <svg width="280" height="8" style={{ marginTop: 4 }}><path d="M2 4 Q 60 1, 120 5 T 240 4 T 278 3" stroke="#1a1408" strokeWidth="2" fill="none" /></svg>
      </div>

      <div style={n.body}>
        <div style={{ position: 'relative' }}>
          <div style={n.prose}>
            Twelve years in. Still mostly write Rust and TypeScript, still mostly build tools for data teams. Below: four projects I'm proud of and some things I learned along the way.
          </div>

          <div style={{ ...n.sketchBox, marginTop: 24 }}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: '#7a6a5a', letterSpacing: 1.5 }}>FIG. 1 — LEDGER ARCHITECTURE</div>
            <svg width="100%" height="120" style={{ marginTop: 6 }}>
              <rect x="10" y="20" width="80" height="36" rx="4" fill="none" stroke="#2a2418" strokeWidth="1.5" />
              <text x="50" y="42" textAnchor="middle" fontFamily="Caveat" fontSize="16" fill="#2a2418">client</text>
              <path d="M 90 38 L 150 38" stroke="#2a2418" strokeWidth="1.5" fill="none" markerEnd="url(#arr)" />
              <rect x="150" y="20" width="80" height="36" rx="4" fill="none" stroke="#2a2418" strokeWidth="1.5" />
              <text x="190" y="42" textAnchor="middle" fontFamily="Caveat" fontSize="16" fill="#2a2418">planner</text>
              <path d="M 230 38 L 290 38" stroke="#2a2418" strokeWidth="1.5" fill="none" markerEnd="url(#arr)" />
              <rect x="290" y="20" width="80" height="36" rx="4" fill="none" stroke="#2a2418" strokeWidth="1.5" />
              <text x="330" y="42" textAnchor="middle" fontFamily="Caveat" fontSize="16" fill="#2a2418">storage</text>
              <path d="M 190 70 Q 190 95, 250 95" stroke="#7a3a2a" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
              <text x="260" y="100" fontFamily="Caveat" fontSize="14" fill="#7a3a2a">← caching layer (new!)</text>
              <defs>
                <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                  <path d="M0,0 L6,4 L0,8" fill="#2a2418" />
                </marker>
              </defs>
            </svg>
          </div>

          <div style={{ ...n.marginTag, right: -20, top: 10 }}>← start here!</div>
        </div>

        <div style={{ position: 'relative' }}>
          <div style={n.postit('#fef4a8', -3, 0, 0)}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: '#7a6a5a', marginBottom: 4 }}>LEDGER · 2024</div>
            Query planner for a 12B-row warehouse. Cut p99 by 6×.
          </div>
          <div style={n.postit('#c4e0c4', 4, 30, 130)}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: '#5a6a5a', marginBottom: 4 }}>ATLAS · 2023</div>
            Search across 500M docs. Built in one winter.
          </div>
          <div style={n.postit('#f4c8b8', -5, 0, 260)}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: '#7a5a4a', marginBottom: 4 }}>QUILL · OSS</div>
            Markdown CMS · 3.2k ⭐
          </div>

          <div style={{ position: 'absolute', right: -6, top: 380, transform: 'rotate(3deg)', fontSize: 22, color: '#2a2418', maxWidth: 200 }}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: '#7a6a5a', letterSpacing: 1.5, marginBottom: 6, transform: 'rotate(-3deg)' }}>WHAT I LEARNED</div>
            <div>✓ types are documentation</div>
            <div>✓ delete more than you write</div>
            <div>✓ ship before it's done</div>
            <div style={{ color: '#7a3a2a' }}>✗ premature abstraction</div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.TerminalMock = TerminalMock;
window.EditorialMock = EditorialMock;
window.DashMock = DashMock;
window.SpatialMock = SpatialMock;
window.NotebookMock = NotebookMock;
