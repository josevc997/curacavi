<script setup lang="ts">
import type { Elemento } from "~/types/blog";
defineProps<{
  elemento: Elemento;
}>();
</script>
<template>
  <div
    class="mx-auto flex w-full items-center justify-center"
    v-html="elemento.contenido"
  ></div>
</template>
