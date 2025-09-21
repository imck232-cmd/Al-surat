
import React, { useState } from 'react';
import { UserProfile, Meal, MealAnalysis } from '../types';
import DailySummary from './DailySummary';
import MealLogger from './MealLogger';
import AnalysisCard from './AnalysisCard';
import MealHistory from './MealHistory';
import { analyzeMealWithAI, getMealAnalysisFromAI } from '../services/geminiService';

interface DashboardProps {
  userProfile: UserProfile;
  dailyMeals: Meal[];
  addMeal: (meal: Meal) => void;
  dailyGoal: number;
}

const Dashboard: React.FC<DashboardProps> = ({ userProfile, dailyMeals, addMeal, dailyGoal }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastAnalysis, setLastAnalysis] = useState<MealAnalysis | null>(null);

  const handleMealLog = async (method: 'text' | 'image', data: string) => {
    setIsLoading(true);
    setError(null);
    setLastAnalysis(null);
    try {
      const mealData = await analyzeMealWithAI(method, data);
      if (mealData.foods.length === 0) {
        throw new Error("لم يتم التعرف على أطعمة في المدخل. حاول مرة أخرى بوصف أوضح أو صورة مختلفة.");
      }
      
      const totalCalories = mealData.foods.reduce((sum, food) => sum + food.calories, 0);
      const newMeal: Meal = {
        id: new Date().toISOString(),
        name: method === 'text' ? data.substring(0, 30) : `وجبة مصورة ${new Date().toLocaleTimeString()}`,
        foods: mealData.foods,
        totalCalories,
        createdAt: new Date().toISOString(),
      };
      addMeal(newMeal);

      // Get analysis after adding the meal
      const analysis = await getMealAnalysisFromAI(newMeal, userProfile);
      setLastAnalysis(analysis);

    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ غير متوقع.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const totalCaloriesToday = dailyMeals.reduce((sum, meal) => sum + meal.totalCalories, 0);

  return (
    <div className="space-y-8">
      <DailySummary goal={dailyGoal} consumed={totalCaloriesToday} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <MealLogger onLogMeal={handleMealLog} isLoading={isLoading} />
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">{error}</div>}
          {lastAnalysis && <AnalysisCard analysis={lastAnalysis} />}
        </div>
        <div className="lg:col-span-1">
          <MealHistory meals={dailyMeals} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
