"use client";

import { useState, useMemo, useRef } from "react";
import { searchSongs } from "@/lib/songDatabase";
import { Song } from "@/types";

interface GuessInputProps {
  onGuess: (songTitle: string) => void;
  onSkip: () => void;
  disabled?: boolean;
}

export default function GuessInput({
  onGuess,
  onSkip,
  disabled = false,
}: GuessInputProps) {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  
  const results = useMemo(() => {
    if (query.length >= 2) {
      return searchSongs(query);
    }
    return [];
  }, [query]);

  const handleSelect = (song: Song) => {
    setQuery("");
    setShowDropdown(false);
    onGuess(song.title);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && results.length > 0) {
      e.preventDefault();
      handleSelect(results[0]);
    }
  };

  const handleSkip = () => {
    setQuery("");
    setShowDropdown(false);
    onSkip();
  };

  return (
    <div className="w-full relative">
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            placeholder="Şarkı ara..."
            disabled={disabled}
            className="w-full px-5 py-3.5 bg-gray-900/40 text-white rounded-xl 
                     border border-gray-800/50 focus:border-purple-500/50 
                     focus:outline-none text-base placeholder-gray-500
                     disabled:opacity-50 disabled:cursor-not-allowed
                     backdrop-blur-sm transition-all duration-300"
          />

          
          {showDropdown && results.length > 0 && !disabled && (
            <div
              className="absolute bottom-full left-0 right-0 mb-2 bg-gray-900/95 
                          rounded-xl border border-gray-800/50 max-h-80 overflow-y-auto z-[100]
                          backdrop-blur-lg shadow-2xl"
            >
              {results.map((song) => (
                <button
                  key={song.id}
                  onClick={() => handleSelect(song)}
                  className="w-full px-5 py-3.5 text-left hover:bg-purple-600/20 
                           transition-all duration-200 border-b border-gray-800/30 last:border-b-0
                           first:rounded-t-xl last:rounded-b-xl"
                >
                  <div className="text-white font-medium">{song.title}</div>
                  <div className="text-gray-400 text-sm">{song.artist}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={handleSkip}
          disabled={disabled}
          className="px-8 py-3.5 bg-gray-900/60 text-gray-300 rounded-xl font-medium
                   hover:bg-gray-800/80 hover:text-white transition-all duration-300
                   disabled:opacity-50 disabled:cursor-not-allowed
                   backdrop-blur-sm border border-gray-800/50"
        >
          Atla
        </button>
      </div>
    </div>
  );
}
