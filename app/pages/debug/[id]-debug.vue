<script setup lang="ts">
const route = useRoute();
const id = route.params.id as string;

definePageMeta({
  layout: false,
});

const { data, error, status, refresh } = await useFetch(`/api/courses/${id}`, {
  key: `debug-course-${id}`
});
</script>

<template>
  <div class="min-h-screen bg-[#0d1117] text-[#c9d1d9] p-8 font-mono text-sm">
    <div class="max-w-7xl mx-auto">
      <header class="flex justify-between items-center mb-8 border-b border-[#30363d] pb-4">
        <div>
          <h1 class="text-xl font-bold text-emerald-400 mb-1">🔍 Raw Data Debugger</h1>
          <p class="text-gray-500 text-xs">Target ID: <span class="bg-[#30363d] px-1 rounded text-white">{{ id }}</span></p>
        </div>
        <button
            @click="refresh()"
            class="px-4 py-2 bg-[#238636] hover:bg-[#2ea043] text-white rounded transition-colors text-xs font-bold">
          Refresh Data
        </button>
      </header>

      <div v-if="status === 'pending'" class="py-10 text-center text-yellow-500 animate-pulse">
        Connecting to Strapi via Nuxt API...
      </div>

      <div v-else-if="error" class="bg-[#3d1a1a] border border-[#f85149] rounded p-4 mb-4 text-[#ff7b72]">
        <h3 class="font-bold mb-2">❌ API Error</h3>
        <pre class="overflow-auto">{{ error }}</pre>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div class="lg:col-span-1 space-y-4">
          <div class="bg-[#161b22] border border-[#30363d] rounded p-4">
            <h3 class="text-xs uppercase tracking-widest text-gray-500 mb-3 font-bold">Course Meta</h3>
            <ul class="space-y-2">
              <li class="flex justify-between">
                <span class="text-gray-400">ID:</span>
                <span class="text-emerald-300">{{ data?.data?.id }}</span>
              </li>
              <li class="flex justify-between">
                <span class="text-gray-400">DocumentId:</span>
                <span class="text-emerald-300">{{ data?.data?.documentId }}</span>
              </li>
              <li class="flex justify-between">
                <span class="text-gray-400">Lessons Count:</span>
                <span class="text-white">{{ data?.data?.lessons?.length || 0 }}</span>
              </li>
            </ul>
          </div>

          <div class="bg-[#161b22] border border-[#30363d] rounded p-4">
            <h3 class="text-xs uppercase tracking-widest text-gray-500 mb-3 font-bold">Lessons Summary</h3>
            <div v-if="data?.data?.lessons?.length" class="space-y-2">
              <div v-for="(lesson, idx) in data.data.lessons" :key="idx" class="p-2 bg-[#0d1117] rounded border border-[#30363d] text-xs">
                <div class="font-bold text-white mb-1">{{ idx + 1 }}. {{ lesson.title }}</div>
                <div class="text-gray-500 truncate">ID: {{ lesson.documentId || lesson.id }}</div>

                <div class="mt-2 pt-2 border-t border-[#30363d] flex items-center gap-2">
                  <span class="text-gray-500">Video Hack:</span>
                  <span v-if="lesson.content?.includes('<!-- video-url:')" class="text-green-400 font-bold">DETECTED ✅</span>
                  <span v-else class="text-red-400 font-bold">MISSING ❌</span>
                </div>
              </div>
            </div>
            <div v-else class="text-gray-500 italic">No lessons found.</div>
          </div>
        </div>

        <div class="lg:col-span-2">
          <div class="bg-[#161b22] border border-[#30363d] rounded h-full flex flex-col">
            <div class="p-2 border-b border-[#30363d] bg-[#0d1117] rounded-t flex justify-between items-center">
              <span class="text-xs font-bold text-gray-500 px-2">FULL RESPONSE JSON</span>
            </div>
            <div class="flex-1 p-0 overflow-hidden">
              <pre class="w-full h-full p-4 overflow-auto text-xs text-[#a5d6ff] leading-relaxed custom-scroll">{{ JSON.stringify(data, null, 2) }}</pre>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scroll::-webkit-scrollbar {
  width: 12px;
  height: 12px;
}
.custom-scroll::-webkit-scrollbar-track {
  background: #0d1117;
}
.custom-scroll::-webkit-scrollbar-thumb {
  background-color: #30363d;
  border-radius: 6px;
  border: 3px solid #0d1117;
}
.custom-scroll::-webkit-scrollbar-thumb:hover {
  background-color: #8b949e;
}
</style>