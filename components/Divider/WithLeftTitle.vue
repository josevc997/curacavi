<script setup lang="ts"></script>
<template>
  <div>
    <div>
      <div class="relative">
        <div class="absolute inset-0 flex items-center" aria-hidden="true">
          <div class="w-full border-t border-indigo-600"></div>
        </div>
        <div class="relative flex -inset-y-0.5">
          <span class="bg-slate-50 pr-2 text-indigo-600"><slot /></span>
        </div>
      </div>
    </div>
  </div>
</template>
