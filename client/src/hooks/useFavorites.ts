import { useState, useEffect } from "react";
import { useSupabaseAuth } from "./useSupabaseAuth";

export function useFavorites() {
  const { user } = useSupabaseAuth();
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  // Load favorites from localStorage (fallback)
  useEffect(() => {
    const saved = localStorage.getItem("wellness-favorites");
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse favorites:", e);
      }
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem("wellness-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (recipeId: number) => {
    setFavorites((prev) =>
      prev.includes(recipeId)
        ? prev.filter((id) => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  const isFavorite = (recipeId: number) => {
    return favorites.includes(recipeId);
  };

  const addFavorite = (recipeId: number) => {
    if (!isFavorite(recipeId)) {
      setFavorites((prev) => [...prev, recipeId]);
    }
  };

  const removeFavorite = (recipeId: number) => {
    setFavorites((prev) => prev.filter((id) => id !== recipeId));
  };

  return {
    favorites,
    loading,
    toggleFavorite,
    isFavorite,
    addFavorite,
    removeFavorite,
  };
}
