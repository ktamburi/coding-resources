<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="shrink-0 border-t border-[var(--border)] px-5 py-3 text-center text-[var(--text-muted)]">
    <p class="mx-auto mb-2 max-w-5xl text-xs leading-5">
      Personal collection for learning and reference. Links may change over time, so check the original resource before
      relying on it.
    </p>

    <p class="mb-2 text-sm text-[var(--text)]">
      <span class="inline-flex max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-1">
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
      </span>
    </p>

    <nav class="flex flex-wrap items-center justify-center gap-5" aria-label="Social links">
      <a
        class="inline-flex transition focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
        href="https://www.linkedin.com/in/klaudiatamburi/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
      >
        <img
          class="block [filter:var(--social-img-base)] hover:[filter:var(--social-img-hover)]"
          src="/icons/social-linkedin.svg"
          width="22"
          height="22"
          alt=""
          decoding="async"
        />
      </a>
      <a
        class="inline-flex transition focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
        href="https://github.com/ktamburi"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
      >
        <img
          class="block [filter:var(--social-img-base)] hover:[filter:var(--social-img-hover)]"
          src="/icons/social-github.svg"
          width="22"
          height="22"
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
          class="block [filter:var(--social-img-base)] hover:[filter:var(--social-img-hover)]"
          src="/icons/social-instagram.svg"
          width="22"
          height="22"
          alt=""
          decoding="async"
        />
      </a>
    </nav>
  </footer>
</template>
