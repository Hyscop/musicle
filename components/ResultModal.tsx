"use client";

import { useEffect } from "react";
import { Category } from "@/types";

interface ResultModalProps {
  isOpen: boolean;
  hasWon: boolean;
  songTitle: string;
  artist: string;
  youtubeId: string;
  attempts: number;
  currentCategory: Category;
  onNext: () => void;
  onClose: () => void;
  modalIframeRef: React.RefObject<HTMLIFrameElement | null>;
  shouldAutoPlay?: boolean; // Auto-play only on first view
}

const CATEGORY_SEQUENCE: Category[] = ["all", "rock", "hiphop"];

export default function ResultModal({
  isOpen,
  hasWon,
  songTitle,
  artist,
  youtubeId,
  attempts,
  currentCategory,
  onNext,
  onClose,
  modalIframeRef,
  shouldAutoPlay = false,
}: ResultModalProps) {
  useEffect(() => {
    // Load or reload YouTube video when modal opens
    if (isOpen && modalIframeRef.current && youtubeId) {
      const autoplayParam = shouldAutoPlay ? "autoplay=1" : "autoplay=0";
      modalIframeRef.current.src = `https://www.youtube.com/embed/${youtubeId}?${autoplayParam}`;
    }
  }, [isOpen, youtubeId, modalIframeRef, shouldAutoPlay]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      // Stop the video when modal closes
      if (modalIframeRef.current) {
        modalIframeRef.current.src = "";
      }
    }
    return () => {
      document.body.style.overflow = "unset";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const currentIndex = CATEGORY_SEQUENCE.indexOf(currentCategory);
  const isLastCategory = currentIndex === CATEGORY_SEQUENCE.length - 1;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center p-4 transition-all duration-300 ${
        isOpen
          ? "z-50 bg-black/90 backdrop-blur-md pointer-events-auto"
          : "-z-10 bg-transparent pointer-events-none opacity-0"
      }`}
      onClick={isOpen ? onClose : undefined}
    >
      <div
        className={`bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900/30 rounded-3xl p-8 max-w-xl w-full border border-purple-500/20 shadow-2xl shadow-purple-500/10 transition-all duration-300 ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Oyun Sonu
          </h2>

          <div className="mb-6 p-6 bg-gray-900/60 rounded-2xl backdrop-blur-sm border border-gray-800/50">
            <p className="text-2xl font-bold text-white mb-1">{songTitle}</p>
            <p className="text-lg text-gray-300">{artist}</p>
          </div>

          <div className="mb-6 p-4 bg-gray-900/40 rounded-xl border border-gray-800/30">
            <p className="text-gray-400 text-sm">📊 İstatistikler (Yakında)</p>
            <p className="text-gray-500 text-xs mt-1">
              {hasWon ? `${attempts}/6 denemede bildin!` : "Bilemedin"}
            </p>
          </div>

          <div className="mb-6 rounded-xl overflow-hidden border border-gray-800/50">
            <iframe
              ref={modalIframeRef}
              width="100%"
              height="200"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full"
            ></iframe>
          </div>

          <button
            onClick={isLastCategory ? onClose : onNext}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/30 hover:scale-105"
          >
            {isLastCategory ? "Tamamla" : "Sonraki"}
          </button>
        </div>
      </div>
    </div>
  );
}
