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
                  ? "bg-gray-800/80 text-gray-300 border-2 border-gray-700/80 shadow-lg"
                  : guess.isCorrect
                  ? "bg-gradient-to-r from-green-600/90 to-emerald-600/90 text-white border-2 border-green-500/50 shadow-lg shadow-green-500/30"
                  : "bg-gradient-to-r from-red-600/90 to-rose-600/90 text-white border-2 border-red-500/50 shadow-lg shadow-red-500/30"
                : "bg-gray-800/60 text-gray-500 border-2 border-gray-700/70"
            }
          `}
        >
          {guess ? (
            guess.isSkipped ? (
              guess.songTitle
            ) : guess.artist ? (
              <div className="flex flex-col">
                <span className="font-semibold">{guess.songTitle}</span>
                <span className="text-sm opacity-80">{guess.artist}</span>
              </div>
            ) : (
              guess.songTitle
            )
          ) : (
            ""
          )}
        </div>
      ))}
    </div>
  );
}
