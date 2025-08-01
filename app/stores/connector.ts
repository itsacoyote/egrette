import { acceptHMRUpdate, defineStore } from "pinia"

export const useConnectorStore = defineStore("connector", () => {
  return {}
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useConnectorStore, import.meta.hot))
}
