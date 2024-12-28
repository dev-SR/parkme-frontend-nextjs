'use server';
// https://github.dev/dev-SR/NestJS-NextJS-Authentication/tree/main/apps/web
export const refreshToken = async (refreshToken: string) => {
	console.log(`Refresh token: ${refreshToken}`);

	try {
		const response = await fetch(`${process.env.BACKEND_URL}/api/token/refresh-token`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				refreshToken
			})
		});

		if (!response.ok) {
			throw new Error('Failed to refresh token' + response.statusText);
		}

		const { accessToken } = await response.json();
		// update session with new tokens
		const updateRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/session`, {
			method: 'PUT',
			body: JSON.stringify({
				accessToken
			})
		});
		if (!updateRes.ok) throw new Error('Failed to update the tokens');

		return accessToken;
	} catch (err) {
		console.error('Refresh Token failed:', err);
		return null;
	}
};
