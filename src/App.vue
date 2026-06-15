<script setup lang="ts">
import { computed, ref } from 'vue'
import AppHeader from './components/AppHeader.vue'
import ResourceFilters from './components/ResourceFilters.vue'
import ResourceSection from './components/ResourceSection.vue'
import SectionSidebar from './components/SectionSidebar.vue'
import SiteFooter from './components/SiteFooter.vue'
import resourceCatalog from './data/resources.json'
import type { ResourceCatalog, ResourceItem } from './types/resources'
import { getHostname } from './utils/url'

const catalog = resourceCatalog as ResourceCatalog

const selectedSection = ref('all')
const selectedTag = ref('all')
const searchTerm = ref('')

const allResources = computed(() => catalog.sections.flatMap((section) => section.resources))

const allTags = computed(() => {
  const tags = new Set<string>()

  for (const resource of allResources.value) {
    for (const tag of resource.tags) {
      tags.add(tag)
    }
  }

  return [...tags].sort((left, right) => left.localeCompare(right))
})

const totalResources = computed(() => allResources.value.length)

const filteredSections = computed(() =>
  catalog.sections
    .filter((section) => selectedSection.value === 'all' || section.id === selectedSection.value)
    .map((section) => ({
      ...section,
      resources: section.resources.filter(matchesFilters),
    }))
    .filter((section) => section.resources.length > 0),
)

const sectionOptions = computed(() =>
  catalog.sections.map((section) => ({
    id: section.id,
    title: section.title,
    total: section.resources.length,
    filtered: section.resources.filter(matchesFilters).length,
  })),
)

const activeFiltersCount = computed(
  () =>
    Number(selectedSection.value !== 'all') +
    Number(selectedTag.value !== 'all') +
    Number(searchTerm.value.trim().length > 0),
)

function matchesFilters(resource: ResourceItem) {
  const query = searchTerm.value.trim().toLowerCase()
  const suggestedLinkText =
    resource.suggestedLinks?.flatMap((link) => [link.title, link.url, getHostname(link.url)]) ?? []
  const haystack = [
    resource.title,
    resource.description,
    getHostname(resource.url),
    ...resource.tags,
    ...suggestedLinkText,
  ]
    .join(' ')
    .toLowerCase()

  return (
    (selectedTag.value === 'all' || resource.tags.includes(selectedTag.value)) &&
    (query.length === 0 || haystack.includes(query))
  )
}

function resetFilters() {
  selectedSection.value = 'all'
  selectedTag.value = 'all'
  searchTerm.value = ''
}
</script>

<template>
  <div class="flex h-screen flex-col overflow-hidden">
    <div class="flex min-h-0 w-full flex-1 flex-col px-2 py-2 sm:px-4 sm:py-5">
      <AppHeader />

      <main class="grid min-h-0 flex-1 gap-3 pt-3 sm:gap-6 sm:pt-5 lg:grid-cols-[260px_minmax(0,1fr)]">
        <SectionSidebar
          v-model:selected-section="selectedSection"
          :sections="sectionOptions"
          :total-resources="totalResources"
        />

        <section class="flex min-h-0 min-w-0 flex-col">
          <ResourceFilters
            v-model:selected-section="selectedSection"
            v-model:search-term="searchTerm"
            v-model:selected-tag="selectedTag"
            :sections="sectionOptions"
            :total-resources="totalResources"
            :tags="allTags"
            :active-filters-count="activeFiltersCount"
            @reset="resetFilters"
          />

          <div class="no-scrollbar min-h-0 flex-1 overflow-y-auto">
            <ResourceSection v-for="section in filteredSections" :key="section.id" :section="section" />
          </div>
        </section>
      </main>
    </div>

    <SiteFooter />
  </div>
</template>
