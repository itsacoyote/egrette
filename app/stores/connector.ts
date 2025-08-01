// import { useQuery, useQueryClient } from "@tanstack/vue-query"
import { isNull } from "es-toolkit"
import { acceptHMRUpdate, defineStore } from "pinia"

export const useConnectorStore = defineStore("connector", () => {
  const isConnected = ref<boolean | null>(null)
  // const connections = useConnections()
  const account = useAccount()
  const address = ref<null | `0x${string}`>(null)

  watch(
    () => account, (account) => {
      if (isNull(address.value)) {
        address.value = account.address.value!
      } else if (account.address.value !== address.value) {
        // invalidate queries
        // const queryClient = useQueryClient()

        // queryClient.invalidateQueries({ queryKey: [ "account" ] })
      }
      if (account.isDisconnected.value) {
        isConnected.value = false
      }
      if (account.isConnected.value) {
        isConnected.value = true
      }
    }, { deep: true },
  )

  // watch(
  //   () => connections.value, () => {
  //     isConnected.value = connections.value.length > 0
  //   }, { deep: true },
  // )
  // useAccountEffect({
  //   onConnect() {
  //     isConnected.value = true
  //   },
  //   onDisconnect() {
  //     isConnected.value = false
  //   },
  // })

  return { isConnected }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useConnectorStore, import.meta.hot))
}
