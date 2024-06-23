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
const onlyElected = ref(false);

const filteredCandidaturas = computed(() => {
  if (!selectedTipoAutoridad.value) {
    if (query.value.length > 0) {
      return candidaturaStore.candidaturas.filter((candidatura) => {
        const splittedQuery = query.value.split(" ");
        const validateName = splittedQuery.every((word) => {
          return candidatura.persona.nombre
            .toLowerCase()
            .includes(word.toLowerCase());
        });
        console.log(
          "onlyElected.value",
          onlyElected.value === true ? candidatura.is_elected === true : true,
        );

        return (
          (validateName ||
            candidatura.partido.nombre
              .toLowerCase()
              .includes(query.value.toLowerCase()) ||
            candidatura.partido.codigo
              .toLowerCase()
              .includes(query.value.toLowerCase()) ||
            candidatura.pacto.nombre
              .toLowerCase()
              .includes(query.value.toLowerCase())) &&
          (onlyElected.value === true ? candidatura.is_elected === true : true)
        );
      });
    }
    return onlyElected.value
      ? candidaturaStore.candidaturas.filter(
          (candidatura) => candidatura.is_elected,
        )
      : candidaturaStore.candidaturas;
  }
  return candidaturaStore.candidaturas.filter((candidatura) => {
    if (query.value.length > 0) {
      const splittedQuery = query.value.split(" ");
      const validateName = splittedQuery.every((word) => {
        return candidatura.persona.nombre
          .toLowerCase()
          .includes(word.toLowerCase());
      });
      return (
        (validateName ||
          candidatura.partido.nombre
            .toLowerCase()
            .includes(query.value.toLowerCase()) ||
          candidatura.partido.codigo
            .toLowerCase()
            .includes(query.value.toLowerCase()) ||
          candidatura.pacto.nombre
            .toLowerCase()
            .includes(query.value.toLowerCase())) &&
        (onlyElected.value === true ? candidatura.is_elected === true : true) &&
        candidatura.tipo_autoridad === selectedTipoAutoridad.value
      );
    }
    return candidatura.tipo_autoridad === selectedTipoAutoridad.value &&
      onlyElected.value === true
      ? candidatura.is_elected === true
      : candidatura.tipo_autoridad === selectedTipoAutoridad.value;
  });
});

const handleSearch = async () => {
  loadingCandidaturas.value = true;
  await candidaturaStore.fetchCandidaturas(searchPayload.value);
  loadingCandidaturas.value = false;
  // const { data, error } = await useFetch("http://localhost:8081/candidaturas")
};

await handleSearch();

watch(
  () => searchPayload.value.año,
  (newFecha, oldFecha) => {
    candidaturaStore.fetchCandidaturas(searchPayload.value);
    console.log("newFecha", newFecha, oldFecha);
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
      <div class="col-span-1 sm:col-span-2 lg:col-span-3 2xl:col-span-4">
        <h1 class="text-3xl font-semibold text-slate-800">
          Candidatos Curacavi {{ searchPayload.año }}
        </h1>
        <h2 class="text-xl font-medium text-slate-400">
          Elecciones Municipales Curacavi {{ searchPayload.año }}
        </h2>
      </div>
      <div class="col-span-1 grid 2xl:col-span-1">
        <label for="filter" class="text-sm font-semibold">Filtrar:</label>
        <input
          v-model="query"
          type="text"
          id="filter"
          name="filter"
          class="h-10 w-full rounded-md border border-slate-200 bg-white p-2 text-sm focus:outline-1 focus:outline-blue-500 focus:ring-0 active:outline-0 active:ring-0"
          placeholder="Candidato, Partido o Pacto"
        />
      </div>
      <div class="col-span-1 grid">
        <ClientOnly>
          <FormYearSelect
            :items="yearList"
            :selected-value="String(searchPayload.año)"
            name="Año:"
            name-class="text-sm font-semibold"
            @handleSelect="handleSelect"
          />
        </ClientOnly>
      </div>
      <div class="col-span-1 grid sm:col-span-1 lg:col-span-1 2xl:col-span-1">
        <h1 class="text-sm font-semibold text-slate-800">Filtro</h1>
        <div class="flex gap-2">
          <ClientOnly>
            <button
              v-for="tipoAutoridad in tipoAutoridadList"
              @click="
                selectedTipoAutoridad !== tipoAutoridad.value
                  ? (selectedTipoAutoridad = tipoAutoridad.value)
                  : (selectedTipoAutoridad = null)
              "
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
          </ClientOnly>
        </div>
      </div>
      <div class="col-span-1 grid sm:col-span-1 lg:col-span-1 2xl:col-span-1">
        <h1 class="text-sm font-semibold text-slate-800">Filtro</h1>
        <div class="flex gap-2">
          <button
            @click="onlyElected = !onlyElected"
            key="tipoAutoridad.value"
            class="h-10 rounded-md px-4 py-2 text-sm shadow-sm outline outline-1 outline-neutral-600/10"
            :class="[
              onlyElected
                ? 'bg-blue-600 text-white'
                : 'bg-white text-neutral-900',
            ]"
          >
            Solo Electos
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
