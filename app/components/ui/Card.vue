<script setup lang="ts">
type Props = {
	additionalClasses?: string;
};

const { additionalClasses } = defineProps<Props>();
</script>

<template>
	<div
		:class="[
			additionalClasses,
			'p-2 border border-neutral-900 pattern-[45deg] text-neutral-950/50 bg-black relative rounded-md',
		]">
		<slot />
	</div>
</template>
