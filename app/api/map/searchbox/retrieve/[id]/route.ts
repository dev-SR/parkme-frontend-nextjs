import mapApi from '@/lib/mapboxApi';
import { NextRequest, NextResponse } from 'next/server';
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const id = (await params).id;
	if (!id) return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
	const res = await mapApi.Search._retrieveGeocode(id);
	if (res.features.length === 0)
		return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
	const geocode = res.features[0].properties.coordinates;
	// console.log(geocode);

	return NextResponse.json(geocode);

	// return NextResponse.json({
	// 	longitude: 90.42,
	// 	latitude: 23.739
	// });
}
