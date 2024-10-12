<script setup lang="ts">
import type { Elemento } from "~/types/blog";
defineProps<{
  elemento: Elemento;
}>();
</script>
<template>
  <p class="py-2">
    <slot />
    <template v-for="item in elemento?.children">
      <NuxtLink
        v-if="item.tag === 'Enlace'"
        :to="item.contenido"
        :target="item.contenido.includes('http') ? '_blank' : '_self'"
        class="mx-1 font-medium text-blue-600 underline"
      >
        {{ item.children[0]?.contenido }}
      </NuxtLink>
      <template v-if="item.tag === 'p'">
        {{ item.contenido }}
      </template>
    </template>
  </p>
</template>
