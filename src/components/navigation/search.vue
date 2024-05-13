<script setup lang="ts">
  import type { CollectionEntry } from 'astro:content';
  import { navigate } from 'astro:transitions/client';
  import CommonProjectListItem from '@/components/common/project-list-item.vue';
  import type { PropType } from 'vue';
  import { ref, watch, onMounted } from 'vue'
  import Fuse from 'fuse.js';

  const props = defineProps({
    data: {
      type: Array as PropType<CollectionEntry[]>,
      required: true,
    }
  });

  /**
   * Search
   */

  const fuse = new Fuse(props.data, {
    keys: ['slug', 'data.title', 'data.description', 'data.tags'],
  })

  const search = ref('');
  const dialog = ref(false);
  const active = ref(0);
  const input = ref<HTMLInputElement | undefined>();
  const results = ref(props.data);

  const handleClick = (event: MouseEvent) => {
    if ((event.target as HTMLElement || null)?.classList.contains('slot-container')) {
      return
    }
    if (dialog.value) {
      search.value = '';
      results.value = props.data;
    }
    dialog.value = !dialog.value;
    input.value?.focus();
  }

  watch(search, (value: string) => {
    if (value[0] === '/') {
      console.log('Commands')
    }

    if (search.value.length < 2) {
      results.value = props.data;
    } else {
      results.value = fuse.search(value).map((result) => result.item);
      active.value = 0;
    }
  })

  onMounted(() => {
    document.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        return dialog.value = false;
      }

      // Ctrl commands
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case 'k':
            event.preventDefault();
            dialog.value = !dialog.value;
            input.value?.focus();
            
            break;
        }
      } else {
        // Allow navigation in search results
        const prevActive = active.value;
        switch (event.key) {
          case 'ArrowDown':
            event.preventDefault();
            active.value = Math.min(active.value + 1, results.value.length - 1);

            break;
          case 'ArrowUp':
            event.preventDefault();
            active.value = Math.max(active.value - 1, 0);
            break;
          case 'Enter':
            if (results.value.length > 0) {
              navigate(`/${results.value[active.value].collection}/${results.value[active.value].slug}`);
            }
            break;
        
        }
        if (prevActive !== active.value) {
          const element = document.getElementById(`search-${results.value[active.value].collection}-${results.value[active.value].slug}`);
          element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });
  });
</script>

<template>
  <div class="flex justify-center items-center slot-container" @click="handleClick">
    <slot></slot>
  </div>
  <dialog class="fixed h-screen w-screen z-50" :open="dialog" @click="handleClick">
    <div class="fixed h-screen w-screen flex opacity-50 bg-neutral-400 dark:bg-neutral-950"></div>
    <div class="fixed h-screen w-screen flex justify-center content-center pt-40 transition-all">
      <div class="flex flex-col h-4/5 md:h-1/2 w-4/5 md:w-1/2 bg-neutral-100 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg" @click.stop>
        <div class="m-2 flex items-center justify-center p-1 border bg-transparent border-neutral-300 dark:border-neutral-800 rounded">
          <input class="p-2 outline-none w-full bg-transparent" placeholder="Keywords... (Vue, Tailwind)" ref="input" v-model="search" type="text" />
        </div>
        <div class="flex h-full m-2 mt-0 flex-col overflow-y-scroll">
          <div v-if="results.length === 0" class="flex justify-center items-center h-full">
            <p class="text-center text-neutral-500 dark:text-neutral-400">No results found</p>
          </div>
          <common-project-list-item
            v-for="(result, index) in results"
            class="my-1 mr-2 rounded border-2"
            :class="active === index ? ' border-neutral-200 dark:border-neutral-800' : 'border-neutral-100 dark:border-neutral-950'"
            @mouseover="active = index"
            :id="`search-${result.collection}-${result.slug}`"
            :result="result"
          />
        </div>
      </div>
    </div>
  </dialog>

</template>
