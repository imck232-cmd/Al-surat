
import React, { useState, useRef } from 'react';
import { CameraIcon, PencilSquareIcon } from './Icons';
import { fileToBase64 } from '../utils/fileUtils';

interface MealLoggerProps {
  onLogMeal: (method: 'text' | 'image', data: string) => void;
  isLoading: boolean;
}

const MealLogger: React.FC<MealLoggerProps> = ({ onLogMeal, isLoading }) => {
  const [activeTab, setActiveTab] = useState<'text' | 'image'>('text');
  const [textInput, setTextInput] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      const base64 = await fileToBase64(file);
      setImageData(base64);
    }
  };

  const handleLog = () => {
    if (activeTab === 'text' && textInput.trim()) {
      onLogMeal('text', textInput);
      setTextInput('');
    } else if (activeTab === 'image' && imageData) {
      onLogMeal('image', imageData);
      setImagePreview(null);
      setImageData(null);
      if(fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">إضافة وجبة جديدة</h2>
      <div className="flex border-b border-gray-200 mb-4">
        <button
          onClick={() => setActiveTab('text')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors duration-200 ${activeTab === 'text' ? 'border-b-2 border-emerald-500 text-emerald-600' : 'text-gray-500 hover:text-emerald-500'}`}
        >
          <PencilSquareIcon />
          إدخال نصي
        </button>
        <button
          onClick={() => setActiveTab('image')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors duration-200 ${activeTab === 'image' ? 'border-b-2 border-emerald-500 text-emerald-600' : 'text-gray-500 hover:text-emerald-500'}`}
        >
          <CameraIcon />
          تحليل صورة
        </button>
      </div>

      {activeTab === 'text' ? (
        <div className="space-y-4">
          <textarea
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="مثال: صحن شوفان مع التوت الأزرق والمكسرات"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 h-24"
            disabled={isLoading}
          />
        </div>
      ) : (
        <div className="space-y-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            ref={fileInputRef}
            disabled={isLoading}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
            className="w-full flex justify-center items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-emerald-500 transition-colors duration-200"
          >
            <CameraIcon />
            {imagePreview ? 'تغيير الصورة' : 'اختر صورة لوجبتك'}
          </button>
          {imagePreview && (
            <div className="mt-4 flex justify-center">
              <img src={imagePreview} alt="معاينة الوجبة" className="rounded-lg max-h-48" />
            </div>
          )}
        </div>
      )}
      <button
        onClick={handleLog}
        disabled={isLoading || (activeTab === 'text' && !textInput.trim()) || (activeTab === 'image' && !imageData)}
        className="mt-4 w-full bg-emerald-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-emerald-700 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        ) : 'تحليل وحفظ الوجبة'}
      </button>
    </div>
  );
};

export default MealLogger;
