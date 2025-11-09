"use client";

import { GamePhase } from "@/types";
import { PHASE_DURATIONS } from "@/lib/constants";
import { formatDuration } from "@/lib/utils";

interface ProgressBarProps {
  currentPhase: GamePhase;
  progress: number;
  elapsedTime: number;
  totalPlayDuration: number;
  isPlaying: boolean;
}

export default function ProgressBar({
  currentPhase,
  elapsedTime,
}: ProgressBarProps) {
  const adjustedDurations = PHASE_DURATIONS.map((d, i) =>
    i === 0 ? d * 3 : d
  );
  const adjustedTotal = adjustedDurations.reduce((sum, d) => sum + d, 0);

  const currentPhaseDuration = PHASE_DURATIONS[currentPhase];

  const cumulativeDuration = adjustedDurations
    .slice(0, currentPhase + 1)
    .reduce((sum, duration) => sum + duration, 0);

  const positionPercentage = (cumulativeDuration / adjustedTotal) * 100;

  // Real total duration for audio
  const totalDuration = PHASE_DURATIONS.reduce(
    (sum, duration) => sum + duration,
    0
  );

  return (
    <div className="w-[140%] -ml-[20%] relative pt-10 pb-2">
      <div
        className="absolute top-0 transition-all duration-300 flex flex-col items-center z-10"
        style={{
          left: `calc(${positionPercentage}% + 2px)`,
          transform: "translateX(-50%)",
        }}
      >
        <span className="text-xs text-purple-300 font-semibold mb-0 bg-gray-900/95 px-3 py-1.5 rounded-full border border-purple-500/40 shadow-lg">
          {formatDuration(currentPhaseDuration)}
        </span>
        <div className="text-purple-400 text-base leading-none">▼</div>
      </div>

      <div className="relative mt-1 h-6 bg-transparent">
        <div className="absolute inset-0 flex gap-0.5">
          {PHASE_DURATIONS.map((duration, index) => {
            const adjustedDuration = adjustedDurations[index];
            const widthPercentage = (adjustedDuration / adjustedTotal) * 100;

            const segmentStart = PHASE_DURATIONS.slice(0, index).reduce(
              (sum, d) => sum + d,
              0
            );
            const segmentEnd = segmentStart + duration;

            let segmentFillPercentage = 0;

            const epsilon = 0.001;
            if (
              elapsedTime >= segmentStart &&
              elapsedTime < segmentEnd + epsilon
            ) {
              const filledInSegment = elapsedTime - segmentStart;
              segmentFillPercentage = Math.min(
                (filledInSegment / duration) * 100,
                100
              );
            } else if (elapsedTime >= segmentEnd + epsilon) {
              segmentFillPercentage = 100;
            }

            const gradientStartPercent = (segmentStart / totalDuration) * 100;
            const gradientEndPercent = (segmentEnd / totalDuration) * 100;

            const startHue = 270 - (gradientStartPercent / 100) * 60;
            const endHue = 270 - (gradientEndPercent / 100) * 60;

            const isFirst = index === 0;
            const isLast = index === PHASE_DURATIONS.length - 1;
            const roundedClass = isFirst
              ? "rounded-l-lg"
              : isLast
              ? "rounded-r-lg"
              : "";

            return (
              <div
                key={index}
                style={{ width: `${widthPercentage}%` }}
                className={`relative h-full bg-gray-900/50 overflow-hidden backdrop-blur-sm border border-gray-800/50 shadow-lg ${roundedClass}`}
              >
                <div
                  style={{
                    width: `${segmentFillPercentage}%`,
                    background: `linear-gradient(to right, 
                      hsl(${startHue}, 70%, 60%), 
                      hsl(${endHue}, 70%, 60%)
                    )`,
                  }}
                  className="absolute inset-y-0 left-0"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
