import { LoginSchema } from '@/lib/schema';
import { NextRequest, NextResponse } from 'next/server';
import { BackendError } from '@/lib/types/error/process-api-route-error';
import { getSession } from '@/lib/session';
import api from '@/lib/axiosApi';

export async function POST(request: NextRequest) {
	const body = await request.json();
	try {
		const parsedBody = LoginSchema.parse(body);

		const res = await api.Auth._login(parsedBody);

		const session = await getSession();
		// If user visits for the first time session returns an empty object.
		session.accessToken = res.accessToken;
		session.refreshToken = res.refreshToken;
		session.user = res.user;
		await session.save();

		return NextResponse.json(res, { status: 200 });
	} catch (error) {
		const err = BackendError.process(error);
		return NextResponse.json(err, { status: err.status });
	}
}
