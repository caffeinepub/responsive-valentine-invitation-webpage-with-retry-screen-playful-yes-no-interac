import { useEffect, useRef, useState } from "react";

type Slide = 1 | 2 | 3;

// ─── Sparkle data ────────────────────────────────────────────────────────────
const SPARKLES = [
  { id: "s1", top: "8%", left: "5%", delay: "0s", size: 20, type: "twinkle" },
  {
    id: "s2",
    top: "15%",
    left: "90%",
    delay: "1.2s",
    size: 12,
    type: "rotate-sparkle",
  },
  {
    id: "s3",
    top: "30%",
    left: "3%",
    delay: "2.4s",
    size: 16,
    type: "pulse-glow",
  },
  {
    id: "s4",
    top: "50%",
    left: "95%",
    delay: "0.8s",
    size: 20,
    type: "twinkle",
  },
  {
    id: "s5",
    top: "70%",
    left: "8%",
    delay: "1.8s",
    size: 10,
    type: "rotate-sparkle",
  },
  {
    id: "s6",
    top: "85%",
    left: "92%",
    delay: "3s",
    size: 18,
    type: "pulse-glow",
  },
  {
    id: "s7",
    top: "90%",
    left: "20%",
    delay: "0.4s",
    size: 14,
    type: "twinkle",
  },
  {
    id: "s8",
    top: "20%",
    left: "50%",
    delay: "2s",
    size: 8,
    type: "rotate-sparkle",
  },
  {
    id: "s9",
    top: "60%",
    left: "48%",
    delay: "1.4s",
    size: 12,
    type: "pulse-glow",
  },
  {
    id: "s10",
    top: "40%",
    left: "78%",
    delay: "0.6s",
    size: 16,
    type: "twinkle",
  },
  {
    id: "s11",
    top: "75%",
    left: "60%",
    delay: "2.8s",
    size: 8,
    type: "rotate-sparkle",
  },
  {
    id: "s12",
    top: "5%",
    left: "40%",
    delay: "1.6s",
    size: 20,
    type: "pulse-glow",
  },
  {
    id: "s13",
    top: "95%",
    left: "55%",
    delay: "0.2s",
    size: 10,
    type: "twinkle",
  },
  {
    id: "s14",
    top: "35%",
    left: "25%",
    delay: "3.2s",
    size: 14,
    type: "rotate-sparkle",
  },
  {
    id: "s15",
    top: "55%",
    left: "15%",
    delay: "2.2s",
    size: 8,
    type: "pulse-glow",
  },
  {
    id: "s16",
    top: "12%",
    left: "70%",
    delay: "1s",
    size: 18,
    type: "twinkle",
  },
  {
    id: "s17",
    top: "80%",
    left: "35%",
    delay: "2.6s",
    size: 12,
    type: "rotate-sparkle",
  },
  {
    id: "s18",
    top: "48%",
    left: "88%",
    delay: "0.9s",
    size: 16,
    type: "pulse-glow",
  },
  {
    id: "s19",
    top: "25%",
    left: "62%",
    delay: "1.7s",
    size: 10,
    type: "twinkle",
  },
  {
    id: "s20",
    top: "65%",
    left: "30%",
    delay: "3.5s",
    size: 14,
    type: "rotate-sparkle",
  },
];

// ─── Stars for starfield ─────────────────────────────────────────────────────
const STARS = Array.from({ length: 50 }, (_, i) => ({
  id: `star${i}`,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: 1 + Math.random() * 2.5,
  opacity: 0.2 + Math.random() * 0.6,
  duration: `${6 + Math.random() * 14}s`,
  delay: `${Math.random() * 10}s`,
  driftX: (Math.random() - 0.5) * 30,
  driftY: (Math.random() - 0.5) * 30,
}));

const FLOWERS = [
  {
    id: "f1",
    pos: "top-3 left-2",
    emoji: "🌸",
    size: "text-2xl",
    rotate: "-rotate-12",
    delay: 0,
  },
  {
    id: "f2",
    pos: "top-3 left-10",
    emoji: "🌷",
    size: "text-xl",
    rotate: "rotate-6",
    delay: 0.4,
  },
  {
    id: "f3",
    pos: "top-3 right-2",
    emoji: "🌸",
    size: "text-2xl",
    rotate: "rotate-12",
    delay: 0.8,
  },
  {
    id: "f4",
    pos: "top-3 right-10",
    emoji: "🌷",
    size: "text-xl",
    rotate: "-rotate-6",
    delay: 1.2,
  },
  {
    id: "f5",
    pos: "bottom-3 left-2",
    emoji: "🌷",
    size: "text-2xl",
    rotate: "rotate-12",
    delay: 1.6,
  },
  {
    id: "f6",
    pos: "bottom-3 left-10",
    emoji: "🌸",
    size: "text-xl",
    rotate: "-rotate-6",
    delay: 2.0,
  },
  {
    id: "f7",
    pos: "bottom-3 right-2",
    emoji: "🌸",
    size: "text-2xl",
    rotate: "-rotate-12",
    delay: 2.4,
  },
  {
    id: "f8",
    pos: "bottom-3 right-10",
    emoji: "🌷",
    size: "text-xl",
    rotate: "rotate-6",
    delay: 2.8,
  },
  {
    id: "f9",
    pos: "top-1/3 left-0",
    emoji: "🌸",
    size: "text-lg",
    rotate: "rotate-45",
    delay: 3.2,
  },
  {
    id: "f10",
    pos: "top-2/3 right-0",
    emoji: "🌷",
    size: "text-lg",
    rotate: "-rotate-45",
    delay: 3.6,
  },
];

const BALLOON_HEARTS = [
  { id: "b1", left: "5%", delay: "0s", duration: "8s", emoji: "❤️" },
  { id: "b2", left: "15%", delay: "1.5s", duration: "10s", emoji: "🎈" },
  { id: "b3", left: "28%", delay: "3s", duration: "9s", emoji: "💝" },
  { id: "b4", left: "42%", delay: "0.8s", duration: "11s", emoji: "🎀" },
  { id: "b5", left: "55%", delay: "2s", duration: "8.5s", emoji: "💗" },
  { id: "b6", left: "68%", delay: "4s", duration: "10s", emoji: "❤️" },
  { id: "b7", left: "78%", delay: "1s", duration: "9.5s", emoji: "🎈" },
  { id: "b8", left: "88%", delay: "3.5s", duration: "7.5s", emoji: "💝" },
  { id: "b9", left: "93%", delay: "0.3s", duration: "11.5s", emoji: "🎀" },
  { id: "b10", left: "35%", delay: "5s", duration: "8s", emoji: "💗" },
];

const MUSIC_NOTES = [
  { id: "m1", left: "12%", delay: "0s", duration: "12s", emoji: "🎵" },
  { id: "m2", left: "38%", delay: "3s", duration: "14s", emoji: "🎶" },
  { id: "m3", left: "65%", delay: "6s", duration: "11s", emoji: "🎵" },
  { id: "m4", left: "85%", delay: "9s", duration: "13s", emoji: "🎶" },
];

const PETALS = Array.from({ length: 18 }, (_, i) => ({
  id: `p${i}`,
  left: `${(i * 5.5 + 3) % 100}%`,
  delay: `${(i * 0.7) % 7}s`,
  duration: `${6 + (i % 5)}s`,
  size: i % 3 === 0 ? "1.4rem" : "1rem",
  emoji: i % 4 === 0 ? "🌸" : i % 4 === 1 ? "💗" : i % 4 === 2 ? "🌷" : "💕",
}));

// ─── Heartbeat Loader ────────────────────────────────────────────────────────
function HeartbeatLoader({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2500);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="loader-screen">
      <div className="heartbeat-heart">❤️</div>
      <p className="loader-text">loading something special…</p>
    </div>
  );
}

// ─── Star Cursor Trail ──────────────────────────────────────────────────────
function StarTrail() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stars: HTMLSpanElement[] = [];
    let frame = 0;

    const spawnStar = (x: number, y: number) => {
      if (frame++ % 3 !== 0) return;
      const star = document.createElement("span");
      star.textContent = ["✦", "✧", "⋆", "★"][Math.floor(Math.random() * 4)];
      star.className = "star-trail-particle";
      star.style.left = `${x}px`;
      star.style.top = `${y}px`;
      star.style.fontSize = `${8 + Math.random() * 10}px`;
      document.body.appendChild(star);
      stars.push(star);
      setTimeout(() => {
        star.remove();
        const idx = stars.indexOf(star);
        if (idx > -1) stars.splice(idx, 1);
      }, 700);
    };

    const onMove = (e: MouseEvent) => spawnStar(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      for (let i = 0; i < e.touches.length; i++) {
        spawnStar(e.touches[i].clientX, e.touches[i].clientY);
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouch, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
      for (const s of stars) s.remove();
    };
  }, []);

  return <div ref={containerRef} />;
}

// ─── Starfield Background ────────────────────────────────────────────────────
function Starfield() {
  return (
    <div className="starfield-layer" aria-hidden="true">
      {STARS.map((s) => (
        <span
          key={s.id}
          className="star-dot"
          style={{
            top: s.top,
            left: s.left,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
            animationDuration: s.duration,
            animationDelay: s.delay,
            // @ts-ignore custom property
            "--drift-x": `${s.driftX}px`,
            "--drift-y": `${s.driftY}px`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Background Music ────────────────────────────────────────────────────────
function useAmbientMusic() {
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const oscRef2 = useRef<OscillatorNode | null>(null);
  const [muted, setMuted] = useState(false);
  const [started, setStarted] = useState(false);

  const start = () => {
    if (started) return;
    setStarted(true);
    const ctx = new AudioContext();
    ctxRef.current = ctx;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.04, ctx.currentTime);
    masterGain.connect(ctx.destination);
    gainRef.current = masterGain;

    // Primary soft tone
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(220, ctx.currentTime);
    // Gentle frequency modulation
    osc.frequency.linearRampToValueAtTime(230, ctx.currentTime + 4);
    osc.frequency.linearRampToValueAtTime(218, ctx.currentTime + 8);
    osc.frequency.linearRampToValueAtTime(225, ctx.currentTime + 12);
    const oGain = ctx.createGain();
    oGain.gain.setValueAtTime(0.6, ctx.currentTime);
    osc.connect(oGain);
    oGain.connect(masterGain);
    osc.start();
    oscRef.current = osc;

    // Harmonic layer
    const osc2 = ctx.createOscillator();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(330, ctx.currentTime);
    osc2.frequency.linearRampToValueAtTime(340, ctx.currentTime + 6);
    osc2.frequency.linearRampToValueAtTime(325, ctx.currentTime + 12);
    const oGain2 = ctx.createGain();
    oGain2.gain.setValueAtTime(0.3, ctx.currentTime);
    osc2.connect(oGain2);
    oGain2.connect(masterGain);
    osc2.start();
    oscRef2.current = osc2;
  };

  const toggleMute = () => {
    if (!gainRef.current) return;
    const next = !muted;
    setMuted(next);
    gainRef.current.gain.setValueAtTime(
      next ? 0 : 0.04,
      ctxRef.current?.currentTime ?? 0,
    );
  };

  return { start, muted, toggleMute, started };
}

// ─── Background Decorations ─────────────────────────────────────────────────
function BackgroundDecorations() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {SPARKLES.map((s) => (
        <span
          key={s.id}
          className={`sparkle-${s.type} absolute select-none`}
          style={{
            top: s.top,
            left: s.left,
            animationDelay: s.delay,
            fontSize: `${s.size}px`,
          }}
        >
          ✨
        </span>
      ))}
      {BALLOON_HEARTS.map((b) => (
        <span
          key={b.id}
          className="balloon-heart absolute select-none"
          style={{
            left: b.left,
            bottom: "-60px",
            animationDelay: b.delay,
            animationDuration: b.duration,
            fontSize: "22px",
          }}
        >
          {b.emoji}
        </span>
      ))}
      {MUSIC_NOTES.map((m) => (
        <span
          key={m.id}
          className="music-note-float absolute select-none"
          style={{
            left: m.left,
            bottom: "-60px",
            animationDelay: m.delay,
            animationDuration: m.duration,
            fontSize: "20px",
          }}
        >
          {m.emoji}
        </span>
      ))}
      {FLOWERS.map((f) => (
        <span
          key={f.id}
          className={`absolute select-none ${f.pos} ${f.size} ${f.rotate} flower-breathe`}
          style={{ animationDelay: `${f.delay}s` }}
        >
          {f.emoji}
        </span>
      ))}
    </div>
  );
}

// ─── Slide 1 ────────────────────────────────────────────────────────────────
function Slide1({ onRefresh }: { onRefresh: () => void }) {
  const [spinning, setSpinning] = useState(false);

  const handleRefresh = () => {
    setSpinning(true);
    setTimeout(() => onRefresh(), 600);
  };

  return (
    <div className="slide-container flex items-center justify-center min-h-screen p-6">
      <div className="card-soft text-center animate-fade-up max-w-sm w-full">
        <div className="mb-6 flex flex-col items-center">
          <div className="wifi-glitch-wrapper w-24 h-24 rounded-full bg-pink-100 flex items-center justify-center mb-3 shadow-inner">
            <div className="wifi-glitch">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#e07ba0"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-label="No network"
                role="img"
              >
                <title>No network</title>
                <line x1="1" y1="1" x2="23" y2="23" />
                <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" />
                <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" />
                <path d="M10.71 5.05A16 16 0 0 1 22.56 9" />
                <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" />
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                <line x1="12" y1="20" x2="12.01" y2="20" />
              </svg>
            </div>
          </div>
          <div className="signal-bars">
            <div className="signal-bar" style={{ animationDelay: "0s" }} />
            <div className="signal-bar" style={{ animationDelay: "0.2s" }} />
            <div className="signal-bar" style={{ animationDelay: "0.4s" }} />
            <div className="signal-bar" style={{ animationDelay: "0.6s" }} />
          </div>
        </div>
        <h1 className="heading-display text-4xl mb-3 text-pink-700">
          no network
        </h1>
        <p className="body-text text-pink-500 mb-8 text-base leading-relaxed">
          please press on refresh to continue
          <span className="loading-dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
        </p>
        <button
          type="button"
          data-ocid="network.primary_button"
          onClick={handleRefresh}
          className="btn-pink"
        >
          <span
            className={`mr-2 inline-block ${spinning ? "spin-once" : ""}`}
            style={{ transition: "transform 0.6s" }}
          >
            🔄
          </span>
          Refresh
        </button>
      </div>
    </div>
  );
}

// ─── Dramatic SVG Broken Heart ───────────────────────────────────────────────
function BrokenHeartSVG() {
  return (
    <div className="broken-heart-container pointer-events-none">
      <div className="broken-heart-rise">
        <div className="broken-heart-svg-wrapper">
          <svg
            className="bh-left"
            width="60"
            height="60"
            viewBox="0 0 60 60"
            aria-hidden="true"
          >
            <defs>
              <clipPath id="left-clip">
                <rect x="0" y="0" width="30" height="60" />
              </clipPath>
            </defs>
            <g clipPath="url(#left-clip)">
              <path
                d="M30 50 C15 38 4 28 4 18 C4 10 10 4 18 4 C23 4 27 7 30 11"
                fill="#e8325a"
                stroke="#c0153a"
                strokeWidth="1"
              />
            </g>
          </svg>
          <svg
            className="bh-right"
            width="60"
            height="60"
            viewBox="0 0 60 60"
            aria-hidden="true"
          >
            <defs>
              <clipPath id="right-clip">
                <rect x="30" y="0" width="30" height="60" />
              </clipPath>
            </defs>
            <g clipPath="url(#right-clip)">
              <path
                d="M30 50 C45 38 56 28 56 18 C56 10 50 4 42 4 C37 4 33 7 30 11"
                fill="#e8325a"
                stroke="#c0153a"
                strokeWidth="1"
              />
            </g>
          </svg>
          <svg
            className="bh-crack absolute inset-0"
            width="60"
            height="60"
            viewBox="0 0 60 60"
            aria-hidden="true"
          >
            <polyline
              points="30,8 27,22 33,22 28,40 32,40 29,52"
              stroke="#fff"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

// ─── Pulse Ring ──────────────────────────────────────────────────────────────
function PulseRing({
  active,
  onDone,
}: { active: boolean; onDone: () => void }) {
  useEffect(() => {
    if (active) {
      const t = setTimeout(onDone, 800);
      return () => clearTimeout(t);
    }
  }, [active, onDone]);
  if (!active) return null;
  return <div className="pulse-ring-overlay" aria-hidden="true" />;
}

// ─── SVG Envelope ────────────────────────────────────────────────────────────
function EnvelopeSVG() {
  return (
    <div className="envelope-svg-outer">
      <svg
        className="envelope-svg"
        width="160"
        height="120"
        viewBox="0 0 160 120"
        aria-label="Envelope"
        role="img"
      >
        <title>Envelope</title>
        <rect
          x="4"
          y="40"
          width="152"
          height="76"
          rx="10"
          ry="10"
          fill="#fff0f5"
          stroke="#f0a0c0"
          strokeWidth="2"
        />
        <path
          d="M4 116 L60 75 M156 116 L100 75"
          stroke="#f4b8d0"
          strokeWidth="1.5"
        />
        <g className="letter-peek">
          <rect
            x="30"
            y="20"
            width="100"
            height="60"
            rx="4"
            fill="#fff8fb"
            stroke="#fac8de"
            strokeWidth="1.5"
          />
          <line
            x1="44"
            y1="38"
            x2="116"
            y2="38"
            stroke="#f4b0cc"
            strokeWidth="1.5"
          />
          <line
            x1="44"
            y1="48"
            x2="116"
            y2="48"
            stroke="#f4b0cc"
            strokeWidth="1.5"
          />
          <line
            x1="44"
            y1="58"
            x2="90"
            y2="58"
            stroke="#f4b0cc"
            strokeWidth="1.5"
          />
          <text x="80" y="72" textAnchor="middle" fontSize="12" fill="#e07ba0">
            💕
          </text>
        </g>
        <g className="envelope-flap">
          <path
            d="M4 42 Q80 100 156 42"
            fill="#ffd6e8"
            stroke="#f0a0c0"
            strokeWidth="2"
          />
          <path
            d="M4 42 L80 85 L156 42"
            fill="#ffe4ef"
            stroke="#f0a0c0"
            strokeWidth="1.5"
          />
        </g>
        <path
          d="M4 40 L80 82 L156 40"
          fill="none"
          stroke="#f0a0c0"
          strokeWidth="1.5"
        />
        <g className="envelope-seal">
          <circle cx="80" cy="82" r="12" fill="#f06090" />
          <text x="80" y="87" textAnchor="middle" fontSize="14" fill="white">
            ♥
          </text>
        </g>
      </svg>
    </div>
  );
}

// ─── Hold Button with Progress Ring ─────────────────────────────────────────
const HOLD_DURATION = 1200;

function HoldOpenButton({ onOpen }: { onOpen: () => void }) {
  const [progress, setProgress] = useState(0); // 0–100
  const [holding, setHolding] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  const startHold = () => {
    startTimeRef.current = performance.now();
    setHolding(true);

    const tick = () => {
      if (startTimeRef.current === null) return;
      const elapsed = performance.now() - startTimeRef.current;
      const pct = Math.min((elapsed / HOLD_DURATION) * 100, 100);
      setProgress(pct);
      if (pct >= 100) {
        setHolding(false);
        setProgress(0);
        startTimeRef.current = null;
        onOpen();
      } else {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  const cancelHold = () => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    startTimeRef.current = null;
    setHolding(false);
    setProgress(0);
  };

  const circumference = 2 * Math.PI * 22;
  const dashOffset = circumference * (1 - progress / 100);

  return (
    <div
      className="hold-btn-wrapper"
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        <circle
          cx="32"
          cy="32"
          r="22"
          fill="none"
          stroke="rgba(255,180,210,0.25)"
          strokeWidth="3"
        />
        <circle
          cx="32"
          cy="32"
          r="22"
          fill="none"
          stroke="#f06090"
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          style={{
            transform: "rotate(-90deg)",
            transformOrigin: "32px 32px",
            transition: holding ? "none" : "stroke-dashoffset 0.2s",
          }}
        />
      </svg>
      <button
        type="button"
        data-ocid="envelope.open_button"
        className={`btn-pink ${holding ? "hold-active" : ""}`}
        style={{ position: "relative", zIndex: 1 }}
        onMouseDown={startHold}
        onMouseUp={cancelHold}
        onMouseLeave={cancelHold}
        onTouchStart={(e) => {
          e.preventDefault();
          startHold();
        }}
        onTouchEnd={cancelHold}
      >
        {holding ? `hold… ${Math.round(progress)}%` : "open"}
      </button>
    </div>
  );
}

// ─── Slide 2 ────────────────────────────────────────────────────────────────
function Slide2({
  onOpen,
  onFirstInteraction,
}: { onOpen: () => void; onFirstInteraction: () => void }) {
  const [_openBtnScale, setOpenBtnScale] = useState(1);
  const [brokenHearts, setBrokenHearts] = useState<number[]>([]);
  const [shaking, setShaking] = useState(false);
  const [redFlash, setRedFlash] = useState(false);
  const [pulseRing, setPulseRing] = useState(false);
  const brokenHeartCounter = useRef(0);

  const handleClose = () => {
    onFirstInteraction();
    setOpenBtnScale((prev) => Math.min(prev * 2, 4));
    brokenHeartCounter.current += 1;
    setBrokenHearts((prev) => [...prev, brokenHeartCounter.current]);
    setShaking(true);
    setRedFlash(true);
    setPulseRing(true);
    setTimeout(() => setShaking(false), 600);
    setTimeout(() => setRedFlash(false), 500);
  };

  return (
    <div
      className={`slide-container flex items-center justify-center min-h-screen p-6 ${shaking ? "screen-shake" : ""}`}
    >
      {redFlash && (
        <div
          className="red-flash fixed inset-0 pointer-events-none"
          style={{ zIndex: 100 }}
        />
      )}
      <PulseRing active={pulseRing} onDone={() => setPulseRing(false)} />
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 5 }}>
        {brokenHearts.map((id) => (
          <BrokenHeartSVG key={id} />
        ))}
      </div>
      <div
        className="card-soft text-center animate-fade-up max-w-sm w-full"
        style={{ position: "relative", zIndex: 10 }}
      >
        <div className="envelope-wrapper mb-6">
          <EnvelopeSVG />
        </div>
        <p className="body-text italic text-pink-500 mb-8 text-base">
          message from adrika to shlok
        </p>
        <div className="flex gap-4 justify-center items-end">
          <HoldOpenButton
            onOpen={() => {
              onFirstInteraction();
              onOpen();
            }}
          />
          <button
            type="button"
            data-ocid="envelope.close_button"
            onClick={handleClose}
            className="btn-outline-pink"
          >
            close
          </button>
        </div>
        <p className="body-text text-pink-400 text-xs mt-4 opacity-70">
          hold "open" to unseal 💌
        </p>
      </div>
    </div>
  );
}

// ─── Falling Petals ──────────────────────────────────────────────────────────
function FallingPetals() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {PETALS.map((p) => (
        <span
          key={p.id}
          className="petal-fall absolute select-none"
          style={{
            left: p.left,
            top: "-40px",
            animationDelay: p.delay,
            animationDuration: p.duration,
            fontSize: p.size,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
}

// ─── Confetti burst ──────────────────────────────────────────────────────────
const CONFETTI_PARTICLES = Array.from({ length: 40 }, (_, i) => ({
  id: `c${i}`,
  left: `${Math.random() * 100}%`,
  delay: `${Math.random() * 1.5}s`,
  color: [
    "#f06090",
    "#ff96b8",
    "#c084fc",
    "#fb7185",
    "#fbbf24",
    "#34d399",
    "#60a5fa",
    "#e879f9",
    "#f472b6",
    "#a78bfa",
  ][i % 10],
  size: `${4 + Math.random() * 8}px`,
  shape: i % 3 === 0 ? "heart" : i % 3 === 1 ? "circle" : "rect",
}));

function ConfettiBurst({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 50 }}
    >
      {CONFETTI_PARTICLES.map((p) => (
        <div
          key={p.id}
          className="confetti-particle absolute"
          style={{
            left: p.left,
            top: "-20px",
            animationDelay: p.delay,
            width: p.size,
            height: p.size,
            background: p.shape !== "heart" ? p.color : undefined,
            color: p.color,
            borderRadius:
              p.shape === "circle"
                ? "50%"
                : p.shape === "rect"
                  ? "2px"
                  : undefined,
            fontSize: p.shape === "heart" ? p.size : undefined,
          }}
        >
          {p.shape === "heart" ? "💗" : ""}
        </div>
      ))}
    </div>
  );
}

// ─── Fireworks Burst ─────────────────────────────────────────────────────────
const FW_COLORS = [
  "#f06090",
  "#e879f9",
  "#fbbf24",
  "#60a5fa",
  "#34d399",
  "#fb7185",
  "#c084fc",
  "#ff96b8",
  "#a78bfa",
  "#f472b6",
];

const FIREWORK_PARTICLES = Array.from({ length: 24 }, (_, i) => {
  const angle = (i / 24) * 360;
  const dist = 80 + Math.random() * 80;
  const rad = (angle * Math.PI) / 180;
  const tx = Math.cos(rad) * dist;
  const ty = Math.sin(rad) * dist;
  return {
    id: `fw${i}`,
    tx,
    ty,
    color: FW_COLORS[i % FW_COLORS.length],
    delay: `${Math.random() * 0.15}s`,
    size: 4 + Math.random() * 6,
  };
});

function FireworksBurst({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 55 }}
      aria-hidden="true"
    >
      <div style={{ position: "absolute", top: "50%", left: "50%" }}>
        {FIREWORK_PARTICLES.map((p) => (
          <div
            key={p.id}
            className="firework-particle"
            style={{
              // @ts-ignore css vars
              "--tx": `${p.tx}px`,
              "--ty": `${p.ty}px`,
              background: p.color,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Typewriter ──────────────────────────────────────────────────────────────
const NOTE_TEXT = `I'm really sorry, Ik I'm. Kinda late for notify u this but a ver happiest birthday to u amour. Not gonna make it too dramatic but yeah, the world did something right the day u were born. I hope this new year to u brings u stupid amounts of happiness, good food, loud laughter, & moments that make u pause, gentleness & smile. U deserve the kind of days that feel light and peaceful, just know there's someone here quietly wishing the universe treats you extra gently this year. Once. Again happy belayed birthday`;

function TypewriterText({
  text,
  speed = 22,
}: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const idx = useRef(0);

  useEffect(() => {
    idx.current = 0;
    setDisplayed("");
    setDone(false);
    const interval = setInterval(() => {
      idx.current += 1;
      setDisplayed(text.slice(0, idx.current));
      if (idx.current >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span>
      {displayed}
      {!done && <span className="typewriter-cursor">|</span>}
    </span>
  );
}

// ─── Animated Signature ───────────────────────────────────────────────────────
function AnimatedSignature() {
  const text = "— ur adrika 💕";
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    setVisibleCount(0);
    // Delay start so typewriter note goes first
    const startDelay = setTimeout(
      () => {
        let i = 0;
        const interval = setInterval(() => {
          i++;
          setVisibleCount(i);
          if (i >= text.length) {
            clearInterval(interval);
          }
        }, 60);
        return () => clearInterval(interval);
      },
      NOTE_TEXT.length * 20 + 500,
    );
    return () => clearTimeout(startDelay);
  }, []);

  const done = visibleCount >= text.length;
  const textChars = Array.from(text);

  return (
    <p className="signature-line body-text text-pink-500 italic text-right mt-4 text-base">
      {textChars.slice(0, visibleCount).map((ch, i) => (
        <span
          key={textChars.slice(0, i + 1).join("") + String(i)}
          className={done ? "" : "ink-char"}
          style={{ animationDelay: `${i * 0.03}s` }}
        >
          {ch}
        </span>
      ))}
      {!done && <span className="typewriter-cursor">|</span>}
    </p>
  );
}

// ─── Polaroid Frame ───────────────────────────────────────────────────────────
function PolaroidFrame() {
  return (
    <div className="polaroid-wrapper" aria-hidden="true">
      <div className="polaroid-frame">
        <div className="polaroid-photo" />
        <div className="polaroid-caption">us 🌸</div>
      </div>
    </div>
  );
}

// ─── 3D Tilt Card ────────────────────────────────────────────────────────────
function TiltCard({ children }: { children: React.ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale(1.02)`;
  };

  const onMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform =
      "perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)";
  };

  return (
    <div
      ref={cardRef}
      className="note-card"
      style={{ transition: "transform 0.15s ease" }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
}

// ─── Slide 3 ────────────────────────────────────────────────────────────────
function Slide3({ active }: { active: boolean }) {
  const [confettiActive, setConfettiActive] = useState(false);
  const [fireworksActive, setFireworksActive] = useState(false);

  useEffect(() => {
    if (active) {
      setConfettiActive(true);
      setFireworksActive(true);
      setTimeout(() => setConfettiActive(false), 4000);
      setTimeout(() => setFireworksActive(false), 2000);
    }
  }, [active]);

  return (
    <div
      className="slide-container min-h-screen flex items-center justify-center p-6 py-16"
      style={{ position: "relative", zIndex: 2 }}
    >
      <FallingPetals />
      <ConfettiBurst active={confettiActive} />
      <FireworksBurst active={fireworksActive} />
      <div
        className="card-soft text-center animate-fade-up max-w-lg w-full"
        style={{ zIndex: 2, position: "relative" }}
      >
        <div className="text-2xl mb-2 select-none">🌸 🌷 🌸</div>
        <h1 className="heading-display text-4xl md:text-5xl mb-3 rainbow-shimmer-text">
          happy birthday shlok
        </h1>
        <p className="body-text text-pink-500 text-lg italic mb-5">
          another year to cheer up 🎂
        </p>
        <div className="divider-fancy mb-6" />
        <TiltCard>
          <p className="body-text text-pink-800 text-sm md:text-base leading-loose text-left">
            {active ? (
              <TypewriterText text={NOTE_TEXT} speed={20} />
            ) : (
              NOTE_TEXT
            )}
          </p>
          {active ? (
            <AnimatedSignature />
          ) : (
            <p className="body-text text-pink-500 italic text-right mt-4 text-base">
              — ur adrika 💕
            </p>
          )}
          <PolaroidFrame />
        </TiltCard>
        <div className="mt-6 text-2xl select-none animate-bounce-soft">
          🎈 🎂 🎈
        </div>
        <div className="text-xl mt-2 select-none">🌷 🌸 💗 🌸 🌷</div>
      </div>
    </div>
  );
}

// ─── Slide Transition ────────────────────────────────────────────────────────
function SlideTransition({
  show,
  children,
}: { show: boolean; children: React.ReactNode }) {
  return (
    <div
      className="absolute inset-0"
      style={{
        opacity: show ? 1 : 0,
        transform: show
          ? "translateY(0) scale(1)"
          : "translateY(30px) scale(0.97)",
        filter: show ? "blur(0px)" : "blur(8px)",
        transition: "opacity 0.7s ease, transform 0.7s ease, filter 0.7s ease",
        pointerEvents: show ? "auto" : "none",
        zIndex: show ? 10 : 0,
      }}
    >
      {children}
    </div>
  );
}

// ─── Mute Button ─────────────────────────────────────────────────────────────
function MuteButton({
  muted,
  onToggle,
}: { muted: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      data-ocid="audio.toggle"
      onClick={onToggle}
      className="mute-btn"
      aria-label={muted ? "Unmute music" : "Mute music"}
    >
      {muted ? "🔇" : "🔊"}
    </button>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [showLoader, setShowLoader] = useState(true);
  const [slide, setSlide] = useState<Slide>(1);
  const [targetSlide, setTargetSlide] = useState<Slide>(1);
  const [transitioning, setTransitioning] = useState(false);
  const {
    start: startMusic,
    muted,
    toggleMute,
    started: musicStarted,
  } = useAmbientMusic();

  const handleFirstInteraction = () => {
    if (!musicStarted) startMusic();
  };

  const goTo = (next: Slide) => {
    if (transitioning) return;
    setTransitioning(true);
    setTargetSlide(next);
    setTimeout(() => {
      setSlide(next);
      setTransitioning(false);
    }, 350);
  };

  if (showLoader) {
    return (
      <div className="relative w-full min-h-screen overflow-hidden bg-animated">
        <Starfield />
        <HeartbeatLoader onDone={() => setShowLoader(false)} />
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-animated">
      <StarTrail />
      <Starfield />
      <BackgroundDecorations />
      <MuteButton muted={muted} onToggle={toggleMute} />
      <div className="relative w-full min-h-screen" style={{ zIndex: 2 }}>
        <SlideTransition show={slide === 1 && targetSlide === 1}>
          <Slide1
            onRefresh={() => {
              handleFirstInteraction();
              goTo(2);
            }}
          />
        </SlideTransition>
        {(slide === 2 || targetSlide === 2) && (
          <SlideTransition show={slide === 2 && targetSlide === 2}>
            <Slide2
              onOpen={() => goTo(3)}
              onFirstInteraction={handleFirstInteraction}
            />
          </SlideTransition>
        )}
        {(slide === 3 || targetSlide === 3) && (
          <SlideTransition show={slide === 3 && targetSlide === 3}>
            <Slide3 active={slide === 3} />
          </SlideTransition>
        )}
      </div>
    </div>
  );
}
