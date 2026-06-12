<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import type { SectionOption } from '../types/resources'

const props = defineProps<{
  selectedSection: string
  searchTerm: string
  selectedTag: string
  sections: SectionOption[]
  totalResources: number
  tags: string[]
  activeFiltersCount: number
}>()

const emit = defineEmits<{
  'update:selectedSection': [value: string]
  'update:searchTerm': [value: string]
  'update:selectedTag': [value: string]
  reset: []
}>()

const isSectionDropdownOpen = ref(false)
const isTagDropdownOpen = ref(false)
const sectionDropdown = ref<HTMLElement | null>(null)
const tagDropdown = ref<HTMLElement | null>(null)

const selectedSectionLabel = computed(() => {
  if (props.selectedSection === 'all') {
    return `All resources (${props.totalResources})`
  }

  const section = props.sections.find((section) => section.id === props.selectedSection)

  return section ? `${section.title} (${section.filtered})` : 'All resources'
})

const selectedTagLabel = computed(() => (props.selectedTag === 'all' ? 'All tags' : props.selectedTag))

function toggleSectionDropdown() {
  isSectionDropdownOpen.value = !isSectionDropdownOpen.value
  isTagDropdownOpen.value = false
}

function toggleTagDropdown() {
  isTagDropdownOpen.value = !isTagDropdownOpen.value
  isSectionDropdownOpen.value = false
}

function selectSection(sectionId: string) {
  emit('update:selectedSection', sectionId)
  isSectionDropdownOpen.value = false
}

function selectTag(tag: string) {
  emit('update:selectedTag', tag)
  isTagDropdownOpen.value = false
}

function closeDropdowns(event: MouseEvent) {
  if (!sectionDropdown.value?.contains(event.target as Node)) {
    isSectionDropdownOpen.value = false
  }

  if (!tagDropdown.value?.contains(event.target as Node)) {
    isTagDropdownOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', closeDropdowns))
onBeforeUnmount(() => document.removeEventListener('click', closeDropdowns))
</script>

<template>
  <div
    class="z-10 grid shrink-0 grid-cols-2 gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)]/95 p-1.5 shadow-[var(--shadow)] backdrop-blur sm:gap-3 sm:p-3 md:grid-cols-[minmax(260px,1fr)_minmax(180px,260px)_minmax(180px,260px)_auto] md:items-end lg:grid-cols-[minmax(260px,1fr)_minmax(180px,280px)_auto]"
    aria-label="Resource filters"
  >
    <label class="col-span-2 grid gap-1.5 md:col-span-1" for="resource-search">
      <span class="sr-only sm:not-sr-only sm:text-xs sm:font-extrabold sm:uppercase sm:tracking-wide sm:text-[var(--text-muted)]">
        Search
      </span>
      <input
        id="resource-search"
        :value="searchTerm"
        type="search"
        class="min-h-9 w-full rounded-lg border border-[var(--border-strong)] bg-[var(--surface-soft)] px-2.5 text-sm text-[var(--text)] outline-none focus:border-[var(--secondary)] focus:ring-4 focus:ring-[var(--secondary)]/15 sm:min-h-11 sm:px-3 sm:text-base"
        placeholder="Try python, cyber, roadmap, interview..."
        @input="emit('update:searchTerm', ($event.target as HTMLInputElement).value)"
      />
    </label>

    <div
      ref="sectionDropdown"
      class="relative grid gap-1.5 lg:hidden"
      @keydown.escape.stop="isSectionDropdownOpen = false"
    >
      <span
        id="section-filter-label"
        class="sr-only sm:not-sr-only sm:text-xs sm:font-extrabold sm:uppercase sm:tracking-wide sm:text-[var(--text-muted)]"
      >
        Section
      </span>
      <button
        id="section-filter"
        type="button"
        class="relative min-h-9 w-full rounded-lg border border-[var(--border-strong)] bg-[var(--surface-soft)] px-2.5 pr-7 text-left text-xs text-[var(--text)] outline-none focus:border-[var(--secondary)] focus:ring-4 focus:ring-[var(--secondary)]/15 sm:min-h-11 sm:px-3 sm:pr-9 sm:text-base"
        aria-haspopup="listbox"
        :aria-expanded="isSectionDropdownOpen"
        aria-labelledby="section-filter-label section-filter"
        @click="toggleSectionDropdown"
      >
        <span class="block truncate">{{ selectedSectionLabel }}</span>
        <span
          class="pointer-events-none absolute right-2.5 top-1/2 h-1.5 w-1.5 -translate-y-2/3 rotate-45 border-b-2 border-r-2 border-[var(--text-soft)] sm:right-3 sm:h-2 sm:w-2"
          aria-hidden="true"
        />
      </button>

      <ul
        v-if="isSectionDropdownOpen"
        class="no-scrollbar absolute left-0 right-0 top-full z-20 mt-1 max-h-96 overflow-y-auto rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] py-1 shadow-[var(--shadow)]"
        role="listbox"
        aria-labelledby="section-filter-label"
      >
        <li>
          <button
            type="button"
            class="w-full px-2.5 py-1.5 text-left text-xs font-semibold text-[var(--text)] hover:bg-[var(--accent-light)] sm:px-3 sm:py-2 sm:text-sm"
            :class="{ 'bg-[var(--accent-light)]': selectedSection === 'all' }"
            role="option"
            :aria-selected="selectedSection === 'all'"
            @click="selectSection('all')"
          >
            All resources ({{ totalResources }})
          </button>
        </li>
        <li v-for="section in sections" :key="section.id">
          <button
            type="button"
            class="w-full px-2.5 py-1.5 text-left text-xs font-semibold text-[var(--text)] hover:bg-[var(--accent-light)] sm:px-3 sm:py-2 sm:text-sm"
            :class="{ 'bg-[var(--accent-light)]': selectedSection === section.id }"
            role="option"
            :aria-selected="selectedSection === section.id"
            @click="selectSection(section.id)"
          >
            {{ section.title }} ({{ section.filtered }})
          </button>
        </li>
      </ul>
    </div>

    <div ref="tagDropdown" class="relative grid gap-1.5" @keydown.escape.stop="isTagDropdownOpen = false">
      <span
        id="tag-filter-label"
        class="sr-only sm:not-sr-only sm:text-xs sm:font-extrabold sm:uppercase sm:tracking-wide sm:text-[var(--text-muted)]"
      >
        Tag
      </span>
      <button
        id="tag-filter"
        type="button"
        class="relative min-h-9 w-full rounded-lg border border-[var(--border-strong)] bg-[var(--surface-soft)] px-2.5 pr-7 text-left text-xs text-[var(--text)] outline-none focus:border-[var(--secondary)] focus:ring-4 focus:ring-[var(--secondary)]/15 sm:min-h-11 sm:px-3 sm:pr-9 sm:text-base"
        aria-haspopup="listbox"
        :aria-expanded="isTagDropdownOpen"
        aria-labelledby="tag-filter-label tag-filter"
        @click="toggleTagDropdown"
      >
        <span class="block truncate">{{ selectedTagLabel }}</span>
        <span
          class="pointer-events-none absolute right-2.5 top-1/2 h-1.5 w-1.5 -translate-y-2/3 rotate-45 border-b-2 border-r-2 border-[var(--text-soft)] sm:right-3 sm:h-2 sm:w-2"
          aria-hidden="true"
        />
      </button>

      <ul
        v-if="isTagDropdownOpen"
        class="no-scrollbar absolute left-0 right-0 top-full z-20 mt-1 max-h-64 overflow-y-auto rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] py-1 shadow-[var(--shadow)]"
        role="listbox"
        aria-labelledby="tag-filter-label"
      >
        <li>
          <button
            type="button"
            class="w-full px-2.5 py-1.5 text-left text-xs font-semibold text-[var(--text)] hover:bg-[var(--accent-light)] sm:px-3 sm:py-2 sm:text-sm"
            :class="{ 'bg-[var(--accent-light)]': selectedTag === 'all' }"
            role="option"
            :aria-selected="selectedTag === 'all'"
            @click="selectTag('all')"
          >
            All tags
          </button>
        </li>
        <li v-for="tag in tags" :key="tag">
          <button
            type="button"
            class="w-full px-2.5 py-1.5 text-left text-xs font-semibold text-[var(--text)] hover:bg-[var(--accent-light)] sm:px-3 sm:py-2 sm:text-sm"
            :class="{ 'bg-[var(--accent-light)]': selectedTag === tag }"
            role="option"
            :aria-selected="selectedTag === tag"
            @click="selectTag(tag)"
          >
            {{ tag }}
          </button>
        </li>
      </ul>
    </div>

    <button
      type="button"
      class="hidden min-h-11 rounded-lg bg-[var(--text)] px-4 font-extrabold text-[var(--bg)] transition disabled:cursor-not-allowed disabled:opacity-35 lg:block"
      :disabled="activeFiltersCount === 0"
      @click="emit('reset')"
    >
      Reset
    </button>
  </div>
</template>
