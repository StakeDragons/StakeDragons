import EggSvg from 'assets/egg.svg'
import PurpleDragon from 'assets/market/dragon-2.svg'
//import BlueDragon from 'assets/market/dragon-3.svg'
import GoldDragon from 'assets/market/dragon-1.svg'

export const NETWORK = process.env.NEXT_PUBLIC_NETWORK

export const DRAGON_TYPE_NAMES = [
  {
    id: 0,
    name: 'common',
  },
  {
    id: 1,
    name: 'uncommon ',
  },
  {
    id: 2,
    name: 'rare',
  },
  {
    id: 3,
    name: 'epic ',
  },
  {
    id: 4,
    name: 'legendary',
  },
]

export const TEST_DRAGONS = [
  {
    type: 0,
    price: '00',
    id: '#0001',
    name: 'Purple Dragon',
    image: PurpleDragon,
  },
  {
    type: 1,
    price: '00',
    id: '#0002',
    name: 'Gold Dragon',
    image: GoldDragon,
  },
]

export const TEST_EGGS = [
  {
    price: '00',
    id: '1',
    name: 'TEST Dragon Egg',
    image: EggSvg,
  },
  {
    price: '00',
    id: '2',
    name: 'TEST Dragon Egg',
    image: EggSvg,
  },
]
