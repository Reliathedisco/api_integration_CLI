# Supabase Integration

Production-ready Supabase integration for Next.js with authentication, database, and server-side rendering support.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install @supabase/supabase-js @supabase/ssr
```

### 2. Set Up Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc... # Optional, for admin operations
```

Get these from your [Supabase Dashboard](https://supabase.com/dashboard) > Project Settings > API.

### 3. Set Up Database

Run this SQL in your Supabase SQL Editor to create an example table:

```sql
create table public.todos (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  title text not null,
  completed boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.todos enable row level security;

-- Create policies
create policy "Users can view their own todos"
  on public.todos for select
  using (auth.uid() = user_id);

create policy "Users can create their own todos"
  on public.todos for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own todos"
  on public.todos for update
  using (auth.uid() = user_id);

create policy "Users can delete their own todos"
  on public.todos for delete
  using (auth.uid() = user_id);
```

## 📁 Files Included

- `lib/supabase/client.ts` - Browser client for client components
- `lib/supabase/server.ts` - Server client for server components
- `lib/supabase/middleware.ts` - Middleware for session management

## 🎯 Usage Examples

### Client Component (Browser)

```typescript
'use client';

import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';

export function Todos() {
  const [todos, setTodos] = useState<any[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchTodos = async () => {
      const { data } = await supabase.from('todos').select('*');
      setTodos(data || []);
    };

    fetchTodos();
  }, []);

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}
```

### Server Component

```typescript
import { createClient } from '@/lib/supabase/server';

export default async function TodosPage() {
  const supabase = await createClient();
  const { data: todos } = await supabase.from('todos').select('*');

  return (
    <ul>
      {todos?.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}
```

### Server Action

```typescript
'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function createTodo(formData: FormData) {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('Not authenticated');
  }

  const title = formData.get('title') as string;

  await supabase.from('todos').insert({
    title,
    user_id: user.id,
  });

  revalidatePath('/todos');
}
```

### Real-time Subscriptions

```typescript
'use client';

import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';

export function RealtimeTodos() {
  const [todos, setTodos] = useState<any[]>([]);
  const supabase = createClient();

  useEffect(() => {
    // Fetch initial data
    supabase.from('todos').select('*').then(({ data }) => {
      setTodos(data || []);
    });

    // Subscribe to changes
    const channel = supabase
      .channel('todos')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'todos' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setTodos((current) => [...current, payload.new]);
          } else if (payload.eventType === 'DELETE') {
            setTodos((current) =>
              current.filter((todo) => todo.id !== payload.old.id)
            );
          } else if (payload.eventType === 'UPDATE') {
            setTodos((current) =>
              current.map((todo) =>
                todo.id === payload.new.id ? payload.new : todo
              )
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return <ul>{/* Render todos */}</ul>;
}
```

### Authentication

```typescript
// Sign Up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password',
});

// Sign In
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password',
});

// Sign Out
await supabase.auth.signOut();

// Get Current User
const { data: { user } } = await supabase.auth.getUser();
```

## 🔧 Type Generation

Generate TypeScript types from your database:

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Generate types
supabase gen types typescript --project-id your-project-id > lib/supabase/types.ts
```

Then use them:

```typescript
import { Database } from '@/lib/supabase/types';

const supabase = createClient<Database>();
```

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Guide](https://supabase.com/docs/guides/auth/server-side/nextjs)
- [Database Functions](https://supabase.com/docs/guides/database)
- [Real-time](https://supabase.com/docs/guides/realtime)

## 💡 Next Steps

1. Set up your database schema
2. Configure Row Level Security policies
3. Generate TypeScript types
4. Implement authentication flows
5. Add real-time features

