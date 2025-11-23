import { type Course } from '~/types/strapi/courses';

export default defineEventHandler(async (event) => {
    const { strapiUrl } = useRuntimeConfig();
    const jwt = getCookie(event, 'token');

    // Basic security check
    if (!jwt) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });

    const items = await readMultipartFormData(event);
    if (!items) throw createError({ statusCode: 400, statusMessage: 'No data sent' });

    // Helper to grab text fields safely
    const getVal = (key: string) => items.find((i) => i.name === key)?.data.toString() || '';

    const coverPart = items.find((i) => i.name === 'coverImage' && i.filename);
    const tagsRaw = getVal('tags');
    const tagLabels: string[] = tagsRaw ? JSON.parse(tagsRaw) : [];

    let tagIds: number[] = [];
    let coverId: number | undefined;

    try {
        const user = await $fetch<any>(`${strapiUrl}/users/me`, {
            headers: { Authorization: `Bearer ${jwt}` }
        });

        if (tagLabels.length) {
            const { data: allTags } = await $fetch<{ data: any[] }>(`${strapiUrl}/tags?pagination[pageSize]=100`, {
                headers: { Authorization: `Bearer ${jwt}` },
            });

            const tagMap = new Map(allTags.map(t => [t.label.toLowerCase(), t.id]));
            tagIds = tagLabels.map(l => tagMap.get(l.toLowerCase())).filter(Boolean);
        }

        if (coverPart) {
            const fd = new FormData();
            fd.append('files', new Blob([coverPart.data], { type: coverPart.type }), coverPart.filename);

            const [uploaded] = await $fetch<any[]>(`${strapiUrl}/upload`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${jwt}` },
                body: fd,
            });
            coverId = uploaded?.id;
        }

        const { data } = await $fetch<{ data: Course }>(`${strapiUrl}/courses`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${jwt}` },
            body: {
                data: {
                    title: getVal('name'),
                    description: getVal('description'),
                    tags: tagIds,
                    cover: coverId,
                    authors: [user.id]
                }
            },
        });

        return data;

    } catch (e: any) {
        throw createError({
            statusCode: e.statusCode || 500,
            statusMessage: e.data?.error?.message || e.message || 'Course creation failed',
        });
    }
});