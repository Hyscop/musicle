import { Song } from "@/types";
import { normalizeString } from "./utils";
import { SEARCH_THRESHOLD } from "./constants";

function levenshteinDistance(str1: string, str2: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[str2.length][str1.length];
}

function similarity(str1: string, str2: string): number {
  const normalized1 = normalizeString(str1);
  const normalized2 = normalizeString(str2);

  const maxLength = Math.max(normalized1.length, normalized2.length);
  if (maxLength === 0) return 1.0;

  const distance = levenshteinDistance(normalized1, normalized2);
  return 1 - distance / maxLength;
}

export function fuzzySearchSongs(query: string, songs: Song[]): Song[] {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const results = songs.map((song) => {
    const titleScore = similarity(query, song.title);
    const artistScore = similarity(query, song.artist);
    const maxScore = Math.max(titleScore, artistScore);

    return {
      song,
      score: maxScore,
    };
  });

  return results
    .filter((result) => result.score >= SEARCH_THRESHOLD)
    .sort((a, b) => b.score - a.score)
    .map((result) => result.song);
}

export function isCorrectGuess(guess: string, answer: string): boolean {
  const score = similarity(guess, answer);
  return score >= 0.8; // 80% similarity required for correct guess
}
