import OpenAI from "openai";
import type { ChatCompletion } from "openai/resources/chat/completions";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const MODEL = "gpt-4o";

export async function createOpenAIClient(apiKey: string): Promise<OpenAI> {
  return new OpenAI({ apiKey });
}

export async function getExpertResponse(
  openai: OpenAI,
  systemPrompt: string,
  userPrompt: string
): Promise<ChatCompletion> {
  return await openai.chat.completions.create({
    model: MODEL,
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: userPrompt,
      },
    ],
    response_format: { type: "json_object" },
  });
}
