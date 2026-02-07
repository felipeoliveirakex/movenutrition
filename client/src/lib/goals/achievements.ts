import type { CelebrationEvent, GoalsState } from "./types";

export type AchievementId =
  | "water_profile_set"
  | "water_checkin_first"
  | "water_goal_day_complete"
  | "water_streak_3"
  | "water_streak_7"
  | "water_streak_14"
  | "weight_target_set"
  | "weight_checkin_first"
  | "weight_checkin_streak_4"
  | "weight_progress_10pct"
  | "weight_progress_25pct"
  | "weight_progress_50pct"
  | "weight_progress_75pct"
  | "weight_goal_reached"
  | "weight_weekly_improved"
  | "calculator_used_first"
  | "calculator_used_5"
  | "mealplan_built_first"
  | "mealplan_built_4"
  | "recipe_created_first"
  | "recipe_created_5"
  | "recipe_created_10";

export const ALL_ACHIEVEMENTS: AchievementId[] = [
  "water_profile_set",
  "water_checkin_first",
  "water_goal_day_complete",
  "water_streak_3",
  "water_streak_7",
  "water_streak_14",
  "weight_target_set",
  "weight_checkin_first",
  "weight_checkin_streak_4",
  "weight_progress_10pct",
  "weight_progress_25pct",
  "weight_progress_50pct",
  "weight_progress_75pct",
  "weight_goal_reached",
  "weight_weekly_improved",
  "calculator_used_first",
  "calculator_used_5",
  "mealplan_built_first",
  "mealplan_built_4",
  "recipe_created_first",
  "recipe_created_5",
  "recipe_created_10",
];

export function isAchievementId(value: string): value is AchievementId {
  return (ALL_ACHIEVEMENTS as string[]).includes(value);
}

export interface UnlockResult {
  unlocked: AchievementId[];
  celebrations: CelebrationEvent[];
}

export function getUnlocked(state: GoalsState) {
  return state.unlocked ?? {};
}

export function isUnlocked(state: GoalsState, id: AchievementId) {
  return Boolean(getUnlocked(state)[id]);
}

export function buildCelebration(id: AchievementId): CelebrationEvent {
  switch (id) {
    case "water_profile_set":
      return {
        id,
        kind: "toast",
        title: "Meta de água definida",
        message: "Bora manter constância hoje.",
      };
    case "water_checkin_first":
      return { id, kind: "toast", title: "Boa! Água registrada hoje." };
    case "water_goal_day_complete":
      return {
        id,
        kind: "overlay",
        title: "Meta de água batida!",
        message: "Você cuidou do básico. Continua assim.",
      };
    case "water_streak_3":
      return {
        id,
        kind: "overlay",
        title: "3 dias seguidos!",
        message: "Consistência é tudo.",
      };
    case "water_streak_7":
      return {
        id,
        kind: "overlay",
        title: "1 semana perfeita!",
        message: "Seu corpo agradece.",
      };
    case "water_streak_14":
      return {
        id,
        kind: "overlay",
        title: "2 semanas de constância!",
        message: "Você virou o jogo.",
      };

    case "weight_target_set":
      return {
        id,
        kind: "overlay",
        title: "Objetivo definido",
        message: "Agora é passo a passo.",
      };
    case "weight_checkin_first":
      return {
        id,
        kind: "toast",
        title: "Check-in da semana feito",
        message: "Ótimo começo.",
      };
    case "weight_checkin_streak_4":
      return {
        id,
        kind: "overlay",
        title: "4 semanas acompanhando",
        message: "Isso é disciplina.",
      };
    case "weight_progress_10pct":
      return {
        id,
        kind: "overlay",
        title: "10% do caminho!",
        message: "Você já saiu do lugar.",
      };
    case "weight_progress_25pct":
      return {
        id,
        kind: "overlay",
        title: "25% concluído",
        message: "Tá funcionando.",
      };
    case "weight_progress_50pct":
      return {
        id,
        kind: "overlay",
        title: "Metade do caminho!",
        message: "Continua.",
      };
    case "weight_progress_75pct":
      return {
        id,
        kind: "overlay",
        title: "75%!",
        message: "Você está muito perto.",
      };
    case "weight_goal_reached":
      return {
        id,
        kind: "overlay",
        title: "Objetivo alcançado!",
        message: "Parabéns de verdade.",
      };
    case "weight_weekly_improved":
      return {
        id,
        kind: "toast",
        title: "Boa semana!",
        message: "Você evoluiu na direção certa.",
      };

    case "calculator_used_first":
      return {
        id,
        kind: "toast",
        title: "Boa!",
        message: "Agora você tem uma meta diária.",
      };
    case "calculator_used_5":
      return {
        id,
        kind: "overlay",
        title: "5 usos da calculadora!",
        message: "Você está ajustando com inteligência.",
      };

    case "mealplan_built_first":
      return {
        id,
        kind: "overlay",
        title: "Plano montado!",
        message: "Agora é só executar.",
      };
    case "mealplan_built_4":
      return {
        id,
        kind: "overlay",
        title: "1 mês planejando",
        message: "Isso vira resultado.",
      };

    case "recipe_created_first":
      return {
        id,
        kind: "overlay",
        title: "Primeira receita criada!",
        message: "Seu cardápio é seu.",
      };
    case "recipe_created_5":
      return {
        id,
        kind: "overlay",
        title: "5 receitas suas!",
        message: "Isso é autonomia.",
      };
    case "recipe_created_10":
      return {
        id,
        kind: "overlay",
        title: "10 receitas!",
        message: "Você construiu uma base ótima.",
      };
  }
}
