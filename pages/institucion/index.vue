<script setup lang="ts">
const institucionStore = useInstitucionStore();
institucionStore.fetchInstitucionList();
useHead({
  title: "Lista de instituciones",
});
</script>
<template>
  <div class="mb-4 text-3xl font-semibold text-slate-800">
    Instituciones Curacaví
  </div>
  <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
    <InstitucionCard
      v-for="item in institucionStore.institucionList"
      :institucion="item"
    />
  </div>
</template>
