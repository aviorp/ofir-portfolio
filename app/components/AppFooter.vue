<script setup lang="ts">
const { footer } = useAppConfig()
</script>

<template>
  <UFooter
    class="z-10 bg-default"
    :ui="{ root: 'justify-center', left: 'text-muted text-xs w-full text-center' }"
  >
    <template #left>
      {{ footer.credits }}
    </template>
  </UFooter>
</template>
