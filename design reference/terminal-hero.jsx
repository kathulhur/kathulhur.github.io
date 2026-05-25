// Terminal hero — full-viewport dark terminal that auto-types an intro
// sequence on load, then idles with a blinking cursor. Scroll-fades into the
// editorial section below via a CSS custom property the parent sets.

const TERM_STEPS = (cmd) => [
  // [type, content]
  // type: 'cmd' user typing (animated), 'out' instant output, 'pause' delay
  { type: 'cmd', text: cmd || 'whoami' },
  { type: 'out', text: 'joseph.karl.crisostomo · software developer' },
  { type: 'pause', ms: 500 },
  { type: 'cmd', text: 'cat about.md' },
  { type: 'out', html: (
    <>
      <div style={{ color: '#d2a8ff', marginTop: 4 }}># About</div>
      <div style={{ color: '#c9d1d9' }}>I build small, careful software.</div>
      <div style={{ color: '#c9d1d9' }}>Mostly web tools — backend in Go and Python,</div>
      <div style={{ color: '#c9d1d9' }}>frontend in TypeScript and React.</div>
      <div style={{ color: '#c9d1d9' }}>&nbsp;</div>
      <div style={{ color: '#c9d1d9' }}>I prefer fewer features, done well, over many done poorly.</div>
    </>
  ) },
  { type: 'pause', ms: 600 },
  { type: 'cmd', text: 'ls ~/' },
  { type: 'out', html: (
    <div style={{ color: '#79c0ff' }}>
      <span style={{ marginRight: 22 }}>projects/</span>
      <span style={{ marginRight: 22 }}>writing/</span>
      <span style={{ marginRight: 22 }}>photos/</span>
      <span style={{ color: '#c9d1d9', marginRight: 22 }}>cv.pdf</span>
      <span style={{ color: '#c9d1d9' }}>contact.ts</span>
    </div>
  ) },
  { type: 'pause', ms: 400 },
  { type: 'cmd', text: 'scroll ↓' },
  { type: 'out', html: <span style={{ color: '#8b949e', fontStyle: 'italic' }}>(scroll to read on)</span> },
];

function useTyped(steps, enabled) {
  const [output, setOutput] = React.useState([]);
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    if (!enabled) return;
    setOutput([]);
    setDone(false);
    let cancelled = false;
    let acc = [];

    async function run() {
      for (let i = 0; i < steps.length; i++) {
        if (cancelled) return;
        const step = steps[i];
        if (step.type === 'pause') {
          await sleep(step.ms);
        } else if (step.type === 'cmd') {
          // Type character by character
          for (let j = 0; j <= step.text.length; j++) {
            if (cancelled) return;
            const partial = step.text.slice(0, j);
            const next = [...acc, { type: 'cmd', text: partial, typing: j < step.text.length }];
            setOutput(next);
            await sleep(38 + Math.random() * 50);
          }
          acc = [...acc, { type: 'cmd', text: step.text, typing: false }];
          setOutput(acc);
          await sleep(300);
        } else if (step.type === 'out') {
          acc = [...acc, step];
          setOutput([...acc]);
          await sleep(120);
        }
      }
      if (!cancelled) setDone(true);
    }
    run();
    return () => { cancelled = true; };
  }, [enabled, steps]);

  return [output, done];
}

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

function TerminalHero({ command }) {
  const [hasMounted, setHasMounted] = React.useState(false);
  React.useEffect(() => { setHasMounted(true); }, []);

  const steps = React.useMemo(() => TERM_STEPS(command), [command]);
  const [out, done] = useTyped(steps, hasMounted);

  const t = {
    section: {
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      background: '#0d1117',
      color: '#c9d1d9',
      fontFamily: '"JetBrains Mono", "SF Mono", ui-monospace, monospace',
      fontSize: 15,
      lineHeight: 1.65,
      display: 'flex',
      flexDirection: 'column',
      opacity: 'var(--term-opacity, 1)',
      transition: 'opacity .2s linear',
      zIndex: 0,
    },
    titlebar: {
      height: 38, background: '#161b22', borderBottom: '1px solid #21262d',
      display: 'flex', alignItems: 'center', padding: '0 16px', gap: 8,
      fontSize: 12, color: '#8b949e', flex: '0 0 auto',
    },
    dot: (c) => ({ width: 12, height: 12, borderRadius: '50%', background: c }),
    body: { flex: 1, padding: '48px 56px 80px', maxWidth: 980, width: '100%', boxSizing: 'border-box', margin: '0 auto' },
    prompt: { color: '#7ee787' },
    user: { color: '#79c0ff' },
    line: { whiteSpace: 'pre-wrap', wordBreak: 'break-word' },
    cursor: { display: 'inline-block', width: 9, height: 18, background: '#c9d1d9', verticalAlign: 'text-bottom', marginLeft: 2, animation: 'term-blink 1s steps(2) infinite' },
    hint: { position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', fontSize: 11, color: '#6e7681', letterSpacing: 2, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 8 },
    chevron: { animation: 'term-bounce 1.6s ease-in-out infinite', display: 'inline-block' },
  };

  return (
    <section style={t.section}>
      <style>{`
        @keyframes term-blink { 0%,49%{opacity:1} 50%,100%{opacity:0} }
        @keyframes term-bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(4px)} }
      `}</style>
      <div style={t.titlebar}>
        <div style={t.dot('#ff5f57')}></div>
        <div style={t.dot('#febc2e')}></div>
        <div style={t.dot('#28c840')}></div>
        <div style={{ flex: 1, textAlign: 'center', fontSize: 12 }}>joseph@portfolio — zsh — 92×30</div>
        <div style={{ fontSize: 11, color: '#6e7681' }}>~/</div>
      </div>
      <div style={t.body}>
        {out.map((entry, i) => {
          if (entry.type === 'cmd') {
            return (
              <div key={i} style={t.line}>
                <span style={t.prompt}>joseph@portfolio</span>
                <span style={{ color: '#8b949e' }}> ~ </span>
                <span style={{ color: '#ff7b72' }}>❯</span>{' '}
                <span style={{ color: '#fff' }}>{entry.text}</span>
                {entry.typing && <span style={t.cursor}></span>}
              </div>
            );
          }
          return <div key={i} style={t.line}>{entry.html || entry.text}</div>;
        })}
        {done && (
          <div style={t.line}>
            <span style={t.prompt}>joseph@portfolio</span>
            <span style={{ color: '#8b949e' }}> ~ </span>
            <span style={{ color: '#ff7b72' }}>❯</span>{' '}
            <span style={t.cursor}></span>
          </div>
        )}
      </div>
      <div style={t.hint}>
        <span>scroll</span>
        <span style={t.chevron}>▾</span>
      </div>
    </section>
  );
}

window.TerminalHero = TerminalHero;
