"use client";

import { GamePhase } from "@/types";

interface AudioPlayerProps {
  soundcloudUrl: string | null;
  currentPhase: GamePhase;
  isPlaying: boolean;
  onPlay: () => void;
  iframeRef: React.RefObject<HTMLIFrameElement | null>;
  disabled?: boolean;
}

export default function AudioPlayer({
  soundcloudUrl,
  isPlaying,
  onPlay,
  iframeRef,
  disabled = false,
}: AudioPlayerProps) {
  return (
    <div className="w-full">
      {soundcloudUrl && (
        <iframe
          ref={iframeRef}
          width="100%"
          height="0"
          scrolling="no"
          allow="autoplay; encrypted-media"
          src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(
            soundcloudUrl
          )}&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&visual=false`}
          style={{ display: "none" }}
        />
      )}

      <div className="flex flex-col items-center gap-3">
        <button
          onClick={onPlay}
          disabled={disabled || !soundcloudUrl}
          className={`
            group relative w-20 h-20 rounded-full flex items-center justify-center
            transition-all duration-300
            shadow-2xl
            ${
              isPlaying
                ? "bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 scale-95"
                : "bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 hover:scale-110"
            }
            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
            ${!disabled && !isPlaying ? "animate-pulse" : ""}
          `}
        >
          {isPlaying ? (
            <svg
              className="relative z-10 w-8 h-8 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg
              className="relative z-10 w-8 h-8 text-white ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
          {!disabled && !isPlaying && (
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 opacity-50 blur-xl group-hover:opacity-75 transition-opacity" />
          )}
        </button>

        <span className="text-sm font-medium text-gray-400">
          {isPlaying ? "Stop" : "Play"}
        </span>
      </div>
    </div>
  );
}
