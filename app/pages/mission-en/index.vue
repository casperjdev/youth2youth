<script setup lang="ts">
definePageMeta({
  layout: 'mission',
})
</script>

<template>
  <main class="h-max w-max text-white p-6 max-w-4xl mx-auto flex flex-col">

    <div class="flex items-center justify-between mb-6">
      <NuxtLink to="/">
        <Button>
          ← Home
        </Button>
      </NuxtLink>

      <NuxtLink to="/mission-pl">
        <Button variant="secondary">
          🌐 PL
        </Button>
      </NuxtLink>
    </div>

    <h1 class="text-4xl font-extrabold tracking-tight mb-8">
      OUR MISSION
    </h1>

    <section class="space-y-6 text-xs leading-loose">
      <p>
        <span class="font-semibold">Our mission is to give young people access to knowledge, inspiration and tools</span>
        that help them grow, create, and take an active role in shaping the future.
        Youth2Youth is a platform built by young people, for young people —
        without financial barriers and without unnecessary limits.
      </p>

      <p>
        We believe <span class="font-semibold">education should be free, modern, and personalized.</span>
        That’s why we combine lessons, community, recommendations and AI tools
        so everyone can explore their passions at their own pace.
      </p>

      <p>Our approach is based on three pillars:</p>

      <ul class="list-disc pl-6 space-y-2">
        <li>
          <span class="font-semibold">Equal access to knowledge</span> -> everyone can learn and grow.
        </li>
        <li>
          <span class="font-semibold">Technology supporting development</span> -> AI assists, not replaces.
        </li>
        <li>
          <span class="font-semibold">Community and collaboration</span> -> young people teach young people.
        </li>
      </ul>

      <p>
        Youth2Youth aims to be a place that not only teaches but
        <span class="font-semibold">motivates, connects, and opens new opportunities.</span>
      </p>

      <p class="font-semibold text-xl mt-6">
        We are the generation shaping the future — Youth2Youth helps strengthen it.
      </p>
    </section>
  </main>
</template>

<style scoped>
/* i tutaj też Tailwind robi robotę */
</style>
