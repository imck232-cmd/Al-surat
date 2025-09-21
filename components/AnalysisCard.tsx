
import React from 'react';
import { MealAnalysis } from '../types';
import { LightBulbIcon, SparklesIcon } from './Icons';

interface AnalysisCardProps {
  analysis: MealAnalysis;
}

const AnalysisCard: React.FC<AnalysisCardProps> = ({ analysis }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg animate-fade-in space-y-6">
      <div>
        <h3 className="flex items-center gap-2 text-xl font-bold text-gray-700 mb-3">
          <SparklesIcon />
          تحليل ذكي لوجبتك
        </h3>
        <p className="text-gray-600 leading-relaxed">{analysis.analysis}</p>
      </div>
      {analysis.alternatives && analysis.alternatives.length > 0 && (
        <div>
          <h3 className="flex items-center gap-2 text-xl font-bold text-gray-700 mb-3">
            <LightBulbIcon />
            اقتراحات وبدائل صحية
          </h3>
          <ul className="space-y-2 list-disc list-inside text-gray-600">
            {analysis.alternatives.map((alt, index) => (
              <li key={index}>{alt}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AnalysisCard;
