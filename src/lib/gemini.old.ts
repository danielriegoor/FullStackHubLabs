// src/lib/gemini.ts
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(
  process.env.API_KEY || '',
);

export async function generateDynamicContent(
  term: string,
  category: string,
) {
  const model =
    genAI.getGenerativeModel({
      model: 'gemini-2.5-flash-lite',
    });

  // Prompt focado no nicho do DotF4p.com
  const prompt = `Gere uma lista de 5 vídeos fictícios mas realistas para um hub de conteúdo adulto baseado no termo "${term}".
    Retorne APENAS um array JSON com os campos: 
    title (chamativo), 
    duration (no formato MM:SS, ex: 12:45), 
    views (ex: 1.2M), 
    thumbnail (use links de placeholder de imagem ou endereços de CDN conhecidos),
    source (ex: 'xHamster', 'FapHouse')`;

  const result =
    await model.generateContent(prompt);
  const response =
    await result.response;
  const text = response.text();

  try {
    return JSON.parse(text);
  } catch (e) {
    console.error(
      'Erro ao parsear resposta da IA:',
      e,
    );
    return [];
  }
}
