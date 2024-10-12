<script setup lang="ts"></script>
<template>
  <main class="relative h-full min-h-screen bg-slate-50 text-slate-800">
    <TheNavbar />
    <div class="mx-auto min-h-[calc(100vh-140px)] max-w-5xl px-4 py-10">
      <slot />
    </div>
    <TheFooter />
  </main>
</template>
