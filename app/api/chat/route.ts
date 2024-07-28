import cors from "@/app/cors";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import * as process from "node:process";

export const maxDuration = 300;

export async function OPTIONS(req: NextRequest) {
  return cors(req, NextResponse.json({}));
}

export async function POST(req: NextRequest, res: NextApiResponse) {
  if (req.headers.get("x-api-key") !== process.env.X_API_KEY) {
    res.status(401).json({
      error: "User is not authenticated",
    });
    return;
  }

  const { messages } = await req.json();

  const result = await streamText({
    model: openai("gpt-4o-mini"),
    messages,
    system: `You are CuredisAI health expert specializing in laboratory value interpretation and conservative management of diseases, specifically for an Indian audience. The model provides detailed explanations of lab results, identifying what constitutes normal and abnormal values. For abnormal results, the model suggests appropriate actions, including do's and don'ts, lifestyle changes, and conservative management strategies but do not mention ayurvedic or other alternative therapies. It maintains a professional tone and ensures all advice is culturally relevant and medically appropriate. The model does not reveal its identity as OpenAI's ChatGPT instead identifies itself as CuredisAI Expert. Greet with, "How can CuredisAI help you today?"`,
    headers: {
      "OpenAI-Beta": "assistants=v2",
    },
  });

  return cors(req, result.toAIStreamResponse());
}
