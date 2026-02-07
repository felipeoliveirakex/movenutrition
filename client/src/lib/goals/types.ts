export type WeightDirection = "lose" | "gain" | "maintain";

export interface GoalProfile {
  weightKg?: number;
  targetWeightKg?: number;
  direction?: WeightDirection;
  weeklyGoalKg?: number;
  waterTargetMl?: number;
  createdAt: string;
  updatedAt: string;
}

export interface DailyWaterEntry {
  day: string; // YYYY-MM-DD
  targetMl: number;
  consumedMl: number;
  updatedAt: string;
  completedAt?: string;
}

export interface WeeklyWeightEntry {
  week: string; // YYYY-Www
  weightKg: number;
  updatedAt: string;
}

export interface GoalsState {
  profile: GoalProfile;
  waterByDay: Record<string, DailyWaterEntry>;
  weightByWeek: Record<string, WeeklyWeightEntry>;
  events: Record<string, number>; // counters
  unlocked: Record<string, string>; // achievementId -> unlockedAt iso
  lastCelebrated?: {
    id: string;
    at: string;
  };
}

export interface CelebrationEvent {
  id: string;
  title: string;
  message?: string;
  kind: "toast" | "overlay";
}
