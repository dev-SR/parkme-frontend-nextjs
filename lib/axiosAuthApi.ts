import axios from 'axios';
import { LoginResponse } from './types/auth/login';
import { getSession } from './session';
import { Token } from './types/auth/token';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

const axiosBase = axios.create({
	baseURL: process.env.BACKEND_URL,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'Application/json'
	}
});

const updateTokens = async (newAccessToken: string) => {
	try {
		const session = await getSession();
		session.accessToken = newAccessToken;
		await session.save();
		console.log('Session updated');
	} catch (error) {
		console.error('Error updating session');
	}
};

axiosBase.interceptors.request.use(async (config) => {
	const session = await getSession();
	config.headers.Authorization = `Bearer ${session.accessToken}`;
	// console.log('request', { h: config.headers, url: `${config.baseURL}${config.url}` });
	if (config.headers.retryWithAccessToken) {
		const newAccessToken = config.headers.retryWithAccessToken;
		config.headers.Authorization = `Bearer ${newAccessToken}`;
		// await updateAccessToken(newAccessToken);
		await updateTokens(newAccessToken);
		delete config.headers.retryWithAccessToken;
	}

	return config;
});

// axiosBase.interceptors.response.use(
// 	(response) => response,
// 	async (error) => {
// 		const originalRequest = error.config;
// 		const session = await getSession();
// 		// console.log(res);

// 		if (error.response && error.response.status === 401 && !originalRequest._retry) {
// 			originalRequest._retry = true;
// 			try {
// 				console.log('Refreshing token...');
// 				const { data } = await axios.post<Token>(
// 					`${process.env.BACKEND_URL}/api/token/refresh-token`,
// 					{
// 						refreshToken: session.refreshToken
// 					}
// 				);
// 				originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
// 				originalRequest.headers.retryWithAccessToken = data.accessToken;
// 				return await axiosBase(originalRequest);
// 			} catch (refreshError) {
// 				return Promise.reject(refreshError);
// 			}
// 		}
// 		return Promise.reject(error);
// 	}
// );
const refreshAuthLogic = async (failedRequest: any): Promise<void> => {
	console.log('Refreshing token...');
	const session = await getSession();

	const { data } = await axios.post<Token>(`${process.env.BACKEND_URL}/api/token/refresh-token`, {
		refreshToken: session.refreshToken
	});

	failedRequest.response.config.headers['retryWithAccessToken'] = data.accessToken;

	return Promise.resolve();
};

createAuthRefreshInterceptor(axiosBase, refreshAuthLogic);

const toBackendWithAuth = {
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
const Auth = {
	_getCurrentUser: () => toBackendWithAuth.get<LoginResponse>('/api/auth/current-user')
};

const authApi = {
	Auth
};

export default authApi;
