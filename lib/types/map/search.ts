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
