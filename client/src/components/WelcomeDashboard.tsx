import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  Calendar,
  Calculator,
  Heart,
  Lightbulb,
  ArrowRight,
} from "lucide-react";

interface WelcomeDashboardProps {
  user: User;
  onStartExploring: () => void;
  onViewCategory: (category: string) => void;
}

export function WelcomeDashboard({
  user,
  onStartExploring,
  onViewCategory,
}: WelcomeDashboardProps) {
  const firstName = user.user_metadata?.name?.split(" ")[0] || "Bem-vindo";

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-green-50 to-white">
      {/* Green Header Bar */}
      <div className="h-2 bg-[#7cb342]"></div>

      {/* Welcome Section */}
      <div className="container mx-auto px-4 py-12">
        {/* Hero Welcome */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-black mb-4">
            Bem-vindo, <span className="text-[#7cb342]">{firstName}!</span>
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Você está pronto para transformar sua alimentação e saúde?
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-12">
            <div className="bg-white border-2 border-black rounded-lg p-6">
              <div className="text-3xl font-bold text-[#7cb342] mb-2">50+</div>
              <div className="text-sm text-gray-600">Receitas</div>
            </div>
            <div className="bg-white border-2 border-black rounded-lg p-6">
              <div className="text-3xl font-bold text-[#7cb342] mb-2">7</div>
              <div className="text-sm text-gray-600">Categorias</div>
            </div>
            <div className="bg-white border-2 border-black rounded-lg p-6">
              <div className="text-3xl font-bold text-[#7cb342] mb-2">9</div>
              <div className="text-sm text-gray-600">Benefícios</div>
            </div>
          </div>

          {/* Main CTA */}
          <Button
            onClick={onStartExploring}
            className="bg-black hover:bg-gray-900 text-white font-semibold h-14 px-8 rounded-lg text-lg mb-12"
          >
            Explorar Receitas
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* Quick Access Cards */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-black mb-8 text-center">
            O que você pode fazer
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recipes Card */}
            <Card className="border-2 border-black hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => onViewCategory("receitas")}>
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-[#7cb342]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-7 h-7 text-[#7cb342]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-black mb-2">
                      Descobrir Receitas
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Explore 50+ receitas saudáveis, práticas e deliciosas para
                      emagrecer, aumentar imunidade e ter mais energia.
                    </p>
                    <div className="flex items-center text-[#7cb342] font-semibold">
                      Ver receitas <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Meal Plan Card */}
            <Card className="border-2 border-black hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => onViewCategory("plano")}>
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-[#7cb342]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-7 h-7 text-[#7cb342]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-black mb-2">
                      📅 Plano Alimentar
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Crie seu plano alimentar personalizado com base em seus
                      objetivos e preferências.
                    </p>
                    <div className="flex items-center text-[#7cb342] font-semibold">
                      Criar plano <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Calculator Card */}
            <Card className="border-2 border-black hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => onViewCategory("calculadora")}>
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-[#7cb342]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calculator className="w-7 h-7 text-[#7cb342]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-black mb-2">
                      🧮 Calculadora
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Calcule suas calorias diárias e macronutrientes para
                      atingir seus objetivos.
                    </p>
                    <div className="flex items-center text-[#7cb342] font-semibold">
                      Calcular <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Health Tips Card */}
            <Card className="border-2 border-black hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => onViewCategory("dicas")}>
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-[#7cb342]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-7 h-7 text-[#7cb342]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-black mb-2">
                      💚 Dicas de Saúde
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Aprenda dicas práticas de saúde e bem-estar para
                      transformar seu estilo de vida.
                    </p>
                    <div className="flex items-center text-[#7cb342] font-semibold">
                      Ver dicas <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="max-w-3xl mx-auto bg-white border-2 border-black rounded-lg p-8 mb-16">
          <h3 className="text-2xl font-bold text-black mb-6">
            Por que escolher Move Wellness?
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-[#7cb342] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-bold">✓</span>
              </div>
              <span className="text-gray-700">
                Receitas práticas e deliciosas, sem culpa
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-[#7cb342] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-bold">✓</span>
              </div>
              <span className="text-gray-700">
                Transforme sua saúde, energia e autoestima
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-[#7cb342] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-bold">✓</span>
              </div>
              <span className="text-gray-700">
                Acesso a ferramentas de planejamento e cálculo
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-[#7cb342] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-bold">✓</span>
              </div>
              <span className="text-gray-700">
                Comunidade de pessoas com os mesmos objetivos
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-black text-white py-6 px-4 text-center text-sm border-t-2 border-[#7cb342]">
        <p>© 2024 Move Wellness. Todos os direitos reservados.</p>
      </div>
    </div>
  );
}
