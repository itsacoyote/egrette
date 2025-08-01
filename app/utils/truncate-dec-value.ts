export function truncateDecValue(
  amount: string, start = 3, end = 2,
): string {
  const [
    intPart,
    decPart = "",
  ] = amount.split(".")

  if (decPart.length <= start + end) {
    return `${intPart}.${decPart}`
  } else {
    return `${intPart}.${decPart.slice(0, start)}...${decPart.slice(-end)}`
  }
}
