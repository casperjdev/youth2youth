import type { StrapiUser } from '~/types/strapi/auth';

export const useAuth = () => {
	const user = useState<StrapiUser | null>('user', () => null);
	const loggedIn = computed(() => !!user.value);

	async function login(email: string, password: string) {
		const res = await $fetch<{ user: StrapiUser }>('/api/auth/login', {
			method: 'POST',
			body: { email, password },
		});
		user.value = res.user;
	}

	async function register(username: string, email: string, password: string) {
		const res = await $fetch<{ user: StrapiUser }>('/api/auth/register', {
			method: 'POST',
			body: { username, email, password },
		});
		user.value = res.user;
	}

	async function logout() {
		await $fetch('/api/auth/logout', { method: 'POST' });
		user.value = null;
	}

	async function fetchUser() {
		const me = await $fetch<StrapiUser | null>('/api/auth/me');
		user.value = me;
	}

	return { user, loggedIn, login, logout, register, fetchUser };
};
