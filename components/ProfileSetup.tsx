
import React, { useState } from 'react';
import { UserProfile, Gender, ActivityLevel, Goal } from '../types';

interface ProfileSetupProps {
  onSave: (profile: UserProfile) => void;
}

const ProfileSetup: React.FC<ProfileSetupProps> = ({ onSave }) => {
  const [profile, setProfile] = useState<UserProfile>({
    age: 25,
    gender: Gender.Male,
    weight: 70,
    height: 175,
    activityLevel: ActivityLevel.LightlyActive,
    goal: Goal.MaintainWeight,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: name === 'age' || name === 'weight' || name === 'height' ? Number(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(profile);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg animate-fade-in">
      <h2 className="text-3xl font-bold text-emerald-700 mb-6 text-center">إعداد ملفك الشخصي</h2>
      <p className="text-center text-gray-600 mb-8">نحتاج بعض المعلومات الأساسية لتخصيص تجربتك.</p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">العمر</label>
            <input type="number" name="age" id="age" value={profile.age} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" required />
          </div>
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">الجنس</label>
            <select name="gender" id="gender" value={profile.gender} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500">
              <option value={Gender.Male}>ذكر</option>
              <option value={Gender.Female}>أنثى</option>
            </select>
          </div>
          <div>
            <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">الوزن (كجم)</label>
            <input type="number" name="weight" id="weight" value={profile.weight} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" required />
          </div>
          <div>
            <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">الطول (سم)</label>
            <input type="number" name="height" id="height" value={profile.height} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" required />
          </div>
        </div>
        <div>
          <label htmlFor="activityLevel" className="block text-sm font-medium text-gray-700 mb-1">مستوى النشاط البدني</label>
          <select name="activityLevel" id="activityLevel" value={profile.activityLevel} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500">
            <option value={ActivityLevel.Sedentary}>خامل (عمل مكتبي)</option>
            <option value={ActivityLevel.LightlyActive}>نشاط خفيف (تمارين 1-3 أيام/أسبوع)</option>
            <option value={ActivityLevel.ModeratelyActive}>نشاط متوسط (تمارين 3-5 أيام/أسبوع)</option>
            <option value={ActivityLevel.VeryActive}>نشاط عالٍ (تمارين 6-7 أيام/أسبوع)</option>
            <option value={ActivityLevel.ExtraActive}>نشاط عالٍ جداً (عمل بدني شاق)</option>
          </select>
        </div>
        <div>
          <label htmlFor="goal" className="block text-sm font-medium text-gray-700 mb-1">الهدف الصحي</label>
          <select name="goal" id="goal" value={profile.goal} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500">
            <option value={Goal.LoseWeight}>إنقاص الوزن</option>
            <option value={Goal.MaintainWeight}>الحفاظ على الوزن</option>
            <option value={Goal.GainWeight}>زيادة الوزن</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-emerald-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
          حفظ وبدء المتابعة
        </button>
      </form>
    </div>
  );
};

export default ProfileSetup;
