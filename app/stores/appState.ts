import { isBoolean } from "es-toolkit"

export const useAppStateStore = defineStore("appState", {
  state: () => ({ isProfileDrawerOpen: false }),
  getters: {},
  actions: {
    toggleProfileDrawer(state?: boolean) {
      if (isBoolean(state)) {
        this.isProfileDrawerOpen = state
      } else {
        this.isProfileDrawerOpen = !this.isProfileDrawerOpen
      }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStateStore, import.meta.hot))
}
