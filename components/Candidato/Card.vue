<script setup lang="ts">
import type { CandidaturaWithPersona } from "~/types/candidato";

defineProps<{
  candidato: CandidaturaWithPersona;
}>();
</script>
<template>
  <div
    class="overflow-hidden rounded border border-gray-400/60 shadow transition-all duration-300 ease-in-out hover:shadow-lg"
  >
    <div>
      <!-- <div class="absolute left-0 top-0 p-2">
        <div class="rounded-md border border-slate-600 bg-white p-2 shadow">
          {{ candidato.partido }}
        </div>|
        <div class="rounded-md border border-slate-600 bg-white p-2 shadow">
          {{ candidato.pacto }}
        </div>|
      </div> -->
      <NuxtImg
        :src="candidato.Persona.image"
        loading="lazy"
        format="webp"
        class="aspect-[9/11] w-full object-cover object-center"
      />
    </div>
    <div class="p-2">
      <h5 class="text-base font-medium capitalize leading-none">
        {{ candidato.tipo_autoridad }}
      </h5>
      <h4 class="text-xl leading-6">
        {{ candidato.Persona.nombre }}
      </h4>
      <!--
      <h6 class="text-sm font-medium">Partido</h6>
      <p class="text-sm capitalize">
        {{ candidato.partido.nombre.toLowerCase() }}
      </p>
      <h6 class="text-sm font-medium">Pacto</h6>
      <p class="text-sm capitalize">
        {{ candidato.pacto.nombre.toLowerCase() }}
      </p> -->
      <p>a</p>
    </div>
  </div>
</template>
