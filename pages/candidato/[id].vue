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
    const fechaNacimiento = new Date(
      candidatura.value.persona.fecha_nacimiento,
    );
    const edad =
      new Date(Date.now() - fechaNacimiento.getTime()).getUTCFullYear() - 1970;
    return edad;
  }
  return "N/A";
});

watch(
  () => route.params,
  async (newId, oldId) => {
    const id = newId.id;
    candidaturaStore.fetchCandidaturaById(Number(id));
  },
  {
    immediate: true,
  },
);

useHead({
  title: () =>
    candidatura &&
    candidatura.value &&
    candidatura.value?.persona &&
    candidatura.value?.persona.nombre
      ? `${candidatura.value?.persona.nombre}`
      : "Candidatura",
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
          class="aspect-[9/10] w-full rounded-md object-cover object-center"
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
          <div
            v-if="candidatura.persona.redes_sociales.length > 0"
            class="mt-2 flex flex-wrap gap-2"
          >
            <p class="w-full text-sm font-semibold">Redes Sociales</p>
            <NuxtLink
              v-for="(red_social, index) in candidatura.persona.redes_sociales"
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
        <div v-if="candidatura.noticia_list.length > 0">
          <h2 class="mb-4 text-lg font-semibold text-blue-950">Noticias</h2>
          <UCarousel
            :items="candidatura.noticia_list"
            v-slot="{ item: noticia }"
            :ui="{
              item: 'lg:basis-1/2 basis-full rounded-md overflow-hidden snap-center',
              indicators: {
                wrapper: 'bottom-2 lg:-bottom-6',
              },
            }"
            :prev-button="{
              color: 'white',
              icon: 'i-heroicons-arrow-left-20-solid',
              class: '-translate-y-10 left-2',
            }"
            :next-button="{
              color: 'white',
              icon: 'i-heroicons-arrow-right-20-solid',
              class: '-translate-y-10 right-4',
            }"
            indicators
            arrows
          >
            <BlogIndexCard :noticia="noticia" class="md:mx-2 md:first:ml-0" />
          </UCarousel>
        </div>
      </div>
    </template>
  </div>
</template>
