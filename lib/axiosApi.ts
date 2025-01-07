import axios from 'axios';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from './types/auth/login';
import { FindNeaByParkingLotsRequestBody, FindNeaByParkingLotsResponse } from './types/map/search';
import { ParkingSpacesRequestBody, ParkingSpacesResponse } from './types/map/parking';
import { User } from '@/stores/userStore';
import { CreateCheckoutSessionReqBody } from './schema';
import { CreateCheckoutSessionResponse } from './types/book/CreateSession';

const axiosBaseToApi = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_URL,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'Application/json'
	}
});
const axiosBaseToBackend = axios.create({
	baseURL: process.env.BACKEND_URL,
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

// Backend server request
const toBackend = {
	get: async <T>(url: string, params?: URLSearchParams): Promise<T> => {
		const response = await axiosBaseToBackend.get<T>(url, { params });
		return response.data;
	},
	post: async <T>(url: string, body: {}): Promise<T> => {
		const response = await axiosBaseToBackend.post<T>(url, body);
		return response.data;
	},
	put: async <T>(url: string, body: {}): Promise<T> => {
		const response = await axiosBaseToBackend.put<T>(url, body);
		return response.data;
	},
	del: async <T>(url: string): Promise<T> => {
		const response = await axiosBaseToBackend.delete<T>(url);
		return response.data;
	}
};
const Auth = {
	login: (values: LoginRequest) => toApiRoute.post<LoginResponse>('/api/auth/login', values),
	_login: (values: LoginRequest) => toBackend.post<LoginResponse>('/api/auth/login', values),
	register: (values: RegisterRequest) => toApiRoute.post<null>('/api/auth/register', values),
	_register: (values: RegisterRequest) => toBackend.post<null>('/api/auth/register', values),
	getProfile: () => toApiRoute.get<User>('/api/auth/current-user'),
	logout: () => toApiRoute.post<null>('/api/auth/logout', {})
};

const ParkingLots = {
	getNearbyParkingLots: (values: FindNeaByParkingLotsRequestBody) =>
		toApiRoute.post<FindNeaByParkingLotsResponse>('/api/parking-lot/search', values),
	_getNearbyParkingLots: (values: FindNeaByParkingLotsRequestBody) =>
		toBackend.post<FindNeaByParkingLotsResponse>('/api/parking-lot/search', values)
};

const ParkingSpaces = {
	getParkingSpaces: (values: ParkingSpacesRequestBody) => {
		const id = values.parkingLotId;
		return toApiRoute.post<ParkingSpacesResponse>(`/api/parking-lot/${id}/parking-spaces`, {
			startDate: values.startDate,
			endDate: values.endDate
		});
	},
	_getParkingSpaces: (values: ParkingSpacesRequestBody) => {
		const id = values.parkingLotId;
		return toBackend.post<ParkingSpacesResponse>(`/api/parking-lot/${id}/parking-spaces`, {
			startDate: values.startDate,
			endDate: values.endDate
		});
	}
};

const Book = {
	createCheckoutSession: (values: CreateCheckoutSessionReqBody) =>
		toApiRoute.post<CreateCheckoutSessionResponse>('/api/book/create-checkout-session', values)
};

const api = {
	Auth,
	ParkingLots,
	ParkingSpaces,
	Book
};

export default api;
