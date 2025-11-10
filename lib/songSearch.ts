import { Song } from "@/types";
import { fetchPlaylistSongs } from "./youtube";

// Use globalThis to persist cache across hot reloads
const globalForSongCache = globalThis as unknown as {
  allSongsCache: Song[] | undefined;
  cacheInitialized: boolean | undefined;
  cacheTimestamp: number | undefined;
};

let allSongsCache = globalForSongCache.allSongsCache ?? [];
let cacheInitialized = globalForSongCache.cacheInitialized ?? false;
let cacheTimestamp = globalForSongCache.cacheTimestamp ?? 0;

// Cache expires after 24 hours
const CACHE_DURATION = 24 * 60 * 60 * 1000;

function isCacheExpired(): boolean {
  if (!cacheTimestamp) return true;
  return Date.now() - cacheTimestamp > CACHE_DURATION;
}

export async function initializeSongDatabase() {
  if (cacheInitialized && !isCacheExpired()) {
    console.log(
      `Using cached song database with ${allSongsCache.length} songs`
    );
    return;
  }

  if (isCacheExpired() && cacheInitialized) {
    console.log(" Cache expired, refreshing song database...");
  }

  try {
    console.log("🔍 Initializing song database with all categories...");

    // Fetch all categories in parallel
    const [allSongs, rockSongs, hiphopSongs] = await Promise.all([
      fetchPlaylistSongs("all"),
      fetchPlaylistSongs("rock"),
      fetchPlaylistSongs("hiphop"),
    ]);

    // Combine all songs and remove duplicates based on youtubeId
    const songsMap = new Map<string, Song>();

    [...allSongs, ...rockSongs, ...hiphopSongs].forEach((song) => {
      if (!songsMap.has(song.youtubeId)) {
        songsMap.set(song.youtubeId, song);
      }
    });

    allSongsCache = Array.from(songsMap.values());
    cacheInitialized = true;
    cacheTimestamp = Date.now();

    // Persist to globalThis
    globalForSongCache.allSongsCache = allSongsCache;
    globalForSongCache.cacheInitialized = true;
    globalForSongCache.cacheTimestamp = cacheTimestamp;

    console.log(
      `Song database initialized with ${allSongsCache.length} unique songs`
    );
  } catch (error) {
    console.error("Failed to initialize song database:", error);
  }
}

export async function searchSongs(query: string): Promise<Song[]> {
  if (!cacheInitialized) {
    await initializeSongDatabase();
  }

  const normalizedQuery = query.toLowerCase().trim();

  if (normalizedQuery.length < 2) {
    return [];
  }

  return allSongsCache
    .filter((song) => {
      const titleMatch = song.title.toLowerCase().includes(normalizedQuery);
      const artistMatch = song.artist.toLowerCase().includes(normalizedQuery);
      return titleMatch || artistMatch;
    })
    .slice(0, 10); // Limit to 10 results
}
