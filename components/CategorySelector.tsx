"use client";

import { Category } from "@/types";
import { CATEGORY_NAMES } from "@/lib/constants";

interface CategorySelectorProps {
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
  disabled?: boolean;
}

export default function CategorySelector({
  selectedCategory,
  onCategoryChange,
  disabled = false,
}: CategorySelectorProps) {
  const categories: Category[] = ["all", "rock", "hiphop"];

  return (
    <div className="flex gap-3 justify-center">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          disabled={disabled}
          className={`
            px-6 py-2.5 rounded-full font-medium transition-all duration-300 text-sm
            backdrop-blur-sm
            ${
              selectedCategory === category
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30 scale-105"
                : "bg-gray-900/40 text-gray-400 hover:bg-gray-800/60 hover:text-white border border-gray-800/50"
            }
            ${
              disabled
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer hover:scale-105"
            }
          `}
        >
          {CATEGORY_NAMES[category]}
        </button>
      ))}
    </div>
  );
}
