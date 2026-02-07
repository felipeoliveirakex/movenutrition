import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Droplets, Target, TrendingUp } from "lucide-react";
import { useGoals } from "@/hooks/useGoals";
import {
  ALL_ACHIEVEMENTS,
  buildCelebration,
  computeWeightProgressPct,
  isAchievementId,
  suggestedWeeklyGoalKg,
  todayKey,
} from "@/lib/goals";
import type { WeightDirection } from "@/lib/goals";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function formatMl(ml: number) {
  if (ml >= 1000) return `${(ml / 1000).toFixed(1).replace(/\.0$/, "")}L`;
  return `${ml}ml`;
}

export default function GoalsPanel() {
  const { state, api } = useGoals();
  const [waterInput, setWaterInput] = useState("250");
  const [weeklyWeightInput, setWeeklyWeightInput] = useState("");
  const [startWeightInput, setStartWeightInput] = useState("");
  const [targetWeightInput, setTargetWeightInput] = useState("");
  const [direction, setDirection] = useState<WeightDirection>("lose");
  const [weeklyGoalInput, setWeeklyGoalInput] = useState("");

  const water = useMemo(() => {
    const target = state?.profile.waterTargetMl ?? 0;
    const day = todayKey();
    const consumed = state?.waterByDay?.[day]?.consumedMl ?? 0;
    const pct = target ? Math.min(100, Math.round((consumed / target) * 100)) : 0;
    return { target, consumed, pct };
  }, [state]);

  const waterStreak = useMemo(() => {
    const target = state?.profile.waterTargetMl ?? 0;
    if (!target) return 0;

    let streak = 0;
    const date = new Date();
    for (let i = 0; i < 30; i++) {
      const d = new Date(date);
      d.setDate(date.getDate() - i);
      const day = todayKey(d);
      const entry = state?.waterByDay?.[day];
      if (!entry) break;
      if (entry.consumedMl < target) break;
      streak += 1;
    }
    return streak;
  }, [state]);

  const weight = useMemo(() => {
    const target = state?.profile.targetWeightKg;
    const direction = state?.profile.direction;
    const weeklyGoal = state?.profile.weeklyGoalKg;
    return { target, direction, weeklyGoal };
  }, [state]);

  const weightProgress = useMemo(() => {
    const target = state?.profile.targetWeightKg;
    const dir = state?.profile.direction;
    if (typeof target !== "number" || !dir) return null;
    const entries = Object.values(state?.weightByWeek ?? {}).slice();
    if (entries.length === 0) return null;
    entries.sort((a, b) => a.week.localeCompare(b.week));
    const start = entries[0]!.weightKg;
    const current = entries[entries.length - 1]!.weightKg;
    const pct01 = computeWeightProgressPct({
      startWeightKg: start,
      currentWeightKg: current,
      targetWeightKg: target,
      direction: dir,
    });
    return {
      start,
      current,
      pct01,
      pct: Math.round(pct01 * 100),
    };
  }, [state]);

  const weightSuggestion = useMemo(() => {
    const base = state?.profile.weightKg;
    const baseNum = typeof base === "number" ? base : parseFloat(startWeightInput);
    if (!Number.isFinite(baseNum) || baseNum <= 0) return null;
    return suggestedWeeklyGoalKg(direction, baseNum);
  }, [state, startWeightInput, direction]);

  const hasWeightTarget = typeof weight.target === "number" && !!weight.direction;

  const hasWaterProfile = Boolean(state?.profile.waterTargetMl);

  const recentAchievements = useMemo(() => {
    const unlocked = state?.unlocked ?? {};
    const items = Object.entries(unlocked)
      .map(([key, unlockedAt]) => ({ key, unlockedAt }))
      .filter((x) => Boolean(x.unlockedAt));

    items.sort((a, b) => (a.unlockedAt < b.unlockedAt ? 1 : -1));

    const normalized = items
      .map((x) => {
        if (x.key.startsWith("weight_weekly_improved:")) {
          return { id: "weight_weekly_improved", at: x.unlockedAt };
        }
        if (isAchievementId(x.key)) {
          return { id: x.key, at: x.unlockedAt };
        }
        return null;
      })
      .filter(Boolean) as Array<{ id: (typeof ALL_ACHIEVEMENTS)[number]; at: string }>;

    return normalized
      .map((x) => ({ title: buildCelebration(x.id).title, at: x.at }))
      .slice(0, 3);
  }, [state]);

  const actionSummary = useMemo(() => {
    const events = state?.events ?? {};
    return {
      calculator: events["calculator_used"] ?? 0,
      mealplan: events["mealplan_built"] ?? 0,
      recipes: events["recipe_created"] ?? 0,
    };
  }, [state]);

  const nextWeightMilestone = useMemo(() => {
    if (!weightProgress) return null;
    const pct = weightProgress.pct;
    const milestones = [10, 25, 50, 75, 100];
    const next = milestones.find((m) => pct < m);
    return next ?? null;
  }, [weightProgress]);

  const nextWaterStreakMilestone = useMemo(() => {
    const milestones = [3, 7, 14];
    const next = milestones.find((m) => waterStreak < m);
    return next ?? null;
  }, [waterStreak]);

  return (
    <section className="py-10 border-b-2 border-[#7cb342]/20">
      <div className="container mx-auto px-4">
        <h3 className="text-2xl font-bold text-black mb-6 flex items-center gap-2">
          <Target className="w-6 h-6 text-[#7cb342]" />
          Painel de Metas
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-6 border-2 border-black rounded-lg">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-bold text-black flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-[#7cb342]" /> Água (hoje)
                </p>
                {hasWaterProfile ? (
                  <p className="text-sm text-gray-700 mt-1">
                    {formatMl(water.consumed)} de {formatMl(water.target)}
                  </p>
                ) : (
                  <p className="text-sm text-gray-700 mt-1">
                    Defina seu peso na Calculadora para calcular sua meta.
                  </p>
                )}
              </div>
              <div className="text-3xl">💧</div>
            </div>

            <div className="mt-4">
              <Progress value={hasWaterProfile ? water.pct : 0} className="h-2" />
              <div className="flex justify-between text-xs text-gray-600 mt-2">
                <span>{hasWaterProfile ? `${water.pct}%` : "—"}</span>
                {hasWaterProfile && (
                  <span>Faltam {formatMl(Math.max(0, water.target - water.consumed))}</span>
                )}
              </div>
            </div>

            <div className="mt-4 flex items-end gap-2">
              <div className="flex-1">
                <Label className="text-xs">Adicionar (ml)</Label>
                <Input
                  value={waterInput}
                  onChange={(e) => setWaterInput(e.target.value)}
                  type="number"
                  min={0}
                  className="h-11 rounded-lg border-2 border-black"
                  disabled={!hasWaterProfile || !api}
                />
              </div>
              <Button
                onClick={() => {
                  const delta = parseInt(waterInput);
                  if (!api || !Number.isFinite(delta) || delta <= 0) return;
                  api.recordWater(delta);
                }}
                className="h-11 rounded-lg bg-[#7cb342] hover:bg-[#6ba338]"
                disabled={!hasWaterProfile || !api}
              >
                Registrar
              </Button>
            </div>
          </Card>

          <Card className="p-6 border-2 border-black rounded-lg">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-bold text-black flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#7cb342]" /> Peso (semanal)
                </p>
                {typeof weight.target === "number" ? (
                  <p className="text-sm text-gray-700 mt-1">
                    Alvo: {weight.target.toFixed(1)} kg
                    {typeof weight.weeklyGoal === "number" && weight.weeklyGoal > 0
                      ? ` · Meta/sem: ${weight.weeklyGoal.toFixed(1)} kg`
                      : ""}
                  </p>
                ) : (
                  <p className="text-sm text-gray-700 mt-1">
                    Defina seu peso alvo para acompanhar progresso.
                  </p>
                )}
              </div>
              <div className="text-3xl">🎯</div>
            </div>

            {weightProgress && (
              <div className="mt-4">
                <Progress value={weightProgress.pct} className="h-2" />
                <div className="flex justify-between text-xs text-gray-600 mt-2">
                  <span>{weightProgress.pct}%</span>
                  <span>
                    {weightProgress.current.toFixed(1)} kg (início {weightProgress.start.toFixed(1)} kg)
                  </span>
                </div>
              </div>
            )}

            {!hasWeightTarget && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Peso inicial (kg)</Label>
                  <Input
                    value={startWeightInput}
                    onChange={(e) => setStartWeightInput(e.target.value)}
                    type="number"
                    min={0}
                    step={0.1}
                    placeholder={
                      typeof state?.profile.weightKg === "number"
                        ? String(state.profile.weightKg)
                        : ""
                    }
                    className="h-11 rounded-lg border-2 border-black"
                    disabled={!api}
                  />
                </div>

                <div>
                  <Label className="text-xs">Peso alvo (kg)</Label>
                  <Input
                    value={targetWeightInput}
                    onChange={(e) => setTargetWeightInput(e.target.value)}
                    type="number"
                    min={0}
                    step={0.1}
                    className="h-11 rounded-lg border-2 border-black"
                    disabled={!api}
                  />
                </div>

                <div>
                  <Label className="text-xs">Direção</Label>
                  <Select
                    value={direction}
                    onValueChange={(v) => setDirection(v as WeightDirection)}
                    disabled={!api}
                  >
                    <SelectTrigger className="h-11 rounded-lg border-2 border-black">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lose">Perder peso</SelectItem>
                      <SelectItem value="maintain">Manter peso</SelectItem>
                      <SelectItem value="gain">Ganhar peso</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-xs">Meta semanal (kg/sem)</Label>
                  <Input
                    value={weeklyGoalInput}
                    onChange={(e) => setWeeklyGoalInput(e.target.value)}
                    type="number"
                    min={0}
                    step={0.1}
                    className="h-11 rounded-lg border-2 border-black"
                    disabled={!api}
                  />
                  {weightSuggestion && direction !== "maintain" && (
                    <p className="text-[11px] text-gray-600 mt-1">
                      Sugestão: {weightSuggestion.suggested.toFixed(1)} kg/sem (faixa {weightSuggestion.min.toFixed(1)}–{weightSuggestion.max.toFixed(1)})
                    </p>
                  )}
                </div>

                <div className="md:col-span-2 flex justify-end gap-2">
                  {weightSuggestion && direction !== "maintain" && (
                    <Button
                      type="button"
                      variant="outline"
                      className="rounded-lg border-2 border-black"
                      onClick={() => setWeeklyGoalInput(String(weightSuggestion.suggested))}
                      disabled={!api}
                    >
                      Usar sugestão
                    </Button>
                  )}
                  <Button
                    type="button"
                    className="rounded-lg bg-[#7cb342] hover:bg-[#6ba338]"
                    onClick={() => {
                      if (!api) return;
                      const startKg =
                        parseFloat(startWeightInput) ||
                        (typeof state?.profile.weightKg === "number"
                          ? state.profile.weightKg
                          : NaN);
                      const targetKg = parseFloat(targetWeightInput);
                      const weeklyKg = parseFloat(weeklyGoalInput);

                      if (!Number.isFinite(startKg) || startKg <= 0) return;
                      if (!Number.isFinite(targetKg) || targetKg <= 0) return;

                      api.setWeightTarget({
                        startWeightKg: startKg,
                        targetWeightKg: targetKg,
                        direction,
                        weeklyGoalKg: Number.isFinite(weeklyKg) ? weeklyKg : undefined,
                      });

                      setStartWeightInput("");
                      setTargetWeightInput("");
                      setWeeklyGoalInput("");
                    }}
                    disabled={!api}
                  >
                    Definir alvo
                  </Button>
                </div>
              </div>
            )}

            <div className="mt-4 flex items-end gap-2">
              <div className="flex-1">
                <Label className="text-xs">Check-in (kg)</Label>
                <Input
                  value={weeklyWeightInput}
                  onChange={(e) => setWeeklyWeightInput(e.target.value)}
                  type="number"
                  min={0}
                  step={0.1}
                  className="h-11 rounded-lg border-2 border-black"
                  disabled={!api}
                />
              </div>
              <Button
                onClick={() => {
                  const w = parseFloat(weeklyWeightInput);
                  if (!api || !Number.isFinite(w) || w <= 0) return;
                  api.recordWeeklyWeight(w);
                  setWeeklyWeightInput("");
                }}
                className="h-11 rounded-lg bg-black hover:bg-gray-800"
                disabled={!api}
              >
                Salvar
              </Button>
            </div>

            <div className="mt-4 text-xs text-gray-600">
              Dica: faça 1 check-in por semana, no mesmo horário.
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
          <Card className="p-6 border-2 border-black rounded-lg lg:col-span-2">
            <h4 className="font-bold text-black mb-3">Últimas conquistas</h4>
            {recentAchievements.length === 0 ? (
              <p className="text-sm text-gray-700">
                Comece registrando água, definindo um alvo de peso ou criando sua primeira receita.
              </p>
            ) : (
              <div className="space-y-2">
                {recentAchievements.map((a, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-black/10"
                  >
                    <span className="text-sm font-semibold text-black">{a.title}</span>
                    <span className="text-xs text-gray-600">
                      {new Date(a.at).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4 text-xs text-gray-600">
              {hasWaterProfile && nextWaterStreakMilestone !== null && (
                <div>
                  Streak de água: <span className="font-semibold">{waterStreak} dias</span> · Próximo marco: {nextWaterStreakMilestone} dias
                </div>
              )}
              {weightProgress && nextWeightMilestone !== null && (
                <div>
                  Peso: <span className="font-semibold">{weightProgress.pct}%</span> · Próximo marco: {nextWeightMilestone}%
                </div>
              )}
            </div>
          </Card>

          <Card className="p-6 border-2 border-black rounded-lg">
            <h4 className="font-bold text-black mb-3">Resumo</h4>
            <div className="space-y-2 text-sm text-gray-800">
              <div className="flex justify-between">
                <span>Calculadora</span>
                <span className="font-semibold">{actionSummary.calculator}</span>
              </div>
              <div className="flex justify-between">
                <span>Planos montados</span>
                <span className="font-semibold">{actionSummary.mealplan}</span>
              </div>
              <div className="flex justify-between">
                <span>Receitas criadas</span>
                <span className="font-semibold">{actionSummary.recipes}</span>
              </div>
            </div>

            <div className="mt-4 text-xs text-gray-600">
              Pequenas vitórias contam. Foque em constância.
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
