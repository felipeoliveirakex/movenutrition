import { useMemo, useState } from "react";
import { Link } from "wouter";
import { Leaf, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RecipeCard from "@/components/RecipeCard";
import RecipeModal from "@/components/RecipeModal";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useUserRecipes } from "@/hooks/useUserRecipes";
import { useFavorites } from "@/hooks/useFavorites";
import { useGoals } from "@/hooks/useGoals";
import type { Recipe } from "@/types/recipe";

function MyRecipesContent() {
  const { recipes, api: recipesApi } = useUserRecipes();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { api: goalsApi } = useGoals();

  const [selected, setSelected] = useState<Recipe | null>(null);
  const [name, setName] = useState("");
  const [image, setImage] = useState("🍽️");
  const [category, setCategory] = useState("refeições");
  const [ingredientsText, setIngredientsText] = useState("");
  const [instructionsText, setInstructionsText] = useState("");

  const canCreate = name.trim() && ingredientsText.trim() && instructionsText.trim();

  const parsedIngredients = useMemo(
    () =>
      ingredientsText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
    [ingredientsText]
  );

  const parsedInstructions = useMemo(
    () =>
      instructionsText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
    [instructionsText]
  );

  const createRecipe = () => {
    if (!recipesApi || !canCreate) return;

    const created = recipesApi.create({
      name,
      image,
      category,
      ingredients: parsedIngredients,
      instructions: parsedInstructions,
    });

    goalsApi?.incrementEvent("recipe_created", { signature: String(created.id) });

    setName("");
    setImage("🍽️");
    setIngredientsText("");
    setInstructionsText("");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="h-2 bg-[#7cb342]"></div>

      <header className="sticky top-0 z-50 bg-white border-b-2 border-black">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/membros" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#7cb342] rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-black">Move Wellness</span>
            </Link>

            <Link href="/membros" className="text-sm font-semibold text-black hover:underline">
              Voltar
            </Link>
          </div>
        </div>
      </header>

      <section className="bg-green-50 border-b-2 border-[#7cb342]/20 py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-black mb-2">Minhas Receitas</h2>
          <p className="text-gray-700">Crie suas receitas e mantenha seu cardápio do seu jeito.</p>
        </div>
      </section>

      <div className="container py-8">
        <Card className="p-6 border-2 border-black rounded-lg mb-8">
          <h3 className="font-bold text-black mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-[#7cb342]" /> Criar receita (MVP)
          </h3>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label>Nome</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 h-11 border-2 border-black rounded-lg" />
            </div>
            <div>
              <Label>Emoji</Label>
              <Input value={image} onChange={(e) => setImage(e.target.value)} className="mt-1 h-11 border-2 border-black rounded-lg" />
            </div>
            <div>
              <Label>Categoria</Label>
              <Input value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 h-11 border-2 border-black rounded-lg" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div>
              <Label>Ingredientes (1 por linha)</Label>
              <textarea
                value={ingredientsText}
                onChange={(e) => setIngredientsText(e.target.value)}
                className="mt-1 w-full min-h-[140px] border-2 border-black rounded-lg p-3 text-sm"
              />
            </div>
            <div>
              <Label>Modo de preparo (1 passo por linha)</Label>
              <textarea
                value={instructionsText}
                onChange={(e) => setInstructionsText(e.target.value)}
                className="mt-1 w-full min-h-[140px] border-2 border-black rounded-lg p-3 text-sm"
              />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-4">
            <p className="text-xs text-gray-600">
              Dica: deixe simples. Você pode melhorar depois.
            </p>
            <Button
              onClick={createRecipe}
              disabled={!recipesApi || !canCreate}
              className="rounded-lg bg-[#7cb342] hover:bg-[#6ba338]"
            >
              Criar
            </Button>
          </div>
        </Card>

        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-black">Minhas receitas ({recipes.length})</h3>
        </div>

        {recipes.length === 0 ? (
          <Card className="p-6 border-2 border-black rounded-lg">
            <p className="text-gray-700">Você ainda não criou nenhuma receita.</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="relative">
                <div className="absolute top-3 left-3 z-10">
                  <Button
                    variant="outline"
                    className="h-9 w-9 p-0 rounded-full bg-white/90"
                    onClick={(e) => {
                      e.stopPropagation();
                      recipesApi?.remove(recipe.id);
                    }}
                    title="Excluir"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <RecipeCard
                  recipe={recipe}
                  isFavorite={isFavorite(recipe.id)}
                  onToggleFavorite={() => toggleFavorite(recipe.id)}
                  onOpen={() => setSelected(recipe)}
                />
              </div>
            ))}
          </div>
        )}

        <RecipeModal
          recipe={selected}
          isOpen={!!selected}
          onClose={() => setSelected(null)}
          isFavorite={selected ? isFavorite(selected.id) : false}
          onToggleFavorite={() => selected && toggleFavorite(selected.id)}
        />
      </div>
    </div>
  );
}

export default function MyRecipes() {
  return (
    <ProtectedRoute requireAccess={false}>
      <MyRecipesContent />
    </ProtectedRoute>
  );
}
