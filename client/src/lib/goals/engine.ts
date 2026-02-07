import {
  makeUserKey,
  nowIso,
  safeJsonParse,
  startOfWeekKey,
  todayKey,
} from "./storage";
import type {
  CelebrationEvent,
  DailyWaterEntry,
  GoalsState,
  WeeklyWeightEntry,
  WeightDirection,
} from "./types";
import {
  buildCelebration,
  type AchievementId,
  isUnlocked,
} from "./achievements";
import {
  computeWeightImprovedThisWeek,
  computeWeightProgressPct,
  suggestedWeeklyGoalKg,
} from "./weight";

const STATE_KEY = "goals:v1";

function emptyState(): GoalsState {
  const now = nowIso();
  return {
    profile: { createdAt: now, updatedAt: now },
    waterByDay: {},
    weightByWeek: {},
    events: {},
    unlocked: {},
  };
}

export function loadGoalsState(storage: Storage, userId: string): GoalsState {
  const key = makeUserKey(userId, STATE_KEY);
  const parsed = safeJsonParse<GoalsState>(storage.getItem(key));
  return parsed ?? emptyState();
}

export function saveGoalsState(storage: Storage, userId: string, state: GoalsState) {
  const key = makeUserKey(userId, STATE_KEY);
  storage.setItem(key, JSON.stringify(state));
}

function unlock(state: GoalsState, id: AchievementId, atIso = nowIso()) {
  if (state.unlocked[id]) return;
  state.unlocked[id] = atIso;
}

function addCelebration(
  state: GoalsState,
  id: AchievementId,
  celebrations: CelebrationEvent[]
) {
  celebrations.push(buildCelebration(id));
  state.lastCelebrated = { id, at: nowIso() };
}

export function setProfileFromCalculator(params: {
  storage: Storage;
  userId: string;
  weightKg: number;
  waterTargetMl: number;
  direction?: WeightDirection;
}): { state: GoalsState; celebrations: CelebrationEvent[] } {
  const { storage, userId, weightKg, waterTargetMl, direction } = params;
  const state = loadGoalsState(storage, userId);
  const celebrations: CelebrationEvent[] = [];

  state.profile.weightKg = weightKg;
  state.profile.waterTargetMl = waterTargetMl;
  if (direction) state.profile.direction = direction;
  state.profile.updatedAt = nowIso();

  if (!isUnlocked(state, "water_profile_set")) {
    unlock(state, "water_profile_set");
    addCelebration(state, "water_profile_set", celebrations);
  }

  saveGoalsState(storage, userId, state);
  return { state, celebrations };
}

export function incrementEvent(params: {
  storage: Storage;
  userId: string;
  eventId: string;
  amount?: number;
  signature?: string;
  cooldownSeconds?: number;
}): { state: GoalsState; celebrations: CelebrationEvent[] } {
  const {
    storage,
    userId,
    eventId,
    amount = 1,
    signature,
    cooldownSeconds,
  } = params;

  const state = loadGoalsState(storage, userId);
  const celebrations: CelebrationEvent[] = [];

  const now = Date.now();
  const signatureKey = signature ? `sig:${eventId}:${signature}` : undefined;

  if (cooldownSeconds) {
    const lastKey = `cooldown:${eventId}`;
    const last = state.events[lastKey] ?? 0;
    if (now - last < cooldownSeconds * 1000) {
      return { state, celebrations };
    }
    state.events[lastKey] = now;
  }

  if (signatureKey) {
    if (state.events[signatureKey]) {
      return { state, celebrations };
    }
    state.events[signatureKey] = now;
  }

  state.events[eventId] = (state.events[eventId] ?? 0) + amount;

  // Achievements mapping (MVP)
  if (eventId === "calculator_used") {
    if (!isUnlocked(state, "calculator_used_first")) {
      unlock(state, "calculator_used_first");
      addCelebration(state, "calculator_used_first", celebrations);
    }
    if (state.events[eventId] >= 5 && !isUnlocked(state, "calculator_used_5")) {
      unlock(state, "calculator_used_5");
      addCelebration(state, "calculator_used_5", celebrations);
    }
  }

  if (eventId === "mealplan_built") {
    if (!isUnlocked(state, "mealplan_built_first")) {
      unlock(state, "mealplan_built_first");
      addCelebration(state, "mealplan_built_first", celebrations);
    }
    if (state.events[eventId] >= 4 && !isUnlocked(state, "mealplan_built_4")) {
      unlock(state, "mealplan_built_4");
      addCelebration(state, "mealplan_built_4", celebrations);
    }
  }

  if (eventId === "recipe_created") {
    if (!isUnlocked(state, "recipe_created_first")) {
      unlock(state, "recipe_created_first");
      addCelebration(state, "recipe_created_first", celebrations);
    }
    if (state.events[eventId] >= 5 && !isUnlocked(state, "recipe_created_5")) {
      unlock(state, "recipe_created_5");
      addCelebration(state, "recipe_created_5", celebrations);
    }
    if (state.events[eventId] >= 10 && !isUnlocked(state, "recipe_created_10")) {
      unlock(state, "recipe_created_10");
      addCelebration(state, "recipe_created_10", celebrations);
    }
  }

  saveGoalsState(storage, userId, state);
  return { state, celebrations };
}

export function recordWaterIntake(params: {
  storage: Storage;
  userId: string;
  consumedMlDelta: number;
  date?: Date;
}): { state: GoalsState; celebrations: CelebrationEvent[]; entry: DailyWaterEntry } {
  const { storage, userId, consumedMlDelta, date } = params;
  const state = loadGoalsState(storage, userId);
  const celebrations: CelebrationEvent[] = [];

  const day = todayKey(date);
  const targetMl = state.profile.waterTargetMl ?? 0;
  const prev = state.waterByDay[day];
  const nextConsumed = Math.max(0, (prev?.consumedMl ?? 0) + consumedMlDelta);

  const entry: DailyWaterEntry = {
    day,
    targetMl,
    consumedMl: nextConsumed,
    updatedAt: nowIso(),
    completedAt: prev?.completedAt,
  };

  if (!prev) {
    if (!isUnlocked(state, "water_checkin_first")) {
      unlock(state, "water_checkin_first");
      addCelebration(state, "water_checkin_first", celebrations);
    }
  }

  if (targetMl > 0 && nextConsumed >= targetMl && !entry.completedAt) {
    entry.completedAt = nowIso();
    if (!isUnlocked(state, "water_goal_day_complete")) {
      unlock(state, "water_goal_day_complete");
      addCelebration(state, "water_goal_day_complete", celebrations);
    } else {
      celebrations.push(buildCelebration("water_goal_day_complete"));
    }
  }

  state.waterByDay[day] = entry;

  // Streaks: count consecutive days where consumed >= target.
  const streak = computeWaterStreakDays(state);
  if (streak >= 3 && !isUnlocked(state, "water_streak_3")) {
    unlock(state, "water_streak_3");
    addCelebration(state, "water_streak_3", celebrations);
  }
  if (streak >= 7 && !isUnlocked(state, "water_streak_7")) {
    unlock(state, "water_streak_7");
    addCelebration(state, "water_streak_7", celebrations);
  }
  if (streak >= 14 && !isUnlocked(state, "water_streak_14")) {
    unlock(state, "water_streak_14");
    addCelebration(state, "water_streak_14", celebrations);
  }

  saveGoalsState(storage, userId, state);
  return { state, celebrations, entry };
}

function computeWaterStreakDays(state: GoalsState): number {
  const target = state.profile.waterTargetMl ?? 0;
  if (!target) return 0;

  let streak = 0;
  const date = new Date();
  for (let i = 0; i < 30; i++) {
    const d = new Date(date);
    d.setDate(date.getDate() - i);
    const day = todayKey(d);
    const entry = state.waterByDay[day];
    if (!entry) break;
    if (entry.consumedMl < target) break;
    streak += 1;
  }
  return streak;
}

export function setWeightTarget(params: {
  storage: Storage;
  userId: string;
  startWeightKg: number;
  targetWeightKg: number;
  direction: WeightDirection;
  weeklyGoalKg?: number;
}): { state: GoalsState; celebrations: CelebrationEvent[]; suggestions: ReturnType<typeof suggestedWeeklyGoalKg> } {
  const { storage, userId, startWeightKg, targetWeightKg, direction, weeklyGoalKg } = params;
  const state = loadGoalsState(storage, userId);
  const celebrations: CelebrationEvent[] = [];

  state.profile.weightKg = startWeightKg;
  state.profile.targetWeightKg = targetWeightKg;
  state.profile.direction = direction;

  const suggestions = suggestedWeeklyGoalKg(direction, startWeightKg);
  state.profile.weeklyGoalKg = weeklyGoalKg ?? suggestions.suggested;
  state.profile.updatedAt = nowIso();

  if (!isUnlocked(state, "weight_target_set")) {
    unlock(state, "weight_target_set");
    addCelebration(state, "weight_target_set", celebrations);
  }

  saveGoalsState(storage, userId, state);
  return { state, celebrations, suggestions };
}

export function recordWeeklyWeight(params: {
  storage: Storage;
  userId: string;
  weightKg: number;
  date?: Date;
}): { state: GoalsState; celebrations: CelebrationEvent[]; entry: WeeklyWeightEntry; progressPct: number } {
  const { storage, userId, weightKg, date } = params;
  const state = loadGoalsState(storage, userId);
  const celebrations: CelebrationEvent[] = [];

  const week = startOfWeekKey(date);
  const entry: WeeklyWeightEntry = { week, weightKg, updatedAt: nowIso() };
  state.weightByWeek[week] = entry;
  state.profile.updatedAt = nowIso();

  if (!isUnlocked(state, "weight_checkin_first")) {
    unlock(state, "weight_checkin_first");
    addCelebration(state, "weight_checkin_first", celebrations);
  }

  const target = state.profile.targetWeightKg;
  const direction = state.profile.direction;

  let progressPct = 0;

  // Compute progress milestones if we can.
  if (typeof target === "number" && direction) {
    const weeksSorted = Object.values(state.weightByWeek)
      .slice()
      .sort((a, b) => a.week.localeCompare(b.week));

    const start = weeksSorted[0]?.weightKg ?? weightKg;
    const current = weightKg;

    progressPct = computeWeightProgressPct({
      startWeightKg: start,
      currentWeightKg: current,
      targetWeightKg: target,
      direction,
    });

    // Weekly improved toast
    const prev = weeksSorted.length >= 2 ? weeksSorted[weeksSorted.length - 2]?.weightKg : undefined;
    if (
      typeof prev === "number" &&
      computeWeightImprovedThisWeek({
        lastWeightKg: prev,
        thisWeightKg: current,
        direction,
        targetWeightKg: target,
      }) &&
      !isUnlocked(state, "weight_weekly_improved")
    ) {
      // This one should be repeatable weekly; store as a day/week keyed unlock.
      const weeklyKey = `weight_weekly_improved:${week}` as const;
      if (!state.unlocked[weeklyKey]) {
        state.unlocked[weeklyKey] = nowIso();
        celebrations.push(buildCelebration("weight_weekly_improved"));
      }
    }

    // Streak 4 weeks check-ins
    const streak4Key = computeWeightCheckinStreakWeeks(state);
    if (streak4Key >= 4 && !isUnlocked(state, "weight_checkin_streak_4")) {
      unlock(state, "weight_checkin_streak_4");
      addCelebration(state, "weight_checkin_streak_4", celebrations);
    }

    // Progress milestones
    const milestoneChecks: Array<[number, AchievementId]> = [
      [0.1, "weight_progress_10pct"],
      [0.25, "weight_progress_25pct"],
      [0.5, "weight_progress_50pct"],
      [0.75, "weight_progress_75pct"],
      [1, "weight_goal_reached"],
    ];

    for (const [threshold, id] of milestoneChecks) {
      if (progressPct >= threshold && !isUnlocked(state, id)) {
        unlock(state, id);
        addCelebration(state, id, celebrations);
      }
    }
  }

  saveGoalsState(storage, userId, state);
  return { state, celebrations, entry, progressPct };
}

function computeWeightCheckinStreakWeeks(state: GoalsState): number {
  const weeks = Object.values(state.weightByWeek)
    .slice()
    .sort((a, b) => a.week.localeCompare(b.week));
  if (weeks.length === 0) return 0;

  // Simple: last N entries (not necessarily consecutive ISO weeks)
  // MVP: streak == number of recent check-ins up to 8.
  return Math.min(weeks.length, 8);
}
