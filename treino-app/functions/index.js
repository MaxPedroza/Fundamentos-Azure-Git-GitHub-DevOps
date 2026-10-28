import { GoogleGenAI } from '@google/genai'
import { defineSecret } from 'firebase-functions/params'
import { HttpsError, onCall } from 'firebase-functions/v2/https'

const geminiApiKey = defineSecret('GEMINI_API_KEY')
const maxImageLength = 7 * 1024 * 1024

function parseImage(image, mimeType) {
  if (!image && !mimeType) return undefined
  if (typeof image !== 'string' || typeof mimeType !== 'string') {
    throw new HttpsError('invalid-argument', 'A imagem enviada não é válida.')
  }
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(mimeType)) {
    throw new HttpsError('invalid-argument', 'Use uma imagem PNG, JPG ou WebP.')
  }
  const match = image.match(/^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/)
  if (!match || match[1] !== mimeType || match[2].length > maxImageLength) {
    throw new HttpsError('invalid-argument', 'A imagem está inválida ou excede o limite permitido.')
  }
  return { inlineData: { mimeType, data: match[2] } }
}

function validateWorkout(workout) {
  if (!workout || !Array.isArray(workout.exercises) || workout.exercises.length < 1 || workout.exercises.length > 30) {
    throw new HttpsError('internal', 'A IA não retornou uma ficha de treino válida.')
  }
  const exercises = workout.exercises.map((exercise) => ({
    name: String(exercise.name || 'Exercício').slice(0, 100),
    muscle: String(exercise.muscle || 'Geral').slice(0, 60),
    sets: Math.min(10, Math.max(1, Number(exercise.sets) || 3)),
    reps: String(exercise.reps || '8–12').slice(0, 30),
    load: String(exercise.load || 'A definir').slice(0, 40),
    rest: Math.min(600, Math.max(15, Number(exercise.rest) || 90)),
    note: String(exercise.note || '').slice(0, 160),
  }))
  const totalSets = exercises.reduce((total, exercise) => total + exercise.sets, 0)
  return {
    name: String(workout.name || 'Novo ciclo').slice(0, 80),
    focus: String(workout.focus || 'Ciclo evolutivo').slice(0, 100),
    level: String(workout.level || 'intermediário').slice(0, 30),
    durationWeeks: Math.min(12, Math.max(6, Math.round(Number(workout.durationWeeks) || 8))),
    weeklyVolume: Math.min(300, Math.max(1, Number(workout.weeklyVolume) || totalSets)),
    exercises,
  }
}

export const generateWorkout = onCall(
  {
    region: 'southamerica-east1',
    secrets: [geminiApiKey],
    timeoutSeconds: 120,
    memory: '512MiB',
    maxInstances: 3,
  },
  async (request) => {
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'Entre com sua conta para gerar um treino.')
    }

    const { prompt, image, mimeType } = request.data ?? {}
    if (typeof prompt !== 'string' || prompt.trim().length < 10 || prompt.length > 12000) {
      throw new HttpsError('invalid-argument', 'Informe o treino atual para análise.')
    }

    const imagePart = parseImage(image, mimeType)
    const parts = [{ text: prompt }]
    if (imagePart) parts.push(imagePart)

    try {
      const ai = new GoogleGenAI({ apiKey: geminiApiKey.value() })
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [{ role: 'user', parts }],
        config: {
          responseMimeType: 'application/json',
          systemInstruction: 'Você é um assistente de organização de treinos. Gere sugestões gerais de musculação, nunca faça diagnóstico, prescreva reabilitação ou afirme que um exercício é seguro para uma lesão. Considere desconfortos relatados evitando sugerir movimentos associados e recomende avaliação profissional para dores persistentes. Identifique o nível entre iniciante, intermediário e avançado e proponha um ciclo de 6 a 12 semanas. Retorne somente JSON com nome, foco, nível, duração em semanas e exercícios.',
        },
      })
      const workout = validateWorkout(JSON.parse(response.text))
      return { workout }
    } catch (error) {
      if (error instanceof HttpsError) throw error
      console.error('Workout generation failed')
      throw new HttpsError('internal', 'Não foi possível gerar um ciclo agora. Tente novamente.')
    }
  },
)
