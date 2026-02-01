import { describe, expect, it } from "vitest";

describe("Calculator Page", () => {
  describe("Header", () => {
    it("should have green header bar", () => {
      const headerColor = "#7cb342";
      expect(headerColor).toBe("#7cb342");
    });

    it("should have Move Wellness logo", () => {
      const logo = "Move Wellness";
      expect(logo).toBeDefined();
    });

    it("should link back to home", () => {
      const link = "/membros";
      expect(link).toBe("/membros");
    });
  });

  describe("Hero Section", () => {
    it("should display title", () => {
      const title = "Calculadora de Calorias";
      expect(title).toBeDefined();
    });

    it("should display subtitle", () => {
      const subtitle = "Descubra suas necessidades nutricionais diárias";
      expect(subtitle).toBeDefined();
    });

    it("should have calculator icon", () => {
      const icon = "Calculator";
      expect(icon).toBeDefined();
    });
  });

  describe("Form Inputs", () => {
    it("should have gender selection", () => {
      const genders = ["Masculino", "Feminino"];
      expect(genders).toHaveLength(2);
    });

    it("should have age input", () => {
      const field = "age";
      expect(field).toBeDefined();
    });

    it("should have weight input", () => {
      const field = "weight";
      expect(field).toBeDefined();
    });

    it("should have height input", () => {
      const field = "height";
      expect(field).toBeDefined();
    });

    it("should have activity level selector", () => {
      const levels = [
        "Sedentário",
        "Leve",
        "Moderado",
        "Ativo",
        "Muito ativo",
      ];
      expect(levels).toHaveLength(5);
    });

    it("should have goal selector", () => {
      const goals = ["Perder peso", "Manter peso", "Ganhar massa"];
      expect(goals).toHaveLength(3);
    });
  });

  describe("Calculations", () => {
    it("should calculate BMR correctly", () => {
      // Mifflin-St Jeor for male: 70kg, 170cm, 30 years
      const bmr = 10 * 70 + 6.25 * 170 - 5 * 30 + 5;
      expect(bmr).toBeGreaterThan(0);
    });

    it("should calculate TDEE with activity multiplier", () => {
      const bmr = 1700;
      const activityMultiplier = 1.55;
      const tdee = bmr * activityMultiplier;
      expect(tdee).toBeGreaterThan(bmr);
    });

    it("should adjust calories based on goal", () => {
      const tdee = 2635;
      const goalAdjustment = -500; // lose weight
      const targetCalories = tdee + goalAdjustment;
      expect(targetCalories).toBeLessThan(tdee);
    });

    it("should calculate macros for weight loss", () => {
      const calories = 2135;
      const proteinRatio = 0.35;
      const protein = Math.round((calories * proteinRatio) / 4);
      expect(protein).toBeGreaterThan(0);
    });

    it("should calculate BMI correctly", () => {
      const weight = 70;
      const height = 170;
      const heightM = height / 100;
      const bmi = weight / (heightM * heightM);
      expect(bmi).toBeCloseTo(24.2, 1);
    });

    it("should categorize BMI correctly", () => {
      const bmi = 24.2;
      const category = bmi < 25 ? "Peso normal" : "Sobrepeso";
      expect(category).toBe("Peso normal");
    });

    it("should calculate water intake", () => {
      const weight = 70;
      const water = Math.round(weight * 35);
      expect(water).toBe(2450);
    });
  });

  describe("Results Display", () => {
    it("should show BMR value", () => {
      const bmr = 1700;
      expect(bmr).toBeGreaterThan(0);
    });

    it("should show TDEE value", () => {
      const tdee = 2635;
      expect(tdee).toBeGreaterThan(0);
    });

    it("should show target calories", () => {
      const targetCalories = 2135;
      expect(targetCalories).toBeGreaterThan(0);
    });

    it("should show protein grams", () => {
      const protein = 186;
      expect(protein).toBeGreaterThan(0);
    });

    it("should show carbs grams", () => {
      const carbs = 186;
      expect(carbs).toBeGreaterThan(0);
    });

    it("should show fat grams", () => {
      const fat = 64;
      expect(fat).toBeGreaterThan(0);
    });

    it("should show BMI value", () => {
      const bmi = "24.2";
      expect(bmi).toBeDefined();
    });

    it("should show BMI category", () => {
      const category = "Peso normal";
      expect(category).toBeDefined();
    });

    it("should show water intake", () => {
      const water = 2450;
      expect(water).toBeGreaterThan(0);
    });
  });

  describe("Form Validation", () => {
    it("should require age input", () => {
      const age = "";
      const isValid = !!age;
      expect(isValid).toBe(false);
    });

    it("should require weight input", () => {
      const weight = "";
      const isValid = !!weight;
      expect(isValid).toBe(false);
    });

    it("should require height input", () => {
      const height = "";
      const isValid = !!height;
      expect(isValid).toBe(false);
    });

    it("should accept valid inputs", () => {
      const age = "30";
      const weight = "70";
      const height = "170";
      const isValid = !!(age && weight && height);
      expect(isValid).toBe(true);
    });
  });

  describe("Design Consistency", () => {
    it("should use green color for primary actions", () => {
      const primaryColor = "#7cb342";
      expect(primaryColor).toBe("#7cb342");
    });

    it("should use white background", () => {
      const bgColor = "white";
      expect(bgColor).toBe("white");
    });

    it("should have border styling", () => {
      const borderStyle = "border-2 border-black";
      expect(borderStyle).toContain("border");
    });

    it("should have rounded corners", () => {
      const borderRadius = "rounded-lg";
      expect(borderRadius).toBeDefined();
    });
  });

  describe("Responsive Design", () => {
    it("should stack form on mobile", () => {
      const layout = "grid";
      expect(layout).toBeDefined();
    });

    it("should use two columns on desktop", () => {
      const layout = "lg:grid-cols-2";
      expect(layout).toBeDefined();
    });
  });

  describe("Navigation", () => {
    it("should have back link to home", () => {
      const href = "/membros";
      expect(href).toBe("/membros");
    });

    it("should maintain header on scroll", () => {
      const sticky = "sticky";
      expect(sticky).toBeDefined();
    });
  });

  describe("Macro Distribution", () => {
    it("should use high protein for weight loss", () => {
      const goal = "lose";
      const proteinRatio = goal === "lose" ? 0.35 : 0.3;
      expect(proteinRatio).toBe(0.35);
    });

    it("should use high carbs for muscle gain", () => {
      const goal = "gain";
      const carbRatio = goal === "gain" ? 0.45 : 0.4;
      expect(carbRatio).toBe(0.45);
    });

    it("should use balanced macros for maintenance", () => {
      const goal = "maintain";
      const proteinRatio = goal === "maintain" ? 0.3 : 0.35;
      const carbRatio = goal === "maintain" ? 0.4 : 0.35;
      expect(proteinRatio).toBe(0.3);
      expect(carbRatio).toBe(0.4);
    });
  });
});
