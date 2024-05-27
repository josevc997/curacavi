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
  title: "Lista de Autoridades - Curacavi",
});
</script>
<template>
  <section class="">
    <h1
      class="col-span-1 text-3xl font-black text-slate-800 sm:col-span-2 lg:col-span-3"
    >
      Autoridades comunales
    </h1>
    <div class="grid grid-cols-1 gap-4 pt-8 lg:grid-cols-2">
      <ClientOnly>
        <AutoridadCard
          v-for="item in autoridadStore.autoridades"
          :autoridad="item"
          :key="item.id"
        />
      </ClientOnly>
    </div>
  </section>
</template>
