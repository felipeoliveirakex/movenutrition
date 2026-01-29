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
    <div className="min-h-screen bg-black text-white">
      {/* PROMOTIONAL BANNER */}
      <div className="bg-black border-b border-[#00ff00] py-3 px-4 text-center sticky top-0 z-50">
        <p className="text-sm font-bold text-[#00ff00] uppercase tracking-wider">
          🔥 COMECE HOJE: Acesso Gratuito para Clientes + Plano Pago Disponível
        </p>
      </div>

      {/* HERO SECTION */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-b from-black via-[#0a0a0a] to-black relative overflow-hidden">
        {/* Background Grid Effect */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(0, 255, 0, .05) 25%, rgba(0, 255, 0, .05) 26%, transparent 27%, transparent 74%, rgba(0, 255, 0, .05) 75%, rgba(0, 255, 0, .05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 255, 0, .05) 25%, rgba(0, 255, 0, .05) 26%, transparent 27%, transparent 74%, rgba(0, 255, 0, .05) 75%, rgba(0, 255, 0, .05) 76%, transparent 77%, transparent)',
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-16 h-16 bg-[#00ff00] rounded-lg flex items-center justify-center shadow-lg neon-glow">
              <Leaf className="w-8 h-8 text-black font-bold" />
            </div>
            <span className="text-3xl font-bold text-white">
              MOVE<span className="text-[#00ff00]">.</span>WELLNESS
            </span>
          </div>

          {/* Main Headline - AGGRESSIVE */}
          <h1 className="text-6xl md:text-7xl font-black text-white mb-6 leading-tight uppercase tracking-tight">
            EMAGREÇA<br />
            <span className="text-[#00ff00]">SEM SACRIFICAR</span><br />
            O SABOR
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
            As mesmas receitas que milhares de pessoas usaram para perder peso enquanto comem comida de verdade.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/login">
              <Button className="btn-aggressive px-8 py-6 text-lg h-auto">
                Acessar Minha Área
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-8 py-6 text-lg h-auto font-bold transition-all">
                Criar Conta
              </Button>
            </Link>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#00ff00] to-[#00ccff] rounded-xl blur opacity-30"></div>
            <img
              src="/images/hero-healthy-food.jpg"
              alt="Comida Saudável"
              className="relative rounded-xl shadow-2xl w-full max-w-3xl mx-auto border-2 border-[#00ff00]"
            />
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-20 px-4 bg-[#0a0a0a] border-y border-[#333333]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-black text-[#00ff00] mb-2">50+</div>
              <p className="text-gray-400 uppercase tracking-wider font-bold">Receitas Prontas</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-[#00ff00] mb-2">7</div>
              <p className="text-gray-400 uppercase tracking-wider font-bold">Categorias</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-[#00ff00] mb-2">9</div>
              <p className="text-gray-400 uppercase tracking-wider font-bold">Benefícios</p>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl font-black text-white mb-16 text-center uppercase">
            Por Que Move Wellness<br />
            <span className="text-[#00ff00]">Funciona</span>
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
                <div key={idx} className="bg-[#1a1a1a] border border-[#333333] p-8 rounded-lg hover:border-[#00ff00] transition-all group">
                  <div className="w-12 h-12 bg-[#00ff00] rounded-lg flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:neon-glow">
                    <Icon className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="text-xl font-black text-white mb-2 uppercase">{benefit.title}</h3>
                  <p className="text-gray-400">{benefit.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-4 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl font-black text-white mb-16 text-center uppercase">
            Como Funciona
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: "01", title: "Crie sua Conta", desc: "Acesso instantâneo a todas as receitas" },
              { num: "02", title: "Escolha uma Receita", desc: "50+ opções para todos os gostos" },
              { num: "03", title: "Comece a Emagrecer", desc: "Veja resultados em 2-3 semanas" },
            ].map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="text-6xl font-black text-[#00ff00] mb-4">{step.num}</div>
                <h3 className="text-2xl font-black text-white mb-2 uppercase">{step.title}</h3>
                <p className="text-gray-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-5xl font-black text-white mb-16 text-center uppercase">
            Perguntas<br />
            <span className="text-[#00ff00]">Frequentes</span>
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-[#1a1a1a] border border-[#333333] rounded-lg overflow-hidden hover:border-[#00ff00] transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#222222] transition-all"
                >
                  <span className="font-black text-white uppercase">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#00ff00] transition-transform ${
                      expandedFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {expandedFaq === idx && (
                  <div className="px-6 py-4 bg-[#0a0a0a] border-t border-[#333333] text-gray-400">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#00ff00] to-[#00ccff] relative overflow-hidden">
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-5xl font-black text-black mb-6 uppercase">
            Pronto Para Começar?
          </h2>
          <p className="text-xl text-black/80 mb-8">
            Acesso instantâneo a 50+ receitas. Sem cartão de crédito. Sem compromisso.
          </p>
          <Link href="/login">
            <Button className="bg-black text-[#00ff00] border-2 border-black hover:bg-transparent hover:text-black px-8 py-6 text-lg h-auto font-black uppercase tracking-wider">
              Acessar Agora
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black border-t border-[#333333] py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 bg-[#00ff00] rounded-lg flex items-center justify-center">
              <Leaf className="w-6 h-6 text-black" />
            </div>
            <span className="text-xl font-black text-white">MOVE.WELLNESS</span>
          </div>
          <p className="text-center text-gray-500 text-sm">
            © 2026 Move Wellness. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
