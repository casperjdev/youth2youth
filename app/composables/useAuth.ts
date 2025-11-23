import type { StrapiUser } from '~/types/strapi/auth';

export const useAuth = () => {
	const user = useState<StrapiUser | null>('user', () => null);
	const loading = useState('auth-loading', () => false);
	const loggedIn = computed(() => !!user.value);

	async function login(email: string, password: string) {
		loading.value = true;
		try {
			await $fetch('/api/auth/login', {
				method: 'POST',
				body: { email, password },
				credentials: 'include',
			});
			await fetchUser();
			await navigateTo('/home', { replace: true });
		} finally {
			loading.value = false;
		}
	}

	async function register(username: string, email: string, password: string) {
		loading.value = true;
		try {
			await $fetch('/api/auth/register', {
				method: 'POST',
				body: { username, email, password },
				credentials: 'include',
			});
			await fetchUser();
			await navigateTo('/home', { replace: true });
		} finally {
			loading.value = false;
		}
	}

	async function logout() {
		loading.value = true;
		try {
			await $fetch('/api/auth/logout', { method: 'POST' });
			user.value = null;
			await navigateTo('/auth', { replace: true });
		} finally {
			loading.value = false;
		}
	}

	async function fetchUser() {
		loading.value = true;
		try {
			const headers = useRequestHeaders(['cookie']);
			const data = await $fetch<{ user: StrapiUser }>('/api/auth/me', {
				headers: import.meta.server ? headers : undefined,
				credentials: 'include',
			});
			user.value = data.user;
		} catch (error) {
			user.value = null;
		} finally {
			loading.value = false;
		}
	}

	return { user, loggedIn, login, logout, register, fetchUser, loading };
};
