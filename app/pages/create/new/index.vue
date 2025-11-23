<script setup lang="ts">
import { ref } from 'vue';
import bgImage from '/img/new-course.jpg';
import StepName from '~/components/courseWizard/StepName.vue';
import StepCoverImage from '~/components/courseWizard/StepCoverImage.vue';
import StepDescription from '~/components/courseWizard/StepDescription.vue';
import StepTags from '~/components/courseWizard/StepTags.vue';
import StepReview from '~/components/courseWizard/StepReview.vue';

definePageMeta({
  layout: 'default',
});

// State
const currentStep = ref(0);
const slideDirection = ref('');
const loading = ref(false);
const error = ref<string | null>(null);

const formData = ref({
  name: '',
  coverImage: null as File | null,
  coverImagePreview: null as string | null,
  description: '',
  tags: [] as string[],
});

const totalSteps = 5;

const handleNext = () => {
  if (currentStep.value < totalSteps - 1) {
    slideDirection.value = 'next';
    setTimeout(() => {
      currentStep.value++;
      slideDirection.value = '';
    }, 300);
  }
};

const handleBack = () => {
  if (currentStep.value > 0) {
    slideDirection.value = 'back';
    setTimeout(() => {
      currentStep.value--;
      slideDirection.value = '';
    }, 300);
  }
};

async function handleCreateCourse() {
  if (currentStep.value !== totalSteps - 1) return;

  loading.value = true;
  error.value = null;

  try {

    const submissionData = new FormData();
    submissionData.append('name', formData.value.name);
    submissionData.append('description', formData.value.description);

    if (formData.value.coverImage) {
      submissionData.append('coverImage', formData.value.coverImage);
    }
    submissionData.append('tags', JSON.stringify(formData.value.tags));

    const newCourse = await $fetch<any>('/api/courses/create', {
      method: 'POST',
      body: submissionData,
    });

    const courseId = newCourse.documentId || newCourse.id;

    if (courseId) {
      await navigateTo(`/course/edit/${courseId}`);
    } else {
      throw new Error('Course created but no ID returned');
    }

  } catch (err: any) {
    const specificMessage = err.data?.error?.message || err.statusMessage;
    error.value = specificMessage || err.message || 'Failed to create course.';
    console.error('Creation error:', err);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <main
      class="h-screen w-screen flex lg:flex-row flex-col gap-2 mx-auto overflow-hidden"
      :style="{ backgroundImage: `url(${bgImage})` }">
    <div
        class="h-full w-full justify-center items-center flex flex-col gap-2 px-4 py-6 lg:px-0 lg:py-0">
      <Card
          additional-classes="flex flex-col w-full sm:w-max sm:min-w-sm max-w-xl bg-black/40! text-neutral-950/10! backdrop-blur-sm">
        <form @submit.prevent="handleCreateCourse" class="w-full flex flex-col h-full">
          <div class="relative pb-4 w-full flex-grow">
            <StepName
                v-show="currentStep === 0"
                v-model="formData.name"
                :slide-direction="slideDirection"
                :is-active="currentStep === 0" />

            <StepCoverImage
                v-show="currentStep === 1"
                v-model:cover-image="formData.coverImage"
                v-model:cover-image-preview="formData.coverImagePreview"
                :slide-direction="slideDirection"
                :is-active="currentStep === 1" />

            <StepDescription
                v-show="currentStep === 2"
                v-model="formData.description"
                :slide-direction="slideDirection"
                :is-active="currentStep === 2" />

            <StepTags
                v-show="currentStep === 3"
                v-model="formData.tags"
                :slide-direction="slideDirection"
                :is-active="currentStep === 3" />

            <StepReview
                v-show="currentStep === 4"
                :form-data="formData"
                :slide-direction="slideDirection"
                :is-active="currentStep === 4" />
          </div>

          <div v-if="error" class="px-6 pb-2 text-center">
            <p class="text-red-400 text-xs sm:text-sm bg-red-900/20 py-1 px-2 rounded border border-red-500/30">
              {{ error }}
            </p>
          </div>

          <div>
            <div class="flex items-center justify-center gap-2 mb-4">
              <div
                  v-for="index in totalSteps"
                  :key="index"
                  class="h-2 rounded-full transition-all duration-300"
                  :class="index - 1 === currentStep ? 'w-8 bg-white' : 'w-2 bg-white/40'" />
            </div>

            <div class="w-full flex items-center justify-center gap-4">
              <Button
                  type="button"
                  variant="clear"
                  @click="handleBack"
                  :disabled="currentStep === 0 || loading"
                  :class="{ 'opacity-40 cursor-not-allowed': currentStep === 0 || loading }">
                Back
              </Button>

              <Button
                  v-if="currentStep < totalSteps - 1"
                  type="button"
                  variant="solid"
                  @click="handleNext">
                Next
              </Button>

              <Button
                  v-else
                  type="submit"
                  variant="solid"
                  :disabled="loading"
                  class="grid place-items-center">
                <span v-if="!loading">Create & Edit</span>
                <Icon v-else name="lucide:loader-2" class="animate-spin w-3 h-3" />
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  </main>
</template>

<style scoped>
main {
  background-size: cover;
  background-position: center;
}
</style>