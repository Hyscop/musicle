import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateGameId(): string {
  return `game_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
}

export function normalizeString(str: string): string {
  return str
    .toLocaleLowerCase("tr-TR") // Use Turkish locale for proper İ → i conversion
    .trim()
    .replace(/\s+/g, " ") // Normalize multiple spaces to single space
    .replace(/[!?.,;:()\[\]{}"'`]/g, "") // Remove punctuation but keep letters
    .trim();
}

export function isMatch(str1: string, str2: string): boolean {
  const normalized1 = normalizeString(str1);
  const normalized2 = normalizeString(str2);
  return normalized1.includes(normalized2) || normalized2.includes(normalized1);
}

export function formatDuration(seconds: number): string {
  if (seconds < 1) {
    return `${seconds.toFixed(1)}s`;
  }
  return `${seconds}s`;
}
