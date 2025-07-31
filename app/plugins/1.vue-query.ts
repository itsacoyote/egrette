import { QueryClient, VueQueryPlugin } from "@tanstack/vue-query"

const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } })

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp
    .use(VueQueryPlugin, { queryClient, enableDevtoolsV6Plugin: true })
})
