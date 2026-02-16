import {
  GoogleGenerativeAI,
  SchemaType,
} from '@google/generative-ai';
import { VideoItem } from '@/models';

interface GeneratedVideoData {
  title: string;
  duration: string;
  views: string;
  source: string;
  publishedAt: string;
}

// Inicialização segura: Só instancia se a chave existir
const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenerativeAI(apiKey);
};

export const generateDynamicContent =
  async (
    category: string,
  ): Promise<VideoItem[]> => {
    const genAI = getAiClient();

    if (!genAI) {
      console.warn(
        'Google Gemini API Key não encontrada em process.env.API_KEY',
      );
      return [];
    }

    try {
      const model =
        genAI.getGenerativeModel({
          model: 'gemini-2.5-flash', // Versão estável recomendada
        });

      const prompt = `Generate a list of 8 realistic video titles, durations, mock view counts, and source website names for the category: "${category}". 
    The content should be safe for work (SFW), interesting, and engaging. 
    Return the data as a JSON array.`;

      const result =
        await model.generateContent({
          contents: [
            {
              role: 'user',
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            responseMimeType:
              'application/json',
            responseSchema: {
              type: SchemaType.ARRAY,
              items: {
                type: SchemaType.OBJECT,
                properties: {
                  title: {
                    type: SchemaType.STRING,
                  },
                  duration: {
                    type: SchemaType.STRING,
                  },
                  views: {
                    type: SchemaType.STRING,
                  },
                  source: {
                    type: SchemaType.STRING,
                  },
                  publishedAt: {
                    type: SchemaType.STRING,
                  },
                },
                required: [
                  'title',
                  'duration',
                  'views',
                  'source',
                  'publishedAt',
                ],
              },
            },
          },
        });

      const responseText =
        result.response.text();
      const generatedData = JSON.parse(
        responseText || '[]',
      );

      return generatedData.map(
        (
          item: GeneratedVideoData,
          index: number,
        ) => ({
          id: `ai-${category}-${Date.now()}-${index}`,
          title: item.title,
          thumbnail: `https://picsum.photos/seed/${item.title.replace(/\s/g, '')}/400/225`,
          width: 400,
          height: 225,
          duration: item.duration,
          views: item.views,
          source: item.source,
          publishedAt: item.publishedAt,
          category: category,
          isAiGenerated: true,
        }),
      );
    } catch (error) {
      console.error(
        'Gemini generation failed:',
        error,
      );
      return [];
    }
  };
