<script setup lang="ts">
const route = useRoute();
const autoridadStore = useAutoridadStore();

const id = computed(() => {
  return Number(route.params.id);
});

const concejal = computed(() => {
  if (autoridadStore.selectedConcejal) {
    return autoridadStore.selectedConcejal;
  }
});
const edad = computed(() => {
  if (concejal.value && concejal.value.fecha_nacimiento) {
    const today = new Date();
    const dateAgo = new Date(concejal.value.fecha_nacimiento);

    let yearsAgo = today.getFullYear() - dateAgo.getFullYear();
    const monthAgo = today.getMonth() - dateAgo.getMonth();
    const dayAgo = today.getDate() - dateAgo.getDate();

    if (monthAgo > 0 || (monthAgo === 0 && dayAgo > 0)) {
      yearsAgo--;
    }
    const age = yearsAgo;
    return age;
  } else {
    return null;
  }
});

autoridadStore.fetchConcejalById(id.value);
onMounted(() => {
  autoridadStore.fetchConcejalById(id.value);
});
</script>
<template>
  <div class="grid grid-cols-12 gap-y-8 sm:gap-x-4 py-4">
    <template v-if="concejal">
      <div
        class="col-span-12 sm:col-span-5 md:col-span-4 lg:col-span-3 grid gap-4 h-fit sm:sticky sm:top-14"
      >
        <h1 class="text-2xl font-bold">{{ concejal.name }}</h1>
        <NuxtImg
          :src="concejal.image"
          :alt="concejal.name"
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
            <span v-if="concejal.fecha_nacimiento">
              {{
                useDateFormat(concejal.fecha_nacimiento, "DD MMMM YYYY").value
              }}
            </span>
          </p>
          <p class="flex flex-wrap">
            <span class="font-medium pr-1">Edad:</span>
            <span v-if="edad"> {{ edad }} Años </span>
          </p>
          <p class="flex flex-wrap">
            <span class="font-medium pr-1">Profesión: </span>
            {{ concejal?.profesion }}
          </p>
        </div>
      </div>
      <div
        class="col-span-12 sm:col-span-7 md:col-span-8 lg:col-span-9 flex flex-col gap-4"
      >
        <div class="gap-2 grid">
          <h2 class="text-lg font-medium pb-2">Descripción</h2>
          <template v-if="concejal.descripcion">
            <p
              v-for="paragraph in concejal.descripcion.split('\r\n')"
              class="text-sm"
            >
              {{ paragraph }}
            </p>
          </template>
          <template v-else>
            <p class="text-sm">Sin descripción por el momento</p>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>
