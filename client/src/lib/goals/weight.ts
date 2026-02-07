import { clamp01 } from "./storage";
import type { WeightDirection } from "./types";

export function suggestedWeeklyGoalKg(
  direction: WeightDirection,
  weightKg: number
): { min: number; max: number; suggested: number } {
  const safeWeight = Math.max(30, weightKg);

  if (direction === "lose") {
    const min = round1(safeWeight * 0.0025);
    const max = round1(safeWeight * 0.01);
    const suggested = round1(safeWeight * 0.005);
    return { min, max, suggested };
  }

  if (direction === "gain") {
    const min = round1(safeWeight * 0.001);
    const max = round1(safeWeight * 0.005);
    const suggested = round1(safeWeight * 0.0025);
    return { min, max, suggested };
  }

  return { min: 0, max: 0, suggested: 0 };
}

export function computeWeightProgressPct(params: {
  startWeightKg: number;
  currentWeightKg: number;
  targetWeightKg: number;
  direction: WeightDirection;
  toleranceKg?: number;
}): number {
  const {
    startWeightKg,
    currentWeightKg,
    targetWeightKg,
    direction,
    toleranceKg,
  } = params;

  if (direction === "maintain") {
    const tol =
      toleranceKg ?? Math.max(0.5, Math.abs(targetWeightKg) * 0.005);
    const diff = Math.abs(currentWeightKg - targetWeightKg);
    return diff <= tol ? 1 : 0;
  }

  const denom =
    direction === "lose"
      ? startWeightKg - targetWeightKg
      : targetWeightKg - startWeightKg;

  if (!Number.isFinite(denom) || denom <= 0) return 0;

  const numer =
    direction === "lose"
      ? startWeightKg - currentWeightKg
      : currentWeightKg - startWeightKg;

  return clamp01(numer / denom);
}

export function computeWeightImprovedThisWeek(params: {
  lastWeightKg: number;
  thisWeightKg: number;
  direction: WeightDirection;
  targetWeightKg: number;
  toleranceKg?: number;
}): boolean {
  const { lastWeightKg, thisWeightKg, direction, targetWeightKg, toleranceKg } =
    params;

  if (direction === "maintain") {
    const tol =
      toleranceKg ?? Math.max(0.5, Math.abs(targetWeightKg) * 0.005);
    return (
      Math.abs(thisWeightKg - targetWeightKg) <
      Math.abs(lastWeightKg - targetWeightKg) - Math.min(0.1, tol / 5)
    );
  }

  if (direction === "lose") return thisWeightKg < lastWeightKg;
  return thisWeightKg > lastWeightKg;
}

function round1(value: number) {
  return Math.round(value * 10) / 10;
}
