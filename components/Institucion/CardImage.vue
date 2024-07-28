<script setup lang="ts">
import type { Institucion } from "~/types/institucion";
defineProps<{
  institucion: Institucion;
}>();
</script>
<template>
  <div class="relative">
    <div
      class="absolute bottom-0 left-0 z-10 flex h-full w-full flex-col justify-end rounded-b-none bg-gradient-to-t from-black/60 via-transparent to-transparent px-3 py-4 text-slate-50 transition-all duration-700 ease-in-out group-hover:from-black/80 group-hover:via-transparent group-hover:to-transparent"
    >
      <div>
        <h3 class="text-lg font-medium">
          {{ institucion.nombre }}
        </h3>
      </div>
    </div>
    <div class="h-[350px] w-full">
      <NuxtImg
        v-if="institucion.cover_image"
        :src="institucion.cover_image"
        :alt="institucion.nombre"
        :placeholder="[50, 25, 75, 5]"
        loading="lazy"
        format="webp"
        class="aspect-[3/4] h-full w-full rounded-b-none rounded-t-md object-cover object-top group-hover:cursor-pointer xs:rounded-l-md xs:rounded-r-none md:aspect-auto"
      />
      <div
        v-else
        class="flex aspect-[3/4] h-full w-full items-end justify-center rounded-b-none rounded-t-md bg-neutral-200 object-cover object-top group-hover:cursor-pointer xs:rounded-l-md xs:rounded-r-none md:aspect-auto"
      >
        <Icon name="emojione:bust-in-silhouette" class="size-64" />
      </div>
    </div>
  </div>
</template>
