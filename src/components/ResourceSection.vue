<script setup lang="ts">
import ResourceCard from './ResourceCard.vue'
import type { ResourceSection } from '../types/resources'

defineProps<{
  section: ResourceSection
}>()
</script>

<template>
  <section class="pt-3 sm:pt-6">
    <div class="mb-2 border-l-4 pl-3 sm:mb-3 sm:pl-4" :style="{ borderColor: section.accent }">
      <p class="text-[0.65rem] font-extrabold uppercase tracking-wide text-[var(--text-muted)] sm:text-xs">
        {{ section.resources.length }} links
      </p>
      <h2 class="text-xl font-black leading-tight text-[var(--text)] sm:text-3xl">{{ section.title }}</h2>
      <span class="mt-0.5 block max-w-3xl text-xs text-[var(--text-muted)] sm:mt-1 sm:text-sm">{{ section.description }}</span>
    </div>

    <div class="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 xl:grid-cols-3 2xl:grid-cols-4">
      <ResourceCard v-for="resource in section.resources" :key="resource.id" :resource="resource" />
    </div>
  </section>
</template>
