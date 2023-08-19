<script setup lang="ts">
const autoridadStore = useAutoridadStore();
const colegioStore = useColegioStore();

const loadingAlcalde = ref(false);
const loadingConcejales = ref(false);
const loadingColegios = ref(false);

const handleSearch = async () => {
  loadingAlcalde.value = true;
  loadingConcejales.value = true;
  loadingColegios.value = true;
  await autoridadStore.fetchAlcaldes();
  loadingAlcalde.value = false;
  await autoridadStore.fetchConcejales();
  loadingConcejales.value = false;
  await colegioStore.fetchColegios();
};

await handleSearch();
</script>
<template>
  <div>
    <section class="py-10">
      <DividerWithLeftTitle class="pb-4 text-xl font-medium"
        >Autoridades comunales</DividerWithLeftTitle
      >
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 pt-4"
      >
        <ClientOnly>
          <NuxtLink
            :to="`/alcalde/${item.id}`"
            class="border rounded-md relative group overflow-hidden hover:shadow-md transition duration-500 ease-in-out"
            v-for="item in autoridadStore.alcaldes"
            :key="item.name"
          >
            <div
              class="absolute rounded-md top-0 left-0 bg-gradient-to-t from-slate-950/60 to-transparent py-4 px-3 rounded-br-md w-full h-full flex flex-col justify-between text-slate-50 z-10"
            >
              <p
                class="text-sm bg-slate-800/50 rounded-md w-fit px-1 py-0.5 font-medium"
              >
                Alcalde
              </p>
              <div>
                <h3 class="font-medium text-lg">
                  {{ item.name }}
                </h3>
                <p class="break-all text-xs">{{ item.email }}</p>
              </div>
            </div>
            <NuxtImg
              :src="item.image"
              :alt="item.name"
              class="w-full aspect-[3/4] object-cover rounded-md group-hover:scale-105 group-hover:transition-all group-hover:duration-300 group-hover:ease-linear group-hover:cursor-pointer -z-20"
            />
          </NuxtLink>
          <NuxtLink
            :to="`/concejal/${item.id}`"
            class="border rounded-md relative group overflow-hidden hover:shadow-md transition duration-500 ease-in-out"
            v-for="item in autoridadStore.concejales"
            :key="item.name"
          >
            <div
              class="absolute rounded-md top-0 left-0 bg-gradient-to-t from-slate-950/60 to-transparent py-4 px-3 rounded-br-md w-full h-full flex flex-col justify-between text-slate-50 z-10"
            >
              <p
                class="text-sm bg-slate-800/50 rounded-md w-fit px-1 py-0.5 font-medium"
              >
                Concejal
              </p>
              <div>
                <h3 class="font-medium text-lg">
                  {{ item.name }}
                </h3>
                <p class="break-all text-xs">{{ item.email }}</p>
              </div>
            </div>
            <NuxtImg
              :src="item.image"
              :alt="item.name"
              class="w-full aspect-[3/4] object-cover rounded-md group-hover:scale-105 group-hover:transition-all group-hover:duration-500 group-hover:ease-in-out group-hover:cursor-pointer -z-20"
            />
          </NuxtLink>
        </ClientOnly>
      </div>
    </section>

    <section class="py-10">
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
  </div>
</template>
