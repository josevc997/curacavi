<script setup lang="ts"></script>
<template>
    <main class="min-h-screen h-full bg-slate-50 text-slate-800 relative">
        <TheNavbar />
        <div class="max-w-7xl mx-auto px-4 py-10 min-h-[calc(100vh-140px)]">
            <slot />
        </div>
        <footer
            class="max-w-7xl mx-auto px-4 py-4 border-t border-indigo-200 text-indigo-900 flex items-center gap-x-2"
        >
            <!-- <div> -->
            <Icon name="mdi:copyright" class="h-4 w-4" />
            <!-- </div> -->
            <p>
                <a href="https://www.josevalencia.monster" target="_blank">
                    Desarrollado por José Valencia</a
                >
            </p>
        </footer>
    </main>
</template>
