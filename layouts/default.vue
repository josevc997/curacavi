<script setup lang="ts">
const { locale, availableLocales } = useI18n();
</script>
<template>
  <main class="min-h-screen h-full bg-slate-50 text-slate-800 relative">
    <header
      class="sticky top-0 w-full shadow py-2 bg-slate-50 text-slate-800 z-50"
    >
      <div
        class="max-w-7xl mx-auto flex justify-between items-center px-4 text-sm"
      >
        <NuxtLink to="/" class="flex items-center">
          <NuxtImg
            src="https://curacavi.s3.amazonaws.com/logo.webp"
            class="h-8 w-8"
          />
        </NuxtLink>
        <Listbox v-model="locale">
          <div class="relative">
            <ListboxButton
              class="relative w-full cursor-default rounded-lg bg-slate-50 text-slate-800 border border-slate-800 py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
            >
              <span class="block truncate">{{ locale }}</span>
              <span
                class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
              >
                <Icon
                  name="heroicons:chevron-up-down-20-solid"
                  class="h-5 w-5 text-slate-500"
                  aria-hidden="true"
                />
              </span>
            </ListboxButton>

            <transition
              leave-active-class="transition duration-100 ease-in"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <ListboxOptions
                class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-slate-50 text-slate-800 border border-slate-800 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              >
                <ListboxOption
                  v-slot="{ active, selected }"
                  v-for="person in availableLocales"
                  :key="person"
                  :value="person"
                  as="template"
                >
                  <li
                    :class="[
                      active ? 'bg-slate-200 text-slate-800' : 'text-slate-500',
                      'relative cursor-default select-none py-2 px-2 transition duration-100 ease-in-out',
                    ]"
                  >
                    <span
                      :class="[
                        selected ? 'font-medium' : 'font-normal',
                        'block truncate',
                      ]"
                      >{{ person }}</span
                    >
                    <span
                      v-if="selected"
                      class="absolute inset-y-0 right-1 flex items-center pl-3 text-slate-600"
                    >
                      <Icon
                        name="heroicons:check-circle-20-solid"
                        class="h-5 w-5"
                        aria-hidden="true"
                      />
                    </span>
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </transition>
          </div>
        </Listbox>
      </div>
    </header>
    <div class="max-w-5xl mx-auto px-4 py-2">
      <slot />
    </div>
  </main>
</template>
