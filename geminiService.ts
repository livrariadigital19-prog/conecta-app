
import { GoogleGenAI, Type } from "@google/genai";
import { CategoryID, Question } from "./types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async generateMoreQuestions(categoryId: CategoryID, currentQuestions: string[]): Promise<Partial<Question>[]> {
    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Gere 10 novas perguntas criativas para a categoria "${categoryId}". 
        Evite estas perguntas que já existem: ${currentQuestions.slice(0, 10).join(", ")}.
        As perguntas devem ser instigantes e em português brasileiro.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                text: { type: Type.STRING, description: "O texto da pergunta de destrava conversas" },
              },
              required: ["text"]
            }
          }
        }
      });

      const json = JSON.parse(response.text);
      return json.map((q: any) => ({
        id: `gen-${Math.random().toString(36).substr(2, 9)}`,
        text: q.text,
        category: categoryId,
        isCustom: true
      }));
    } catch (error) {
      console.error("Error generating questions:", error);
      return [];
    }
  }

  async generateDailyTip(): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "Gere uma 'Dica de Especialista' curta (máximo 100 caracteres) sobre como melhorar conversas, criar conexões reais ou ser mais carismático. Seja inspirador e direto. Responda apenas com a frase.",
      });
      return response.text.trim().replace(/^"|"$/g, '');
    } catch (error) {
      console.error("Error generating daily tip:", error);
      return "As perguntas mais simples abrem as portas mais profundas.";
    }
  }
}

export const geminiService = new GeminiService();
