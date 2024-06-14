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
    <div class="relative">
      <div
        class="absolute bottom-0 left-0 z-10 flex h-full w-full flex-col justify-between rounded-b-none bg-gradient-to-t from-slate-900 via-transparent to-transparent px-3 py-4 text-slate-50 transition-colors duration-1000 ease-in-out group-hover:from-black/80 group-hover:via-transparent group-hover:to-transparent xs:hidden"
      >
        <h2
          class="w-fit rounded bg-blue-600 px-2 py-1 text-sm font-medium text-white backdrop-blur-lg sm:text-base"
        >
          {{ autoridad.tipo_autoridad }} <span class="sr-only">Curacavi</span>
        </h2>
        <div>
          <h3 class="text-lg font-medium">
            {{ autoridad.persona.nombre }}
          </h3>
          <p class="break-all text-xs">
            {{ autoridad.persona.email }}
          </p>
        </div>
      </div>
      <div
        class="h-[300px] w-full xxs:h-[400px] xs:h-full xs:w-[120px] sm:w-[150px] md:w-[200px]"
      >
        <NuxtImg
          :src="autoridad.persona.image"
          :alt="autoridad.persona.nombre"
          class="aspect-[3/4] h-full w-full rounded-b-none rounded-t-md object-cover object-top group-hover:cursor-pointer xs:rounded-l-md xs:rounded-r-none md:aspect-auto"
        />
      </div>
    </div>
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
        <p class="line-clamp-1 break-all text-sm sm:text-base">
          {{ autoridad.persona.email }}
        </p>
      </div>

      <div class="mb-4 flex gap-3">
        <NuxtImg
          v-if="getCandidatura?.partido.image"
          :src="getCandidatura?.partido.image"
          :alt="autoridad.persona.nombre"
          class="h-12 w-12 min-w-12 rounded-full object-cover"
        />
        <NuxtImg
          v-else-if="getCandidatura?.pacto.image"
          :src="getCandidatura?.pacto.image"
          :alt="autoridad.persona.nombre"
          class="h-12 w-12 min-w-12 rounded-full object-cover"
        />
        <div
          v-else
          :alt="autoridad.persona.nombre"
          class="flex h-12 w-12 min-w-12 items-center justify-center rounded-full bg-blue-900 text-2xl font-semibold text-white"
        >
          {{ getCandidatura?.pacto.nombre.charAt(0) }}
        </div>
        <div>
          <p class="text-sm font-semibold">
            {{ getCandidatura?.pacto.nombre }}
          </p>
          <p class="text-sm">
            {{ getCandidatura?.partido.nombre }}
          </p>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
