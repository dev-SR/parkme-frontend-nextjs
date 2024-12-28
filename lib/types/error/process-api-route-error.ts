import { ZodError } from 'zod';
import axios from 'axios';
import { BackendErrorType } from '../auth/backend-error';

export class BackendError {
	static process(error: any): BackendErrorType {
		if (error instanceof ZodError) {
			// Handle Zod validation errors
			return {
				status: 400,
				message: 'Invalid input',
				errors: error.errors.reduce((acc, curr) => {
					acc[curr.path.join('.')] = [curr.message];
					return acc;
				}, {} as Record<string, string[]>)
			};
		} else if (axios.isAxiosError(error)) {
			// Handle Axios errors
			// console.log(error.response);
			if ([401].includes(error.response?.status as number)) {
				return {
					status: error.response?.status || 500,
					message: error.response?.statusText || 'Unauthorized',
					errors: error.response?.data.errors || {}
				};
			}
			return {
				status: error.response?.status || 500,
				message: error.response?.data.message || 'An unexpected error occurred at the server',
				errors: error.response?.data.errors || {}
			};
		} else {
			return {
				status: 500,
				message: error.message || 'An unexpected error occurred',
				errors: {}
			};
		}
	}
}
