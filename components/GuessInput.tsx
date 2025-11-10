"use client";

import { useState, useEffect, useRef } from "react";
import { Song } from "@/types";

interface GuessInputProps {
  onGuess: (songTitle: string, artist?: string) => void;
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
  const [results, setResults] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (query.length < 2) {
      const timer = setTimeout(() => {
        setResults([]);
        setIsLoading(false);
      }, 0);
      return () => clearTimeout(timer);
    }

    setIsLoading(true);
    const timer = setTimeout(async () => {
      try {
        const response = await fetch(
          `/api/songs/search?q=${encodeURIComponent(query)}`
        );
        if (response.ok) {
          const data = await response.json();
          setResults(data.songs || []);
        }
      } catch {
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (song: Song) => {
    setQuery("");
    setShowDropdown(false);
    onGuess(song.title, song.artist);
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
            className="w-full px-5 py-3.5 bg-gray-800/80 text-white rounded-xl 
                     border-2 border-gray-700/80 focus:border-purple-500/80 
                     focus:outline-none text-base placeholder-gray-400
                     disabled:opacity-50 focus:bg-gray-800/90
                     backdrop-blur-sm transition-all duration-300 shadow-lg"
          />

          {showDropdown && query.length >= 2 && !disabled && (
            <div
              className="absolute bottom-full left-0 right-0 mb-2 bg-gray-800/98 
                          rounded-xl border-2 border-gray-700/80 max-h-80 overflow-y-auto z-[100]
                          backdrop-blur-lg shadow-2xl shadow-black/50"
            >
              {isLoading ? (
                <div className="px-5 py-8 text-center">
                  <div className="inline-block w-8 h-8 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
                  <p className="text-gray-400 text-sm mt-3">
                    Şarkılar yükleniyor...
                  </p>
                </div>
              ) : results.length > 0 ? (
                results.map((song) => (
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
                ))
              ) : (
                <div className="px-5 py-4 text-center text-gray-500">
                  Sonuç bulunamadı
                </div>
              )}
            </div>
          )}
        </div>

        <button
          onClick={handleSkip}
          disabled={disabled}
          className="px-8 py-3.5 bg-gray-800/80 text-gray-200 rounded-xl font-medium
                   hover:bg-gray-700/90 hover:text-white transition-all duration-300
                   disabled:opacity-50 
                   backdrop-blur-sm border-2 border-gray-700/80 shadow-lg"
        >
          Atla
        </button>
      </div>
    </div>
  );
}
