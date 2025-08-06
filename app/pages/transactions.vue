<template>
  <div>
    <LayoutPageHeader>
      {{ $t("transactions.header") }}
      <template #right-col>
        <CommonNetworkSelect />
      </template>
    </LayoutPageHeader>

    <ConnectionView>
      <AccountTransactionsTable />
    </ConnectionView>
  </div>
</template>
