import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/neon/client';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

/**
 * Download endpoint for the DevFinder Chrome extension
 * Requires valid license key
 */
export async function GET(request: NextRequest) {
  try {
    // Get license key from query params
    const { searchParams } = new URL(request.url);
    const licenseKey = searchParams.get('license');

    if (!licenseKey) {
      return NextResponse.json(
        { error: 'License key required' },
        { status: 401 }
      );
    }

    // Verify license key in Neon database
    const licenses = await sql`
      SELECT * FROM license_keys 
      WHERE key = ${licenseKey} AND status = 'active'
      LIMIT 1
    `;

    if (licenses.length === 0) {
      return NextResponse.json(
        { error: 'Invalid or expired license key' },
        { status: 401 }
      );
    }

    const license = licenses[0];

    // Redirect to extension download
    return NextResponse.redirect('https://integrateapi.io/devfinder-extension.zip');

  } catch (error) {
    console.error('Extension download error:', error);
    return NextResponse.json(
      { error: 'Failed to download extension' },
      { status: 500 }
    );
  }
}

