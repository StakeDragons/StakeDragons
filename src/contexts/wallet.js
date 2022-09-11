import * as React from 'react'
import { useEffect, useState } from 'react'
import { createClient } from 'services/keplr'
import { getConfig } from 'config/network'
import Cw20DRGN from '../contracts/cw20-drgn'

function throwNotInitialized() {
  throw new Error('Oops! Need to connect your Keplr Wallet first.')
}

const defaultContext = {
  initialized: false,
  init: throwNotInitialized,
  clear: throwNotInitialized,
  address: '',
  name: '',
  balance: [{ juno: 0 }, { junox: 0 }, { drgn: 0 }],
  refreshBalance: throwNotInitialized,
  getClient: throwNotInitialized,
  getSigner: throwNotInitialized,
  updateSigner: throwNotInitialized,
  network: '',
  setNetwork: throwNotInitialized,
}

export const WalletContext = React.createContext(defaultContext)

export const useWallet = () => React.useContext(WalletContext)

export function WalletProvider({ children, network, setNetwork }) {
  const [signer, setSigner] = useState(null)
  const [client, setClient] = useState(null)
  const config = getConfig(network)

  const contextWithInit = {
    ...defaultContext,
    init: setSigner,
    network,
    setNetwork,
  }
  const [value, setValue] = useState(contextWithInit)

  const clear = () => {
    setValue({ ...contextWithInit })
    setClient(undefined)
    setSigner(undefined)
  }

  // Get balance for each coin specified in config.coinMap
  async function refreshBalance(address, balance) {
    if (!client) return

    balance.length = 0
    for (const denom in config.coinMap) {
      const coin = await client.getBalance(address, denom)
      if (coin) balance.push(coin)
    }
    const client2 = Cw20DRGN(client)
    let res = await client2.getBalance(address)
    balance.push({ denom: 'DRGN', amount: res.balance / 1000000 })
    setValue({ ...value, balance })
  }

  const updateSigner = (signer) => {
    setSigner(signer)
  }

  useEffect(() => {
    async function updateClient() {
      try {
        const client = await createClient(signer, network)
        setClient(client)
      } catch (error) {
      }
    }
    if (signer) {
      updateClient()
    }
    // eslint-disable-next-line
  }, [signer])

  useEffect(() => {
    const balance = []

    async function updateValue() {
      const address = (await signer.getAccounts())[0].address

      const anyWindow = window
      const key = await anyWindow.keplr.getKey(config.chainId)

      await refreshBalance(address, balance)

      localStorage.setItem('wallet_address', address)

      setValue({
        initialized: true,
        init: () => {},
        clear,
        address,
        name: key.name || '',
        balance,
        refreshBalance: refreshBalance.bind(null, address, balance),
        getClient: () => client,
        getSigner: () => signer,
        updateSigner,
        network,
        setNetwork,
      })
    }

    if (signer && client) {
      updateValue()
    }

    // eslint-disable-next-line
  }, [client])

  useEffect(() => {
    setValue({ ...value, network })
    // eslint-disable-next-line
  }, [network])

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
}
