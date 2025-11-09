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

    if (!gameId || !guess || phase === undefined) {
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
      return NextResponse.json(
        { error: "Game not found or expired" },
        { status: 404 }
      );
    }

    const normalizedGuess = normalizeString(guess);

    const correct = isCorrectGuess(normalizedGuess, session.answer);

    const updatedGuesses = [
      ...session.guesses,
      {
        songTitle: guess,
        phase: phase as GamePhase,
        isCorrect: correct,
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
    console.error("Error process,ng guess:", error);
    return NextResponse.json(
      { error: "Failed to process guess" },
      { status: 500 }
    );
  }
}
