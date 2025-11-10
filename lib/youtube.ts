import { Song, Category } from "@/types";

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const PLAYLIST_IDS = {
  all: process.env.YOUTUBE_PLAYLIST_ALL,
  rock: process.env.YOUTUBE_PLAYLIST_ROCK,
  hiphop: process.env.YOUTUBE_PLAYLIST_HIPHOP,
};

interface YouTubePlaylistItem {
  id: string;
  snippet: {
    title: string;
    videoOwnerChannelTitle?: string;
    resourceId: {
      videoId: string;
    };
  };
}

interface YouTubePlaylistResponse {
  items: YouTubePlaylistItem[];
  nextPageToken?: string;
}

// Cache for songs to avoid hitting API quota - separate cache per category
const songsCacheByCategory: Record<Category, Song[] | null> = {
  all: null,
  rock: null,
  hiphop: null,
};
const cacheTimestamps: Record<Category, number> = {
  all: 0,
  rock: 0,
  hiphop: 0,
};
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

export async function fetchPlaylistSongs(category: Category): Promise<Song[]> {
  // Return cached songs if still valid for this category
  if (
    songsCacheByCategory[category] &&
    Date.now() - cacheTimestamps[category] < CACHE_DURATION
  ) {
    console.log(`🚀 Using cached songs for category: ${category}`);
    return songsCacheByCategory[category]!;
  }

  if (!YOUTUBE_API_KEY) {
    throw new Error("YouTube API key not configured");
  }

  const playlistId = PLAYLIST_IDS[category];
  if (!playlistId) {
    throw new Error(`No playlist configured for category: ${category}`);
  }

  try {
    const songs: Song[] = [];
    let nextPageToken: string | undefined;

    // Fetch all pages of playlist items
    do {
      const url = new URL(
        "https://www.googleapis.com/youtube/v3/playlistItems"
      );
      url.searchParams.set("part", "snippet");
      url.searchParams.set("playlistId", playlistId);
      url.searchParams.set("maxResults", "50");
      url.searchParams.set("key", YOUTUBE_API_KEY);
      if (nextPageToken) {
        url.searchParams.set("pageToken", nextPageToken);
      }

      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.statusText}`);
      }

      const data: YouTubePlaylistResponse = await response.json();

      for (const item of data.items) {
        const title = item.snippet.title;
        const artist = item.snippet.videoOwnerChannelTitle || "Unknown Artist";
        const youtubeId = item.snippet.resourceId.videoId;

        // Parse title if it contains " - " (Artist - Song format)
        let songTitle = title;
        let songArtist = artist;

        if (title.includes(" - ")) {
          const parts = title.split(" - ");
          songArtist = parts[0].trim();
          songTitle = parts.slice(1).join(" - ").trim();
        }

        songs.push({
          id: youtubeId,
          title: songTitle,
          artist: songArtist,
          category: category,
          youtubeId: youtubeId,
        });
      }

      nextPageToken = data.nextPageToken;
    } while (nextPageToken);

    // Cache songs for this category
    songsCacheByCategory[category] = songs;
    cacheTimestamps[category] = Date.now();
    console.log(`✅ Cached ${songs.length} songs for category: ${category}`);

    return songs;
  } catch (error) {
    console.error("Error fetching YouTube playlist:", error);
    throw error;
  }
}

export function clearSongsCache() {
  songsCacheByCategory.all = null;
  songsCacheByCategory.rock = null;
  songsCacheByCategory.hiphop = null;
  cacheTimestamps.all = 0;
  cacheTimestamps.rock = 0;
  cacheTimestamps.hiphop = 0;
}
