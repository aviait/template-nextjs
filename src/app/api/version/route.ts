import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    name: process.env.APP_NAME ?? 'app',
    version: process.env.APP_VERSION ?? 'dev',
    env: process.env.NODE_ENV,
    commit: process.env.GIT_COMMIT_SHORT ?? null,
  });
}
