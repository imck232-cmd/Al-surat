
import React, { useState, useEffect, useCallback } from 'react';
import { UserProfile, Meal } from './types';
import ProfileSetup from './components/ProfileSetup';
import Dashboard from './components/Dashboard';
import { calculateTDEE } from './utils/nutritionCalculations';
import { useLocalStorage } from './hooks/useLocalStorage';

const App: React.FC = () => {
  const [userProfile, setUserProfile] = useLocalStorage<UserProfile | null>('userProfile', null);
  const [dailyMeals, setDailyMeals] = useLocalStorage<Meal[]>('dailyMeals', []);
  const [dailyGoal, setDailyGoal] = useState<number>(2000);

  const calculateAndSetGoal = useCallback(() => {
    if (userProfile) {
      setDailyGoal(calculateTDEE(userProfile));
    }
  }, [userProfile]);

  useEffect(() => {
    // Check if the date has changed, if so, clear meals
    const lastVisitDate = localStorage.getItem('lastVisitDate');
    const today = new Date().toISOString().split('T')[0];
    if (lastVisitDate !== today) {
      setDailyMeals([]);
      localStorage.setItem('lastVisitDate', today);
    }
    calculateAndSetGoal();
  }, [calculateAndSetGoal, setDailyMeals]);
  
  const handleProfileSave = (profile: UserProfile) => {
    setUserProfile(profile);
    setDailyGoal(calculateTDEE(profile));
  };

  const addMeal = (meal: Meal) => {
    setDailyMeals(prevMeals => [...prevMeals, meal]);
  };

  const Footer: React.FC = () => (
    <footer className="w-full bg-gray-800 text-white text-center p-4 mt-8">
      <p>&copy; حقوق النشر محفوظة للمستشار إبراهيم دخان 2025م</p>
    </footer>
  );

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800 flex flex-col">
      <header className="bg-emerald-600 text-white shadow-md p-4">
        <h1 className="text-2xl font-bold text-center">حاسبة السعرات الحرارية الذكية</h1>
      </header>
      <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8">
        {!userProfile ? (
          <ProfileSetup onSave={handleProfileSave} />
        ) : (
          <Dashboard
            userProfile={userProfile}
            dailyMeals={dailyMeals}
            addMeal={addMeal}
            dailyGoal={dailyGoal}
          />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
