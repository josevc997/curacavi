<script setup lang="ts">
import mapboxgl from "mapbox-gl";
import {
  horarioToInformationCardList,
  descriptionToInformationCardList,
} from "~/utils/institucionUtils";

const route = useRoute();
const institucionStore = useInstitucionStore();
const { toTitleCase } = useTextUtils();

const institucion = computed(() => {
  if (institucionStore.selectedInstitucion) {
    return institucionStore.selectedInstitucion;
  }
});

const coordenadas = computed(() => {
  if (institucion.value) {
    const coordenadasArray = [
      institucion.value.longitud,
      institucion.value.latitud,
    ];
    return new mapboxgl.LngLat(coordenadasArray[0], coordenadasArray[1]);
  }
});

institucionStore.fetchInstitucionItemById(Number(route.params.id));

watch(
  () => route.params.id,
  (newId, oldId) => {
    institucionStore.fetchInstitucionItemById(Number(route.params.id));
  },
);

useHead({
  titleTemplate: (titleChunk) => {
    return institucion && institucion.value && institucion.value?.nombre
      ? `${institucion.value?.nombre} - Curacavi`
      : "Colegio - Curacavi";
  },
});
</script>
<template>
  <div class="grid grid-cols-12 gap-y-8 py-4 sm:gap-x-4">
    <template v-if="institucion && institucion.nombre">
      <div class="col-span-12 flex flex-col gap-4">
        <div class="leading-tight text-slate-800">
          <h1 class="col-span-12 text-3xl font-semibold">
            {{ toTitleCase(institucion.nombre) }}
          </h1>
          <p
            v-if="institucion.direccion"
            class="text-lg font-semibold capitalize text-slate-600"
          >
            {{ toTitleCase(institucion.direccion) }}
          </p>
        </div>
        <div>
          <UCarousel
            v-slot="{ item }"
            :items="institucion.images"
            :ui="{
              item: 'snap-start basis-full',
              indicators: {
                active: 'bg-blue-500 dark:bg-blue-400',
                inactive: 'border border-black/60',
              },
            }"
            class="overflow-hidden rounded shadow shadow-blue-500/40"
            indicators
            arrows
          >
            <NuxtImg
              :src="item.image"
              height="400"
              draggable="false"
              class="h-80 w-full rounded object-cover object-center sm:aspect-[5/2] sm:h-full"
            />
          </UCarousel>
        </div>
        <div class="grid grid-cols-12 gap-4">
          <UICardInformation
            title="Descripción"
            :data="descriptionToInformationCardList(institucion.descripcion)"
          />
          <UICardInformation
            title="Horarios de Atención"
            :data="horarioToInformationCardList(institucion.horarios)"
          />
          <UICardInformation
            title="Información de Contacto"
            :data="institucion.contactos"
          />
        </div>
        <section id="map">
          <div
            v-if="institucion.latitud && institucion.longitud && coordenadas"
            class="relative h-96 w-full"
          >
            <MapboxMap
              :map-id="`institucion.${institucion.id}`"
              style="
                border-radius: 5px;
                box-shadow:
                  0 1px 3px 0 rgb(0 0 0 / 0.1),
                  0 1px 2px -1px rgb(0 0 0 / 0.1);
              "
              :options="{
                style: 'mapbox://styles/mapbox/streets-v12', // style URL
                center: coordenadas, // starting position
                zoom: 14, // starting zoom
              }"
            >
              <MapboxDefaultMarker
                :marker-id="`marker${institucion.id}`"
                :options="{}"
                :lnglat="coordenadas"
              >
              </MapboxDefaultMarker>
            </MapboxMap>
          </div>
        </section>
      </div>
    </template>
  </div>
</template>
