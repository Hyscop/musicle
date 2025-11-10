// Song data
export interface Song {
  id: string;
  title: string;
  artist: string;
  category: "all" | "rock" | "hiphop";
  youtubeId: string;
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
  youtubeId: string | null;
  completedCategories: Category[];
  hasSeenModal?: boolean; 
  revealedSong?: { title: string; artist: string } | null;
}

export interface Guess {
  songTitle: string;
  artist?: string;
  phase: GamePhase;
  isCorrect: boolean;
  isSkipped: boolean;
}

// Category type
export type Category = "all" | "rock" | "hiphop";

// API response
export interface NewGameResponse {
  gameId: string;
  youtubeId: string;
  category: Category;
}

export interface GuessResponse {
  correct: boolean;
  gameOver: boolean;
}

export interface RevealResponse {
  title: string;
  artist: string;
  youtubeId: string;
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
