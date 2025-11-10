/**
 * API endpoint to start a new game
 */

import { NextRequest, NextResponse } from "next/server";
import { fetchPlaylistSongs } from "@/lib/youtube";
import { setSession } from "@/lib/sessionStore";
import { generateGameId, normalizeString } from "@/lib/utils";
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

    // Pick a random song
    const song = songs[Math.floor(Math.random() * songs.length)];

    const gameId = generateGameId();

    // DEBUG: Log what we're storing
    console.log("🐛 DEBUG - New game created:");
    console.log("  Game ID:", gameId);
    console.log("  Song title:", song.title);
    console.log("  Artist:", song.artist);
    console.log("  Normalized answer:", normalizeString(song.title));
    console.log("  YouTube ID:", song.youtubeId);

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

    // DEBUG: Add song info to response for debugging
    console.log("🐛 DEBUG - Sending response with song info");
    const debugResponse = {
      ...response,
      _debug: {
        title: song.title,
        artist: song.artist,
        normalizedAnswer: normalizeString(song.title),
      },
    };

    return NextResponse.json(debugResponse);
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
