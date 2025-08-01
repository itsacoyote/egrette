export async function fetchBlockExplorerApiData<T>(fetchQuery: () => Promise<Response>): Promise<T> {
  const response = await fetchQuery()
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }

  const data: BlockExplorerApiResponse<T> = await response.json()
  if (data.message === "NOTOK") {
    throw new Error(`API ${data.result}`, { cause: "NOTOK" })
  }

  return data.result
}

export function blockExplorerApiRetry(_failureCount: number, error: Error) {
  if (error.cause === "NOTOK") {
    return false
  }

  return true
}
