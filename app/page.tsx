"use client";

import { useState, useEffect } from "react";
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
    startNewGame,
    submitGuess,
    skipPhase,
    advancePhase,
    setPlaying,
    changeCategory,
  } = useGameState();

  const {
    iframeRef,
    isPlaying,
    progress,
    elapsedTime,
    totalPlayDuration,
    playPhase,
    stopPlaying,
    playFull,
    resetForNewPhase,
  } = useAudioPlayer(gameState.soundcloudUrl);

  const [revealedSong, setRevealedSong] = useState<{
    title: string;
    artist: string;
  } | null>(null);

  useEffect(() => {
    startNewGame("all");
  }, [startNewGame]);

  useEffect(() => {
    if (gameState.isGameOver && gameState.gameId) {
      fetch(`/api/game/reveal?gameId=${gameState.gameId}`)
        .then((res) => res.json())
        .then((data) => {
          setRevealedSong({ title: data.title, artist: data.artist });
          playFull();
        });
    }
  }, [gameState.isGameOver, gameState.gameId, playFull]);

  const handlePlay = () => {
    if (isPlaying) {
      stopPlaying();
    } else {
      playPhase(gameState.currentPhase);
    }
  };

  const handleGuess = async (songTitle: string) => {
    stopPlaying();

    const result = await submitGuess(songTitle);

    if (!result.correct && !result.gameOver) {
      advancePhase(); 
    }
  };

  const handleSkip = () => {
    stopPlaying();
    resetForNewPhase();
    skipPhase();
  };

  const handlePlayAgain = () => {
    setRevealedSong(null);
    stopPlaying();
    startNewGame(gameState.selectedCategory);
  };

  const handleCategoryChange = (category: Category) => {
    setRevealedSong(null);
    stopPlaying();
    setPlaying(false);
    resetForNewPhase();
    changeCategory(category);
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
            soundcloudUrl={gameState.soundcloudUrl}
            currentPhase={gameState.currentPhase}
            isPlaying={isPlaying}
            onPlay={handlePlay}
            iframeRef={iframeRef}
            disabled={gameState.isGameOver}
          />

          <GuessInput
            onGuess={handleGuess}
            onSkip={handleSkip}
            disabled={gameState.isGameOver || isPlaying}
          />
        </div>

        {revealedSong && (
          <ResultModal
            isOpen={gameState.isGameOver}
            hasWon={gameState.hasWon}
            songTitle={revealedSong.title}
            artist={revealedSong.artist}
            attempts={gameState.guesses.length}
            onPlayAgain={handlePlayAgain}
          />
        )}
      </div>
    </main>
  );
}
