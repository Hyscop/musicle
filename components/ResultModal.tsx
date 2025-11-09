"use client";

import { useEffect } from "react";

interface ResultModalProps {
  isOpen: boolean;
  hasWon: boolean;
  songTitle: string;
  artist: string;
  attempts: number;
  onPlayAgain: () => void;
}

export default function ResultModal({
  isOpen,
  hasWon,
  songTitle,
  artist,
  attempts,
  onPlayAgain,
}: ResultModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900/30 rounded-3xl p-8 max-w-md w-full border border-purple-500/20 shadow-2xl shadow-purple-500/10">
        <div className="text-center">
          <div className="text-6xl mb-4">{hasWon ? "🎉" : "🎵"}</div>

          <h2
            className={`text-3xl font-bold mb-6 ${
              hasWon
                ? "bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent"
                : "bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            }`}
          >
            {hasWon ? "Tebrikler!" : "Oyun Bitti"}
          </h2>

          <div className="mb-8 p-6 bg-gray-900/60 rounded-2xl backdrop-blur-sm border border-gray-800/50">
            <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">
              Şarkı
            </p>
            <p className="text-2xl font-bold text-white mb-1">{songTitle}</p>
            <p className="text-lg text-gray-300">{artist}</p>
          </div>

          {hasWon && (
            <div className="mb-8">
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">
                Deneme Sayısı
              </p>
              <p className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                {attempts}/6
              </p>
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={onPlayAgain}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/30 hover:scale-105"
            >
              Yeni Oyun
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
