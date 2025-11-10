"use client";

import { useState, useCallback, useEffect } from "react";
import { GameState, Category, GamePhase, Guess } from "@/types";
import {
  checkAndClearOldData,
  saveDailyGameState,
  loadDailyGameState,
} from "@/lib/dailyStorage";

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

  // Check for new day on mount
  useEffect(() => {
    checkAndClearOldData();
  }, []);

  // Save current state to localStorage whenever it changes (with daily seed)
  const saveGameState = useCallback((state: GameState) => {
    if (typeof window !== "undefined" && state.selectedCategory) {
      const stateToSave = {
        gameId: state.gameId,
        currentPhase: state.currentPhase,
        guesses: state.guesses,
        isGameOver: state.isGameOver,
        hasWon: state.hasWon,
        youtubeId: state.youtubeId,
        hasSeenModal: state.hasSeenModal,
        revealedSong: state.revealedSong,
      };
      saveDailyGameState(state.selectedCategory, stateToSave);
    }
  }, []);


  const loadGameState = useCallback(
    (category: Category): GameState | null => {
      if (typeof window !== "undefined") {
        const saved = loadDailyGameState(category);
        if (saved) {
          return {
            ...saved,
            isPlaying: false,
            selectedCategory: category,
            completedCategories: gameState.completedCategories,
          } as GameState;
        }
      }
      return null;
    },
    [gameState.completedCategories]
  );

  const startNewGame = useCallback(
    async (category: Category) => {
      try {
        const response = await fetch(`/api/game/new?category=${category}`);
        const data = await response.json();

      
        const newState: GameState = {
          gameId: data.gameId,
          currentPhase: 0 as GamePhase,
          guesses: [],
          isPlaying: false,
          isGameOver: false,
          hasWon: false,
          selectedCategory: category,
          youtubeId: data.youtubeId,
          completedCategories: gameState.completedCategories,
          hasSeenModal: false, 
        };

       
        if (typeof window !== "undefined") {
          const stateToSave = {
            gameId: newState.gameId,
            currentPhase: newState.currentPhase,
            guesses: newState.guesses,
            isGameOver: newState.isGameOver,
            hasWon: newState.hasWon,
            youtubeId: newState.youtubeId,
            hasSeenModal: newState.hasSeenModal,
            revealedSong: newState.revealedSong,
          };
          saveDailyGameState(category, stateToSave);
        }

       
        setGameState(newState);

        return data;
      } catch (error) {
        console.error("Failed to start new game:", error);
        throw error;
      }
    },
    [gameState.completedCategories]
  );

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
          saveGameState(newState);
          return newState;
        });

        return data;
      } catch (error) {
        console.error("Failed to submit guess:", error);
        throw error;
      }
    },
    [gameState, saveGameState]
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

      saveGameState(newState);
      return newState;
    });
  }, [saveGameState]);

  const advancePhase = useCallback(() => {
    setGameState((prev) => {
      const nextPhase = Math.min(prev.currentPhase + 1, 5) as GamePhase;

      const isGameOver = prev.guesses.length >= 6;

      const newState = {
        ...prev,
        currentPhase: nextPhase,
        isGameOver,
      };

      saveGameState(newState);
      return newState;
    });
  }, [saveGameState]);

  const setPlaying = useCallback((playing: boolean) => {
    setGameState((prev) => ({ ...prev, isPlaying: playing }));
  }, []);

  const changeCategory = useCallback(
    async (category: Category) => {
     
      const savedState = loadGameState(category);

      if (savedState && savedState.gameId) {
       
        setGameState(savedState);
        return { gameId: savedState.gameId, youtubeId: savedState.youtubeId };
      } else {
        
        return await startNewGame(category);
      }
    },
    [startNewGame, loadGameState]
  );

  const resetGame = useCallback(() => {
    setGameState(initialState);
    
    if (typeof window !== "undefined") {
      localStorage.removeItem("musicle_state_all");
      localStorage.removeItem("musicle_state_rock");
      localStorage.removeItem("musicle_state_hiphop");
    }
  }, []);

  const clearAllData = useCallback(() => {
    
    if (typeof window !== "undefined") {
     
      const keys = Object.keys(localStorage);
      keys.forEach((key) => {
        if (key.startsWith("musicle_")) {
          localStorage.removeItem(key);
        }
      });
    }
    setGameState(initialState);
  
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  }, []);

  const markModalAsSeen = useCallback(() => {
    setGameState((prev) => {
      const newState = {
        ...prev,
        hasSeenModal: true,
      };
      saveGameState(newState);
      return newState;
    });
  }, [saveGameState]);

  const reopenModal = useCallback(() => {
    setGameState((prev) => {
      const newState = {
        ...prev,
        hasSeenModal: false,
      };
      saveGameState(newState);
      return newState;
    });
  }, [saveGameState]);

  const setRevealedSongData = useCallback(
    (songData: { title: string; artist: string } | null) => {
      setGameState((prev) => {
        const newState = {
          ...prev,
          revealedSong: songData,
        };
        saveGameState(newState);
        return newState;
      });
    },
    [saveGameState]
  );

  return {
    gameState,
    startNewGame,
    submitGuess,
    skipPhase,
    advancePhase,
    setPlaying,
    changeCategory,
    resetGame,
    markModalAsSeen,
    reopenModal,
    setRevealedSongData,
    clearAllData,
  };
}
