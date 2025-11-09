"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { GamePhase } from "@/types";
import { PHASE_DURATIONS } from "@/lib/constants";

interface SoundCloudWidget {
  bind: (event: string, callback: () => void) => void;
  load: (url: string, options: Record<string, unknown>) => void;
  play: () => void;
  pause: () => void;
  seekTo: (milliseconds: number) => void;
}

interface SoundCloudAPI {
  Widget: {
    (iframe: HTMLIFrameElement): SoundCloudWidget;
    Events: {
      READY: string;
      PLAY: string;
      PAUSE: string;
    };
  };
}

declare global {
  interface Window {
    SC: SoundCloudAPI;
  }
}

export function useAudioPlayer(soundcloudUrl: string | null) {
  const widgetRef = useRef<SoundCloudWidget | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [totalPlayDuration, setTotalPlayDuration] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const currentPhaseRef = useRef<GamePhase | null>(null);
  const isFirstPlayOfPhaseRef = useRef(true);
  const pausedPositionRef = useRef<number>(0);
  const playStartTimeRef = useRef<number>(0);

  useEffect(() => {
    const existingScript = document.querySelector(
      'script[src="https://w.soundcloud.com/player/api.js"]'
    );

    if (existingScript) {
      setTimeout(() => setIsReady(true), 0);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://w.soundcloud.com/player/api.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      setIsReady(true);
    };

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    if (isReady && iframeRef.current && soundcloudUrl && window.SC) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }

      currentPhaseRef.current = null;
      isFirstPlayOfPhaseRef.current = true;
      pausedPositionRef.current = 0;

      setTimeout(() => {
        setProgress(0);
        setElapsedTime(0);
        setTotalPlayDuration(0);
        setIsPlaying(false);
      }, 0);

      const widget = window.SC.Widget(iframeRef.current);
      widgetRef.current = widget;

      widget.bind(window.SC.Widget.Events.READY, () => {});

      widget.bind(window.SC.Widget.Events.PLAY, () => {
        setIsPlaying(true);
      });

      widget.bind(window.SC.Widget.Events.PAUSE, () => {
        setIsPlaying(false);
      });

      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
        }
      };
    }
  }, [isReady, soundcloudUrl]);
  const playPhase = useCallback(
    (phase: GamePhase) => {
      if (!widgetRef.current) {
        return;
      }

      const widget = widgetRef.current;

      if (pausedPositionRef.current > 0 && currentPhaseRef.current === phase) {
        const remainingTime = totalPlayDuration - pausedPositionRef.current;

        widget.seekTo(pausedPositionRef.current * 1000);
        widget.play();
        setIsPlaying(true);

        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
        }

        playStartTimeRef.current = Date.now();
        const pausedAt = pausedPositionRef.current;

        progressIntervalRef.current = setInterval(() => {
          const elapsed =
            pausedAt + (Date.now() - playStartTimeRef.current) / 1000;
          setElapsedTime(elapsed);
          const progressPercent = Math.min(
            (elapsed / totalPlayDuration) * 100,
            100
          );
          setProgress(progressPercent);
        }, 50);

        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
          widget.pause();
          setIsPlaying(false);
          setProgress(100);
          pausedPositionRef.current = 0;

          if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
          }
        }, remainingTime * 1000);

        return;
      }

      if (currentPhaseRef.current !== phase) {
        currentPhaseRef.current = phase;
        isFirstPlayOfPhaseRef.current = true;
        pausedPositionRef.current = 0;
      }

      let startPosition = 0;
      let playDuration: number;
      let actualStartTime = 0;

      if (isFirstPlayOfPhaseRef.current) {
        if (phase === 0) {
          startPosition = 0;
          playDuration = PHASE_DURATIONS[0];
          actualStartTime = 0;
        } else {
          const previousTotal = PHASE_DURATIONS.slice(0, phase).reduce(
            (sum, d) => sum + d,
            0
          );
          startPosition = previousTotal;
          playDuration = PHASE_DURATIONS[phase];
          actualStartTime = previousTotal;
        }
        isFirstPlayOfPhaseRef.current = false;
      } else {
        startPosition = 0;
        playDuration = PHASE_DURATIONS.slice(0, phase + 1).reduce(
          (sum, d) => sum + d,
          0
        );
        actualStartTime = 0;
      }

      setTotalPlayDuration(playDuration);
      pausedPositionRef.current = 0;

      widget.seekTo(startPosition * 1000);
      widget.play();
      setIsPlaying(true);

      setProgress(0);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }

      playStartTimeRef.current = Date.now();
      progressIntervalRef.current = setInterval(() => {
        const elapsed = (Date.now() - playStartTimeRef.current) / 1000;
        const currentAbsoluteTime = actualStartTime + elapsed;
        setElapsedTime(currentAbsoluteTime);
        const progressPercent = Math.min((elapsed / playDuration) * 100, 100);
        setProgress(progressPercent);
      }, 50);

      timerRef.current = setTimeout(() => {
        widget.pause();
        setIsPlaying(false);
        setProgress(100);
        pausedPositionRef.current = 0;

        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
        }
      }, playDuration * 1000);
    },
    [totalPlayDuration]
  );

  const stopPlaying = useCallback(() => {
    if (!widgetRef.current) return;

    pausedPositionRef.current = elapsedTime;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    widgetRef.current.pause();
    setIsPlaying(false);
  }, [elapsedTime]);

  const resetForNewPhase = useCallback(() => {
    isFirstPlayOfPhaseRef.current = true;
    pausedPositionRef.current = 0;
  }, []);

  const playFull = useCallback(() => {
    if (!widgetRef.current) return;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    widgetRef.current.seekTo(0);
    widgetRef.current.play();
  }, []);

  return {
    iframeRef,
    isPlaying,
    progress,
    elapsedTime,
    totalPlayDuration,
    playPhase,
    stopPlaying,
    playFull,
    resetForNewPhase,
  };
}
