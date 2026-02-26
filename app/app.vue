<script setup lang="ts">
const colorMode = useColorMode()

const color = computed(() => colorMode.value === 'dark' ? '#020618' : 'white')

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700&display=swap' }
  ],
  htmlAttrs: {
    lang: 'he',
    dir: 'rtl'
  }
})

useSeoMeta({
  titleTemplate: '%s - תיק עבודות',
  ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/portfolio-light.png',
  twitterImage: 'https://ui.nuxt.com/assets/templates/nuxt/portfolio-light.png',
  twitterCard: 'summary_large_image'
})

</script>

<template>
  <UApp>
    <NuxtLayout>
      <UMain class="relative">
        <NuxtPage />
      </UMain>
    </NuxtLayout>

  </UApp>
</template>
