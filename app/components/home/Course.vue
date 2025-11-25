<script setup lang="ts">
import type { Course } from '~/types/strapi/courses';

type Props = {
  data: Course;
};

const { data } = defineProps<Props>();
</script>

<template>
  <Card class="h-32 relative overflow-hidden z-0 flex flex-col justify-end p-3 gap-1">
    <NuxtImg
        class="absolute top-0 left-0 w-full h-full -z-20 object-cover object-top mask-alpha mask-b-from-0 mask-b-to-100% opacity-75"
        v-if="data.cover?.formats?.thumbnail?.url"
        :src="data.cover?.formats?.thumbnail?.url"
        provider="strapi" />

    <h1 class="text-neutral-50 text-xs font-extrabold line-clamp-1">{{ data.title }}</h1>
    <p class="text-neutral-200 text-2xs line-clamp-2">{{ data.description }}</p>
    <div class="flex flex-row flex-wrap gap-1">
			<span
          v-for="tag in data.tags?.slice(0, 3)"
          :key="tag.documentId"
          class="text-2xs px-1.5 py-0.5 rounded bg-neutral-900/50 text-neutral-300">
				{{ tag.label }}
			</span>
    </div>
  </Card>
</template>