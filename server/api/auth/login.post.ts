import type { StrapiAuthResponse, StrapiErrorResponse, StrapiUser } from '~/types/strapi/auth';

export default defineEventHandler<Promise<{ user: StrapiUser }>>(async (event) => {
	const config = useRuntimeConfig();
	const STRAPI = config.strapiUrl;

	const body = (await readBody(event)) as { email: string; password: string };

	try {
		const response = await $fetch<StrapiAuthResponse>(`${STRAPI}/auth/local`, {
			method: 'POST',
			body: {
				identifier: body.email,
				password: body.password,
			},
		});

		setCookie(event, 'token', response.jwt, {
			httpOnly: true,
			secure: true,
			sameSite: 'strict',
			path: '/',
			maxAge: 60 * 60 * 24 * 7,
		});

		return { user: response.user };
	} catch (err) {
		const e = err as { response?: StrapiErrorResponse };
		throw createError({
			statusCode: 400,
			statusMessage: 'Invalid identifier or password',
		});
	}
});
