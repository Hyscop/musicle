"use client";

import { GamePhase } from "@/types";

interface AudioPlayerProps {
  youtubeId: string | null;
  currentPhase: GamePhase;
  isPlaying: boolean;
  onPlay: () => void;
  iframeRef: React.RefObject<HTMLDivElement | null>;
  disabled?: boolean;
  isGameOver?: boolean;
  onShowStats?: () => void;
}

export default function AudioPlayer({
  youtubeId,
  isPlaying,
  onPlay,
  iframeRef,
  disabled = false,
  isGameOver = false,
  onShowStats,
}: AudioPlayerProps) {
  const handleClick = () => {
    if (isGameOver && onShowStats) {
      onShowStats();
    } else {
      onPlay();
    }
  };
  return (
    <div className="w-full">
      {youtubeId && (
        <div
          id="youtube-player-container"
          ref={iframeRef as React.RefObject<HTMLDivElement>}
          style={{ display: "none" }}
        />
      )}

      <div className="flex flex-col items-center gap-3">
        <button
          onClick={handleClick}
          disabled={!isGameOver && (disabled || !youtubeId)}
          className={`
            group relative w-20 h-20 rounded-full flex items-center justify-center
            transition-all duration-300
            shadow-2xl
            ${
              isGameOver
                ? "bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 hover:scale-110"
                : isPlaying
                ? "bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 scale-95"
                : "bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 hover:scale-110"
            }
            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
            ${!disabled && !isPlaying && !isGameOver ? "animate-pulse" : ""}
          `}
        >
          {isGameOver ? (
            <svg
              className="relative z-10 w-8 h-8 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
            </svg>
          ) : isPlaying ? (
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
          {!disabled && !isPlaying && !isGameOver && (
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 opacity-50 blur-xl group-hover:opacity-75 transition-opacity" />
          )}
        </button>

        <span className="text-sm font-medium text-gray-400">
          {isGameOver ? "İstatistikler" : isPlaying ? "Stop" : "Play"}
        </span>
      </div>
    </div>
  );
}
