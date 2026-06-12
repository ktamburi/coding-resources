<script setup lang="ts">
import type { ResourceItem } from '../types/resources'
import { getHostname } from '../utils/url'

defineProps<{
  resource: ResourceItem
}>()
</script>

<template>
  <a
    class="grid min-h-56 grid-rows-[auto_auto_1fr_auto] gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow)]"
    :href="resource.url"
    target="_blank"
    rel="noreferrer"
  >
    <span class="truncate text-sm text-[var(--text-muted)]">{{ getHostname(resource.url) }}</span>

    <h3 class="text-lg font-extrabold leading-tight text-[var(--text)]">{{ resource.title }}</h3>
    <p class="text-sm text-[var(--text-soft)]">{{ resource.description }}</p>

    <div class="flex flex-wrap gap-1.5" aria-label="Tags">
      <span
        v-for="tag in resource.tags"
        :key="tag"
        class="max-w-full break-words rounded-full bg-[var(--tag-bg)] px-2 py-1 text-xs font-extrabold text-[var(--tag-text)]"
      >
        {{ tag }}
      </span>
    </div>
  </a>
</template>
