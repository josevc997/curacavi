<script setup lang="ts">
import type { Candidatura } from "~/types/candidato";
defineProps<{
  candidatura: Candidatura;
}>();
</script>
<template>
  <div class="mb-2 flex gap-3">
    <NuxtImg
      v-if="candidatura.partido.image"
      :src="candidatura.partido.image"
      :alt="candidatura.partido.nombre"
      loading="lazy"
      class="size-10 h-12 w-12 min-w-12 rounded-full shadow outline outline-1 outline-black/10"
    />
    <NuxtImg
      v-else-if="candidatura.pacto.image"
      :src="candidatura.pacto.image"
      :alt="candidatura.pacto.nombre"
      loading="lazy"
      class="size-10 h-12 w-12 min-w-12 rounded-full shadow outline outline-1 outline-black/10"
    />
    <div
      v-else
      :alt="candidatura.partido.nombre"
      class="flex h-12 w-12 min-w-12 items-center justify-center rounded-full bg-blue-900 text-2xl font-semibold text-white shadow outline outline-1 outline-black/10"
    >
      {{ candidatura.pacto.nombre.charAt(0) }}
    </div>
    <div>
      <p class="line-clamp-1 text-sm font-semibold">
        {{ candidatura.partido.nombre }}
      </p>
      <p class="line-clamp-1 text-sm text-neutral-500">
        {{ candidatura.pacto.nombre }}
      </p>
    </div>
  </div>
</template>
