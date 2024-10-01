<script setup lang="ts"></script>
<template>
  <div
    class="relative h-[calc(70dvh)] max-h-[500px] overflow-hidden rounded-md shadow-xl md:h-[calc(50dvh)]"
  >
    <NuxtImg
      src="https://curacavi.s3.amazonaws.com/paisaje/Paisaje4.webp"
      alt="Fondo curacavi"
      loading="eager"
      class="h-full w-full object-cover brightness-[.6]"
    />
    <div
      class="absolute inset-x-0 top-0 z-10 mx-auto flex h-full max-w-2xl flex-col items-center justify-center bg-transparent p-4 md:p-0"
    >
      <div class="mb-8 flex justify-center">
        <div
          class="relative rounded-full px-3 py-1 text-sm leading-6 text-white ring-1 ring-white transition duration-500 ease-in-out"
        >
          Pueblo de la chicha y los dulces chilenos
        </div>
      </div>
      <div class="text-center">
        <h1
          class="text-4xl font-semibold tracking-tight text-white sm:text-6xl"
        >
          Curacaví.info
        </h1>
        <p class="mt-6 text-lg leading-8 text-white">
          Resumimos los principales puntos de interés, servicios e informaciones
          de la comuna de Curacaví, ubicada justo a la mitad entre Santiago y
          Valparaíso.
        </p>
      </div>
    </div>
  </div>
</template>
