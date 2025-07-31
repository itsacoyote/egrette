export const useConnectorStore = defineStore("connector", () => {
  // const {
  //   defaultNetwork, projectId, wagmiConfig,
  // } = useConnectorConfig()

  return { }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useConnectorStore, import.meta.hot))
}
