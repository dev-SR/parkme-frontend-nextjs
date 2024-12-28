import { getSession, updateTokens } from '@/lib/session';
import { Token } from '@/lib/types/auth/token';
import { LOGIN_PATH } from '@/routes';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
	const body = await req.json();
	const { accessToken } = body as Token;

	if (!accessToken) return NextResponse.json('Invalid token', { status: 500 });

	try {
		const session = await updateTokens({ accessToken });
		return NextResponse.json(session, { status: 200 });
	} catch (error) {
		return NextResponse.json(error, { status: 500 });
	}
}

export async function GET(request: NextRequest) {
	const session = await getSession();
	const action = new URL(request.url).searchParams.get('action');
	// /api//session?action=logout
	if (action === 'logout') {
		session.destroy();
		return redirect(LOGIN_PATH);
	}

	return NextResponse.json(session, { status: 200 });
}
