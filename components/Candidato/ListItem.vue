<script setup lang="ts">
import type { CandidaturaWithPersona } from "~/types/candidato";

defineProps<{
  candidato: CandidaturaWithPersona;
}>();
</script>
<template>
  <NuxtLink
    :to="`/candidato/${candidato.id}`"
    class="group relative flex gap-4 overflow-hidden shadow-slate-950 transition-all duration-300 ease-in-out hover:shadow-md"
    :key="candidato.id"
  >
    <div>
      <NuxtImg
        v-if="candidato.persona.image"
        :src="candidato.persona.image"
        :alt="candidato.persona.nombre"
        class="size-32 object-cover object-center md:size-28"
      />
      <div
        v-else
        class="flex size-32 items-end justify-center bg-neutral-200 object-cover object-top group-hover:cursor-pointer md:aspect-auto md:size-28"
      >
        <Icon name="emojione:bust-in-silhouette" class="size-20" />
      </div>
    </div>
    <div class="w-1/2 py-4">
      <div class="flex gap-2">
        <p
          class="border-primary-600 text-primary-600 w-fit rounded border bg-white px-2 py-1 text-sm font-medium leading-none"
        >
          {{ candidato.tipo_autoridad }}
        </p>
        <CandidatoBadge v-if="candidato.is_elected" :candidato="candidato" />
      </div>
      <h3 class="text-normal font-semibold lg:text-xl">
        {{ candidato.persona.nombre }}
      </h3>
      <p class="">
        {{ candidato.partido.nombre }}
      </p>
    </div>
    <div v-if="false" class="hidden p-4 lg:block">
      <p class="font-semibold capitalize lg:text-xl">
        {{ candidato.partido.nombre.toLowerCase() }}
      </p>
      <p class="capitalize">
        {{ candidato.pacto.nombre.toLowerCase() }}
      </p>
    </div>
  </NuxtLink>
</template>
