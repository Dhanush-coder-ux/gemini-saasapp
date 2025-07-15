import { GoogleGenerativeAI } from "@google/generative-ai";

const genai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const processImage = async (base64Image: string, gradeLevel: string) => {
  const model = genai.getGenerativeModel({ model: "gemini-1.5-pro" });

  const prompt = `Analyze this textbook content and create a worksheet appropriate for ${gradeLevel}.`;

  const result = await model.generateContent([
    prompt,
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: base64Image,
      },
    },
  ]);

  const response = await result.response;
  return response.text();
}