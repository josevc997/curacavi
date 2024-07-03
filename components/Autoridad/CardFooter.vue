<script setup lang="ts">
import type { AutoridadWithCandidatura, Candidatura } from "~/types/candidato";
defineProps<{
  autoridad: AutoridadWithCandidatura;
  candidatura: Candidatura;
}>();
</script>
<template>
  <div class="mb-2 flex gap-3">
    <NuxtImg
      v-if="candidatura.partido.image"
      :src="candidatura.partido.image"
      :alt="autoridad.persona.nombre"
      loading="lazy"
      class="h-12 w-12 min-w-12 rounded-full object-cover"
    />
    <NuxtImg
      v-else-if="candidatura.pacto.image"
      :src="candidatura.pacto.image"
      :alt="autoridad.persona.nombre"
      loading="lazy"
      class="h-12 w-12 min-w-12 rounded-full object-cover"
    />
    <div
      v-else
      :alt="autoridad.persona.nombre"
      class="flex h-12 w-12 min-w-12 items-center justify-center rounded-full bg-blue-900 text-2xl font-semibold text-white"
    >
      {{ candidatura.pacto.nombre.charAt(0) }}
    </div>
    <div>
      <p class="text-sm font-semibold">
        {{ candidatura.partido.nombre }}
      </p>
      <p class="line-clamp-1 text-sm text-neutral-500">
        {{ candidatura.pacto.nombre }}
      </p>
    </div>
  </div>
</template>
