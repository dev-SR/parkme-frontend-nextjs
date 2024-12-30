import api from '@/lib/axiosApi';
import mapApi from '@/lib/mapboxApi';
import { NextRequest, NextResponse } from 'next/server';
export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const query = searchParams.get('searchInput');

	if (!query) return NextResponse.json([]);

	// const res = await mapApi.Search._getSuggestions(query);
	// const suggestions = res.suggestions;
	// if (!suggestions) return NextResponse.json([]);

	// const data = suggestions.map((suggestion) => ({
	// 	mapbox_id: suggestion.mapbox_id,
	// 	name: suggestion.name,
	// 	place_formatted: suggestion.place_formatted,
	// 	feature_type: suggestion.feature_type
	// }));

	// console.log(data);

	return NextResponse.json([
		{
			mapbox_id: 'dXJuOm1ieHBsYzpaQlE',
			name: 'Dhaka',
			place_formatted: 'Bangladesh',
			feature_type: 'region'
		},
		{
			mapbox_id: 'dXJuOm1ieHBsYzpFRWdV',
			name: 'Dhaka',
			place_formatted: 'Dhaka, Bangladesh',
			feature_type: 'place'
		},
		{
			mapbox_id: 'dXJuOm1ieHBsYzpBcVlV',
			name: 'Dhaka District',
			place_formatted: 'Dhaka, Bangladesh',
			feature_type: 'district'
		},
		{
			mapbox_id: 'dXJuOm1ieHBsYzpCQW9V',
			name: 'Dhaka Kotwali Thana',
			place_formatted: 'Dhaka, Dhaka District, Dhaka, Bangladesh',
			feature_type: 'locality'
		},
		{
			mapbox_id: 'dXJuOm1ieHBsYzpNS2dV',
			name: 'Dhaka-Sylhet highway road passes through Raipura Upzilla.',
			place_formatted: 'Dhaka, Bangladesh',
			feature_type: 'place'
		}
	]);
}
