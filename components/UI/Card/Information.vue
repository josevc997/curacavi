<script setup lang="ts">
defineProps<{
  title: string;
  data: {
    type: string;
    name: string;
    value: string;
  }[];
}>();

const getIcon = (type: string) => {
  switch (type) {
    case "email":
      return "heroicons:envelope-16-solid";
    case "phone":
      return "heroicons:phone-16-solid";
    case "url":
      return "heroicons:globe-alt-16-solid";
    case "horario":
      return "heroicons:clock-16-solid";
    default:
      return "heroicons:question-mark-circle-16-solid";
  }
};

const formatLink = (item: { type: string; name: string; value: string }) => {
  switch (item.type) {
    case "email":
      return `mailto:${item.value}`;
    case "phone":
      return `tel:${item.value}`;
    case "url":
      return item.value;
    default:
      return "";
  }
};

const getValue = (item: { type: string; value: string }) => {
  switch (item.type) {
    case "phone":
      return item.value ? item.value : "+56...";
    case "url":
      return item.value ? item.value : "http://...";
    case "email":
      return item.value ? item.value : "no email";
    default:
      return item.value;
  }
};

const typesWithLink = ["email", "phone", "url"];
</script>
<template>
  <div
    class="col-span-12 rounded bg-white p-4 shadow outline outline-1 outline-neutral-600/10 sm:col-span-6 lg:col-span-4"
  >
    <h4 class="mb-1 text-lg font-semibold">{{ title }}</h4>
    <div class="grid grid-cols-1 gap-3">
      <div v-for="item in data">
        <p class="font-semibold leading-6">{{ item.name }}</p>
        <div class="flex items-center gap-2">
          <div class="flex items-center">
            <Icon :name="getIcon(item.type)" />
          </div>
          <NuxtLink
            :to="formatLink(item)"
            v-if="item.value && typesWithLink.includes(item.type)"
            class="flex break-all lowercase leading-4"
          >
            {{ getValue(item) }}
          </NuxtLink>
          <p v-else class="flex break-all lowercase leading-4">
            {{ getValue(item) }}
          </p>
        </div>
        <!-- <div v-else-if="item.type === 'phone'" class="flex items-center gap-2">
          <div class="flex items-center">
            <Icon :name="getIcon(item.type)" />
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
        </div> -->
      </div>
    </div>
  </div>
</template>
