<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps({
  error: {
    type: Object as PropType<NuxtError>,
    required: true
  }
})

useHead({
  htmlAttrs: {
    lang: 'he',
    dir: 'rtl'
  }
})

useSeoMeta({
  title: 'הדף לא נמצא',
  description: 'מצטערים, הדף המבוקש לא נמצא.'
})

</script>

<template>
  <div>
    <AppHeader :links="navLinks" />

    <UMain>
      <UContainer>
        <UPage>
          <UError :error="error" />
        </UPage>
      </UContainer>
    </UMain>

    <AppFooter />

    <UToaster />
  </div>
</template>
