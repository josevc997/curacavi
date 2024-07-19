<script setup lang="ts">
const route = useRoute();
const id = computed(() => {
  return Number(route.params.id);
});

const autoridadStore = useAutoridadStore();

const { toTitleCase } = useTextUtils();

const autoridad = computed(() => {
  if (autoridadStore.selectedAutoridad) {
    return autoridadStore.selectedAutoridad;
  }
});
const edad = computed(() => {
  if (autoridad.value) {
    const today = new Date();
    const dateAgo = new Date(autoridad.value.persona.fecha_nacimiento);
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

watch(
  () => route.params,
  async (newId, oldId) => {
    const id = newId.id;
    autoridadStore.fetchAutoridadById(Number(id));
  },
  {
    immediate: true,
  },
);

useHead({
  titleTemplate: (titleChunk) => {
    return autoridad &&
      autoridad.value &&
      autoridad.value?.persona &&
      autoridad.value?.persona.nombre
      ? `${autoridad.value?.persona.nombre} - Curacavi`
      : "Autoridad - Curacavi";
  },
});
</script>
<template>
  <div class="grid grid-cols-12 gap-y-4 py-3 sm:gap-x-10">
    <template v-if="autoridad && autoridad.persona">
      <div
        class="col-span-12 grid h-fit grid-cols-1 gap-2 sm:sticky sm:col-span-5 md:col-span-4 lg:col-span-3"
      >
        <div>
          <h1 class="text-2xl font-semibold leading-none text-blue-950">
            <NuxtLink
              to="/autoridad"
              class="flex items-center text-sm font-semibold"
            >
              {{ autoridad.tipo_autoridad }}
            </NuxtLink>
            {{ autoridad.persona.nombre }}
          </h1>
          <p class="text-sm leading-tight text-blue-950">
            {{ autoridad.persona.profesion }}
          </p>
        </div>
        <NuxtImg
          :src="autoridad.persona.image"
          :alt="autoridad.persona.nombre"
          :width="300"
          :height="300"
          :layout="'responsive'"
          :objectFit="'cover'"
          :placeholder="'blur'"
          loading="lazy"
          class="aspect-auto w-full rounded-md object-cover object-center"
        />
        <div>
          <a
            :href="`mailto:${autoridad.persona.email}`"
            class="items-center text-sm hover:text-blue-700"
          >
            <Icon name="heroicons:envelope-solid" class="h-4 w-4" />
            {{ autoridad.persona.email }}
          </a>
          <div class="flex items-center gap-1 text-sm">
            <Icon name="heroicons:calendar-20-solid" class="h-4 w-4" />
            <ClientOnly>
              <p>
                {{
                  useDateFormat(
                    autoridad.persona.fecha_nacimiento,
                    "MMMM DD, YYYY",
                  ).value
                }}
                <span class="font-semibold text-blue-800">
                  ({{ edad }} Años)
                </span>
              </p>
            </ClientOnly>
          </div>
          <div
            v-if="autoridad.persona.redes_sociales.length > 0"
            class="mt-2 flex flex-wrap gap-2"
          >
            <p class="w-full text-sm font-semibold">Redes Sociales</p>
            <NuxtLink
              v-for="(red_social, index) in autoridad.persona.redes_sociales"
              :key="index"
              :to="red_social.url"
              target="_blank"
            >
              <Icon :name="red_social.icono" class="size-8 drop-shadow" />
            </NuxtLink>
          </div>
        </div>
      </div>
      <div
        class="col-span-12 flex flex-col gap-4 sm:col-span-7 md:col-span-8 lg:col-span-9"
      >
        <div class="grid gap-2">
          <h2 class="pb-2 text-lg font-semibold">Descripción</h2>
          <p
            v-for="paragraph in autoridad.persona.descripcion?.split('\r\n')"
            class="text-sm"
          >
            {{ paragraph }}
          </p>
          <div
            v-if="!autoridad.persona.descripcion"
            class="rounded-md border-l-2 border-blue-500 bg-blue-100 px-4 py-2 text-sm text-blue-700"
          >
            Sin descripción por el momento
          </div>
        </div>
        <div>
          <h2 class="mb-4 text-lg font-semibold text-blue-950">
            Historial de Candidaturas
          </h2>
          <CandidaturaList :candidaturasList="autoridadStore.candidaturas" />
        </div>
      </div>
    </template>
  </div>
</template>
