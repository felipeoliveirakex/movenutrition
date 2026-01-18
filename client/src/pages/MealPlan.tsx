/*
  Design: Organic Minimalism
  - Plano alimentar semanal interativo
  - Cards com refeições organizadas por dia
  - Cores sage, terracotta e coral
  - Animações suaves
*/

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Sun,
  Moon,
  Utensils,
  Apple,
  Flame,
  RefreshCw,
  Download,
  Leaf,
} from "lucide-react";
import { Link } from "wouter";
import recipesData from "@/data/recipes-complete.json";
import RecipeModal from "@/components/RecipeModal";

type Recipe = typeof recipesData[0];

const DAYS = [
  { id: 0, name: "Domingo", short: "Dom" },
  { id: 1, name: "Segunda", short: "Seg" },
  { id: 2, name: "Terça", short: "Ter" },
  { id: 3, name: "Quarta", short: "Qua" },
  { id: 4, name: "Quinta", short: "Qui" },
  { id: 5, name: "Sexta", short: "Sex" },
  { id: 6, name: "Sábado", short: "Sáb" },
];

const MEAL_TYPES = [
  { id: "morning", name: "Manhã", icon: Coffee, categories: ["shots", "cafés"], color: "oklch(0.72_0.10_55)" },
  { id: "lunch", name: "Almoço", icon: Sun, categories: ["refeições", "sucos"], color: "oklch(0.50_0.10_145)" },
  { id: "snack", name: "Lanche", icon: Apple, categories: ["lanches", "chás"], color: "oklch(0.78_0.12_25)" },
  { id: "dinner", name: "Jantar", icon: Moon, categories: ["refeições", "chás", "água"], color: "oklch(0.55_0.08_200)" },
];

// Helper to get random recipes by category
const getRandomRecipe = (categories: string[], exclude: number[] = []): Recipe | null => {
  const filtered = recipesData.filter(
    (r) => categories.includes(r.category) && !exclude.includes(r.id)
  );
  if (filtered.length === 0) return null;
  return filtered[Math.floor(Math.random() * filtered.length)];
};

// Generate a week plan
const generateWeekPlan = () => {
  const plan: Record<number, Record<string, Recipe | null>> = {};
  const usedIds: number[] = [];

  DAYS.forEach((day) => {
    plan[day.id] = {};
    MEAL_TYPES.forEach((meal) => {
      const recipe = getRandomRecipe(meal.categories, usedIds);
      if (recipe) {
        usedIds.push(recipe.id);
        plan[day.id][meal.id] = recipe;
      } else {
        plan[day.id][meal.id] = null;
      }
    });
  });

  return plan;
};

export default function MealPlan() {
  const [weekPlan, setWeekPlan] = useState(() => generateWeekPlan());
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const regeneratePlan = () => {
    setWeekPlan(generateWeekPlan());
  };

  const regenerateMeal = (dayId: number, mealId: string) => {
    const meal = MEAL_TYPES.find((m) => m.id === mealId);
    if (!meal) return;

    const usedIds = Object.values(weekPlan)
      .flatMap((day) => Object.values(day))
      .filter((r): r is Recipe => r !== null)
      .map((r) => r.id);

    const newRecipe = getRandomRecipe(meal.categories, usedIds);
    setWeekPlan((prev) => ({
      ...prev,
      [dayId]: {
        ...prev[dayId],
        [mealId]: newRecipe,
      },
    }));
  };

  // Calculate daily totals
  const dailyTotals = useMemo(() => {
    const totals: Record<number, { calories: number; protein: number; carbs: number; fat: number }> = {};
    
    DAYS.forEach((day) => {
      let calories = 0;
      let protein = 0;
      let carbs = 0;
      let fat = 0;

      MEAL_TYPES.forEach((meal) => {
        const recipe = weekPlan[day.id]?.[meal.id];
        if (recipe) {
          calories += recipe.calories || 0;
          protein += parseFloat(recipe.macros?.protein || "0");
          carbs += parseFloat(recipe.macros?.carbs || "0");
          fat += parseFloat(recipe.macros?.fat || "0");
        }
      });

      totals[day.id] = { calories, protein, carbs, fat };
    });

    return totals;
  }, [weekPlan]);

  const exportPlan = () => {
    let text = "🥗 PLANO ALIMENTAR SEMANAL\n";
    text += "═".repeat(40) + "\n\n";

    DAYS.forEach((day) => {
      text += `📅 ${day.name.toUpperCase()}\n`;
      text += "-".repeat(30) + "\n";

      MEAL_TYPES.forEach((meal) => {
        const recipe = weekPlan[day.id]?.[meal.id];
        if (recipe) {
          text += `${meal.name}: ${recipe.name}\n`;
          text += `   ⏱️ ${recipe.time}min | 🔥 ${recipe.calories}kcal\n`;
        }
      });

      const totals = dailyTotals[day.id];
      text += `\n📊 Total: ${totals.calories}kcal | P: ${totals.protein.toFixed(1)}g | C: ${totals.carbs.toFixed(1)}g | G: ${totals.fat.toFixed(1)}g\n\n`;
    });

    navigator.clipboard.writeText(text);
    alert("Plano copiado para a área de transferência!");
  };

  return (
    <div className="min-h-screen bg-[oklch(0.98_0.008_85)]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg shadow-sm">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <a className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[oklch(0.50_0.10_145)] to-[oklch(0.60_0.08_145)] rounded-2xl flex items-center justify-center shadow-lg shadow-[oklch(0.50_0.10_145)]/20">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-display font-bold text-foreground">
                    Move Wellness
                  </h1>
                </div>
              </a>
            </Link>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={exportPlan}
                className="rounded-full"
              >
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
              <Button
                size="sm"
                onClick={regeneratePlan}
                className="rounded-full bg-[oklch(0.50_0.10_145)] hover:bg-[oklch(0.45_0.10_145)]"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Novo Plano
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[oklch(0.92_0.02_145)] to-[oklch(0.96_0.01_85)] py-12">
        <div className="container">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg">
              <Calendar className="w-7 h-7 text-[oklch(0.50_0.10_145)]" />
            </div>
            <div>
              <h2 className="text-3xl font-display font-bold text-foreground">
                Plano Alimentar
              </h2>
              <p className="text-muted-foreground">
                Seu cardápio semanal personalizado
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Day Selector */}
      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setSelectedDay((prev) => (prev === 0 ? 6 : prev - 1))}
            className="p-2 hover:bg-white rounded-full transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {DAYS.map((day) => (
              <button
                key={day.id}
                onClick={() => setSelectedDay(day.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  selectedDay === day.id
                    ? "bg-[oklch(0.50_0.10_145)] text-white shadow-lg"
                    : "bg-white hover:bg-[oklch(0.96_0.02_145)]"
                }`}
              >
                <span className="hidden sm:inline">{day.name}</span>
                <span className="sm:hidden">{day.short}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => setSelectedDay((prev) => (prev === 6 ? 0 : prev + 1))}
            className="p-2 hover:bg-white rounded-full transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Daily Summary */}
        <Card className="p-4 mb-6 bg-gradient-to-r from-[oklch(0.92_0.02_145)] to-[oklch(0.94_0.01_85)] border-0 rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-semibold text-lg">
                {DAYS[selectedDay].name}
              </h3>
              <p className="text-sm text-muted-foreground">Resumo nutricional do dia</p>
            </div>
            <div className="flex gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-[oklch(0.50_0.10_145)]">
                  {dailyTotals[selectedDay]?.calories || 0}
                </p>
                <p className="text-xs text-muted-foreground">kcal</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[oklch(0.72_0.10_55)]">
                  {dailyTotals[selectedDay]?.protein.toFixed(0) || 0}g
                </p>
                <p className="text-xs text-muted-foreground">Proteína</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[oklch(0.78_0.12_25)]">
                  {dailyTotals[selectedDay]?.carbs.toFixed(0) || 0}g
                </p>
                <p className="text-xs text-muted-foreground">Carbs</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Meals Grid */}
        <div className="grid gap-4">
          {MEAL_TYPES.map((meal) => {
            const recipe = weekPlan[selectedDay]?.[meal.id];
            const Icon = meal.icon;

            return (
              <Card
                key={meal.id}
                className="p-4 border-0 shadow-sm rounded-2xl bg-white hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${meal.color}20` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: meal.color }} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-foreground">{meal.name}</h4>
                      <button
                        onClick={() => regenerateMeal(selectedDay, meal.id)}
                        className="p-1.5 hover:bg-[oklch(0.96_0.02_145)] rounded-full transition-colors"
                        title="Trocar receita"
                      >
                        <RefreshCw className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>

                    {recipe ? (
                      <div
                        onClick={() => setSelectedRecipe(recipe)}
                        className="cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{recipe.image}</span>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground group-hover:text-[oklch(0.50_0.10_145)] transition-colors line-clamp-1">
                              {recipe.name}
                            </p>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                              <span>⏱️ {recipe.time}min</span>
                              <span>🔥 {recipe.calories}kcal</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-1.5 mt-2">
                          {recipe.benefits.slice(0, 2).map((benefit) => (
                            <Badge
                              key={benefit}
                              variant="secondary"
                              className="text-xs capitalize bg-[oklch(0.94_0.02_145)] border-0"
                            >
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground italic">
                        Nenhuma receita disponível
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Week Overview */}
        <div className="mt-8">
          <h3 className="font-display font-semibold text-lg mb-4">Visão da Semana</h3>
          <div className="grid grid-cols-7 gap-2">
            {DAYS.map((day) => (
              <button
                key={day.id}
                onClick={() => setSelectedDay(day.id)}
                className={`p-3 rounded-xl text-center transition-all ${
                  selectedDay === day.id
                    ? "bg-[oklch(0.50_0.10_145)] text-white"
                    : "bg-white hover:bg-[oklch(0.96_0.02_145)]"
                }`}
              >
                <p className="text-xs font-medium mb-1">{day.short}</p>
                <p className="text-lg font-bold">
                  {dailyTotals[day.id]?.calories || 0}
                </p>
                <p className="text-xs opacity-70">kcal</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recipe Modal */}
      <RecipeModal
        recipe={selectedRecipe}
        isOpen={!!selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
        isFavorite={false}
        onToggleFavorite={() => {}}
      />
    </div>
  );
}
