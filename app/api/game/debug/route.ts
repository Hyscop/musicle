/**
 * DEBUG API endpoint to get current game info
 */

import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/sessionStore";

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
        { error: "Game not found or expired" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      title: session.songData.title,
      artist: session.songData.artist,
      answer: session.answer,
      youtubeId: session.songData.youtubeId,
    });
  } catch (error) {
    console.error("Error fetching debug info:", error);
    return NextResponse.json(
      { error: "Failed to fetch debug info" },
      { status: 500 }
    );
  }
}
