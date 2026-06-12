export interface ResourceItem {
  id: string
  title: string
  url: string
  description: string
  tags: string[]
}

export interface ResourceSection {
  id: string
  title: string
  description: string
  accent: string
  resources: ResourceItem[]
}

export interface ResourceCatalog {
  sections: ResourceSection[]
}

export interface SectionOption {
  id: string
  title: string
  total: number
  filtered: number
}
