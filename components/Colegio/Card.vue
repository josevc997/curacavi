<script setup lang="ts">
import type { Colegio } from "~/types/colegio";

const { toTitleCase } = useTextUtils();

defineProps<{
    colegio: Colegio;
}>();
</script>
<template>
    <NuxtLink
        :to="`/colegio/${colegio.id}`"
        :key="colegio.rbd"
        class="border rounded border-slate-300"
    >
        <div class="relative group overflow-hidden shadow">
            <NuxtImg
                class="aspect-[3/2] w-full rounded object-cover group-hover:scale-105 transition-all duration-500 ease-in-out"
                :src="
                    colegio.cover_image ??
                    'https://curacavi.s3.amazonaws.com/colegios/placeholder-school.jpg'
                "
                :alt="colegio.nombre"
            />
            <div
                class="absolute w-full h-full bg-gradient-to-t from-black/50 group-hover:from-black/80 transition-all duration-500 ease-in to-transparent top-0 rounded flex flex-col justify-between p-2 text-white"
            >
                <div
                    class="w-fit px-2 py-1 rounded-full flex items-center gap-x-1 backdrop-blur-lg bg-slate-900/30"
                >
                    <Icon
                        name="heroicons:currency-dollar-20-solid"
                        class="h-5 w-5"
                    />
                    <p>
                        {{ toTitleCase(colegio.dependencia) }}
                    </p>
                </div>
                <div>
                    <h3
                        class="text-base font-semibold leading-5 tracking-tight"
                    >
                        {{ toTitleCase(colegio.nombre) }}
                    </h3>
                    <p class="text-sm font-normal text-slate-200">
                        {{ toTitleCase(colegio.calle) }}
                    </p>
                </div>
            </div>
        </div>
    </NuxtLink>
</template>
