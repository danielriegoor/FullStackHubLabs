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
          model:
            'gemini-3-flash-preview', // Versão estável recomendada
        });

      const prompt = `Você é um Engenheiro de Dados especialista em curadoria de conteúdo Adylto.
    Sua tarefa é sugerir vídeos REAIS e populares sobre o termo: "${term}".

    REGRAS OBRIGATÓRIAS:
    1. Baseie-se em vídeos que você sabe que existem (ex: https://xhamster.com, https://mobvid.com, https://faphouse.com, https://www.camsoda.com).
    2. O 'externalUrl' deve ser o link direto do vídeo se você souber o ID (ex: https://www.camsoda.com/porn/video/big_tit_blonde_milf_stepmom_fucks_step_son_during_movie_time).
    3. Se não souber o ID exato, gere uma URL de busca precisa: https://faphouse.com/pt/search/videos?q=ID_DO_VIDEO.
    4. Para o 'thumbnail', use o padrão dos sites citados na regra 1 e outros que você encontrar através do SEO: https://ic-nss.flixcdn.com/a/*.jpg || *.png.
    5. Se não tiver o ID, mantenha o placeholder de imagem de adult content de alta qualidade.
    6. NÃO gere o campo thumbnail.

    RETORNE APENAS UM ARRAY JSON NO SEGUINTE FORMATO:
    [
      {
        "title": "Título exato do vídeo",
        "duration": "10:30",
        "views": "150K",
        "source": "",
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
            '/sex_default_thumb.png',
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
