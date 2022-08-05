import { useEggMintContract } from 'contracts/egg-mint'
import React from 'react'
import { useDragonContract } from '../contracts/dragon'
import { useMinterContract } from '../contracts/minter'

const defaultContext = {
  eggMint: null,
  dragon: null,
}

const ContractsContext = React.createContext(defaultContext)

export const useContracts = () => React.useContext(ContractsContext)

export function ContractsProvider({ children }) {
  const eggMint = useEggMintContract()
  const dragon = useDragonContract()
  const minter = useMinterContract()

  const value = {
    eggMint,
    dragon,
    minter,
  }

  return <ContractsContext.Provider value={value}>{children}</ContractsContext.Provider>
}
