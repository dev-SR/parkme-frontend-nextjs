export const DEFAULT_LOGIN_REDIRECT = '/';
// export const apiAuthPrefix = '/api/auth';

export const LOGIN_PATH = '/auth/login';
export const REGISTER_PATH = '/auth/register';
export const GITHUB_PATH = '/auth/social/github';
export const GOOGLE_PATH = '/auth/social/google';

export const authRoutes = [LOGIN_PATH, REGISTER_PATH, GITHUB_PATH, GOOGLE_PATH];

export const publicRoutes = ['/', '/private/server', '/private/client'];
