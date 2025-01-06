import { LoginSchemaType, RegisterSchemaType } from '@/lib/schema';
import { User } from './user';

export type LoginResponse = {
	accessToken: string;
	refreshToken: string;
	user: User;
};

export type LoginRequest = LoginSchemaType;

export type RegisterRequest = RegisterSchemaType;
export type RegisterResponse = null;
