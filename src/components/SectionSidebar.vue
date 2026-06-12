<script setup lang="ts">
import type { SectionOption } from '../types/resources'

defineProps<{
  sections: SectionOption[]
  selectedSection: string
  totalResources: number
}>()

const emit = defineEmits<{
  'update:selectedSection': [value: string]
}>()
</script>

<template>
  <aside
    class="hidden min-h-0 gap-2 lg:grid lg:content-start"
    aria-label="Sections"
  >
    <button
      type="button"
      class="flex min-h-12 w-44 shrink-0 items-center justify-between gap-3 rounded-lg border px-3 py-2 text-left font-bold text-[var(--text)] transition lg:w-full"
      :class="
        selectedSection === 'all'
          ? 'border-[var(--border-strong)] bg-[var(--surface)] shadow-sm'
          : 'border-transparent bg-transparent hover:bg-[var(--accent-light)]'
      "
      @click="emit('update:selectedSection', 'all')"
    >
      <span>All resources</span>
      <strong class="grid min-w-8 place-items-center rounded-full bg-[var(--accent-light)] px-2 py-1 text-xs text-[var(--accent)]">
        {{ totalResources }}
      </strong>
    </button>

    <button
      v-for="section in sections"
      :key="section.id"
      type="button"
      class="flex min-h-12 w-44 shrink-0 items-center justify-between gap-3 rounded-lg border px-3 py-2 text-left font-bold text-[var(--text)] transition lg:w-full"
      :class="
        selectedSection === section.id
          ? 'border-[var(--border-strong)] bg-[var(--surface)] shadow-sm'
          : 'border-transparent bg-transparent hover:bg-[var(--accent-light)]'
      "
      @click="emit('update:selectedSection', section.id)"
    >
      <span class="min-w-0 break-words">{{ section.title }}</span>
      <strong class="grid min-w-8 place-items-center rounded-full bg-[var(--accent-light)] px-2 py-1 text-xs text-[var(--accent)]">
        {{ section.filtered }}
      </strong>
    </button>
  </aside>
</template>
