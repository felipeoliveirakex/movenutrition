import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Zap,
  Apple,
  TrendingDown,
  CheckCircle,
  ArrowRight,
  Leaf,
  ChevronDown,
} from "lucide-react";

export default function LandingPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "Quanto tempo leva para ver resultados?",
      a: "Você pode começar a ver mudanças em 2-3 semanas se seguir as receitas consistentemente.",
    },
    {
      q: "Preciso contar calorias?",
      a: "Não. Cada receita já vem com as calorias e macros calculados.",
    },
    {
      q: "As receitas são complicadas?",
      a: "Não. Todas levam menos de 20 minutos para preparar.",
    },
    {
      q: "Posso comer fora de casa?",
      a: "Sim. Você pode adaptar os princípios quando comer fora.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[oklch(0.98_0.02_145)] via-white to-[oklch(0.95_0.03_145)]">
      {/* HERO SECTION */}
      <section className="min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-[oklch(0.50_0.10_145)] to-[oklch(0.60_0.08_145)] rounded-2xl flex items-center justify-center shadow-lg">
              <Leaf className="w-8 h-8 text-white" />
            </div>
            <span className="text-2xl font-bold text-[oklch(0.30_0.05_145)]">
              Move Wellness
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl font-bold text-[oklch(0.30_0.05_145)] mb-6 leading-tight">
            Como Emagrecer Sem Abrir Mão do Sabor...
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-[oklch(0.50_0.05_145)] mb-8 leading-relaxed">
            Usando as mesmas receitas que milhares de pessoas já usaram para perder peso
          </p>

          {/* CTA Button */}
          <Link href="/login">
            <Button className="bg-gradient-to-r from-[oklch(0.50_0.10_145)] to-[oklch(0.55_0.09_145)] hover:from-[oklch(0.48_0.10_145)] hover:to-[oklch(0.53_0.09_145)] text-white font-bold h-14 px-8 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all">
              Acessar Minha Área de Membros
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>

          {/* Hero Image */}
          <div className="mt-16">
            <img
              src="/images/hero-healthy-food.jpg"
              alt="Comida Saudável"
              className="rounded-2xl shadow-2xl w-full max-w-2xl mx-auto"
            />
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION - LIGHT */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-[oklch(0.30_0.05_145)] mb-8 text-center">
            Você Já Parou Para Pensar...
          </h2>

          <div className="space-y-6 text-lg text-[oklch(0.50_0.05_145)] leading-relaxed">
            <p>
              Quantas dietas você já tentou? Provavelmente mais de uma.
            </p>

            <p>
              E sabe o que todas elas tinham em comum? Comida sem graça. Restrição. Sofrimento.
            </p>

            <p className="font-semibold text-[oklch(0.30_0.05_145)]">
              Por isso não funcionam. Não é falta de vontade sua. É que seu corpo não foi feito para viver em restrição.
            </p>
          </div>
        </div>
      </section>

      {/* REFRAME SECTION */}
      <section className="py-20 px-4 bg-gradient-to-br from-[oklch(0.98_0.02_145)] to-[oklch(0.95_0.03_145)]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-[oklch(0.30_0.05_145)] mb-8 text-center">
            E Se Fosse Diferente?
          </h2>

          <div className="space-y-6 text-lg text-[oklch(0.50_0.05_145)] leading-relaxed">
            <p>
              E se você pudesse emagrecer comendo comida que você realmente gosta?
            </p>

            <p>
              Não é fantasia. É exatamente o que as receitas de Move Wellness fazem.
            </p>

            <p className="font-semibold text-[oklch(0.30_0.05_145)]">
              Elas foram desenvolvidas para deixar você saciado, com energia, e feliz. Tudo ao mesmo tempo.
            </p>
          </div>
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-[oklch(0.30_0.05_145)] mb-4 text-center">
            Por Que Essas Receitas Funcionam
          </h2>
          <p className="text-center text-lg text-[oklch(0.50_0.05_145)] mb-12 max-w-2xl mx-auto">
            Entenda exatamente como as receitas de Move Wellness ajudam você a emagrecer
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: TrendingDown,
                title: "Saciedade Real",
                desc: "Proteína e fibra balanceadas. Você come e fica satisfeito. Não fica com fome 2 horas depois.",
              },
              {
                icon: Zap,
                title: "Metabolismo Acelerado",
                desc: "Ingredientes que naturalmente aumentam seu metabolismo. Você queima mais sem fazer nada de especial.",
              },
              {
                icon: Heart,
                title: "Energia o Dia Todo",
                desc: "Sem aquela queda de energia da tarde. Sem aquele cansaço que te faz comer besteira.",
              },
              {
                icon: Apple,
                title: "Sem Culpa",
                desc: "Porque você está comendo comida de verdade. Comida que deixa você feliz. Não é restrição.",
              },
            ].map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={i}
                  className="bg-gradient-to-br from-[oklch(0.98_0.02_145)] to-[oklch(0.95_0.03_145)] p-6 rounded-xl border border-[oklch(0.90_0.02_145)] hover:shadow-lg transition-shadow"
                >
                  <Icon className="w-10 h-10 text-[oklch(0.50_0.10_145)] mb-4" />
                  <h3 className="text-xl font-bold text-[oklch(0.30_0.05_145)] mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-[oklch(0.50_0.05_145)]">{benefit.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-4 bg-gradient-to-br from-[oklch(0.98_0.02_145)] to-[oklch(0.95_0.03_145)]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-[oklch(0.30_0.05_145)] mb-12 text-center">
            Como Começa
          </h2>

          <div className="space-y-4">
            {[
              { step: "Você entra na sua área de membros.", num: 1 },
              { step: "Você vê 50+ receitas organizadas por categoria e benefício.", num: 2 },
              { step: "Você escolhe as que você realmente quer comer.", num: 3 },
              { step: "Você começa. Simples assim.", num: 4 },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-[oklch(0.50_0.10_145)] text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  {item.num}
                </div>
                <p className="text-lg text-[oklch(0.50_0.05_145)] pt-1">{item.step}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/login">
              <Button className="bg-gradient-to-r from-[oklch(0.50_0.10_145)] to-[oklch(0.55_0.09_145)] hover:from-[oklch(0.48_0.10_145)] hover:to-[oklch(0.53_0.09_145)] text-white font-bold h-14 px-8 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all">
                Acessar Minha Área de Membros
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-[oklch(0.30_0.05_145)] mb-12 text-center">
            Dúvidas Comuns
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border border-[oklch(0.90_0.02_145)] rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full p-6 flex items-center justify-between bg-[oklch(0.98_0.02_145)] hover:bg-[oklch(0.95_0.03_145)] transition-colors"
                >
                  <span className="text-lg font-semibold text-[oklch(0.30_0.05_145)] text-left">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[oklch(0.50_0.10_145)] transition-transform ${
                      expandedFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {expandedFaq === i && (
                  <div className="p-6 bg-white border-t border-[oklch(0.90_0.02_145)]">
                    <p className="text-[oklch(0.50_0.05_145)]">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-[oklch(0.50_0.10_145)] to-[oklch(0.55_0.09_145)]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Pronto Para Começar?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Clique abaixo e acesse sua área de membros agora.
          </p>

          <Link href="/login">
            <Button className="bg-white text-[oklch(0.50_0.10_145)] hover:bg-gray-100 font-bold h-14 px-8 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all">
              Acessar Minha Área de Membros
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
