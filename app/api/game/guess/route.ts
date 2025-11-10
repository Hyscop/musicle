/**
 * API endpoint to submit a guess
 */

import { NextRequest, NextResponse } from "next/server";
import { getSession, updateSession } from "@/lib/sessionStore";
import { isCorrectGuess } from "@/lib/fuzzySearch";
import { normalizeString } from "@/lib/utils";
import { GuessResponse, GamePhase } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { gameId, guess, phase } = body;

    console.log("🐛 DEBUG - Received guess request:");
    console.log("  Game ID:", gameId);
    console.log("  Guess:", guess);
    console.log("  Phase:", phase);

    if (!gameId || !guess || phase === undefined) {
      console.log("❌ Missing required fields");
      return NextResponse.json(
        {
          error: "Missing required fields",
        },
        {
          status: 400,
        }
      );
    }

    const session = getSession(gameId);

    if (!session) {
      console.log("❌ Session not found for gameId:", gameId);
      return NextResponse.json(
        { error: "Game not found or expired" },
        { status: 404 }
      );
    }

    const normalizedGuess = normalizeString(guess);

    // DEBUG: Log comparison details
    console.log("🐛 DEBUG - Guess comparison:");
    console.log("  Original guess:", guess);
    console.log("  Normalized guess:", normalizedGuess);
    console.log("  Answer (stored):", session.answer);
    console.log("  Song title:", session.songData?.title);
    console.log("  Artist:", session.songData?.artist);

    const correct = isCorrectGuess(normalizedGuess, session.answer);
    console.log("  Result:", correct ? "✅ CORRECT" : "❌ WRONG");

    const updatedGuesses = [
      ...session.guesses,
      {
        songTitle: guess,
        phase: phase as GamePhase,
        isCorrect: correct,
        isSkipped: false,
      },
    ];

    updateSession(gameId, {
      guesses: updatedGuesses,
      phase: phase as GamePhase,
    });

    const gameOver = correct || phase >= 5;

    const response: GuessResponse = {
      correct,
      gameOver,
    };
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error processing guess:", error);
    return NextResponse.json(
      { error: "Failed to process guess" },
      { status: 500 }
    );
  }
}
