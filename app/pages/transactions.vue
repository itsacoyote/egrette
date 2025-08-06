<template>
  <div>
    <h1 class="text-3xl mb-4">
      {{ $t("transactions.header") }}
    </h1>
    <ConnectionView>
      <AccountTransactionsTable />
    </ConnectionView>
  </div>
</template>
