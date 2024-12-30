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
      <div class="aspect-video h-full w-full overflow-hidden !rounded-lg">
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
