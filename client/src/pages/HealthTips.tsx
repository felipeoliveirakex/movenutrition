import { useState } from "react";
import { ChevronDown, Heart, AlertCircle, Lightbulb, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface Tip {
  id: string;
  title: string;
  category: "alert" | "recipe" | "tip" | "emergency";
  views: string;
  content: string;
  benefits: string[];
  icon: string;
  difficulty: "fácil" | "médio" | "difícil";
}

const healthTips: Tip[] = [
  {
    id: "1",
    title: "Síndrome das Pernas Inquietas: Sinais de Alerta",
    category: "alert",
    views: "15.2M",
    content:
      "Mexer muito as pernas pode ser um sinal de alerta para síndrome das pernas inquietas. Essa condição afeta a qualidade do sono e pode indicar problemas de ansiedade ou deficiências nutricionais. Se você sente uma necessidade irresistível de mexer as pernas, especialmente à noite, procure um médico.",
    benefits: ["Reconhecer sintomas", "Melhorar qualidade do sono", "Saúde mental"],
    icon: "🔔",
    difficulty: "fácil",
  },
  {
    id: "2",
    title: "Os Riscos de Prender Espirro",
    category: "alert",
    views: "8.8M",
    content:
      "Prender o espirro pode ser perigoso! Quando você segura um espirro, a pressão pode danificar pequenos vasos sanguíneos no nariz e até aumentar o risco de aneurisma cerebral. O melhor é deixar o espirro sair naturalmente, cobrindo a boca com um lenço.",
    benefits: ["Prevenir lesões", "Saúde nasal", "Segurança"],
    icon: "🤧",
    difficulty: "fácil",
  },
  {
    id: "3",
    title: "Limpeza Intestinal Natural",
    category: "recipe",
    views: "6.1M",
    content:
      "Uma receita simples para limpeza intestinal que realmente funciona. Use ingredientes naturais como gengibre, limão e água morna. A combinação ajuda a estimular o trânsito intestinal e eliminar toxinas. Tome em jejum pela manhã.",
    benefits: ["Limpeza intestinal", "Melhor digestão", "Mais energia"],
    icon: "🧹",
    difficulty: "fácil",
  },
  {
    id: "4",
    title: "Como Parar o Soluço Rapidamente",
    category: "tip",
    views: "4.9M",
    content:
      "Soluço é uma contração involuntária do diafragma. Para parar rapidamente: 1) Leve um susto (ativa o sistema nervoso central), 2) Beba água gelada em pequenos goles, 3) Prenda a respiração por 10 segundos. Uma dessas técnicas deve funcionar em minutos.",
    benefits: ["Alívio rápido", "Sem medicamentos", "Prático"],
    icon: "😅",
    difficulty: "fácil",
  },
  {
    id: "5",
    title: "A Mistura Mais Perigosa: Energético + Álcool",
    category: "alert",
    views: "5.9M",
    content:
      "Misturar bebida energética com álcool é extremamente perigoso. A cafeína mascara os efeitos do álcool, levando a consumo excessivo. Essa combinação aumenta drasticamente o risco de arritmia cardíaca, infarto e morte súbita. Evite completamente!",
    benefits: ["Proteção cardíaca", "Prevenção de arritmia", "Segurança"],
    icon: "☠️",
    difficulty: "fácil",
  },
  {
    id: "6",
    title: "5 Hábitos Noturnos Perigosos",
    category: "alert",
    views: "4.7M",
    content:
      "Certos hábitos noturnos aumentam o risco de morte súbita durante o sono: 1) Dormir com o estômago muito cheio, 2) Consumir bebidas alcoólicas antes de dormir, 3) Dormir em posição muito confortável que restringe respiração, 4) Usar muitos travesseiros, 5) Dormir em ambiente muito quente.",
    benefits: ["Sono mais seguro", "Longevidade", "Saúde cardíaca"],
    icon: "😴",
    difficulty: "fácil",
  },
  {
    id: "7",
    title: "Medicamentos de Emergência para Carregar",
    category: "emergency",
    views: "4.8M",
    content:
      "Ande com esses 4 comprimidos no bolso: 1) Aspirina (para infarto), 2) Nitroglicerina (para angina), 3) Antiácido (para gases/azia), 4) Dipirona (para febre/dor). Ter esses medicamentos à mão pode salvar sua vida em uma emergência.",
    benefits: ["Preparação para emergências", "Proteção cardíaca", "Paz de espírito"],
    icon: "💊",
    difficulty: "fácil",
  },
  {
    id: "8",
    title: "Diagnóstico Intestinal pelo Som",
    category: "tip",
    views: "3M",
    content:
      "Você pode diagnosticar a saúde do seu intestino apenas ouvindo os sons! Sons normais indicam digestão saudável. Sons muito altos podem indicar gases ou diarreia. Ausência de sons pode indicar constipação. Aprenda a ouvir seu corpo.",
    benefits: ["Autodiagnóstico", "Saúde intestinal", "Conhecimento corporal"],
    icon: "👂",
    difficulty: "fácil",
  },
  {
    id: "9",
    title: "Exercício Diário para Melhorar Circulação",
    category: "tip",
    views: "2.5M",
    content:
      "Um exercício simples que melhora a circulação e desincha: Levante as pernas para cima enquanto está deitado, formando um ângulo de 90 graus. Mantenha por 2-3 minutos. Faça isso diariamente para melhorar a circulação e reduzir inchaço.",
    benefits: ["Melhor circulação", "Desinchar", "Mais energia"],
    icon: "🏃",
    difficulty: "fácil",
  },
  {
    id: "10",
    title: "Cravo da Índia para Fígado e Hálito",
    category: "recipe",
    views: "2.3M",
    content:
      "O cravo da índia é um remédio natural poderoso. Tomar cravo em chá ajuda a limpar o fígado, reduz gordura hepática e melhora o hálito. Coloque 3-4 cravos em uma xícara de água morna e deixe de molho por 10 minutos. Beba em jejum.",
    benefits: ["Limpeza hepática", "Melhor hálito", "Digestão"],
    icon: "🌿",
    difficulty: "fácil",
  },
];

const categories = [
  { id: "all", label: "Todos", icon: "📚" },
  { id: "alert", label: "Alertas de Saúde", icon: "🔔" },
  { id: "recipe", label: "Receitas Caseiras", icon: "🥗" },
  { id: "tip", label: "Dicas Práticas", icon: "💡" },
  { id: "emergency", label: "Emergências", icon: "🚨" },
];

export default function HealthTips() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedTip, setExpandedTip] = useState<string | null>(null);

  const filteredTips =
    selectedCategory === "all"
      ? healthTips
      : healthTips.filter((tip) => tip.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "alert":
        return "bg-red-50 border-red-200";
      case "recipe":
        return "bg-green-50 border-green-200";
      case "tip":
        return "bg-blue-50 border-blue-200";
      case "emergency":
        return "bg-orange-50 border-orange-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case "alert":
        return "bg-red-100 text-red-700";
      case "recipe":
        return "bg-green-100 text-green-700";
      case "tip":
        return "bg-blue-100 text-blue-700";
      case "emergency":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-green-100">
        <div className="container py-4">
          <Link href="/">
            <a className="flex items-center gap-2 text-green-700 hover:text-green-800 font-semibold mb-4">
              ← Voltar para Receitas
            </a>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-green-800 mb-2">
              💚 Dicas de Saúde
            </h1>
            <p className="text-gray-600">
              Conselhos baseados em dados de sucesso com milhões de visualizações
            </p>
          </div>
        </div>
      </header>

      {/* Category Filter */}
      <div className="container py-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                selectedCategory === cat.id
                  ? "bg-green-600 text-white shadow-lg"
                  : "bg-white text-gray-700 border border-green-200 hover:border-green-400"
              }`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tips Grid */}
      <div className="container pb-12">
        <div className="grid gap-4">
          {filteredTips.map((tip) => (
            <div
              key={tip.id}
              className={`border rounded-lg overflow-hidden transition-all ${getCategoryColor(
                tip.category
              )}`}
            >
              <button
                onClick={() =>
                  setExpandedTip(expandedTip === tip.id ? null : tip.id)
                }
                className="w-full p-4 text-left hover:opacity-80 transition-opacity"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{tip.icon}</span>
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full ${getCategoryBadgeColor(
                          tip.category
                        )}`}
                      >
                        {categories.find((c) => c.id === tip.category)?.label}
                      </span>
                      <span className="text-xs text-gray-500 ml-auto">
                        {tip.views} views
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">
                      {tip.title}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-600 transition-transform ${
                      expandedTip === tip.id ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              {expandedTip === tip.id && (
                <div className="px-4 pb-4 border-t border-current border-opacity-20">
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {tip.content}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {tip.benefits.map((benefit, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 bg-white bg-opacity-60 px-3 py-1 rounded-full text-sm text-gray-700"
                      >
                        <Heart className="w-4 h-4 text-red-500" />
                        {benefit}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Zap className="w-4 h-4" />
                    <span>Dificuldade: {tip.difficulty}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <section className="bg-green-600 text-white py-12">
        <div className="container text-center">
          <h2 className="text-2xl font-bold mb-4">
            Quer mais dicas personalizadas?
          </h2>
          <p className="mb-6 text-green-100">
            Explore nossas receitas e planos alimentares para uma vida mais
            saudável
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/">
              <Button variant="secondary" size="lg">
                📚 Ver Receitas
              </Button>
            </Link>
            <Link href="/plano">
              <Button variant="secondary" size="lg">
                📅 Plano Alimentar
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
