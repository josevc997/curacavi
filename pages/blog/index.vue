<script setup lang="ts">
const navigation = await queryContent("blog").sort({ created_at: -1 }).find();
</script>

<template>
  <div>
    <h2 class="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
      Blog
    </h2>
    <p class="mt-2 text-lg leading-8 text-gray-600">
      Datos, opiniones y noticias sobre la comuna de Curacavi.
    </p>
    <div class="mt-16 space-y-16 lg:mt-8 lg:space-y-8">
      <template v-if="navigation">
        <article
          v-for="(blogItem, index) in navigation"
          class="relative isolate flex flex-col gap-[2rem] rounded-2xl border bg-white shadow lg:flex-row"
        >
          <NuxtLink
            :to="blogItem._path"
            class="relative aspect-video w-full shrink-0 sm:aspect-[2/1] lg:aspect-square lg:w-64"
          >
            <NuxtImg
              :src="
                blogItem.image ? blogItem.image : 'https://placehold.co/600x400'
              "
              alt=""
              class="absolute inset-0 h-full w-full rounded-t-2xl bg-gray-50 object-cover shadow lg:rounded-s-2xl lg:rounded-tr-none"
            />
            <!-- <div
                            class="absolute inset-0 rounded-s-2xl ring-1 ring-inset ring-gray-900/10"
                        ></div> -->
          </NuxtLink>
          <div
            class="flex flex-col justify-between pb-4 pl-4 pr-4 pt-0 lg:pb-4 lg:pl-0 lg:pr-4 lg:pt-4"
          >
            <div>
              <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
                <time datetime="2020-03-16" class="capitalize text-gray-500">
                  {{
                    useDateFormat(blogItem.created_at, "MMMM DD, YYYY").value
                  }}
                </time>
                <a
                  v-for="(categoria, index) in blogItem.Categoria_Blog"
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
                class="flex items-center text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600"
                :to="blogItem._path"
              >
                <p>Ver más</p>
                <Icon name="heroicons:chevron-right-20-solid" class="h-5 w-5" />
              </NuxtLink>
            </div>
          </div>
        </article>
      </template>
    </div>
  </div>
</template>
