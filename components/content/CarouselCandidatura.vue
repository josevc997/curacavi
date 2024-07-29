<script setup lang="ts">
import type { Elemento } from "~/types/blog";

const props = defineProps<{
  elemento: Elemento;
}>();

const candidaturaStore = useCandidaturaStore();

const candidaturaIdList = computed(() => {
  const itemList: number[] = [];
  props.elemento.children.forEach((item) => {
    itemList.push(Number(item.contenido));
  });
  return itemList;
});

candidaturaStore.fetchCandidaturasByIdList(candidaturaIdList.value);
</script>
<template>
  <div class="mt-2">
    <p class="text-lg font-semibold capitalize">{{ elemento.contenido }}</p>
    <UCarousel
      :items="candidaturaStore.candidaturas"
      v-slot="{ item: candidato }"
      :ui="{
        item: 'md:basis-1/3 basis-full rounded-md overflow-hidden snap-start',
        indicators: {
          wrapper: 'bottom-2',
        },
      }"
    >
      <CandidatoCard :candidato="candidato" class="mr-2 w-full" />
    </UCarousel>
  </div>
</template>
