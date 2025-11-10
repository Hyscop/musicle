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
  youtubeId: null,
  completedCategories: [],
};

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(initialState);

  const startNewGame = useCallback(async (category: Category) => {
    try {
      const response = await fetch(`/api/game/new?category=${category}`);
      const data = await response.json();

      setGameState((prev) => {
        const newState: GameState = {
          gameId: data.gameId,
          currentPhase: 0 as GamePhase,
          guesses: [],
          isPlaying: false,
          isGameOver: false,
          hasWon: false,
          selectedCategory: category,
          youtubeId: data.youtubeId,
          completedCategories: prev.completedCategories,
        };
        return newState;
      });

      return data;
    } catch (error) {
      console.error("Failed to start new game:", error);
      throw error;
    }
  }, []);

  const submitGuess = useCallback(
    async (guess: string, artist?: string) => {
      if (!gameState.gameId) {
        return;
      }

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
          artist: artist,
          phase: gameState.currentPhase,
          isCorrect: data.correct,
          isSkipped: false,
        };

        setGameState((prev) => {
          const newState = {
            ...prev,
            guesses: [...prev.guesses, newGuess],
            isGameOver: data.gameOver,
            hasWon: data.correct,
          };
          return newState;
        });

        return data;
      } catch (error) {
        console.error("Failed to submit guess:", error);
        throw error;
      }
    },
    [gameState]
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

      const newState = {
        ...prev,
        guesses: newGuesses,
        currentPhase: nextPhase,
        isGameOver,
        isPlaying: false,
      };

      return newState;
    });
  }, []);

  const advancePhase = useCallback(() => {
    setGameState((prev) => {
      const nextPhase = Math.min(prev.currentPhase + 1, 5) as GamePhase;

      const isGameOver = prev.guesses.length >= 6;

      const newState = {
        ...prev,
        currentPhase: nextPhase,
        isGameOver,
      };

      return newState;
    });
  }, []);

  const setPlaying = useCallback((playing: boolean) => {
    setGameState((prev) => ({ ...prev, isPlaying: playing }));
  }, []);

  const changeCategory = useCallback(
    async (category: Category) => {
      return await startNewGame(category);
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
