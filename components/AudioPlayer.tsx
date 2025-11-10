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

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    handleClick();
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
          onTouchEnd={handleTouchEnd}
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
                : disabled
                ? "bg-gradient-to-br from-gray-600 to-gray-700"
                : "bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 hover:scale-110"
            }
            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
            ${!disabled && !isPlaying && !isGameOver ? "animate-pulse" : ""}
            ${disabled && !isGameOver ? "animate-spin" : ""}
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
          ) : disabled && !isGameOver ? (
            <svg
              className="relative z-10 w-6 h-6 text-white animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
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
              className="relative z-10 w-8 h-8 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
              style={{ marginLeft: "-1px" }}
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
          {!disabled && !isPlaying && !isGameOver && (
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 opacity-50 blur-xl group-hover:opacity-75 transition-opacity" />
          )}
        </button>

        <span className="text-sm font-medium text-gray-400">
          {isGameOver
            ? "İstatistikler"
            : disabled
            ? "Yükleniyor..."
            : isPlaying
            ? "Stop"
            : "Play"}
        </span>
      </div>
    </div>
  );
}
