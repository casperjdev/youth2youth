<script setup lang="ts">
import { ref } from 'vue';

const showPassword = ref(false);

const emit = defineEmits<{
	(e: 'switch-mode'): void;
}>();
</script>

<template>
	<div class="flex w-full h-full items-center justify-center md:mt-4 flex-col gap-2">
		<label for="email" class="sr-only">E-Mail</label>
		<input
			type="email"
			name="email"
			placeholder="E-mail"
			id="email"
			class="w-full rounded-md p-1 text-white font-light text-2xs backdrop-blur-[1px] bg-neutral-50/5 border border-neutral-200/80" />

		<label for="password" class="sr-only">Password</label>
		<div class="relative w-full">
			<input
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

		<Button variant="solid">Sign Up</Button>

		<button
			class="text-white font-extralight text-2xs hover:cursor-pointer"
			type="button"
			@click="emit('switch-mode')">
			No account yet?
		</button>

		<a class="-mt-2 text-white font-extralight text-2xs hover:cursor-pointer">
			Trouble logging in?
		</a>
	</div>
</template>
