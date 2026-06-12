<script setup lang="ts">
const year = new Date().getFullYear()
const baseUrl = import.meta.env.BASE_URL
</script>

<template>
  <footer class="shrink-0 border-t border-[var(--border)] px-3 py-2 text-center text-[var(--text-muted)] sm:px-5 sm:py-3">
    <p class="mx-auto mb-1 max-w-5xl text-[0.65rem] leading-4 sm:mb-2 sm:text-xs sm:leading-5">
      A personal collection of learning resources. Rights belong to their respective authors.
    </p>

    <div class="inline-flex max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-[var(--text)] sm:text-sm">
      <span>© {{ year }}</span>
      <span class="font-semibold text-[color-mix(in_srgb,var(--text-muted)_38%,var(--border))]" aria-hidden="true">
        |
      </span>
      <a
        class="font-bold text-[var(--accent)] hover:underline focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        href="https://github.com/ktamburi"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Klaudia Tamburi on GitHub"
      >
        Klaudia Tamburi
      </a>
      <div class="inline-flex max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-1">
        <span class="font-semibold text-[color-mix(in_srgb,var(--text-muted)_38%,var(--border))]" aria-hidden="true">
          |
        </span>
        <nav class="flex flex-wrap items-center justify-center gap-3 sm:gap-4" aria-label="Social links">
          <a
            class="inline-flex transition focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
            href="https://www.linkedin.com/in/klaudiatamburi/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <img
              class="block size-4 [filter:var(--social-img-base)] hover:[filter:var(--social-img-hover)] sm:size-[22px]"
              :src="`${baseUrl}icons/social-linkedin.svg`"
              alt=""
              decoding="async"
            />
          </a>
          <a
            class="inline-flex transition focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
            href="https://github.com/ktamburi/coding-resources"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <img
              class="block size-4 [filter:var(--social-img-base)] hover:[filter:var(--social-img-hover)] sm:size-[22px]"
              :src="`${baseUrl}icons/social-github.svg`"
              alt=""
              decoding="async"
            />
          </a>
          <a
            class="inline-flex transition focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
            href="https://www.instagram.com/prettybluesoul/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <img
              class="block size-4 [filter:var(--social-img-base)] hover:[filter:var(--social-img-hover)] sm:size-[22px]"
              :src="`${baseUrl}icons/social-instagram.svg`"
              alt=""
              decoding="async"
            />
          </a>
        </nav>
      </div>
    </div>
  </footer>
</template>
