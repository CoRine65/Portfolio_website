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

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function easeInOut(t) {
  // smoothstep-ish
  return t * t * (3 - 2 * t);
}

function pickStart(w, h) {
  // Start near edges, but not corners. Feels like it "enters" the space.
  const side = Math.floor(Math.random() * 4); // 0 top, 1 right, 2 bottom, 3 left
  const pad = 40;

  if (side === 0) return { x: rand(pad, w - pad), y: rand(pad, h * 0.18) };
  if (side === 1) return { x: rand(w * 0.82, w - pad), y: rand(pad, h - pad) };
  if (side === 2) return { x: rand(pad, w - pad), y: rand(h * 0.82, h - pad) };
  return { x: rand(pad, w * 0.18), y: rand(pad, h - pad) };
}

function createStem(w, h) {
  const start = pickStart(w, h);

  const baseAngle = rand(-Math.PI, Math.PI);
  const thickness = rand(1.2, 2.2);
  const step = rand(1.7, 2.6); // pixels per segment step (slow, delicate)
  const maxSegments = Math.floor(rand(520, 860));

  return {
    id: crypto?.randomUUID?.() ?? String(Math.random()),
    state: "growing", // growing | fading
    opacity: 0,
    fade: 0, // 0..1

    // Growth
    segments: [{ x: start.x, y: start.y, a: baseAngle }],
    leaves: [],

    step,
    thickness,
    maxSegments,

    // Curvature "personality"
    bend: rand(0.012, 0.028),       // how strongly it turns
    noise: rand(0.008, 0.018),      // extra wobble
    drift: rand(-0.002, 0.002),     // slow bias

    // Leaf behavior
    leafEvery: Math.floor(rand(22, 34)), // every N segments attempt sprout
    leafSide: Math.random() < 0.5 ? -1 : 1, // alternate sides
  };
}

function makeLeaf(segA, segB, side, thickness) {
  // Spawn at segment B, oriented roughly perpendicular to the segment direction
  const dx = segB.x - segA.x;
  const dy = segB.y - segA.y;
  const len = Math.max(0.0001, Math.hypot(dx, dy));
  const nx = (-dy / len) * side;
  const ny = (dx / len) * side;

  const size = rand(6, 12) + thickness * 2.2;

  return {
    x: segB.x + nx * rand(2, 6),
    y: segB.y + ny * rand(2, 6),
    nx,
    ny,
    size,
    t: 0, // growth 0..1
    life: 1, // 1..0 fade with stem
  };
}

export default function CanvasBackground() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const stemsRef = useRef([]); // array of stems (we'll keep max 2 during overlap)
  const lastTimeRef = useRef(0);

  const prefersReducedMotionRef = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const getSize = () => ({ w: window.innerWidth, h: window.innerHeight });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { w, h } = getSize();

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // Ensure we always have at least one stem ready after resize
      if (stemsRef.current.length === 0) {
        stemsRef.current.push(createStem(w, h));
      }
    };

    const drawAtmosphere = (w, h) => {
      // Soft depth wash (still restrained)
      const g = ctx.createRadialGradient(
        w * 0.5,
        h * 0.35,
        Math.min(w, h) * 0.12,
        w * 0.5,
        h * 0.35,
        Math.min(w, h) * 0.95
      );
      g.addColorStop(0, "rgba(255,255,255,0.045)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    };

    const drawStem = (stem) => {
      const segs = stem.segments;
      if (segs.length < 2) return;

      const alpha = stem.state === "fading" ? (1 - stem.fade) : stem.opacity;

      // Colors: monochrome token-ish; keep subtle
      const main = `rgba(232, 238, 239, ${0.10 * alpha})`;
      const glow = `rgba(232, 238, 239, ${0.06 * alpha})`;
      const shadow = `rgba(0, 0, 0, ${0.10 * alpha})`;

      // Shadow pass (tiny offset)
      ctx.save();
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = shadow;
      ctx.lineWidth = stem.thickness + 1.6;
      ctx.beginPath();
      ctx.moveTo(segs[0].x + 1.5, segs[0].y + 2.0);
      for (let i = 1; i < segs.length; i++) {
        ctx.lineTo(segs[i].x + 1.5, segs[i].y + 2.0);
      }
      ctx.stroke();
      ctx.restore();

      // Glow pass
      ctx.save();
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = glow;
      ctx.lineWidth = stem.thickness + 2.8;
      ctx.beginPath();
      ctx.moveTo(segs[0].x, segs[0].y);
      for (let i = 1; i < segs.length; i++) ctx.lineTo(segs[i].x, segs[i].y);
      ctx.stroke();
      ctx.restore();

      // Main pass
      ctx.save();
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = main;
      ctx.lineWidth = stem.thickness;
      ctx.beginPath();
      ctx.moveTo(segs[0].x, segs[0].y);
      for (let i = 1; i < segs.length; i++) ctx.lineTo(segs[i].x, segs[i].y);
      ctx.stroke();
      ctx.restore();

      // Leaves
      for (const leaf of stem.leaves) {
        const lt = clamp(leaf.t, 0, 1);
        const grow = easeInOut(lt);
        const life = stem.state === "fading" ? (1 - stem.fade) : 1;

        const a = 0.08 * alpha * life * grow;
        if (a <= 0.001) continue;

        // simple leaf: curved teardrop-ish
        const size = leaf.size * grow;

        const px = leaf.x;
        const py = leaf.y;

        // perpendicular direction for "leaf"
        const nx = leaf.nx;
        const ny = leaf.ny;

        const tipX = px + nx * size * 1.2;
        const tipY = py + ny * size * 1.2;

        const backX = px - nx * size * 0.25;
        const backY = py - ny * size * 0.25;

        const sideX = px + (ny) * size * 0.35;
        const sideY = py - (nx) * size * 0.35;

        const side2X = px - (ny) * size * 0.35;
        const side2Y = py + (nx) * size * 0.35;

        // shadow
        ctx.save();
        ctx.fillStyle = `rgba(0,0,0,${0.10 * alpha * life * grow})`;
        ctx.beginPath();
        ctx.moveTo(backX + 1.2, backY + 1.8);
        ctx.quadraticCurveTo(sideX + 1.2, sideY + 1.8, tipX + 1.2, tipY + 1.8);
        ctx.quadraticCurveTo(side2X + 1.2, side2Y + 1.8, backX + 1.2, backY + 1.8);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        // leaf
        ctx.save();
        ctx.fillStyle = `rgba(232,238,239,${a})`;
        ctx.beginPath();
        ctx.moveTo(backX, backY);
        ctx.quadraticCurveTo(sideX, sideY, tipX, tipY);
        ctx.quadraticCurveTo(side2X, side2Y, backX, backY);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
    };

    const stepStem = (stem, dt, w, h) => {
      // Fade-in at birth
      stem.opacity = clamp(stem.opacity + dt * 0.25, 0, 1);

      // leaf growth timing
      for (const leaf of stem.leaves) {
        leaf.t = clamp(leaf.t + dt * 0.6, 0, 1);
      }

      if (stem.state === "fading") {
        stem.fade = clamp(stem.fade + dt * 0.18, 0, 1);
        return;
      }

      // Grow by adding segments over time, but cap per frame for stability
      const segsToAdd = clamp(Math.floor(dt * 60 * 0.9), 1, 3); // 1-3 segments/frame depending on dt

      for (let k = 0; k < segsToAdd; k++) {
        if (stem.segments.length >= stem.maxSegments) {
          stem.state = "fading";
          break;
        }

        const last = stem.segments[stem.segments.length - 1];
        // eslint-disable-next-line no-unused-vars
        const prev = stem.segments[Math.max(0, stem.segments.length - 2)] ?? last;

        // Turn gently with wobble
        const t = stem.segments.length;
        const wobble = Math.sin(t * 0.11) * stem.noise + Math.sin(t * 0.037) * (stem.noise * 0.6);
        let a = last.a + wobble + stem.drift;

        // Keep curving, but not spiral
        a += rand(-stem.bend, stem.bend);

        const nx = Math.cos(a);
        const ny = Math.sin(a);

        const next = {
          x: last.x + nx * stem.step,
          y: last.y + ny * stem.step,
          a,
        };

        // Soft boundary steering (keeps it in view)
        const margin = 40;
        if (next.x < margin) next.a = lerp(next.a, 0, 0.25);
        if (next.x > w - margin) next.a = lerp(next.a, Math.PI, 0.25);
        if (next.y < margin) next.a = lerp(next.a, Math.PI / 2, 0.25);
        if (next.y > h - margin) next.a = lerp(next.a, -Math.PI / 2, 0.25);

        stem.segments.push(next);

        // Leaf spawn rule: every N segments, chance to sprout
        const idx = stem.segments.length - 1;
        if (idx > 12 && idx % stem.leafEvery === 0) {
          // low probability to keep density restrained
          if (Math.random() < 0.55 && stem.leaves.length < 18) {
            const aSeg = stem.segments[idx - 1];
            const bSeg = stem.segments[idx];

            const leaf = makeLeaf(aSeg, bSeg, stem.leafSide, stem.thickness);
            stem.leaves.push(leaf);

            // Alternate sides so it feels intentional
            stem.leafSide *= -1;
          }
        }
      }
    };

    const ensureChain = (w, h) => {
      const stems = stemsRef.current;
      if (stems.length === 0) {
        stems.push(createStem(w, h));
        return;
      }

      // Keep at most 2 stems (overlap)
      while (stems.length > 2) stems.shift();

      const current = stems[stems.length - 1];
      const progress = current.segments.length / current.maxSegments;

      // Option A: when current is ~80% done, start next one
      if (progress >= 0.8 && stems.length === 1) {
        stems.push(createStem(w, h));
      }

      // If the oldest fully faded, remove it
      if (stems.length === 2) {
        const oldest = stems[0];
        if (oldest.state === "fading" && oldest.fade >= 1) {
          stems.shift();
        }
      }
    };

    const tick = (ts) => {
      const { w, h } = getSize();

      // Reduced motion: draw one still frame (no loop)
      if (prefersReducedMotionRef.current) {
        ctx.clearRect(0, 0, w, h);
        drawAtmosphere(w, h);

        // Keep a single static stem snapshot if none exists
        if (stemsRef.current.length === 0) stemsRef.current.push(createStem(w, h));
        // draw whatever exists (no stepping)
        for (const stem of stemsRef.current) drawStem(stem);
        return;
      }

      const last = lastTimeRef.current || ts;
      const dt = clamp((ts - last) / 1000, 0.001, 0.04); // cap dt to avoid jumps
      lastTimeRef.current = ts;

      ensureChain(w, h);

      // Update stems (step growth/fade)
      for (const stem of stemsRef.current) {
        stepStem(stem, dt, w, h);

        // Start fade when done growing
        if (stem.state === "growing" && stem.segments.length >= stem.maxSegments) {
          stem.state = "fading";
        }
      }

      // If we have 2 stems, fade the oldest once the newest exists
      if (stemsRef.current.length === 2) {
        const oldest = stemsRef.current[0];
        if (oldest.state !== "fading") oldest.state = "fading";
      }

      // Render
      ctx.clearRect(0, 0, w, h);
      drawAtmosphere(w, h);

      // Draw oldest first so newest feels on top
      for (const stem of stemsRef.current) drawStem(stem);

      rafRef.current = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);

    // Initialize one stem immediately
    const { w, h } = getSize();
    stemsRef.current = [createStem(w, h)];

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [prefersReducedMotionRef]);

  return <canvas ref={canvasRef} aria-hidden="true" className="bg-canvas" />;
}