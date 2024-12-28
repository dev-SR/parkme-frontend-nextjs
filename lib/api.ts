// import { getProfile } from '@/actions/getProfile';
// import { refreshToken } from './refreshToken';
// import { getSession } from './session';
// import { LoginRequest, LoginResponse } from './types/auth/login';

// export interface FetchOptions extends RequestInit {
// 	headers?: Record<string, string>;
// }

// const fetchBase = async <T>(url: string | URL, options: FetchOptions = {}): Promise<Response> => {
// 	const defaultHeaders = {
// 		'Content-Type': 'application/json',
// 		Accept: 'application/json'
// 	};

// 	const response = await fetch(url, {
// 		...options,
// 		headers: {
// 			...defaultHeaders,
// 			...(options.headers || {})
// 		},
// 		credentials: 'include'
// 	});
// 	return response;
// };

// export const authFetch = async <T>(url: string | URL, options: FetchOptions = {}): Promise<T> => {
// 	const session = await getSession();
// 	let fullUrl = `${process.env.BACKEND_URL}${url}`;

// 	options.headers = {
// 		...options.headers,
// 		Authorization: `Bearer ${session?.accessToken}`
// 	};

// 	let response = await fetchBase<T>(fullUrl, options);

// 	if (response.status === 401) {
// 		if (!session?.refreshToken) throw new Error('Refresh token not found!');

// 		const newAccessToken = await refreshToken(session.refreshToken);

// 		if (newAccessToken) {
// 			options.headers.Authorization = `Bearer ${newAccessToken}`;
// 			response = await fetchBase<T>(fullUrl, options);
// 		}
// 	}

// 	return await response.json();
// };

// const toBackendWithAuth = {
// 	get: async <T>(url: string, params: Record<string, string> = {}): Promise<T> => {
// 		return authFetch<T>(url, { method: 'GET' });
// 	},

// 	post: async <T>(url: string, body: {} = {}): Promise<T> => {
// 		return authFetch<T>(url, {
// 			method: 'POST',
// 			body: JSON.stringify(body)
// 		});
// 	},

// 	put: async <T>(url: string, body: {} = {}): Promise<T> => {
// 		return authFetch<T>(url, {
// 			method: 'PUT',
// 			body: JSON.stringify(body)
// 		});
// 	},

// 	del: async <T>(url: string): Promise<T> => {
// 		return authFetch<T>(url, { method: 'DELETE' });
// 	}
// };

// const toBackend = {
// 	get: async <T>(url: string, params: Record<string, string> = {}): Promise<T> => {
// 		const fullUrl = `${process.env.BACKEND_URL}${url}`;
// 		const response = await fetchBase<T>(fullUrl, { method: 'GET' });
// 		return response.json() as Promise<T>;
// 	},

// 	post: async <T>(url: string, body: {} = {}): Promise<T> => {
// 		const fullUrl = `${process.env.BACKEND_URL}${url}`;
// 		const response = await fetchBase<T>(fullUrl, {
// 			method: 'POST',
// 			body: JSON.stringify(body)
// 		});

// 		return response.json() as Promise<T>;
// 	},

// 	put: async <T>(url: string, body: {} = {}): Promise<T> => {
// 		const fullUrl = `${process.env.BACKEND_URL}${url}`;
// 		const response = await fetchBase<T>(fullUrl, {
// 			method: 'PUT',
// 			body: JSON.stringify(body)
// 		});

// 		return response.json() as Promise<T>;
// 	},

// 	del: async <T>(url: string): Promise<T> => {
// 		const fullUrl = `${process.env.BACKEND_URL}${url}`;
// 		const response = await fetchBase<T>(fullUrl, { method: 'DELETE' });

// 		return response.json() as Promise<T>;
// 	}
// };
// const toApiRoute = {
// 	get: async <T>(url: string, params: Record<string, string> = {}): Promise<T> => {
// 		const response = await fetchBase<T>(url, { method: 'GET' });
// 		return response.json() as Promise<T>;
// 	},

// 	post: async <T>(url: string, body: {} = {}): Promise<T> => {
// 		const response = await fetchBase<T>(url, {
// 			method: 'POST',
// 			body: JSON.stringify(body)
// 		});

// 		return response.json() as Promise<T>;
// 	},

// 	put: async <T>(url: string, body: {} = {}): Promise<T> => {
// 		const response = await fetchBase<T>(url, {
// 			method: 'PUT',
// 			body: JSON.stringify(body)
// 		});

// 		return response.json() as Promise<T>;
// 	},

// 	del: async <T>(url: string): Promise<T> => {
// 		const response = await fetchBase<T>(url, { method: 'DELETE' });

// 		return response.json() as Promise<T>;
// 	}
// };

// const Auth = {
// 	login: (values: LoginRequest) => toApiRoute.post<LoginResponse>('/api/auth/login', values),
// 	_login: (values: LoginRequest) => toBackend.post<LoginResponse>('/api/auth/login', values),
// 	getProfile: () => toApiRoute.get<LoginResponse>('/api/auth/current-user'),
// 	_getProfile: () => toBackendWithAuth.get<LoginResponse>('/api/auth/current-user')
// };

// const api = {
// 	Auth
// };

// export default api;
