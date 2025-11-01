import { NextResponse } from 'next/server'
import { openai } from '@/lib/openai/client'

export async function POST(request: Request) {
  try {
    const { prompt, model = 'gpt-4-turbo-preview' } = await request.json()

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      )
    }

    const completion = await openai.chat.completions.create({
      model,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 1000,
    })

    return NextResponse.json({
      text: completion.choices[0]?.message?.content || '',
      usage: completion.usage,
    })
  } catch (error: any) {
    console.error('OpenAI API error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate completion' },
      { status: 500 }
    )
  }
}

