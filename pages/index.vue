<script setup lang="ts">
const autoridadStore = useAutoridadStore()
const colegioStore = useColegioStore()

const loadingAlcalde = ref(false)
const loadingConcejales = ref(false)
const loadingColegios = ref(false)

const handleSearch = async () => {
  loadingAlcalde.value = true
  loadingConcejales.value = true
  loadingColegios.value = true
  await autoridadStore.fetchAlcaldes()
  loadingAlcalde.value = false
  await autoridadStore.fetchConcejales()
  loadingConcejales.value = false
  await colegioStore.fetchColegios()
}

await handleSearch()

</script>
<template>
  <div >
    <section class="py-10">
      <h3 class="text-xl font-medium">Autoridades comunales</h3>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pt-4"
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
                <p class="break-all text-xs">{{
                  item.email
                }}</p>
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
              <p class="break-all text-xs">{{
                item.email
              }}</p>
  
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
      <h3 class="text-xl font-medium">Colegios</h3>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 pt-4"
      >
        <ClientOnly>
          <NuxtLink
            :to="`/colegio/${colegio.id}`"
            v-for="colegio in colegioStore.colegios"
            :key="colegio.rbd"
            class="border border-slate-300 rounded-md hover:shadow-md transition duration-500 ease-in-out"
          >
            <div class="relative text-sm font-medium">
              <NuxtImg
                :src="colegio.cover_image ?? 'https://curacavi.s3.amazonaws.com/colegios/placeholder-school.jpg'"
                :alt="colegio.nombre"
                class="w-full aspect-[5/6] object-cover rounded-t-md"
              />
              <div
                class="absolute top-0 h-full flex flex-col bg-gradient-to-t from-black/50 to-transparent text-white w-full left-0 justify-between p-2"
              >
                <p class="w-fit bg-black/50 px-1 py-0.5 flex items-center gap-1 text-white rounded text-xs">
                  <div class="flex">
                    <Icon
                      name="heroicons:currency-dollar-20-solid"
                      class="w-4 h-4"
                    />
                  </div>
                  {{ colegio.dependencia }}
                </p>
                <p class="w-fit">
                  {{ colegio.nombre }}
                </p>
              </div>
            </div>
            <div class="p-2 text-sm items-start flex gap-1">
              <div class="flex translate-y-0.5">
                <Icon
                  name="heroicons:map-pin-20-solid"
                  class="w-4 h-4 text-slate-600"
                />
              </div>
              <p>
                {{ colegio.calle }}
              </p>
            </div>
          </NuxtLink>
        </ClientOnly>
      </div>
    </section>
  </div>
</template>
