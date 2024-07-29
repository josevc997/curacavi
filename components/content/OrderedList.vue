<script setup lang="ts">
import type { Elemento } from "~/types/blog";
defineProps<{
  elemento: Elemento;
}>();
</script>
<template>
  <div class="mt-2">
    <p class="text-lg font-medium">{{ elemento.contenido }}</p>
    <ol class="list-inside list-decimal">
      <li v-for="item in elemento.children">
        {{ item.contenido }}
      </li>
    </ol>
  </div>
</template>
