
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";
import { COMPLEX_INFO } from "../constants";

// Helper to get AI instance safely
const getAiInstance = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API Key not found in environment");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const sendChatMessage = async (
  history: ChatMessage[], 
  userMessage: string
): Promise<string> => {
  const ai = getAiInstance();
  if (!ai) return "Lo siento, no puedo conectar con el servicio de IA en este momento. Por favor verifica la configuración.";

  try {
    // Construct history for context
    const chatHistory = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));

    const systemInstruction = `Eres "SierrasIA", el conserje virtual exclusivo de "Posada de Nono" en Traslasierra. Tu misión es elevar la experiencia del huésped ofreciendo respuestas precisas, útiles y con conocimiento local profundo.

    **Tus Superpoderes:**
    1. **Experto Local:** Conoces Nono como la palma de tu mano. Recomienda lugares específicos, no genéricos.
       - *Comida:* "La Pulpería" (milanesas), "Rolf" (alemán), "El Gran Pez" (truchas).
       - *Paseos:* Museo Rocsen (clave ir con tiempo), Laberinto de Nono, Dique La Viña (atardeceres).
       - *Rio:* Balneario Los Remansos (profundo), Paso de las Tropas (paisaje).
    2. **Guía de la Posada:** Tienes los datos a mano.
       - WiFi: "${COMPLEX_INFO.wifiSSID}" / "${COMPLEX_INFO.wifiPass}"
       - Check-out: ${COMPLEX_INFO.checkoutTime}
       - Admin: ${COMPLEX_INFO.managerPhone}
       - Emergencias: ${COMPLEX_INFO.emergencyPhone}
    3. **Actualizado:** Usa la búsqueda de Google para eventos de hoy, clima actual, o horarios específicos si no los sabes.

    **Reglas de Respuesta:**
    - Sé cálido pero directo. No des rodeos.
    - Si sugieres un lugar, di por qué vale la pena.
    - Si te preguntan por servicios de la Posada, da la info exacta inmediatamente.
    - Usa emojis con moderación para ser amigable.
    - Prioriza siempre opciones en Nono y Traslasierra.
    `;

    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      history: chatHistory,
      config: {
        systemInstruction,
        tools: [{ googleSearch: {} }],
      },
    });

    const result = await chat.sendMessage({ message: userMessage });
    
    let responseText = result.text || "Lo siento, no pude encontrar esa información.";

    // Extract grounding chunks if available
    const chunks = result.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (chunks && chunks.length > 0) {
        const sources = chunks
            .map((c: any) => c.web ? `[${c.web.title}](${c.web.uri})` : null)
            .filter(Boolean);
        
        if (sources.length > 0) {
            const uniqueSources = [...new Set(sources)];
            responseText += "\n\n**Fuentes consultadas:**\n" + uniqueSources.map(s => `- ${s}`).join("\n");
        }
    }

    return responseText;
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "Tuve un problema técnico momentáneo. Por favor intenta de nuevo en unos segundos.";
  }
};

export const getSmartRecommendations = async (query: string, lat?: number, lng?: number): Promise<string> => {
   const ai = getAiInstance();
   if (!ai) return "Error de configuración de API.";

   try {
     const model = 'gemini-2.5-flash';
     
     // Use Google Maps grounding if location is available or generic search
     const tools = [{ googleMaps: {} }];
     const toolConfig = lat && lng ? {
       retrievalConfig: {
         latLng: {
           latitude: lat,
           longitude: lng
         }
       }
     } : undefined;

     const response = await ai.models.generateContent({
       model,
       contents: `Busca lugares en Nono y Traslasierra que coincidan con: "${query}". Prioriza lugares abiertos ahora y con buenas reseñas. Dame una lista breve con nombres y por qué ir.`,
       config: {
         tools,
         toolConfig
       }
     });
     
     // Extract grounding chunks if available
     const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
     let text = response.text || "";

     if (groundingChunks) {
        text += "\n\n**Lugares encontrados:**\n";
        groundingChunks.forEach((chunk: any) => {
            if (chunk.maps?.title && chunk.maps?.uri) {
                text += `- [${chunk.maps.title}](${chunk.maps.uri})\n`;
            }
        });
     }

     return text;

   } catch (error) {
     console.error("Recommendation Error:", error);
     return "Lo siento, no pude buscar recomendaciones en vivo en este momento.";
   }
}
