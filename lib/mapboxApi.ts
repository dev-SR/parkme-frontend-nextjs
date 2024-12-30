import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import {
	GeoCodeResponse,
	GeoCodeRetrieveResponse,
	SearchBoxSuggestions,
	SearchBoxSuggestionsResponse
} from './types/map/search';

const mapClient = axios.create({
	baseURL: 'https://api.mapbox.com',
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'Application/json'
	}
});

const toMapBox = {
	get: async <T>(url: string, params?: URLSearchParams): Promise<T> => {
		const response = await mapClient.get<T>(url, { params });
		return response.data;
	},
	post: async <T>(url: string, body: {}): Promise<T> => {
		const response = await mapClient.post<T>(url, body);
		return response.data;
	},
	put: async <T>(url: string, body: {}): Promise<T> => {
		const response = await mapClient.put<T>(url, body);
		return response.data;
	},
	del: async <T>(url: string): Promise<T> => {
		const response = await mapClient.delete<T>(url);
		return response.data;
	}
};
const axiosBaseToApi = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_URL,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'Application/json'
	}
});
const toApiRoute = {
	get: async <T>(url: string, params?: URLSearchParams): Promise<T> => {
		const response = await axiosBaseToApi.get<T>(url, { params });
		return response.data;
	},
	post: async <T>(url: string, body: {}): Promise<T> => {
		const response = await axiosBaseToApi.post<T>(url, body);
		return response.data;
	},
	put: async <T>(url: string, body: {}): Promise<T> => {
		const response = await axiosBaseToApi.put<T>(url, body);
		return response.data;
	},
	del: async <T>(url: string): Promise<T> => {
		const response = await axiosBaseToApi.delete<T>(url);
		return response.data;
	}
};
const Search = {
	getSuggestions: (q: string) =>
		toApiRoute.get<SearchBoxSuggestions[]>(`/api/map/searchbox/suggestions?searchInput=${q}`),
	_getSuggestions: (q: string) => {
		// const uuid  = uuidv4();
		const uuid = process.env.NEXT_PUBLIC_MAPBOX_USE_SAME_SESSION;
		return toMapBox.get<SearchBoxSuggestionsResponse>(
			`/search/searchbox/v1/suggest?q=${q}&language=en&country=bd&session_token=${uuid}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`
		);
	},
	retrieveGeocode: (mapbox_id: string) =>
		toApiRoute.get<GeoCodeResponse>(`/api/map/searchbox/retrieve/${mapbox_id}`),
	_retrieveGeocode: (mapbox_id: string) => {
		// const uuid  = uuidv4();
		const uuid = process.env.NEXT_PUBLIC_MAPBOX_USE_SAME_SESSION;
		return toMapBox.get<GeoCodeRetrieveResponse>(
			`/search/searchbox/v1/retrieve/${mapbox_id}?session_token=${uuid}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`
		);
	}
};

const mapApi = {
	Search
};

export default mapApi;
