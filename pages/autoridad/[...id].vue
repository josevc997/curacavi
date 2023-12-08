<script setup lang="ts">
const route = useRoute();
const id = computed(() => {
    return Number(route.params.id);
});

const autoridadStore = useAutoridadStore();

const { toTitleCase } = useTextUtils();

const autoridad = computed(() => {
    if (autoridadStore.selectedAutoridad) {
        return autoridadStore.selectedAutoridad;
    }
});
const edad = computed(() => {
    if (autoridad.value) {
        const today = new Date();
        const dateAgo = new Date(autoridad.value.Persona.fecha_nacimiento);
        let yearsAgo = today.getFullYear() - dateAgo.getFullYear();
        const monthAgo = today.getMonth() - dateAgo.getMonth();
        const dayAgo = today.getDate() - dateAgo.getDate();

        if (monthAgo > 0 || (monthAgo === 0 && dayAgo > 0)) {
            yearsAgo--;
        }
        const age = yearsAgo;
        return age;
    }
});

autoridadStore.fetchAutoridadById(id.value);
watch(
    () => id,
    (newId, oldId) => {
        autoridadStore.fetchAutoridadById(id.value);
    }
);

useHead({
    titleTemplate: (titleChunk) => {
        return autoridad &&
            autoridad.value &&
            autoridad.value?.Persona &&
            autoridad.value?.Persona.nombre
            ? `${autoridad.value?.Persona.nombre} - Curacavi`
            : "Colegio - Curacavi";
    },
});
</script>
<template>
    <div class="grid grid-cols-12 gap-y-4 sm:gap-x-4 py-3">
        <template v-if="autoridad && autoridad.Persona">
            <div
                class="col-span-12 sm:col-span-5 md:col-span-4 lg:col-span-3 grid gap-2 h-fit sm:sticky"
            >
                <div>
                    <h1 class="text-2xl font-bold leading-none text-indigo-950">
                        <NuxtLink
                            to="/autoridad"
                            class="flex items-center text-sm font-bold"
                        >
                            {{ autoridad.tipo_autoridad }}
                        </NuxtLink>
                        {{ autoridad.Persona.nombre }}
                    </h1>
                    <p class="text-sm text-indigo-950 leading-tight">
                        {{ autoridad.Persona.profesion }}
                    </p>
                </div>
                <NuxtImg
                    :src="autoridad.Persona.image"
                    :alt="autoridad.Persona.nombre"
                    :width="300"
                    :height="300"
                    :layout="'responsive'"
                    :objectFit="'cover'"
                    :placeholder="'blur'"
                    loading="lazy"
                    class="rounded-md aspect-auto object-cover object-center w-full"
                />
                <div>
                    <a
                        :href="`mailto:${autoridad.Persona.email}`"
                        class="hover:text-indigo-700 items-center"
                    >
                        <Icon name="heroicons:envelope-solid" class="h-4 w-4" />
                        {{ autoridad.Persona.email }}
                    </a>
                    <div class="text-sm flex items-center gap-1">
                        <Icon
                            name="heroicons:calendar-20-solid"
                            class="h-4 w-4"
                        />
                        <p>
                            {{
                                useDateFormat(
                                    autoridad.Persona.fecha_nacimiento,
                                    "MMMM DD, YYYY"
                                ).value
                            }}
                            <span class="font-semibold text-indigo-800">
                                ({{ edad }} Años)
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div
                class="col-span-12 sm:col-span-7 md:col-span-8 lg:col-span-9 flex flex-col gap-4"
            >
                <div class="gap-2 grid">
                    <h2 class="text-lg font-medium pb-2">Descripción</h2>
                    <p
                        v-for="paragraph in autoridad.Persona.descripcion?.split(
                            '\r\n'
                        )"
                        class="text-sm"
                    >
                        {{ paragraph }}
                    </p>
                    <div
                        v-if="autoridad.Persona.descripcion === null"
                        class="bg-indigo-100 text-sm px-4 py-2 border-l-2 border-indigo-500 text-indigo-700 rounded-md"
                    >
                        Sin descripción por el momento
                    </div>
                </div>
                <div>
                    <h2 class="font-semibold text-lg mb-2 text-indigo-950">
                        Candidaturas
                    </h2>
                    <div class="flex flex-col">
                        <div
                            class="overflow-x-auto border border-slate-300 rounded-md"
                        >
                            <div class="inline-block min-w-full">
                                <div class="overflow-hidden">
                                    <table
                                        class="min-w-full text-left text-sm font-light"
                                    >
                                        <thead
                                            class="border-b font-medium border-slate-300 bg-slate-100"
                                        >
                                            <tr>
                                                <th
                                                    scope="col"
                                                    class="px-4 py-3"
                                                >
                                                    Año
                                                </th>
                                                <th
                                                    scope="col"
                                                    class="px-4 py-3"
                                                >
                                                    Tipo
                                                </th>
                                                <th
                                                    scope="col"
                                                    class="px-4 py-3"
                                                >
                                                    Electo
                                                </th>
                                                <th
                                                    scope="col"
                                                    class="px-4 py-3"
                                                >
                                                    Pacto
                                                </th>
                                                <th
                                                    scope="col"
                                                    class="px-4 py-3"
                                                >
                                                    Partido
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr
                                                class="border-b border-slate-300"
                                                v-for="candidatura in autoridadStore.candidaturas"
                                            >
                                                <td
                                                    class="whitespace-nowrap px-4 py-3 font-medium"
                                                >
                                                    {{
                                                        useDateFormat(
                                                            candidatura.fecha,
                                                            "YYYY"
                                                        ).value
                                                    }}
                                                </td>
                                                <td
                                                    class="whitespace-nowrap px-4 py-3"
                                                >
                                                    {{
                                                        toTitleCase(
                                                            candidatura.tipo_autoridad
                                                        )
                                                    }}
                                                </td>
                                                <td
                                                    class="whitespace-nowrap px-4 py-3 text-center"
                                                >
                                                    <Icon
                                                        v-if="
                                                            candidatura.is_elected
                                                        "
                                                        name="heroicons:check-circle-20-solid"
                                                        class="h-6 w-6 text-green-700/80"
                                                    />
                                                    <Icon
                                                        v-else
                                                        name="heroicons:x-circle-20-solid"
                                                        class="h-6 w-6 text-red-700/80"
                                                    />
                                                </td>
                                                <td
                                                    class="whitespace-nowrap px-4 py-3"
                                                >
                                                    {{
                                                        toTitleCase(
                                                            candidatura.pacto
                                                                .nombre
                                                        )
                                                    }}
                                                </td>
                                                <td
                                                    class="whitespace-nowrap px-4 py-3"
                                                >
                                                    {{
                                                        toTitleCase(
                                                            candidatura.partido
                                                                .nombre
                                                        )
                                                    }}
                                                </td>
                                            </tr>
                                            <tr
                                                v-if="
                                                    autoridad.Persona
                                                        .candidatura.length ===
                                                    0
                                                "
                                            >
                                                <td
                                                    colspan="4"
                                                    class="text-center p-2 bg-slate-50"
                                                >
                                                    Carga de datos en proceso
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>
