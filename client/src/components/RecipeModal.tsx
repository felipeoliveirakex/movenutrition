/*
  Design: Organic Minimalism
  - Modal com bordas suaves e orgânicas
  - Cores sage, terracotta e coral
  - Tipografia Playfair Display para títulos
  - Animações suaves de fade-in
*/

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Clock, Users, Flame, Copy, Check, Lightbulb, RefreshCw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

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

interface RecipeModalProps {
  recipe: Recipe | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function RecipeModal({ recipe, isOpen, onClose, isFavorite, onToggleFavorite }: RecipeModalProps) {
  const [checkedIngredients, setCheckedIngredients] = useState<number[]>([]);
  const [copied, setCopied] = useState(false);

  if (!recipe) return null;

  const toggleIngredient = (idx: number) => {
    setCheckedIngredients((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const copyRecipe = () => {
    const recipeText = `${recipe.name}

📋 Ingredientes:
${recipe.ingredients.map((ing) => `• ${ing}`).join("\n")}

👨‍🍳 Modo de Preparo:
${recipe.instructions.map((inst, idx) => `${idx + 1}. ${inst}`).join("\n")}

💡 Dicas:
${recipe.tips.map((tip) => `• ${tip}`).join("\n")}

⏱️ Tempo: ${recipe.time} min | 🔥 Calorias: ${recipe.calories} kcal
`;
    navigator.clipboard.writeText(recipeText);
    setCopied(true);
    toast.success("Receita copiada para a área de transferência!");
    setTimeout(() => setCopied(false), 2000);
  };

  const difficultyColor = {
    fácil: "bg-green-100 text-green-700 border-green-200",
    médio: "bg-yellow-100 text-yellow-700 border-yellow-200",
    difícil: "bg-red-100 text-red-700 border-red-200",
  }[recipe.difficulty] || "bg-gray-100 text-gray-700 border-gray-200";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 gap-0 rounded-3xl border-0 shadow-2xl">
        {/* Header with gradient */}
        <div className="relative bg-gradient-to-br from-[oklch(0.92_0.02_145)] to-[oklch(0.90_0.05_55)] p-6 rounded-t-3xl">
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={onToggleFavorite}
              className="p-2.5 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-sm"
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  isFavorite ? "fill-red-500 text-red-500" : "text-gray-500"
                }`}
              />
            </button>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="text-5xl">{recipe.image}</div>
            <div className="flex-1 pr-12">
              <DialogHeader>
                <DialogTitle className="text-2xl font-display font-bold text-[oklch(0.25_0.03_55)] leading-tight">
                  {recipe.name}
                </DialogTitle>
              </DialogHeader>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {recipe.benefits.map((benefit) => (
                  <Badge
                    key={benefit}
                    variant="secondary"
                    className="capitalize text-xs bg-white/70 text-[oklch(0.40_0.08_145)] border-0"
                  >
                    {benefit}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Quick Info Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-[oklch(0.96_0.01_85)] p-3 rounded-2xl text-center">
              <Clock className="w-5 h-5 mx-auto mb-1 text-[oklch(0.50_0.10_145)]" />
              <p className="text-xs text-muted-foreground">Tempo</p>
              <p className="font-semibold text-foreground">{recipe.time} min</p>
            </div>
            <div className="bg-[oklch(0.96_0.01_85)] p-3 rounded-2xl text-center">
              <Users className="w-5 h-5 mx-auto mb-1 text-[oklch(0.50_0.10_145)]" />
              <p className="text-xs text-muted-foreground">Porções</p>
              <p className="font-semibold text-foreground">{recipe.servings}</p>
            </div>
            <div className="bg-[oklch(0.96_0.01_85)] p-3 rounded-2xl text-center">
              <Flame className="w-5 h-5 mx-auto mb-1 text-[oklch(0.78_0.12_25)]" />
              <p className="text-xs text-muted-foreground">Calorias</p>
              <p className="font-semibold text-foreground">{recipe.calories} kcal</p>
            </div>
            <div className="bg-[oklch(0.96_0.01_85)] p-3 rounded-2xl text-center">
              <div className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium border ${difficultyColor}`}>
                {recipe.difficulty}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Dificuldade</p>
            </div>
          </div>

          {/* Macros */}
          <div className="bg-gradient-to-r from-[oklch(0.92_0.02_145)] to-[oklch(0.94_0.01_85)] p-4 rounded-2xl">
            <h3 className="font-display font-semibold text-foreground mb-3 text-sm">
              Informações Nutricionais
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-[oklch(0.50_0.10_145)]">{recipe.macros.protein}</p>
                <p className="text-xs text-muted-foreground">Proteína</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-[oklch(0.72_0.10_55)]">{recipe.macros.carbs}</p>
                <p className="text-xs text-muted-foreground">Carboidratos</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-[oklch(0.78_0.12_25)]">{recipe.macros.fat}</p>
                <p className="text-xs text-muted-foreground">Gordura</p>
              </div>
            </div>
          </div>

          {/* Ingredients */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
              <span className="w-8 h-8 bg-[oklch(0.92_0.02_145)] rounded-full flex items-center justify-center text-sm">
                🥗
              </span>
              Ingredientes
            </h3>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, idx) => (
                <li
                  key={idx}
                  onClick={() => toggleIngredient(idx)}
                  className={`flex items-center gap-3 p-2 rounded-xl cursor-pointer transition-all ${
                    checkedIngredients.includes(idx)
                      ? "bg-[oklch(0.92_0.02_145)] line-through text-muted-foreground"
                      : "hover:bg-[oklch(0.96_0.01_85)]"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      checkedIngredients.includes(idx)
                        ? "bg-[oklch(0.50_0.10_145)] border-[oklch(0.50_0.10_145)]"
                        : "border-[oklch(0.50_0.10_145)]"
                    }`}
                  >
                    {checkedIngredients.includes(idx) && (
                      <Check className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <span className="text-sm">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
              <span className="w-8 h-8 bg-[oklch(0.90_0.05_55)] rounded-full flex items-center justify-center text-sm">
                👨‍🍳
              </span>
              Modo de Preparo
            </h3>
            <ol className="space-y-3">
              {recipe.instructions.map((instruction, idx) => (
                <li key={idx} className="flex gap-3">
                  <span className="flex-shrink-0 w-7 h-7 bg-[oklch(0.50_0.10_145)] text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    {idx + 1}
                  </span>
                  <span className="text-sm text-foreground/80 pt-1">{instruction}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Tips */}
          {recipe.tips && recipe.tips.length > 0 && (
            <div className="bg-[oklch(0.95_0.03_200)] p-4 rounded-2xl border border-[oklch(0.85_0.05_200)]">
              <h3 className="font-display font-semibold text-foreground mb-2 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-[oklch(0.65_0.15_85)]" />
                Dicas
              </h3>
              <ul className="space-y-2">
                {recipe.tips.map((tip, idx) => (
                  <li key={idx} className="text-sm text-foreground/80 flex gap-2">
                    <span className="text-[oklch(0.50_0.10_145)]">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Variations */}
          {recipe.variations && recipe.variations.length > 0 && (
            <div className="bg-[oklch(0.92_0.02_145)] p-4 rounded-2xl border border-[oklch(0.85_0.04_145)]">
              <h3 className="font-display font-semibold text-foreground mb-2 flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-[oklch(0.50_0.10_145)]" />
                Variações
              </h3>
              <ul className="space-y-2">
                {recipe.variations.map((variation, idx) => (
                  <li key={idx} className="text-sm text-foreground/80 flex gap-2">
                    <span className="text-[oklch(0.72_0.10_55)]">•</span>
                    {variation}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-border">
            <Button
              variant="outline"
              className="flex-1 rounded-full h-11"
              onClick={onClose}
            >
              Fechar
            </Button>
            <Button
              className="flex-1 rounded-full h-11 bg-[oklch(0.50_0.10_145)] hover:bg-[oklch(0.45_0.10_145)]"
              onClick={copyRecipe}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copiado!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copiar Receita
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
