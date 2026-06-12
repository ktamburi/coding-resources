<script setup lang="ts">
import type { ResourceItem } from '../types/resources'
import { getHostname } from '../utils/url'

defineProps<{
  resource: ResourceItem
}>()
</script>

<template>
  <a
    class="grid min-h-40 grid-rows-[auto_auto_1fr_auto] gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3 shadow-sm transition hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow)] sm:min-h-56 sm:gap-3 sm:p-4"
    :href="resource.url"
    target="_blank"
    rel="noreferrer"
  >
    <span class="truncate text-xs text-[var(--text-muted)] sm:text-sm">{{ getHostname(resource.url) }}</span>

    <h3 class="text-base font-extrabold leading-tight text-[var(--text)] sm:text-lg">{{ resource.title }}</h3>
    <p class="text-xs text-[var(--text-soft)] sm:text-sm">{{ resource.description }}</p>

    <div class="flex flex-wrap gap-1 sm:gap-1.5" aria-label="Tags">
      <span
        v-for="tag in resource.tags"
        :key="tag"
        class="max-w-full break-words rounded-full bg-[var(--tag-bg)] px-1.5 py-0.5 text-[0.65rem] font-extrabold text-[var(--tag-text)] sm:px-2 sm:py-1 sm:text-xs"
      >
        {{ tag }}
      </span>
    </div>
  </a>
</template>
