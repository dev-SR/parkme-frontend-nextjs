import { NextRequest, NextResponse } from 'next/server';
export async function POST(req: NextRequest) {
	try {
		const reqBody = (await req.json()) as any;
		console.log(reqBody);

		return NextResponse.json(reqBody, { status: 201 });
	} catch (error) {
		return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
	}
}
