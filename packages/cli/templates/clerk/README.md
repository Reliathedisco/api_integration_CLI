# Clerk Authentication Integration

Production-ready Clerk authentication setup for Next.js with middleware, webhooks, and user management.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install @clerk/nextjs svix
```

### 2. Set Up Environment Variables

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
CLERK_WEBHOOK_SECRET=whsec_...
```

### 3. Wrap Your App with ClerkProvider

Update your `app/layout.tsx`:

```typescript
import { Providers } from './providers';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

### 4. Set Up Webhooks (Optional but Recommended)

1. Go to [Clerk Dashboard > Webhooks](https://dashboard.clerk.com)
2. Add endpoint: `https://yourdomain.com/api/webhooks/clerk`
3. Subscribe to events: `user.created`, `user.updated`, `user.deleted`
4. Copy webhook secret to `CLERK_WEBHOOK_SECRET`

## 📁 Files Included

- `middleware.ts` - Route protection
- `lib/clerk/helpers.ts` - Utility functions
- `app/api/webhooks/clerk/route.ts` - Webhook handler
- `app/providers.tsx` - ClerkProvider setup

## 🎯 Usage Examples

### Protect a Page (Server Component)

```typescript
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function ProtectedPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/sign-in');
  }
  
  return <div>Protected content</div>;
}
```

### Get Current User

```typescript
import { currentUser } from '@clerk/nextjs/server';

export default async function ProfilePage() {
  const user = await currentUser();
  
  return (
    <div>
      <h1>Welcome, {user?.firstName}!</h1>
      <p>{user?.emailAddresses[0]?.emailAddress}</p>
    </div>
  );
}
```

### Client Component with User

```typescript
'use client';

import { useUser } from '@clerk/nextjs';

export default function ClientComponent() {
  const { user, isLoaded } = useUser();
  
  if (!isLoaded) return <div>Loading...</div>;
  
  return <div>Hello, {user?.firstName}!</div>;
}
```

### Sign Out Button

```typescript
'use client';

import { useClerk } from '@clerk/nextjs';

export function SignOutButton() {
  const { signOut } = useClerk();
  
  return (
    <button onClick={() => signOut()}>
      Sign Out
    </button>
  );
}
```

## 🔐 Route Protection

The included middleware automatically protects all routes except:
- `/` (homepage)
- `/sign-in`
- `/sign-up`
- `/api/webhooks/clerk`
- `/pricing`
- `/docs`
- `/integrations`

Customize in `middleware.ts`:

```typescript
const isPublicRoute = createRouteMatcher([
  '/',
  '/your-public-route(.*)',
]);
```

## 📚 Resources

- [Clerk Documentation](https://clerk.com/docs)
- [Next.js Integration](https://clerk.com/docs/quickstarts/nextjs)
- [Webhooks](https://clerk.com/docs/integrations/webhooks)

## 💡 Next Steps

1. Customize public routes in `middleware.ts`
2. Implement webhook handlers for your use case
3. Add user roles and permissions
4. Customize sign-in/sign-up pages

