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

autoridadStore.fetchAutoridadById(id.value);
watch(
  () => route.params.id,
  (newId, oldId) => {
    autoridadStore.fetchAutoridadById(Number(newId));
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
          <h2 class="mb-2 text-lg font-semibold text-blue-950">Candidaturas</h2>
          <div class="flex flex-col">
            <div class="overflow-x-auto rounded-md border border-slate-300">
              <div class="inline-block min-w-full">
                <div class="overflow-hidden">
                  <table class="min-w-full text-left text-sm font-light">
                    <thead
                      class="border-b border-slate-300 bg-slate-100 font-medium"
                    >
                      <tr>
                        <th scope="col" class="px-4 py-3">Año</th>
                        <th scope="col" class="px-4 py-3">Tipo</th>
                        <th scope="col" class="px-4 py-3">Electo</th>
                        <th scope="col" class="px-4 py-3">Pacto</th>
                        <th scope="col" class="px-4 py-3">Partido</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        class="border-b border-slate-300"
                        v-for="candidatura in autoridadStore.candidaturas"
                      >
                        <td class="whitespace-nowrap px-4 py-3 font-medium">
                          {{ useDateFormat(candidatura.fecha, "YYYY").value }}
                        </td>
                        <td class="whitespace-nowrap px-4 py-3">
                          {{ toTitleCase(candidatura.tipo_autoridad) }}
                        </td>
                        <td class="whitespace-nowrap px-4 py-3 text-center">
                          <Icon
                            v-if="candidatura.is_elected"
                            name="heroicons:check-circle-20-solid"
                            class="h-6 w-6 text-green-700/80"
                          />
                          <Icon
                            v-else
                            name="heroicons:x-circle-20-solid"
                            class="h-6 w-6 text-red-700/80"
                          />
                        </td>
                        <td class="whitespace-nowrap px-4 py-3">
                          {{ toTitleCase(candidatura.pacto.nombre) }}
                        </td>
                        <td class="whitespace-nowrap px-4 py-3">
                          {{ toTitleCase(candidatura.partido.nombre) }}
                        </td>
                      </tr>
                      <tr v-if="autoridad.candidatura.length === 0">
                        <td colspan="4" class="bg-slate-50 p-2 text-center">
                          Carga de datos en proceso
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
