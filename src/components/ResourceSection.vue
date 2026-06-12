<script setup lang="ts">
import ResourceCard from './ResourceCard.vue'
import type { ResourceSection } from '../types/resources'

defineProps<{
  section: ResourceSection
}>()
</script>

<template>
  <section class="pt-6">
    <div class="mb-3 border-l-4 pl-4" :style="{ borderColor: section.accent }">
      <p class="text-xs font-extrabold uppercase tracking-wide text-[var(--text-muted)]">
        {{ section.resources.length }} links
      </p>
      <h2 class="text-2xl font-black leading-tight text-[var(--text)] sm:text-3xl">{{ section.title }}</h2>
      <span class="mt-1 block max-w-3xl text-sm text-[var(--text-muted)]">{{ section.description }}</span>
    </div>

    <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      <ResourceCard v-for="resource in section.resources" :key="resource.id" :resource="resource" />
    </div>
  </section>
</template>
