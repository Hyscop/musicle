import { GameSession } from "@/types";
import { SESSION_EXPIRY } from "./constants";

// In-Memo store //TODO redis ekle
const sessions = new Map<string, GameSession>();

export function setSession(gameId: string, session: GameSession): void {
  sessions.set(gameId, session);

  setTimeout(() => {
    sessions.delete(gameId);
  }, SESSION_EXPIRY * 1000);
}

export function getSession(gameId: string): GameSession | null {
  const session = sessions.get(gameId);

  if (!session) {
    return null;
  }

  const now = Date.now();
  const age = (now - session.createdAt) / 1000;

  if (age > SESSION_EXPIRY) {
    sessions.delete(gameId);
    return null;
  }

  return session;
}

export function updateSession(
  gameId: string,
  updates: Partial<GameSession>
): boolean {
  const session = getSession(gameId);

  if (!session) {
    return false;
  }

  const updatedSession = { ...session, ...updates };
  sessions.set(gameId, updatedSession);
  return true;
}

export function deleteSession(gameId: string): void {
  sessions.delete(gameId);
}

export function clearAllSessions(): void {
  sessions.clear();
}
