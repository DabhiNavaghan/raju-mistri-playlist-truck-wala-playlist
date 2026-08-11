"use client";

import { useState, useCallback, useRef, useMemo, useEffect } from "react";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import { useAudioPlayer } from "@/hooks/use-audio-player";
import Player from "@/components/Player";
import PlaylistDrawer from "@/components/PlaylistDrawer";
import ISTClock from "@/components/ISTClock";
import TruckWordmark from "@/components/TruckWordmark";
import TruckBumper from "@/components/TruckBumper";
import HornButton from "@/components/HornButton";

function MusicApp() {
  const { activeTheme, switchTheme, ready } = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const {
    currentTrack,
    currentIndex,
    isPlaying,
    currentTime,
    duration,
    durationStr,
    isSeeking,
    setIsSeeking,
    togglePlay,
    next,
    prev,
    seek,
    setCurrentIndex,
    play,
    artist,
    artwork,
  } = useAudioPlayer(activeTheme);

  // Double-tap detection
  const lastTapRef = useRef(0);
  const tapCountRef = useRef(0);
  const lastTabRef = useRef(0);

  useEffect(() => {
    // Double-press Tab switches rooms. Tab is swallowed here so the two presses
    // don't also walk the focus ring across the page.
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || e.repeat || e.altKey || e.ctrlKey || e.metaKey) return;
      e.preventDefault();
      const now = Date.now();
      if (now - lastTabRef.current < 500) {
        switchTheme();
        lastTabRef.current = 0;
      } else {
        lastTabRef.current = now;
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      if (e.pointerType !== "touch") return;
      const target = e.target as HTMLElement;
      if (
        target.closest(".music-player-pill, .player-container, .truck-player-wrapper, .playlist-drawer, .spotify-btn, button, .horns, .dock")
      ) {
        return;
      }
      const now = Date.now();
      if (now - lastTapRef.current < 500) {
        tapCountRef.current += 1;
        if (tapCountRef.current >= 3) {
          switchTheme();
          lastTapRef.current = 0;
          tapCountRef.current = 0;
        }
      } else {
        tapCountRef.current = 1;
      }
      lastTapRef.current = now;
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerup", onPointerUp);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerup", onPointerUp);
    };
  }, [switchTheme]);

  const handleSelectTrack = useCallback(
    (index: number) => {
      setCurrentIndex(index);
      play();
    },
    [setCurrentIndex, play]
  );

  // Stable listener count
  const listenerCount = useMemo(() => Math.floor(500 + Math.random() * 300), []);

  const isTruck = activeTheme.playerStyle === "truck-disc";

  // Don't render until ready to avoid hydration mismatch
  if (!ready) return null;

  return (
    <>
      {/* Background layers */}
      {activeTheme.bgLayers ? (
        <div className="bg">
          {activeTheme.bgLayers.map((layer, i) => (
            <div
              key={layer}
              className={`bg__layer bg__layer--${i + 1}${i === 1 ? " is-armed" : ""}${i === 0 ? " is-active" : ""}`}
              style={{ backgroundImage: `url(${layer})` }}
            />
          ))}
          <div className="bg__scrim" />
        </div>
      ) : (
        <>
          <div className="bg-viewport" />
          <div className="vignette-overlay" />
        </>
      )}

      {/* Top bar */}
      {isTruck ? (
        <div className="topbar">
          <ISTClock variant="digital" />
          <span className="presence">
            <span className="presence__dot" />
            <span className="presence__count">{listenerCount}</span>
            <span className="presence__label">listening</span>
          </span>
          <span />
        </div>
      ) : (
        <div className="top-bar">
          <ISTClock variant="badge" />
        </div>
      )}

      {/* Truck Wala chrome */}
      {isTruck && (
        <>
          <TruckWordmark />
          <HornButton />
          <TruckBumper />
        </>
      )}

      {isTruck ? (
        <div className="dock">
          <PlaylistDrawer
            isOpen={drawerOpen}
            currentIndex={currentIndex}
            tracks={activeTheme.tracks}
            onSelect={handleSelectTrack}
            onClose={() => setDrawerOpen(false)}
          />
          <Player
            title={currentTrack.title}
            artist={artist}
            artwork={artwork}
            isPlaying={isPlaying}
            currentTime={currentTime}
            duration={duration}
            durationStr={durationStr}
            isSeeking={isSeeking}
            isDrawerOpen={drawerOpen}
            playerStyle="truck-disc"
            onTogglePlay={togglePlay}
            onPrev={prev}
            onNext={next}
            onSeek={seek}
            onToggleDrawer={() => setDrawerOpen((v) => !v)}
            onSetIsSeeking={setIsSeeking}
          />
        </div>
      ) : (
        <>
          <PlaylistDrawer
            isOpen={drawerOpen}
            currentIndex={currentIndex}
            tracks={activeTheme.tracks}
            onSelect={handleSelectTrack}
            onClose={() => setDrawerOpen(false)}
          />
          <Player
            title={currentTrack.title}
            artist={artist}
            artwork={artwork}
            isPlaying={isPlaying}
            currentTime={currentTime}
            duration={duration}
            durationStr={durationStr}
            isSeeking={isSeeking}
            isDrawerOpen={drawerOpen}
            playerStyle="glass-pill"
            onTogglePlay={togglePlay}
            onPrev={prev}
            onNext={next}
            onSeek={seek}
            onToggleDrawer={() => setDrawerOpen((v) => !v)}
            onSetIsSeeking={setIsSeeking}
          />
          <a
            href="https://open.spotify.com/playlist/7vnd8GlKrfazw3sUQ8gt0q?si=X24vD_PxTbqB6fc_GjsOBw"
            target="_blank"
            rel="noopener noreferrer"
            className="spotify-btn"
            title="Open Playlist on Spotify"
          >
            <svg className="spotify-icon" viewBox="0 0 24 24" width={18} height={18} fill="currentColor">
              <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.02 8.52-.6 11.64 1.32.42.18.48.66.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.72-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.72 1.62.54.3.72 1.02.42 1.56-.3.42-1.02.6-1.56.3z" />
            </svg>
            <span className="spotify-btn-text">Open Spotify</span>
          </a>
        </>
      )}
    </>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <MusicApp />
    </ThemeProvider>
  );
}
