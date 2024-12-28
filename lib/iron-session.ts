import { SessionOptions } from 'iron-session';
import { LoginResponse } from './types/auth/login';

export interface SessionData extends LoginResponse {}

export const defaultSession: SessionData = {
	accessToken: '',
	refreshToken: '',
	user: {
		id: '',
		email: '',
		firstName: '',
		lastName: '',
		roles: []
	}
};

export const sessionOptions: SessionOptions = {
	// You need to create a secret key at least 32 characters long.
	password: process.env.SESSION_SECRET!,
	cookieName: 'session',
	cookieOptions: {
		httpOnly: true,
		sameSite: 'lax',
		maxAge: parseInt(process.env.COOKIE_EXPIRES_IN_DAYS || '7') * 24 * 60 * 60,
		path: '/',
		// Secure only works in `https` environments. So if the environment is `https`, it'll return true.
		secure: process.env.NODE_ENV === 'production'
	}
};
