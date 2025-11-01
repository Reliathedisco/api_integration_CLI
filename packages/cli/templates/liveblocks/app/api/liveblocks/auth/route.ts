import { Liveblocks } from '@liveblocks/node';
import { NextRequest } from 'next/server';

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(request: NextRequest) {
  // Get the current user from your authentication system
  // This is a placeholder - replace with your actual auth
  const user = {
    id: 'user-123', // Replace with actual user ID from Clerk/your auth
    name: 'Anonymous',
  };

  // Create a session for the current user
  const session = liveblocks.prepareSession(user.id, {
    userInfo: {
      name: user.name,
    },
  });

  // Give the user access to the room
  const { room } = await request.json();
  
  if (room) {
    session.allow(room, session.FULL_ACCESS);
  }

  // Authorize the user and return the result
  const { status, body } = await session.authorize();
  
  return new Response(body, { status });
}

