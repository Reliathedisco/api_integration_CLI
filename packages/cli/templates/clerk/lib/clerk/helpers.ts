import { auth, currentUser } from '@clerk/nextjs/server';

/**
 * Get the current authenticated user
 * Returns null if not authenticated
 */
export async function getCurrentUser() {
  return await currentUser();
}

/**
 * Get the current user ID
 * Throws if not authenticated
 */
export async function requireAuth() {
  const { userId } = await auth();
  
  if (!userId) {
    throw new Error('Unauthorized');
  }
  
  return userId;
}

/**
 * Check if user has a specific role
 */
export async function hasRole(role: string): Promise<boolean> {
  const user = await currentUser();
  
  if (!user) return false;
  
  const userRole = user.publicMetadata?.role as string | undefined;
  return userRole === role;
}

/**
 * Update user metadata
 */
export async function updateUserMetadata(
  userId: string,
  metadata: Record<string, unknown>
) {
  // This should be done server-side using Clerk's backend API
  // Example implementation with fetch:
  const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;
  
  const response = await fetch(`https://api.clerk.com/v1/users/${userId}/metadata`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${CLERK_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      public_metadata: metadata,
    }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update user metadata');
  }
  
  return await response.json();
}

