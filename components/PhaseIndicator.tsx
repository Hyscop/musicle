"use client";

import { GamePhase } from "@/types";
import { PHASE_DURATIONS, MAX_PHASES } from "@/lib/constants";
import { formatDuration } from "@/lib/utils";

interface PhaseIndicatorProps {
  currentPhase: GamePhase;
  isGameOver: boolean;
}

export default function PhaseIndicator({
  currentPhase,
  isGameOver,
}: PhaseIndicatorProps) {
  const duration = PHASE_DURATIONS[currentPhase];

  return (
    <div className="text-center mb-6">
      <div className="text-gray-400 text-sm mb-2">
        {isGameOver ? (
          <span>Oyun Bitti</span>
        ) : (
          <span>
            Deneme {currentPhase + 1}/{MAX_PHASES}
          </span>
        )}
      </div>
      {!isGameOver && (
        <div className="text-2xl font-bold text-white">
          {formatDuration(duration)}
        </div>
      )}
    </div>
  );
}
