interface BlockExplorerApiResponse<T> {
  result: T
  message: string
  status: string
}

interface BlockExplorerErrorResponse {
  statusCode: number
  message: string[]
  error: string
}
