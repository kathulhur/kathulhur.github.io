// Editorial section — minimalist & quiet body of the portfolio.
// Two type families only (serif + sans). Hierarchy uses size, weight,
// color, and letter-spacing instead of additional fonts.

function EditorialBody({ palette, typePair }) {
  const ed = makeEditorialStyles(palette, typePair);
  return (
    <main style={ed.main} data-screen-label="Editorial">
      <EditorialHeader ed={ed} />
      <SelectedWork ed={ed} />
      <Writing ed={ed} />
      <CV ed={ed} />
      <Contact ed={ed} />
      <Footer ed={ed} />
    </main>
  );
}

function makeEditorialStyles(p, tp) {
  return {
    main: {
      background: p.bg, color: p.ink,
      fontFamily: tp.sans, position: 'relative', zIndex: 1,
    },
    container: { maxWidth: 1080, margin: '0 auto', padding: '0 56px' },
    sectionH: {
      fontFamily: tp.serif, fontSize: 56, lineHeight: 1,
      letterSpacing: -1.5, fontWeight: 500, margin: '12px 0 0',
    },
    sectionHEm: { fontStyle: 'italic', fontWeight: 500 },
    sectionRule: { height: 1, background: p.rule, margin: '80px 56px 0', maxWidth: 968 },
    sectionInner: { paddingTop: 88 },
    prose: {
      fontFamily: tp.sans, fontSize: 17, lineHeight: 1.65,
      color: p.body, maxWidth: '60ch', fontWeight: 400,
    },
    serif: tp.serif, sans: tp.sans, ...p,
  };
}

// Label — small uppercase sans, letter-spaced. Replaces mono usage.
const Label = ({ ed, children, style }) => (
  <span style={{
    fontFamily: ed.sans, fontSize: 11, letterSpacing: 2.2,
    textTransform: 'uppercase', color: ed.muted, fontWeight: 500,
    ...style,
  }}>{children}</span>
);

// ── Header ──────────────────────────────────────────────────────────────────
function EditorialHeader({ ed }) {
  return (
    <header style={{ ...ed.container, padding: '40px 56px 0', display: 'flex', alignItems: 'baseline', gap: 24 }}>
      <div style={{ fontFamily: ed.serif, fontStyle: 'italic', fontSize: 22, color: ed.ink, fontWeight: 500 }}>
        Joseph Karl Crisostomo
      </div>
      <Label ed={ed}>Software Developer · est. 2026</Label>
      <nav style={{ marginLeft: 'auto', display: 'flex', gap: 28 }}>
        {['Work', 'Writing', 'CV', 'Contact'].map(l => (          <a key={l} href={`#${l.toLowerCase()}`} style={{ color: ed.muted, textDecoration: 'none', fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase', fontWeight: 500 }}>{l}</a>
        ))}
      </nav>
    </header>
  );
}

// ── Section header (kicker + title + intro) ────────────────────────────────
function SectionHead({ ed, kicker, title, intro }) {
  return (
    <div style={ed.container}>
      <Label ed={ed}>{kicker}</Label>
      <h2 style={{ ...ed.sectionH, marginTop: 14 }}>{title}</h2>
      {intro && <div style={{ ...ed.prose, marginTop: 22 }}>{intro}</div>}
    </div>
  );
}

// ── Horizontal scroller (shared) ───────────────────────────────────────────
// Cards align with the centered 1080 container's left edge but the track
// scrolls all the way to the right viewport edge — gives a clear "more →"
// affordance. Uses scroll-snap and a small counter that follows scroll.
function HScroller({ ed, items, renderCard, cardWidth = 320, gap = 24 }) {
  const trackRef = React.useRef(null);
  const [progress, setProgress] = React.useState(0);
  const [idx, setIdx] = React.useState(1);

  React.useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      const p = max > 0 ? el.scrollLeft / max : 0;
      setProgress(p);
      const step = cardWidth + gap;
      setIdx(Math.min(items.length, Math.max(1, Math.round(el.scrollLeft / step) + 1)));
    };
    onScroll();
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [items.length, cardWidth, gap]);

  const scrollBy = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (cardWidth + gap), behavior: 'smooth' });
  };

  // Edge padding equals the container's left padding so cards align with
  // the section title above. Use max() so it never goes below 56px. Right
  // side gets extra trailing room so the last card has breathing space and
  // a short list (only a few cards) sits comfortably left-aligned.
  const edgePad = 'max(56px, calc(50vw - 484px))';
  const trailPad = 'max(120px, calc(50vw - 360px))';

  return (
    <div style={{ position: 'relative', marginTop: 48 }}>
      {/* Counter + arrows row, aligned with container */}
      <div style={{ ...ed.container, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 18, marginBottom: 14 }}>
        <Label ed={ed} style={{ letterSpacing: 1.5 }}>
          <span style={{ color: ed.ink }}>{String(idx).padStart(2, '0')}</span>
          <span style={{ color: ed.muted }}> / {String(items.length).padStart(2, '0')}</span>
        </Label>
        <div style={{ display: 'flex', gap: 6 }}>
          <ArrowBtn ed={ed} dir="left"  onClick={() => scrollBy(-1)} disabled={progress < 0.01} />
          <ArrowBtn ed={ed} dir="right" onClick={() => scrollBy(1)}  disabled={progress > 0.99} />
        </div>
      </div>

      <div
        ref={trackRef}
        className="h-scroll"
        style={{
          display: 'flex', gap, overflowX: 'auto', scrollSnapType: 'x mandatory',
          paddingLeft: edgePad, paddingRight: trailPad, paddingBottom: 8,
          scrollBehavior: 'smooth',
        }}
      >
        {items.map((it, i) => (
          <div key={i} style={{ flex: `0 0 ${cardWidth}px`, scrollSnapAlign: 'start' }}>
            {renderCard(it, i)}
          </div>
        ))}
      </div>

      {/* Progress bar inside container */}
      <div style={{ ...ed.container, marginTop: 14 }}>
        <div style={{ height: 1, background: ed.rule, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${Math.max(8, progress * 100)}%`, background: ed.ink, transition: 'width .15s linear' }}></div>
        </div>
      </div>
    </div>
  );
}

function ArrowBtn({ ed, dir, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === 'left' ? 'Previous' : 'Next'}
      style={{
        width: 34, height: 34, borderRadius: '50%',
        border: `1px solid ${ed.rule}`, background: 'transparent',
        color: ed.ink, cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.3 : 1, fontSize: 15, lineHeight: 1,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background .15s, border-color .15s',
        fontFamily: ed.sans,
      }}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.background = ed.ink + '08'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
    >
      {dir === 'left' ? '←' : '→'}
    </button>
  );
}

// ── Selected Work ───────────────────────────────────────────────────────────
const PROJECTS = [
  { no: '01', year: '2025', title: 'Ledger',  subtitle: 'Personal finance, reimagined for couples.',  body: 'A two-person finance app that treats every transaction as a small conversation.', gradient: 'linear-gradient(135deg, #c9a878 0%, #8a6a4a 100%)', stack: ['typescript', 'postgres'] },
  { no: '02', year: '2024', title: 'Quill',   subtitle: 'A markdown CMS for writers who code.',       body: 'Open-source content system designed around git as the source of truth.',           gradient: 'linear-gradient(135deg, #4a5a4e 0%, #1c2a23 100%)', stack: ['go', 'sqlite'] },
  { no: '03', year: '2023', title: 'Atlas',   subtitle: 'Search across half a billion documents.',   body: 'A distributed full-text search engine. Sub-15ms p99 across 500M records.',         gradient: 'linear-gradient(135deg, #7a6a8a 0%, #3a2e4a 100%)', stack: ['rust', 'rocksdb'] },
  { no: '04', year: '2022', title: 'Mira',    subtitle: 'A local-first database browser.',           body: 'Desktop GUI for Postgres and SQLite that runs entirely on your laptop.',           gradient: 'linear-gradient(135deg, #b89e80 0%, #6a5238 100%)', stack: ['typescript', 'tauri'] },
  { no: '05', year: '2021', title: 'Sift',    subtitle: 'A command-line search for big logs.',       body: 'Streams gigabytes of log files through a tiny, fast regex engine.',                 gradient: 'linear-gradient(135deg, #5a7a8a 0%, #2a4a5a 100%)', stack: ['go'] },
  { no: '06', year: '2020', title: 'Notebook',subtitle: 'A private journaling app for the iPad.',    body: 'Apple Pencil-first; everything stored locally and encrypted.',                       gradient: 'linear-gradient(135deg, #a8a0c8 0%, #6a5a8a 100%)', stack: ['swift'] },
];

function SelectedWork({ ed }) {
  return (
    <section id="work" style={ed.sectionInner}>
      <SectionHead ed={ed} kicker="I · Selected Work" title="Work." intro="A short selection of recent projects. Drag or use the arrows to browse." />
      <HScroller
        ed={ed}
        items={PROJECTS}
        cardWidth={320}
        renderCard={(p) => <WorkCard ed={ed} project={p} />}
      />
      <div style={ed.sectionRule}></div>
    </section>
  );
}

function WorkCard({ ed, project }) {
  return (
    <a href="#" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
      <div style={{ aspectRatio: '4 / 5', background: project.gradient, borderRadius: 2, position: 'relative', overflow: 'hidden', marginBottom: 18 }}>
        <PlaceholderStripes />
        <div style={{ position: 'absolute', top: 14, left: 16, fontSize: 11, letterSpacing: 1.8, textTransform: 'uppercase', color: '#fff', opacity: 0.7, fontFamily: ed.sans }}>
          № {project.no}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
        <Label ed={ed} style={{ letterSpacing: 1.5 }}>{project.year}</Label>
        <span style={{ width: 4, height: 4, borderRadius: '50%', background: ed.muted, opacity: 0.5 }}></span>
        <Label ed={ed} style={{ letterSpacing: 1.5 }}>{project.stack.join(' · ')}</Label>
      </div>
      <h3 style={{ fontFamily: ed.serif, fontSize: 26, lineHeight: 1.1, letterSpacing: -0.5, margin: '0 0 4px', fontWeight: 500, color: ed.ink }}>{project.title}</h3>
      <div style={{ fontFamily: ed.serif, fontStyle: 'italic', fontSize: 16, lineHeight: 1.3, color: ed.body }}>{project.subtitle}</div>
    </a>
  );
}

function PlaceholderStripes() {
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.1 }} preserveAspectRatio="none">
      <defs>
        <pattern id="ph-stripes" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="14" stroke="#fff" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#ph-stripes)" />
    </svg>
  );
}

// ── Writing ─────────────────────────────────────────────────────────────────
const POSTS = [
  { date: 'Mar 2026', read: '8 min', title: 'On deleting code, and the small joy of it', dek: 'A meditation on the difference between subtraction and loss.' },
  { date: 'Jan 2026', read: '12 min', title: 'A type system is a kind of conversation', dek: 'Notes on TypeScript, and why I keep coming back.' },
  { date: 'Nov 2025', read: '6 min', title: 'What I look for when I review a pull request', dek: 'Not bugs. Mostly: clarity, blast radius, and what was removed.' },
  { date: 'Sep 2025', read: '15 min', title: 'Postgres for the rest of us', dek: 'A practical guide for people who have only used it as a key-value store.' },
  { date: 'Jun 2025', read: '4 min', title: 'Quiet tools', dek: 'Why the best software disappears.' },
  { date: 'Mar 2025', read: '9 min', title: 'On the second draft', dek: 'Most software is shipped at the first draft. Here is why that hurts.' },
];

function Writing({ ed }) {
  return (
    <section id="writing" style={ed.sectionInner}>
      <SectionHead ed={ed} kicker="II · Writing" title="Writing." intro="Occasional essays on software, mostly written to think things through." />
      <HScroller
        ed={ed}
        items={POSTS}
        cardWidth={340}
        renderCard={(p, i) => <WritingCard ed={ed} post={p} num={i + 1} />}
      />
      <div style={{ ...ed.container, marginTop: 28 }}>
        <a href="#" style={{ color: ed.ink, textDecoration: 'none', fontSize: 13, fontWeight: 500, borderBottom: `1px solid ${ed.accent}`, paddingBottom: 3 }}>View all writing →</a>
      </div>
      <div style={ed.sectionRule}></div>
    </section>
  );
}

function WritingCard({ ed, post, num }) {
  return (
    <a href="#" style={{
      display: 'flex', flexDirection: 'column', height: 280,
      padding: 24, border: `1px solid ${ed.rule}`, borderRadius: 2,
      textDecoration: 'none', color: 'inherit',
      transition: 'border-color .15s, background .15s',
      background: 'transparent', boxSizing: 'border-box',
    }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = ed.ink + '60'; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = ed.rule; }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 'auto' }}>
        <Label ed={ed} style={{ letterSpacing: 1.5 }}>№ {String(num).padStart(2, '0')} · {post.date}</Label>
        <Label ed={ed} style={{ letterSpacing: 1.5 }}>{post.read}</Label>
      </div>
      <h3 style={{ fontFamily: ed.serif, fontSize: 24, lineHeight: 1.15, letterSpacing: -0.4, margin: '24px 0 10px', fontWeight: 500, color: ed.ink }}>{post.title}</h3>
      <div style={{ fontFamily: ed.serif, fontStyle: 'italic', fontSize: 16, lineHeight: 1.4, color: ed.body }}>{post.dek}</div>
      <div style={{ marginTop: 18, fontSize: 12, color: ed.ink, fontWeight: 500 }}>Read →</div>
    </a>
  );
}

// ── Photography (removed) ──────────────────────────────────────────────────
// Section removed at user request.

// ── CV ──────────────────────────────────────────────────────────────────────
function CV({ ed }) {
  return (
    <section id="cv" style={ed.sectionInner}>
      <SectionHead ed={ed} kicker="III · Curriculum Vitae" title="Résumé." />
      <div style={{ ...ed.container, marginTop: 48, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56 }}>
        <div>
          <p style={ed.prose}>
            A condensed two-page document covering the last twelve years — roles, projects, languages, and a short list of references. Updated quarterly.
          </p>
          <a href="#" download style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginTop: 28, fontSize: 14, fontWeight: 500, color: ed.bg, background: ed.ink, padding: '14px 22px', borderRadius: 2, textDecoration: 'none' }}>
            <span style={{ fontSize: 14 }}>↓</span>
            <span>cv.pdf · 142 KB</span>
          </a>
          <div style={{ marginTop: 18 }}>
            <Label ed={ed}>Last updated: May 2026</Label>
          </div>
        </div>
        <div style={{ border: `1px solid ${ed.rule}`, borderRadius: 2, padding: 32 }}>
          <Label ed={ed} style={{ display: 'block', marginBottom: 18 }}>At a glance</Label>
          <CVRow ed={ed} k="Current" v="Senior developer · independent" />
          <CVRow ed={ed} k="Experience" v="12+ years building for the web" />
          <CVRow ed={ed} k="Languages" v="TypeScript, Go, Python, Rust" />
          <CVRow ed={ed} k="Based in" v="Manila · GMT+8" />
          <CVRow ed={ed} k="Available" v="Limited contracts, Q3 2026" last />
        </div>
      </div>
      <div style={ed.sectionRule}></div>
    </section>
  );
}

function CVRow({ ed, k, v, last }) {
  return (
    <div style={{ display: 'flex', padding: '14px 0', borderBottom: last ? 'none' : `1px solid ${ed.rule}`, fontSize: 14, alignItems: 'baseline', gap: 16 }}>
      <div style={{ width: 110, flexShrink: 0 }}>
        <Label ed={ed} style={{ letterSpacing: 1.8 }}>{k}</Label>
      </div>
      <div style={{ color: ed.ink, flex: 1, fontWeight: 400 }}>{v}</div>
    </div>
  );
}

// ── Contact ─────────────────────────────────────────────────────────────────
function Contact({ ed }) {
  const [state, setState] = React.useState({ name: '', email: '', message: '' });
  const [status, setStatus] = React.useState('idle');
  const [focus, setFocus] = React.useState(null);

  const submit = (e) => {
    e.preventDefault();
    if (!state.name || !state.email || !state.message) return;
    setStatus('sending');
    setTimeout(() => setStatus('sent'), 900);
  };

  const fieldWrap = (name) => ({
    position: 'relative',
    background: focus === name ? ed.bg : `${ed.ink}06`,
    border: `1px solid ${focus === name ? ed.ink + '80' : ed.ink + '15'}`,
    borderRadius: 4,
    transition: 'background .15s, border-color .15s',
  });
  const fieldStyle = {
    width: '100%', padding: '14px 16px', fontSize: 16, fontFamily: ed.sans,
    color: ed.ink, background: 'transparent', border: 'none',
    outline: 'none', borderRadius: 4, fontWeight: 400, boxSizing: 'border-box',
  };
  const labelStyle = {
    display: 'block', marginBottom: 8,
    fontFamily: ed.sans, fontSize: 11, letterSpacing: 1.8,
    textTransform: 'uppercase', color: ed.muted, fontWeight: 500,
  };

  return (
    <section id="contact" style={{ ...ed.sectionInner, paddingBottom: 120 }}>
      <SectionHead ed={ed} kicker="IV · Contact" title="Get in touch." intro="Best for project inquiries, consulting work, or a quiet message. I read everything; I reply to most." />

      <form onSubmit={submit} style={{ ...ed.container, marginTop: 48, maxWidth: 760 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px 24px' }}>
          <div>
            <label style={labelStyle}>Your name</label>
            <div style={fieldWrap('name')}>
              <input
                style={fieldStyle}
                value={state.name}
                onChange={e => setState({ ...state, name: e.target.value })}
                onFocus={() => setFocus('name')}
                onBlur={() => setFocus(null)}
                placeholder="e.g. Jamie Park"
                disabled={status !== 'idle'}
              />
            </div>
          </div>
          <div>
            <label style={labelStyle}>Email</label>
            <div style={fieldWrap('email')}>
              <input
                type="email"
                style={fieldStyle}
                value={state.email}
                onChange={e => setState({ ...state, email: e.target.value })}
                onFocus={() => setFocus('email')}
                onBlur={() => setFocus(null)}
                placeholder="you@example.com"
                disabled={status !== 'idle'}
              />
            </div>
          </div>
          <div style={{ gridColumn: 'span 2' }}>
            <label style={labelStyle}>Message</label>
            <div style={fieldWrap('message')}>
              <textarea
                style={{ ...fieldStyle, minHeight: 140, resize: 'vertical', lineHeight: 1.55 }}
                value={state.message}
                onChange={e => setState({ ...state, message: e.target.value })}
                onFocus={() => setFocus('message')}
                onBlur={() => setFocus(null)}
                placeholder="What's on your mind?"
                disabled={status !== 'idle'}
              />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 28, flexWrap: 'wrap', gap: 16 }}>
          <div style={{ fontSize: 13, color: ed.muted }}>
            {status === 'idle' && <>Or write to <span style={{ color: ed.ink, fontWeight: 500 }}>hello@josephkc.dev</span></>}
            {status === 'sending' && 'Sending…'}
            {status === 'sent' && <span style={{ color: ed.accent, fontWeight: 500 }}>✓ Sent. Talk soon.</span>}
          </div>
          <button type="submit" disabled={status !== 'idle'} style={{
            fontSize: 14, fontWeight: 500, color: ed.bg, background: ed.ink,
            padding: '14px 28px', borderRadius: 2, border: 'none',
            cursor: status === 'idle' ? 'pointer' : 'default',
            opacity: status === 'idle' ? 1 : 0.5, fontFamily: ed.sans,
          }}>
            Send message →
          </button>
        </div>
      </form>
    </section>
  );
}

// ── Footer ──────────────────────────────────────────────────────────────────
function Footer({ ed }) {
  return (
    <footer style={{ borderTop: `1px solid ${ed.rule}`, padding: '36px 56px', maxWidth: 1080, margin: '0 auto', display: 'flex', alignItems: 'baseline', gap: 24, fontSize: 12, color: ed.muted }}>
      <span>© 2026 Joseph Karl Crisostomo</span>
      <span style={{ marginLeft: 'auto', display: 'flex', gap: 22 }}>
        {['GitHub', 'Read.cv', 'RSS', 'hello@josephkc.dev'].map(l => (
          <a key={l} href="#" style={{ color: 'inherit', textDecoration: 'none' }}>{l}</a>
        ))}
      </span>
    </footer>
  );
}

window.EditorialBody = EditorialBody;
