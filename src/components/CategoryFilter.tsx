import React from "react";
import { Category } from "../types";

interface CategoryFilterProps {
  selectedCategory: Category | "All";
  onCategoryChange: (category: Category | "All") => void;
}

const categories: (Category | "All")[] = [
  "All",
  "Ruhi Book (EN)",
  "Ruhi Book (BM)",
];

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <div className="flex flex-wrap gap-2 py-4">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300
            ${
              selectedCategory === category
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};
