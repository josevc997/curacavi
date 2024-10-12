<script setup lang="ts">
const blogStore = useBlogStore();
const candidaturaStore = useCandidaturaStore();
blogStore.fetchFeaturedBlogList();
blogStore.fetchIndexSectionBlogList();
const router = useRouter();

const routeName = computed(() => {
  return router.currentRoute.value.name;
});

watch(
  routeName,
  (newValue) => {
    if (newValue === "index") {
      candidaturaStore.fetchUpdatedCandidaturas();
    }
  },
  { immediate: true },
);
</script>
<template>
  <div class="grid grid-cols-1 gap-8">
    <!-- <IndexBanner /> -->
    <IndexWeather />
    <IndexUpdatedCandidatos />
    <IndexNoticias
      :blog-list="blogStore.indexSectionBlogList"
      section-title="El Late de la Carola"
    />
    <IndexNoticias
      :blog-list="blogStore.featuredBlogList"
      section-title="Noticias Curacavi"
    />
  </div>
</template>
