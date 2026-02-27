<script setup lang="ts">
const route = useRoute()
const slug = computed(() => route.params.slug as string)

const { data: project } = await useAsyncData(`project-${slug.value}`, () => {
  return queryCollection('projects').where('stem', '=', `projects/${slug.value}`).first()
})

if (!project.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'פרויקט לא נמצא',
    fatal: true
  })
}

useSeoMeta({
  title: project.value?.title,
  ogTitle: project.value?.title,
  description: project.value?.description,
  ogDescription: project.value?.description,
  ogImage: project.value?.image
})

const selectedImage = ref<string | null>(null)

function openImage(src: string) {
  selectedImage.value = src
}

function closeImage() {
  selectedImage.value = null
}

onKeyStroke('Escape', closeImage)
</script>

<template>
  <UPage v-if="project">
    <UPageHero
      :ui="{
        title: '!mx-0 text-start',
        description: '!mx-0 text-start'
      }"
    >
      <template #title>
        <Motion
          :initial="{ opacity: 0, transform: 'translateY(10px)' }"
          :animate="{ opacity: 1, transform: 'translateY(0)' }"
          :transition="{ duration: 0.5 }"
        >
          {{ project.title }}
        </Motion>
      </template>

      <template #description>
        <Motion
          :initial="{ opacity: 0, transform: 'translateY(10px)' }"
          :animate="{ opacity: 1, transform: 'translateY(0)' }"
          :transition="{ duration: 0.5, delay: 0.1 }"
        >
          {{ project.description }}
        </Motion>
      </template>

      <template #links>
        <Motion
          :initial="{ opacity: 0, transform: 'translateY(10px)' }"
          :animate="{ opacity: 1, transform: 'translateY(0)' }"
          :transition="{ duration: 0.5, delay: 0.2 }"
        >
          <div class="flex flex-wrap items-center gap-3">
            <UButton
              to="/projects"
              color="neutral"
              variant="outline"
              icon="i-lucide-arrow-right"
              label="חזרה לפרויקטים"
            />
            <UBadge
              v-for="tag in project.tags"
              :key="tag"
              :label="tag"
              color="neutral"
              variant="subtle"
              size="md"
            />
          </div>
        </Motion>
      </template>
    </UPageHero>

    <UPageSection
      :ui="{
        container: '!pt-0'
      }"
    >
      <!-- Image Gallery -->
      <Motion
        v-if="project.images && project.images.length > 0"
        :initial="{ opacity: 0, transform: 'translateY(10px)' }"
        :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
        :transition="{ duration: 0.5 }"
        :in-view-options="{ once: true }"
      >
        <h2 class="text-xl font-semibold mb-6">
          גלריה
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          <Motion
            v-for="(img, index) in project.images"
            :key="img.src"
            :initial="{ opacity: 0, transform: 'scale(0.97)' }"
            :while-in-view="{ opacity: 1, transform: 'scale(1)' }"
            :transition="{ duration: 0.4, delay: 0.05 * index }"
            :in-view-options="{ once: true }"
          >
            <button
              class="w-full group cursor-zoom-in focus:outline-none"
              :aria-label="`הגדל תמונה: ${img.alt}`"
              @click="openImage(img.src)"
            >
              <img
                :src="img.src"
                :alt="img.alt"
                class="w-full h-56 object-cover rounded-xl ring-1 ring-default transition-all duration-300 group-hover:ring-2 group-hover:ring-primary group-hover:shadow-lg"
              >
            </button>
          </Motion>
        </div>
      </Motion>

      <!-- PDF Section -->
      <Motion
        v-if="project.pdfs && project.pdfs.length > 0"
        :initial="{ opacity: 0, transform: 'translateY(10px)' }"
        :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
        :transition="{ duration: 0.5 }"
        :in-view-options="{ once: true }"
      >
        <h2 class="text-xl font-semibold mb-6">
          קבצים להורדה וצפייה
        </h2>
        <div class="flex flex-col gap-10">
          <Motion
            v-for="(pdf, index) in project.pdfs"
            :key="pdf.src"
            :initial="{ opacity: 0, transform: 'translateY(10px)' }"
            :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
            :transition="{ duration: 0.4, delay: 0.1 * index }"
            :in-view-options="{ once: true }"
          >
            <div class="rounded-xl border border-default overflow-hidden">
              <div class="flex items-center justify-between px-4 py-3 bg-elevated border-b border-default">
                <div class="flex items-center gap-2">
                  <UIcon
                    name="i-lucide-file-text"
                    class="size-5 text-muted"
                  />
                  <span class="font-medium text-sm">{{ pdf.title }}</span>
                </div>
                <UButton
                  :to="pdf.src"
                  target="_blank"
                  download
                  color="neutral"
                  variant="ghost"
                  icon="i-lucide-download"
                  label="הורדה"
                  size="sm"
                />
              </div>
              <iframe
                :src="pdf.src"
                :title="pdf.title"
                class="w-full h-[600px] border-0"
                loading="lazy"
              />
            </div>
          </Motion>
        </div>
      </Motion>
    </UPageSection>

    <!-- Lightbox Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="selectedImage"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          @click.self="closeImage"
        >
          <button
            class="absolute top-4 end-4 text-white/80 hover:text-white transition-colors"
            aria-label="סגור"
            @click="closeImage"
          >
            <UIcon
              name="i-lucide-x"
              class="size-8"
            />
          </button>
          <img
            :src="selectedImage"
            alt="תמונה מוגדלת"
            class="max-h-[90vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
          >
        </div>
      </Transition>
    </Teleport>
  </UPage>
</template>
