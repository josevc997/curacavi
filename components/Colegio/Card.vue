<script setup lang="ts">
import type { Colegio } from "~/types/colegio";

const { toTitleCase } = useTextUtils();

defineProps<{
  colegio: Colegio;
}>();
</script>
<template>
  <NuxtLink
    :to="`/colegio/${colegio.id}`"
    :key="colegio.rbd"
    class="overflow-hidden rounded-md border border-slate-300"
  >
    <div class="group relative overflow-hidden rounded-md shadow">
      <NuxtImg
        class="aspect-[3/2] w-full rounded-md object-cover transition-all duration-500 ease-in-out group-hover:scale-105"
        :src="
          colegio.cover_image ??
          'https://curacavi.s3.amazonaws.com/colegios/placeholder-school.jpg'
        "
        loading="lazy"
        :alt="colegio.nombre"
      />
      <div
        class="absolute left-2 top-2 flex w-fit items-center gap-x-1 rounded bg-blue-600 px-2 py-1 text-white"
      >
        <Icon name="heroicons:currency-dollar-20-solid" class="h-5 w-5" />
        <p>
          {{ toTitleCase(colegio.dependencia_principal) }}
        </p>
      </div>
      <div
        class="absolute bottom-0 flex h-3/4 w-full flex-col justify-end rounded-md bg-gradient-to-t from-black via-transparent to-transparent p-2 text-white transition-all duration-500 ease-in"
      >
        <div>
          <h3 class="text-xl font-medium leading-5 tracking-tight">
            {{ toTitleCase(colegio.nombre) }}
          </h3>
          <p
            v-if="colegio.direccion"
            class="text-sm font-normal text-slate-200"
          >
            {{ toTitleCase(colegio.direccion) }}
          </p>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
