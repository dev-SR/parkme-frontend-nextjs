import apiAuth from '@/lib/axiosAuthApi';
import { BackendError } from '@/lib/types/error/process-api-route-error';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	try {
		const res = await apiAuth.Auth._getCurrentUser();
		return NextResponse.json(res, { status: 200 });
	} catch (error) {
		const err = BackendError.process(error);
		return NextResponse.json(err, { status: err.status });
	}
}
