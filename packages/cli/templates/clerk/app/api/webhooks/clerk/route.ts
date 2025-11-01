import { NextRequest, NextResponse } from 'next/server';
import { Webhook } from 'svix';

/**
 * Clerk Webhook Handler
 * 
 * This endpoint receives events from Clerk when users are created, updated, or deleted.
 * 
 * Setup:
 * 1. Go to Clerk Dashboard > Webhooks
 * 2. Add endpoint: https://yourdomain.com/api/webhooks/clerk
 * 3. Subscribe to events: user.created, user.updated, user.deleted
 * 4. Copy the signing secret to CLERK_WEBHOOK_SECRET
 */
export async function POST(request: NextRequest) {
  try {
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

    if (!webhookSecret) {
      throw new Error('CLERK_WEBHOOK_SECRET is not defined');
    }

    // Get the headers
    const svix_id = request.headers.get('svix-id');
    const svix_timestamp = request.headers.get('svix-timestamp');
    const svix_signature = request.headers.get('svix-signature');

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return NextResponse.json(
        { error: 'Missing svix headers' },
        { status: 400 }
      );
    }

    // Get the body
    const body = await request.text();

    // Create a new Svix instance with your secret
    const wh = new Webhook(webhookSecret);

    let evt: any;

    // Verify the webhook
    try {
      evt = wh.verify(body, {
        'svix-id': svix_id,
        'svix-timestamp': svix_timestamp,
        'svix-signature': svix_signature,
      });
    } catch (err) {
      console.error('Error verifying webhook:', err);
      return NextResponse.json(
        { error: 'Webhook verification failed' },
        { status: 400 }
      );
    }

    // Handle the webhook
    const eventType = evt.type;
    console.log(`Received Clerk webhook: ${eventType}`);

    switch (eventType) {
      case 'user.created':
        await handleUserCreated(evt.data);
        break;
      
      case 'user.updated':
        await handleUserUpdated(evt.data);
        break;
      
      case 'user.deleted':
        await handleUserDeleted(evt.data);
        break;
      
      default:
        console.log(`Unhandled event type: ${eventType}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing Clerk webhook:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json(
      { error: 'Webhook processing failed', details: errorMessage },
      { status: 500 }
    );
  }
}

async function handleUserCreated(data: any) {
  console.log('User created:', data.id);
  
  // TODO: Implement your logic
  // Example: Create user record in your database
  // await db.user.create({
  //   data: {
  //     clerkId: data.id,
  //     email: data.email_addresses[0]?.email_address,
  //     firstName: data.first_name,
  //     lastName: data.last_name,
  //   },
  // });
}

async function handleUserUpdated(data: any) {
  console.log('User updated:', data.id);
  
  // TODO: Update user record in your database
}

async function handleUserDeleted(data: any) {
  console.log('User deleted:', data.id);
  
  // TODO: Delete or soft-delete user record in your database
}

