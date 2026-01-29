import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  const [email, setEmail] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "Quanto tempo leva para ver resultados?",
      a: "Você pode começar a ver mudanças em 2-3 semanas se seguir as receitas consistentemente. Mas os melhores resultados aparecem em 30-60 dias.",
    },
    {
      q: "Preciso contar calorias?",
      a: "Não. Cada receita já vem com as calorias e macros calculados. Você só precisa seguir.",
    },
    {
      q: "As receitas são complicadas?",
      a: "Não. Todas as receitas foram desenvolvidas para serem simples e rápidas. Nada que leve mais de 20 minutos.",
    },
    {
      q: "Posso comer fora de casa?",
      a: "Sim. As receitas são para você preparar em casa, mas você pode adaptar os princípios quando comer fora.",
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
            Como Emagrecer Sem Abrir Mão do Sabor
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-[oklch(0.50_0.05_145)] mb-8 leading-relaxed">
            Descobrindo as receitas que seus clientes já estão usando para perder peso enquanto comem bem
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

      {/* PROBLEM SECTION */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-[oklch(0.30_0.05_145)] mb-8 text-center">
            A Verdade Que Ninguém Te Conta Sobre Dietas...
          </h2>

          <div className="space-y-6 text-lg text-[oklch(0.50_0.05_145)] leading-relaxed">
            <p>
              Você já tentou emagrecer, certo? Provavelmente já fez de tudo: cortou carboidratos, comeu só salada, tomou aquele chá milagroso que promete queimar gordura enquanto você dorme...
            </p>

            <p>
              Mas sabe o que acontece? Você perde peso nos primeiros dias. Fica animado. Acha que dessa vez vai dar certo...
            </p>

            <p>
              Aí chega o fim de semana. Você vê aquele bolo de chocolate. Aquele suco natural. Aquela comida que você ama... E pensa: "Só um pedacinho não vai fazer mal..."
            </p>

            <p className="font-semibold text-[oklch(0.30_0.05_145)]">
              Mas um pedacinho vira dois. Dois viram três. E antes de você perceber, você está de volta ao ponto de partida.
            </p>

            <div className="bg-[oklch(0.95_0.03_145)] p-6 rounded-lg border-l-4 border-[oklch(0.50_0.10_145)]">
              <p className="font-bold text-[oklch(0.30_0.05_145)] mb-4">
                Porque a verdade é essa: Dietas que tiram o sabor não funcionam.
              </p>
              <p>
                Elas funcionam por uma semana, duas no máximo. Depois você desiste porque é humanamente impossível comer comida sem graça pelo resto da vida.
              </p>
            </div>
          </div>

          {/* The Vicious Cycle */}
          <div className="mt-12 grid md:grid-cols-2 gap-4">
            {[
              "Você tenta uma dieta restritiva",
              "Perde peso nos primeiros dias",
              "Fica com fome e vontade de comer",
              "Desiste e volta a comer normalmente",
              "Recupera todo o peso (e mais)",
              "Se sente fracassado e culpado",
            ].map((step, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-[oklch(0.95_0.03_145)] to-[oklch(0.92_0.02_145)] p-4 rounded-lg border border-[oklch(0.90_0.02_145)]"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[oklch(0.50_0.10_145)] text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    {i + 1}
                  </div>
                  <p className="text-[oklch(0.50_0.05_145)] font-medium">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION SECTION */}
      <section className="py-20 px-4 bg-gradient-to-br from-[oklch(0.98_0.02_145)] to-[oklch(0.95_0.03_145)]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-[oklch(0.30_0.05_145)] mb-8 text-center">
            E Se Você Pudesse Emagrecer Comendo Comida Gostosa?
          </h2>

          <div className="space-y-6 text-lg text-[oklch(0.50_0.05_145)] leading-relaxed mb-12">
            <p>
              Imagine isso por um momento... Acordar de manhã e tomar um café delicioso que acelera seu metabolismo.
            </p>

            <p>
              Almoçar uma refeição saudável que deixa você saciado até a noite. Lanchar algo que você realmente gosta (sem culpa).
            </p>

            <p>
              E no final do mês, olhar para a balança e ver que você perdeu 3, 4, 5 quilos...
            </p>

            <p className="font-bold text-[oklch(0.30_0.05_145)] text-xl">
              Sem ter passado fome. Sem ter comido comida chata. Sem ter abandonado sua vida social.
            </p>

            <p>
              Isso não é fantasia. Isso é exatamente o que Move Wellness oferece.
            </p>
          </div>

          {/* What is Move Wellness */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-[oklch(0.30_0.05_145)] mb-6">
              O Que É Move Wellness?
            </h3>

            <p className="text-[oklch(0.50_0.05_145)] mb-6 text-lg">
              Move Wellness é uma plataforma com mais de 50 receitas científicas desenvolvidas especificamente para quem quer emagrecer sem abrir mão do sabor.
            </p>

            <div className="space-y-4">
              {[
                { title: "Receitas Com Sabor", desc: "Você não vai comer comida de hospital. Cada receita foi testada para garantir que você realmente vai querer comer." },
                { title: "Macros Balanceados", desc: "Cada receita tem o equilíbrio perfeito de proteína, carboidratos e gordura para manter você saciado." },
                { title: "Ingredientes Que Aceleram", desc: "Certos ingredientes naturalmente aumentam seu gasto calórico. É ciência, não mágica." },
                { title: "Variedade", desc: "50+ receitas significa que você nunca vai ficar entediado. Shots, cafés, chás, sucos, refeições..." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <CheckCircle className="w-6 h-6 text-[oklch(0.50_0.10_145)] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-[oklch(0.30_0.05_145)] mb-1">
                      {item.title}
                    </h4>
                    <p className="text-[oklch(0.50_0.05_145)]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-[oklch(0.30_0.05_145)] mb-12 text-center">
            O Que Você Vai Conseguir Com Move Wellness
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: TrendingDown,
                title: "Emagrecer Sem Passar Fome",
                desc: "Receitas que deixam você saciado e com energia durante todo o dia.",
              },
              {
                icon: Zap,
                title: "Recuperar Sua Energia",
                desc: "Muitas pessoas descobrem que têm muito mais energia quando começam a comer bem.",
              },
              {
                icon: Heart,
                title: "Melhorar Sua Saúde",
                desc: "Melhor digestão, pele mais bonita, cabelo mais forte, unhas mais saudáveis.",
              },
              {
                icon: Apple,
                title: "Ganhar Confiança",
                desc: "Quando você vê o resultado na balança, sua confiança explode.",
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
            Como Usar Move Wellness
          </h2>

          <div className="space-y-6">
            {[
              { step: "1", title: "Faça Login", desc: "Acesse sua área de membros com seu email e senha." },
              { step: "2", title: "Escolha Suas Receitas", desc: "Navegue por mais de 50 receitas organizadas por categoria." },
              { step: "3", title: "Prepare e Desfrute", desc: "Cada receita tem ingredientes simples e modo de preparo fácil." },
              { step: "4", title: "Veja Os Resultados", desc: "Siga as receitas, coma bem, e veja seu corpo transformar." },
            ].map((item) => (
              <div key={item.step} className="flex gap-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[oklch(0.50_0.10_145)] to-[oklch(0.55_0.09_145)] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-2xl">{item.step}</span>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-xl font-bold text-[oklch(0.30_0.05_145)] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[oklch(0.50_0.05_145)] text-lg">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-[oklch(0.30_0.05_145)] mb-12 text-center">
            Escolha Seu Plano de Acesso
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Free Plan */}
            <div className="bg-gradient-to-br from-[oklch(0.98_0.02_145)] to-[oklch(0.95_0.03_145)] p-8 rounded-2xl border-2 border-[oklch(0.90_0.02_145)]">
              <h3 className="text-2xl font-bold text-[oklch(0.30_0.05_145)] mb-2">
                Acesso Gratuito
              </h3>
              <p className="text-[oklch(0.50_0.05_145)] mb-6">
                Para clientes que já compraram nossos produtos
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[oklch(0.50_0.10_145)]" />
                  <span className="text-[oklch(0.50_0.05_145)]">50+ receitas</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[oklch(0.50_0.10_145)]" />
                  <span className="text-[oklch(0.50_0.05_145)]">Plano alimentar semanal</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[oklch(0.50_0.10_145)]" />
                  <span className="text-[oklch(0.50_0.05_145)]">Calculadora de calorias</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[oklch(0.50_0.10_145)]" />
                  <span className="text-[oklch(0.50_0.05_145)]">Dicas de saúde</span>
                </div>
              </div>

              <Link href="/login">
                <Button className="w-full bg-gradient-to-r from-[oklch(0.50_0.10_145)] to-[oklch(0.55_0.09_145)] hover:from-[oklch(0.48_0.10_145)] hover:to-[oklch(0.53_0.09_145)] text-white font-bold h-12">
                  Fazer Login
                </Button>
              </Link>
            </div>

            {/* Paid Plan */}
            <div className="bg-gradient-to-br from-[oklch(0.50_0.10_145)] to-[oklch(0.55_0.09_145)] p-8 rounded-2xl border-2 border-[oklch(0.50_0.10_145)] shadow-xl relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[oklch(0.50_0.10_145)] text-white px-4 py-1 rounded-full text-sm font-bold">
                MAIS POPULAR
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">
                Acesso Pago
              </h3>
              <p className="text-[oklch(0.90_0.02_145)] mb-6">
                Para quem quer só a plataforma
              </p>

              <div className="mb-8">
                <p className="text-white text-4xl font-bold">
                  R$ 29<span className="text-lg">/mês</span>
                </p>
                <p className="text-[oklch(0.90_0.02_145)] text-sm mt-2">
                  Cancele quando quiser
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-white" />
                  <span className="text-white">50+ receitas</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-white" />
                  <span className="text-white">Plano alimentar semanal</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-white" />
                  <span className="text-white">Calculadora de calorias</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-white" />
                  <span className="text-white">Dicas de saúde</span>
                </div>
              </div>

              <Link href="/signup">
                <Button className="w-full bg-white text-[oklch(0.50_0.10_145)] hover:bg-[oklch(0.98_0.02_145)] font-bold h-12">
                  Começar Agora
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 px-4 bg-gradient-to-br from-[oklch(0.98_0.02_145)] to-[oklch(0.95_0.03_145)]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-[oklch(0.30_0.05_145)] mb-12 text-center">
            Perguntas Frequentes
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-lg border border-[oklch(0.90_0.02_145)] overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full p-6 flex items-center justify-between hover:bg-[oklch(0.98_0.02_145)] transition-colors"
                >
                  <h3 className="text-lg font-bold text-[oklch(0.30_0.05_145)] text-left">
                    {faq.q}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-[oklch(0.50_0.10_145)] transition-transform ${
                      expandedFaq === i ? "transform rotate-180" : ""
                    }`}
                  />
                </button>

                {expandedFaq === i && (
                  <div className="px-6 pb-6 border-t border-[oklch(0.90_0.02_145)]">
                    <p className="text-[oklch(0.50_0.05_145)] text-lg leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-[oklch(0.30_0.05_145)] mb-6">
            Pronto Para Transformar Seu Corpo?
          </h2>

          <p className="text-xl text-[oklch(0.50_0.05_145)] mb-8 leading-relaxed">
            Você já tentou de tudo. Já fez dieta. Já treinou. Mas o que estava faltando era saber COMO comer bem de forma que você realmente gostasse.
          </p>

          <p className="text-xl text-[oklch(0.50_0.05_145)] mb-12 leading-relaxed">
            Move Wellness é exatamente isso. Mais de 50 receitas que você vai amar. Que vão deixar você saciado. Que vão transformar seu corpo.
          </p>

          <Link href="/login">
            <Button className="bg-gradient-to-r from-[oklch(0.50_0.10_145)] to-[oklch(0.55_0.09_145)] hover:from-[oklch(0.48_0.10_145)] hover:to-[oklch(0.53_0.09_145)] text-white font-bold h-14 px-8 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all">
              Acessar Minha Área de Membros Agora
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>

          <p className="text-sm text-[oklch(0.50_0.05_145)] mt-8">
            Acesso gratuito para clientes • Plano pago a partir de R$ 29/mês
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[oklch(0.30_0.05_145)] text-white py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="mb-4">© 2026 Move Wellness. Todos os direitos reservados.</p>
          <p className="text-sm text-[oklch(0.90_0.02_145)]">
            Move Wellness não substitui orientação profissional. Consulte um médico ou nutricionista antes de fazer mudanças significativas na sua dieta.
          </p>
        </div>
      </footer>
    </div>
  );
}
