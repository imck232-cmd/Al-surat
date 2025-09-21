
import { UserProfile, Gender, Goal } from '../types';

// Calculates Basal Metabolic Rate (BMR) using Mifflin-St Jeor equation
const calculateBMR = (profile: UserProfile): number => {
  const { weight, height, age, gender } = profile;
  if (gender === Gender.Male) {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
};

// Calculates Total Daily Energy Expenditure (TDEE)
export const calculateTDEE = (profile: UserProfile): number => {
  const bmr = calculateBMR(profile);
  const tdee = bmr * profile.activityLevel;

  switch (profile.goal) {
    case Goal.LoseWeight:
      return tdee - 500; // Caloric deficit
    case Goal.GainWeight:
      return tdee + 500; // Caloric surplus
    case Goal.MaintainWeight:
    default:
      return tdee;
  }
};
