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
    const coordenadasArray = [colegio.value.longitud, colegio.value.latitud];
    return new mapboxgl.LngLat(coordenadasArray[0], coordenadasArray[1]);
  }
});

watch(
  () => route.params,
  async (newId, oldId) => {
    const id = newId.id;
    colegioStore.fetchColegioById(Number(id));
  },
  {
    immediate: true,
  },
);

useHead({
  title: () =>
    colegio && colegio.value && colegio.value?.nombre
      ? `${colegio.value?.nombre}`
      : "Colegio",
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
          <p
            v-if="colegio.direccion"
            class="text-lg font-semibold capitalize text-slate-600"
          >
            {{ toTitleCase(colegio.direccion) }}
          </p>
        </div>
        <div>
          <UCarousel
            v-slot="{ item }"
            :items="colegio.images"
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
          <!-- <NuxtImg
            :src="
              colegio.images[0].image ??
              'https://curacavi.s3.amazonaws.com/colegios/placeholder-school.jpg'
            "
            :alt="colegio.nombre"
            loading="lazy"
            class="h-80 w-full rounded-md object-cover object-center shadow shadow-blue-500/40 sm:aspect-[5/2] sm:h-full"
          /> -->
        </div>
        <div class="grid grid-cols-12 gap-4">
          <section
            class="col-span-12 rounded bg-white p-4 shadow outline outline-1 outline-neutral-600/10 sm:col-span-6 lg:col-span-4"
          >
            <h4 class="mb-1 text-lg font-semibold">Información de contacto</h4>
            <div class="grid grid-cols-1 gap-3">
              <div>
                <p class="font-semibold leading-6">Correo</p>
                <div class="flex items-center gap-2">
                  <div class="flex items-center">
                    <Icon name="heroicons:envelope-16-solid" />
                  </div>
                  <NuxtLink
                    :to="`mailto:${colegio.email}`"
                    class="flex break-all lowercase leading-4"
                  >
                    {{ colegio.email }}
                  </NuxtLink>
                </div>
              </div>
              <div>
                <p class="font-semibold leading-6">Telefono</p>
                <div class="flex items-center gap-2">
                  <div class="flex items-center">
                    <Icon name="heroicons:phone-16-solid" />
                  </div>
                  <NuxtLink
                    v-if="colegio.telefono"
                    :to="`tel:${colegio.telefono}`"
                    class="flex lowercase leading-4"
                  >
                    {{ colegio.telefono ?? "+56..." }}
                  </NuxtLink>
                  <p v-else class="flex lowercase leading-4">+56...</p>
                </div>
              </div>
              <div>
                <p class="font-semibold leading-6">Website</p>
                <div class="flex items-center gap-2">
                  <div class="flex items-center">
                    <Icon name="heroicons:globe-alt-16-solid" />
                  </div>
                  <NuxtLink
                    v-if="colegio.url"
                    :to="`${colegio.url}`"
                    target="_blank"
                    class="flex break-all lowercase leading-4"
                  >
                    {{ colegio.url }}
                  </NuxtLink>
                  <p v-else class="flex break-all lowercase leading-4">
                    http://...
                  </p>
                </div>
              </div>
            </div>
          </section>
          <div
            class="col-span-12 rounded bg-white p-4 shadow outline outline-1 outline-neutral-600/10 sm:col-span-6 lg:col-span-4"
          >
            <h4 class="mb-1 text-lg font-semibold">Información de General</h4>
            <div class="flex flex-col gap-3">
              <div>
                <p class="font-semibold leading-6">Director</p>
                <p class="capitalize leading-4">
                  {{ colegio?.director?.toLowerCase() || "No disponible" }}
                </p>
              </div>
              <div>
                <p class="font-semibold leading-6">Dependencia</p>
                <p class="leading-4">{{ colegio.dependencia_principal }}</p>
              </div>
              <div>
                <p class="font-semibold leading-6">Orientación Religiosa</p>
                <p class="leading-4">{{ colegio.orientacion_religiosa }}</p>
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
                <p class="font-semibold leading-6">Cursos</p>
                <p class="leading-4">
                  {{ colegio.nivel_minimo }} - {{ colegio.nivel_maximo }}
                </p>
              </div>
              <div>
                <p class="font-semibold leading-6">Alumnos Matriculados</p>
                <p class="capitalize leading-4">
                  {{ colegio.matricula_total }} ({{
                    colegio.promedio_alumnos_curso
                  }}
                  por curso aprox)
                </p>
              </div>
              <div>
                <p class="font-semibold leading-6">Cantidad de docentes</p>
                <p class="leading-4">
                  {{ colegio.cantidad_docentes }} Docentes
                </p>
              </div>
            </div>
          </div>
        </div>
        <section
          class="rounded bg-white p-4 shadow outline outline-1 outline-neutral-600/10"
        >
          <h4 class="text-lg font-semibold">Resumen Proyecto Educativo</h4>
          <template v-if="colegio.resumen_proyecto">
            <p
              v-for="paragraph in colegio.resumen_proyecto.split('\r\n')"
              class="text-sm"
            >
              {{ paragraph }}
            </p>
          </template>
        </section>
        <section
          class="overflow-hidden rounded-lg bg-white ring-1 ring-gray-300"
        >
          <h4
            class="bg-neutral-50 px-4 py-2 text-lg font-semibold sm:rounded-t-lg"
          >
            Niveles Educativos
          </h4>
          <table
            class="min-w-full divide-y divide-gray-300 border-t border-gray-300"
          >
            <thead>
              <tr>
                <th
                  scope="col"
                  class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  Codigo
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Nivel Educativo
                </th>
              </tr>
            </thead>
            <tbody>
              <template
                v-for="(enseñanza_item, enseñanzaIdx) in colegio.enseñanzas"
              >
                <tr
                  :key="enseñanza_item.codigo"
                  v-if="
                    colegio.enseñanzas.length > 1 && enseñanza_item.codigo !== 0
                  "
                >
                  <td
                    :class="[
                      enseñanzaIdx === 0 ? '' : 'border-t border-gray-200',
                      'relative py-4 pl-4 pr-3 text-sm sm:pl-6',
                    ]"
                  >
                    <div class="font-medium text-gray-900">
                      {{ enseñanza_item.codigo }}
                    </div>
                  </td>
                  <td
                    :class="[
                      enseñanzaIdx === 0 ? '' : 'border-t border-gray-200',
                      'px-3 py-3.5 text-sm text-gray-500 lg:table-cell',
                    ]"
                  >
                    {{ enseñanza_item.nombre }}
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </section>
        <section
          class="overflow-hidden rounded-lg bg-white ring-1 ring-gray-300"
        >
          <h4
            class="bg-neutral-50 px-4 py-2 text-lg font-semibold sm:rounded-t-lg"
          >
            Especialidades
          </h4>
          <table
            class="min-w-full divide-y divide-gray-300 border-t border-gray-300"
          >
            <thead>
              <tr>
                <th
                  scope="col"
                  class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  Codigo
                </th>
                <th
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Especialidad
                </th>
              </tr>
            </thead>
            <tbody>
              <template
                v-for="(
                  especialidad_item, especialidadIdx
                ) in colegio.especialidades"
              >
                <tr
                  :key="especialidad_item.codigo"
                  v-if="
                    (colegio.especialidades.length > 1 &&
                      especialidad_item.codigo !== 0) ||
                    colegio.especialidades.length == 1
                  "
                >
                  <td
                    :class="[
                      especialidadIdx === 0 ? '' : 'border-t border-gray-200',
                      'relative py-4 pl-4 pr-3 text-sm sm:pl-6',
                    ]"
                  >
                    <div class="font-medium text-gray-900">
                      {{ especialidad_item.codigo }}
                    </div>
                  </td>
                  <td
                    :class="[
                      especialidadIdx === 0 ? '' : 'border-t border-gray-200',
                      'px-3 py-3.5 text-sm text-gray-500 lg:table-cell',
                    ]"
                  >
                    {{ especialidad_item.nombre }}
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </section>
        <section id="map">
          <div
            v-if="colegio.latitud && colegio.longitud && coordenadas"
            class="relative h-96 w-full"
          >
            <MapboxMap
              :map-id="`colegio.${colegio.id}`"
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
