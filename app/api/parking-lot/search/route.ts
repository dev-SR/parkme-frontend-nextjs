import api from '@/lib/axiosApi';
import { DistrictGeocode } from '@/lib/geo-data/districts';
import { FindNeaByParkingLotsRequestBody } from '@/lib/types/map/search';
import { NextRequest, NextResponse } from 'next/server';
export async function POST(req: NextRequest) {
	try {
		const reqBody = (await req.json()) as FindNeaByParkingLotsRequestBody;
		// console.log(reqBody);

		// return NextResponse.json(DistrictGeocode, { status: 201 });
		const res = await api.ParkingLots._getNearbyParkingLots(reqBody);
		return NextResponse.json(res, { status: 201 });
	} catch (error) {
		return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
	}
}
