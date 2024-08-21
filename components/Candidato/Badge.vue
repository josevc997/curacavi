<script setup lang="ts">
import type { CandidaturaWithPersona } from "~/types/candidato";
defineProps<{
  candidato: CandidaturaWithPersona;
}>();
</script>
<template>
  <div
    class="flex w-fit items-center gap-1 rounded bg-green-600 px-2 py-1 text-sm font-medium leading-none text-white backdrop-blur-lg"
  >
    <span>
      Electo
      {{
        Number(candidato.fecha.slice(0, 4)) <= 2000 ? candidato.elected_as : ""
      }}
    </span>
    <Icon name="heroicons-solid:check-circle" class="flex size-4" />
  </div>
</template>
