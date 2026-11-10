import { NextResponse } from 'next/server';
import mockData from '@/data/links.json';
import { ProfileApiResponse } from '@/types/profile';

// GET /api/profile
export async function GET() {
  const responseData: ProfileApiResponse = {
    success: true,
    data: mockData as ProfileApiResponse['data'],
  };

  return NextResponse.json(responseData, {
    status: 200,
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}

// POST /api/profile/click (링크 클릭수 증가 Mock)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { linkId } = body;

    return NextResponse.json({
      success: true,
      message: `Link click counted for ${linkId}`,
      timestamp: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid payload' },
      { status: 400 }
    );
  }
}
