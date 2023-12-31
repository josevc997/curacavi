<script setup lang="ts">
import mapboxgl from "mapbox-gl";

const route = useRoute();
const colegioStore = useColegioStore();
const { toTitleCase } = useTextUtils();

const colegio = computed(() => {
    if (colegioStore.selectedColegio) {
        return colegioStore.selectedColegio;
    }
});

const coordenadas = computed(() => {
    if (colegio.value) {
        const coordenadasArray = JSON.parse(colegio.value.coordenadas) as [
            number,
            number
        ];
        return new mapboxgl.LngLat(coordenadasArray[0], coordenadasArray[1]);
    }
});

colegioStore.fetchColegioById(Number(route.params.id));

watch(
    () => route.params.id,
    (newId, oldId) => {
        colegioStore.fetchColegioById(Number(route.params.id));
    }
);

useHead({
    titleTemplate: (titleChunk) => {
        return colegio && colegio.value && colegio.value?.nombre
            ? `${colegio.value?.nombre} - Curacavi`
            : "Colegio - Curacavi";
    },
});
</script>
<template>
    <div class="grid grid-cols-12 gap-y-8 sm:gap-x-4 py-4">
        <template v-if="colegio">
            <div class="col-span-12 flex flex-col gap-4">
                <div class="leading-tight pb-4">
                    <h1 class="text-2xl text-indigo-800 font-bold col-span-12">
                        {{ toTitleCase(colegio.nombre) }}
                    </h1>
                    <p class="capitalize text-sm font-semibold text-indigo-950">
                        {{ toTitleCase(colegio.calle) }}
                    </p>
                </div>
                <div>
                    <NuxtImg
                        :src="
                            colegio.cover_image ??
                            'https://curacavi.s3.amazonaws.com/colegios/placeholder-school.jpg'
                        "
                        :alt="colegio.nombre"
                        loading="lazy"
                        class="rounded-md object-cover object-center w-full h-80 sm:h-full sm:aspect-[5/2] shadow shadow-indigo-500/40"
                    />
                </div>
                <section>
                    <div class="mt-4">
                        <div>
                            <div class="px-4 sm:px-0">
                                <h3
                                    class="text-lg font-semibold leading-7 text-indigo-700"
                                >
                                    Información Institucional
                                </h3>
                                <p
                                    class="mt-1 max-w-2xl text-sm leading-6 text-indigo-900"
                                >
                                    Información General de la Institución
                                </p>
                            </div>
                            <div class="mt-6">
                                <dl class="grid grid-cols-1 sm:grid-cols-2">
                                    <div
                                        class="border-t border-indigo-600/40 px-4 py-6 sm:col-span-1 col-span-2 sm:px-0"
                                    >
                                        <dt
                                            class="text-sm font-medium leading-6 text-indigo-700"
                                        >
                                            Correo
                                        </dt>
                                        <dd
                                            class="mt-1 text-sm leading-6 text-indigo-950 sm:mt-2"
                                        >
                                            {{ colegio.mail }}
                                        </dd>
                                    </div>
                                    <div
                                        class="border-t border-indigo-600/40 px-4 py-6 sm:col-span-1 col-span-2 sm:px-0"
                                    >
                                        <dt
                                            class="text-sm font-medium leading-6 text-indigo-700"
                                        >
                                            Telefono
                                        </dt>
                                        <dd
                                            class="mt-1 text-sm leading-6 text-indigo-950 sm:mt-2"
                                        >
                                            {{ colegio.telefono }}
                                        </dd>
                                    </div>
                                    <div
                                        class="border-t border-indigo-600/40 px-4 py-6 sm:col-span-1 sm:px-0"
                                    >
                                        <dt
                                            class="text-sm font-medium leading-6 text-indigo-700"
                                        >
                                            Website
                                        </dt>
                                        <dd
                                            class="mt-1 text-sm leading-6 text-indigo-950 sm:mt-2"
                                        >
                                            {{ colegio.url }}
                                        </dd>
                                    </div>
                                    <div
                                        class="border-t border-indigo-600/40 px-4 py-6 sm:col-span-1 col-span-2 sm:px-0"
                                    >
                                        <dt
                                            class="text-sm font-medium leading-6 text-indigo-700"
                                        >
                                            Director
                                        </dt>
                                        <dd
                                            class="mt-1 text-sm leading-6 text-indigo-950 sm:mt-2"
                                        >
                                            {{ colegio.director }}
                                        </dd>
                                    </div>
                                    <div
                                        class="border-t border-indigo-600/40 px-4 py-6 sm:col-span-1 col-span-2 sm:px-0"
                                    >
                                        <dt
                                            class="text-sm font-medium leading-6 text-indigo-700"
                                        >
                                            Dependencia
                                        </dt>
                                        <dd
                                            class="mt-1 text-sm leading-6 text-indigo-950 sm:mt-2"
                                        >
                                            {{ colegio.dependencia }}
                                        </dd>
                                    </div>
                                    <div
                                        class="border-t border-indigo-600/40 px-4 py-6 sm:col-span-1 col-span-2 sm:px-0"
                                    >
                                        <dt
                                            class="text-sm font-medium leading-6 text-indigo-700"
                                        >
                                            Orientación religiosa
                                        </dt>
                                        <dd
                                            class="mt-1 text-sm leading-6 text-indigo-950 sm:mt-2"
                                        >
                                            {{ colegio.orientacionReligiosa }}
                                        </dd>
                                    </div>
                                    <div
                                        class="border-t border-indigo-600/40 px-4 py-6 sm:col-span-1 col-span-2 sm:px-0"
                                    >
                                        <dt
                                            class="text-sm font-medium leading-6 text-indigo-700"
                                        >
                                            Política de Uniforme
                                        </dt>
                                        <dd
                                            class="mt-1 text-sm leading-6 text-indigo-950 sm:mt-2"
                                        >
                                            {{ colegio.politicaUniforme }}
                                        </dd>
                                    </div>
                                    <div
                                        class="border-t border-indigo-600/40 px-4 py-6 sm:col-span-1 col-span-2 sm:px-0"
                                    >
                                        <dt
                                            class="text-sm font-medium leading-6 text-indigo-700"
                                        >
                                            Nivel Minimo
                                        </dt>
                                        <dd
                                            class="mt-1 text-sm leading-6 text-indigo-950 sm:mt-2"
                                        >
                                            {{ colegio.nivelMinimo }}
                                        </dd>
                                    </div>
                                    <div
                                        class="border-t border-indigo-600/40 px-4 py-6 sm:col-span-1 col-span-2 sm:px-0"
                                    >
                                        <dt
                                            class="text-sm font-medium leading-6 text-indigo-700"
                                        >
                                            Nivel Máximo
                                        </dt>
                                        <dd
                                            class="mt-1 text-sm leading-6 text-indigo-950 sm:mt-2"
                                        >
                                            {{ colegio.nivelMaximo }}
                                        </dd>
                                    </div>
                                    <div
                                        class="border-t border-indigo-600/40 px-4 py-6 sm:col-span-1 col-span-2 sm:px-0"
                                    >
                                        <dt
                                            class="text-sm font-medium leading-6 text-indigo-700"
                                        >
                                            Promedio alumnos por curso
                                        </dt>
                                        <dd
                                            class="mt-1 text-sm leading-6 text-indigo-950 sm:mt-2"
                                        >
                                            {{
                                                colegio.promedioAlumnosPorCurso
                                            }}
                                        </dd>
                                    </div>
                                    <div
                                        class="border-t border-indigo-600/40 px-4 py-6 sm:col-span-1 col-span-2 sm:px-0"
                                    >
                                        <dt
                                            class="text-sm font-medium leading-6 text-indigo-700"
                                        >
                                            Cantidad docentes
                                        </dt>
                                        <dd
                                            class="mt-1 text-sm leading-6 text-indigo-950 sm:mt-2"
                                        >
                                            {{ colegio.cantidadDocentes }}
                                        </dd>
                                    </div>
                                    <div
                                        class="border-t border-indigo-600/40 px-4 py-6 col-span-1 sm:px-0"
                                    >
                                        <dt
                                            class="text-sm font-medium leading-6 text-indigo-700"
                                        >
                                            Alumnos Matriculados
                                        </dt>
                                        <dd
                                            class="mt-1 text-sm leading-6 text-indigo-950 sm:mt-2"
                                        >
                                            {{ colegio.alumnosMatriculados }}
                                        </dd>
                                    </div>
                                    <div
                                        class="border-t border-indigo-600/40 px-4 py-6 col-span-2 sm:px-0"
                                    >
                                        <dt
                                            class="text-sm font-medium leading-6 text-indigo-700"
                                        >
                                            Resumen proyecto educativo
                                        </dt>
                                        <dd
                                            class="mt-1 text-sm leading-6 text-indigo-950 sm:mt-2 grid gap-3"
                                        >
                                            <template
                                                v-if="colegio.resumenProyecto"
                                            >
                                                <p
                                                    v-for="paragraph in colegio.resumenProyecto.split(
                                                        '\r\n'
                                                    )"
                                                    class="text-sm"
                                                >
                                                    {{ paragraph }}
                                                </p>
                                            </template>
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="map">
                    <div
                        v-if="colegio.coordenadas && coordenadas"
                        class="relative h-96 w-full"
                    >
                        <MapboxMap
                            :map-id="`colegio.${colegio.id}`"
                            style="border-radius: 5px"
                            :options="{
                                style: 'mapbox://styles/mapbox/streets-v12', // style URL
                                center: coordenadas, // starting position
                                zoom: 14, // starting zoom
                            }"
                        >
                            <MapboxDefaultMarker
                                :marker-id="`marker${colegio.id}`"
                                :options="{}"
                                :lnglat="coordenadas"
                            >
                            </MapboxDefaultMarker>
                        </MapboxMap>
                    </div>
                </section>
            </div>
        </template>
    </div>
</template>
