import axios from 'axios';
import { LoginRequest, LoginResponse } from './types/auth/login';

const axiosBase = axios.create({
	baseURL: process.env.BACKEND_URL,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'Application/json'
	}
});

axiosBase.interceptors.request.use((config) => {
	const token = "localStorage.getItem('token')";
	if (token) config.headers!.Authorization = `Bearer ${token}`;
	// req.headers['Cookie'] = (await cookies()).toString();
	// req.headers['Authorization'] = `JWT ${(await cookies()).get('access')?.value.toString()}`;
	return config;
});

// Backend server request
const _requests = {
	get: async <T>(url: string, params?: URLSearchParams): Promise<T> => {
		const response = await axiosBase.get<T>(url, { params });
		return response.data;
	},
	post: async <T>(url: string, body: {}): Promise<T> => {
		const response = await axiosBase.post<T>(url, body);
		return response.data;
	},
	put: async <T>(url: string, body: {}): Promise<T> => {
		const response = await axiosBase.put<T>(url, body);
		return response.data;
	},
	del: async <T>(url: string): Promise<T> => {
		const response = await axiosBase.delete<T>(url);
		return response.data;
	}
};

// React Query request
const requests = {
	get: async <T>(url: string, params?: URLSearchParams): Promise<T> => {
		const response = await axios.get<T>(url, { params });
		return response.data;
	},
	post: async <T>(url: string, body: {}): Promise<T> => {
		const response = await axios.post<T>(url, body);
		return response.data;
	},
	put: async <T>(url: string, body: {}): Promise<T> => {
		const response = await axios.put<T>(url, body);
		return response.data;
	},
	del: async <T>(url: string): Promise<T> => {
		const response = await axios.delete<T>(url);
		return response.data;
	}
};

const Auth = {
	_login: (values: LoginRequest) => _requests.post<LoginResponse>('/api/auth/login', values),
	login: (values: LoginRequest) => requests.post<LoginResponse>('/api/auth/login', values)
	// register: (values: Register) => requests.post<User>('users/register', values),
};

const api = {
	Auth
};

export default api;
