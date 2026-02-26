import { useEffect, useMemo, useRef, useState } from "react";

const DEFAULT_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+-";

function idxOf(alphabet, ch) {
  const i = alphabet.indexOf(ch);
  return i === -1 ? 0 : i;
}

export default function AirportFlipText({
  text,
  active = false,

  // slower + smoother defaults
  duration = 1800,     // total line settle time
  stagger = 70,        // delay per character
  tickMs = 45,         // how often a character advances (bigger = calmer)
  spins = 10,          // how many steps each character rolls before locking

  alphabet = DEFAULT_ALPHABET,
  className = "",
}) {
  const safeTarget = useMemo(
    () => (typeof text === "string" ? text : ""),
    [text]
  );

  const [out, setOut] = useState(safeTarget);

  const rafRef = useRef(0);
  const startRef = useRef(0);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!active || reduce) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOut(safeTarget);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    startRef.current = performance.now();

    const tick = (now) => {
      const elapsed = now - startRef.current;

      const next = safeTarget.split("").map((finalCh, i) => {
        if (finalCh === " ") return " ";

        const charDelay = i * stagger;
        const local = elapsed - charDelay;

        // not started yet
        if (local <= 0) return " ";

        // progress for this char 0..1
        const localT = Math.min(1, local / duration);

        // how many "steps" have occurred (mechanical ticks)
        const steps = Math.floor(local / tickMs);

        // once enough time has passed, lock it
        if (localT >= 1) return finalCh;

        // roll through alphabet deterministically
        const finalIdx = idxOf(alphabet, finalCh);
        const rolledIdx = (finalIdx + spins + steps) % alphabet.length;

        return alphabet[rolledIdx];
      }).join("");

      setOut(next);

      if (elapsed < duration + safeTarget.length * stagger + 200) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setOut(safeTarget);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [active, safeTarget, duration, stagger, tickMs, spins, alphabet]);

  return <span className={className}>{out}</span>;
}