import { useState } from "react";
import { Share2, MessageCircle, Mail, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ShareButtonProps {
  title: string;
  description?: string;
  url?: string;
}

export function ShareButton({ title, description, url }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const shareUrl = url || window.location.href;
  const shareText = `${title}${description ? ` - ${description}` : ""}`;

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Confira essa receita incrível: ${shareText}\n${shareUrl}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
    setShowMenu(false);
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(`Receita: ${title}`);
    const body = encodeURIComponent(
      `Confira essa receita incrível:\n\n${shareText}\n\n${shareUrl}`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    setShowMenu(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    setShowMenu(false);
  };

  return (
    <div className="relative">
      <Button
        onClick={() => setShowMenu(!showMenu)}
        variant="outline"
        size="sm"
        className="rounded-lg border-2 border-black hover:bg-green-50"
      >
        <Share2 className="w-4 h-4" />
      </Button>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-white border-2 border-black rounded-lg shadow-lg z-50">
          <button
            onClick={handleWhatsApp}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-green-50 transition-colors text-left font-medium text-black border-b-2 border-black/10"
          >
            <MessageCircle className="w-4 h-4 text-[#7cb342]" />
            WhatsApp
          </button>
          <button
            onClick={handleEmail}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-green-50 transition-colors text-left font-medium text-black border-b-2 border-black/10"
          >
            <Mail className="w-4 h-4 text-[#7cb342]" />
            Email
          </button>
          <button
            onClick={handleCopy}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-green-50 transition-colors text-left font-medium text-black"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-600" />
                Copiado!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#7cb342]" />
                Copiar Link
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
