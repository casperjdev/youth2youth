export default defineNuxtRouteMiddleware(async (to, from) => {
	const { user, fetchUser, loggedIn } = useAuth();

	// Fetch on both server and client if needed
	if (!loggedIn.value) {
		await fetchUser();
	}

	const protectedPrefixes = ['/home', '/discover', '/teachers', '/create', '/course'];
	const guestOnlyExact = ['/'];
	const guestOnlyPrefixes = ['/mission-pl', '/mission-en', '/auth'];

	const isProtected = protectedPrefixes.some((prefix) => to.path.startsWith(prefix));
	const isGuestOnly =
		guestOnlyExact.includes(to.path) ||
		guestOnlyPrefixes.some((prefix) => to.path.startsWith(prefix));

	// These redirects now happen on BOTH server and client
	if (user.value && isGuestOnly) {
		return navigateTo('/home', { replace: true });
	}

	if (!user.value && isProtected) {
		return navigateTo('/auth', { replace: true });
	}
});
