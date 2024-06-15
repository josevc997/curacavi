<script setup lang="ts">
const candidaturaStore = useCandidaturaStore();

const loadingCandidaturas = ref(false);
const responseData = ref(null as any);

const route = useRoute();
const router = useRouter();

const searchPayload = computed(() => {
  return {
    año: route.query.fecha ? Number(route.query.fecha) : 2021,
  };
});

const yearList = [
  {
    value: "1992",
    text: "1992",
  },
  {
    value: "1996",
    text: "1996",
  },
  {
    value: "2000",
    text: "2000",
  },
  {
    value: "2004",
    text: "2004",
  },
  {
    value: "2008",
    text: "2008",
  },
  {
    value: "2012",
    text: "2012",
  },
  {
    value: "2016",
    text: "2016",
  },
  {
    value: "2021",
    text: "2021",
  },
];

const tipoAutoridadList = computed(() => {
  const uniqueValues = new Set(
    candidaturaStore.candidaturas.map(
      (candidatura) => candidatura.tipo_autoridad,
    ),
  );
  return Array.from(uniqueValues).map((value) => ({ value, text: value }));
});

const selectedTipoAutoridad = ref(null as string | null);

const filteredCandidaturas = computed(() => {
  if (!selectedTipoAutoridad.value) {
    if (query.value.length > 0) {
      return candidaturaStore.candidaturas.filter(
        (candidatura) =>
          candidatura.persona.nombre
            .toLowerCase()
            .includes(query.value.toLowerCase()) ||
          candidatura.partido.nombre
            .toLowerCase()
            .includes(query.value.toLowerCase()) ||
          candidatura.partido.codigo
            .toLowerCase()
            .includes(query.value.toLowerCase()) ||
          candidatura.pacto.nombre
            .toLowerCase()
            .includes(query.value.toLowerCase()),
      );
    }
    return candidaturaStore.candidaturas;
  }
  return candidaturaStore.candidaturas.filter((candidatura) => {
    if (query.value.length > 0) {
      return (
        candidatura.persona.nombre
          .toLowerCase()
          .includes(query.value.toLowerCase()) ||
        candidatura.partido.nombre
          .toLowerCase()
          .includes(query.value.toLowerCase()) ||
        candidatura.partido.codigo
          .toLowerCase()
          .includes(query.value.toLowerCase()) ||
        candidatura.pacto.nombre
          .toLowerCase()
          .includes(query.value.toLowerCase())
      );
    }
    return candidatura.tipo_autoridad === selectedTipoAutoridad.value;
  });
});

const handleSearch = async () => {
  loadingCandidaturas.value = true;
  await candidaturaStore.fetchCandidaturas(searchPayload.value);
  loadingCandidaturas.value = false;
  // const { data, error } = await useFetch("http://localhost:8081/candidaturas")
};

await handleSearch();
const isShowing = ref(true);

watch(
  () => route.query.fecha,
  (newFecha, oldFecha) => {
    candidaturaStore.fetchCandidaturas(searchPayload.value);
  },
);

const query = ref("");

const handleSelect = (item: { value: string; text: string }) => {
  router.push({
    query: {
      ...route.query,
      fecha: Number(item.value),
    },
  });
  selectedTipoAutoridad.value = null;
  query.value = "";
};

useHead({
  title: "Lista de Candidaturas - Curacavi",
});
</script>
<template>
  <div>
    <div
      class="grid grid-cols-1 gap-4 pb-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
    >
      <div class="col-span-1 grid 2xl:col-span-2">
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
      <div class="col-span-1 grid">
        <FormStringSelect
          :items="yearList"
          :selected-value="String(searchPayload.año)"
          name="Año:"
          name-class="text-sm font-semibold"
          @handleSelect="handleSelect"
        />
      </div>
      <div
        class="col-span-1 grid sm:col-span-2 lg:col-span-1 lg:col-start-3 2xl:col-span-1 2xl:col-start-4"
      >
        <h1 class="text-sm font-semibold text-slate-800">Filtro</h1>
        <div class="flex gap-2">
          <button
            v-for="tipoAutoridad in tipoAutoridadList"
            @click="selectedTipoAutoridad = tipoAutoridad.value"
            key="tipoAutoridad.value"
            class="h-10 rounded-md px-4 py-2 text-sm shadow-sm outline outline-1 outline-neutral-600/10"
            :class="[
              selectedTipoAutoridad === tipoAutoridad.value
                ? 'bg-blue-600 text-white'
                : 'bg-white text-neutral-900',
            ]"
          >
            {{ tipoAutoridad.value }}
          </button>
        </div>
      </div>
    </div>
    <div
      v-if="filteredCandidaturas.length > 0"
      class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
    >
      <ClientOnly>
        <CandidatoCard
          v-for="candidato in filteredCandidaturas"
          :key="candidato.id"
          :candidato="candidato"
        />
      </ClientOnly>
    </div>
    <div
      v-else
      class="col-span-1 flex items-center gap-x-2 rounded border-l-2 border-blue-600 bg-blue-100 px-2 py-4 text-sm text-blue-800 sm:col-span-2 lg:col-span-3"
    >
      <Icon name="heroicons:information-circle-20-solid" class="h-5 w-5" />
      <p>Candidatos no encontrados con los parametros de busqueda</p>
    </div>
  </div>
</template>
