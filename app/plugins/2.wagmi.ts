import { WagmiPlugin } from "@wagmi/vue"

export default defineNuxtPlugin((nuxtApp) => {
  const { wagmiConfig } = useConnectorConfig()

  nuxtApp.vueApp
    .use(WagmiPlugin, { config: wagmiConfig })
})
