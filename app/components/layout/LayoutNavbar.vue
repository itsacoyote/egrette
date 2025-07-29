<template>
  <div class="navbar">
    <div class="navbar-start">
      <a
        class="btn btn-ghost"
        href="/"
      >
        <svgo-egrette-logo
          class="text-black dark:text-white text-5xl !m-0"
        />
      </a>
      <ul class="menu menu-horizontal px-1">
        <li><a>Item 1</a></li>
        <li>
          <details>
            <summary>Parent</summary>
            <ul class="p-2">
              <li><a>Submenu 1</a></li>
              <li><a>Submenu 2</a></li>
            </ul>
          </details>
        </li>
        <li><a>{{ isLargeScreen }}</a></li>
      </ul>
    </div>
    <div class="navbar-end">
      <a class="btn">Button</a>
      <LayoutColorModeButton />
    </div>
  </div>
</template>

<script setup lang="ts">
const { isLargeScreen } = useAppStateStore()
</script>
