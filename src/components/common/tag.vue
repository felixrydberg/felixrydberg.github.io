<script setup lang="ts">
const props = defineProps({
  tag: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="flex flex-nowrap justify-start items-center p-1 px-2 rounded bg-neutral-200 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300">
    <img class="w-4 h-4 align-center aspect-square" :alt="`${tag} logo`" :src="`/icons/brands/${tag.replace(' ', '-').toLowerCase()}.svg`">
    <span class="block text-xs ml-2">{{ tag }}</span>
  </div>
</template>