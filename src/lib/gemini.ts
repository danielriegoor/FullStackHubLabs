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
  thumbnail: string;
  externalUrl: string;
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
    term: string,
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

      const prompt = `Você é um Engenheiro de Dados especialista em curadoria de conteúdo Tech para o YouTube.
    Sua tarefa é sugerir vídeos REAIS e populares sobre o termo: "${term}".

    REGRAS OBRIGATÓRIAS:
    1. Baseie-se em vídeos que você sabe que existem (ex: canais como Fireship, Traversy Media, Rocketseat, etc).
    2. O 'externalUrl' deve ser o link direto do vídeo se você souber o ID (ex: https://www.youtube.com/watch?v=ID_DO_VIDEO).
    3. Se não souber o ID exato, gere uma URL de busca precisa: https://www.youtube.com/results?search_query=TITULO_DO_VIDEO.
    4. Para o 'thumbnail', use o padrão do YouTube: https://img.youtube.com/vi/ID_DO_VIDEO/maxresdefault.jpg.
    5. Se não tiver o ID, mantenha o placeholder de imagem tech de alta qualidade.

    RETORNE APENAS UM ARRAY JSON NO SEGUINTE FORMATO:
    [
      {
        "title": "Título exato do vídeo",
        "duration": "10:30",
        "views": "150K",
        "source": "YouTube",
        "thumbnail": "URL_DA_THUMBNAIL",
        "externalUrl": "URL_DO_VIDEO"
      }
    ]`;

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
                  thumbnail: {
                    type: SchemaType.STRING,
                  },
                  externalUrl: {
                    type: SchemaType.STRING,
                  },
                },
                required: [
                  'title',
                  'duration',
                  'views',
                  'source',
                  'publishedAt',
                  'thumbnail',
                  'externalUrl',
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
          thumbnail:
            item.thumbnail ||
            `https://picsum.photos/seed/${item.title.replace(/\s/g, '')}/400/225`,
          width: 400,
          height: 225,
          duration: item.duration,
          views: item.views,
          source: item.source,
          externalUrl: item.externalUrl,
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
