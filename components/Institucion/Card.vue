<script setup lang="ts">
import type { Institucion } from "~/types/institucion";
defineProps<{
  institucion: Institucion;
}>();
</script>
<template>
  <NuxtLink
    :to="`/institucion/${institucion.id}`"
    class="group relative flex flex-col overflow-hidden rounded-md border border-slate-300 shadow transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md"
    :key="institucion.id"
  >
    <InstitucionCardImage :institucion="institucion" />
    <!-- <div
      class="grid-1 grid place-content-between gap-y-6 px-2 pt-2 xs:px-4 xs:pt-3"
    >
      <CandidatoCardFooter v-if="candidato" :candidatura="candidato" />
    </div> -->
  </NuxtLink>
</template>
