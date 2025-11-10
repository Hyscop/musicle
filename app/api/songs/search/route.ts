import { NextRequest, NextResponse } from "next/server";
import { searchSongs } from "@/lib/songSearch";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q");

    if (!query || query.length < 2) {
      return NextResponse.json({ songs: [] });
    }

    const songs = await searchSongs(query);

    return NextResponse.json({ songs });
  } catch (error) {
    console.error("Error searching songs:", error);
    return NextResponse.json(
      { error: "Failed to search songs" },
      { status: 500 }
    );
  }
}
