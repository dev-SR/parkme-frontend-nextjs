import { ZodError } from 'zod';
import axios from 'axios';
import { BackendErrorType } from '../auth/backend-error';

export class BackendError {
	static process(error: unknown): BackendErrorType {
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
			console.log(error.response?.data);

			return {
				status: error.response?.status || 500,
				message: error.response?.data.message || 'An unexpected error occurred at the server',
				errors: error.response?.data.errors || {}
			};
		} else {
			return {
				status: 500,
				message: 'An unexpected error occurred',
				errors: {}
			};
		}
	}
}
