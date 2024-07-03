<script setup lang="ts">
import MyCustomParagraph from "~/components/content/MyCustomParagraph.vue";
import MyCustomH5 from "~/components/content/MyCustomH5.vue";
import MyCustomH1 from "~/components/content/MyCustomH1.vue";
import type { BlogItem } from "~/types/blog";

const config = useRuntimeConfig();
const route = useRoute();
const id = computed(() => Number(route.params.id));
const blogStore = useBlogStore();

const getComponentType = (tag: string) => {
  switch (tag) {
    case "h5":
      return MyCustomH5;
      break;
    case "h1":
      return MyCustomH1;
      break;
    case "p":
      return MyCustomParagraph;
      break;

    default:
      return MyCustomParagraph;
      break;
  }
};

watch(
  () => route.params.id,
  (newId, oldId) => {
    blogStore.fetchBlogItemById(Number(newId));
  },
  { immediate: true },
);
</script>
<template>
  <div v-if="blogStore.selectedBlog">
    <NuxtImg
      :src="blogStore.selectedBlog.imagen"
      loading="lazy"
      class="h-80 w-full rounded object-cover lg:h-[400px] xl:h-[500px]"
    />
    <component
      :is="getComponentType(elemento.tag)"
      v-for="elemento in blogStore.selectedBlog.elementos"
    >
      {{ elemento.contenido }}
    </component>
  </div>
</template>
