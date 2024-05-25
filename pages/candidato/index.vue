<script setup lang="ts">
const candidaturaStore = useCandidaturaStore();

const loadingCandidaturas = ref(false);
const responseData = ref(null as any);

const handleSearch = async () => {
  loadingCandidaturas.value = true;
  await candidaturaStore.fetchCandidaturas();
  loadingCandidaturas.value = false;
  // const { data, error } = await useFetch("http://localhost:8081/candidaturas")
};

await handleSearch();

useHead({
  title: "Lista de Candidaturas - Curacavi",
});
</script>
<template>
  <div
    class="grid grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
  >
    <!-- <div v-for="candidato in candidaturaStore.candidaturas">
      {{ candidato.id }}
    </div> -->
    <ClientOnly>
      <CandidatoCard
        v-for="candidato in candidaturaStore.candidaturas"
        :candidato="candidato"
      />
    </ClientOnly>
  </div>
</template>
