import { type StrapiUser } from '~/types/strapi/auth';

export default defineEventHandler<Promise<StrapiUser | null>>(async (event) => {
	const config = useRuntimeConfig();
	const STRAPI = config.strapiUrl;

	const jwt = getCookie(event, 'token');
	if (!jwt) return null;

	try {
		return await $fetch<StrapiUser>(`${STRAPI}/users/me`, {
			headers: { Authorization: `Bearer ${jwt}` },
		});
	} catch {
		return null;
	}
});
