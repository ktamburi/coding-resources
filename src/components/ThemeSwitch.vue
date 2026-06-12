<script setup lang="ts">
import { onMounted, ref } from 'vue'

type Theme = 'light' | 'dark'

const storageKey = 'codingResourcesTheme'
const selectedTheme = ref<Theme>('light')

function systemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function readStoredTheme(): Theme {
  try {
    const stored = localStorage.getItem(storageKey)
    if (stored === 'light' || stored === 'dark') {
      return stored
    }
  } catch {
    // Ignore storage failures; the UI can still use the system preference.
  }

  return systemTheme()
}

function applyTheme(theme: Theme) {
  selectedTheme.value = theme
  document.documentElement.setAttribute('data-theme', theme)

  try {
    localStorage.setItem(storageKey, theme)
  } catch {
    // Ignore storage failures.
  }
}

onMounted(() => {
  selectedTheme.value = readStoredTheme()
  document.documentElement.setAttribute('data-theme', selectedTheme.value)
})
</script>

<template>
  <fieldset class="shrink-0 border-0 p-0">
    <legend class="sr-only">Color theme</legend>
    <div class="inline-flex overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow)]">
      <label class="cursor-pointer border-r border-[var(--border)] text-xs font-bold text-[var(--text-muted)]">
        <input
          class="sr-only peer"
          type="radio"
          name="theme"
          value="light"
          :checked="selectedTheme === 'light'"
          @change="applyTheme('light')"
        />
        <span
          class="block px-2 py-1.5 transition hover:bg-[var(--accent-light)] hover:text-[var(--text)] peer-checked:bg-[var(--accent-light)] peer-checked:text-[var(--accent)] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-[-2px] peer-focus-visible:outline-[var(--accent)] sm:px-3 sm:py-2"
        >
          Light
        </span>
      </label>

      <label class="cursor-pointer text-xs font-bold text-[var(--text-muted)]">
        <input
          class="sr-only peer"
          type="radio"
          name="theme"
          value="dark"
          :checked="selectedTheme === 'dark'"
          @change="applyTheme('dark')"
        />
        <span
          class="block px-2 py-1.5 transition hover:bg-[var(--accent-light)] hover:text-[var(--text)] peer-checked:bg-[var(--accent-light)] peer-checked:text-[var(--accent)] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-[-2px] peer-focus-visible:outline-[var(--accent)] sm:px-3 sm:py-2"
        >
          Dark
        </span>
      </label>
    </div>
  </fieldset>
</template>
