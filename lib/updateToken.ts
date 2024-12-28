'use server';
// https://github.dev/dev-SR/NestJS-NextJS-Authentication/tree/main/apps/web
export const updateAccessToken = async (accessToken: string) => {
	try {
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
		return err;
	}
};
