
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { FoodItem, UserProfile, Meal, MealAnalysis } from "../types";

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const parseJsonFromMarkdown = <T,>(markdownString: string): T | null => {
    const jsonRegex = /```json\s*([\s\S]*?)\s*```/;
    const match = markdownString.match(jsonRegex);
    if (match && match[1]) {
        try {
            return JSON.parse(match[1]);
        } catch (e) {
            console.error("Failed to parse JSON from markdown", e);
            return null;
        }
    }
    // Fallback for raw JSON string
    try {
        return JSON.parse(markdownString);
    } catch(e) {
        return null;
    }
};

export const analyzeMealWithAI = async (
  method: 'text' | 'image',
  data: string
): Promise<{ foods: FoodItem[] }> => {
  const model = 'gemini-2.5-flash';
  const prompt = `You are a nutrition expert. Analyze the provided ${method === 'text' ? 'text description' : 'image'} of a meal. Identify each food item, estimate its quantity in grams, and provide its nutritional information (calories, protein_g, carbs_g, fat_g). Respond ONLY with a JSON object inside a markdown block. The JSON object should follow this structure: { "foods": [{ "name": "...", "quantity_g": ..., "calories": ..., "protein_g": ..., "carbs_g": ..., "fat_g": ... }] }. If you cannot identify any food, return an empty "foods" array.`;

  let contents;
  if (method === 'text') {
    contents = { parts: [{ text: prompt }, { text: `Meal description: ${data}` }] };
  } else {
    // data is base64 string
    const imagePart = {
      inlineData: {
        mimeType: 'image/jpeg',
        data: data,
      },
    };
    contents = { parts: [{ text: prompt }, imagePart] };
  }

  const response: GenerateContentResponse = await ai.models.generateContent({ model, contents });
  
  const jsonResponse = parseJsonFromMarkdown<{ foods: FoodItem[] }>(response.text);

  if (!jsonResponse || !Array.isArray(jsonResponse.foods)) {
    throw new Error("فشل في تحليل الوجبة. الاستجابة من الذكاء الاصطناعي لم تكن بالتنسيق المتوقع.");
  }
  
  return jsonResponse;
};


export const getMealAnalysisFromAI = async (meal: Meal, profile: UserProfile): Promise<MealAnalysis> => {
    const model = 'gemini-2.5-flash';
    const mealDetails = meal.foods.map(f => `${f.name} (${f.quantity_g}g)`).join(', ');

    const prompt = `Based on the following user profile in Arabic:
    - العمر: ${profile.age}
    - الجنس: ${profile.gender === 'male' ? 'ذكر' : 'أنثى'}
    - الوزن: ${profile.weight} كجم
    - الطول: ${profile.height} سم
    - الهدف: ${profile.goal === 'lose' ? 'إنقاص الوزن' : profile.goal === 'maintain' ? 'الحفاظ على الوزن' : 'زيادة الوزن'}

    The user just consumed this meal: ${mealDetails}, which has a total of ${meal.totalCalories} calories.

    Provide a concise, encouraging, and helpful analysis in Arabic. Also, suggest 3 healthier alternatives. Respond ONLY with a JSON object inside a markdown block with this exact structure: { "analysis": "...", "alternatives": ["...", "...", "..."] }
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({ model, contents: prompt });
    
    const jsonResponse = parseJsonFromMarkdown<MealAnalysis>(response.text);

    if (!jsonResponse || !jsonResponse.analysis || !jsonResponse.alternatives) {
        throw new Error("فشل في الحصول على تحليل الوجبة. الاستجابة من الذكاء الاصطناعي لم تكن بالتنسيق المتوقع.");
    }

    return jsonResponse;
};
