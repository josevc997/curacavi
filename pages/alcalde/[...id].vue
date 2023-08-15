<script setup lang="ts">
const route = useRoute();
const id = computed(() => {
  return Number(route.params.id);
});

const autoridadStore = useAutoridadStore();

const alcalde = computed(() => {
  if (autoridadStore.selectedAlcalde) {
    return autoridadStore.selectedAlcalde;
  }
});
const edad = computed(() => {
  if (alcalde.value) {
    const today = new Date();
    const dateAgo = new Date(alcalde.value.fecha_nacimiento);
    let yearsAgo = today.getFullYear() - dateAgo.getFullYear();
    const monthAgo = today.getMonth() - dateAgo.getMonth();
    const dayAgo = today.getDate() - dateAgo.getDate();

    if (monthAgo > 0 || (monthAgo === 0 && dayAgo > 0)) {
      yearsAgo--;
    }
    const age = yearsAgo;
    return age;
  }
});

autoridadStore.fetchAlcaldeById(id.value);
onMounted(() => {
  autoridadStore.fetchAlcaldeById(id.value);
});
</script>
<template>
  <div class="grid grid-cols-12 gap-y-8 sm:gap-x-4 py-4">
    <template v-if="alcalde">
      <div
        class="col-span-12 sm:col-span-5 md:col-span-4 lg:col-span-3 grid gap-4 h-fit sm:sticky sm:top-14"
      >
        <h1 class="text-2xl font-bold">{{ alcalde.name }}</h1>
        <NuxtImg
          :src="alcalde.image"
          :alt="alcalde.name"
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
            <span class="font-medium pr-1">fecha de nacimiento:</span>
            {{ useDateFormat(alcalde.fecha_nacimiento, "DD MMMM YYYY").value }}
          </p>
          <p class="flex flex-wrap">
            <span class="font-medium pr-1">Edad:</span>
            {{ edad }} Años
          </p>
          <p class="flex flex-wrap">
            <span class="font-medium pr-1">profesión: </span>
            {{ alcalde?.profesion }}
          </p>
        </div>
      </div>
      <div
        class="col-span-12 sm:col-span-7 md:col-span-8 lg:col-span-9 flex flex-col gap-4"
      >
        <div class="gap-2 grid">
          <h2 class="text-lg font-medium pb-2">Descripción</h2>
          <p
            v-for="paragraph in alcalde.descripcion.split('\r\n')"
            class="text-sm"
          >
            {{ paragraph }}
          </p>
        </div>
      </div>
    </template>
  </div>
</template>
