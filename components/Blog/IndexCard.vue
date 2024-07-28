<script setup lang="ts">
import type { BlogItem } from "~/types/blog";
defineProps<{
  noticia: BlogItem;
}>();
</script>
<template>
  <NuxtLink
    :to="`/blog/${noticia.id}/`"
    class="group overflow-hidden rounded-md border shadow transition-all duration-300 ease-in-out hover:shadow-lg"
  >
    <div class="relative">
      <NuxtImg
        :src="noticia.imagen ? noticia.imagen : 'https://placehold.co/600x400'"
        loading="lazy"
        :alt="noticia.titulo"
        class="h-64 w-full object-cover"
      />
      <div
        class="absolute bottom-0 flex h-full w-full flex-col justify-end bg-gradient-to-t from-black/70 via-transparent to-transparent p-2 text-white"
      >
        <h3 class="line-clamp-2 text-lg font-semibold">
          {{ noticia.titulo }}
        </h3>
      </div>
    </div>
    <div class="grid grid-cols-1 gap-1 p-2">
      <time :datetime="noticia.fecha_creacion" class="text-xs text-gray-500">
        {{ useDateFormat(noticia.fecha_creacion, "MMMM DD, YYYY").value }}
      </time>
      <p class="line-clamp-3 text-base">
        {{ noticia.resumen }}
      </p>
      <div class="flex flex-wrap">
        <div
          v-for="item in noticia.categoria"
          class="rounded-full bg-blue-600/80 px-2 py-1 text-sm font-medium text-white hover:bg-blue-600"
        >
          {{ item.nombre }}
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
