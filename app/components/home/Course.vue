<script setup lang="ts">
import type { Course } from '~/types/strapi/courses';

type Props = {
	data: Course;
};

const { data } = defineProps<Props>();
</script>

<template>
	<Card class="h-32">
		<h1 class="text-neutral-50 text-xs font-extrabold">{{ data.title }}</h1>
		<p class="text-neutral-200 text-2xs">{{ data.description }}</p>
	</Card>
</template>
