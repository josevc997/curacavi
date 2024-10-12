<script setup lang="ts">
const blogStore = useBlogStore();
blogStore.fetchBlogList();
useHead({
  title: "Lista de noticias",
});
</script>
<template>
  <div>
    <h2 class="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
      Blog
    </h2>
    <p class="mt-2 text-lg leading-8 text-gray-600">
      Datos, opiniones y noticias sobre la comuna de Curacavi.a
    </p>
    <div
      class="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mt-8 lg:grid-cols-3"
    >
      <template v-if="blogStore.blogList">
        <BlogIndexCard
          v-for="(blogItem, index) in blogStore.blogList"
          :noticia="blogItem"
          class=""
        />
      </template>
    </div>
  </div>
</template>
