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
			'before:absolute before:-top-px before:left-1/2 before:-translate-x-1/2 before:w-1/2 before:h-px before:bg-linear-90 before:from-0% before:from-neutral-950 before:via-50% before:via-neutral-50/25 before:to-100% before:to-neutral-950',
			'after:absolute after:-bottom-px after:left-1/2 after:-translate-x-1/2 after:w-1/2 after:h-px after:bg-linear-90 after:from-0% after:from-neutral-950 after:via-50% after:via-neutral-50/25 after:to-100% after:to-neutral-950',
		]">
		<slot />
	</div>
</template>
