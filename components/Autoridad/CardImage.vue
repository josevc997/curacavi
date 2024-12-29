<script setup lang="ts">
import type { AutoridadWithCandidatura } from "~/types/candidato";

defineProps<{
  autoridad: AutoridadWithCandidatura;
}>();
</script>
<template>
  <div class="relative">
    <div
      class="absolute bottom-0 left-0 z-10 flex h-full w-full flex-col justify-between rounded-b-none bg-gradient-to-t from-slate-900 via-transparent to-transparent px-3 py-4 text-slate-50 transition-colors duration-1000 ease-in-out group-hover:from-black/80 group-hover:via-transparent group-hover:to-transparent"
    >
      <div class="flex flex-col gap-1">
        <div class="flex flex-wrap gap-1">
          <h2
            class="w-fit rounded bg-blue-600 px-2 py-1 text-sm font-medium text-white backdrop-blur-lg sm:text-base"
          >
            {{ autoridad.tipo_autoridad }} <span class="sr-only">Curacavi</span>
          </h2>
        </div>
      </div>
      <div>
        <h3 class="text-lg font-medium">
          {{ autoridad.persona.nombre }}
        </h3>
      </div>
    </div>
    <div class="h-[350px] w-full">
      <NuxtImg
        v-if="autoridad.persona.image"
        :src="autoridad.persona.image"
        :alt="autoridad.persona.nombre"
        :placeholder="[50, 25, 75, 5]"
        loading="lazy"
        format="webp"
        class="aspect-[3/4] h-full w-full rounded-b-none rounded-t-md object-cover object-top group-hover:cursor-pointer xs:rounded-l-md xs:rounded-r-none md:aspect-auto"
      />
      <div
        v-else
        class="flex aspect-[3/4] h-full w-full items-end justify-center rounded-b-none rounded-t-md bg-neutral-200 object-cover object-top group-hover:cursor-pointer xs:rounded-l-md xs:rounded-r-none md:aspect-auto"
      >
        <Icon name="emojione:bust-in-silhouette" class="size-64" />
      </div>
    </div>
  </div>
</template>
