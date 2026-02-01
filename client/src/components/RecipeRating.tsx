import { useState } from "react";
import { Star } from "lucide-react";

interface RecipeRatingProps {
  recipeId: number;
  onRate?: (rating: number) => void;
  initialRating?: number;
  averageRating?: number;
  totalRatings?: number;
}

export function RecipeRating({
  recipeId,
  onRate,
  initialRating = 0,
  averageRating = 0,
  totalRatings = 0,
}: RecipeRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);
  const [userRating, setUserRating] = useState(initialRating);

  const handleRate = (rating: number) => {
    setUserRating(rating);
    onRate?.(rating);
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleRate(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className="transition-transform hover:scale-110"
          >
            <Star
              className={`w-5 h-5 ${
                star <= (hoverRating || userRating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>

      <div className="text-sm text-gray-600">
        {averageRating > 0 && (
          <>
            <span className="font-semibold text-[#7cb342]">
              {averageRating.toFixed(1)}
            </span>
            <span className="text-gray-500">
              ({totalRatings} {totalRatings === 1 ? "avaliação" : "avaliações"})
            </span>
          </>
        )}
        {userRating > 0 && (
          <p className="text-xs text-[#7cb342] mt-1">
            Sua avaliação: {userRating} ⭐
          </p>
        )}
      </div>
    </div>
  );
}
