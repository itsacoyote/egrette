<template>
  <div class="navbar">
    <div class="navbar-start">
      <NuxtLink
        class="btn btn-ghost"
        href="/"
      >
        <svgo-egrette-logo
          class="text-black dark:text-white text-5xl !m-0"
        />
      </NuxtLink>
      <ul class="menu menu-horizontal px-1">
        <li><NuxtLink href="/transfers">{{ $t('navigation.transfers') }}</NuxtLink></li>
        <li><NuxtLink href="/assets">{{ $t('navigation.assets') }}</NuxtLink></li>
      </ul>
    </div>
    <div class="navbar-end">
      <AccountDropdown />
      <LayoutColorModeButton />
    </div>
  </div>
</template>

<script setup lang="ts">

</script>
