import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { CelebrationEvent } from "@/lib/goals";
import { toast } from "sonner";
import { useGoals } from "@/hooks/useGoals";

interface GoalCelebrationContextValue {
  queue: CelebrationEvent[];
  currentOverlay: CelebrationEvent | null;
  dismissOverlay: () => void;
}

const GoalCelebrationContext = createContext<GoalCelebrationContextValue | null>(
  null
);

export function GoalCelebrationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { celebrations, api } = useGoals();
  const [queue, setQueue] = useState<CelebrationEvent[]>([]);
  const [currentOverlay, setCurrentOverlay] = useState<CelebrationEvent | null>(
    null
  );
  const [overlaysShown, setOverlaysShown] = useState(0);
  const [lastToastAt, setLastToastAt] = useState(0);

  // Pull new celebrations from goals hook
  useEffect(() => {
    if (!api) return;
    if (!celebrations.length) return;

    // Consume and enqueue
    const consumed = api.consumeCelebrations();
    if (!consumed.length) return;

    setQueue((prev) => [...prev, ...consumed]);
  }, [api, celebrations]);

  // Process queue: toasts immediately; overlays one at a time.
  useEffect(() => {
    if (!queue.length) return;

    // If overlay already showing, wait
    if (currentOverlay) return;

    const [next, ...rest] = queue;

    if (next.kind === "toast") {
      const now = Date.now();
      if (now - lastToastAt > 700) {
        toast.success(next.title, {
          description: next.message,
          duration: 3500,
        });
        setLastToastAt(now);
      }
      setQueue(rest);
      return;
    }

    // Overlay (anti-spam): max 1 overlay por sessão.
    if (overlaysShown >= 1) {
      const now = Date.now();
      if (now - lastToastAt > 700) {
        toast.success(next.title, {
          description: next.message,
          duration: 3500,
        });
        setLastToastAt(now);
      }
      setQueue(rest);
      return;
    }

    setCurrentOverlay(next);
    setOverlaysShown((n) => n + 1);
    setQueue(rest);
  }, [queue, currentOverlay, overlaysShown, lastToastAt]);

  const value = useMemo(
    () => ({
      queue,
      currentOverlay,
      dismissOverlay: () => setCurrentOverlay(null),
    }),
    [queue, currentOverlay]
  );

  return (
    <GoalCelebrationContext.Provider value={value}>
      {children}
    </GoalCelebrationContext.Provider>
  );
}

export function useGoalCelebration() {
  const ctx = useContext(GoalCelebrationContext);
  if (!ctx) {
    throw new Error("useGoalCelebration must be used within GoalCelebrationProvider");
  }
  return ctx;
}
