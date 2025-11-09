import { Song, Category } from "@/types";
import songsData from "@/data/songs.json";

export function getAllSongs(): Song[] {
  return songsData.songs as Song[];
}

export function getSongsByCategory(category: Category): Song[] {
  const allSongs = getAllSongs();

  if (category == "all") {
    return allSongs;
  }

  return allSongs.filter((song) => song.category === category);
}

export function getRandomSong(category: Category): Song {
  const songs = getSongsByCategory(category);
  const randomIndex = Math.floor(Math.random() * songs.length);
  return songs[randomIndex];
}

function getSongById(id: string): Song | undefined {
  const allSongs = getAllSongs();
  return allSongs.find((song) => song.id === id);
}

export function searchSongs(query: string, category?: Category): Song[] {
  const songs = category ? getSongsByCategory(category) : getAllSongs();

  if (!query || query.length < 2) {
    return [];
  }

  const normalizedQuery = query.toLowerCase().trim();

  return songs.filter((song) => {
    const titleMatch = song.title.toLowerCase().includes(normalizedQuery);
    const artistMatch = song.artist.toLowerCase().includes(normalizedQuery);
    return titleMatch || artistMatch;
  });
}
