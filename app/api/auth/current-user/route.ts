import apiAuth from '@/lib/axiosAuthApi';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	const res = await apiAuth.Auth._getCurrentUser();
	return NextResponse.json(res, { status: 200 });
}
