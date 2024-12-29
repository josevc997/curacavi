<script setup lang="ts">
import type { AutoridadWithCandidatura } from "~/types/candidato";

const props = defineProps<{
  autoridad: AutoridadWithCandidatura;
}>();
</script>

<template>
  <NuxtLink
    :to="`/autoridad/${autoridad.id}`"
    class="group relative flex flex-col overflow-hidden rounded-md border border-slate-300 shadow transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md"
    :key="autoridad.id"
  >
    <AutoridadCardImage :autoridad="autoridad" />
    <div
      class="grid-1 grid place-content-between gap-y-6 px-2 pt-2 xs:px-4 xs:pt-3"
    >
      <AutoridadCardFooter v-if="autoridad" :autoridad="autoridad" />
    </div>
  </NuxtLink>
</template>
