<script setup lang="ts"></script>
<template>
    <div>
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Blog
        </h2>
        <p class="mt-2 text-lg leading-8 text-gray-600">
            Datos opiniones y noticias sobre la comuna de Curacavi.
        </p>
        <div class="mt-16 space-y-16 lg:mt-8 lg:space-y-8">
            <article
                v-for="index in 6"
                class="relative isolate flex flex-col gap-[2rem] lg:flex-row"
            >
                <div
                    class="relative aspect-video sm:aspect-[2/1] lg:aspect-square w-full lg:w-64 shrink-0"
                >
                    <img
                        src="https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=3603&amp;q=80"
                        alt=""
                        class="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
                    />
                    <div
                        class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10"
                    ></div>
                </div>
                <div class="flex flex-col justify-between">
                    <div>
                        <div class="flex items-center gap-4 text-xs">
                            <time datetime="2020-03-16" class="text-gray-500"
                                >Mar 16, 2020</time
                            ><a
                                href="#"
                                class="relative z-10 rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-200"
                                >Marketing</a
                            >
                        </div>
                        <div class="group relative">
                            <h3
                                class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600"
                            >
                                <NuxtLink :to="`/noticia/${index}`"
                                    ><span class="absolute inset-0"></span>Boost
                                    your conversion rate</NuxtLink
                                >
                            </h3>
                            <p class="mt-5 text-sm leading-6 text-gray-600">
                                Illo sint voluptas. Error voluptates culpa
                                eligendi. Hic vel totam vitae illo. Non aliquid
                                explicabo necessitatibus unde. Sed
                                exercitationem placeat consectetur nulla
                                deserunt vel iusto corrupti dicta laboris
                                incididunt.
                            </p>
                        </div>
                    </div>
                    <div class="mt-6 flex border-t border-gray-900/5 pt-6">
                        <div class="relative flex items-center gap-4">
                            <img
                                src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                                alt=""
                                class="h-10 w-10 rounded-full bg-gray-50"
                            />
                            <div class="text-sm leading-6">
                                <p class="font-semibold text-gray-900">
                                    <a href="#"
                                        ><span class="absolute inset-0"></span
                                        >Michael Foster</a
                                    >
                                </p>
                                <p class="text-gray-600">Co-Founder / CTO</p>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    </div>
</template>
