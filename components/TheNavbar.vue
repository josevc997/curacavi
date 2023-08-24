<script setup lang="ts"></script>
<template>
  <header class="sticky top-0 w-full shadow bg-slate-50 text-slate-800 z-50">
    <BannerUnderConstruction class="" />
    <div
      class="max-w-7xl mx-auto flex justify-between items-center px-4 text-sm py-2"
    >
      <NuxtLink
        to="/"
        class="flex items-center gap-x-2 text-indigo-800 font-bold text-xl uppercase"
      >
        <NuxtImg
          src="https://curacavi.s3.amazonaws.com/logo.webp"
          class="h-8 w-8"
        />
        <p>Curacaví</p>
      </NuxtLink>
      <div class="flex gap-x-2">
        <NuxtLink
          to="/colegio"
          active-class="text-indigo-500"
          class="flex items-center gap-x-2 text-indigo-950 font-semibold hover:text-indigo-600 transition-all duration-500 ease-in-out text-sm uppercase"
        >
          Colegios
        </NuxtLink>
        <NuxtLink
          to="/autoridad"
          active-class="text-indigo-500"
          activ
          class="flex items-center gap-x-2 text-indigo-950 font-semibold hover:text-indigo-600 transition-all duration-500 ease-in-out text-sm uppercase"
        >
          Autoridades
        </NuxtLink>
      </div>
      <!-- <TheLanguageSelector /> -->
    </div>
  </header>
</template>
