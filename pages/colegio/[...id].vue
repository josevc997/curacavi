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
      number
    ];
    return new mapboxgl.LngLat(coordenadasArray[0], coordenadasArray[1]);
  }
});

colegioStore.fetchColegioById(Number(route.params.id));

watch(
  () => route.params.id,
  (newId, oldId) => {
    colegioStore.fetchColegioById(Number(route.params.id));
  }
);
</script>
<template>
  <div class="grid grid-cols-12 gap-y-8 sm:gap-x-4 py-4">
    <template v-if="colegio">
      <div class="col-span-12 flex flex-col gap-4">
        <div class="leading-tight py-4">
          <h1 class="text-2xl text-indigo-800 font-bold col-span-12">
            {{ toTitleCase(colegio.nombre) }}
          </h1>
          <p class="capitalize text-sm font-semibold text-indigo-950">
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
            class="rounded-md object-cover object-center w-full aspect-[5/2]"
          />
        </div>
        <section class="flex flex-col gap-y-2">
          <DividerWithLeftTitle class="pt-4"
            >Información de Contacto</DividerWithLeftTitle
          >
          <div
            class="grid grid-cols-2 sm:grid-cols-3 text-sm text-indigo-900 sm:gap-2"
          >
            <div>
              <h3 class="font-semibold">Correo:</h3>
            </div>
            <div class="col-span-2">
              <a
                class="break-all hover:text-indigo-600 lowercase w-fit"
                :href="`mailto:${colegio.mail}`"
              >
                {{ colegio.mail }}
              </a>
            </div>
          </div>
          <div
            class="grid grid-cols-2 sm:grid-cols-3 text-sm text-indigo-900 sm:gap-2"
          >
            <h3 class="font-semibold">Teléfono:</h3>
            <div class="col-span-2">
              <p>
                {{ colegio.telefono }}
              </p>
            </div>
          </div>
          <div
            class="grid grid-cols-2 sm:grid-cols-3 text-sm text-indigo-900 sm:gap-2"
          >
            <h3 class="font-semibold">Página web:</h3>
            <div class="col-span-2">
              <a
                class="break-all hover:text-indigo-600"
                :href="colegio.url"
                target="_blank"
              >
                {{ colegio.url }}
              </a>
            </div>
          </div>
        </section>
        <section class="flex flex-col gap-y-2">
          <DividerWithLeftTitle class="pt-4"
            >Información Institucional</DividerWithLeftTitle
          >
          <div
            class="grid grid-cols-2 sm:grid-cols-3 text-sm text-indigo-900 sm:gap-2"
          >
            <h3 class="font-semibold">Director:</h3>
            <div class="col-span-2">
              <p>
                {{ colegio.director }}
              </p>
            </div>
          </div>
          <div
            class="grid grid-cols-2 sm:grid-cols-3 text-sm text-indigo-900 sm:gap-2"
          >
            <h3 class="font-semibold">Dependencia:</h3>
            <div class="col-span-2">
              <p>
                {{ colegio.dependencia }}
              </p>
            </div>
          </div>
          <div
            class="grid grid-cols-2 sm:grid-cols-3 text-sm text-indigo-900 sm:gap-2"
          >
            <h3 class="font-semibold">Orientación religiosa:</h3>
            <div class="col-span-2">
              <p>
                {{ colegio.orientacionReligiosa }}
              </p>
            </div>
          </div>
          <div
            class="grid grid-cols-2 sm:grid-cols-3 text-sm text-indigo-900 sm:gap-2"
          >
            <h3 class="font-semibold">Política de Uniforme:</h3>
            <div class="col-span-2">
              <p>
                {{ colegio.politicaUniforme }}
              </p>
            </div>
          </div>
          <div
            class="grid grid-cols-2 sm:grid-cols-3 text-sm text-indigo-900 sm:gap-2"
          >
            <h3 class="font-semibold">Nivel Mínimo:</h3>
            <div class="col-span-2">
              <p>
                {{ colegio.nivelMinimo }}
              </p>
            </div>
          </div>
          <div
            class="grid grid-cols-2 sm:grid-cols-3 text-sm text-indigo-900 sm:gap-2"
          >
            <h3 class="font-semibold">Nivel Máximo:</h3>
            <div class="col-span-2">
              <p>
                {{ colegio.nivelMaximo }}
              </p>
            </div>
          </div>
          <div
            class="grid grid-cols-2 sm:grid-cols-3 text-sm text-indigo-900 sm:gap-2"
          >
            <h3 class="font-semibold">Promedio alumnos por curso:</h3>
            <div class="col-span-2">
              <p>
                {{ colegio.promedioAlumnosPorCurso }}
              </p>
            </div>
          </div>
          <div
            class="grid grid-cols-2 sm:grid-cols-3 text-sm text-indigo-900 sm:gap-2"
          >
            <h3 class="font-semibold">Cantidad docentes:</h3>
            <div class="col-span-2">
              <p>
                {{ colegio.cantidadDocentes }}
              </p>
            </div>
          </div>
          <div
            class="grid grid-cols-2 sm:grid-cols-3 text-sm text-indigo-900 sm:gap-2"
          >
            <h3 class="font-semibold">Alumnos Matriculados:</h3>
            <div class="col-span-2">
              <p>
                {{ colegio.alumnosMatriculados }}
              </p>
            </div>
          </div>
        </section>
        <section id="description" class="gap-y-4 grid text-indigo-900">
          <DividerWithLeftTitle class="pt-4">
            Descripción
          </DividerWithLeftTitle>
          <template v-if="colegio.resumenProyecto">
            <p
              v-for="paragraph in colegio.resumenProyecto.split('\r\n')"
              class="text-sm"
            >
              {{ paragraph }}
            </p>
          </template>
        </section>
        <section id="map">
          <DividerWithLeftTitle class="pt-8 pb-4"> Mapa </DividerWithLeftTitle>
          <!-- <h2 class="text-lg text-indigo-700 font-semibold pb-2">Mapa</h2> -->
          <div
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
                style: 'mapbox://styles/mapbox/streets-v12', // style URL
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
          </div>
        </section>
      </div>
    </template>
  </div>
</template>
