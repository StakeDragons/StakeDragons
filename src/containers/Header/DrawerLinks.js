import dragondrop from 'assets/drawer/dragondrop.svg'
import eggsaleSelected from 'assets/drawer/eggsale-selected.svg'
import eggsale from 'assets/drawer/eggsale.svg'
import hatching from 'assets/drawer/hatching.svg'
import inventory from 'assets/drawer/inventory.svg'
import market from 'assets/drawer/market.svg'
import stake from 'assets/drawer/stake.svg'
import hatchingSelected from 'assets/drawer/hatching-selected.svg'
import inventorySelected from 'assets/drawer/inventory-selected.svg'
import marketSelected from 'assets/drawer/market-selected.svg'
import stakeSelected from 'assets/drawer/stake-selected.svg'
import dragondropSelected from 'assets/drawer/dragondrop-selected.svg'

export const DRAWER_ITEMS = [
  {
    text: 'Dragondrop',
    image: dragondrop,
    selected: dragondropSelected,
    link: '/dragondrop',
  },
  {
    text: 'Genesis Eggsale',
    image: eggsale,
    selected: eggsaleSelected,
    link: '/eggsale',
  },
  {
    text: 'Hatching',
    image: hatching,
    selected: hatchingSelected,
    link: '/hatching',
  },
  {
    text: 'Inventory',
    image: inventory,
    selected: inventorySelected,
    link: '/inventory',
  },
  {
    text: 'Dragon Staking',
    image: stake,
    selected: stakeSelected,
    link: '/stake',
  },
  {
    text: 'Marketplace',
    image: market,
    selected: marketSelected,
    link: '/market',
  },
]
