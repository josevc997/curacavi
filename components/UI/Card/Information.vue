<script setup lang="ts">
defineProps<{
  title: string;
  data: {
    key: string;
    value: string;
    type: string;
  }[];
}>();
</script>
<template>
  <div
    class="col-span-12 rounded bg-white p-4 shadow outline outline-1 outline-neutral-600/10 sm:col-span-6 lg:col-span-4"
  >
    <h4 class="mb-1 text-lg font-semibold">{{ title }}</h4>
    <div class="grid grid-cols-1 gap-3">
      <div v-for="item in data">
        <p class="font-semibold leading-6">{{ item.key }}</p>
        <div v-if="item.type === 'email'" class="flex items-center gap-2">
          <div class="flex items-center">
            <Icon name="heroicons:envelope-16-solid" />
          </div>
          <NuxtLink
            :to="`mailto:${item.value}`"
            class="flex break-all lowercase leading-4"
          >
            {{ item.value }}
          </NuxtLink>
        </div>
        <div v-else-if="item.type === 'phone'" class="flex items-center gap-2">
          <div class="flex items-center">
            <Icon name="heroicons:phone-16-solid" />
          </div>
          <NuxtLink
            v-if="item.value"
            :to="`tel:${item.value}`"
            class="flex lowercase leading-4"
          >
            {{ item.value ?? "+56..." }}
          </NuxtLink>
          <p v-else class="flex lowercase leading-4">+56...</p>
        </div>
        <div v-else-if="item.type === 'url'" class="flex items-center gap-2">
          <div class="flex items-center">
            <Icon name="heroicons:globe-alt-16-solid" />
          </div>
          <NuxtLink
            v-if="item.value"
            :to="`${item.value}`"
            target="_blank"
            class="flex break-all lowercase leading-4"
          >
            {{ item.value }}
          </NuxtLink>
          <p v-else class="flex break-all lowercase leading-4">http://...</p>
        </div>
      </div>
    </div>
  </div>
</template>
