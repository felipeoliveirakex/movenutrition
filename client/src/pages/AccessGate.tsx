import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Lock, CreditCard, Code, ArrowRight, CheckCircle2 } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Move Wellness</h1>
          <p className="text-gray-600">Escolha seu plano de acesso</p>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Success Alert */}
        {success && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">{success}</AlertDescription>
          </Alert>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("code")}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
              activeTab === "code"
                ? "bg-black text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <Code className="inline-block w-4 h-4 mr-2" />
            Código Grátis
          </button>
          <button
            onClick={() => setActiveTab("payment")}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
              activeTab === "payment"
                ? "bg-black text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <CreditCard className="inline-block w-4 h-4 mr-2" />
            Assinatura
          </button>
        </div>

        {/* Code Tab */}
        {activeTab === "code" && (
          <Card className="border-2 border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Código de Acesso
              </CardTitle>
              <CardDescription>
                Se você comprou nosso produto, insira o código de acesso fornecido
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCodeSubmit} className="space-y-4">
                <div>
                  <Input
                    placeholder="Digite seu código aqui"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    disabled={loading}
                    className="uppercase text-center text-lg tracking-widest"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Exemplo: MOVE2024ABC
                  </p>
                </div>
                <Button
                  type="submit"
                  disabled={loading || !accessCode.trim()}
                  className="w-full bg-black hover:bg-gray-900 text-white"
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
          <Card className="border-2 border-green-600 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-900">
                <CreditCard className="w-5 h-5" />
                Assinatura Mensal
              </CardTitle>
              <CardDescription className="text-green-800">
                Acesso ilimitado a todas as receitas e recursos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Price */}
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-4xl font-bold text-black">R$ 29</span>
                  <span className="text-gray-600">/mês</span>
                </div>
                <p className="text-center text-sm text-gray-500 mt-2">
                  Cancele a qualquer momento
                </p>
              </div>

              {/* Features */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>50+ receitas exclusivas</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>Plano alimentar personalizado</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>Calculadora de calorias</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>Dicas de saúde e bem-estar</span>
                </div>
              </div>

              {/* Payment Button */}
              <Button
                onClick={handlePaymentClick}
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
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
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>Já tem acesso? <button onClick={() => setLocation("/membros")} className="text-black font-semibold hover:underline">Ir para receitas</button></p>
        </div>
      </div>
    </div>
  );
}
