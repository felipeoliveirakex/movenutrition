import { useEffect, useMemo, useState } from "react";
import { useSupabaseAuth } from "./useSupabaseAuth";
import type { UserRecipe } from "@/types/recipe";

function keyForUser(userId: string) {
  return `wellness:${userId}:user-recipes:v1`;
}

function safeParse<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

export function useUserRecipes() {
  const { user } = useSupabaseAuth();
  const userId = user?.id;

  const [recipes, setRecipes] = useState<UserRecipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setRecipes([]);
      setLoading(false);
      return;
    }

    const parsed = safeParse<UserRecipe[]>(localStorage.getItem(keyForUser(userId)));
    setRecipes(parsed ?? []);
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    localStorage.setItem(keyForUser(userId), JSON.stringify(recipes));
  }, [recipes, userId]);

  const api = useMemo(() => {
    if (!userId) return null;

    return {
      create(input: {
        name: string;
        image: string;
        category: string;
        ingredients: string[];
        instructions: string[];
        benefits?: string[];
        time?: number;
        difficulty?: string;
        servings?: number;
        calories?: number;
        macros?: { protein?: string; carbs?: string; fat?: string };
        tips?: string[];
        variations?: string[];
      }) {
        const now = new Date().toISOString();
        const id = Number(`${Date.now()}${Math.floor(Math.random() * 90 + 10)}`.slice(-9));

        const recipe: UserRecipe = {
          id,
          ownerId: userId,
          source: "user",
          createdAt: now,
          updatedAt: now,
          name: input.name.trim(),
          image: (input.image || "🍽️").trim(),
          category: input.category,
          ingredients: input.ingredients,
          instructions: input.instructions,
          benefits: input.benefits ?? ["personalizada"],
          time: input.time ?? 15,
          difficulty: input.difficulty ?? "fácil",
          servings: input.servings ?? 1,
          calories: input.calories ?? 0,
          macros: {
            protein: input.macros?.protein ?? "0",
            carbs: input.macros?.carbs ?? "0",
            fat: input.macros?.fat ?? "0",
          },
          tips: input.tips ?? [],
          variations: input.variations ?? [],
        };

        setRecipes((prev) => [recipe, ...prev]);
        return recipe;
      },
      remove(id: number) {
        setRecipes((prev) => prev.filter((r) => r.id !== id));
      },
      update(id: number, patch: Partial<UserRecipe>) {
        setRecipes((prev) =>
          prev.map((r) => (r.id === id ? { ...r, ...patch, updatedAt: new Date().toISOString() } : r))
        );
      },
    };
  }, [userId]);

  return { userId, recipes, loading, api };
}
