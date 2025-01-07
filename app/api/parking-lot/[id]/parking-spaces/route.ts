import api from '@/lib/axiosApi';
import { ParkingSpacesRequestBody } from '@/lib/types/map/parking';
import { NextRequest, NextResponse } from 'next/server';
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		const reqBody = (await req.json()) as ParkingSpacesRequestBody;
		const id = (await params).id;
		if (!id) return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });

		const res = await api.ParkingSpaces._getParkingSpaces({
			...reqBody,
			parkingLotId: id
		});

		// console.log(res);
		// delay
		await new Promise((resolve) => setTimeout(resolve, 500));

		return NextResponse.json(res, { status: 201 });
	} catch (error) {
		return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
	}
}
