<script setup lang="ts">
const autoridadStore = useAutoridadStore();
</script>
<template>
  <div>
    <h2 class="mb-4 text-3xl font-medium">Autoridades</h2>
    <UCarousel
      :items="autoridadStore.autoridades"
      v-slot="{ item: autoridad }"
      arrows
      indicators
      :ui="{
        container: 'gap-2 py-2 sm:pr-4 pb-10',
        item: 'snap-start lg:basis-1/3 basis-full md:basis-1/2 sm:basis-2/3',
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
      <AutoridadCard :autoridad="autoridad" class="w-full" />
    </UCarousel>
  </div>
</template>
