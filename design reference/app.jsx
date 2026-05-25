// Composition: terminal hero + editorial body, with Tweaks panel + scroll-fade.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "cream",
  "typePair": "garamond",
  "command": "whoami",
  "heroOn": true
}/*EDITMODE-END*/;

const PALETTES = {
  cream:  { bg: '#f5f1ea', ink: '#1a1715', body: '#3a3530', muted: '#7a6a5a', rule: '#1a171520', accent: '#c9a878' },
  mono:   { bg: '#fafafa', ink: '#0a0a0a', body: '#404040', muted: '#737373', rule: '#0a0a0a20', accent: '#0a0a0a' },
  warm:   { bg: '#fdf6f0', ink: '#2a1810', body: '#5a3a28', muted: '#8a6a52', rule: '#2a181020', accent: '#d97757' },
  forest: { bg: '#f4f1ec', ink: '#1c2a23', body: '#3a4a3e', muted: '#6a7a6e', rule: '#1c2a2320', accent: '#3a5a44' },
};

const TYPE_PAIRS = {
  garamond: { serif: '"EB Garamond", "Iowan Old Style", Georgia, serif', sans: '"Inter", system-ui, sans-serif', label: 'Garamond × Inter' },
  fraunces: { serif: '"Fraunces", "Iowan Old Style", Georgia, serif', sans: '"IBM Plex Sans", system-ui, sans-serif', label: 'Fraunces × Plex' },
};

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const palette = PALETTES[t.palette] || PALETTES.cream;
  const typePair = TYPE_PAIRS[t.typePair] || TYPE_PAIRS.garamond;

  // Scroll-driven terminal fade. When the terminal hero is visible, we
  // expose its inverse-progress as --term-opacity so the terminal section
  // fades from 1 → ~0.15 as the user scrolls into the editorial.
  React.useEffect(() => {
    if (!t.heroOn) return;
    const onScroll = () => {
      const h = window.innerHeight;
      const p = Math.min(1, Math.max(0, window.scrollY / (h * 0.9)));
      const op = 1 - p * 0.92; // 1 → 0.08
      document.documentElement.style.setProperty('--term-opacity', op.toFixed(3));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [t.heroOn]);

  return (
    <div style={{ background: palette.bg, minHeight: '100vh' }}>
      {t.heroOn && <TerminalHero command={t.command} />}
      <EditorialBody palette={palette} typePair={typePair} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Editorial palette" />
        <TweakColor
          label="Palette"
          value={[palette.bg, palette.ink, palette.accent]}
          options={[
            [PALETTES.cream.bg,  PALETTES.cream.ink,  PALETTES.cream.accent],
            [PALETTES.mono.bg,   PALETTES.mono.ink,   PALETTES.mono.accent],
            [PALETTES.warm.bg,   PALETTES.warm.ink,   PALETTES.warm.accent],
            [PALETTES.forest.bg, PALETTES.forest.ink, PALETTES.forest.accent],
          ]}
          onChange={(v) => {
            const name = (v[0] === PALETTES.mono.bg) ? 'mono'
                       : (v[0] === PALETTES.warm.bg) ? 'warm'
                       : (v[0] === PALETTES.forest.bg) ? 'forest'
                       : 'cream';
            setTweak('palette', name);
          }}
        />

        <TweakSection label="Typography" />
        <TweakRadio
          label="Type pair"
          value={t.typePair}
          options={['garamond', 'fraunces']}
          onChange={(v) => setTweak('typePair', v)}
        />

        <TweakSection label="Terminal hero" />
        <TweakToggle
          label="Show hero"
          value={t.heroOn}
          onChange={(v) => {
            setTweak('heroOn', v);
            if (!v) document.documentElement.style.setProperty('--term-opacity', '1');
          }}
        />
        <TweakSelect
          label="Startup command"
          value={t.command}
          options={['whoami', 'cat about.md', 'neofetch', 'echo hello']}
          onChange={(v) => setTweak('command', v)}
        />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
