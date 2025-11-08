import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/neon/client';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

/**
 * Get license key by email
 * Allows customers to retrieve their license anytime
 */
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email required' },
        { status: 400 }
      );
    }

    // Find license by user email
    const licenses = await sql`
      SELECT 
        l.key,
        l.status,
        l.plan_type,
        l.created_at,
        u.email
      FROM license_keys l
      JOIN users u ON u.id = l.user_id
      WHERE u.email = ${email.toLowerCase()}
        AND l.status = 'active'
      ORDER BY l.created_at DESC
      LIMIT 1
    `;

    if (licenses.length === 0) {
      return NextResponse.json(
        { error: 'No active license found for this email' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      license: licenses[0]
    });

  } catch (error) {
    console.error('Get license by email error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch license' },
      { status: 500 }
    );
  }
}

