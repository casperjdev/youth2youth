<script setup lang="ts">
import { ref } from 'vue';

const showPassword = ref(false);

const emit = defineEmits<{
	(e: 'switch-mode'): void;
}>();

const email = ref('');
const password = ref('');

const { login } = useAuth();
const error = ref<string | null>(null);
const loading = ref(false);

async function handleLogin() {
	loading.value = true;
	error.value = null;

	try {
		await login(email.value, password.value);
	} catch (err: any) {
		error.value = err?.data?.message || 'Registration failed';
	}

	const { user } = useAuth();

	console.log(user?.value);

	loading.value = false;
}
</script>

<template>
	<form
		@submit.prevent="handleLogin"
		class="flex w-full h-full items-center justify-center md:mt-4 flex-col gap-2">
		<label for="email" class="sr-only">E-Mail</label>
		<input
			v-model="email"
			type="email"
			name="email"
			placeholder="E-mail"
			id="email"
			class="w-full rounded-md p-1 text-white font-light text-2xs backdrop-blur-[1px] bg-neutral-50/5 border border-neutral-200/80" />

		<label for="password" class="sr-only">Password</label>
		<div class="relative w-full">
			<input
				v-model="password"
				:type="showPassword ? 'text' : 'password'"
				name="password"
				placeholder="Password"
				id="password"
				class="w-full rounded-md p-1 pr-8 text-white font-light text-2xs backdrop-blur-[1px] bg-neutral-50/5 border border-neutral-200/80" />

			<button
				type="button"
				@click="showPassword = !showPassword"
				class="absolute right-1 top-3.5 -translate-y-1/2 text-white/70 hover:text-white text-xs">
				{{ showPassword ? '🙈️' : '👁️' }}
			</button>
		</div>

		<Button variant="solid" :handleLogin>Sign Up</Button>

		<p v-if="error" class="error">{{ error }}</p>

		<button
			class="text-white font-extralight text-2xs hover:cursor-pointer"
			type="button"
			@click="emit('switch-mode')">
			No account yet?
		</button>

		<a class="-mt-2 text-white font-extralight text-2xs hover:cursor-pointer">
			Trouble logging in?
		</a>
	</form>
</template>
