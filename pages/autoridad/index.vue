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
    <section class="max-w-7xl mx-auto px-4 py-10">
        <DividerWithLeftTitle class="pb-4 text-xl font-medium"
            >Autoridades comunales</DividerWithLeftTitle
        >
        <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 pt-4"
        >
            <ClientOnly>
                <NuxtLink
                    :to="`/autoridad/${item.id}`"
                    class="border rounded-md relative group overflow-hidden hover:shadow-md transition duration-500 ease-in-out"
                    v-for="item in autoridadStore.autoridades"
                    :key="item.id"
                >
                    <div
                        class="absolute rounded-md top-0 left-0 bg-gradient-to-t from-slate-950/60 to-transparent py-4 px-3 rounded-br-md w-full h-full flex flex-col justify-between text-slate-50 z-10"
                    >
                        <p
                            class="text-sm bg-slate-900/30 rounded-full w-fit px-2 py-1 font-medium backdrop-blur-lg"
                        >
                            {{ item.tipo_autoridad }}
                        </p>
                        <div>
                            <h3 class="font-medium text-lg">
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
                        class="w-full aspect-[3/4] object-cover rounded-md group-hover:scale-105 group-hover:transition-all group-hover:duration-300 group-hover:ease-linear group-hover:cursor-pointer -z-20"
                    />
                </NuxtLink>
            </ClientOnly>
        </div>
    </section>
</template>
