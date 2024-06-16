<script setup lang="ts">
const props = defineProps<{
  items: { value: string; text: string }[];
  name: string;
  nameClass: string;
  selectedValue?: string;
}>();

const emit = defineEmits(["handleSelect"]);

const selectedItem = ref(
  props.items.find((item) => item.value === props.selectedValue) ||
    props.items[0],
);

watch(
  () => props.selectedValue,
  (newValue) => {
    selectedItem.value =
      props.items.find((item) => item.value === newValue) || props.items[0];
  },
);
</script>
<template>
  <Listbox
    v-model="selectedItem"
    @update:modelValue="(value) => emit('handleSelect', value)"
  >
    <div class="relative">
      <ListboxLabel :class="nameClass">{{ name }}</ListboxLabel>
      <ListboxButton
        class="relative h-10 w-full cursor-default rounded border bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-300 sm:text-sm"
      >
        <span class="block truncate">{{ selectedItem.text }}</span>
        <span
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
        >
          <Icon
            name="heroicons:chevron-up-down-20-solid"
            class="h-5 w-5 text-gray-400"
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
          class="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <ListboxOption
            v-slot="{ active, selected }"
            v-for="item in items"
            :key="item.value"
            :value="item"
            as="template"
          >
            <li
              :class="[
                active ? 'bg-slate-100 text-slate-900' : 'text-gray-900',
                'relative cursor-default select-none py-2 pl-10 pr-4',
              ]"
            >
              <span
                :class="[
                  selected ? 'font-medium' : 'font-normal',
                  'block truncate',
                ]"
                >{{ item.text }}</span
              >
              <span
                v-if="selected"
                class="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-600"
              >
                <Icon
                  name="heroicons:check-20-solid"
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
</template>
