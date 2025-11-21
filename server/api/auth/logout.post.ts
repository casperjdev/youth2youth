export default defineEventHandler(async (event) => {
	deleteCookie(event, 'token');
	return { ok: true };
});
