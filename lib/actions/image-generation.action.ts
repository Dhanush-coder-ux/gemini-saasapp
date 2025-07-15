import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!)

export const generateWorksheetFromImage = async (base64Image: string, grade: string, topic: string) => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })

  const prompt = `You are an expert teacher. Generate a worksheet on the topic "${topic}" for a ${grade} grade student using the content in the image.`

  try {
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64Image,
        },
      },
    ])

    return result.response.text()
  } catch (error) {
    console.error("Gemini API error:", error)
    throw error
  }
}
  

