<script setup lang="ts">
import ThemeSwitch from './ThemeSwitch.vue'
</script>

<template>
  <header class="flex items-center justify-between gap-3 border-b border-[var(--border)] py-3 sm:gap-4 sm:py-5">
    <h1 class="text-2xl font-black leading-none tracking-tight text-[var(--accent)] sm:text-4xl">Coding Resources</h1>
    <ThemeSwitch />
  </header>
</template>
