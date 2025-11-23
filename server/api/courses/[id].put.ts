import { type Course } from '~/types/strapi/courses';

export default defineEventHandler(async (event) => {
    const { strapiUrl } = useRuntimeConfig();
    const jwt = getCookie(event, 'token');
    const courseId = getRouterParam(event, 'id');

    if (!jwt) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });

    const body = await readBody(event);

    try {
        // --- 1. SECURITY CHECK ---
        const [user, { data: currentCourse }] = await Promise.all([
            $fetch<any>(`${strapiUrl}/users/me`, { headers: { Authorization: `Bearer ${jwt}` } }),
            $fetch<{ data: any }>(`${strapiUrl}/courses/${courseId}?populate=authors`, {
                headers: { Authorization: `Bearer ${jwt}` }
            })
        ]);

        if (!currentCourse) {
            throw createError({ statusCode: 404, statusMessage: 'Course not found' });
        }

        const isAuthor = currentCourse.authors?.some((a: any) => a.id === user.id || a.documentId === user.documentId);

        if (!isAuthor) {
            throw createError({ statusCode: 403, statusMessage: 'Forbidden: You do not own this course' });
        }

        // --- 2. LESSONS LOGIC ---
        const validLessonIds: string[] = [];
        const lessonsFromFrontend = body.lessons || [];

        for (const lesson of lessonsFromFrontend) {
            let safeContent = lesson.content || '';
            const videoUrl = (lesson as any).videoUrl;
            safeContent = safeContent.replace(/<!--\s*videoUrl:\s*[\s\S]*?-->/g, '').trim();

            if (videoUrl && String(videoUrl).trim()) {
                safeContent += `\n\n<!-- videoUrl: ${String(videoUrl).trim()} -->`;
            }

            const payload = {
                title: lesson.title,
                content: safeContent,
                publishedAt: new Date().toISOString(),
            };

            const isTemp = lesson.documentId && lesson.documentId.toString().startsWith('temp-');

            if (isTemp) {
                const created = await $fetch<{ data: { documentId: string } }>(`${strapiUrl}/lessons`, {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${jwt}` },
                    body: { data: payload }
                });
                validLessonIds.push(created.data.documentId);
            } else if (lesson.documentId) {
                await $fetch(`${strapiUrl}/lessons/${lesson.documentId}`, {
                    method: 'PUT',
                    headers: { Authorization: `Bearer ${jwt}` },
                    body: { data: payload }
                });
                validLessonIds.push(lesson.documentId);
            }
        }


        // --- 3. UPDATE COURSE RELATIONS ---
        const { data } = await $fetch<{ data: Course }>(`${strapiUrl}/courses/${courseId}`, {
            method: 'PUT',
            headers: { Authorization: `Bearer ${jwt}` },
            body: { data: { lessons: validLessonIds } },
        });

        return data;

    } catch (error: any) {
        throw createError({
            statusCode: error.statusCode || 500,
            statusMessage: error.statusMessage || error.message || 'Failed to update course',
        });
    }
});