import { LoginSchemaType } from '@/lib/schema';

export type LoginResponse = {
	accessToken: string;
	refreshToken: string;
	user: {
		id: string;
		email: string;
		firstName: string;
		lastName: string;
		roles: string[];
	};
};

export type LoginRequest = LoginSchemaType;
