import { type StrapiUser } from '~/types/strapi/auth';

export default defineEventHandler<Promise<{ user: StrapiUser } | null>>(async (event) => {
	const config = useRuntimeConfig();
	const STRAPI = config.strapiUrl;

	const jwt = getCookie(event, 'token');
	if (!jwt) return null;

	try {
		const user = await $fetch<StrapiUser>(`${STRAPI}/users/me?populate=*`, {
			headers: { Authorization: `Bearer ${jwt}` },
		});

		return { user };
	} catch (e) {
		throw createError({
			statusCode: 401,
			statusMessage: 'Invalid token',
		});
	}
});
