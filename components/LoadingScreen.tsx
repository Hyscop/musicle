"use client";

import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  weight: ["700"],
  subsets: ["latin"],
});

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center z-50">
      <div className="text-center">
        <h1
          className={`${montserrat.className} text-6xl sm:text-7xl font-bold mb-8 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent tracking-wide animate-pulse`}
        >
          Müzikle
        </h1>

        <div className="flex justify-center items-center space-x-2">
          <div
            className="w-4 h-4 bg-purple-400 rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className="w-4 h-4 bg-pink-400 rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          ></div>
          <div
            className="w-4 h-4 bg-purple-400 rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          ></div>
        </div>

        <p className="text-gray-400 mt-6 text-lg">Şarkılar Seçiliyor...</p>
      </div>
    </div>
  );
}
