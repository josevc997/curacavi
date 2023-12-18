<script setup lang="ts">
import type { BlogItem } from "~/types/blog";
const props = defineProps<{
    item: BlogItem;
}>();
</script>
<template>
    <ul role="list" class="space-y-8 text-gray-600">
        <template
            v-for="(subitem, index) in sortByOrderIndex(item.body)"
            :key="index"
        >
            <li class="flex gap-x-3">
                <template
                    v-for="(subsubitem, subindex) in sortByOrderIndex(
                        subitem.body
                    )"
                    :key="subindex"
                >
                    <Icon
                        v-if="subsubitem.tag === 'icon'"
                        :name="subsubitem.content"
                        class="mt-1 h-5 w-5 flex-none text-indigo-600"
                        aria-hidden="true"
                    />
                    <span v-if="subsubitem.tag === 'span'">
                        <template
                            v-for="(
                                subsubsubitem, subsubindex
                            ) in subsubitem.body"
                            :key="subsubindex"
                        >
                            <strong
                                v-if="subsubsubitem.tag === 'strong'"
                                class="font-semibold text-gray-900"
                                >{{ subsubsubitem.content }}</strong
                            >
                        </template>
                        {{ subsubitem.content }}</span
                    >
                </template>
            </li>
        </template>
    </ul>
</template>
