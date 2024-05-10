<script setup lang="ts">
import type { PropType } from 'vue';
import type { CollectionEntry } from 'astro:content';
import CommonTag from '@/components/common/tag.vue'

  const props = defineProps({
    result: {
      type: Object as PropType<CollectionEntry>,
      required: true,
    },
  });
</script>

<template>
  <a class="block p-2" :href="props.result.collection === 'projects' ? `/${result.collection}/${result.slug}` : `/${result.collection}#${result.slug}`">
    <div>
      <h1 class="text-lg">
        <span>
          {{ result.data.title }}
        </span>
        <span class="text-sm capitalize text-neutral-500 dark:text-neutral-400">
          - {{ result.collection }}
        </span>
      </h1>
      <p class="text-sm">{{ result.data.summary }}</p>
    </div>
    <div>
    </div>
    <div class="flex flex-wrap mt-2 gap-1 overflow-x-scroll">
      <common-tag
        v-for="(tag, index) in result.data.tags"
        :key="index"
        :tag="tag"
      />
    </div>
  </a>
</template>
