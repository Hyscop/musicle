"use client";

import { useState, useEffect, useRef } from "react";
import { Montserrat } from "next/font/google";
import CategorySelector from "@/components/CategorySelector";
import ProgressBar from "@/components/ProgressBar";
import GuessInput from "@/components/GuessInput";
import AudioPlayer from "@/components/AudioPlayer";
import ResultModal from "@/components/ResultModal";
import GuessHistory from "@/components/GuessHistory";
import { useGameState } from "@/hooks/useGameState";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { Category } from "@/types";

const montserrat = Montserrat({
  weight: ["700"],
  subsets: ["latin"],
});

export default function Home() {
  const {
    gameState,
    submitGuess,
    skipPhase,
    advancePhase,
    changeCategory,
    markModalAsSeen,
    reopenModal,
    clearAllData,
  } = useGameState();

  const {
    iframeRef,
    isPlaying,
    progress,
    elapsedTime,
    totalPlayDuration,
    isPlayerReady,
    playPhase,
    stopPlaying,
    resetForNewPhase,
  } = useAudioPlayer(gameState.youtubeId);

  const modalIframeRef = useRef<HTMLIFrameElement>(null);
  const [categoryKey, setCategoryKey] = useState(0);

  // Expose clearMusicleData for production debugging/testing
  useEffect(() => {
    if (typeof window !== "undefined") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).clearMusicleData = clearAllData;
    }
  }, [clearAllData]);

  useEffect(() => {
    changeCategory("all");
  }, [changeCategory]);

  const handlePlay = () => {
    if (isPlaying) {
      stopPlaying();
    } else {
      playPhase(gameState.currentPhase);
    }
  };

  const handleGuess = async (songTitle: string, artist?: string) => {
    stopPlaying();
    const result = await submitGuess(songTitle, artist);

    if (!result.correct && !result.gameOver) {
      advancePhase();
    }
  };

  const handleSkip = () => {
    stopPlaying();
    resetForNewPhase();
    skipPhase();
  };

  const handleNextCategory = () => {
    markModalAsSeen();
    stopPlaying();

    const CATEGORY_SEQUENCE: Category[] = ["all", "rock", "hiphop"];
    const currentIndex = CATEGORY_SEQUENCE.indexOf(gameState.selectedCategory);
    const nextCategory =
      currentIndex < CATEGORY_SEQUENCE.length - 1
        ? CATEGORY_SEQUENCE[currentIndex + 1]
        : CATEGORY_SEQUENCE[0];

    changeCategory(nextCategory).then((data) => {
      if (data._debug) {
      }
    });
  };

  const handleCloseModal = () => {
    markModalAsSeen();
    stopPlaying();
  };

  const handleOpenStats = () => {
    reopenModal();
  };

  const handleCategoryChange = (category: Category) => {
    stopPlaying();
    resetForNewPhase();

    changeCategory(category);

    setTimeout(() => setCategoryKey((prev) => prev + 1), 0);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white">
      <div className="container mx-auto px-6 sm:px-8 py-6 max-w-4xl">
        <h1
          className={`${montserrat.className} text-5xl sm:text-6xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent tracking-wide`}
        >
          Müzikle
        </h1>

        <div className="space-y-8 overflow-visible">
          <CategorySelector
            selectedCategory={gameState.selectedCategory}
            onCategoryChange={handleCategoryChange}
            disabled={false}
          />

          <GuessHistory guesses={gameState.guesses} />

          <ProgressBar
            currentPhase={gameState.currentPhase}
            progress={progress}
            elapsedTime={elapsedTime}
            totalPlayDuration={totalPlayDuration}
            isPlaying={isPlaying}
          />

          <AudioPlayer
            youtubeId={gameState.youtubeId}
            currentPhase={gameState.currentPhase}
            isPlaying={isPlaying}
            onPlay={handlePlay}
            iframeRef={iframeRef}
            disabled={!isPlayerReady}
            isGameOver={gameState.isGameOver}
            onShowStats={handleOpenStats}
          />

          <GuessInput
            key={categoryKey}
            onGuess={handleGuess}
            onSkip={handleSkip}
            disabled={gameState.isGameOver || isPlaying}
          />
        </div>

        {/* Modal always rendered but controlled by z-index and opacity */}
        {gameState.revealedSong && gameState.isGameOver && (
          <ResultModal
            isOpen={!gameState.hasSeenModal}
            hasWon={gameState.hasWon}
            songTitle={gameState.revealedSong.title}
            artist={gameState.revealedSong.artist}
            youtubeId={gameState.youtubeId || ""}
            attempts={gameState.guesses.length}
            currentCategory={gameState.selectedCategory}
            onNext={handleNextCategory}
            onClose={handleCloseModal}
            modalIframeRef={modalIframeRef}
            shouldAutoPlay={!gameState.hasSeenModal}
          />
        )}

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-800/50">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-400 text-sm">
            <a
              href="https://www.hyscop.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition-colors duration-200"
            >
              🌐 hyscop.com
            </a>
            <span className="hidden sm:inline text-gray-600">•</span>
            <a
              href="https://x.com/hyscopp"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition-colors duration-200 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              @hyscopp
            </a>
            <span className="hidden sm:inline text-gray-600">•</span>
            <a
              href="https://github.com/Hyscop/musicle"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition-colors duration-200 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
          </div>
          <div className="text-center mt-4 text-gray-500 text-xs">
            Last edited: 10.11.2025
          </div>
        </footer>
      </div>
    </main>
  );
}
