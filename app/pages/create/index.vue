<script setup lang="ts">
definePageMeta({
	layout: 'dashboard',
});
</script>

<template>
	<div class="h-[calc(100svh-128px)] flex flex-col items-center max-w-2xl gap-2 mx-auto">
		<h1 class="text-neutral-50 font-extrabold text-center">Creator</h1>
		<Card
			class="w-full backdrop-blur-sm bg-black/10! text-neutral-950/10! flex flex-col gap-2 flex-1">
			<h1 class="sm:text-xs text-2xs text-neutral-50 font-extrabold">Your Courses</h1>
			<div
				class="flex-1 grid gap-2 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 max-h-72 overflow-scroll">
				<Card class="h-32"></Card>
				<Card class="h-32"></Card>
				<Card class="h-32"></Card>
				<Card class="h-32"></Card>
				<Card class="h-32"></Card>
				<Card class="h-32"></Card>
				<Card class="h-32"></Card>
				<Card class="h-32"></Card>
				<Card class="h-32"></Card>
				<Card class="h-32"></Card>
				<Card class="h-32"></Card>
				<Card class="h-32"></Card>
				<Card class="h-32"></Card>
				<Card class="h-32"></Card>
				<Card class="h-32"></Card>
			</div>
			<Button class="sm:w-1/2! w-full! mx-auto">Create a Course</Button>
		</Card>
	</div>
</template>
