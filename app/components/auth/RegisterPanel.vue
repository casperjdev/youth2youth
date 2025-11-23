<script setup lang="ts">
import { ref, computed } from 'vue';

const showPassword = ref(false);
const showConfirmPassword = ref(false);

const username = ref('');
const email = ref('');
const password = ref('');
const confirm = ref('');
const terms = ref(false);

const isBeingWritten = computed(() => password.value.length >= 1);
const isLongEnough = computed(() => password.value.length >= 8);
const hasNumber = computed(() => /\d/.test(password.value));
const isStrong = computed(() => isLongEnough.value && hasNumber.value);
const passwordsMatch = computed(() => password.value === confirm.value);

const emit = defineEmits<{ (e: 'switch-mode'): void }>();

const toast = useToast();

const { register, loading } = useAuth();

async function handleRegister() {
	try {
		await register(username.value, email.value, password.value);

		toast.success({ title: 'Success!', message: 'Signed up successfully!' });
	} catch (err: any) {
		let message = '';
		if (
			!username.value ||
			!email.value ||
			!password.value ||
			!isLongEnough.value ||
			!hasNumber.value ||
			!isStrong.value ||
			!passwordsMatch.value
		) {
			message = 'Invalid credentials';
		} else if (!terms.value) {
			message = 'You have to accept the Terms and Conditions';
		} else if (err?.data?.message) {
			message = err?.data?.message;
		}
		toast.error({ title: 'Error!', message: message || 'An Unknwon error occured' });
	}
}
</script>

<template>
	<form
		@submit.prevent="handleRegister"
		class="flex w-full h-full items-center justify-center md:mt-4 flex-col gap-2">
		<div class="relative w-full">
			<input
				v-model="username"
				type="text"
				name="username"
				placeholder="Username"
				id="username2"
				class="w-full rounded-md p-1 text-white font-light text-2xs backdrop-blur-[1px] bg-white/5 border border-neutral-200/80" />
		</div>

		<div class="relative w-full">
			<input
				v-model="email"
				type="email"
				name="email"
				placeholder="E-mail"
				id="email"
				class="w-full rounded-md p-1 text-white font-light text-2xs backdrop-blur-[1px] bg-white/5 border border-neutral-200/80" />
		</div>

		<div class="relative w-full">
			<input
				v-model="password"
				:type="showPassword ? 'text' : 'password'"
				name="password"
				placeholder="Password"
				id="password"
				class="w-full rounded-md p-1 pr-8 text-white font-light text-2xs backdrop-blur-[1px] bg-white/5 border border-neutral-200/80" />

			<button
				type="button"
				@click="showPassword = !showPassword"
				class="absolute right-1 top-3.5 -translate-y-1/2 text-white/70 hover:text-white text-xs">
				{{ showPassword ? '🙈️' : '👁️' }}
			</button>

			<div
				v-if="isBeingWritten"
				class="w-4/5 text-2xs font-light absolute"
				:class="isStrong ? 'text-green-400' : 'text-red-400'">
				<span v-if="!isLongEnough">Has to be at least 8 characters.</span>
				<span v-else-if="!hasNumber">Has to include at least one number.</span>
				<span v-else-if="isStrong">Password is strong!</span>
			</div>
		</div>

		<div class="relative w-full">
			<input
				v-model="confirm"
				:type="showConfirmPassword ? 'text' : 'password'"
				name="confirmPassword"
				placeholder="Confirm password"
				id="confirmPassword"
				class="w-full rounded-md p-1 pr-8 text-white font-light text-2xs backdrop-blur-[1px] bg-white/5 border border-zinc-200/80" />

			<button
				type="button"
				@click="showConfirmPassword = !showConfirmPassword"
				class="absolute right-1 top-3.5 -translate-y-1/2 text-white/70 hover:text-white text-xs">
				{{ showConfirmPassword ? '🙈️' : '👁️' }}
			</button>

			<div
				v-if="isBeingWritten"
				class="w-4/5 text-2xs font-light absolute"
				:class="passwordsMatch ? 'text-green-400' : 'text-red-400'">
				<span v-if="!passwordsMatch">Passwords must match.</span>
				<span v-else>Passwords match!</span>
			</div>
		</div>

		<!-- EULA -->
		<div class="eulagroup mt-1 -mb-1 flex flex-row gap-1">
			<input type="checkbox" v-model="terms" name="eula" id="eula-register" />
			<label
				class="text-neutral-200 block font-extralight text-center text-[0.4rem]"
				for="eula-register">
				I agree to the <a class="underline underline-offset-2">Terms &amp; Conditions</a>
			</label>
		</div>

		<Button class="grid place-items-center" variant="solid" :handleRegister>
			<span v-if="!loading">Sign Up</span>
			<Icon v-else name="lucide:loader-2" class="animate-spin w-3 h-3" />
		</Button>

		<button
			class="text-white font-extralight text-2xs hover:cursor-pointer"
			type="button"
			@click="emit('switch-mode')">
			Already have an account?
		</button>
	</form>
</template>
