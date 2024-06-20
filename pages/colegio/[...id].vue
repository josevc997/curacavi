<script setup lang="ts">
import mapboxgl from "mapbox-gl";

const route = useRoute();
const colegioStore = useColegioStore();
const { toTitleCase } = useTextUtils();

const colegio = computed(() => {
  if (colegioStore.selectedColegio) {
    return colegioStore.selectedColegio;
  }
});

const coordenadas = computed(() => {
  if (colegio.value) {
    const coordenadasArray = JSON.parse(colegio.value.coordenadas) as [
      number,
      number,
    ];
    return new mapboxgl.LngLat(coordenadasArray[0], coordenadasArray[1]);
  }
});

colegioStore.fetchColegioById(Number(route.params.id));

watch(
  () => route.params.id,
  (newId, oldId) => {
    colegioStore.fetchColegioById(Number(route.params.id));
  },
);

useHead({
  titleTemplate: (titleChunk) => {
    return colegio && colegio.value && colegio.value?.nombre
      ? `${colegio.value?.nombre} - Curacavi`
      : "Colegio - Curacavi";
  },
});
</script>
<template>
  <div class="grid grid-cols-12 gap-y-8 py-4 sm:gap-x-4">
    <template v-if="colegio && colegio.nombre">
      <div class="col-span-12 flex flex-col gap-4">
        <div class="leading-tight text-slate-800">
          <h1 class="col-span-12 text-3xl font-semibold">
            {{ toTitleCase(colegio.nombre) }}
          </h1>
          <p class="text-lg font-semibold capitalize text-slate-600">
            {{ toTitleCase(colegio.calle) }}
          </p>
        </div>
        <div>
          <NuxtImg
            :src="
              colegio.cover_image ??
              'https://curacavi.s3.amazonaws.com/colegios/placeholder-school.jpg'
            "
            :alt="colegio.nombre"
            loading="lazy"
            class="h-80 w-full rounded-md object-cover object-center shadow shadow-blue-500/40 sm:aspect-[5/2] sm:h-full"
          />
        </div>
        <div class="grid grid-cols-12 gap-4">
          <section
            class="col-span-12 rounded bg-white p-4 shadow outline outline-1 outline-neutral-600/10 sm:col-span-6 lg:col-span-4"
          >
            <h4 class="mb-2 text-lg font-semibold">Información de contacto</h4>
            <div class="grid grid-cols-1 gap-4">
              <div class="flex items-center gap-2">
                <div>
                  <Icon name="heroicons:envelope-16-solid" />
                </div>
                <p class="flex break-all lowercase leading-none">
                  {{ colegio.mail }}
                </p>
              </div>
              <div class="flex items-center gap-2">
                <div>
                  <Icon name="heroicons:phone-16-solid" />
                </div>
                <p class="flex lowercase leading-none">
                  {{ colegio.telefono ?? "+56..." }}
                </p>
              </div>
              <div class="flex items-center gap-2">
                <div>
                  <Icon name="heroicons:globe-alt-16-solid" />
                </div>
                <p class="flex break-all lowercase leading-none">
                  {{ colegio.url ?? "http://..." }}
                </p>
              </div>
            </div>
          </section>
          <div
            class="col-span-12 rounded bg-white p-4 shadow outline outline-1 outline-neutral-600/10 sm:col-span-6 lg:col-span-4"
          >
            <h4 class="mb-1 text-lg font-semibold">Información de General</h4>
            <div class="flex flex-col gap-3">
              <div>
                <p class="font-semibold leading-4">Director</p>
                <p class="capitalize leading-4">
                  {{ colegio.director.toLowerCase() }}
                </p>
              </div>
              <div>
                <p class="font-semibold leading-4">Dependencia</p>
                <p class="leading-4">{{ colegio.dependencia }}</p>
              </div>
              <div>
                <p class="font-semibold leading-4">Orientación Religiosa</p>
                <p class="leading-4">{{ colegio.orientacionReligiosa }}</p>
              </div>
            </div>
          </div>
          <div
            class="col-span-12 rounded bg-white p-4 shadow outline outline-1 outline-neutral-600/10 sm:col-span-6 lg:col-span-4"
          >
            <h4 class="mb-1 text-lg font-semibold">
              Información de Institucional
            </h4>
            <div class="flex flex-col gap-3">
              <div>
                <p class="font-semibold leading-4">Cursos</p>
                <p class="leading-4">
                  {{ colegio.nivelMinimo }} - {{ colegio.nivelMaximo }}
                </p>
              </div>
              <div>
                <p class="font-semibold leading-4">Alumnos Matriculados</p>
                <p class="capitalize leading-4">
                  {{ colegio.alumnosMatriculados }} ({{
                    colegio.promedioAlumnosPorCurso
                  }}
                  por curso aprox)
                </p>
              </div>
              <div>
                <p class="font-semibold leading-4">Cantidad de docentes</p>
                <p class="leading-4">{{ colegio.cantidadDocentes }} Docentes</p>
              </div>
            </div>
          </div>
        </div>
        <section
          class="rounded bg-white p-4 shadow outline outline-1 outline-neutral-600/10"
        >
          <h4 class="text-lg font-semibold">Resumen Proyecto Educativo</h4>
          {{ colegio.resumenProyecto }}
        </section>
        <section id="map">
          <div
            v-if="colegio.coordenadas && coordenadas"
            class="relative h-96 w-full"
          >
            <MapboxMap
              :map-id="`colegio.${colegio.id}`"
              style="border-radius: 5px"
              :options="{
                style: 'mapbox://styles/mapbox/streets-v12', // style URL
                center: coordenadas, // starting position
                zoom: 14, // starting zoom
              }"
            >
              <MapboxDefaultMarker
                :marker-id="`marker${colegio.id}`"
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
