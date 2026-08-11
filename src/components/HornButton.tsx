"use client";

import { useRef, useCallback } from "react";

const HORN_SRC = "/assets/horn.mp3";

export default function HornButton() {
  const isHonking = useRef(false);
  const logoRef = useRef<HTMLElement | null>(null);

  const honk = useCallback(async () => {
    if (isHonking.current) return;
    isHonking.current = true;

    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      if (ctx.state === "suspended") await ctx.resume();
      const resp = await fetch(HORN_SRC);
      const buffer = await ctx.decodeAudioData(await resp.arrayBuffer());
      const source = ctx.createBufferSource();
      const gain = ctx.createGain();
      source.buffer = buffer;
      gain.gain.value = 0.9;
      source.connect(gain).connect(ctx.destination);
      source.start();
    } catch {}

    // Shake wordmark
    const logo = document.querySelector(".logo") as HTMLElement | null;
    logoRef.current = logo;
    if (logo) {
      logo.classList.remove("is-shaking");
      void logo.offsetWidth;
      logo.classList.add("is-shaking");
      setTimeout(() => logo.classList.remove("is-shaking"), 720);
    }

    setTimeout(() => { isHonking.current = false; }, 500);
  }, []);

  return (
    <div className="horns">
      <button className="horn" onClick={honk} type="button">
        <span className="horn__icon">
          <svg viewBox="0 0 24 24" width={15} height={15} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </span>
        <span className="horn__text">
          <span className="horn__deva">हॉर्न</span>
          <span className="horn__en">HORN</span>
        </span>
      </button>
    </div>
  );
}
