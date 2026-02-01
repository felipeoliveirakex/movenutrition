import { useState, useMemo, useEffect } from "react";
import { useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Leaf, 
  Heart, 
  Sparkles, 
  Zap, 
  Moon, 
  Flame,
  Droplets,
  Coffee,
  Apple,
  ChevronDown,
  X,
  Filter,
  LogOut,
  ArrowRight,
  Calendar
} from "lucide-react";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import RecipeModal from "@/components/RecipeModal";
import RecipeCard from "@/components/RecipeCard";
import recipesData from "@/data/recipes-complete.json";

type Recipe = typeof recipesData[0];

const BENEFITS = [
  { id: "imunidade", label: "Imunidade", icon: Sparkles },
  { id: "metabolismo", label: "Metabolismo", icon: Flame },
  { id: "energia", label: "Energia", icon: Zap },
  { id: "emagrecimento", label: "Emagrecimento", icon: Leaf },
  { id: "sono", label: "Sono", icon: Moon },
  { id: "digestão", label: "Digestão", icon: Apple },
  { id: "anti-inflamação", label: "Anti-inflamação", icon: Heart },
  { id: "desinchaço", label: "Desinchaço", icon: Droplets },
  { id: "saciedade", label: "Saciedade", icon: Coffee },
];

const CATEGORIES = [
  { id: "shots", label: "Shots Matinais", emoji: "🍋" },
  { id: "cafés", label: "Cafés & Pães", emoji: "☕" },
  { id: "chás", label: "Chás", emoji: "🍵" },
  { id: "sucos", label: "Sucos Detox", emoji: "🥤" },
  { id: "água", label: "Água Detox", emoji: "💧" },
  { id: "refeições", label: "Refeições", emoji: "🍽️" },
  { id: "lanches", label: "Lanches & Sobremesas", emoji: "🍪" },
];

// Weekly suggestions
const WEEKLY_SUGGESTIONS = [
  {
    week: "Semana 1",
    description: "Detox & Energia",
    recipes: ["Suco Verde Detox", "Chá de Gengibre", "Água Detox Limão"],
    color: "from-green-50 to-emerald-50",
    borderColor: "border-green-200",
  },
  {
    week: "Semana 2",
    description: "Imunidade Forte",
    recipes: ["Shot de Gengibre", "Chá Antioxidante", "Suco Laranja"],
    color: "from-orange-50 to-amber-50",
    borderColor: "border-orange-200",
  },
  {
    week: "Semana 3",
    description: "Emagrecimento",
    recipes: ["Suco Queimador", "Chá Termogênico", "Água Detox"],
    color: "from-red-50 to-pink-50",
    borderColor: "border-red-200",
  },
  {
    week: "Semana 4",
    description: "Sono & Relaxo",
    recipes: ["Chá Camomila", "Leite Dourado", "Chá Valeriana"],
    color: "from-purple-50 to-indigo-50",
    borderColor: "border-purple-200",
  },
];

function HomeContent() {
  const [, setLocation] = useLocation();
  const { user, logout } = useSupabaseAuth();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBenefits, setSelectedBenefits] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Load favorites from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("wellness-favorites");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem("wellness-favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Track scroll for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredRecipes = useMemo(() => {
    return recipesData.filter((recipe) => {
      const matchesSearch =
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.ingredients.some((ing) =>
          ing.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesBenefits =
        selectedBenefits.length === 0 ||
        selectedBenefits.some((benefit) =>
          recipe.benefits.includes(benefit)
        );

      const matchesDifficulty =
        !selectedDifficulty || recipe.difficulty === selectedDifficulty;

      const matchesCategory =
        !selectedCategory || recipe.category === selectedCategory;

      return matchesSearch && matchesBenefits && matchesCategory && matchesDifficulty;
    });
  }, [searchTerm, selectedBenefits, selectedCategory]);

  const toggleBenefit = (benefit: string) => {
    setSelectedBenefits((prev) =>
      prev.includes(benefit)
        ? prev.filter((b) => b !== benefit)
        : [...prev, benefit]
    );
  };

  const toggleCategory = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedBenefits([]);
    setSelectedCategory(null);
  };

  const activeFiltersCount = selectedBenefits.length + (selectedCategory ? 1 : 0);
  const firstName = user?.user_metadata?.name?.split(" ")[0] || "Bem-vindo";

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Green Header Bar */}
      <div className="h-2 bg-[#7cb342]"></div>

      {/* Header */}
      <header 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-white shadow-sm" 
            : "bg-white"
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#7cb342] to-[#689c3a] rounded-2xl flex items-center justify-center shadow-lg">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-black">Move Wellness</h1>
                <p className="text-xs text-gray-600 hidden sm:block">Receitas para sua saúde</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {favorites.length > 0 && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 rounded-full">
                  <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                  <span className="text-sm font-semibold text-red-600">
                    {favorites.length}
                  </span>
                </div>
              )}
              <button
                onClick={logout}
                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors text-black"
                title="Sair"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium hidden sm:inline">Sair</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Welcome Hero Section */}
      <section className="bg-gradient-to-b from-green-50 to-white py-12 border-b-2 border-[#7cb342]/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-3">
              Bem-vindo, <span className="text-[#7cb342]">{firstName}!</span>
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Escolha suas receitas e transforme sua alimentação. 50+ receitas práticas, deliciosas e sem culpa.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-white border-2 border-black rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-[#7cb342]">50+</div>
                <div className="text-xs text-gray-600">Receitas</div>
              </div>
              <div className="bg-white border-2 border-black rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-[#7cb342]">7</div>
                <div className="text-xs text-gray-600">Categorias</div>
              </div>
              <div className="bg-white border-2 border-black rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-[#7cb342]">9</div>
                <div className="text-xs text-gray-600">Benéficios</div>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-2 gap-4">
              <a
                href="/meal-plan"
                className="bg-white border-2 border-black rounded-lg p-6 hover:shadow-lg hover:bg-green-50 transition-all group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-[#7cb342] rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-[#7cb342] group-hover:translate-x-1 transition-transform" />
                </div>
                <h4 className="font-bold text-black mb-1">Plano Alimentar</h4>
                <p className="text-sm text-gray-600">Cardápio semanal personalizado</p>
              </a>

              <a
                href="/calculator"
                className="bg-white border-2 border-black rounded-lg p-6 hover:shadow-lg hover:bg-green-50 transition-all group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-[#7cb342] rounded-lg flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-[#7cb342] group-hover:translate-x-1 transition-transform" />
                </div>
                <h4 className="font-bold text-black mb-1">Calculadora</h4>
                <p className="text-sm text-gray-600">Calorias e macros personalizados</p>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Weekly Suggestions */}
      <section className="py-12 border-b-2 border-[#7cb342]/20">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-black mb-8 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-[#7cb342]" />
            Sugestões de Semana
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {WEEKLY_SUGGESTIONS.map((suggestion, idx) => (
              <div
                key={idx}
                className={`bg-gradient-to-br ${suggestion.color} border-2 ${suggestion.borderColor} rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer`}
              >
                <div className="mb-4">
                  <h4 className="text-lg font-bold text-black mb-1">{suggestion.week}</h4>
                  <p className="text-sm text-gray-700 font-medium">{suggestion.description}</p>
                </div>
                <div className="space-y-2">
                  {suggestion.recipes.map((recipe, i) => (
                    <div key={i} className="text-sm text-gray-700 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#7cb342] rounded-full"></span>
                      {recipe}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 border-b-2 border-[#7cb342]/20">
        <div className="container mx-auto px-4">
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar receitas ou ingredientes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-2 border-black rounded-lg h-12 text-black placeholder:text-gray-400 focus:border-[#7cb342] focus:ring-[#7cb342]"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border-2 border-black rounded-lg hover:bg-gray-50 transition-colors font-semibold text-black"
            >
              <Filter className="w-4 h-4" />
              Filtros
              {activeFiltersCount > 0 && (
                <Badge className="ml-2 bg-[#7cb342] text-white">{activeFiltersCount}</Badge>
              )}
              <ChevronDown className={`w-4 h-4 ml-auto transition-transform ${showFilters ? "rotate-180" : ""}`} />
            </button>

            {/* Filters */}
            {showFilters && (
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg border-2 border-black">
                {/* Categories */}
                <div>
                  <h4 className="font-semibold text-black mb-3">Categorias</h4>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => toggleCategory(cat.id)}
                        className={`px-3 py-2 rounded-full border-2 transition-all font-medium ${
                          selectedCategory === cat.id
                            ? "bg-[#7cb342] text-white border-[#7cb342]"
                            : "bg-white text-black border-black hover:border-[#7cb342]"
                        }`}
                      >
                        {cat.emoji} {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div>
                  <h4 className="font-semibold text-black mb-3">Benefícios</h4>
                  <div className="flex flex-wrap gap-2">
                    {BENEFITS.map((benefit) => {
                      const Icon = benefit.icon;
                      return (
                        <button
                          key={benefit.id}
                          onClick={() => toggleBenefit(benefit.id)}
                          className={`px-3 py-2 rounded-full border-2 transition-all font-medium flex items-center gap-2 ${
                            selectedBenefits.includes(benefit.id)
                              ? "bg-[#7cb342] text-white border-[#7cb342]"
                              : "bg-white text-black border-black hover:border-[#7cb342]"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          {benefit.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Reset Filters */}
                {activeFiltersCount > 0 && (
                  <button
                    onClick={resetFilters}
                    className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-black rounded-lg hover:bg-gray-100 transition-colors font-semibold text-black"
                  >
                    <X className="w-4 h-4" />
                    Limpar Filtros
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Recipes Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-black">
              {selectedCategory || selectedBenefits.length > 0 || searchTerm
                ? `${filteredRecipes.length} Receitas encontradas`
                : "Todas as Receitas"}
            </h3>
          </div>

          {filteredRecipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  isFavorite={favorites.includes(recipe.id)}
                  onOpen={() => setSelectedRecipe(recipe)}
                  onToggleFavorite={() => toggleFavorite(recipe.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg mb-4">Nenhuma receita encontrada com esses filtros.</p>
              <button
                onClick={resetFilters}
                className="px-6 py-2 bg-[#7cb342] text-white font-semibold rounded-lg hover:bg-[#6ba338] transition-colors"
              >
                Limpar Filtros
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-6 px-4 text-center text-sm border-t-2 border-[#7cb342]">
        <p>© 2024 Move Wellness. Todos os direitos reservados.</p>
      </footer>

      {/* Recipe Modal */}
      <RecipeModal
        recipe={selectedRecipe}
        isOpen={selectedRecipe !== null}
        onClose={() => setSelectedRecipe(null)}
        isFavorite={selectedRecipe ? favorites.includes(selectedRecipe.id) : false}
        onToggleFavorite={() => selectedRecipe && toggleFavorite(selectedRecipe.id)}
      />
    </div>
  );
}

export default function Home() {
  return (
    <ProtectedRoute requireAccess={false}>
      <HomeContent />
    </ProtectedRoute>
  );
}
