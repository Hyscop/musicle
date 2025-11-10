/**
 * API endpoint to start a new game
 * Uses daily seeded random selection so everyone gets same songs per day
 */

import { NextRequest, NextResponse } from "next/server";
import { fetchPlaylistSongs } from "@/lib/youtube";
import { setSession } from "@/lib/sessionStore";
import { generateGameId, normalizeString } from "@/lib/utils";
import { getTodaySeed, seededShuffle } from "@/lib/seededRandom";
import { Category, NewGameResponse } from "@/types";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = (searchParams.get("category") || "all") as Category;

    if (!["all", "rock", "hiphop"].includes(category)) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }

    // Fetch songs from YouTube playlist
    const songs = await fetchPlaylistSongs(category);

    if (songs.length === 0) {
      return NextResponse.json(
        { error: "No songs available for this category" },
        { status: 404 }
      );
    }

    // Use today's date as seed to get same songs for everyone today
    const todaySeed = getTodaySeed();

    // Create a category-specific seed (so each category has different songs)
    const categorySeed =
      todaySeed + (category === "all" ? 0 : category === "rock" ? 1000 : 2000);

    // Shuffle songs with seeded random - same order for everyone today
    const shuffledSongs = seededShuffle(songs, categorySeed);

    // Pick the first song (which will be same for everyone today)
    const song = shuffledSongs[0];

    const gameId = generateGameId();

    setSession(gameId, {
      answer: normalizeString(song.title),
      artist: normalizeString(song.artist),
      songData: song,
      phase: 0,
      guesses: [],
      createdAt: Date.now(),
    });

    const response: NewGameResponse = {
      gameId,
      youtubeId: song.youtubeId,
      category,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error creating new game:", error);
    return NextResponse.json(
      {
        error: "Failed to create game",
      },
      {
        status: 500,
      }
    );
  }
}
