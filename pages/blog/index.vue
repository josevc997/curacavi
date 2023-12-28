<script setup lang="ts">
const navigation = await queryContent("blog").sort({ created_at: -1 }).find();
</script>

<template>
    <div>
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Blog
        </h2>
        <p class="mt-2 text-lg leading-8 text-gray-600">
            Datos, opiniones y noticias sobre la comuna de Curacavi.
        </p>
        <div class="mt-16 space-y-16 lg:mt-8 lg:space-y-8">
            <template v-if="navigation">
                <article
                    v-for="(blogItem, index) in navigation"
                    class="relative isolate flex flex-col gap-[2rem] lg:flex-row border rounded-2xl bg-white shadow"
                >
                    <NuxtLink
                        :to="blogItem._path"
                        class="relative aspect-video sm:aspect-[2/1] lg:aspect-square w-full lg:w-64 shrink-0"
                    >
                        <NuxtImg
                            :src="
                                blogItem.image
                                    ? blogItem.image
                                    : 'https://placehold.co/600x400'
                            "
                            alt=""
                            class="absolute inset-0 h-full w-full lg:rounded-s-2xl lg:rounded-tr-none rounded-t-2xl bg-gray-50 object-cover shadow"
                        />
                        <!-- <div
                            class="absolute inset-0 rounded-s-2xl ring-1 ring-inset ring-gray-900/10"
                        ></div> -->
                    </NuxtLink>
                    <div
                        class="flex flex-col justify-between pt-0 pb-4 pl-4 pr-4 lg:pt-4 lg:pb-4 lg:pl-0 lg:pr-4"
                    >
                        <div>
                            <div
                                class="flex items-center gap-x-4 gap-y-2 text-xs flex-wrap"
                            >
                                <time
                                    datetime="2020-03-16"
                                    class="text-gray-500 capitalize"
                                >
                                    {{
                                        useDateFormat(
                                            blogItem.created_at,
                                            "MMMM DD, YYYY"
                                        ).value
                                    }}
                                </time>
                                <a
                                    v-for="(
                                        categoria, index
                                    ) in blogItem.Categoria_Blog"
                                    :key="index"
                                    href="#"
                                    class="relative z-10 rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-200"
                                    >{{ categoria.Categoria.nombre }}</a
                                >
                            </div>
                            <div class="group relative">
                                <h3
                                    class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600"
                                >
                                    <NuxtLink :to="blogItem._path"
                                        ><span class="absolute inset-0"></span
                                        >{{ blogItem.title }}</NuxtLink
                                    >
                                </h3>
                                <p class="mt-5 text-sm leading-6 text-gray-600">
                                    {{ blogItem.description }}
                                </p>
                            </div>
                        </div>
                        <div class="flex justify-end">
                            <NuxtLink
                                class="items-center flex text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600"
                                :to="blogItem._path"
                            >
                                <p>Ver más</p>
                                <Icon
                                    name="heroicons:chevron-right-20-solid"
                                    class="h-5 w-5"
                                />
                            </NuxtLink>
                        </div>
                    </div>
                </article>
            </template>
        </div>
    </div>
</template>
