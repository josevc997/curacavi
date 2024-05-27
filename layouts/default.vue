<script setup lang="ts"></script>
<template>
  <main class="relative h-full min-h-screen bg-slate-50 text-slate-800">
    <TheNavbar />
    <div class="mx-auto min-h-[calc(100vh-140px)] max-w-7xl px-4 py-10">
      <slot />
    </div>
    <footer
      class="mx-auto flex max-w-7xl items-center gap-x-2 border-t border-blue-200 px-4 py-4 text-slate-800"
    >
      <!-- <div> -->
      <Icon name="mdi:copyright" class="h-4 w-4" />
      <!-- </div> -->
      <p>
        <a href="https://www.josevalencia.cl" target="_blank">
          Desarrollado por
          <span class="font-medium"> José Valencia </span>
        </a>
      </p>
    </footer>
  </main>
</template>
