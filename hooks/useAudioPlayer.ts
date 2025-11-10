/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { GamePhase } from "@/types";
import { PHASE_DURATIONS } from "@/lib/constants";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export function useAudioPlayer(youtubeId: string | null) {
  const playerRef = useRef<any>(null);
  const iframeRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [totalPlayDuration, setTotalPlayDuration] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const playStartTimeRef = useRef<number>(0);
  const pausedPositionRef = useRef<number>(0);
  const currentPhaseRef = useRef<GamePhase>(0);
  const isFirstPlayOfPhaseRef = useRef<boolean>(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.YT && window.YT.Player) return;
    if (document.querySelector('script[src*="youtube.com/iframe_api"]')) return;

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
  }, []);

  useEffect(() => {
    if (!youtubeId || typeof window === "undefined") return;

    // Reset all state when youtubeId changes (async to avoid cascading renders)
    const resetTimer = setTimeout(() => {
      setIsPlaying(false);
      setProgress(0);
      setElapsedTime(0);
      setTotalPlayDuration(0);
    }, 0);

    pausedPositionRef.current = 0;
    isFirstPlayOfPhaseRef.current = true;
    currentPhaseRef.current = 0;

    const initPlayer = () => {
      if (!window.YT || !window.YT.Player) {
        setTimeout(initPlayer, 100);
        return;
      }

      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (e) {
          console.error("Error:", e);
        }
      }

      playerRef.current = new window.YT.Player("youtube-player-container", {
        height: "0",
        width: "0",
        videoId: youtubeId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
        },
        events: {
          onReady: () => {},
          onStateChange: (event: any) => {
            if (event.data === 1) setIsPlaying(true);
            else if (event.data === 2) setIsPlaying(false);
          },
        },
      });
    };

    initPlayer();

    return () => {
      clearTimeout(resetTimer);
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressIntervalRef.current)
        clearInterval(progressIntervalRef.current);
    };
  }, [youtubeId]);

  const playPhase = useCallback(
    (phase: GamePhase) => {
      if (!playerRef.current) return;
      const player = playerRef.current;

      if (pausedPositionRef.current > 0 && currentPhaseRef.current === phase) {
        const remainingTime = totalPlayDuration - pausedPositionRef.current;
        player.seekTo(pausedPositionRef.current, true);
        player.playVideo();
        setIsPlaying(true);

        if (progressIntervalRef.current)
          clearInterval(progressIntervalRef.current);

        playStartTimeRef.current = Date.now();
        const pausedAt = pausedPositionRef.current;

        progressIntervalRef.current = setInterval(() => {
          const elapsed =
            pausedAt + (Date.now() - playStartTimeRef.current) / 1000;
          setElapsedTime(elapsed);
          setProgress(Math.min((elapsed / totalPlayDuration) * 100, 100));
        }, 50);

        if (timerRef.current) clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => {
          player.pauseVideo();
          setIsPlaying(false);
          setProgress(100);
          pausedPositionRef.current = 0;
          if (progressIntervalRef.current)
            clearInterval(progressIntervalRef.current);
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

      if (isFirstPlayOfPhaseRef.current) {
        if (phase === 0) {
          startPosition = 0;
          playDuration = PHASE_DURATIONS[0];
        } else {
          const previousTotal = PHASE_DURATIONS.slice(0, phase).reduce(
            (sum, d) => sum + d,
            0
          );
          startPosition = previousTotal;
          playDuration = PHASE_DURATIONS[phase];
        }
        isFirstPlayOfPhaseRef.current = false;
      } else {
        startPosition = 0;
        playDuration = PHASE_DURATIONS.slice(0, phase + 1).reduce(
          (sum, d) => sum + d,
          0
        );
      }

      setTotalPlayDuration(playDuration);
      pausedPositionRef.current = 0;

      player.seekTo(startPosition, true);
      player.playVideo();
      setIsPlaying(true);
      setProgress(0);

      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressIntervalRef.current)
        clearInterval(progressIntervalRef.current);

      playStartTimeRef.current = Date.now();
      progressIntervalRef.current = setInterval(() => {
        const elapsed = (Date.now() - playStartTimeRef.current) / 1000;
        const totalElapsed = startPosition + elapsed;
        setElapsedTime(totalElapsed);
        setProgress(Math.min((elapsed / playDuration) * 100, 100));
      }, 50);

      timerRef.current = setTimeout(() => {
        player.pauseVideo();
        setIsPlaying(false);
        setProgress(100);
        pausedPositionRef.current = 0;
        if (progressIntervalRef.current)
          clearInterval(progressIntervalRef.current);
      }, playDuration * 1000);
    },
    [totalPlayDuration]
  );

  const stopPlaying = useCallback(() => {
    if (!playerRef.current) return;
    pausedPositionRef.current = elapsedTime;
    if (timerRef.current) clearTimeout(timerRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);

    try {
      if (
        playerRef.current &&
        typeof playerRef.current.pauseVideo === "function"
      ) {
        playerRef.current.pauseVideo();
      }
    } catch (error) {
      console.error("Error pausing player:", error);
    }

    setIsPlaying(false);
  }, [elapsedTime]);

  const resetForNewPhase = useCallback(() => {
    isFirstPlayOfPhaseRef.current = true;
    pausedPositionRef.current = 0;
  }, []);

  const playFull = useCallback(() => {
    if (!playerRef.current) return;
    const player = playerRef.current;
    if (timerRef.current) clearTimeout(timerRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    player.seekTo(0, true);
    player.playVideo();
    setIsPlaying(true);
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
