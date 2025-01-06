import { getSession } from '@/lib/session';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	const session = await getSession();
	session.destroy();

	console.log('Session destroyed');

	return NextResponse.json({ status: 200 });
}
