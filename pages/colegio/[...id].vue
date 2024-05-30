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
    <template v-if="colegio">
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
        <section>
          <div>
            <div class="mt-4 sm:px-0">
              <h3 class="text-xl font-semibold leading-7 text-gray-900">
                Información de Contacto
              </h3>
              <!-- <p class="mt-1 max-w-2xl text-sm leading-4 text-gray-500">
                Personal details and application.
              </p> -->
            </div>
            <div class="mt-6 border-t border-gray-100">
              <dl class="divide-y divide-gray-100">
                <div class="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt class="text-sm font-medium leading-4 text-gray-900">
                    Correo
                  </dt>
                  <dd
                    class="mt-1 text-sm leading-4 text-gray-700 sm:col-span-2 sm:mt-0"
                  >
                    {{ colegio.mail }}
                  </dd>
                </div>
                <div class="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt class="text-sm font-medium leading-4 text-gray-900">
                    Telefono
                  </dt>
                  <dd
                    class="mt-1 text-sm leading-4 text-gray-700 sm:col-span-2 sm:mt-0"
                  >
                    {{ colegio.telefono }}
                  </dd>
                </div>
                <div class="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt class="text-sm font-medium leading-4 text-gray-900">
                    Website
                  </dt>
                  <dd
                    class="mt-1 text-sm leading-4 text-gray-700 sm:col-span-2 sm:mt-0"
                  >
                    {{ colegio.url }}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <div>
            <div class="mt-8 sm:px-0">
              <h3 class="text-xl font-semibold leading-7 text-gray-900">
                Información Institucional
              </h3>
            </div>
            <div class="mt-6 border-t border-gray-100">
              <dl class="divide-y divide-gray-100">
                <div class="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt class="text-sm font-medium leading-4 text-gray-900">
                    Director
                  </dt>
                  <dd
                    class="mt-1 text-sm leading-4 text-gray-700 sm:col-span-2 sm:mt-0"
                  >
                    {{ colegio.director }}
                  </dd>
                </div>
                <div class="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt class="text-sm font-medium leading-4 text-gray-900">
                    Dependencia
                  </dt>
                  <dd
                    class="mt-1 text-sm leading-4 text-gray-700 sm:col-span-2 sm:mt-0"
                  >
                    {{ colegio.dependencia }}
                  </dd>
                </div>
                <div class="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt class="text-sm font-medium leading-4 text-gray-900">
                    Orientación Religiosa
                  </dt>
                  <dd
                    class="mt-1 text-sm leading-4 text-gray-700 sm:col-span-2 sm:mt-0"
                  >
                    {{ colegio.orientacionReligiosa }}
                  </dd>
                </div>
                <div class="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt class="text-sm font-medium leading-4 text-gray-900">
                    Política de uniforme
                  </dt>
                  <dd
                    class="mt-1 text-sm leading-4 text-gray-700 sm:col-span-2 sm:mt-0"
                  >
                    {{ colegio.politicaUniforme }}
                  </dd>
                </div>
                <div class="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt class="text-sm font-medium leading-4 text-gray-900">
                    Nivel Mínimo
                  </dt>
                  <dd
                    class="mt-1 text-sm leading-4 text-gray-700 sm:col-span-2 sm:mt-0"
                  >
                    {{ colegio.nivelMinimo }}
                  </dd>
                </div>
                <div class="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt class="text-sm font-medium leading-4 text-gray-900">
                    Nivel Máximo
                  </dt>
                  <dd
                    class="mt-1 text-sm leading-4 text-gray-700 sm:col-span-2 sm:mt-0"
                  >
                    {{ colegio.nivelMaximo }}
                  </dd>
                </div>
                <div class="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt class="text-sm font-medium leading-4 text-gray-900">
                    Promedio de Alumnos por curso
                  </dt>
                  <dd
                    class="mt-1 text-sm leading-4 text-gray-700 sm:col-span-2 sm:mt-0"
                  >
                    {{ colegio.promedioAlumnosPorCurso }}
                  </dd>
                </div>
                <div class="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt class="text-sm font-medium leading-4 text-gray-900">
                    Cantidad de Docentes
                  </dt>
                  <dd
                    class="mt-1 text-sm leading-4 text-gray-700 sm:col-span-2 sm:mt-0"
                  >
                    {{ colegio.cantidadDocentes }}
                  </dd>
                </div>
                <div class="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt class="text-sm font-medium leading-4 text-gray-900">
                    Alumnos matriculados
                  </dt>
                  <dd
                    class="mt-1 text-sm leading-4 text-gray-700 sm:col-span-2 sm:mt-0"
                  >
                    {{ colegio.alumnosMatriculados }}
                  </dd>
                </div>
                <div class="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt class="text-sm font-medium leading-6 text-gray-900">
                    Resumen proyecto educativo
                  </dt>
                  <dd
                    class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                  >
                    {{ colegio.resumenProyecto }}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
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
