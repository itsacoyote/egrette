<template>
  <div>
    <h1>{{ $t('welcome') }}</h1>
    <button
      v-for="locale in locales"
      :key="locale"
      @click="setLocale(locale.code)"
    >
      {{ locale.name }}
    </button>
  </div>
</template>

<script setup>
const { locales, setLocale } = useI18n()
</script>
