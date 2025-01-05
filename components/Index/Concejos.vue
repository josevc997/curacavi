<script setup lang="ts">
const concejoStore = useConcejoStore();
</script>
<template>
  <div>
    <h2 class="mb-4 text-3xl font-medium">
      Concejos Municipales <span class="sr-only">Curacavi</span>
    </h2>
    <UCarousel
      :items="concejoStore.concejos"
      v-slot="{ item }"
      arrows
      indicators
      :ui="{
        container: 'gap-2 py-2 sm:pr-4 pb-10',
        item: 'snap-start basis-full md:basis-1/2 sm:basis-2/3 aspect-video',
      }"
      :prev-button="{
        color: 'gray',
        icon: 'i-heroicons-arrow-left-20-solid',
        class: 'z-20',
      }"
      :next-button="{
        color: 'gray',
        icon: 'i-heroicons-arrow-right-20-solid',
        class: 'z-20',
      }"
    >
      <div
        v-if="item.show_as === '2'"
        class="aspect-video h-full w-full overflow-hidden !rounded-lg"
      >
        <NuxtLink :to="item.embed_src" class="relative" target="_blank">
          <NuxtImg
            :src="item.image.image"
            alt="Concejo Municipal"
            class="aspect-video h-full w-full object-cover"
          />
          <div
            class="absolute left-0 top-0 z-10 h-full w-full bg-opacity-50 bg-gradient-to-b from-black/60 to-transparent to-30% p-4 text-lg text-white"
          >
            {{ item.image.name }}
          </div>
        </NuxtLink>
      </div>
      <div
        v-else
        class="aspect-video h-full w-full overflow-hidden !rounded-lg"
      >
        <iframe
          width="560"
          height="315"
          :src="item.embed_src"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
          class="aspect-video h-full !w-full"
        ></iframe>
      </div>
    </UCarousel>
  </div>
</template>
