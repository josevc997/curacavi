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
                colegio.nombre
                    .toLowerCase()
                    .includes(query.value.toLowerCase()) &&
                colegio.dependencia.toLowerCase() ===
                    dependencia.value.toLowerCase()
        );
    } else if (query.value && query.value.length >= 3) {
        return colegioStore.colegios.filter((colegio) =>
            colegio.nombre.toLowerCase().includes(query.value.toLowerCase())
        );
    } else if (dependencia.value) {
        return colegioStore.colegios.filter(
            (colegio) =>
                colegio.dependencia.toLowerCase() ===
                dependencia.value.toLowerCase()
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
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
};

useHead({
    title: "Lista de Colegios - Curacavi",
});
</script>
<template>
    <section>
        <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-4"
        >
            <h1
                class="text-3xl font-medium lg:col-span-3 sm:col-span-2 col-span-1 text-indigo-800"
            >
                Colegios
            </h1>
            <div class="flex flex-col col-span-1 lg:col-span-2 gap-y-1">
                <label for="filter" class="text-sm font-semibold"
                    >Filtrar:</label
                >
                <input
                    v-model="query"
                    type="text"
                    id="filter"
                    name="filter"
                    class="bg-white text-sm border rounded-md border-slate-200 h-10 p-2 w-full active:ring-0 focus:ring-0 active:outline-0 focus:outline-indigo-500 focus:outline-1"
                    placeholder="Nombre del colegio"
                />
            </div>
            <div class="flex flex-col col-span-1 lg:col-span-1 gap-y-1">
                <FormStringSelect
                    :items="dependenciasList"
                    name="Dependencia:"
                    name-class="text-sm font-semibold"
                    @handleSelect="handleSelect"
                />
            </div>
        </div>
        <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 pt-8"
        >
            <ClientOnly>
                <div
                    v-if="filteredColegios.length === 0"
                    class="bg-indigo-100 col-span-1 sm:col-span-2 lg:col-span-3 border-l-2 border-indigo-600 py-4 px-2 text-indigo-800 text-sm rounded flex items-center gap-x-2"
                >
                    <Icon
                        name="heroicons:information-circle-20-solid"
                        class="h-5 w-5"
                    />
                    <p>Colegios no encontrados</p>
                </div>
                <template
                    v-for="colegio in filteredColegios"
                    :key="colegio.rbd"
                >
                    <ColegioCard :colegio="colegio" />
                </template>
            </ClientOnly>
        </div>
    </section>
</template>
