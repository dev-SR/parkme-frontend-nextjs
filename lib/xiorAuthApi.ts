// import 'server-only';
// import xior, { XiorError } from 'xior';
// import { LoginResponse } from './types/auth/login';
// import { getSession } from './session';
// import { Token } from './types/auth/token';

// const xiorBase = xior.create({
// 	baseURL: process.env.BACKEND_URL,
// 	withCredentials: true,
// 	headers: {
// 		'Content-Type': 'application/json',
// 		Accept: 'Application/json'
// 	},
// 	cache: 'no-store'
// });

// const updateTokens = async (newAccessToken: string) => {
// 	try {
// 		// const session = await getSession();
// 		// session.accessToken = newAccessToken;
// 		// await session.save();
// 		const componentType = typeof window === 'undefined' ? 'server' : 'client';
// 		console.log(componentType);

// 		const { cookies } = await import('next/headers');
// 		const c = await cookies();
// 		c.set('xiorAccessToken', newAccessToken);

// 		console.log('Session updated');
// 	} catch (error) {
// 		console.error('Error updating session');
// 	}
// };

// xiorBase.interceptors.request.use(async (config) => {
// 	const session = await getSession();
// 	config.headers.Authorization = `Bearer ${session.accessToken}`;
// 	// console.log('request', { h: config.headers, url: `${config.baseURL}${config.url}` });
// 	if (config.headers.retryWithAccessToken) {
// 		const newAccessToken = config.headers.retryWithAccessToken;
// 		config.headers.Authorization = `Bearer ${newAccessToken}`;
// 		// await updateAccessToken(newAccessToken);
// 		await updateTokens(newAccessToken);
// 		delete config.headers.retryWithAccessToken;
// 	}

// 	return config;
// });

// import createAuthRefreshInterceptor from 'xior-auth-refresh';

// // Function that will be called to refresh authorization
// const refreshAuthLogic = async (failedRequest: any): Promise<void> => {
// 	console.log('Refreshing token...');
// 	const session = await getSession();

// 	const { data } = await xior.post<Token>(`${process.env.BACKEND_URL}/api/token/refresh-token`, {
// 		refreshToken: session.refreshToken
// 	});

// 	failedRequest.response.config.headers['retryWithAccessToken'] = data.accessToken;

// 	return Promise.resolve();
// };

// createAuthRefreshInterceptor(xiorBase, refreshAuthLogic);

// const toBackendWithAuth = {
// 	get: async <T>(url: string, params?: URLSearchParams): Promise<T> => {
// 		const response = await xiorBase.get<T>(url, { params });
// 		return response.data;
// 	},
// 	post: async <T>(url: string, body: {}): Promise<T> => {
// 		const response = await xiorBase.post<T>(url, body);
// 		return response.data;
// 	},
// 	put: async <T>(url: string, body: {}): Promise<T> => {
// 		const response = await xiorBase.put<T>(url, body);
// 		return response.data;
// 	},
// 	del: async <T>(url: string): Promise<T> => {
// 		const response = await xiorBase.delete<T>(url);
// 		return response.data;
// 	}
// };
// const Auth = {
// 	_getProfile: () => toBackendWithAuth.get<LoginResponse>('/api/auth/current-user')
// };

// const apiAuthX = {
// 	Auth
// };

// export default apiAuthX;
