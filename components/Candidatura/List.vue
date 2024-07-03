<script setup lang="ts">
import type { Candidatura } from "~/types/candidato";
defineProps<{
  candidaturasList: Candidatura[];
}>();
</script>
<template>
  <div
    class="rounded-md bg-white p-2 shadow outline outline-1 outline-neutral-600/10"
  >
    <div
      v-for="item in candidaturasList"
      class="grid grid-cols-12 gap-x-4 gap-y-2 md:gap-y-4"
    >
      <div class="col-span-2 flex items-center justify-center lg:col-span-1">
        <NuxtImg
          v-if="item.partido.image || item.pacto.image"
          :src="item.partido.image || item.pacto.image"
          alt="Foto de perfil"
          loading="lazy"
          class="size-10 rounded-full shadow outline outline-1 outline-slate-600/10"
        />
        <div
          v-else
          :alt="item.partido.nombre"
          class="flex size-10 items-center justify-center rounded-full bg-blue-900 text-2xl font-semibold text-white shadow outline outline-1 outline-slate-600/10"
        >
          {{ item.pacto.nombre.charAt(0) }}
        </div>
      </div>
      <div class="col-span-10 break-words md:col-span-7 lg:col-span-8">
        <h2 class="text-base font-semibold">{{ item.partido.nombre }}</h2>
        <p class="text-sm">{{ item.pacto.nombre }}</p>
        <p class="text-sm">{{ item.votos }} Votos ({{ item.porcentaje }}%)</p>
      </div>
      <div
        class="col-span-10 col-start-3 flex items-end justify-between md:col-span-3 md:flex-col md:items-end md:justify-center"
      >
        <div>
          <h3 class="text-base font-medium">
            {{ item.tipo_autoridad }}
          </h3>
          <p class="font-medium">
            {{ item.fecha.slice(0, 4) }}
          </p>
        </div>
        <div
          :class="[
            item.is_elected ? 'bg-green-600' : 'bg-neutral-500/70',
            'flex h-fit w-fit items-center justify-center gap-2 rounded-full px-2 py-1 text-xs font-semibold text-white',
          ]"
        >
          <Icon
            :name="
              item.is_elected
                ? 'heroicons:check-circle-16-solid'
                : 'heroicons:check-circle-16-solid'
            "
          />
          <p>
            {{ item.is_elected ? "Electo" : "No electo" }}
          </p>
        </div>
      </div>
      <div class="col-span-12 mb-4 h-px bg-neutral-300"></div>
    </div>
    <div>
      <p class="px-2 text-xs text-neutral-500">
        * Información obtenida de la base de datos oficial del servel *
      </p>
    </div>
  </div>
</template>
