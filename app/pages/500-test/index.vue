<script setup lang="ts">
// Symulacja błędu krytycznego
throw createError({
  statusCode: 418,
  fatal: true // To wymusza pokazanie error.vue
})
</script>

<template>
  <div>Tej treści i tak nie zobaczysz.</div>
</template>