# Liveblocks Real-time Collaboration Integration

Production-ready Liveblocks setup for real-time collaboration features like cursors, presence, and shared state.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install @liveblocks/client @liveblocks/react @liveblocks/node
```

### 2. Set Up Environment Variables

```env
LIVEBLOCKS_SECRET_KEY=sk_...
```

Get your secret key from [Liveblocks Dashboard](https://liveblocks.io/dashboard).

### 3. Wrap Your Collaborative Component

```typescript
'use client';

import { RoomProvider } from '@/lib/liveblocks/client';
import { CollaborativeCursor } from '@/components/collaborative-cursor';

export default function Room() {
  return (
    <RoomProvider id="my-room-id" initialPresence={{ cursor: null, name: 'User' }}>
      <CollaborativeCursor />
    </RoomProvider>
  );
}
```

## 📁 Files Included

- `lib/liveblocks/client.ts` - Liveblocks client and React hooks
- `app/api/liveblocks/auth/route.ts` - Authentication endpoint
- `components/collaborative-cursor.tsx` - Example collaborative cursor component

## 🎯 Usage Examples

### Show User Presence

```typescript
'use client';

import { useOthers, useSelf } from '@/lib/liveblocks/client';

export function ActiveUsers() {
  const others = useOthers();
  const self = useSelf();

  return (
    <div>
      <p>You: {self.info.name}</p>
      <p>{others.length} other users online</p>
      {others.map((other) => (
        <div key={other.connectionId}>{other.info.name}</div>
      ))}
    </div>
  );
}
```

### Track Cursor Position

```typescript
const [myPresence, updateMyPresence] = useMyPresence();

<div onPointerMove={(e) => {
  updateMyPresence({ cursor: { x: e.clientX, y: e.clientY } });
}}>
  {/* Your content */}
</div>
```

### Use Storage (Shared State)

```typescript
'use client';

import { useStorage, useMutation } from '@/lib/liveblocks/client';

export function SharedCounter() {
  const count = useStorage((root) => root.count);
  
  const increment = useMutation(({ storage }) => {
    storage.set('count', storage.get('count') + 1);
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
```

## 🔧 Customization

### Define Your Types

Edit `lib/liveblocks/client.ts`:

```typescript
type Presence = {
  cursor: { x: number; y: number } | null;
  selectedId: string | null;
  // Add your presence fields
};

type Storage = {
  notes: LiveList<{ id: string; text: string }>;
  // Add your storage structure
};
```

### Integrate with Your Auth

Edit `app/api/liveblocks/auth/route.ts`:

```typescript
import { currentUser } from '@clerk/nextjs/server';

export async function POST(request: NextRequest) {
  const user = await currentUser();
  
  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const session = liveblocks.prepareSession(user.id, {
    userInfo: {
      name: user.firstName || 'Anonymous',
      avatar: user.imageUrl,
    },
  });

  // ... rest of the code
}
```

## 📚 Resources

- [Liveblocks Documentation](https://liveblocks.io/docs)
- [React Hooks Reference](https://liveblocks.io/docs/api-reference/liveblocks-react)
- [Examples](https://liveblocks.io/examples)

## 💡 Use Cases

- Collaborative text editors
- Real-time cursors
- User presence indicators
- Shared whiteboards
- Live commenting
- Multiplayer experiences

## 🐛 Troubleshooting

### Auth endpoint fails

- Check `LIVEBLOCKS_SECRET_KEY` is set
- Verify the auth endpoint URL is correct
- Check user authentication in the auth route

### Presence not updating

- Ensure component is wrapped with `RoomProvider`
- Check that `initialPresence` is provided
- Verify room ID is correct

