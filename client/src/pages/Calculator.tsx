/*
  Design: Organic Minimalism
  - Calculadora de calorias e macros
  - Interface limpa e intuitiva
  - Cores sage, terracotta e coral
  - Resultados visuais com gráficos
*/

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calculator as CalcIcon,
  Leaf,
  Target,
  Flame,
  Activity,
  Scale,
  Ruler,
  User,
  TrendingDown,
  TrendingUp,
  Minus,
} from "lucide-react";
import { Link } from "wouter";

type Goal = "lose" | "maintain" | "gain";
type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "very_active";
type Gender = "male" | "female";

const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

const ACTIVITY_LABELS: Record<ActivityLevel, string> = {
  sedentary: "Sedentário (pouco ou nenhum exercício)",
  light: "Leve (exercício 1-3 dias/semana)",
  moderate: "Moderado (exercício 3-5 dias/semana)",
  active: "Ativo (exercício 6-7 dias/semana)",
  very_active: "Muito ativo (exercício intenso diário)",
};

const GOAL_ADJUSTMENTS: Record<Goal, number> = {
  lose: -500,
  maintain: 0,
  gain: 300,
};

const GOAL_LABELS: Record<Goal, { label: string; icon: typeof TrendingDown }> = {
  lose: { label: "Perder peso", icon: TrendingDown },
  maintain: { label: "Manter peso", icon: Minus },
  gain: { label: "Ganhar massa", icon: TrendingUp },
};

export default function Calculator() {
  const [gender, setGender] = useState<Gender>("male");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activity, setActivity] = useState<ActivityLevel>("moderate");
  const [goal, setGoal] = useState<Goal>("maintain");
  const [showResults, setShowResults] = useState(false);

  const results = useMemo(() => {
    const ageNum = parseInt(age);
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (!ageNum || !weightNum || !heightNum) return null;

    // Mifflin-St Jeor Equation
    let bmr: number;
    if (gender === "male") {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5;
    } else {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161;
    }

    const tdee = bmr * ACTIVITY_MULTIPLIERS[activity];
    const targetCalories = Math.round(tdee + GOAL_ADJUSTMENTS[goal]);

    // Macro distribution based on goal
    let proteinRatio: number, carbRatio: number, fatRatio: number;
    
    if (goal === "lose") {
      proteinRatio = 0.35;
      carbRatio = 0.35;
      fatRatio = 0.30;
    } else if (goal === "gain") {
      proteinRatio = 0.30;
      carbRatio = 0.45;
      fatRatio = 0.25;
    } else {
      proteinRatio = 0.30;
      carbRatio = 0.40;
      fatRatio = 0.30;
    }

    const protein = Math.round((targetCalories * proteinRatio) / 4);
    const carbs = Math.round((targetCalories * carbRatio) / 4);
    const fat = Math.round((targetCalories * fatRatio) / 9);

    // BMI calculation
    const heightM = heightNum / 100;
    const bmi = weightNum / (heightM * heightM);

    let bmiCategory: string;
    let bmiColor: string;
    if (bmi < 18.5) {
      bmiCategory = "Abaixo do peso";
      bmiColor = "oklch(0.65_0.15_200)";
    } else if (bmi < 25) {
      bmiCategory = "Peso normal";
      bmiColor = "oklch(0.50_0.10_145)";
    } else if (bmi < 30) {
      bmiCategory = "Sobrepeso";
      bmiColor = "oklch(0.72_0.10_55)";
    } else {
      bmiCategory = "Obesidade";
      bmiColor = "oklch(0.65_0.20_25)";
    }

    // Water intake (ml)
    const water = Math.round(weightNum * 35);

    return {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      targetCalories,
      protein,
      carbs,
      fat,
      bmi: bmi.toFixed(1),
      bmiCategory,
      bmiColor,
      water,
    };
  }, [gender, age, weight, height, activity, goal]);

  const handleCalculate = () => {
    if (results) {
      setShowResults(true);
    }
  };

  const isFormValid = age && weight && height;

  return (
    <div className="min-h-screen bg-[oklch(0.98_0.008_85)]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg shadow-sm">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <a className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[oklch(0.50_0.10_145)] to-[oklch(0.60_0.08_145)] rounded-2xl flex items-center justify-center shadow-lg shadow-[oklch(0.50_0.10_145)]/20">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-display font-bold text-foreground">
                    Wellness Hub
                  </h1>
                </div>
              </a>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[oklch(0.90_0.05_55)] to-[oklch(0.96_0.01_85)] py-12">
        <div className="container">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg">
              <CalcIcon className="w-7 h-7 text-[oklch(0.72_0.10_55)]" />
            </div>
            <div>
              <h2 className="text-3xl font-display font-bold text-foreground">
                Calculadora de Calorias
              </h2>
              <p className="text-muted-foreground">
                Descubra suas necessidades nutricionais diárias
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <Card className="p-6 border-0 shadow-sm rounded-3xl bg-white">
            <h3 className="font-display font-semibold text-lg mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-[oklch(0.50_0.10_145)]" />
              Seus Dados
            </h3>

            <div className="space-y-5">
              {/* Gender */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Sexo</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setGender("male")}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      gender === "male"
                        ? "border-[oklch(0.50_0.10_145)] bg-[oklch(0.96_0.02_145)]"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <span className="text-2xl mb-1 block">👨</span>
                    <span className="text-sm font-medium">Masculino</span>
                  </button>
                  <button
                    onClick={() => setGender("female")}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      gender === "female"
                        ? "border-[oklch(0.50_0.10_145)] bg-[oklch(0.96_0.02_145)]"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <span className="text-2xl mb-1 block">👩</span>
                    <span className="text-sm font-medium">Feminino</span>
                  </button>
                </div>
              </div>

              {/* Age */}
              <div>
                <Label htmlFor="age" className="text-sm font-medium mb-2 block">
                  Idade
                </Label>
                <div className="relative">
                  <Input
                    id="age"
                    type="number"
                    placeholder="25"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="h-12 rounded-xl pl-10"
                  />
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                </div>
              </div>

              {/* Weight */}
              <div>
                <Label htmlFor="weight" className="text-sm font-medium mb-2 block">
                  Peso (kg)
                </Label>
                <div className="relative">
                  <Input
                    id="weight"
                    type="number"
                    placeholder="70"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="h-12 rounded-xl pl-10"
                  />
                  <Scale className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                </div>
              </div>

              {/* Height */}
              <div>
                <Label htmlFor="height" className="text-sm font-medium mb-2 block">
                  Altura (cm)
                </Label>
                <div className="relative">
                  <Input
                    id="height"
                    type="number"
                    placeholder="170"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="h-12 rounded-xl pl-10"
                  />
                  <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                </div>
              </div>

              {/* Activity Level */}
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Nível de Atividade
                </Label>
                <Select value={activity} onValueChange={(v) => setActivity(v as ActivityLevel)}>
                  <SelectTrigger className="h-12 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(ACTIVITY_LABELS).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Goal */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Objetivo</Label>
                <div className="grid grid-cols-3 gap-2">
                  {(Object.entries(GOAL_LABELS) as [Goal, typeof GOAL_LABELS[Goal]][]).map(
                    ([key, { label, icon: Icon }]) => (
                      <button
                        key={key}
                        onClick={() => setGoal(key)}
                        className={`p-3 rounded-xl border-2 transition-all text-center ${
                          goal === key
                            ? "border-[oklch(0.50_0.10_145)] bg-[oklch(0.96_0.02_145)]"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <Icon className="w-5 h-5 mx-auto mb-1" />
                        <span className="text-xs font-medium">{label}</span>
                      </button>
                    )
                  )}
                </div>
              </div>

              <Button
                onClick={handleCalculate}
                disabled={!isFormValid}
                className="w-full h-12 rounded-xl bg-[oklch(0.50_0.10_145)] hover:bg-[oklch(0.45_0.10_145)] text-white font-semibold"
              >
                <CalcIcon className="w-5 h-5 mr-2" />
                Calcular
              </Button>
            </div>
          </Card>

          {/* Results */}
          <div className="space-y-6">
            {showResults && results ? (
              <>
                {/* Main Result */}
                <Card className="p-6 border-0 shadow-sm rounded-3xl bg-gradient-to-br from-[oklch(0.50_0.10_145)] to-[oklch(0.45_0.12_145)] text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="w-6 h-6" />
                    <h3 className="font-display font-semibold text-lg">
                      Sua Meta Diária
                    </h3>
                  </div>
                  <div className="text-center py-6">
                    <p className="text-6xl font-bold mb-2">
                      {results.targetCalories}
                    </p>
                    <p className="text-white/80">calorias por dia</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                    <div className="text-center">
                      <p className="text-sm text-white/70">TMB</p>
                      <p className="text-xl font-semibold">{results.bmr} kcal</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-white/70">TDEE</p>
                      <p className="text-xl font-semibold">{results.tdee} kcal</p>
                    </div>
                  </div>
                </Card>

                {/* Macros */}
                <Card className="p-6 border-0 shadow-sm rounded-3xl bg-white">
                  <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
                    <Flame className="w-5 h-5 text-[oklch(0.78_0.12_25)]" />
                    Distribuição de Macros
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-[oklch(0.92_0.02_145)] rounded-2xl">
                      <p className="text-3xl font-bold text-[oklch(0.50_0.10_145)]">
                        {results.protein}g
                      </p>
                      <p className="text-sm text-muted-foreground">Proteína</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {Math.round((results.protein * 4 / results.targetCalories) * 100)}%
                      </p>
                    </div>
                    <div className="text-center p-4 bg-[oklch(0.94_0.03_55)] rounded-2xl">
                      <p className="text-3xl font-bold text-[oklch(0.72_0.10_55)]">
                        {results.carbs}g
                      </p>
                      <p className="text-sm text-muted-foreground">Carboidratos</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {Math.round((results.carbs * 4 / results.targetCalories) * 100)}%
                      </p>
                    </div>
                    <div className="text-center p-4 bg-[oklch(0.95_0.04_25)] rounded-2xl">
                      <p className="text-3xl font-bold text-[oklch(0.78_0.12_25)]">
                        {results.fat}g
                      </p>
                      <p className="text-sm text-muted-foreground">Gordura</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {Math.round((results.fat * 9 / results.targetCalories) * 100)}%
                      </p>
                    </div>
                  </div>
                </Card>

                {/* BMI & Water */}
                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-4 border-0 shadow-sm rounded-2xl bg-white">
                    <p className="text-sm text-muted-foreground mb-1">IMC</p>
                    <p className="text-2xl font-bold" style={{ color: results.bmiColor }}>
                      {results.bmi}
                    </p>
                    <p className="text-xs" style={{ color: results.bmiColor }}>
                      {results.bmiCategory}
                    </p>
                  </Card>
                  <Card className="p-4 border-0 shadow-sm rounded-2xl bg-white">
                    <p className="text-sm text-muted-foreground mb-1">Água/dia</p>
                    <p className="text-2xl font-bold text-[oklch(0.55_0.15_220)]">
                      {(results.water / 1000).toFixed(1)}L
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {results.water}ml
                    </p>
                  </Card>
                </div>

                {/* Tips */}
                <Card className="p-4 border-0 shadow-sm rounded-2xl bg-[oklch(0.95_0.03_200)]">
                  <p className="text-sm font-medium text-[oklch(0.40_0.08_200)] mb-2">
                    💡 Dica
                  </p>
                  <p className="text-sm text-[oklch(0.35_0.05_200)]">
                    {goal === "lose"
                      ? "Para perder peso de forma saudável, mantenha um déficit calórico moderado e priorize proteínas para preservar massa muscular."
                      : goal === "gain"
                      ? "Para ganhar massa muscular, combine o superávit calórico com treino de força e distribua as proteínas ao longo do dia."
                      : "Para manter o peso, monitore sua ingestão e ajuste conforme mudanças no nível de atividade."}
                  </p>
                </Card>
              </>
            ) : (
              <Card className="p-8 border-0 shadow-sm rounded-3xl bg-white text-center">
                <div className="w-20 h-20 bg-[oklch(0.94_0.02_145)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-10 h-10 text-[oklch(0.50_0.10_145)]" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">
                  Preencha seus dados
                </h3>
                <p className="text-muted-foreground text-sm">
                  Insira suas informações ao lado para calcular suas necessidades
                  calóricas e de macronutrientes personalizadas.
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
