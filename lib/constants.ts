export const PHASE_DURATIONS = [0.1, 0.5, 2, 4, 8, 15] as const;

export const MAX_PHASES = 6;

export const CATEGORY_NAMES = {
  all: "Tümü",
  rock: "Rock",
  hiphop: "Hip Hop",
} as const;

export const CATEGORIES = ["all", "rock", "hiphop"] as const;

export const SESSION_EXPIRY = 3600;

export const SEARCH_THRESHOLD = 0.3;

export const MIN_SEARCH_LENGTH = 2;

export const SOUNDCLOUD_WIDGET_API = "https://w.soundcloud.com/player/api.js";
