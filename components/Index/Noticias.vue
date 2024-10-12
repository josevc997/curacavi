<script setup lang="ts">
import type { BlogItem } from "~/types/blog";
defineProps<{
  blogList: BlogItem[];
  sectionTitle: string;
}>();
</script>
<template>
  <div>
    <h1 class="mb-4 text-3xl font-medium">{{ sectionTitle }}</h1>
    <div class="grid grid-cols-1 gap-4">
      <UCarousel
        :items="blogList"
        :key="blogList.length"
        v-slot="{ item: noticia }"
        :ui="{
          item: 'md:basis-1/3 basis-full rounded-md overflow-hidden snap-start pb-10',
        }"
        :prev-button="{
          color: 'white',
          icon: 'i-heroicons-arrow-left-20-solid',
          class: '-translate-y-14',
        }"
        :next-button="{
          color: 'white',
          icon: 'i-heroicons-arrow-right-20-solid',
          class: '-translate-y-14',
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
