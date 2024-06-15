<script setup lang="ts">
import type { AutoridadWithCandidatura } from "~/types/candidato";
defineProps<{
  autoridad: AutoridadWithCandidatura;
}>();
</script>
<template>
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
      </div>
    </div>
    <div
      class="h-[350px] w-full xxs:h-[400px] xs:h-full xs:w-[120px] sm:w-[150px] md:w-[200px]"
    >
      <NuxtImg
        :src="autoridad.persona.image"
        :alt="autoridad.persona.nombre"
        class="aspect-[3/4] h-full w-full rounded-b-none rounded-t-md object-cover object-top group-hover:cursor-pointer xs:rounded-l-md xs:rounded-r-none md:aspect-auto"
      />
    </div>
  </div>
</template>
