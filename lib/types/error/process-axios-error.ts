import axios, { AxiosError } from 'axios';
import { BackendErrorType } from '../auth/backend-error';

// Utility function to check if the error is an AxiosError
export type AxiosErrorType = AxiosError<BackendErrorType>;
export const isAxiosError = (error: unknown): error is AxiosErrorType => axios.isAxiosError(error);

export class HandleAxiosError {
	static process(error: any): BackendErrorType {
		if (isAxiosError(error)) {
			if (error.response?.status === 400) {
				return {
					status: error.response.status,
					message: 'Invalid input',
					errors: error.response.data.errors
				};
			}
			if (error.response?.data) {
				return {
					status: error.response.status,
					message: error.response.data.message,
					errors: error.response.data.errors
				};
			}
		}
		return {
			status: 500,
			message: 'An unexpected error occurred',
			errors: {}
		};
	}
}
