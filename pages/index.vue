<script setup lang="ts">
const blogStore = useBlogStore();
const candidaturaStore = useCandidaturaStore();
blogStore.fetchFeaturedBlogList();
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
    <IndexBanner />
    <IndexWeather />
    <IndexNoticias :blog-list="blogStore.blogList" />
    <IndexUpdatedCandidatos />
  </div>
</template>
