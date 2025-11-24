<script setup lang="ts">
definePageMeta({
	layout: 'dashboard',
});
</script>

<template>
	<div class="h-[calc(100svh-128px)] flex flex-col items-center gap-2 mx-auto">
		<h1 class="text-neutral-50 font-extrabold text-center">Discover Courses</h1>
		<input
			type="text"
			name="search"
			placeholder="Search..."
			id="search"
			class="sm:w-1/2 w-full rounded-md p-1 text-white font-light text-2xs backdrop-blur-[1px] bg-neutral-50/5 border border-neutral-200/80" />
		<Card
			class="w-full backdrop-blur-sm bg-black/10! text-neutral-950/10! flex-1 grid gap-2 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 overflow-scroll">
		</Card>
	</div>
</template>
