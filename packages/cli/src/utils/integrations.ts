export interface Integration {
  id: string;
  name: string;
  description: string;
  dependencies: string[];
  files: string[];
}

export function getAvailableIntegrations(): Integration[] {
  return [
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'Payment processing with webhooks and checkout',
      dependencies: ['stripe'],
      files: ['client.ts', 'webhooks.ts', 'checkout API route', 'webhook API route', 'config.ts'],
    },
    {
      id: 'clerk',
      name: 'Clerk',
      description: 'Authentication and user management',
      dependencies: ['@clerk/nextjs'],
      files: ['middleware.ts', 'provider setup', 'webhooks.ts', 'helpers.ts'],
    },
    {
      id: 'resend',
      name: 'Resend',
      description: 'Email sending with React Email templates',
      dependencies: ['resend', 'react-email', '@react-email/components'],
      files: ['client.ts', 'templates', 'send helpers'],
    },
    {
      id: 'liveblocks',
      name: 'Liveblocks',
      description: 'Real-time collaboration features',
      dependencies: ['@liveblocks/client', '@liveblocks/react'],
      files: ['provider.tsx', 'room setup', 'hooks', 'example component'],
    },
    {
      id: 'supabase',
      name: 'Supabase',
      description: 'Database and backend services',
      dependencies: ['@supabase/supabase-js'],
      files: ['client.ts', 'server.ts', 'auth helpers', 'types'],
    },
  ];
}

export function getIntegrationById(id: string): Integration | undefined {
  return getAvailableIntegrations().find(i => i.id === id);
}

