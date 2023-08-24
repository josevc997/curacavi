<script setup lang="ts">
const colegioStore = useColegioStore();
const loadingColegios = ref(false);
const handleSearch = async () => {
  loadingColegios.value = true;
  await colegioStore.fetchColegios();
  loadingColegios.value = false;
};

await handleSearch();
</script>
<template>
  <section>
    <DividerWithLeftTitle class="py-4 text-xl font-medium"
      >Colegios</DividerWithLeftTitle
    >
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-4 gap-y-8 pt-4"
    >
      <ClientOnly>
        <NuxtLink
          :to="`/colegio/${colegio.id}`"
          v-for="colegio in colegioStore.colegios"
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
