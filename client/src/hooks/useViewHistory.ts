import { useState, useEffect } from "react";

export interface ViewedRecipe {
  id: number;
  name: string;
  viewedAt: number;
}

export function useViewHistory() {
  const [viewHistory, setViewHistory] = useState<ViewedRecipe[]>([]);
  const [loading, setLoading] = useState(false);

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("wellness-view-history");
    if (saved) {
      try {
        setViewHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse view history:", e);
      }
    }
  }, []);

  // Save history to localStorage
  useEffect(() => {
    localStorage.setItem("wellness-view-history", JSON.stringify(viewHistory));
  }, [viewHistory]);

  const addToHistory = (recipe: { id: number; name: string }) => {
    setViewHistory((prev) => {
      // Remove if already exists
      const filtered = prev.filter((r) => r.id !== recipe.id);
      // Add to beginning with current timestamp
      return [
        {
          id: recipe.id,
          name: recipe.name,
          viewedAt: Date.now(),
        },
        ...filtered,
      ].slice(0, 20); // Keep only last 20
    });
  };

  const getRecentlyViewed = (limit: number = 5) => {
    return viewHistory.slice(0, limit);
  };

  const getSimilarRecipes = (
    currentRecipeId: number,
    allRecipes: Array<{ id: number; name: string }>
  ) => {
    const viewed = viewHistory
      .filter((r) => r.id !== currentRecipeId)
      .map((r) => r.id);

    return allRecipes
      .filter((r) => viewed.includes(r.id))
      .slice(0, 3);
  };

  const clearHistory = () => {
    setViewHistory([]);
  };

  return {
    viewHistory,
    loading,
    addToHistory,
    getRecentlyViewed,
    getSimilarRecipes,
    clearHistory,
  };
}
