import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-10-28.acacia',
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { priceId } = body;

    console.log('📝 Checkout request received');
    console.log('Price ID:', priceId);
    console.log('Stripe Secret Key exists:', !!process.env.STRIPE_SECRET_KEY);
    console.log('Env PRO_MONTHLY:', process.env.STRIPE_PRO_MONTHLY_PRICE_ID);
    console.log('Env PRO_ONE_TIME:', process.env.STRIPE_PRO_ONE_TIME_PRICE_ID);

    // Validate priceId
    if (!priceId) {
      return NextResponse.json(
        { error: 'Price ID is required' },
        { status: 400 }
      );
    }

    // Get the origin for redirect URLs
    const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:4000';
    console.log('Origin:', origin);

    // Determine mode based on price ID
    const isSubscription = priceId === process.env.STRIPE_PRO_MONTHLY_PRICE_ID;
    console.log('Is subscription:', isSubscription);

    // Create Stripe checkout session
    console.log('Creating Stripe session...');
    const session = await stripe.checkout.sessions.create({
      mode: isSubscription ? 'subscription' : 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${origin}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing?canceled=true`,
      metadata: {
        priceId,
      },
      allow_promotion_codes: true,
    });

    console.log('✅ Session created:', session.id);
    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json(
      { error: 'Failed to create checkout session', details: errorMessage },
      { status: 500 }
    );
  }
}

