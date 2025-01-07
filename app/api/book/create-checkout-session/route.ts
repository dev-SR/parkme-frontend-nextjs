import api from '@/lib/axiosApi';
import authApi from '@/lib/axiosAuthApi';
import { CreateCheckoutSessionSchema } from '@/lib/schema';
import { BackendError } from '@/lib/types/error/process-api-route-error';
import { NextRequest, NextResponse } from 'next/server';
export async function POST(req: NextRequest) {
	const body = await req.json();
	try {
		const parsedBody = CreateCheckoutSessionSchema.parse(body);

		const res = await authApi.Book._createCheckoutSession(parsedBody);
		return NextResponse.json(res, { status: 200 });
	} catch (error) {
		const err = BackendError.process(error);
		return NextResponse.json(err, { status: err.status });
	}
}
