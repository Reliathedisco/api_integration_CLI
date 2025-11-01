export interface Integration {
  id: string
  name: string
  description: string
  category: 'payments' | 'auth' | 'email' | 'realtime' | 'ai' | 'database'
  dependencies: string[]
  devDependencies?: string[]
  envVars: string[]
  free: boolean
}

export const integrations: Integration[] = [
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Payment processing with webhooks',
    category: 'payments',
    dependencies: ['stripe'],
    devDependencies: [],
    envVars: [
      'STRIPE_SECRET_KEY',
      'STRIPE_WEBHOOK_SECRET',
      'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY'
    ],
    free: false
  },
  {
    id: 'clerk',
    name: 'Clerk',
    description: 'Authentication and user management',
    category: 'auth',
    dependencies: ['@clerk/nextjs'],
    devDependencies: [],
    envVars: [
      'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
      'CLERK_SECRET_KEY'
    ],
    free: false
  },
  {
    id: 'resend',
    name: 'Resend',
    description: 'Email sending with React Email',
    category: 'email',
    dependencies: ['resend', 'react-email', '@react-email/components'],
    devDependencies: [],
    envVars: ['RESEND_API_KEY'],
    free: true
  },
  {
    id: 'liveblocks',
    name: 'Liveblocks',
    description: 'Real-time collaboration',
    category: 'realtime',
    dependencies: ['@liveblocks/client', '@liveblocks/react', '@liveblocks/node'],
    devDependencies: [],
    envVars: [
      'LIVEBLOCKS_SECRET_KEY',
      'NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY'
    ],
    free: false
  },
  {
    id: 'supabase',
    name: 'Supabase',
    description: 'Database and authentication',
    category: 'database',
    dependencies: ['@supabase/supabase-js', '@supabase/ssr'],
    devDependencies: [],
    envVars: [
      'NEXT_PUBLIC_SUPABASE_URL',
      'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      'SUPABASE_SERVICE_ROLE_KEY'
    ],
    free: true
  },
  {
    id: 'openai',
    name: 'OpenAI',
    description: 'AI completions and embeddings',
    category: 'ai',
    dependencies: ['openai'],
    devDependencies: [],
    envVars: ['OPENAI_API_KEY'],
    free: false
  }
]

export function getIntegration(id: string): Integration | undefined {
  return integrations.find(i => i.id === id)
}

export function getFreeIntegrations(): Integration[] {
  return integrations.filter(i => i.free)
}

