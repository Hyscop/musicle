// Song data
export interface Song {
  id: string;
  title: string;
  artist: string;
  category: "all" | "rock" | "hiphop";
  soundcloudUrl: string;
}

// Game phase  (in seconds)
export type GamePhase = 0 | 1 | 2 | 3 | 4 | 5;

// Game state
export interface GameState {
  gameId: string | null;
  currentPhase: GamePhase;
  guesses: Guess[];
  isPlaying: boolean;
  isGameOver: boolean;
  hasWon: boolean;
  selectedCategory: Category;
  soundcloudUrl: string | null;
}

export interface Guess {
  songTitle: string;
  phase: GamePhase;
  isCorrect: boolean;
  isSkipped: boolean;
}

// Category type
export type Category = "all" | "rock" | "hiphop";

// API response
export interface NewGameResponse {
  gameId: string;
  soundcloudUrl: string;
  category: Category;
}

export interface GuessResponse {
  correct: boolean;
  gameOver: boolean;
}

export interface RevealResponse {
  title: string;
  artist: string;
  soundcloudUrl: string;
  guesses: Guess[];
  phase: GamePhase;
}

// Session data
export interface GameSession {
  answer: string;
  artist: string;
  songData: Song;
  phase: GamePhase;
  guesses: Guess[];
  createdAt: number;
}
