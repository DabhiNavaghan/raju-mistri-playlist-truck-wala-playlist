"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Theme, Mp3Track, YouTubeTrack } from "@/data/themes";

declare global {
  interface Window {
    YT: {
      Player: new (el: string | HTMLElement, config: Record<string, unknown>) => YouTubePlayer;
      PlayerState: { PLAYING: number; PAUSED: number; ENDED: number; BUFFERING: number };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface YouTubePlayer {
  loadVideoById: (id: string) => void;
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  destroy: () => void;
}

function isMp3(track: Mp3Track | YouTubeTrack): track is Mp3Track {
  return "audioSrc" in track;
}

function fmtTime(sec: number): string {
  if (!Number.isFinite(sec) || sec < 0) return "0:00";
  return `${Math.floor(sec / 60)}:${String(Math.floor(sec % 60)).padStart(2, "0")}`;
}

export interface PlayerState {
  currentTrack: Mp3Track | YouTubeTrack;
  currentIndex: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  durationStr: string;
  isSeeking: boolean;
  setIsSeeking: (v: boolean) => void;
  togglePlay: () => void;
  next: () => void;
  prev: () => void;
  seek: (ratio: number) => void;
  setCurrentIndex: (idx: number) => void;
  play: () => void;
  artist: string;
  artwork: string;
}

export function useAudioPlayer(theme: Theme) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ytRef = useRef<YouTubePlayer | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const pendingSeekRef = useRef<number | null>(null);
  const ytPollRef = useRef({ time: 0, duration: 0, at: 0 });
  const ytPlayingRef = useRef(false);
  // The YT.Player object exists immediately, but its API methods only appear
  // once onReady fires. Track that, and queue any load that lands too early.
  const ytReadyRef = useRef(false);
  const ytLoadedIdRef = useRef<string | null>(null);
  const ytPendingIdRef = useRef<string | null>(null);
  const isPlayingRef = useRef(false);
  const themeRef = useRef(theme);

  themeRef.current = theme;
  isPlayingRef.current = isPlaying;

  const tracks = theme.tracks;
  const track = tracks[currentIndex];
  const artist = track.artist;
  const artwork = isMp3(track) ? track.artwork : track.cover;

  // ── MP3 helpers ──
  const getAudio = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.preload = "auto";
    }
    return audioRef.current;
  }, []);

  const playMp3 = useCallback(() => {
    const audio = getAudio();
    const t = tracks[currentIndex];
    if (!isMp3(t)) return;
    if (!audio.src || audio.src.endsWith("#")) {
      audio.src = new URL(t.audioSrc, window.location.href).href;
      audio.load();
    }
    audio.play().catch(() => {});
    setIsPlaying(true);
  }, [currentIndex, getAudio, tracks]);

  const loadYTVideo = useCallback((id: string) => {
    if (ytLoadedIdRef.current === id) return;
    const yt = ytRef.current;
    if (ytReadyRef.current && typeof yt?.loadVideoById === "function") {
      ytLoadedIdRef.current = id;
      ytPendingIdRef.current = null;
      yt.loadVideoById(id);
    } else {
      ytPendingIdRef.current = id;
    }
  }, []);

  const playYT = useCallback(() => {
    const yt = ytRef.current;
    if (ytReadyRef.current && typeof yt?.playVideo === "function") {
      yt.playVideo();
      ytPlayingRef.current = true;
      setIsPlaying(true);
    }
  }, []);

  const pauseYT = useCallback(() => {
    const yt = ytRef.current;
    if (typeof yt?.pauseVideo === "function") yt.pauseVideo();
    ytPlayingRef.current = false;
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    if (themeRef.current.audioSource === "youtube") {
      if (isPlayingRef.current) pauseYT();
      else playYT();
    } else {
      if (isPlayingRef.current) {
        getAudio().pause();
        setIsPlaying(false);
      } else {
        playMp3();
      }
    }
  }, [playYT, pauseYT, playMp3, getAudio]);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % tracks.length);
    setCurrentTime(0);
  }, [tracks.length]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    setCurrentTime(0);
  }, [tracks.length]);

  const seek = useCallback(
    (ratio: number) => {
      const clamped = Math.min(Math.max(ratio, 0), 1);
      if (themeRef.current.audioSource === "youtube") {
        const yt = ytRef.current;
        const live = ytReadyRef.current && typeof yt?.seekTo === "function" ? yt : null;
        const dur = live?.getDuration() || ytPollRef.current.duration || duration;
        live?.seekTo(dur * clamped, true);
        setCurrentTime(dur * clamped);
      } else {
        const audio = getAudio();
        const t = tracks[currentIndex];
        const d = (audio.duration && !isNaN(audio.duration)) ? audio.duration : (isMp3(t) ? t.durationSec : (t as YouTubeTrack).duration);
        const time = clamped * d;
        setCurrentTime(time);
        if (audio.readyState >= 1) {
          audio.currentTime = time;
        } else {
          pendingSeekRef.current = time;
        }
      }
    },
    [getAudio, tracks, currentIndex, duration]
  );

  const play = useCallback(() => {
    if (themeRef.current.audioSource === "youtube") playYT();
    else playMp3();
  }, [playYT, playMp3]);

  // ── Init / teardown per theme ──
  useEffect(() => {
    setCurrentIndex(0);
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);

    if (theme.audioSource === "mp3") {
      const audio = getAudio();
      const t = tracks[0];
      if (isMp3(t)) {
        audio.src = new URL(t.audioSrc, window.location.href).href;
        audio.load();
      }

      const onTimeUpdate = () => { if (!isSeeking) setCurrentTime(audio.currentTime); };
      const onLoadedMetadata = () => {
        if (pendingSeekRef.current !== null) {
          audio.currentTime = pendingSeekRef.current;
          pendingSeekRef.current = null;
        }
        setDuration(audio.duration);
      };
      const onEnded = () => next();

      audio.addEventListener("timeupdate", onTimeUpdate);
      audio.addEventListener("loadedmetadata", onLoadedMetadata);
      audio.addEventListener("ended", onEnded);

      return () => {
        audio.removeEventListener("timeupdate", onTimeUpdate);
        audio.removeEventListener("loadedmetadata", onLoadedMetadata);
        audio.removeEventListener("ended", onEnded);
        audio.pause();
      };
    }

    // YouTube setup
    if (theme.audioSource === "youtube") {
      let div = document.getElementById("yt-player-container");
      if (!div) {
        div = document.createElement("div");
        div.id = "yt-player-container";
        div.style.cssText = "position:fixed;top:0;left:0;width:1px;height:1px;overflow:hidden;opacity:0;pointer-events:none";
        document.body.appendChild(div);
      }

      let pollId: number;
      let rafId: number;
      let destroyed = false;

      const sample = () => {
        const yt = ytRef.current;
        if (!yt || !ytReadyRef.current || typeof yt.getCurrentTime !== "function") return;
        try {
          ytPollRef.current.time = yt.getCurrentTime() || 0;
          ytPollRef.current.duration = yt.getDuration() || 0;
          ytPollRef.current.at = performance.now();
        } catch {}
      };

      const paint = () => {
        if (destroyed) return;
        if (!isSeeking && ytPollRef.current.duration) {
          const { time, duration: dur, at } = ytPollRef.current;
          const drift = ytPlayingRef.current ? (performance.now() - at) / 1000 : 0;
          const cur = Math.min(dur, time + drift);
          setCurrentTime(cur);
          setDuration(dur);
        }
        rafId = requestAnimationFrame(paint);
      };

      const doInit = () => {
        if (destroyed) return;
        const t = tracks[0] as YouTubeTrack;
        ytReadyRef.current = false;
        ytLoadedIdRef.current = t.id;
        ytRef.current = new window.YT.Player(div!, {
          videoId: t.id,
          width: 1,
          height: 1,
          playerVars: { playsinline: 1, controls: 0, disablekb: 1, modestbranding: 1, rel: 0 },
          events: {
            onReady: () => {
              ytReadyRef.current = true;
              ytPollRef.current.duration = t.duration;
              sample();
              // Replay a track change that arrived before the API was live.
              const pending = ytPendingIdRef.current;
              ytPendingIdRef.current = null;
              if (pending) loadYTVideo(pending);
            },
            onStateChange: (e: { data: number }) => {
              const S = window.YT.PlayerState;
              if (e.data === S.PLAYING) {
                ytPlayingRef.current = true;
                setIsPlaying(true);
              } else if (e.data === S.PAUSED) {
                ytPlayingRef.current = false;
                setIsPlaying(false);
              } else if (e.data === S.ENDED) {
                setCurrentIndex((prev) => (prev + 1) % tracks.length);
              }
            },
            onError: () => {
              setCurrentIndex((prev) => (prev + 1) % tracks.length);
            },
          },
        });
        pollId = window.setInterval(sample, 250);
        rafId = requestAnimationFrame(paint);
      };

      if (window.YT?.Player) {
        doInit();
      } else {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.head.append(tag);
        window.onYouTubeIframeAPIReady = () => {
          if (!destroyed) doInit();
        };
      }

      return () => {
        destroyed = true;
        cancelAnimationFrame(rafId);
        clearInterval(pollId);
        ytRef.current?.destroy?.();
        ytRef.current = null;
        ytReadyRef.current = false;
        ytLoadedIdRef.current = null;
        ytPendingIdRef.current = null;
      };
    }
  }, [theme.id]);

  // ── Load track on index change ──
  useEffect(() => {
    const t = tracks[currentIndex];
    if (!t) return;
    if (theme.audioSource === "mp3" && isMp3(t)) {
      const audio = getAudio();
      const resolved = new URL(t.audioSrc, window.location.href).href;
      if (audio.src === resolved) return;
      audio.src = resolved;
      audio.load();
      // Keep playing across next/prev instead of stalling on the new source.
      if (isPlayingRef.current) audio.play().catch(() => {});
    } else if (theme.audioSource === "youtube") {
      loadYTVideo((t as YouTubeTrack).id);
    }
  }, [currentIndex, theme.audioSource, getAudio, tracks, loadYTVideo]);

  // ── Keyboard ──
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.code === "Space") { e.preventDefault(); togglePlay(); }
      else if (e.code === "ArrowRight") next();
      else if (e.code === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [togglePlay, next, prev]);

  return {
    currentTrack: track,
    currentIndex,
    isPlaying,
    currentTime,
    duration: duration || (isMp3(track) ? track.durationSec : (track as YouTubeTrack).duration),
    durationStr: fmtTime(duration || (isMp3(track) ? track.durationSec : (track as YouTubeTrack).duration)),
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
  };
}
