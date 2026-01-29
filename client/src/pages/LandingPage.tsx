'use client';

import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, ChevronDown } from "lucide-react";

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
    <div className="min-h-screen bg-white text-black font-sans">
      {/* HEADER */}
      <header className="fixed top-0 w-full bg-white z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-black rounded flex items-center justify-center text-white font-black text-lg">
              M
            </div>
            <span className="font-black text-xl">MOVE</span>
          </div>
          <Link href="/login">
            <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white">
              Entrar
            </Button>
          </Link>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="pt-32 pb-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-6xl lg:text-7xl font-black leading-tight mb-6">
                Emagreça sem sacrificar comida
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                50+ receitas que funcionam. Sem dieta maluca. Sem restrição.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link href="/signup">
                  <Button className="bg-black text-white hover:bg-gray-900 px-8 py-6 text-lg h-auto font-bold">
                    Começar Agora
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white px-8 py-6 text-lg h-auto font-bold">
                    Já tenho conta
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-[#7cb342]" />
                  <span>Acesso instantâneo</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-[#7cb342]" />
                  <span>Sem cartão de crédito</span>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="absolute -inset-4 bg-[#7cb342] rounded-2xl blur-2xl opacity-20"></div>
              <img
                src="/images/hero-healthy-food.jpg"
                alt="Comida Saudável"
                className="relative rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section className="py-20 px-4 bg-gray-50 border-y-4 border-[#7cb342]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-black text-center mb-16">
            Por que Move Wellness funciona
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Receitas Rápidas",
                desc: "Menos de 20 minutos. Sem complicação.",
              },
              {
                title: "Metabolismo Acelerado",
                desc: "Ingredientes que aumentam seu metabolismo.",
              },
              {
                title: "Macros Calculados",
                desc: "Cada receita vem com calorias e macros prontos.",
              },
              {
                title: "Comida de Verdade",
                desc: "Sem alimentos artificiais. Sem restrições extremas.",
              },
            ].map((benefit, idx) => (
              <div key={idx} className="bg-white p-8 rounded-lg border-l-4 border-[#7cb342]">
                <h3 className="text-xl font-black mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-black text-center mb-16">
            Como funciona
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Crie sua conta",
                desc: "Acesso instantâneo a 50+ receitas",
              },
              {
                step: "2",
                title: "Escolha suas receitas",
                desc: "Filtre por benefícios e preferências",
              },
              {
                step: "3",
                title: "Comece a emagrecer",
                desc: "Siga as receitas e veja os resultados",
              },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-6">
                  {item.step}
                </div>
                <h3 className="text-2xl font-black mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-5xl font-black text-center mb-16">
            Perguntas frequentes
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-bold text-left">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      expandedFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {expandedFaq === idx && (
                  <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                    <p className="text-gray-600">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 px-4 bg-black text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl font-black mb-6">
            Pronto para começar?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Acesso instantâneo a 50+ receitas. Sem cartão de crédito. Sem compromisso.
          </p>
          <Link href="/signup">
            <Button className="bg-white text-black hover:bg-gray-100 px-8 py-6 text-lg h-auto font-black">
              Começar Agora
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-200 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-gray-600 text-sm">
          <p>&copy; 2026 Move Wellness. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
