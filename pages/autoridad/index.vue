<script setup lang="ts">
const autoridadStore = useAutoridadStore();

const loadingAutoridades = ref(false);

const handleSearch = async () => {
  loadingAutoridades.value = true;
  await autoridadStore.fetchAutoridades();
  loadingAutoridades.value = false;
};

await handleSearch();

useHead({
  title: "Lista de Autoridades",
});
</script>
<template>
  <section class="">
    <h1
      class="col-span-1 text-3xl font-semibold text-slate-800 sm:col-span-2 lg:col-span-3"
    >
      Autoridades comunales
    </h1>
    <h2 class="mt-4 text-xl font-semibold text-slate-800">Alcalde</h2>
    <div
      class="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
    >
      <ClientOnly>
        <AutoridadCard
          v-for="item in autoridadStore.autoridades.filter(
            (item) => item.tipo_autoridad === 'Alcalde',
          )"
          :autoridad="item"
          :key="item.id"
        />
      </ClientOnly>
    </div>
    <h2 class="mt-4 text-xl font-semibold text-slate-800">Concejales</h2>
    <div
      class="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
    >
      <ClientOnly>
        <AutoridadCard
          v-for="item in autoridadStore.autoridades.filter(
            (item) => item.tipo_autoridad === 'Concejal',
          )"
          :autoridad="item"
          :key="item.id"
        />
      </ClientOnly>
    </div>
  </section>
</template>
