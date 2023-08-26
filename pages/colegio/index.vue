<script setup lang="ts">
const colegioStore = useColegioStore();
const loadingColegios = ref(false);
const handleSearch = async () => {
  loadingColegios.value = true;
  await colegioStore.fetchColegios();
  loadingColegios.value = false;
};

await handleSearch();
const query = ref("");

const filteredColegios = computed(() => {
  if (query.value && query.value.length >= 3 && dependencia.value) {
    return colegioStore.colegios.filter(
      (colegio) =>
        colegio.nombre.toLowerCase().includes(query.value.toLowerCase()) &&
        colegio.dependencia.toLowerCase() === dependencia.value.toLowerCase()
    );
  } else if (query.value && query.value.length >= 3) {
    return colegioStore.colegios.filter((colegio) =>
      colegio.nombre.toLowerCase().includes(query.value.toLowerCase())
    );
  } else if (dependencia.value) {
    return colegioStore.colegios.filter(
      (colegio) =>
        colegio.dependencia.toLowerCase() === dependencia.value.toLowerCase()
    );
  }
  return colegioStore.colegios;
});

const dependencia = ref("");

const dependenciasList = [
  { value: "", text: "Selecciona una opcion" },
  { value: "PARTICULAR", text: "PARTICULAR" },
  { value: "PARTICULAR SUBVENCIONADO", text: "PARTICULAR SUBVENCIONADO" },
  { value: "PUBLICO", text: "PUBLICO" },
];

const handleSelect = (item: { value: string; text: string }) => {
  dependencia.value = item.value;
};
</script>
<template>
  <section>
    <DividerWithLeftTitle class="py-4 text-xl font-medium"
      >Colegios</DividerWithLeftTitle
    >
    <div class="flex flex-wrap gap-x-4 gap-y-2">
      <div class="flex flex-col flex-grow min-w-[300px] w-2/4">
        <label for="filter" class="text-sm font-semibold">Filtrar:</label>
        <input
          v-model="query"
          type="text"
          id="filter"
          name="filter"
          class="bg-slate-50 border rounded-md border-slate-200 p-2 w-full active:ring-0 focus:ring-0 active:outline-0 focus:outline-indigo-500 focus:outline-1"
        />
      </div>
      <div class="flex flex-col flex-grow min-w-[300px] w-1/4">
        <label for="dependencia" class="text-sm font-semibold"
          >Dependencia:</label
        >
        <FormStringSelect
          :items="dependenciasList"
          @handleSelect="handleSelect"
        />
      </div>
    </div>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-4 gap-y-8 pt-4"
    >
      <ClientOnly>
        <NuxtLink
          :to="`/colegio/${colegio.id}`"
          v-for="colegio in filteredColegios"
          :key="colegio.rbd"
          class="relative group overflow-hidden"
        >
          <NuxtImg
            class="aspect-[3/2] w-full rounded object-cover group-hover:scale-105 transition-all duration-500 ease-in-out"
            :src="
              colegio.cover_image ??
              'https://curacavi.s3.amazonaws.com/colegios/placeholder-school.jpg'
            "
            :alt="colegio.nombre"
          />
          <div
            class="absolute w-full h-full bg-gradient-to-t from-black/50 group-hover:from-black/80 transition-all duration-500 ease-in to-transparent top-0 rounded flex items-end p-2 text-white"
          >
            <h3 class="text-base font-semibold leading-5 tracking-tight">
              {{ colegio.nombre }}
            </h3>
          </div>
        </NuxtLink>
      </ClientOnly>
    </div>
  </section>
</template>
