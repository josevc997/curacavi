<script setup lang="ts">
import mapboxgl from "mapbox-gl";

const route = useRoute();
const id = computed(() => {
  return Number(route.params.id);
});

const colegioStore = useColegioStore();

const colegio = computed(() => {
  if (colegioStore.selectedColegio) {
    return colegioStore.selectedColegio;
  }
});
const coordenadas = computed(() => {
  if (colegio.value) {
    const coordenadasArray = JSON.parse(colegio.value.coordenadas) as [
      number,
      number
    ];
    return new mapboxgl.LngLat(coordenadasArray[0], coordenadasArray[1]);
  }
});

colegioStore.fetchColegioById(id.value);
watch(
  id,
  () => {
    colegioStore.fetchColegioById(id.value);
  },
  { immediate: true }
);
</script>
<template>
  <div class="grid grid-cols-12 gap-y-8 sm:gap-x-4 py-4">
    <template v-if="colegio">
      <h1 class="text-2xl font-bold col-span-12">{{ colegio.nombre }}</h1>
      <div
        class="col-span-12 sm:col-span-5 md:col-span-4 lg:col-span-3 grid gap-4 h-fit sm:sticky sm:top-14"
      >
        <NuxtImg
          :src="
            colegio.cover_image ??
            'https://curacavi.s3.amazonaws.com/colegios/placeholder-school.jpg'
          "
          :alt="colegio.nombre"
          :width="300"
          :height="300"
          :layout="'responsive'"
          :objectFit="'cover'"
          :placeholder="'blur'"
          loading="lazy"
          class="rounded-md aspect-auto object-cover object-center w-full"
        />
        <div>
          <p class="flex flex-wrap">
            <span class="font-semibold pr-1">Web page:</span>
            <a :href="colegio.url" class="break-all">
              {{ colegio.url }}
            </a>
          </p>
          <p class="flex flex-wrap break-all">
            <span class="font-semibold pr-1">Email: </span>
            {{ String(colegio?.mail).toLowerCase() }}
          </p>
          <p class="flex flex-wrap break-all">
            <span class="font-semibold pr-1">Telefono: </span>
            {{ colegio.telefono }}
          </p>
          <p class="flex flex-wrap break-all">
            <span class="font-semibold pr-1">Dirección: </span>
            {{ colegio.calle }}
          </p>
          <p>
            <span class="font-semibold pr-1">Dependencia: </span>
            {{ colegio.dependencia }}
          </p>
          <p>
            <span class="font-semibold pr-1">Director: </span>
            {{ colegio.director }}
          </p>
        </div>
      </div>
      <div
        class="col-span-12 sm:col-span-7 md:col-span-8 lg:col-span-9 flex flex-col gap-4"
      >
        <div class="gap-2 grid">
          <h2 class="text-lg font-semibold pb-2">Descripción</h2>
          <template v-if="colegio.resumenProyecto">
            <p
              v-for="paragraph in colegio.resumenProyecto.split('\r\n')"
              class="text-sm"
            >
              {{ paragraph }}
            </p>
          </template>
        </div>
        <section
          v-if="colegio.coordenadas && coordenadas"
          class="relative h-96 w-full"
        >
          <MapboxMap
            :map-id="`colegio.${colegio.id}`"
            style="
              border-radius: 20px;
              box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
                0 6px 20px 0 rgba(0, 0, 0, 0.19);
            "
            :options="{
              style: 'mapbox://styles/mapbox/light-v11', // style URL
              center: coordenadas, // starting position
              zoom: 14, // starting zoom
            }"
          >
            <MapboxDefaultMarker
              marker-id="marker1"
              :options="{}"
              :lnglat="coordenadas"
            >
            </MapboxDefaultMarker>
          </MapboxMap>
        </section>
      </div>
    </template>
  </div>
</template>
