import { LoginSchemaType } from '@/lib/schema';
import { User } from './user';

export type LoginResponse = {
	accessToken: string;
	refreshToken: string;
	user: User;
};

export type LoginRequest = LoginSchemaType;
