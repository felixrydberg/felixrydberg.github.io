<script setup lang="ts">
import type { PropType } from 'vue';
import type { CollectionEntry } from 'astro:content';
import CommonTag from '@/components/common/tag.vue'
import { formatDate } from '@/utils/index';

  const props = defineProps({
    result: {
      type: Object,
      required: true,
    },
    loading: {
      // type: "lazy" || "eager" || undefined,
      required: false,
      default: 'lazy',
    }
  });
</script>

<template>
  <a class="flex group p-2 transition-colors duration-200 ease-in-out" :href="props.result.collection === 'projects' ? `/${result.collection}/${result.slug}` : `/${result.collection}#${result.slug}`">
    <div class="w-full">
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
      <div class="flex flex-wrap mt-2 gap-1 overflow-x-scroll">
        <common-tag
          v-for="(tag, index) in result.data.tags"
          :key="index"
          :tag="tag"
          :loading="loading"
        />
      </div>
    </div>
    <div class="flex-none flex justify-center items-center pl-1">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="stroke-current group-hover:stroke-black group-hover:dark:stroke-white">
        <line x1="5" y1="12" x2="19" y2="12" class="scale-x-0 group-hover:scale-x-100 translate-x-4 group-hover:translate-x-1 transition-all duration-200 ease-in-out" />
        <polyline points="12 5 19 12 12 19" class="translate-x-0 group-hover:translate-x-1 transition-all duration-200 ease-in-out" />
      </svg>
    </div>
  </a>
</template>
