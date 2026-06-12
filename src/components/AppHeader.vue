<script setup lang="ts">
import ThemeSwitch from './ThemeSwitch.vue'
</script>

<template>
  <header class="flex items-center justify-between gap-4 border-b border-[var(--border)] py-5">
    <h1 class="text-3xl font-black leading-none tracking-tight text-[var(--accent)] sm:text-4xl">Coding Resources</h1>
    <ThemeSwitch />
  </header>
</template>
