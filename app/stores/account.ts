import { acceptHMRUpdate, defineStore } from "pinia"

export const useAccountStore = defineStore("account", () => {
  return {}
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAccountStore, import.meta.hot))
}
