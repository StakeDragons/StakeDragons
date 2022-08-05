export const FormatDoubleValue = (number) => {
  return number.toLocaleString(undefined, { maximumFractionDigits: 2 }) // "1,234.57"
}
