# OpenAI Integration

Production-ready OpenAI integration with streaming support.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install openai ai
```

### 2. Get OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Create a new API key
3. Add it to `.env.local`:

```env
OPENAI_API_KEY=sk-...
```

## 📁 Files Included

- `lib/openai/client.ts` - OpenAI client instance
- `app/api/openai/chat/route.ts` - Streaming chat endpoint
- `app/api/openai/completion/route.ts` - Non-streaming completion endpoint
- `components/openai/chat.tsx` - Chat UI component

## 🎯 Usage Examples

### Chat Interface

```tsx
import { Chat } from '@/components/openai/chat'

export default function ChatPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">AI Chat</h1>
      <Chat />
    </div>
  )
}
```

### Simple Completion

```tsx
import { openai } from '@/lib/openai/client'

export async function generateText(prompt: string) {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  })

  return completion.choices[0]?.message?.content
}
```

### Function Calling

```tsx
import { openai } from '@/lib/openai/client'

const tools = [
  {
    type: 'function',
    function: {
      name: 'get_weather',
      description: 'Get the current weather in a location',
      parameters: {
        type: 'object',
        properties: {
          location: {
            type: 'string',
            description: 'The city and state, e.g. San Francisco, CA',
          },
        },
        required: ['location'],
      },
    },
  },
]

const response = await openai.chat.completions.create({
  model: 'gpt-4-turbo-preview',
  messages: [{ role: 'user', content: "What's the weather in Boston?" }],
  tools,
  tool_choice: 'auto',
})
```

### Generate Embeddings

```tsx
import { openai } from '@/lib/openai/client'

export async function generateEmbedding(text: string) {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
  })

  return response.data[0].embedding
}
```

### Generate Images (DALL-E)

```tsx
import { openai } from '@/lib/openai/client'

export async function generateImage(prompt: string) {
  const response = await openai.images.generate({
    model: 'dall-e-3',
    prompt,
    n: 1,
    size: '1024x1024',
  })

  return response.data[0].url
}
```

## 🤖 Available Models

- `gpt-4-turbo-preview` - Most capable, best for complex tasks
- `gpt-4` - High intelligence, slower
- `gpt-3.5-turbo` - Fast, good for simple tasks
- `dall-e-3` - Image generation
- `text-embedding-3-small` - Text embeddings

## 💰 Cost Management

- Set usage limits in OpenAI dashboard
- Track tokens in completion responses
- Use `gpt-3.5-turbo` for simple tasks to save costs
- Cache responses when possible

## 📚 Learn More

- [OpenAI Documentation](https://platform.openai.com/docs)
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference)
- [Vercel AI SDK](https://sdk.vercel.ai/docs)

## 🐛 Troubleshooting

### Rate limit errors

- Check your usage limits in OpenAI dashboard
- Implement exponential backoff for retries
- Consider upgrading your plan

### Invalid API key

- Verify key starts with `sk-`
- Check it's added to `.env.local`
- Restart your dev server after adding the key

