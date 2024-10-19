<script setup lang="ts">
const NuxtLink = resolveComponent("nuxt-link");
const navigation = [
  { name: "Inicio", href: "/" },
  { name: "Colegios", href: "/colegio" },
  // { name: "Instituciones", href: "/institucion" },
  {
    name: "Política",
    subNavigation: [
      { name: "Autoridades", href: "/autoridad" },
      { name: "Candidatos", href: "/candidato" },
    ],
  },
  { name: "Blog", href: "/blog" },
  { name: "Contacto", href: "/contacto" },
];
</script>
<template>
  <header class="sticky top-0 z-50 w-full bg-slate-50 text-slate-800 shadow">
    <!-- <BannerUnderConstruction class="" /> -->
    <Disclosure as="nav" class="bg-slate-50" v-slot="{ open, close }">
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
                <template v-for="item in navigation">
                  <NuxtLink
                    v-if="!item.subNavigation"
                    :key="item.name"
                    :to="item.href"
                    class="rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition duration-200 ease-in-out hover:bg-blue-100 hover:text-blue-950"
                    active-class="bg-blue-100 text-blue-500 hover:!bg-blue-200 hover:text-blue-950"
                    >{{ item.name }}</NuxtLink
                  >
                  <Menu v-else as="div" class="relative inline-block text-left">
                    <div>
                      <MenuButton
                        class="trabnsition inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-slate-700 duration-200 ease-in-out hover:bg-blue-100 hover:text-blue-950"
                      >
                        {{ item.name }}
                        <Icon
                          name="heroicons:chevron-down-20-solid"
                          class="-mr-1 ml-2 h-5 w-5 text-slate-700 hover:text-blue-600"
                          aria-hidden="true"
                        />
                      </MenuButton>
                    </div>

                    <transition
                      enter-active-class="transition duration-100 ease-out"
                      enter-from-class="transform scale-95 opacity-0"
                      enter-to-class="transform scale-100 opacity-100"
                      leave-active-class="transition duration-75 ease-in"
                      leave-from-class="transform scale-100 opacity-100"
                      leave-to-class="transform scale-95 opacity-0"
                    >
                      <MenuItems
                        class="absolute right-0 mt-4 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
                      >
                        <div class="px-1 py-1">
                          <MenuItem
                            v-for="subitem in item.subNavigation"
                            :as="NuxtLink"
                            :to="subitem.href"
                            v-slot="{ close }"
                          >
                            <button
                              :class="[
                                'group flex w-full items-center rounded-md px-2 py-2 text-sm transition-all duration-200 ease-in-out hover:bg-blue-100',
                              ]"
                              @click="close"
                            >
                              {{ subitem.name }}
                            </button>
                          </MenuItem>
                        </div>
                      </MenuItems>
                    </transition>
                  </Menu>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel class="sm:hidden">
        <div class="space-y-1 px-2 pb-3 pt-2">
          <ClientOnly>
            <template v-for="item in navigation" :key="item.name">
              <DisclosureButton
                v-if="!item.subNavigation"
                :as="NuxtLink"
                :to="item.href"
                @click="close"
                active-class="bg-blue-100 hover:!bg-blue-200 text-blue-950"
                class="block rounded-md px-3 py-2 text-base font-medium text-slate-900 transition-all duration-200 ease-in-out hover:bg-blue-100 hover:text-blue-950"
                >{{ item.name }}</DisclosureButton
              >
              <Disclosure v-else v-slot="{ innerOpen }">
                <DisclosureButton
                  class="flex w-full justify-between rounded-md px-3 py-2 text-base font-medium text-slate-700 hover:bg-blue-100"
                >
                  <span>{{ item.name }}</span>
                  <Icon
                    v-if="!innerOpen"
                    name="heroicons:chevron-down-20-solid"
                    class="-mr-1 ml-2 h-5 w-5 text-slate-700 hover:text-slate-600"
                    aria-hidden="true"
                  />
                  <Icon
                    v-else
                    name="heroicons:chevron-up-20-solid"
                    class="-mr-1 ml-2 h-5 w-5 text-slate-700 hover:text-slate-600"
                    aria-hidden="true"
                  />
                </DisclosureButton>
                <DisclosurePanel class="space-y-1 px-2"
                  ><template
                    v-for="subitem in item.subNavigation"
                    :key="subitem.name"
                  >
                    <NuxtLink
                      :to="subitem.href"
                      class="block rounded-md px-3 py-2 text-base font-medium text-slate-700 hover:bg-blue-100 hover:text-blue-950"
                      @click="close"
                      >{{ subitem.name }}</NuxtLink
                    ></template
                  ></DisclosurePanel
                >
              </Disclosure>
            </template>
          </ClientOnly>
        </div>
      </DisclosurePanel>
    </Disclosure>
  </header>
</template>
