/*
  Design: Organic Minimalism
  - Cards com bordas orgânicas e suaves
  - Hover com elevação e sombra sage
  - Badges coloridos para benefícios
  - Animações de transição suaves
*/

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Clock, Flame } from "lucide-react";

interface Recipe {
  id: number;
  name: string;
  category: string;
  image: string;
  ingredients: string[];
  benefits: string[];
  time: number;
  difficulty: string;
  servings: number;
  calories: number;
  macros: {
    protein: string;
    carbs: string;
    fat: string;
  };
  instructions: string[];
  tips: string[];
  variations: string[];
}

interface RecipeCardProps {
  recipe: Recipe;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onOpen: () => void;
}

export default function RecipeCard({ recipe, isFavorite, onToggleFavorite, onOpen }: RecipeCardProps) {
  const difficultyColor = {
    fácil: "bg-green-50 text-green-600",
    médio: "bg-yellow-50 text-yellow-600",
    difícil: "bg-red-50 text-red-600",
  }[recipe.difficulty] || "bg-gray-50 text-gray-600";

  return (
    <Card
      onClick={onOpen}
      className="group overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer rounded-3xl bg-white"
    >
      {/* Header with emoji and gradient */}
      <div className="relative bg-gradient-to-br from-[oklch(0.94_0.02_145)] to-[oklch(0.96_0.03_55)] p-5">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-sm z-10"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-400 group-hover:text-gray-600"
            }`}
          />
        </button>
        
        <div className="text-5xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
          {recipe.image}
        </div>
        
        <h3 className="font-display font-semibold text-[oklch(0.25_0.03_55)] text-lg leading-tight line-clamp-2 pr-8">
          {recipe.name}
        </h3>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Quick Info */}
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="w-4 h-4 text-[oklch(0.50_0.10_145)]" />
            {recipe.time} min
          </span>
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <Flame className="w-4 h-4 text-[oklch(0.78_0.12_25)]" />
            {recipe.calories} kcal
          </span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${difficultyColor}`}>
            {recipe.difficulty}
          </span>
        </div>

        {/* Benefits */}
        <div className="flex flex-wrap gap-1.5">
          {recipe.benefits.slice(0, 3).map((benefit) => (
            <Badge
              key={benefit}
              variant="secondary"
              className="text-xs capitalize bg-[oklch(0.94_0.02_145)] text-[oklch(0.40_0.08_145)] border-0 rounded-full px-2.5"
            >
              {benefit}
            </Badge>
          ))}
          {recipe.benefits.length > 3 && (
            <Badge
              variant="outline"
              className="text-xs rounded-full px-2.5 border-[oklch(0.88_0.02_85)]"
            >
              +{recipe.benefits.length - 3}
            </Badge>
          )}
        </div>

        {/* Ingredients Preview */}
        <div className="pt-2 border-t border-[oklch(0.94_0.01_85)]">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
            Ingredientes principais
          </p>
          <ul className="text-sm space-y-1">
            {recipe.ingredients.slice(0, 2).map((ing, idx) => (
              <li key={idx} className="text-foreground/70 line-clamp-1 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.50_0.10_145)]" />
                {ing}
              </li>
            ))}
            {recipe.ingredients.length > 2 && (
              <li className="text-muted-foreground text-xs italic">
                + {recipe.ingredients.length - 2} ingredientes
              </li>
            )}
          </ul>
        </div>

        {/* Macros Mini */}
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[oklch(0.94_0.01_85)]">
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Prot</p>
            <p className="text-sm font-semibold text-[oklch(0.50_0.10_145)]">{recipe.macros.protein}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Carbs</p>
            <p className="text-sm font-semibold text-[oklch(0.72_0.10_55)]">{recipe.macros.carbs}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Gord</p>
            <p className="text-sm font-semibold text-[oklch(0.78_0.12_25)]">{recipe.macros.fat}</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 pb-5">
        <div className="w-full py-2.5 text-center text-sm font-medium text-[oklch(0.50_0.10_145)] bg-[oklch(0.96_0.02_145)] rounded-full group-hover:bg-[oklch(0.50_0.10_145)] group-hover:text-white transition-all duration-300">
          Ver receita completa →
        </div>
      </div>
    </Card>
  );
}
