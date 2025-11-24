import type { Tag, TagList } from '~/types/strapi/courses';

export default defineEventHandler<Promise<{ res: TagList } | null>>(async (event) => {
	const { strapiUrl } = useRuntimeConfig();
	const jwt = getCookie(event, 'token');

	if (!jwt) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });

	try {
		// Fetch tags: limit 100, A-Z sort
		const res = await $fetch<TagList>(`${strapiUrl}/tags`, {
			headers: { Authorization: `Bearer ${jwt}` },
			params: {
				'pagination[pageSize]': 100,
				sort: 'label:asc',
			},
		});

		return { res };
	} catch (e: any) {
		throw createError({
			statusCode: e.statusCode || 500,
			statusMessage: e.data?.error?.message || 'Failed to fetch tags',
		});
	}
});
