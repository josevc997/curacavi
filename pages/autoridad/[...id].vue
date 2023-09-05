<script setup lang="ts">
const route = useRoute();
const id = computed(() => {
  return Number(route.params.id);
});

const autoridadStore = useAutoridadStore();

const autoridad = computed(() => {
  if (autoridadStore.selectedAutoridad) {
    return autoridadStore.selectedAutoridad;
  }
});
const edad = computed(() => {
  if (autoridad.value) {
    const today = new Date();
    const dateAgo = new Date(autoridad.value.Persona.fecha_nacimiento);
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

autoridadStore.fetchAutoridadById(id.value);
watch(
  () => route.params.id,
  (newId, oldId) => {
    autoridadStore.fetchAutoridadById(id.value);
  }
);
</script>
<template>
  <div class="grid grid-cols-12 gap-y-8 sm:gap-x-4 py-4">
    <template v-if="autoridad && autoridad.Persona">
      <div
        class="col-span-12 sm:col-span-5 md:col-span-4 lg:col-span-3 grid gap-2 h-fit sm:sticky sm:top-14"
      >
        <div>
          <h1 class="text-2xl font-bold leading-none text-indigo-950">
            {{ autoridad.Persona.nombre }}
          </h1>
          <p class="text-sm text-indigo-950 leading-tight">
            {{ autoridad.Persona.profesion }}
          </p>
        </div>
        <NuxtImg
          :src="autoridad.Persona.image"
          :alt="autoridad.Persona.nombre"
          :width="300"
          :height="300"
          :layout="'responsive'"
          :objectFit="'cover'"
          :placeholder="'blur'"
          loading="lazy"
          class="rounded-md aspect-auto object-cover object-center w-full"
        />
        <div>
          <a
            :href="`mailto:${autoridad.Persona.email}`"
            class="text-sm hover:text-indigo-700"
          >
            {{ autoridad.Persona.email }}
          </a>
          <p class="text-sm">
            {{
              useDateFormat(autoridad.Persona.fecha_nacimiento, "MMMM DD, YYYY")
                .value
            }}
            <span class="font-semibold text-indigo-800">
              ({{ edad }} Años)
            </span>
          </p>
        </div>
      </div>
      <div
        class="col-span-12 sm:col-span-7 md:col-span-8 lg:col-span-9 flex flex-col gap-4"
      >
        <div class="gap-2 grid">
          <h2 class="text-lg font-medium pb-2">Descripción</h2>
          <p
            v-for="paragraph in autoridad.Persona.descripcion?.split('\r\n')"
            class="text-sm"
          >
            {{ paragraph }}
          </p>
          <div
            v-if="autoridad.Persona.descripcion === null"
            class="bg-indigo-100 text-sm px-4 py-2 border-l-2 border-indigo-500 text-indigo-700 rounded-md"
          >
            Sin descripción por el momento
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
