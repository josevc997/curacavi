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
      class="col-span-1 text-3xl font-medium text-indigo-800 sm:col-span-2 lg:col-span-3"
    >
      Autoridades comunales
    </h1>
    <div
      class="grid grid-cols-1 gap-4 pt-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4"
    >
      <ClientOnly>
        <NuxtLink
          :to="`/autoridad/${item.id}`"
          class="group relative overflow-hidden rounded-md border transition duration-500 ease-in-out hover:shadow-md"
          v-for="item in autoridadStore.autoridades"
          :key="item.id"
        >
          <div
            class="absolute left-0 top-0 z-10 flex h-full w-full flex-col justify-between rounded-md rounded-br-md bg-gradient-to-t from-black/60 via-transparent to-transparent px-3 py-4 text-slate-50 transition-colors duration-1000 ease-in-out group-hover:from-black/80 group-hover:via-transparent group-hover:to-transparent"
          >
            <p
              class="w-fit rounded-full bg-slate-900/30 px-2 py-1 text-sm font-medium backdrop-blur-lg"
            >
              {{ item.tipo_autoridad }}
            </p>
            <div>
              <h3 class="text-lg font-medium">
                {{ item.Persona.nombre }}
              </h3>
              <p class="break-all text-xs">
                {{ item.Persona.email }}
              </p>
            </div>
          </div>
          <NuxtImg
            :src="item.Persona.image"
            :alt="item.Persona.nombre"
            class="-z-20 aspect-[3/4] w-full rounded-md object-cover transition-all duration-300 ease-linear group-hover:scale-105 group-hover:cursor-pointer"
          />
        </NuxtLink>
      </ClientOnly>
    </div>
  </section>
</template>
