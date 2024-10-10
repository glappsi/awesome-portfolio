import { incrementPageViewsForSlug } from '@/actions';
import { NextRequest, NextResponse } from 'next/server';

// export const config = {
//   runtime: 'edge',
// };

export async function POST(req: NextRequest): Promise<NextResponse> {
  if (req.headers.get('Content-Type') !== 'application/json') {
    return new NextResponse('must be json', { status: 400 });
  }

  const body = await req.json();
  let slug: string | undefined = undefined;
  if ('slug' in body) {
    slug = body.slug;
  }
  if (!slug) {
    return new NextResponse('Slug not found', { status: 400 });
  }
  const ip = req.headers.get('X-Forwarded-For') || req.headers.get('x-real-ip');
  await incrementPageViewsForSlug(slug, ip);
  return new NextResponse(null, { status: 202 });
}
