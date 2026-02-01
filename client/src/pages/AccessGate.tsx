import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Lock, CreditCard, Code, ArrowRight, CheckCircle2, Gift } from "lucide-react";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { supabase } from "@/lib/supabase";

export default function AccessGate() {
  const [, setLocation] = useLocation();
  const { user } = useSupabaseAuth();
  const [accessCode, setAccessCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [activeTab, setActiveTab] = useState<"code" | "payment">("code");

  // Redirect if not logged in
  if (!user) {
    setLocation("/login");
    return null;
  }

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Call API to validate code and grant access
      const response = await fetch("/api/validate-access-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: accessCode.toUpperCase(),
          userId: user.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Código inválido ou expirado");
        return;
      }

      setSuccess("Acesso concedido! Redirecionando...");
      setTimeout(() => setLocation("/membros"), 1500);
    } catch (err) {
      setError("Erro ao validar código. Tente novamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentClick = async () => {
    setLoading(true);
    setError("");

    try {
      // Create checkout session
      const response = await fetch("/api/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          userEmail: user.email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Erro ao criar checkout");
        return;
      }

      // Redirect to Mercado Pago checkout
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      }
    } catch (err) {
      setError("Erro ao iniciar pagamento. Tente novamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white flex flex-col">
      {/* Header com faixa verde */}
      <div className="h-1 bg-[#7cb342]"></div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-2xl w-full">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-black mb-3">MOVE</h1>
            <p className="text-xl text-gray-700 mb-2">Escolha seu plano de acesso</p>
            <p className="text-gray-600">Acesso instantâneo às 50+ receitas saudáveis</p>
          </div>

          {/* Error Alert */}
          {error && (
            <Alert variant="destructive" className="mb-6 border-red-300 bg-red-50">
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}

          {/* Success Alert */}
          {success && (
            <Alert className="mb-6 border-green-300 bg-green-50">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">{success}</AlertDescription>
            </Alert>
          )}

          {/* Tabs */}
          <div className="flex gap-2 mb-8">
            <button
              onClick={() => setActiveTab("code")}
              className={`flex-1 py-4 px-6 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                activeTab === "code"
                  ? "bg-black text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <Gift className="w-5 h-5" />
              <span>Acesso Gratuito</span>
            </button>
            <button
              onClick={() => setActiveTab("payment")}
              className={`flex-1 py-4 px-6 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                activeTab === "payment"
                  ? "bg-[#7cb342] text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <CreditCard className="w-5 h-5" />
              <span>Assinatura</span>
            </button>
          </div>

          {/* Code Tab */}
          {activeTab === "code" && (
            <Card className="border-2 border-black">
              <CardHeader className="bg-gray-50 border-b-2 border-black">
                <CardTitle className="flex items-center gap-2 text-black">
                  <Gift className="w-6 h-6 text-[#7cb342]" />
                  Acesso Gratuito - 1 Mês
                </CardTitle>
                <CardDescription className="text-gray-700 mt-2">
                  Você adquiriu um de nossos produtos? Insira o código de acesso fornecido para ganhar 1 mês grátis do app.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleCodeSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">
                      Código de Acesso
                    </label>
                    <Input
                      placeholder="Digite seu código aqui"
                      value={accessCode}
                      onChange={(e) => setAccessCode(e.target.value)}
                      disabled={loading}
                      className="uppercase text-center text-lg tracking-widest border-2 border-gray-300 focus:border-[#7cb342] focus:ring-[#7cb342]"
                    />
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      Exemplo: MOVE2024ABC
                    </p>
                  </div>

                  {/* Benefits */}
                  <div className="bg-green-50 rounded-lg p-4 space-y-2 border border-green-200">
                    <p className="font-semibold text-green-900 mb-3">O que você ganha:</p>
                    <div className="flex items-center gap-2 text-sm text-green-800">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span>50+ receitas exclusivas</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-green-800">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span>Plano alimentar personalizado</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-green-800">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span>Calculadora de calorias</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-green-800">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span>Dicas de saúde e bem-estar</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading || !accessCode.trim()}
                    className="w-full bg-black hover:bg-gray-900 text-white font-semibold h-12 rounded-lg transition-colors"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Validando...
                      </>
                    ) : (
                      <>
                        Validar Código
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Payment Tab */}
          {activeTab === "payment" && (
            <Card className="border-2 border-[#7cb342] bg-gradient-to-br from-white to-green-50">
              <CardHeader className="bg-[#7cb342] border-b-2 border-[#7cb342] text-white">
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-6 h-6" />
                  Assinatura Mensal
                </CardTitle>
                <CardDescription className="text-green-50 mt-2">
                  Acesso ilimitado a todas as receitas e recursos
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {/* Price */}
                <div className="bg-white rounded-lg p-6 border-2 border-[#7cb342]">
                  <div className="flex items-baseline justify-center gap-2 mb-2">
                    <span className="text-5xl font-bold text-black">R$ 29</span>
                    <span className="text-gray-600 text-lg">/mês</span>
                  </div>
                  <p className="text-center text-sm text-gray-600">
                    Cancele a qualquer momento, sem compromisso
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  <p className="font-semibold text-black">O que você ganha:</p>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-[#7cb342] flex-shrink-0" />
                    <span>50+ receitas exclusivas e saudáveis</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-[#7cb342] flex-shrink-0" />
                    <span>Plano alimentar personalizado</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-[#7cb342] flex-shrink-0" />
                    <span>Calculadora de calorias avançada</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-[#7cb342] flex-shrink-0" />
                    <span>Dicas de saúde e bem-estar</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-[#7cb342] flex-shrink-0" />
                    <span>Suporte por email</span>
                  </div>
                </div>

                {/* Payment Button */}
                <Button
                  onClick={handlePaymentClick}
                  disabled={loading}
                  className="w-full bg-[#7cb342] hover:bg-[#6ba030] text-white font-semibold h-12 rounded-lg transition-colors"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    <>
                      Assinar Agora
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  Pagamento seguro via Mercado Pago
                </p>
              </CardContent>
            </Card>
          )}

          {/* Footer */}
          <div className="mt-12 text-center text-sm text-gray-600">
            <p>Dúvidas? <button onClick={() => setLocation("/membros")} className="text-black font-semibold hover:text-[#7cb342] transition-colors">Contate nosso suporte</button></p>
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
