import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Leaf, Mail, Lock, User } from "lucide-react";
import { useLocation } from "wouter";
import { supabase } from "@/lib/supabase";

export default function Signup() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      setLoading(false);
      return;
    }

    // Validate password length
    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });

      if (error) {
        setError(error.message);
      } else if (data.user) {
        setMessage("Conta criada com sucesso! Redirecionando...");
        setTimeout(() => setLocation("/membros"), 1500);
      }
    } catch (err) {
      setError("Erro ao criar conta. Tente novamente.");
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
          <p className="text-[oklch(0.50_0.05_145)]">Crie sua conta para acessar as receitas</p>
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

          {/* Signup Form - Google OAuth será adicionado após configuração */}
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[oklch(0.30_0.05_145)] mb-2">
                Nome
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-[oklch(0.50_0.05_145)]" />
                <Input
                  type="text"
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                  className="pl-10"
                  required
                />
              </div>
            </div>

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

            <div>
              <label className="block text-sm font-medium text-[oklch(0.30_0.05_145)] mb-2">
                Confirmar Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-[oklch(0.50_0.05_145)]" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
              {loading ? "Criando conta..." : "Criar Conta"}
            </Button>
          </form>

          {/* Login Link */}
          <p className="text-center text-sm text-[oklch(0.50_0.05_145)]">
            Já tem conta?{" "}
            <button
              onClick={() => setLocation("/login")}
              className="text-[oklch(0.50_0.10_145)] font-medium hover:underline"
            >
              Fazer login
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
