<script setup lang="ts">
defineProps<{
  searchTerm: string
  selectedTag: string
  tags: string[]
  activeFiltersCount: number
}>()

const emit = defineEmits<{
  'update:searchTerm': [value: string]
  'update:selectedTag': [value: string]
  reset: []
}>()
</script>

<template>
  <div
    class="z-10 grid shrink-0 gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface)]/95 p-3 shadow-[var(--shadow)] backdrop-blur md:grid-cols-[minmax(260px,1fr)_minmax(180px,280px)_auto] md:items-end"
    aria-label="Resource filters"
  >
    <label class="grid gap-1.5" for="resource-search">
      <span class="text-xs font-extrabold uppercase tracking-wide text-[var(--text-muted)]">Search</span>
      <input
        id="resource-search"
        :value="searchTerm"
        type="search"
        class="min-h-11 w-full rounded-lg border border-[var(--border-strong)] bg-[var(--surface-soft)] px-3 text-[var(--text)] outline-none focus:border-[var(--secondary)] focus:ring-4 focus:ring-[var(--secondary)]/15"
        placeholder="Try python, cyber, roadmap, interview..."
        @input="emit('update:searchTerm', ($event.target as HTMLInputElement).value)"
      />
    </label>

    <label class="grid gap-1.5" for="tag-filter">
      <span class="text-xs font-extrabold uppercase tracking-wide text-[var(--text-muted)]">Tag</span>
      <select
        id="tag-filter"
        :value="selectedTag"
        class="min-h-11 w-full rounded-lg border border-[var(--border-strong)] bg-[var(--surface-soft)] px-3 text-[var(--text)] outline-none focus:border-[var(--secondary)] focus:ring-4 focus:ring-[var(--secondary)]/15"
        @change="emit('update:selectedTag', ($event.target as HTMLSelectElement).value)"
      >
        <option value="all">All tags</option>
        <option v-for="tag in tags" :key="tag" :value="tag">{{ tag }}</option>
      </select>
    </label>

    <button
      type="button"
      class="min-h-11 rounded-lg bg-[var(--text)] px-4 font-extrabold text-[var(--bg)] transition disabled:cursor-not-allowed disabled:opacity-35"
      :disabled="activeFiltersCount === 0"
      @click="emit('reset')"
    >
      Reset
    </button>
  </div>
</template>
