import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Leaf, Mail, Lock, Chrome } from "lucide-react";
import { useLocation } from "wouter";
import { supabase } from "@/lib/supabase";

export default function Login() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else if (data.user) {
        setMessage("Login realizado com sucesso!");
        setTimeout(() => setLocation("/membros"), 1500);
      }
    } catch (err) {
      setError("Erro ao fazer login. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setError(error.message);
      }
    } catch (err) {
      setError("Erro ao fazer login com Google. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[oklch(0.98_0.02_145)] to-[oklch(0.95_0.03_145)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[oklch(0.50_0.10_145)] to-[oklch(0.60_0.08_145)] rounded-2xl flex items-center justify-center shadow-lg">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-display font-bold text-[oklch(0.30_0.05_145)]">
              Move Wellness
            </h1>
          </div>
          <p className="text-[oklch(0.50_0.05_145)]">Acesse sua conta para ver as receitas</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          {/* Messages */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          {message && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
              {message}
            </div>
          )}

          {/* Email Login Form */}
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[oklch(0.30_0.05_145)] mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-[oklch(0.50_0.05_145)]" />
                <Input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[oklch(0.30_0.05_145)] mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-[oklch(0.50_0.05_145)]" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[oklch(0.50_0.10_145)] to-[oklch(0.55_0.09_145)] hover:from-[oklch(0.48_0.10_145)] hover:to-[oklch(0.53_0.09_145)] text-white font-medium h-11"
            >
              {loading ? "Entrando..." : "Entrar com Email"}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[oklch(0.90_0.02_145)]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-[oklch(0.50_0.05_145)]">ou</span>
            </div>
          </div>

          {/* Google Login - Desativado temporariamente */}
          <div className="relative">
            <Button
              onClick={handleGoogleLogin}
              disabled={true}
              variant="outline"
              className="w-full h-11 border-[oklch(0.90_0.02_145)] hover:bg-[oklch(0.98_0.02_145)] opacity-50 cursor-not-allowed"
            >
              <Chrome className="w-5 h-5 mr-2" />
              Entrar com Google (em breve)
            </Button>
            <p className="text-xs text-[oklch(0.50_0.05_145)] text-center mt-2">
              Google OAuth será habilitado em breve
            </p>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-[oklch(0.50_0.05_145)]">
            Não tem conta?{" "}
            <button
              onClick={() => setLocation("/signup")}
              className="text-[oklch(0.50_0.10_145)] font-medium hover:underline"
            >
              Criar conta
            </button>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-[oklch(0.50_0.05_145)] mt-8">
          Suas receitas estão seguras conosco
        </p>
      </div>
    </div>
  );
}
