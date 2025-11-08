import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/neon/client';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

/**
 * Get license key by Stripe session ID
 * Called from dashboard after successful purchase
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID required' },
        { status: 400 }
      );
    }

    // Find purchase by Stripe session ID
    const purchases = await sql`
      SELECT 
        p.id,
        p.stripe_session_id,
        p.plan_type,
        p.amount,
        p.status,
        p.created_at,
        l.key as license_key,
        l.status as license_status,
        u.email
      FROM purchases p
      LEFT JOIN license_keys l ON l.purchase_id = p.id
      LEFT JOIN users u ON u.id = p.user_id
      WHERE p.stripe_session_id = ${sessionId}
      LIMIT 1
    `;

    if (purchases.length === 0) {
      return NextResponse.json(
        { error: 'Purchase not found. It may take a few moments to process.' },
        { status: 404 }
      );
    }

    const purchase = purchases[0];

    if (!purchase.license_key) {
      return NextResponse.json(
        { error: 'License key is being generated. Please refresh in a few seconds.' },
        { status: 202 }
      );
    }

    return NextResponse.json({
      license: {
        key: purchase.license_key,
        status: purchase.license_status,
        plan_type: purchase.plan_type,
        email: purchase.email,
        purchased_at: purchase.created_at
      }
    });

  } catch (error) {
    console.error('Get license error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch license' },
      { status: 500 }
    );
  }
}

