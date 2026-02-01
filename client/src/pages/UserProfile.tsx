import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { useViewHistory } from "@/hooks/useViewHistory";
import { useFavorites } from "@/hooks/useFavorites";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Heart,
  Eye,
  TrendingUp,
  Calendar,
  LogOut,
  Leaf,
} from "lucide-react";
import { Link, useLocation } from "wouter";
import recipesData from "@/data/recipes-complete.json";

export default function UserProfile() {
  const { user } = useSupabaseAuth();
  const [, setLocation] = useLocation();
  const { viewHistory, getRecentlyViewed } = useViewHistory();
  const { favorites } = useFavorites();

  const handleLogout = async () => {
    setLocation("/");
  };

  const recentlyViewed = getRecentlyViewed(5);
  const favoriteRecipes = recipesData.filter((r) => favorites.includes(r.id));

  const stats = [
    {
      label: "Receitas Visualizadas",
      value: viewHistory.length,
      icon: Eye,
      color: "bg-blue-100 text-blue-700",
    },
    {
      label: "Receitas Favoritas",
      value: favorites.length,
      icon: Heart,
      color: "bg-red-100 text-red-700",
    },
    {
      label: "Dias Ativo",
      value: new Set(
        viewHistory.map((r) =>
          new Date(r.viewedAt).toLocaleDateString()
        )
      ).size,
      icon: Calendar,
      color: "bg-green-100 text-green-700",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Green Header Bar */}
      <div className="h-2 bg-[#7cb342]"></div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b-2 border-black">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/membros">
              <a className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#7cb342] rounded-lg flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-black">Move Wellness</span>
              </a>
            </Link>

            <Button
              onClick={handleLogout}
              className="bg-black hover:bg-gray-800 text-white font-medium rounded-lg"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-green-50 border-b-2 border-[#7cb342]/20 py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-white border-2 border-black rounded-lg flex items-center justify-center">
              <User className="w-8 h-8 text-[#7cb342]" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-black">
                Bem-vindo, {user?.email?.split("@")[0]}!
              </h1>
              <p className="text-gray-600 mt-2">Seu progresso e estatísticas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={stat.label}
                  className="p-6 border-2 border-black hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">
                        {stat.label}
                      </p>
                      <p className="text-4xl font-bold text-black mt-2">
                        {stat.value}
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Recently Viewed */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-black mb-6 flex items-center gap-2">
              <Eye className="w-6 h-6 text-[#7cb342]" />
              Visualizadas Recentemente
            </h2>
            {recentlyViewed.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recentlyViewed.map((recipe) => {
                  const fullRecipe = recipesData.find((r) => r.id === recipe.id);
                  if (!fullRecipe) return null;
                  return (
                    <Card
                      key={recipe.id}
                      className="p-4 border-2 border-black hover:shadow-lg transition-shadow"
                    >
                      <p className="font-semibold text-black mb-2">
                        {fullRecipe.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        Visualizado em{" "}
                        {new Date(recipe.viewedAt).toLocaleDateString()}
                      </p>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-600">Nenhuma receita visualizada ainda</p>
            )}
          </div>

          {/* Favorites */}
          <div>
            <h2 className="text-2xl font-bold text-black mb-6 flex items-center gap-2">
              <Heart className="w-6 h-6 text-red-500" />
              Receitas Favoritas
            </h2>
            {favoriteRecipes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {favoriteRecipes.map((recipe) => (
                  <Card
                    key={recipe.id}
                    className="p-4 border-2 border-black hover:shadow-lg transition-shadow"
                  >
                    <p className="font-semibold text-black mb-2">
                      {recipe.name}
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      <Badge className="bg-[#7cb342] text-white">
                        {recipe.category}
                      </Badge>
                      <Badge className="bg-gray-200 text-gray-700">
                        {recipe.difficulty}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      🔥 {recipe.calories} kcal
                    </p>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">
                Nenhuma receita favoritada ainda. Comece a explorar!
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
