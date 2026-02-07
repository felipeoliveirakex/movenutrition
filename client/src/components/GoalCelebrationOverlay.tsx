import { AnimatePresence, motion } from "framer-motion";
import { useGoalCelebration } from "@/contexts/GoalCelebrationContext";
import { Button } from "@/components/ui/button";

export default function GoalCelebrationOverlay() {
  const { currentOverlay, dismissOverlay } = useGoalCelebration();

  return (
    <AnimatePresence>
      {currentOverlay && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            className="w-full max-w-md rounded-3xl bg-white border-2 border-black shadow-2xl overflow-hidden"
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 10, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <div className="p-6 bg-gradient-to-br from-green-50 to-white">
              <div className="text-5xl mb-3">🎉</div>
              <h3 className="text-2xl font-bold text-black mb-2">
                {currentOverlay.title}
              </h3>
              {currentOverlay.message && (
                <p className="text-gray-700 text-base">{currentOverlay.message}</p>
              )}
            </div>

            <div className="p-6 pt-0">
              <Button
                onClick={dismissOverlay}
                className="w-full h-11 rounded-full bg-[#7cb342] hover:bg-[#6ba338]"
              >
                Continuar
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
