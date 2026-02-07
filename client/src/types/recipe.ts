export interface RecipeMacros {
  protein: string;
  carbs: string;
  fat: string;
}

export interface Recipe {
  id: number;
  name: string;
  category: string;
  image: string; // emoji
  ingredients: string[];
  benefits: string[];
  time: number;
  difficulty: string;
  servings: number;
  calories: number;
  macros: RecipeMacros;
  instructions: string[];
  tips: string[];
  variations: string[];
}

export interface UserRecipe extends Recipe {
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  source: "user";
}
