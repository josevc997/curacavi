<script setup lang="ts">
import type { AutoridadWithCandidatura } from "~/types/candidato";
defineProps<{
  autoridad: AutoridadWithCandidatura;
}>();
</script>
<template>
  <div class="mb-2 flex gap-3">
    <NuxtImg
      v-if="autoridad.candidatura[0].partido.image"
      :src="autoridad.candidatura[0].partido.image"
      :alt="autoridad.candidatura[0].partido.nombre"
      loading="lazy"
      class="size-10 h-12 w-12 min-w-12 rounded-full shadow outline outline-1 outline-black/10"
    />
    <NuxtImg
      v-else-if="autoridad.candidatura[0].pacto.image"
      :src="autoridad.candidatura[0].pacto.image"
      :alt="autoridad.candidatura[0].pacto.nombre"
      loading="lazy"
      class="size-10 h-12 w-12 min-w-12 rounded-full shadow outline outline-1 outline-black/10"
    />
    <div
      v-else
      :alt="autoridad.candidatura[0].partido.nombre"
      class="flex h-12 w-12 min-w-12 items-center justify-center rounded-full bg-blue-900 text-2xl font-semibold text-white shadow outline outline-1 outline-black/10"
    >
      {{ autoridad.candidatura[0].pacto.nombre.charAt(0) }}
    </div>
    <div>
      <p class="line-clamp-1 text-sm font-semibold">
        {{ autoridad.candidatura[0].partido.nombre }}
      </p>
      <p class="line-clamp-1 text-sm text-neutral-500">
        {{ autoridad.candidatura[0].pacto.nombre }}
      </p>
    </div>
  </div>
</template>
