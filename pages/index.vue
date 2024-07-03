<script setup lang="ts">
definePageMeta({
  layout: "without-padding",
});
</script>
<template>
  <div>
    <div class="relative min-h-[calc(100vh-6rem)] bg-gray-900">
      <div
        class="relative isolate min-h-[calc(100vh-6rem)] overflow-hidden pt-[21px]"
      >
        <div
          class="absolute top-0 -z-10 h-full min-h-[calc(100vh-6rem)] w-full bg-black/50"
        />
        <NuxtImg
          src="https://curacavi.s3.amazonaws.com/paisaje/Paisaje4.webp"
          alt="Fondo curacavi"
          loading="lazy"
          class="absolute inset-0 -z-20 h-full min-h-[calc(100vh-6rem)] w-full object-cover"
        />
        <div
          class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            class="relative aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-pink-400 to-blue-400 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] lg:top-8"
            style="
              clip-path: polygon(
                74.1% 44.1%,
                100% 61.6%,
                97.5% 26.9%,
                85.5% 0.1%,
                80.7% 2%,
                72.5% 32.5%,
                60.2% 62.4%,
                52.4% 68.1%,
                47.5% 58.3%,
                45.2% 34.5%,
                27.5% 76.7%,
                0.1% 64.9%,
                17.9% 100%,
                27.6% 76.8%,
                76.1% 97.7%,
                74.1% 44.1%
              );
            "
          ></div>
        </div>
        <div
          class="z-0 mx-auto max-w-2xl bg-transparent py-32 sm:py-48 lg:py-56"
        >
          <div class="mb-8 flex justify-center">
            <div
              class="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-200 ring-1 ring-white/50 transition duration-500 ease-in-out hover:text-gray-50 hover:ring-white/80"
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
            <p class="mt-6 text-lg leading-8 text-gray-300">
              Resumimos los principales puntos de interés, servicios e
              informaciones de la comuna de Curacaví, ubicada justo a la mitad
              entre Santiago y Valparaíso.
            </p>
            <!-- <div class="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                class="rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
                >Get started</a
              ><a href="#" class="text-sm font-semibold leading-6 text-white"
                >Learn more <span aria-hidden="true">→</span></a
              >
            </div> -->
          </div>
        </div>
        <div></div>
        <footer class="absolute bottom-0 z-10 w-full gap-x-2 text-white">
          <div
            class="mx-auto flex max-w-7xl items-center justify-center px-4 py-2"
          >
            <Icon name="mdi:copyright" class="h-4 w-4" />
            <p>
              Desarrollado por
              <a href="https://www.josevalencia.cl" target="_blank"
                >José Valencia</a
              >
            </p>
          </div>
        </footer>
        <div
          class="sm:top-[calc(100% - 30rem)] absolute inset-x-0 top-[calc(100%-13rem)] -z-10 z-0 transform-gpu overflow-hidden bg-transparent blur-3xl"
          aria-hidden="true"
        >
          <div
            class="left-[calc(50% + 3rem)] sm:left-[calc(50% + 36rem)] relative aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-pink-400 to-blue-400 opacity-20 sm:w-[72.1875rem]"
            style="
              clip-path: polygon(
                74.1% 44.1%,
                100% 61.6%,
                97.5% 26.9%,
                85.5% 0.1%,
                80.7% 2%,
                72.5% 32.5%,
                60.2% 62.4%,
                52.4% 68.1%,
                47.5% 58.3%,
                45.2% 34.5%,
                27.5% 76.7%,
                0.1% 64.9%,
                17.9% 100%,
                27.6% 76.8%,
                76.1% 97.7%,
                74.1% 44.1%
              );
            "
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
