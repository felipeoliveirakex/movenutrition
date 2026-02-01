import { Check, CreditCard, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PremiumBanner() {
  const handleCheckout = () => {
    // TODO: Integrar Mercado Pago checkout
    window.location.href = "/checkout";
  };

  return (
    <section className="py-12 bg-gradient-to-r from-[#7cb342] to-[#689c3a] text-white border-b-4 border-black">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Benefits */}
          <div>
            <h3 className="text-3xl md:text-4xl font-bold mb-6">Desbloqueie Seu Potencial</h3>
            <p className="text-lg mb-8 text-green-50">
              Acesso completo a todas as receitas, planos personalizados e ferramentas exclusivas para transformar sua saúde.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <Check className="w-6 h-6 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg">50+ Receitas Premium</h4>
                  <p className="text-green-50 text-sm">Acesso a todas as receitas saudáveis, práticas e deliciosas</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-6 h-6 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg">Plano Alimentar Personalizado</h4>
                  <p className="text-green-50 text-sm">Crie seu plano semanal baseado em seus objetivos</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-6 h-6 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg">Calculadora de Macros</h4>
                  <p className="text-green-50 text-sm">Calcule suas calorias e macronutrientes com precisão</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-6 h-6 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg">Dicas de Saúde Exclusivas</h4>
                  <p className="text-green-50 text-sm">Conteúdo exclusivo sobre nutrição e bem-estar</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-6 h-6 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg">Sem Anúncios</h4>
                  <p className="text-green-50 text-sm">Experiência limpa e focada no seu bem-estar</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Pricing CTA */}
          <div className="bg-white text-black rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-6">
              <h4 className="text-sm font-bold text-[#7cb342] uppercase tracking-widest mb-2">Plano Premium</h4>
              <div className="mb-4">
                <span className="text-5xl font-bold">R$ 29</span>
                <span className="text-gray-600 ml-2">/mês</span>
              </div>
              <p className="text-gray-700 mb-6">Acesso ilimitado a todos os recursos</p>
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Check className="w-5 h-5 text-[#7cb342]" />
                <span>Cancele quando quiser</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Lock className="w-5 h-5 text-[#7cb342]" />
                <span>Pagamento seguro</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <CreditCard className="w-5 h-5 text-[#7cb342]" />
                <span>Cartão ou Pix</span>
              </div>
            </div>

            <Button
              onClick={handleCheckout}
              className="w-full bg-[#7cb342] hover:bg-[#6ba338] text-white font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-lg h-auto"
            >
              <CreditCard className="w-5 h-5" />
              Assinar Agora
            </Button>

            <p className="text-xs text-gray-500 text-center mt-4">
              Clientes dos nossos produtos têm 1 mês grátis
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
