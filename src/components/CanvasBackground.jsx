import { useEffect, useRef } from "react";

function usePrefersReducedMotion() {
  const prefersReducedMotionRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotionRef.current = mq.matches;

    const handler = (e) => {
      prefersReducedMotionRef.current = e.matches;
    };

    if (mq.addEventListener) mq.addEventListener("change", handler);
    else mq.addListener(handler);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", handler);
      else mq.removeListener(handler);
    };
  }, []);

  return prefersReducedMotionRef;
}

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function rand(min, max) {
  return min + Math.random() * (max - min);
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function hexToRgb(hex) {
  const h = hex.replace("#", "").trim();
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

export default function CanvasBackground() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const lastTimeRef = useRef(0);
  const bubblesRef = useRef([]);

  const prefersReducedMotionRef = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const getSize = () => ({ w: window.innerWidth, h: window.innerHeight });

    const getThemePalette = () => {
  // Weighted palette = repeated entries
  // (more repeats = more common)
  return [
    // blue (dominant)
    "#4fa8ff",
    "#4fa8ff",
    "#4fa8ff",
    "#4fa8ff",

    // violet
    "#9b8cff",
    "#9b8cff",
    "#9b8cff",

    // rose/pink
    "#e5a9be",
    "#e8c5d1",

    // soft yellow / gold (rare)
    "#ffc96b",
  ];
};

    const makeBubble = (w, h, palette) => {
      const base = pick(palette);
      const { r, g, b } = hexToRgb(base);

      const z = rand(0, 1); // 0 far, 1 near
      const type = Math.random() < 0.3 ? "orb" : "mist"; // more orbs for 3D read

      const baseR = Math.min(w, h);

      // Spawn anywhere (slightly beyond bounds so edges feel natural)
      const radius =
        type === "orb"
          ? rand(baseR * 0.05, baseR * 0.10) * (0.85 + z * 0.35)
          : rand(baseR * 0.06, baseR * 0.16) * (0.75 + z * 0.3);

      const x = rand(-radius * 0.2, w + radius * 0.2);
      const y = rand(-radius * 0.2, h + radius * 0.2);

      const alphaMax =
        type === "orb"
          ? rand(0.11, 0.20) * (0.7 + z * 0.6)
          : rand(0.05, 0.12) * (0.6 + z * 0.5);

      const blur =
        type === "orb"
          ? rand(0, 6)
          : rand(10, 26);

      const driftX = rand(-10, 10) * (0.5 + z * 1.0);
      const driftY = rand(-18, -6) * (0.5 + z * 1.0);

      const lifespan = rand(8, 15);
      const age = 0;

      return {
        x,
        y,
        radius,
        vx: driftX,
        vy: driftY,
        lifespan,
        age,
        r,
        g,
        b,
        alphaMax,
        blur,
        wobbleSeed: rand(0, 1000),
        z,
        type,
      };
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { w, h } = getSize();

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const palette = getThemePalette();
      const target = prefersReducedMotionRef.current ? 6 : 12;

      bubblesRef.current = Array.from({ length: target }, () =>
        makeBubble(w, h, palette)
      );
    };

    const drawAtmosphere = (w, h) => {
      const g = ctx.createRadialGradient(
        w * 0.55,
        h * 0.35,
        Math.min(w, h) * 0.12,
        w * 0.55,
        h * 0.35,
        Math.min(w, h) * 1.0
      );
      g.addColorStop(0, "rgba(255,255,255,0.04)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    };

    const drawBubble = (b, ts) => {
      const t = clamp(b.age / b.lifespan, 0, 1);
      const fadeIn = clamp(t / 0.18, 0, 1);
      const fadeOut = clamp((1 - t) / 0.22, 0, 1);
      const a = b.alphaMax * fadeIn * fadeOut;

      if (a <= 0.0005) return;

      // Slight wobble
      const wobble = Math.sin((ts / 1000 + b.wobbleSeed) * 0.6) * 6;
      const px = b.x + wobble * 0.25;
      const py = b.y;

      ctx.save();
      ctx.globalAlpha = 1;

      // MIST
      if (b.type === "mist") {
        ctx.filter = `blur(${b.blur}px)`;

        const g = ctx.createRadialGradient(
          px - b.radius * 0.25,
          py - b.radius * 0.25,
          b.radius * 0.1,
          px,
          py,
          b.radius
        );

        g.addColorStop(0, `rgba(${b.r},${b.g},${b.b},${a})`);
        g.addColorStop(1, `rgba(${b.r},${b.g},${b.b},0)`);

        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(px, py, b.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
        return;
      }

      // ORB (more 3D)
      ctx.filter = `blur(${b.blur}px)`;

      const core = ctx.createRadialGradient(
        px - b.radius * 0.22,
        py - b.radius * 0.28,
        b.radius * 0.08,
        px,
        py,
        b.radius
      );
      core.addColorStop(0, `rgba(${b.r},${b.g},${b.b},${a})`);
      core.addColorStop(1, `rgba(${b.r},${b.g},${b.b},${a * 0.25})`);

      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(px, py, b.radius, 0, Math.PI * 2);
      ctx.fill();

      // rim + highlight (no blur)
      ctx.filter = "none";

      ctx.strokeStyle = `rgba(232,238,239,${a * 0.28})`;
      ctx.lineWidth = Math.max(1, b.radius * 0.02);
      ctx.beginPath();
      ctx.arc(px, py, b.radius * 0.98, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = `rgba(232,238,239,${a * 0.35})`;
      ctx.beginPath();
      ctx.arc(
        px - b.radius * 0.28,
        py - b.radius * 0.32,
        b.radius * 0.12,
        0,
        Math.PI * 2
      );
      ctx.fill();

      ctx.restore();
    };

    const tick = (ts) => {
      const { w, h } = getSize();

      // Reduced motion: one still frame
      if (prefersReducedMotionRef.current) {
        ctx.clearRect(0, 0, w, h);
        drawAtmosphere(w, h);

        const sorted = [...bubblesRef.current].sort((a, b) => a.z - b.z);
        for (const b of sorted) drawBubble(b, ts);

        return;
      }

      const last = lastTimeRef.current || ts;
      const dt = clamp((ts - last) / 1000, 0.001, 0.04);
      lastTimeRef.current = ts;

      const palette = getThemePalette();

      // Keep count stable
      const targetCount = 12;
      while (bubblesRef.current.length < targetCount) {
        bubblesRef.current.push(makeBubble(w, h, palette));
      }

      // Update
      for (const b of bubblesRef.current) {
        b.age += dt;

        b.x += b.vx * dt;
        b.y += b.vy * dt;

        // If it drifts off screen, expire it
        if (
          b.x < -b.radius * 1.6 ||
          b.x > w + b.radius * 1.6 ||
          b.y < -b.radius * 1.9 ||
          b.y > h + b.radius * 1.9
        ) {
          b.age = Math.max(b.age, b.lifespan * 0.92);
        }
      }

      // Remove dead + respawn to target
      bubblesRef.current = bubblesRef.current.filter((b) => b.age < b.lifespan);
      while (bubblesRef.current.length < targetCount) {
        bubblesRef.current.push(makeBubble(w, h, palette));
      }

      // Render
      ctx.clearRect(0, 0, w, h);
      drawAtmosphere(w, h);

      const sorted = [...bubblesRef.current].sort((a, b) => a.z - b.z);
      for (const b of sorted) drawBubble(b, ts);

      rafRef.current = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [prefersReducedMotionRef]);

  return <canvas ref={canvasRef} aria-hidden="true" className="bg-canvas" />;
}