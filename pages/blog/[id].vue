<script setup lang="ts">
import MyCustomParagraph from "~/components/content/MyCustomParagraph.vue";
import MyCustomH5 from "~/components/content/MyCustomH5.vue";
import MyCustomH1 from "~/components/content/MyCustomH1.vue";
import CarouselCandidatura from "~/components/content/CarouselCandidatura.vue";
import OrderedList from "~/components/content/OrderedList.vue";
import IFrame from "~/components/content/IFrame.vue";

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
    case "iframe":
      return IFrame;
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
definePageMeta({
  layout: "small-board",
});
</script>
<template>
  <div v-if="blogStore.selectedBlog">
    <div
      v-if="blogStore.selectedBlog.show_imagen"
      class="mb-2 flex items-center justify-center"
    >
      <NuxtImg
        v-if="blogStore.selectedBlog.imagen"
        :src="blogStore.selectedBlog.imagen"
        loading="lazy"
        :alt="blogStore.selectedBlog.titulo"
        class="aspect-video w-full rounded object-cover"
      />
    </div>
    <template v-for="elemento in blogStore.selectedBlog.elementos">
      <div
        v-if="elemento.tag === 'iframe' && elemento.contenido === 'Not Found'"
        class="relative mx-auto flex aspect-video w-full max-w-[500px] items-center justify-center rounded"
      >
        <NuxtImg
          :src="blogStore.selectedBlog.imagen"
          loading="lazy"
          :alt="blogStore.selectedBlog.titulo"
          class="mx-auto flex aspect-video w-full max-w-[500px] items-center justify-center rounded object-cover"
        />
        <div
          class="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black/40"
        >
          <p class="text-center text-xl font-bold tracking-wider text-white">
            Video no encontrado
          </p>
        </div>
      </div>
      <component
        v-else
        :is="getComponentType(elemento.tag)"
        :elemento="elemento"
      >
        {{ elemento.contenido }}
      </component>
    </template>
  </div>
</template>
