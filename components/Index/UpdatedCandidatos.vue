<script setup lang="ts">
const candidaturaStore = useCandidaturaStore();
</script>
<template>
  <div>
    <h2 class="mb-4 text-3xl font-medium">Candidatos Actualizados</h2>
    <UCarousel
      :items="candidaturaStore.updatedCandidaturas"
      v-slot="{ item: candidatura }"
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
      <CandidatoCard :candidato="candidatura" class="w-full" />
    </UCarousel>
  </div>
</template>
