// src/app/api/chat/route.ts
import {hiteshSystemPrompt } from '@/constants/system-prompts';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { message, history, model = 'gpt-4o-mini' } = await request.json(); // Now accept history and model

    const messages = [
      { role: 'system', content: hiteshSystemPrompt }, // Use the system prompt for Hitesh
      ...history.map((msg: { role: string; content: string }) => ({ role: msg.role, content: msg.content })),
      { role: 'user', content: message },
    ];
  
    const response = await openai.chat.completions.create({
      model: model, // Use the selected model
      messages,
      max_tokens: 300, // Increased for more detailed responses
      temperature: 0.7,
    });

    const reply = response.choices[0].message.content;

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}