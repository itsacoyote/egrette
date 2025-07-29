export const useAppStateStore = defineStore("appState", {
  state: () => ({}),
  getters: {
    isLargeScreen(): ComputedRef<boolean> {
      return useMediaQuery("(min-width: 960px)")
    },
  },
  actions: {},
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStateStore, import.meta.hot))
}
