<script setup lang="ts">
import type { AutoridadWithCandidatura, Candidatura } from "~/types/candidato";

const props = defineProps<{
  autoridad: AutoridadWithCandidatura;
}>();

const getCandidatura = computed(() => {
  let candidatura = null as null | Candidatura;
  for (const current_candidatura of props.autoridad.candidatura) {
    if (candidatura === null && current_candidatura.is_elected) {
      candidatura = current_candidatura;
    } else if (
      candidatura !== null &&
      current_candidatura.is_elected &&
      current_candidatura.fecha > candidatura.fecha
    ) {
      candidatura = current_candidatura;
    }
  }
  return candidatura;
});
</script>

<template>
  <NuxtLink
    :to="`/autoridad/${autoridad.id}`"
    class="group relative flex flex-col overflow-hidden rounded-md border border-slate-300 shadow transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md xs:flex-row"
    :key="autoridad.id"
  >
    <AutoridadCardImage :autoridad="autoridad" />
    <div
      class="grid-1 grid place-content-between gap-y-6 px-2 pt-2 xs:px-4 xs:pt-3"
    >
      <div class="hidden xs:grid">
        <h2
          class="w-fit rounded bg-blue-600 px-2 py-1 text-sm font-medium text-white backdrop-blur-lg sm:text-base"
        >
          {{ autoridad.tipo_autoridad }} <span class="sr-only">Curacavi</span>
        </h2>
        <h3 class="text-lg font-semibold tracking-wide sm:text-xl">
          {{ autoridad.persona.nombre }}
        </h3>
      </div>

      <AutoridadCardFooter
        v-if="getCandidatura"
        :autoridad="autoridad"
        :candidatura="getCandidatura"
      />
    </div>
  </NuxtLink>
</template>
