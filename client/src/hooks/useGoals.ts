import { useEffect, useMemo, useState } from "react";
import { useSupabaseAuth } from "./useSupabaseAuth";
import type { CelebrationEvent, GoalsState, WeightDirection } from "@/lib/goals";
import {
  loadGoalsState,
  recordWaterIntake,
  recordWeeklyWeight,
  setProfileFromCalculator,
  setWeightTarget,
  incrementEvent,
} from "@/lib/goals/engine";

export function useGoals() {
  const { user } = useSupabaseAuth();
  const userId = user?.id;

  const [state, setState] = useState<GoalsState | null>(null);
  const [celebrations, setCelebrations] = useState<CelebrationEvent[]>([]);

  useEffect(() => {
    if (!userId) {
      setState(null);
      return;
    }
    const s = loadGoalsState(localStorage, userId);
    setState(s);
  }, [userId]);

  const profile = state?.profile;

  const api = useMemo(() => {
    if (!userId) return null;

    return {
      refresh() {
        setState(loadGoalsState(localStorage, userId));
      },
      consumeCelebrations() {
        const c = celebrations;
        setCelebrations([]);
        return c;
      },
      setFromCalculator(params: {
        weightKg: number;
        waterTargetMl: number;
        direction?: WeightDirection;
      }) {
        const { celebrations: c, state: s } = setProfileFromCalculator({
          storage: localStorage,
          userId,
          ...params,
        });
        setState(s);
        if (c.length) setCelebrations((prev) => [...prev, ...c]);
      },
      setWeightTarget(params: {
        startWeightKg: number;
        targetWeightKg: number;
        direction: WeightDirection;
        weeklyGoalKg?: number;
      }) {
        const { celebrations: c, state: s, suggestions } = setWeightTarget({
          storage: localStorage,
          userId,
          ...params,
        });
        setState(s);
        if (c.length) setCelebrations((prev) => [...prev, ...c]);
        return suggestions;
      },
      recordWater(deltaMl: number) {
        const { celebrations: c, state: s } = recordWaterIntake({
          storage: localStorage,
          userId,
          consumedMlDelta: deltaMl,
        });
        setState(s);
        if (c.length) setCelebrations((prev) => [...prev, ...c]);
      },
      recordWeeklyWeight(weightKg: number) {
        const { celebrations: c, state: s, progressPct } = recordWeeklyWeight({
          storage: localStorage,
          userId,
          weightKg,
        });
        setState(s);
        if (c.length) setCelebrations((prev) => [...prev, ...c]);
        return progressPct;
      },
      incrementEvent(eventId: string, options?: { signature?: string }) {
        const { celebrations: c, state: s } = incrementEvent({
          storage: localStorage,
          userId,
          eventId,
          signature: options?.signature,
        });
        setState(s);
        if (c.length) setCelebrations((prev) => [...prev, ...c]);
      },
    };
  }, [celebrations, userId]);

  return {
    userId,
    state,
    profile,
    celebrations,
    api,
  };
}
