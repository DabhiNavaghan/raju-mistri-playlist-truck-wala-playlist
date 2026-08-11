"use client";

import { useRef, useEffect } from "react";
import { Mp3Track, YouTubeTrack } from "@/data/themes";

function isMp3(t: Mp3Track | YouTubeTrack): t is Mp3Track {
  return "audioSrc" in t;
}

interface PlaylistDrawerProps {
  isOpen: boolean;
  currentIndex: number;
  tracks: (Mp3Track | YouTubeTrack)[];
  onSelect: (index: number) => void;
  onClose: () => void;
}

export default function PlaylistDrawer({ isOpen, currentIndex, tracks, onSelect, onClose }: PlaylistDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      const activeEl = drawerRef.current?.querySelector(".drawer-track-item.active");
      activeEl?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [isOpen, currentIndex]);

  return (
    <div className={`playlist-drawer${isOpen ? "" : " hidden"}`} ref={drawerRef}>
      <div className="drawer-header">
        <span className="drawer-title">Playlist Queue ({tracks.length})</span>
        <button className="close-drawer-btn" onClick={onClose} aria-label="Close Queue">
          <svg viewBox="0 0 24 24" width={14} height={14} stroke="currentColor" strokeWidth={2} fill="none">
            <line x1={18} y1={6} x2={6} y2={18} />
            <line x1={6} y1={6} x2={18} y2={18} />
          </svg>
        </button>
      </div>
      <div className="drawer-track-list">
        {tracks.map((track, index) => (
          <div
            key={index}
            className={`drawer-track-item${index === currentIndex ? " active" : ""}`}
            onClick={() => onSelect(index)}
          >
            <div className="track-item-left">
              <span className="track-num">{index + 1}</span>
              <div className="track-item-info">
                <span className="track-item-title">{track.title}</span>
                <span className="track-item-artist">{track.artist}</span>
              </div>
            </div>
            <span className="track-item-duration">{isMp3(track) ? track.durationStr : track.durationStr}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
