
export enum Gender {
  Male = 'male',
  Female = 'female',
}

export enum ActivityLevel {
  Sedentary = 1.2,
  LightlyActive = 1.375,
  ModeratelyActive = 1.55,
  VeryActive = 1.725,
  ExtraActive = 1.9,
}

export enum Goal {
  LoseWeight = 'lose',
  MaintainWeight = 'maintain',
  GainWeight = 'gain',
}

export interface UserProfile {
  age: number;
  gender: Gender;
  weight: number;
  height: number;
  activityLevel: ActivityLevel;
  goal: Goal;
}

export interface FoodItem {
  name: string;
  quantity_g: number;
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
}

export interface Meal {
  id: string;
  name: string;
  foods: FoodItem[];
  totalCalories: number;
  createdAt: string;
}

export interface MealAnalysis {
    analysis: string;
    alternatives: string[];
}
