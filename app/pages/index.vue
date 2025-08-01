<template>
  <div>
    <h1 class="text-3xl mb-4">
      {{ $t('index.header') }}
    </h1>
    <ConnectionView>
      <AccountCard />
      <br>
      <AccountTransactions />
    </ConnectionView>
  </div>
</template>

<script setup>
</script>
