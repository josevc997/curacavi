<script setup lang="ts">
import MyCustomParagraph from "~/components/content/MyCustomParagraph.vue";
import MyCustomH5 from "~/components/content/MyCustomH5.vue";
import MyCustomH1 from "~/components/content/MyCustomH1.vue";
import CarouselCandidatura from "~/components/content/CarouselCandidatura.vue";
import type { BlogItem } from "~/types/blog";
import OrderedList from "~/components/content/OrderedList.vue";

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
    case "CarouselCandidatura":
      return CarouselCandidatura;
      break;
    case "ol":
      return OrderedList;
      break;

    default:
      return MyCustomParagraph;
      break;
  }
};

watch(
  () => route.params,
  async (newId, oldId) => {
    const id = newId.id;
    blogStore.fetchBlogItemById(Number(id));
  },
  { immediate: true },
);
useHead({
  title: () =>
    blogStore.selectedBlog?.titulo
      ? `${blogStore.selectedBlog?.titulo}`
      : `Noticia`,
});
</script>
<template>
  <div v-if="blogStore.selectedBlog">
    <NuxtImg
      v-if="blogStore.selectedBlog.imagen"
      :src="blogStore.selectedBlog.imagen"
      loading="lazy"
      :alt="blogStore.selectedBlog.titulo"
      class="h-80 w-full rounded object-cover lg:h-[400px] xl:h-[500px]"
    />
    <!-- <div
      v-else
      class="flex h-80 w-full items-center justify-center rounded bg-slate-400 object-cover lg:h-[400px] xl:h-[500px]"
    >
      <p class="text-5xl font-semibold">No Image</p>
    </div> -->
    <component
      :is="getComponentType(elemento.tag)"
      :elemento="elemento"
      v-for="elemento in blogStore.selectedBlog.elementos"
    >
      {{ elemento.contenido }}
    </component>
  </div>
</template>
