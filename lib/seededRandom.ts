/**
 * Seeded random number generator using mulberry32 algorithm
 * Same seed always produces same sequence of random numbers
 */
export function seededRandom(seed: number): () => number {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Get today's seed based on date (YYYYMMDD format)
 * Same date = same seed = same songs for everyone
 */
export function getTodaySeed(): number {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const dateString = `${year}${month}${day}`;
  return parseInt(dateString);
}

/**
 * Get seed for a specific date (for testing or future dates)
 */
export function getSeedForDate(date: Date): number {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const dateString = `${year}${month}${day}`;
  return parseInt(dateString);
}

/**
 * Shuffle array using seeded random (Fisher-Yates algorithm)
 */
export function seededShuffle<T>(array: T[], seed: number): T[] {
  const shuffled = [...array];
  const rng = seededRandom(seed);

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}
