import { getIronSession } from 'iron-session';
import { SessionData, sessionOptions } from './iron-session';
import { cookies } from 'next/headers';

export async function getSession() {
	const session = await getIronSession<SessionData>(await cookies(), sessionOptions);
	// If user visits for the first time session returns an empty object.
	if (!session.user) {
		console.log(`⛔Session not found in getSession()`);
	} else {
		console.log(`✅Session found in getSession()`);
	}
	return session;
}

export async function deleteSession() {
	const session = await getSession();
	session.destroy();
}

export async function updateTokens({ accessToken }: { accessToken: string }) {
	const session = await getSession();
	if (!session.user) throw new Error('Session not found!');
	session.accessToken = accessToken;
	await session.save();
	return session;
}
