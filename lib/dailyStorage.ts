/**
 * Daily localStorage management
 * Automatically clears old data when a new day starts
 */

import { getTodaySeed } from "./seededRandom";

const LAST_PLAYED_DATE_KEY = "musicle_last_played_date";

/**
 * Check if it's a new day and clear old data if needed
 */
export function checkAndClearOldData() {
  if (typeof window === "undefined") return;

  const todaySeed = getTodaySeed();
  const lastPlayedDate = localStorage.getItem(LAST_PLAYED_DATE_KEY);

  if (lastPlayedDate && parseInt(lastPlayedDate) !== todaySeed) {
    // Clear all musicle game data
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.startsWith("musicle_state_")) {
        localStorage.removeItem(key);
      }
    });
  }

  // Update last played date
  localStorage.setItem(LAST_PLAYED_DATE_KEY, todaySeed.toString());
}

/**
 * Check if user has already played today
 */
export function hasPlayedToday(category: string): boolean {
  if (typeof window === "undefined") return false;

  const todaySeed = getTodaySeed();
  const key = `musicle_state_${category}`;
  const saved = localStorage.getItem(key);

  if (!saved) return false;

  try {
    const data = JSON.parse(saved);
    // Check if the saved game is from today
    return data.dateSeed === todaySeed;
  } catch {
    return false;
  }
}

/**
 * Save game state with today's date seed
 */
export function saveDailyGameState(
  category: string,
  gameState: Record<string, unknown>
) {
  if (typeof window === "undefined") return;

  const todaySeed = getTodaySeed();
  const stateWithDate = {
    ...gameState,
    dateSeed: todaySeed, // Mark which day this game is from
  };

  localStorage.setItem(
    `musicle_state_${category}`,
    JSON.stringify(stateWithDate)
  );
}

/**
 * Load game state only if it's from today
 */
export function loadDailyGameState(
  category: string
): Record<string, unknown> | null {
  if (typeof window === "undefined") return null;

  const todaySeed = getTodaySeed();
  const saved = localStorage.getItem(`musicle_state_${category}`);

  if (!saved) return null;

  try {
    const data = JSON.parse(saved);

    // Only return data if it's from today
    if (data.dateSeed === todaySeed) {
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Failed to parse saved game state:", error);
    return null;
  }
}
