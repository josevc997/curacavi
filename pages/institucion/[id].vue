<script setup lang="ts">
import mapboxgl from "mapbox-gl";
import {
  horarioToInformationCardList,
  descriptionToInformationCardList,
} from "~/utils/institucionUtils";

import type { LabelItem } from "~/types/institucion";

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

const featuresList = computed(() => {
  const labelList: LabelItem[] = [];
  if (institucion.value?.mapLayer) {
    institucion.value?.mapLayer.forEach((element) => {
      labelList.push({
        type: "Feature",
        properties: {
          description: element.description,
        },
        geometry: {
          properties: {},
          coordinates: element.labelCoordinates,
          type: "Point",
        },
      });
    });
  }
  return labelList;
});

watch(
  () => route.params,
  async (newId, oldId) => {
    const id = newId.id;
    await institucionStore.fetchInstitucionItemById(Number(id));
  },
  {
    immediate: true,
  },
);

useHead({
  titleTemplate: (titleChunk) => {
    return institucion && institucion.value && institucion.value?.nombre
      ? `${institucion.value?.nombre} - Curacavi`
      : "Institucion - Curacavi";
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
        <div></div>
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
              :map-id="`institucion-${$route.params.id}`"
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
                :marker-id="`marker-${$route.params.id}`"
                :options="{
                  color: '#FF0000',
                  draggable: false,
                  description: 'Colegio',
                  label: 'Colegio',
                }"
                :lnglat="coordenadas"
              >
              </MapboxDefaultMarker>
              <template
                v-if="
                  featuresList.length > 0 && institucion.mapLayer.length > 0
                "
              >
                <template v-for="(mapdata, index) in institucion.mapLayer">
                  <MapboxSource
                    :source-id="`layer-${$route.params.id}-${index}`"
                    :source="{
                      type: 'geojson',
                      data: {
                        type: 'FeatureCollection',
                        features: [
                          {
                            type: 'Feature',
                            properties: {},
                            geometry: {
                              coordinates: mapdata.coordinates,
                              type: 'Polygon',
                            },
                          },
                        ],
                      },
                    }"
                  />
                  <MapboxLayer
                    :layer="{
                      source: `layer-${$route.params.id}-${index}`,
                      id: `layer-${$route.params.id}-${index}`,
                      type: 'fill',
                      paint: {
                        'fill-opacity': 0.4,
                        'fill-color': mapdata.color,
                      },
                    }"
                  />
                </template>
                <MapboxSource
                  :source-id="`layer-${$route.params.id}-labels`"
                  :source="{
                    type: 'geojson',
                    data: {
                      type: 'FeatureCollection',
                      features: featuresList,
                    },
                  }"
                />
                <MapboxLayer
                  :layer="{
                    source: `layer-${$route.params.id}-labels`,
                    id: `layer-${$route.params.id}-labels`,
                    type: 'symbol',
                    layout: {
                      'text-field': ['get', 'description'],
                      'text-variable-anchor': [
                        'top',
                        'bottom',
                        'left',
                        'right',
                      ],
                      'text-radial-offset': 0.5,
                      'text-justify': 'auto',
                      'icon-image': ['get', 'icon'],
                    },
                  }"
                />
              </template>
            </MapboxMap>
          </div>
        </section>
      </div>
    </template>
  </div>
</template>
