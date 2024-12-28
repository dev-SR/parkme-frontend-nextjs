'use server';

import apiAuth from '@/lib/axiosAuthApi';
import { BackendError } from '@/lib/types/error/process-api-route-error';

// import authApi from '@/lib/axiosAuthApi';
export async function getCurrentUser() {
	try {
		const result = await apiAuth.Auth._getCurrentUser();
		return result;
	} catch (error) {
		console.log(error);

		const err = BackendError.process(error);
		console.log(err);

		return {};
	}
}
