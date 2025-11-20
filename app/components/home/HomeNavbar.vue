<script setup lang="ts">
const route = useRoute();

let path = computed(() => {
	return route.path;
});
</script>

<template>
	<nav class="w-full bg-neutral-950 pattern[-45deg] text-neutral-950/50 fixed top-0 left-0 z-100">
		<div class="w-full h-8 px-4 max-w-2xl mx-auto flex flex-row gap-4 items-center">
			<NuxtLink to="/home">
				<span
					class="block w-max font-extrabold italic text-xs text-transparent bg-linear-180 from-50% from-neutral-50 to-100% to-neutral-400 bg-clip-text">
					youth2youth
				</span>
			</NuxtLink>
			<div class="text-2xs h-full text-neutral-50 flex flex-row">
				<NuxtLink
					to="/home"
					:class="[
						'h-full px-2 grid place-items-center cursor-pointer  transition-colors relative group',
						path == '/home' ? 'opacity-100' : 'opacity-50 hover:text-neutral-400',
					]">
					Home
					<div
						:class="[
							'absolute bottom-0 w-0 transition-[width] bg-neutral-50 h-0.5',
							path == '/home' ? 'w-full' : 'group-hover:w-1/2',
						]"></div>
				</NuxtLink>
				<NuxtLink
					to="/discover"
					:class="[
						'h-full px-2 grid place-items-center cursor-pointer transition-colors relative group',
						path == '/discover' ? 'opacity-100' : 'opacity-50 hover:text-neutral-400',
					]"
					>Discover
					<div
						:class="[
							'absolute bottom-0 w-0 transition-[width] bg-neutral-50 h-0.5',
							path == '/discover' ? 'w-full' : 'group-hover:w-1/2',
						]"></div>
				</NuxtLink>
				<NuxtLink
					to="/teachers"
					:class="[
						'h-full px-2 grid place-items-center cursor-pointer  transition-colors relative group',
						path == '/teachers' ? 'opacity-100' : 'opacity-50 hover:text-neutral-400',
					]"
					>Teachers
					<div
						:class="[
							'absolute bottom-0 w-0 transition-[width] bg-neutral-50 h-0.5',
							path == '/teachers' ? 'w-full' : 'group-hover:w-1/2',
						]"></div>
				</NuxtLink>
				<NuxtLink
					to="/create"
					:class="[
						'h-full px-2 grid place-items-center cursor-pointer transition-colors relative group',
						path == '/create' ? 'opacity-100' : 'opacity-50 hover:text-neutral-400',
					]"
					>Create
					<div
						:class="[
							'absolute bottom-0 w-0 transition-[width] bg-neutral-50 h-0.5',
							path == '/create' ? 'w-full' : 'group-hover:w-1/2',
						]"></div>
				</NuxtLink>
			</div>
		</div>
		<Separator />
	</nav>
</template>
