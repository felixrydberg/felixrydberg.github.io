<script setup lang="ts">
import type { CollectionEntry } from 'astro:content';
import type { PropType } from 'vue';
import { ref } from 'vue'
import CommonProjectListItem from '@/components/common/project-list-item.vue';
import CommonTag from '@/components/common/tag.vue';

const props = defineProps({
  data: {
    type: Array as PropType<CollectionEntry[]>,
    required: true,
  },
  tags: {
    type: Array as PropType<string[]>,
    required: true,
  }
});

const tags = new Set<string>();
const results = ref(props.data);
const handleClick = (event: MouseEvent) => {
  const target = event.target as HTMLInputElement;
  if (target.type === 'checkbox') {
    if (target.checked) {
      tags.add(target.value);
    } else {
      tags.delete(target.value);
    }
  }

  if (tags.size === 0) {
    results.value = props.data;
  } else {
    // Filter props.data to only include items that have all active tags
    results.value = props.data.filter((item) => {
      const array = Array.from(tags);
      for (let i = 0; i < array.length; i++) {
        const tag = array[i];
        if (item.data.tags.includes(tag)) {
          continue;
        } else {
          return false;
        }
      }
      return true;
    });
  }
};
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
    <div class="col-span-3 sm:col-span-1">
      <div>

      </div>
      <ul class="flex flex-wrap w-full gap-y-2 md:sticky md:top-24" @click="handleClick">
        <li
          v-for="tag in props.tags"
          :key="`common-filter-${tag}`"
          class="w-full p-1 px-2 flex rounded bg-neutral-200 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300"
        >
          <input type="checkbox" :id="tag" :value="tag" />
          <label 
            :for="tag"
            class="w-full"
          >
            <common-tag :tag="tag" loading="eager" />
          </label>
        </li>
      </ul>
    </div>
    <div class="col-span-3 sm:col-span-2">
      <div class="flex h-full flex-col gap-y-2">
        <div v-if="results.length === 0" class="flex justify-center items-center h-full">
          <p class="text-center text-neutral-500 dark:text-neutral-400">No results found</p>
        </div>
        <common-project-list-item
          v-for="result in results"
          class="rounded border-2 border-neutral-200 dark:border-neutral-800"
          :id="`filter-${result.collection}-${result.slug}`"
          :result="result"
          loading="eager"
        />
      </div>
    </div>
  </div>
</template>
