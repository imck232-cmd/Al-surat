
import React from 'react';
import { Meal } from '../types';

interface MealHistoryProps {
  meals: Meal[];
}

const MealHistory: React.FC<MealHistoryProps> = ({ meals }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg h-full">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">وجبات اليوم</h2>
      {meals.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">لم تسجل أي وجبات بعد.</p>
      ) : (
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
          {meals.slice().reverse().map(meal => (
            <div key={meal.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-800 capitalize">{meal.name}</h3>
                  <p className="text-xs text-gray-500">{new Date(meal.createdAt).toLocaleTimeString('ar-SA')}</p>
                </div>
                <p className="font-bold text-emerald-600">{meal.totalCalories} سعر</p>
              </div>
              <details className="mt-2">
                <summary className="text-sm text-blue-600 cursor-pointer">عرض التفاصيل</summary>
                <ul className="mt-2 text-sm text-gray-600 space-y-1">
                  {meal.foods.map(food => (
                    <li key={food.name} className="flex justify-between">
                      <span>{food.name} ({food.quantity_g}g)</span>
                      <span>{food.calories} سعر</span>
                    </li>
                  ))}
                </ul>
              </details>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MealHistory;
