import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Loader2, Check, AlertCircle } from "lucide-react";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";

export default function Checkout() {
  const [, setLocation] = useLocation();
  const { user } = useSupabaseAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.user_metadata?.name || "",
    email: user?.email || "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Validar dados
      if (!formData.fullName || !formData.email || !formData.phone) {
        setError("Por favor, preencha todos os campos");
        setLoading(false);
        return;
      }

      // TODO: Integrar com API de checkout do Mercado Pago
      // Por enquanto, simular sucesso
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSuccess(true);
      setTimeout(() => {
        setLocation("/membros");
      }, 2000);
    } catch (err) {
      setError("Erro ao processar pagamento. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Green Header Bar */}
      <div className="h-2 bg-[#7cb342]"></div>

      {/* Header */}
      <header className="bg-white border-b-2 border-black">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => setLocation("/membros")}
            className="flex items-center gap-2 px-4 py-2 text-black hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium">Voltar</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border-2 border-green-500 rounded-lg p-8 text-center mb-8">
              <Check className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-black mb-2">Pagamento Processado!</h2>
              <p className="text-gray-700">Você será redirecionado em breve...</p>
            </div>
          )}

          {!success && (
            <>
              {/* Order Summary */}
              <div className="bg-gray-50 border-2 border-black rounded-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-black mb-6">Resumo do Pedido</h2>

                <div className="space-y-4 mb-6 pb-6 border-b-2 border-black">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Plano Premium Move Wellness</span>
                    <span className="font-bold text-black">R$ 29,00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Período</span>
                    <span className="font-bold text-black">1 mês</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Renovação</span>
                    <span className="font-bold text-black">Automática</span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-lg">
                  <span className="font-bold text-black">Total</span>
                  <span className="text-2xl font-bold text-[#7cb342]">R$ 29,00</span>
                </div>
              </div>

              {/* Checkout Form */}
              <form onSubmit={handleCheckout} className="bg-white border-2 border-black rounded-lg p-8">
                <h3 className="text-xl font-bold text-black mb-6">Dados de Pagamento</h3>

                {error && (
                  <div className="bg-red-50 border-2 border-red-500 text-red-700 px-4 py-3 rounded-lg text-sm font-medium mb-6 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    {error}
                  </div>
                )}

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">
                      Nome Completo
                    </label>
                    <Input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Seu nome completo"
                      className="border-2 border-black rounded-lg h-12"
                      disabled={loading}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">
                      Email
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="seu@email.com"
                      className="border-2 border-black rounded-lg h-12"
                      disabled={loading}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">
                      Telefone
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(11) 99999-9999"
                      className="border-2 border-black rounded-lg h-12"
                      disabled={loading}
                      required
                    />
                  </div>
                </div>

                {/* Payment Method Notice */}
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-700">
                    <strong>Nota:</strong> Você será redirecionado para o Mercado Pago para completar o pagamento de forma segura.
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#7cb342] hover:bg-[#6ba338] text-white font-bold h-12 rounded-lg transition-colors"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    "Prosseguir para Pagamento"
                  )}
                </Button>

                {/* Security Info */}
                <div className="mt-6 text-center text-xs text-gray-500">
                  <p>✓ Pagamento 100% seguro</p>
                  <p>✓ Seus dados são protegidos</p>
                </div>
              </form>

              {/* Benefits Reminder */}
              <div className="mt-8 bg-green-50 border-2 border-[#7cb342] rounded-lg p-6">
                <h4 className="font-bold text-black mb-3">O que você ganha:</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>✓ 50+ receitas premium</li>
                  <li>✓ Plano alimentar personalizado</li>
                  <li>✓ Calculadora de macros</li>
                  <li>✓ Dicas de saúde exclusivas</li>
                  <li>✓ Sem anúncios</li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-6 px-4 text-center text-sm border-t-2 border-[#7cb342] mt-12">
        <p>© 2024 Move Wellness. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
