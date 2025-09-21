
import React from 'react';

interface DailySummaryProps {
  goal: number;
  consumed: number;
}

const DailySummary: React.FC<DailySummaryProps> = ({ goal, consumed }) => {
  const remaining = Math.max(0, goal - consumed);
  const progress = goal > 0 ? Math.min((consumed / goal) * 100, 100) : 0;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">ملخص اليوم</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="bg-emerald-50 p-4 rounded-lg">
          <p className="text-sm text-emerald-700 font-semibold">الهدف اليومي</p>
          <p className="text-2xl font-bold text-emerald-800">{Math.round(goal)}</p>
          <p className="text-xs text-gray-500">سعر حراري</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-700 font-semibold">المستهلك</p>
          <p className="text-2xl font-bold text-blue-800">{Math.round(consumed)}</p>
          <p className="text-xs text-gray-500">سعر حراري</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <p className="text-sm text-orange-700 font-semibold">المتبقي</p>
          <p className="text-2xl font-bold text-orange-800">{Math.round(remaining)}</p>
          <p className="text-xs text-gray-500">سعر حراري</p>
        </div>
      </div>
      <div className="mt-6">
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-emerald-500 h-4 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-center mt-2 text-sm text-gray-600">{Math.round(progress)}% من هدفك اليومي</p>
      </div>
    </div>
  );
};

export default DailySummary;
