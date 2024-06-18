<script setup lang="ts">
const route = useRoute();
const id = computed(() => {
  return Number(route.params.id);
});

const candidaturaStore = useCandidaturaStore();

const { toTitleCase } = useTextUtils();

const candidatura = computed(() => {
  if (candidaturaStore.selectedCandidatura) {
    return candidaturaStore.selectedCandidatura;
  }
});
const edad = computed(() => {
  if (candidatura.value && candidatura.value.persona.fecha_nacimiento) {
    const today = new Date();
    const dateAgo = new Date(candidatura.value.persona.fecha_nacimiento);
    let yearsAgo = today.getFullYear() - dateAgo.getFullYear();
    const monthAgo = today.getMonth() - dateAgo.getMonth();
    const dayAgo = today.getDate() - dateAgo.getDate();

    if (monthAgo > 0 || (monthAgo === 0 && dayAgo > 0)) {
      yearsAgo--;
    }
    const age = yearsAgo;
    return age;
  }
  return "N/A";
});

candidaturaStore.fetchCandidaturaById(id.value);
watch(
  () => route.params.id,
  (newId, oldId) => {
    candidaturaStore.fetchCandidaturaById(Number(newId));
  },
);

useHead({
  titleTemplate: (titleChunk) => {
    return candidatura &&
      candidatura.value &&
      candidatura.value?.persona &&
      candidatura.value?.persona.nombre
      ? `${candidatura.value?.persona.nombre} - Curacavi`
      : "Candidatura - Curacavi";
  },
});
</script>
<template>
  <div class="grid grid-cols-12 gap-y-4 py-3 sm:gap-x-10">
    <template v-if="candidatura && candidatura.persona">
      <div
        class="col-span-12 grid h-fit grid-cols-1 gap-2 sm:sticky sm:col-span-5 md:col-span-4 lg:col-span-3"
      >
        <div>
          <h1 class="text-2xl font-semibold leading-none text-blue-950">
            <NuxtLink
              :to="`/candidato?año=${candidatura.fecha.slice(0, 4)}`"
              class="flex items-center text-sm font-semibold"
            >
              {{ candidatura.tipo_autoridad }}
              <span class="sr-only">
                Curacavi {{ candidatura.fecha.slice(0, 4) }}</span
              >
            </NuxtLink>
          </h1>
          <h2 class="text-2xl font-semibold leading-none text-blue-950">
            {{ candidatura.persona.nombre }}
          </h2>
          <p class="text-sm leading-tight text-blue-950">
            {{ candidatura.persona.profesion }}
          </p>
        </div>
        <NuxtImg
          v-if="candidatura.persona.image"
          :src="candidatura.persona.image"
          :alt="candidatura.persona.nombre"
          :width="300"
          :height="300"
          :layout="'responsive'"
          :objectFit="'cover'"
          :placeholder="'blur'"
          loading="lazy"
          class="aspect-auto w-full rounded-md object-cover object-center"
        />
        <div
          v-else
          class="flex aspect-auto w-full items-end justify-center rounded-md bg-neutral-200 object-cover object-center"
        >
          <Icon name="emojione:bust-in-silhouette" class="size-64" />
        </div>
        <div>
          <a
            v-if="candidatura.persona.email"
            :href="`mailto:${candidatura.persona.email}`"
            class="items-center text-sm hover:text-blue-700"
          >
            <Icon name="heroicons:envelope-solid" class="h-4 w-4" />
            {{ candidatura.persona.email }}
          </a>
          <div
            v-if="candidatura.persona.fecha_nacimiento"
            class="flex items-center gap-1 text-sm"
          >
            <Icon name="heroicons:calendar-20-solid" class="h-4 w-4" />
            <ClientOnly>
              <p>
                {{
                  useDateFormat(
                    candidatura.persona.fecha_nacimiento,
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
            v-for="paragraph in candidatura.persona.descripcion?.split('\r\n')"
            class="text-sm"
          >
            {{ paragraph }}
          </p>
          <div
            v-if="!candidatura.persona.descripcion"
            class="rounded-md border-l-2 border-blue-500 bg-blue-100 px-4 py-2 text-sm text-blue-700"
          >
            Sin descripción por el momento
          </div>
        </div>
        <div>
          <h2 class="mb-4 text-lg font-semibold text-blue-950">
            Historial de Candidaturas
          </h2>
          <CandidaturaList :candidaturasList="candidatura.candidatura_list" />
        </div>
      </div>
    </template>
  </div>
</template>
