"use client";

interface SpotifyEmbedProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SpotifyEmbed({ isOpen, onClose }: SpotifyEmbedProps) {
  return (
    <div className={`spotify-embed-container${isOpen ? "" : " hidden"}`}>
      <div className="spotify-embed-header">
        <span className="spotify-embed-title">Spotify Player Widget</span>
        <button className="close-embed-btn" onClick={onClose} aria-label="Close Spotify Embed">
          <svg viewBox="0 0 24 24" width={16} height={16} stroke="currentColor" strokeWidth={2} fill="none">
            <line x1={18} y1={6} x2={6} y2={18} />
            <line x1={6} y1={6} x2={18} y2={18} />
          </svg>
        </button>
      </div>
      <iframe
        src="https://open.spotify.com/embed/playlist/7vnd8GlKrfazw3sUQ8gt0q?utm_source=generator&theme=0"
        width="100%"
        height={152}
        frameBorder={0}
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Spotify Playlist Embed"
      />
    </div>
  );
}
