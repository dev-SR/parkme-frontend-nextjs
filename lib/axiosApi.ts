import axios from 'axios';
import { LoginRequest, LoginResponse } from './types/auth/login';

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
	getProfile: () => toApiRoute.get<LoginResponse>('/api/auth/current-user')
};

const api = {
	Auth
};

export default api;
