<script setup lang="ts">
const blogStore = useBlogStore();
blogStore.fetchFeaturedBlogList();
</script>
<template>
  <div class="grid grid-cols-1 gap-8">
    <IndexBanner />
    <IndexWeather />
    <IndexNoticias :blog-list="blogStore.blogList" />
  </div>
</template>
