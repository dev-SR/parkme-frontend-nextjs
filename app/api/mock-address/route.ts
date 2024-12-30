import { NextRequest, NextResponse } from 'next/server';

const cities = [
	{ label: 'Dhaka', value: 'dhaka' },
	{ label: 'Dhanmondi', value: 'dhanmondi' },
	{ label: 'Dholesshori', value: 'dholesshori' },
	{ label: 'Khulna', value: 'khulna' },
	{ label: 'Kushtia', value: 'kushtia' },
	{ label: 'Rajshahi', value: 'rajshahi' },
	{ label: 'Rangpur', value: 'rangpur' },
	{ label: 'Rajbari', value: 'rajbari' }
] as const;
export async function GET(request: NextRequest) {
	// delay
	await new Promise((resolve) => setTimeout(resolve, 4000));

	const searchParams = request.nextUrl.searchParams;
	const query = searchParams.get('searchInput');

	if (!query) return NextResponse.json(cities);

	const filteredCities = cities.filter((city) =>
		city.label.toLowerCase().includes(query.toLowerCase())
	);

	return NextResponse.json(filteredCities);
}
