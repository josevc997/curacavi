<script setup lang="ts"></script>
<template>
  <main class="relative h-full bg-slate-50 text-slate-800">
    <TheNavbar />
    <div class="min-h-[calc(71.84680vh-140px)]">
      <slot />
    </div>
    <TheFooter class="static bottom-0" />
  </main>
</template>
