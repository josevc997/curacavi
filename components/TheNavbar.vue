<script setup lang="ts">
const NuxtLink = resolveComponent("nuxt-link");
const navigation = [
  { name: "Colegios", href: "/colegio" },
  { name: "Autoridades", href: "/autoridad" },
  { name: "Candidatos", href: "/candidato" },
  { name: "Blog", href: "/blog" },
];
</script>
<template>
  <header class="sticky top-0 z-50 w-full bg-slate-50 text-slate-800 shadow">
    <BannerUnderConstruction class="" />
    <Disclosure as="nav" class="bg-slate-50" v-slot="{ open }">
      <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div class="relative flex h-16 items-center justify-between">
          <div class="absolute inset-y-0 right-0 flex items-center sm:hidden">
            <!-- Mobile menu button-->
            <ClientOnly>
              <DisclosureButton
                class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-blue-950 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <span class="absolute -inset-0.5" />
                <span class="sr-only">Open main menu</span>
                <Icon
                  v-if="!open"
                  name="heroicons:bars-3-20-solid"
                  class="block h-6 w-6"
                  aria-hidden="true"
                />
                <Icon
                  v-else
                  name="heroicons:x-mark-20-solid"
                  class="block h-6 w-6"
                  aria-hidden="true"
                />
              </DisclosureButton>
            </ClientOnly>
          </div>
          <div
            class="flex flex-1 items-center justify-start sm:items-stretch sm:justify-between"
          >
            <div class="flex flex-shrink-0 items-center">
              <NuxtLink
                to="/"
                class="flex items-center gap-x-2 text-xl font-semibold uppercase text-blue-800"
              >
                <NuxtImg
                  src="https://curacavi.s3.amazonaws.com/logo.webp"
                  class="h-8 w-8"
                  alt="Curacaví"
                  loading="lazy"
                />
                <p>Curacaví</p>
              </NuxtLink>
            </div>
            <div class="hidden sm:ml-6 sm:block">
              <div class="flex space-x-4">
                <NuxtLink
                  v-for="item in navigation"
                  :key="item.name"
                  :to="item.href"
                  class="rounded-md px-3 py-2 text-sm font-medium text-blue-900 hover:bg-blue-50 hover:text-blue-950"
                  active-class="bg-blue-50 text-blue-500"
                  >{{ item.name }}</NuxtLink
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel class="sm:hidden">
        <div class="space-y-1 px-2 pb-3 pt-2">
          <ClientOnly>
            <DisclosureButton
              v-for="item in navigation"
              :key="item.name"
              :as="NuxtLink"
              :to="item.href"
              active-class="bg-blue-50 text-blue-950"
              class="block rounded-md px-3 py-2 text-base font-medium text-blue-900 hover:bg-blue-50 hover:text-blue-950"
              >{{ item.name }}</DisclosureButton
            >
          </ClientOnly>
        </div>
      </DisclosurePanel>
    </Disclosure>
  </header>
</template>
