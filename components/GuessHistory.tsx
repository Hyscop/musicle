"use client";

import { Guess } from "@/types";
import { MAX_PHASES } from "@/lib/constants";

interface GuessHistoryProps {
  guesses: Guess[];
}

export default function GuessHistory({ guesses }: GuessHistoryProps) {
  const slots = Array.from({ length: MAX_PHASES }, (_, index) => {
    return guesses[index] || null;
  });

  return (
    <div className="w-full space-y-2">
      {slots.map((guess, index) => (
        <div
          key={index}
          className={`
            w-full px-6 py-4 rounded-xl font-medium text-center text-base
            transition-all duration-300 min-h-[56px] flex items-center justify-center
            backdrop-blur-sm
            ${
              guess
                ? guess.isSkipped
                  ? "bg-gray-800/60 text-gray-400 border border-gray-700/50 shadow-lg"
                  : guess.isCorrect
                  ? "bg-gradient-to-r from-green-600/80 to-emerald-600/80 text-white border border-green-500/30 shadow-lg shadow-green-500/20"
                  : "bg-gradient-to-r from-red-600/80 to-rose-600/80 text-white border border-red-500/30 shadow-lg shadow-red-500/20"
                : "bg-gray-900/40 text-gray-600 border border-gray-800/50"
            }
          `}
        >
          {guess ? guess.songTitle : ""}
        </div>
      ))}
    </div>
  );
}
