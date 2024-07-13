import cors from "@/app/cors";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 30;

export async function OPTIONS(req: NextRequest) {
  return cors(req, NextResponse.json({}));
}

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai("gpt-3.5-turbo"),
    messages,
  });

  return cors(req, result.toAIStreamResponse());
}
