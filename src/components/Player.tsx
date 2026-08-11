"use client";

import { useRef, useCallback, useEffect, useState } from "react";

function formatTime(sec: number): string {
  if (isNaN(sec) || sec < 0) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

interface PlayerProps {
  title: string;
  artist: string;
  artwork: string;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  durationStr: string;
  isSeeking: boolean;
  isDrawerOpen: boolean;
  playerStyle: "glass-pill" | "truck-disc";
  onTogglePlay: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSeek: (ratio: number) => void;
  onToggleDrawer: () => void;
  onSetIsSeeking: (v: boolean) => void;
}

export default function Player({
  title,
  artist,
  artwork,
  isPlaying,
  currentTime,
  duration,
  durationStr,
  isSeeking,
  playerStyle,
  onTogglePlay,
  onPrev,
  onNext,
  onSeek,
  onToggleDrawer,
  onSetIsSeeking,
}: PlayerProps) {
  const progressRef = useRef<HTMLDivElement>(null);
  const isSeekingRef = useRef(false);
  isSeekingRef.current = isSeeking;

  const ratio = duration > 0 ? currentTime / duration : 0;
  const fillPercent = Math.min(Math.max(ratio * 100, 0), 100);

  const getRatioFromEvent = useCallback((clientX: number) => {
    if (!progressRef.current) return 0;
    const rect = progressRef.current.getBoundingClientRect();
    return Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onSeek(getRatioFromEvent(e.clientX));
  }, [onSeek, getRatioFromEvent]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.stopPropagation();
    onSetIsSeeking(true);
    onSeek(getRatioFromEvent(e.clientX));
  }, [onSeek, onSetIsSeeking, getRatioFromEvent]);

  useEffect(() => {
    if (!isSeeking) return;
    const onMove = (e: PointerEvent) => {
      if (!isSeekingRef.current) return;
      onSeek(getRatioFromEvent(e.clientX));
    };
    const onUp = () => onSetIsSeeking(false);
    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerup", onUp);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
    };
  }, [isSeeking, onSeek, onSetIsSeeking, getRatioFromEvent]);

  if (playerStyle === "truck-disc") {
    return (
      <div className="truck-player-wrapper">
        <section className={`player${isPlaying ? " is-playing" : ""}`} aria-label="Player">
          <div className="disc">
            <div className="disc__ring">
              <img src={artwork} alt={`${title} artwork`} className="disc__art" />
            </div>
            <div className="disc__hub" />
          </div>

          <div className="meta">
            <p className="meta__title">{title}</p>
            <p className="meta__artist">{artist}</p>
            <div
              className="seek"
              ref={progressRef}
              role="slider"
              tabIndex={0}
              aria-label="Seek"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(ratio * 100)}
              onClick={handleClick}
              onPointerDown={handlePointerDown}
            >
              <div className="seek__rail">
                <div className="seek__fill" style={{ transform: `scaleX(${ratio})` }} />
              </div>
              <div className="seek__knob" style={{ transform: `translate(-50%,-50%) translateX(${ratio * (progressRef.current?.clientWidth || 0)}px)` }} />
            </div>
            <div className="time">
              <span>{formatTime(currentTime)}</span> / <span>{durationStr}</span>
            </div>
          </div>

          <div className="controls">
            <button className="btn btn--prev" onClick={onPrev} aria-label="Previous track">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" /></svg>
            </button>
            <button className="btn btn--play" onClick={onTogglePlay} aria-label={isPlaying ? "Pause" : "Play"} disabled={false}>
              <svg className="i-play" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              <svg className="i-pause" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
            </button>
            <button className="btn btn--next" onClick={onNext} aria-label="Next track">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" /></svg>
            </button>
            <button className="btn btn--toggle" onClick={onToggleDrawer} aria-expanded={false} aria-controls="list" aria-label="Playlist">
              <svg viewBox="0 0 24 24" width={15} height={15} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                <line x1={8} y1={6} x2={21} y2={6} /><line x1={8} y1={12} x2={21} y2={12} /><line x1={8} y1={18} x2={21} y2={18} />
                <circle cx={4} cy={6} r={1} fill="currentColor" /><circle cx={4} cy={12} r={1} fill="currentColor" /><circle cx={4} cy={18} r={1} fill="currentColor" />
              </svg>
            </button>
          </div>
        </section>
      </div>
    );
  }

  // glass-pill style (Raju Mistri)
  return (
    <main className="player-container">
      <div className="music-player-pill">
        <div className="player-left">
          <div className="artwork-wrapper">
            <img src={artwork} alt="Album Artwork" className="track-artwork" />
            <div className={`equalizer-overlay${isPlaying ? " active" : ""}`}>
              <span className="eq-bar" />
              <span className="eq-bar" />
              <span className="eq-bar" />
            </div>
          </div>
          <div className="track-meta">
            <div className="track-title-container">
              <h2 className="track-title">{title}</h2>
            </div>
            <p className="artist-name">{artist}</p>
          </div>
        </div>

        <div className="player-center">
          <div className="progress-container" ref={progressRef} onClick={handleClick} onPointerDown={handlePointerDown} title="Seek track position">
            <div className="progress-bar-bg">
              <div className="progress-fill" style={{ width: `${fillPercent}%` }} />
              <div className="progress-thumb" style={{ left: `${fillPercent}%` }} />
              <input type="range" className="progress-slider" min={0} max={100} value={fillPercent} step={0.1} readOnly aria-label="Audio playback progress slider" />
            </div>
          </div>
          <div className="time-display">
            <span>{formatTime(currentTime)}</span>
            <span className="time-separator">/</span>
            <span>{durationStr}</span>
          </div>
        </div>

        <div className="player-right">
          <button className="control-btn prev-btn" onClick={onPrev} title="Previous Track" aria-label="Previous Track">
            <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" /></svg>
          </button>
          <button className="control-btn play-pause-btn" onClick={onTogglePlay} title="Play/Pause" aria-label="Play or Pause">
            <svg className={`play-icon${isPlaying ? " hidden" : ""}`} viewBox="0 0 24 24" width={22} height={22} fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
            <svg className={`pause-icon${isPlaying ? "" : " hidden"}`} viewBox="0 0 24 24" width={22} height={22} fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
          </button>
          <button className="control-btn next-btn" onClick={onNext} title="Next Track" aria-label="Next Track">
            <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" /></svg>
          </button>
          <button className="control-btn queue-btn" onClick={onToggleDrawer} title="Select Track" aria-label="Select Track">
            <svg viewBox="0 0 24 24" width={17} height={17} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
              <line x1={8} y1={6} x2={21} y2={6} /><line x1={8} y1={12} x2={21} y2={12} /><line x1={8} y1={18} x2={21} y2={18} />
              <circle cx={4} cy={6} r={1} fill="currentColor" /><circle cx={4} cy={12} r={1} fill="currentColor" /><circle cx={4} cy={18} r={1} fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>
    </main>
  );
}
