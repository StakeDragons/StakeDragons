export const AddressPipe = (text) => {
  return text.substring(0, 12) + '...' + text.substring(text.length - 5)
}

export const DenomPipe = (asd) => {
  if (asd && !Number.isNaN(asd)) {
    let text = (Number(asd) / 1000000).toString()
    return text
  } else {
    return 0
  }
}

export const walletBalancePipe = (balance) => {
  return balance.toString().substring(0, 4)
}
