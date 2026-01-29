import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Zap,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  Flame,
  Leaf,
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
    <div className="min-h-screen bg-white text-black">
      {/* PROMOTIONAL BANNER - Subtle Stripe */}
      <div className="bg-white border-b-4 border-[#7cb342] py-3 px-4 text-center sticky top-0 z-50">
        <p className="text-sm font-semibold text-black uppercase tracking-wider">
          🎯 Comece hoje: Acesso gratuito para clientes + Plano pago disponível
        </p>
      </div>

      {/* HERO SECTION */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20 bg-white relative">
        <div className="max-w-5xl mx-auto text-center">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center">
              <Leaf className="w-8 h-8 text-white" />
            </div>
            <span className="text-3xl font-bold text-black">
              MOVE<span className="text-[#7cb342]">.</span>WELLNESS
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-6xl md:text-7xl font-black text-black mb-6 leading-tight">
            Emagreça<br />
            <span className="text-[#7cb342]">Sem Sacrificar</span><br />
            o Sabor
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
            As mesmas receitas que milhares de pessoas usaram para perder peso enquanto comem comida de verdade.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/login">
              <Button className="btn-elegant px-8 py-6 text-lg h-auto">
                Acessar Minha Área
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="btn-accent px-8 py-6 text-lg h-auto">
                Criar Conta
              </Button>
            </Link>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="absolute -inset-1 bg-black rounded-xl blur opacity-10"></div>
            <img
              src="/images/hero-healthy-food.jpg"
              alt="Comida Saudável"
              className="relative rounded-xl shadow-lg w-full max-w-3xl mx-auto"
            />
          </div>
        </div>
      </section>

      {/* STATS SECTION - Black Background */}
      <section className="py-20 px-4 bg-black text-white border-y-4 border-[#7cb342]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-black text-[#7cb342] mb-2">50+</div>
              <p className="text-gray-300 uppercase tracking-wider font-semibold">Receitas Prontas</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-[#7cb342] mb-2">7</div>
              <p className="text-gray-300 uppercase tracking-wider font-semibold">Categorias</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-[#7cb342] mb-2">9</div>
              <p className="text-gray-300 uppercase tracking-wider font-semibold">Benefícios</p>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl font-black text-black mb-16 text-center">
            Por Que Move Wellness<br />
            <span className="text-[#7cb342]">Funciona</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Zap,
                title: "Receitas Rápidas",
                desc: "Menos de 20 minutos. Sem complicação. Sem desculpas."
              },
              {
                icon: Flame,
                title: "Metabolismo Acelerado",
                desc: "Ingredientes que aumentam seu metabolismo naturalmente."
              },
              {
                icon: CheckCircle,
                title: "Macros Calculados",
                desc: "Cada receita vem com calorias e macros já prontos."
              },
              {
                icon: Leaf,
                title: "Comida de Verdade",
                desc: "Sem alimentos artificiais. Sem restrições extremas."
              },
            ].map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div key={idx} className="accent-stripe bg-gray-50 p-8 rounded-lg hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-black text-black mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS - Black Section */}
      <section className="py-20 px-4 bg-black text-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl font-black text-white mb-16 text-center">
            Como Funciona
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: "01", title: "Crie sua Conta", desc: "Acesso instantâneo a todas as receitas" },
              { num: "02", title: "Escolha uma Receita", desc: "50+ opções para todos os gostos" },
              { num: "03", title: "Comece a Emagrecer", desc: "Veja resultados em 2-3 semanas" },
            ].map((step, idx) => (
              <div key={idx} className="text-center border-l-4 border-[#7cb342] pl-6">
                <div className="text-6xl font-black text-[#7cb342] mb-4">{step.num}</div>
                <h3 className="text-2xl font-black text-white mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-5xl font-black text-black mb-16 text-center">
            Perguntas<br />
            <span className="text-[#7cb342]">Frequentes</span>
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-gray-50 border-l-4 border-[#7cb342] rounded-lg overflow-hidden hover:shadow-md transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-100 transition-all"
                >
                  <span className="font-black text-black">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#7cb342] transition-transform ${
                      expandedFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {expandedFaq === idx && (
                  <div className="px-6 py-4 bg-white border-t-2 border-[#7cb342] text-gray-600">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 px-4 bg-black border-t-4 border-[#7cb342]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl font-black text-white mb-6">
            Pronto Para Começar?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Acesso instantâneo a 50+ receitas. Sem cartão de crédito. Sem compromisso.
          </p>
          <Link href="/login">
            <Button className="bg-white text-black hover:bg-gray-100 px-8 py-6 text-lg h-auto font-black">
              Acessar Agora
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t-4 border-[#7cb342] py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-black text-black">MOVE.WELLNESS</span>
          </div>
          <p className="text-center text-gray-600 text-sm">
            © 2026 Move Wellness. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
