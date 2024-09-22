<script lang="ts" setup>
useHead({
  title: "Curacavi",
  meta: [
    {
      hid: "description",
      name: "description",
      content: "All information about Curacavi",
    },
  ],
  script: [
    {
      src: "https://js.sentry-cdn.com/194ca471f30166638276235261300c80.min.js",
      crossorigin: "anonymous",
      async: true,
    },
  ],
});
defineOgImageComponent("NuxtSeo", {
  title: "Curacavi.info",
  description:
    "Resumimos los principales puntos de interés, servicios e informaciones de la comuna de Curacaví.",
  theme: "#1e40af",
  colorMode: "light",
});
</script>
<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
