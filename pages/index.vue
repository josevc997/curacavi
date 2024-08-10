<script setup lang="ts">
const blogStore = useBlogStore();
blogStore.fetchFeaturedBlogList();
</script>
<template>
  <div class="grid grid-cols-1 gap-8">
    <div
      class="relative h-[calc(70dvh)] overflow-hidden rounded-md shadow-xl md:h-[calc(50dvh)]"
    >
      <NuxtImg
        src="https://curacavi.s3.amazonaws.com/paisaje/Paisaje4.webp"
        alt="Fondo curacavi"
        loading="eager"
        class="h-full w-full object-cover brightness-[.6]"
      />
      <div
        class="absolute inset-x-0 top-0 z-10 mx-auto flex h-full max-w-2xl flex-col items-center justify-center bg-transparent p-4 md:p-0"
      >
        <div class="mb-8 flex justify-center">
          <div
            class="relative rounded-full px-3 py-1 text-sm leading-6 text-white ring-1 ring-white transition duration-500 ease-in-out"
          >
            Pueblo de la chicha y los dulces chilenos
          </div>
        </div>
        <div class="text-center">
          <h1
            class="text-4xl font-semibold tracking-tight text-white sm:text-6xl"
          >
            Curacaví.info
          </h1>
          <p class="mt-6 text-lg leading-8 text-white">
            Resumimos los principales puntos de interés, servicios e
            informaciones de la comuna de Curacaví, ubicada justo a la mitad
            entre Santiago y Valparaíso.
          </p>
        </div>
      </div>
    </div>
    <div>
      <h1 class="mb-4 text-3xl font-medium">Noticias Curacaví</h1>
      <div class="grid grid-cols-1 gap-4">
        <UCarousel
          :items="blogStore.blogList"
          :key="blogStore.blogList.length"
          v-slot="{ item: noticia }"
          :ui="{
            item: 'md:basis-1/3 basis-full rounded-md overflow-hidden snap-start',
            indicators: {
              wrapper: 'bottom-2',
            },
          }"
          :prev-button="{
            color: 'primary',
            icon: 'i-heroicons-arrow-left-20-solid',
            class:
              'relative left-auto top-auto transform translate-y-0 rounded-none mt-1 rounded z-10 !text-white',
          }"
          :next-button="{
            color: 'primary',
            icon: 'i-heroicons-arrow-right-20-solid',
            class:
              'relative right-auto md:mr-2 top-0 transform translate-y-0 rounded-none mt-1 rounded z-10 !text-white',
          }"
          class="overflow-hidden"
          arrows
          indicators
        >
          <BlogIndexCard :noticia="noticia" class="md:mx-2 md:first:ml-0" />
        </UCarousel>
      </div>
    </div>
  </div>
</template>
