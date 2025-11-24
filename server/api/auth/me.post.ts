import type { Tag } from '~/types/strapi/courses';

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig();
	const STRAPI = config.strapiUrl;

	const jwt = getCookie(event, 'token');
	if (!jwt) return null;

	const body = (await readBody(event)) as {
		username: string;
		email: string;
		tags: Tag[];
	};

	try {
		const ok = await $fetch(`${STRAPI}/user/me?populate=*`, {
			method: 'POST',
			headers: { Authorization: `Bearer ${jwt}` },
			body: {
				username: body.username,
				email: body.email,
				tags: body.tags,
			},
		});

		return { ok };
	} catch (e: any) {
		throw createError({
			statusCode: e.statusCode,
			statusMessage: e.data?.error?.message,
		});
	}
});
