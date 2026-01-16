/*
  Design: Organic Minimalism
  - Hero assimétrico com imagem de ingredientes frescos
  - Filtros com badges orgânicos
  - Grid de receitas com cards suaves
  - Seções com divisores ondulados
  - Paleta: sage, terracotta, coral, cream
*/

import { useState, useMemo, useEffect } from "react";
import { Link } from "wouter";
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
  Filter
} from "lucide-react";
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

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBenefits, setSelectedBenefits] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
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

      const matchesCategory =
        !selectedCategory || recipe.category === selectedCategory;

      return matchesSearch && matchesBenefits && matchesCategory;
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

  return (
    <div className="min-h-screen bg-[oklch(0.98_0.008_85)]">
      {/* Header */}
      <header 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-white/90 backdrop-blur-lg shadow-sm" 
            : "bg-transparent"
        }`}
      >
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[oklch(0.50_0.10_145)] to-[oklch(0.60_0.08_145)] rounded-2xl flex items-center justify-center shadow-lg shadow-[oklch(0.50_0.10_145)]/20">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-display font-bold text-foreground">
                  Wellness Hub
                </h1>
                <p className="text-xs text-muted-foreground hidden sm:block">
                  Receitas para sua saúde
                </p>
              </div>
            </div>
            
            {favorites.length > 0 && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 rounded-full">
                <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                <span className="text-sm font-semibold text-red-600">
                  {favorites.length}
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.92_0.02_145)] via-[oklch(0.96_0.01_85)] to-[oklch(0.94_0.03_55)]" />
        
        {/* Decorative blobs */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-[oklch(0.50_0.10_145)]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-[oklch(0.72_0.10_55)]/10 rounded-full blur-3xl" />
        
        <div className="container relative py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-[oklch(0.50_0.10_145)]">
                <Sparkles className="w-4 h-4" />
                +50 receitas saudáveis
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-[oklch(0.25_0.03_55)] leading-tight">
                Transforme sua
                <span className="block text-[oklch(0.50_0.10_145)]">alimentação</span>
              </h2>
              
              <p className="text-lg text-[oklch(0.40_0.03_55)] max-w-md">
                Descubra receitas práticas e deliciosas para emagrecer, 
                aumentar a imunidade e ter mais energia no dia a dia.
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Buscar receitas, ingredientes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-14 bg-white border-0 shadow-lg shadow-[oklch(0.50_0.10_145)]/10 rounded-2xl text-base focus-visible:ring-[oklch(0.50_0.10_145)]"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                )}
              </div>
              
              {/* Quick Stats */}
              <div className="flex gap-6 pt-4">
                <div>
                  <p className="text-3xl font-display font-bold text-[oklch(0.50_0.10_145)]">50+</p>
                  <p className="text-sm text-muted-foreground">Receitas</p>
                </div>
                <div>
                  <p className="text-3xl font-display font-bold text-[oklch(0.72_0.10_55)]">7</p>
                  <p className="text-sm text-muted-foreground">Categorias</p>
                </div>
                <div>
                  <p className="text-3xl font-display font-bold text-[oklch(0.78_0.12_25)]">9</p>
                  <p className="text-sm text-muted-foreground">Benefícios</p>
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="flex flex-wrap gap-3 pt-2">
                <Link href="/plano">
                  <a className="inline-flex items-center gap-2 px-4 py-2.5 bg-white rounded-full text-sm font-medium text-[oklch(0.50_0.10_145)] hover:shadow-md transition-all">
                    📅 Plano Alimentar
                  </a>
                </Link>
                <Link href="/calculadora">
                  <a className="inline-flex items-center gap-2 px-4 py-2.5 bg-white rounded-full text-sm font-medium text-[oklch(0.72_0.10_55)] hover:shadow-md transition-all">
                    🧮 Calculadora
                  </a>
                </Link>
              </div>
            </div>
            
            {/* Hero Image */}
            <div className="relative hidden md:block">
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl shadow-[oklch(0.50_0.10_145)]/20 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <img
                  src="/images/hero-healthy-food.jpg"
                  alt="Ingredientes saudáveis"
                  className="w-full h-[400px] object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[oklch(0.72_0.10_55)] rounded-3xl -z-10" />
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-[oklch(0.78_0.12_25)] rounded-full -z-10" />
            </div>
          </div>
        </div>
        
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg viewBox="0 0 1440 100" className="w-full h-16 fill-[oklch(0.98_0.008_85)]">
            <path d="M0,50 C360,100 720,0 1080,50 C1260,75 1380,25 1440,50 L1440,100 L0,100 Z" />
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <main className="container py-8">
        {/* Filter Toggle Mobile */}
        <div className="md:hidden mb-4">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="w-full justify-between rounded-xl h-12"
          >
            <span className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filtros
              {activeFiltersCount > 0 && (
                <Badge className="bg-[oklch(0.50_0.10_145)] text-white">
                  {activeFiltersCount}
                </Badge>
              )}
            </span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </Button>
        </div>

        {/* Filters Section */}
        <div className={`mb-8 space-y-6 bg-white p-6 rounded-3xl shadow-sm ${showFilters ? "block" : "hidden md:block"}`}>
          {/* Category Filter */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-[oklch(0.92_0.02_145)] rounded-lg flex items-center justify-center text-xs">
                📂
              </span>
              Categorias
            </h3>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <Button
                  key={cat.id}
                  variant={selectedCategory === cat.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleCategory(cat.id)}
                  className={`rounded-full transition-all ${
                    selectedCategory === cat.id
                      ? "bg-[oklch(0.50_0.10_145)] hover:bg-[oklch(0.45_0.10_145)] border-0"
                      : "hover:bg-[oklch(0.96_0.02_145)] hover:border-[oklch(0.50_0.10_145)]"
                  }`}
                >
                  <span className="mr-1.5">{cat.emoji}</span>
                  {cat.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Benefits Filter */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-[oklch(0.90_0.05_55)] rounded-lg flex items-center justify-center text-xs">
                ✨
              </span>
              Benefícios
            </h3>
            <div className="flex flex-wrap gap-2">
              {BENEFITS.map((benefit) => {
                const Icon = benefit.icon;
                const isSelected = selectedBenefits.includes(benefit.id);
                return (
                  <Badge
                    key={benefit.id}
                    variant={isSelected ? "default" : "outline"}
                    className={`cursor-pointer px-3 py-1.5 rounded-full transition-all ${
                      isSelected
                        ? "bg-[oklch(0.50_0.10_145)] text-white border-0 hover:bg-[oklch(0.45_0.10_145)]"
                        : "hover:bg-[oklch(0.96_0.02_145)] hover:border-[oklch(0.50_0.10_145)]"
                    }`}
                    onClick={() => toggleBenefit(benefit.id)}
                  >
                    <Icon className="w-3.5 h-3.5 mr-1.5" />
                    {benefit.label}
                  </Badge>
                );
              })}
            </div>
          </div>

          {/* Reset Button */}
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4 mr-1" />
              Limpar filtros ({activeFiltersCount})
            </Button>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{filteredRecipes.length}</span> receita{filteredRecipes.length !== 1 ? "s" : ""} encontrada{filteredRecipes.length !== 1 ? "s" : ""}
          </p>
          {filteredRecipes.length > 0 && (
            <p className="text-xs text-muted-foreground hidden sm:block">
              Clique em uma receita para ver detalhes
            </p>
          )}
        </div>

        {/* Recipes Grid */}
        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                isFavorite={favorites.includes(recipe.id)}
                onToggleFavorite={() => toggleFavorite(recipe.id)}
                onOpen={() => setSelectedRecipe(recipe)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl">
            <div className="text-6xl mb-4">🥗</div>
            <h3 className="text-xl font-display font-semibold text-foreground mb-2">
              Nenhuma receita encontrada
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Tente ajustar os filtros ou buscar por outros termos para encontrar receitas deliciosas.
            </p>
            <Button 
              onClick={resetFilters}
              className="rounded-full bg-[oklch(0.50_0.10_145)] hover:bg-[oklch(0.45_0.10_145)]"
            >
              Limpar filtros
            </Button>
          </div>
        )}
      </main>

      {/* Features Section */}
      <section className="bg-gradient-to-br from-[oklch(0.92_0.02_145)] to-[oklch(0.96_0.01_85)] py-16 mt-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Por que escolher nossas receitas?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Todas as receitas foram cuidadosamente selecionadas para ajudar você a alcançar seus objetivos de saúde.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm text-center">
              <div className="w-16 h-16 bg-[oklch(0.92_0.02_145)] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <img src="/images/smoothie-detox.jpg" alt="Detox" className="w-12 h-12 rounded-xl object-cover" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">Receitas Práticas</h3>
              <p className="text-sm text-muted-foreground">
                Preparos rápidos de 2 a 30 minutos, perfeitos para o dia a dia corrido.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-sm text-center">
              <div className="w-16 h-16 bg-[oklch(0.90_0.05_55)] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <img src="/images/breakfast-healthy.jpg" alt="Café da manhã" className="w-12 h-12 rounded-xl object-cover" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">Ingredientes Naturais</h3>
              <p className="text-sm text-muted-foreground">
                Apenas ingredientes naturais e acessíveis, sem ultraprocessados.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-sm text-center">
              <div className="w-16 h-16 bg-[oklch(0.95_0.05_25)] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <img src="/images/tea-herbs.jpg" alt="Chás" className="w-12 h-12 rounded-xl object-cover" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">Benefícios Comprovados</h3>
              <p className="text-sm text-muted-foreground">
                Cada receita com informações nutricionais e benefícios para sua saúde.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[oklch(0.25_0.03_55)] text-white py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[oklch(0.50_0.10_145)] rounded-2xl flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-display font-bold">Wellness Diet Hub</h3>
                <p className="text-sm text-white/60">Sua jornada para uma vida mais saudável</p>
              </div>
            </div>
            
            <p className="text-sm text-white/60">
              © 2025 Wellness Diet Hub. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Recipe Modal */}
      <RecipeModal
        recipe={selectedRecipe}
        isOpen={!!selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
        isFavorite={selectedRecipe ? favorites.includes(selectedRecipe.id) : false}
        onToggleFavorite={() => selectedRecipe && toggleFavorite(selectedRecipe.id)}
      />
    </div>
  );
}
