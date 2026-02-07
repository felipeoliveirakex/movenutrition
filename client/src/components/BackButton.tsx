import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

interface BackButtonProps {
  className?: string;
  label?: string;
}

export function BackButton({ className = "", label = "Voltar" }: BackButtonProps) {
  const [, setLocation] = useLocation();

  const handleBack = () => {
    setLocation("/membros");
  };

  return (
    <button
      onClick={handleBack}
      className={`flex items-center gap-2 px-4 py-2 text-[#7cb342] hover:text-[#6ba338] font-semibold transition-colors ${className}`}
      aria-label={label}
    >
      <ArrowLeft className="w-5 h-5" />
      {label}
    </button>
  );
}
