/**
 * API endpoint to start a new game
 */

import { NextRequest, NextResponse } from "next/server";
import { getRandomSong } from "@/lib/songDatabase";
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

    const song = getRandomSong(category);

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
      soundcloudUrl: song.soundcloudUrl,
      category,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error crating new game:", error);
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
