<script lang="ts" setup>
import Hotjar from "@hotjar/browser";

const config = useRuntimeConfig();

const siteId = 3818691;
const hotjarVersion = 6;

Hotjar.init(siteId, hotjarVersion);
useHead({
    title: "Curacavi",
    meta: [
        {
            hid: "description",
            name: "description",
            content: "All information about Curacavi",
        },
    ],
});
</script>
<template>
    <div>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>
