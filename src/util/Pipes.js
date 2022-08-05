export const AddressPipe = (text) => {
  return text.substring(0, 12) + '...' + text.substring(text.length - 5)
}

export const DenomPipe = (text) => {
  return text.substring(0, text.length - 6)
}

export const walletBalancePipe = (balance) => {
  return balance.toString().substring(0, 4)
}
