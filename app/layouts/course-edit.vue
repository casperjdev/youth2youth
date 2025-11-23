<script setup lang="ts">
import bg from '/img/course-edit.jpg';
</script>

<template>
	<main
		class="relative isolate w-svw h-full min-h-svh bg-center bg-cover p-4"
		:style="{ backgroundImage: `url(${bg})` }">
		<slot />
	</main>
</template>
