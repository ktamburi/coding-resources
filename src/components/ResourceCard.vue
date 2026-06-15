<script setup lang="ts">
import type { ResourceItem } from '../types/resources'
import { getHostname } from '../utils/url'

defineProps<{
  resource: ResourceItem
}>()
</script>

<template>
  <article
    class="grid min-h-40 grid-rows-[auto_auto_1fr_auto] gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3 shadow-sm transition hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:shadow-[var(--shadow)] sm:min-h-56 sm:gap-3 sm:p-4"
  >
    <span class="truncate text-xs text-[var(--text-muted)] sm:text-sm">{{ getHostname(resource.url) }}</span>

    <h3 class="text-base font-extrabold leading-tight text-[var(--text)] sm:text-lg">
      <a
        class="inline-flex max-w-full items-start gap-1.5 outline-none hover:text-[var(--accent)] focus-visible:text-[var(--accent)]"
        :href="resource.url"
        target="_blank"
        rel="noreferrer"
      >
        <span>{{ resource.title }}</span>
        <span aria-hidden="true" class="mt-0.5 text-xs text-[var(--accent)]">↗</span>
      </a>
    </h3>

    <div class="grid content-start gap-2">
      <p class="text-xs text-[var(--text-soft)] sm:text-sm">{{ resource.description }}</p>

      <div v-if="resource.suggestedLinks?.length" class="mt-2 grid gap-1.5 border-t border-[var(--border)] pt-2" aria-label="Suggested links">
        <span class="text-[0.7rem] font-black uppercase tracking-wide text-[var(--text)]">Suggested links</span>
        <a
          v-for="link in resource.suggestedLinks"
          :key="link.url"
          class="inline-flex min-w-0 max-w-full items-center gap-1 text-xs font-extrabold text-[var(--accent)] underline underline-offset-4 transition hover:text-[var(--accent-hover)] focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] sm:text-sm"
          :href="link.url"
          target="_blank"
          rel="noreferrer"
        >
          <span class="truncate">{{ link.title }}</span>
          <span aria-hidden="true" class="shrink-0 text-[0.7rem]">↗</span>
        </a>
      </div>
    </div>

    <div class="flex flex-wrap gap-1 sm:gap-1.5" aria-label="Tags">
      <span
        v-for="tag in resource.tags"
        :key="tag"
        class="max-w-full break-words rounded-full bg-[var(--tag-bg)] px-1.5 py-0.5 text-[0.65rem] font-extrabold text-[var(--tag-text)] sm:px-2 sm:py-1 sm:text-xs"
      >
        {{ tag }}
      </span>
    </div>
  </article>
</template>
