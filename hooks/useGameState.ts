"use client";

import { useState, useCallback } from "react";
import { GameState, Category, GamePhase, Guess } from "@/types";

const initialState: GameState = {
  gameId: null,
  currentPhase: 0,
  guesses: [],
  isPlaying: false,
  isGameOver: false,
  hasWon: false,
  selectedCategory: "all",
  soundcloudUrl: null,
};

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(initialState);

  const startNewGame = useCallback(async (category: Category) => {
    try {
      const response = await fetch(`/api/game/new?category=${category}`);
      const data = await response.json();

      setGameState({
        gameId: data.gameId,
        currentPhase: 0,
        guesses: [],
        isPlaying: false,
        isGameOver: false,
        hasWon: false,
        selectedCategory: category,
        soundcloudUrl: data.soundcloudUrl,
      });

      return data;
    } catch (error) {
      console.error("Failed to start new game:", error);
      throw error;
    }
  }, []);

  const submitGuess = useCallback(
    async (guess: string) => {
      if (!gameState.gameId) return;

      try {
        const response = await fetch("/api/game/guess", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            gameId: gameState.gameId,
            guess,
            phase: gameState.currentPhase,
          }),
        });

        const data = await response.json();

        const newGuess: Guess = {
          songTitle: guess,
          phase: gameState.currentPhase,
          isCorrect: data.correct,
          isSkipped: false,
        };

        setGameState((prev) => ({
          ...prev,
          guesses: [...prev.guesses, newGuess],
          isGameOver: data.gameOver,
          hasWon: data.correct,
        }));

        return data;
      } catch (error) {
        console.error("Failed to submit guess:", error);
        throw error;
      }
    },
    [gameState.gameId, gameState.currentPhase]
  );

  const skipPhase = useCallback(() => {
    setGameState((prev) => {
      const skippedGuess: Guess = {
        songTitle: "Geçildi",
        phase: prev.currentPhase,
        isCorrect: false,
        isSkipped: true,
      };

      const nextPhase = Math.min(prev.currentPhase + 1, 5) as GamePhase;
      const newGuesses = [...prev.guesses, skippedGuess];

      const isGameOver = newGuesses.length >= 6;

      return {
        ...prev,
        guesses: newGuesses,
        currentPhase: nextPhase,
        isGameOver,
        isPlaying: false,
      };
    });
  }, []);

  const advancePhase = useCallback(() => {
    setGameState((prev) => {
      const nextPhase = Math.min(prev.currentPhase + 1, 5) as GamePhase;

      const isGameOver = prev.guesses.length >= 6;
      return {
        ...prev,
        currentPhase: nextPhase,
        isGameOver,
      };
    });
  }, []);

  const setPlaying = useCallback((playing: boolean) => {
    setGameState((prev) => ({ ...prev, isPlaying: playing }));
  }, []);

  const changeCategory = useCallback(
    async (category: Category) => {
      await startNewGame(category);
    },
    [startNewGame]
  );

  const resetGame = useCallback(() => {
    setGameState(initialState);
  }, []);

  return {
    gameState,
    startNewGame,
    submitGuess,
    skipPhase,
    advancePhase,
    setPlaying,
    changeCategory,
    resetGame,
  };
}
