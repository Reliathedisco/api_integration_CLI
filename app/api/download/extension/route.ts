import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import archiver from 'archiver';
import { Readable } from 'stream';

/**
 * Download endpoint for the DevFinder Chrome extension
 * Requires valid license key
 */
export async function GET(request: NextRequest) {
  try {
    // Get license key from query params
    const searchParams = request.nextUrl.searchParams;
    const licenseKey = searchParams.get('license');

    if (!licenseKey) {
      return NextResponse.json(
        { error: 'License key required' },
        { status: 401 }
      );
    }

    // Verify license key in database
    const supabase = await createClient();
    const { data: license, error } = await supabase
      .from('license_keys')
      .select('*')
      .eq('key', licenseKey)
      .eq('status', 'active')
      .single();

    if (error || !license) {
      return NextResponse.json(
        { error: 'Invalid or expired license key' },
        { status: 401 }
      );
    }

    // TODO: Create ZIP of extension files and return
    // For now, return success
    return NextResponse.json({
      message: 'Extension download will be available here',
      license: {
        plan: license.plan_type,
        status: license.status
      }
    });

  } catch (error) {
    console.error('Extension download error:', error);
    return NextResponse.json(
      { error: 'Failed to download extension' },
      { status: 500 }
    );
  }
}

