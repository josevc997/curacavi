<script setup lang="ts">
import type { BlogItem } from "~/types/blog";
defineProps<{
  blogList: BlogItem[];
}>();
</script>
<template>
  <div>
    <h1 class="mb-4 text-3xl font-medium">Noticias Curacaví</h1>
    <div class="grid grid-cols-1 gap-4">
      <UCarousel
        :items="blogList"
        :key="blogList.length"
        v-slot="{ item: noticia }"
        :ui="{
          item: 'md:basis-1/3 basis-full rounded-md overflow-hidden snap-start',
          indicators: {
            wrapper: 'bottom-2',
          },
        }"
        :prev-button="{
          color: 'primary',
          icon: 'i-heroicons-arrow-left-20-solid',
          class:
            'relative left-auto top-auto transform translate-y-0 rounded-none mt-1 rounded z-10 !text-white',
        }"
        :next-button="{
          color: 'primary',
          icon: 'i-heroicons-arrow-right-20-solid',
          class:
            'relative right-auto md:mr-2 top-0 transform translate-y-0 rounded-none mt-1 rounded z-10 !text-white',
        }"
        class="overflow-hidden"
        arrows
        indicators
      >
        <BlogIndexCard :noticia="noticia" class="md:mx-2 md:first:ml-0" />
      </UCarousel>
    </div>
  </div>
</template>
