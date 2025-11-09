/**
 * API endpoint to reveal the answer after game ends
 */

import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/sessionStore";
import { RevealResponse } from "@/types";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const gameId = searchParams.get("gameId");

    if (!gameId) {
      return NextResponse.json({ error: "Missing gameId" }, { status: 400 });
    }

    const session = getSession(gameId);

    if (!session) {
      return NextResponse.json(
        { error: "Game not found pr expired" },
        { status: 404 }
      );
    }

    const response: RevealResponse = {
      title: session.songData.title,
      artist: session.songData.artist,
      soundcloudUrl: session.songData.soundcloudUrl,
      guesses: session.guesses,
      phase: session.phase,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error revealing answer:", error);
    return NextResponse.json(
      { error: "Failed to reveal answer" },
      { status: 500 }
    );
  }
}
