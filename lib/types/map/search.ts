import { FilterLocationFormSchemaType } from '@/lib/schema';

export type SearchBoxSuggestions = {
	mapbox_id: string; //'dXJuOm1ieHBsYzpCQW9V';
	name: string; //'Dhaka Kotwali Thana';
	place_formatted: string; //'Dhaka, Dhaka District, Dhaka, Bangladesh';
	feature_type: string; //'locality';
};
export type SearchBoxSuggestionsResponse = {
	suggestions: SearchBoxSuggestions[];
};

export type GeoCodeResponse = {
	latitude: number;
	longitude: number;
};

export type GeoCodeRetrieveResponse = {
	type: string;
	features: {
		properties: {
			coordinates: GeoCodeResponse;
		};
	}[];
};

export type FindNeaByParkingLotsRequestBody = {
	bounds: {
		neLat: number;
		neLng: number;
		swLat: number;
		swLng: number;
	};
	vehicleTypes: string[];
	pricePerHourRange: number[];
};

export type ParkingSpaces = {
	id: string;
	sectionName: string;
	vehicleType: string;
	pricePerHour: number;
};

export type ParkingLotsDto = {
	id: string;
	name: string;
	address: string;
	latitude: number;
	longitude: number;
	parkingSpaces: ParkingSpaces[];
};

export type FindNeaByParkingLotsResponse = ParkingLotsDto[];
