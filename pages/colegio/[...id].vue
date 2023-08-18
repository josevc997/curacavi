<script setup lang="ts">
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
// const edad = computed(() => {
//   if (colegio.value) {
//     const today = new Date();
//     const dateAgo = new Date(colegio.value.fecha_nacimiento);
//     let yearsAgo = today.getFullYear() - dateAgo.getFullYear();
//     const monthAgo = today.getMonth() - dateAgo.getMonth();
//     const dayAgo = today.getDate() - dateAgo.getDate();

//     if (monthAgo > 0 || (monthAgo === 0 && dayAgo > 0)) {
//       yearsAgo--;
//     }
//     const age = yearsAgo;
//     return age;
//   }
// });

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
      <div
        class="col-span-12 sm:col-span-5 md:col-span-4 lg:col-span-3 grid gap-4 h-fit sm:sticky sm:top-14"
      >
        <h1 class="text-2xl font-bold">{{ colegio.nombre }}</h1>
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
        </div>
      </div>
      <div
        class="col-span-12 sm:col-span-7 md:col-span-8 lg:col-span-9 flex flex-col gap-4"
      >
        <div class="gap-2 grid">
          <h2 class="text-lg font-medium pb-2">Descripción</h2>
          <template v-if="colegio.resumenProyecto">
            <p
              v-for="paragraph in colegio.resumenProyecto.split('\r\n')"
              class="text-sm"
            >
              {{ paragraph }}
            </p>
          </template>
        </div>
        <h3>Dirección: {{ colegio.calle }}</h3>
        <section v-if="colegio.coordenadas" class="relative h-96 w-full">
          <MapboxMap
            :map-id="`colegio.${colegio.id}`"
            style="
              border-radius: 20px;
              box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
                0 6px 20px 0 rgba(0, 0, 0, 0.19);
            "
            :options="{
              style: 'mapbox://styles/mapbox/light-v11', // style URL
              center: JSON.parse(colegio.coordenadas), // starting position
              zoom: 14, // starting zoom
            }"
          >
            <MapboxDefaultMarker
              marker-id="marker1"
              :options="{}"
              :lnglat="JSON.parse(colegio.coordenadas)"
            >
            </MapboxDefaultMarker>
          </MapboxMap>
        </section>
      </div>
    </template>
  </div>
</template>
