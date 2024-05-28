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
        colegio.dependencia.toLowerCase() === dependencia.value.toLowerCase(),
    );
  } else if (query.value && query.value.length >= 3) {
    return colegioStore.colegios.filter((colegio) =>
      colegio.nombre.toLowerCase().includes(query.value.toLowerCase()),
    );
  } else if (dependencia.value) {
    return colegioStore.colegios.filter(
      (colegio) =>
        colegio.dependencia.toLowerCase() === dependencia.value.toLowerCase(),
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

const toTitleCase = (str: string) => {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
  );
};

useHead({
  title: "Lista de Colegios - Curacavi",
});
</script>
<template>
  <section>
    <div class="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 lg:grid-cols-2">
      <h1
        class="col-span-1 text-3xl font-semibold text-slate-800 sm:col-span-2 lg:col-span-3"
      >
        Colegios
      </h1>
      <div class="col-span-1 flex flex-col gap-y-1 lg:col-span-1">
        <label for="filter" class="text-sm font-semibold">Filtrar:</label>
        <input
          v-model="query"
          type="text"
          id="filter"
          name="filter"
          class="h-10 w-full rounded-md border border-slate-200 bg-white p-2 text-sm focus:outline-1 focus:outline-blue-500 focus:ring-0 active:outline-0 active:ring-0"
          placeholder="Nombre del colegio"
        />
      </div>
      <div class="col-span-1 flex flex-col gap-y-1 lg:col-span-1">
        <FormStringSelect
          :items="dependenciasList"
          name="Dependencia:"
          name-class="text-sm font-semibold"
          @handleSelect="handleSelect"
        />
      </div>
    </div>
    <div
      class="grid grid-cols-1 gap-4 pt-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
    >
      <ClientOnly>
        <div
          v-if="filteredColegios.length === 0"
          class="col-span-1 flex items-center gap-x-2 rounded border-l-2 border-blue-600 bg-blue-100 px-2 py-4 text-sm text-blue-800 sm:col-span-2 lg:col-span-3"
        >
          <Icon name="heroicons:information-circle-20-solid" class="h-5 w-5" />
          <p>Colegios no encontrados</p>
        </div>
        <template v-for="colegio in filteredColegios" :key="colegio.rbd">
          <ColegioCard :colegio="colegio" />
        </template>
      </ClientOnly>
    </div>
  </section>
</template>
