import React from 'react'
import ComingSoon from '../../components/ComingSoon'

const Market = () => {
  return <ComingSoon />
}

export default Market
// import { Box, Grid, Typography, Checkbox } from '@mui/material'

// import contract from 'contracts/marketplace/contract'

// import * as COLORS from 'util/ColorUtils'
// import { DRAGON_TYPE_NAMES } from 'util/constants'
// import useStyles from 'styles'
// import { useWallet } from 'contexts/wallet'

// import EggSvg from 'assets/egg.svg'
// import BlueDragon from 'assets/market/dragon-3.svg'
// import GoldDragon from 'assets/market/dragon-1.svg'
// import FilterImg from 'assets/market/filter.svg'
// import ArrowRight from 'assets/market/arrow-right.svg'
// import ArrowDown from 'assets/market/arrow-down.svg'
// import { DragonCard } from '../../components/InventoryMarketCards'

// const sortOption = [
//   {
//     id: 0,
//     text: 'Lowest Price',
//   },
//   {
//     id: 1,
//     text: 'Highest Price',
//   },
//   {
//     id: 2,
//     text: 'ID Ascending',
//   },
// ]

// const testDragons = [
//   {
//     type: 1,
//     price: '00',
//     id: '#0002',
//     name: 'Gold Dragon',
//     image: GoldDragon,
//   },
//   {
//     type: 4,
//     price: '00',
//     id: '#0003',
//     name: 'Blue Dragon',
//     image: BlueDragon,
//   },
//   {
//     price: '00',
//     id: '',
//     name: 'Dragon Egg',
//     image: EggSvg,
//   },
//   {
//     type: 1,
//     price: '00',
//     id: '#0002',
//     name: 'Gold Dragon',
//     image: GoldDragon,
//   },
//   {
//     type: 4,
//     price: '00',
//     id: '#0003',
//     name: 'Blue Dragon',
//     image: BlueDragon,
//   },
// ]

// const Market = () => {
//   const [sort, setSort] = useState(0)
//   const [sortOpen, setSortOpen] = useState(false)
//   const [eggFilter, setEggFilter] = useState(false)
//   const [selectDragonFilter, setSelectDragonFilter] = useState(false)
//   const [filterOpen, setFilterOpen] = useState(true)
//   const classes = useStyles()
//   const wallet = useWallet()

//   useEffect(() => {
//     const test = async () => {
//       try {
//         if (!wallet || !contract) return

//         const client = contract(wallet.getClient(), false)

//         const res = await client.getAllTokens()
//         console.log('marketplace get all tokens  ', res)

//         const res2 = await client.getTokensByOwner()
//         console.log('get tokens by owner ', res2)

//         const res3 = await client.getMarketplaceConfig()
//         console.log('marketplace config', res3)

//         const res4 = await client.getListedTokens()
//         console.log('marketplace listed tokens', res4)
//       } catch (err) {
//         console.log(err)
//       }
//     }

//     test()
//   }, [wallet])

//   return (
//     <Grid container spacing={6} sx={{ height: '100%', marginTop: '85px' }}>
//       <Grid item xs={12} lg={9} sx={{ display: 'flex !important' }}>
//         <Grid container spacing={2}>
//           {testDragons.map((item, idx) => {
//             return <DragonCard item={item} market={true} key={idx} />
//           })}
//         </Grid>
//       </Grid>

//       {/* FILTER - SORT PANEL  */}
//       <Grid
//         item
//         lg={3}
//         sx={{
//           display: { xs: 'none', lg: 'block' },
//         }}
//       >
//         {filterOpen ? (
//           <Box
//             sx={{
//               borderRadius: '4px',
//               border: `2px solid ${COLORS.DARK_YELLOW_1}`,
//               background: 'linear-gradient(180deg, rgba(52, 52, 52, 0) -13.06%, #343434 100%)',
//               padding: 2,
//               cursor: 'pointer',
//             }}
//           >
//             <Box
//               display="flex"
//               onClick={() => {
//                 setFilterOpen(!filterOpen)
//               }}
//             >
//               <img src={FilterImg} alt="filter icon" style={{ marginRight: 10 }} />
//               <Typography className={classes.h2}>Filter</Typography>{' '}
//             </Box>

//             <Box marginTop={1} sx={{ borderTop: `1px solid ${COLORS.SMOOTH_YELLOW_30}` }}>
//               <Box
//                 onClick={() => {
//                   setEggFilter(!eggFilter)
//                 }}
//                 marginY={3}
//                 sx={{
//                   cursor: 'pointer',
//                   border: eggFilter ? `2px solid ${COLORS.DARK_YELLOW_1}` : 'none',
//                   maxWidth: '70px',
//                 }}
//               >
//                 <Typography sx={{ color: COLORS.WHITE, padding: eggFilter ? 1 : 0 }}>
//                   Egg
//                 </Typography>
//               </Box>
//               <Box
//                 onClick={() => {
//                   setSelectDragonFilter(!selectDragonFilter)
//                 }}
//                 marginY={2}
//                 sx={{
//                   cursor: 'pointer',
//                   border: selectDragonFilter ? `2px solid ${COLORS.DARK_YELLOW_1}` : 'none',
//                   maxWidth: '120px',
//                   display: 'flex',
//                 }}
//               >
//                 <Typography
//                   sx={{ color: COLORS.WHITE, padding: selectDragonFilter ? 1 : 0, marginRight: 2 }}
//                 >
//                   Dragon
//                 </Typography>
//                 {selectDragonFilter ? (
//                   <img src={ArrowDown} alt="arrow" />
//                 ) : (
//                   <img src={ArrowRight} alt="arrow" />
//                 )}{' '}
//               </Box>

//               {selectDragonFilter &&
//                 DRAGON_TYPE_NAMES.map((item, idx) => {
//                   return (
//                     <Box key={idx} sx={{ display: 'flex' }}>
//                       <Checkbox style={{ color: COLORS.DARK_YELLOW_1 }} />
//                       <Typography sx={{ color: COLORS.WHITE, padding: 2 }}>{item.name}</Typography>
//                     </Box>
//                   )
//                 })}
//             </Box>
//             <Box sx={{ background: COLORS.GREY_30 }} onClick={() => setSortOpen(!sortOpen)}>
//               <Typography sx={{ color: COLORS.WHITE, padding: 2 }}>
//                 {'Sort by: ' + sortOption[sort].text}
//               </Typography>
//             </Box>
//             {sortOpen && (
//               <Box
//                 sx={{
//                   borderTop: `1px solid ${COLORS.SMOOTH_YELLOW_30}`,
//                   background: COLORS.GREY_30,
//                 }}
//               >
//                 {sortOption.map((item, idx) => {
//                   return (
//                     <Box key={idx} onClick={() => setSort(item.id)}>
//                       <Typography
//                         key={idx}
//                         sx={{
//                           color: item.id === sort ? COLORS.WHITE : COLORS.SECONDARY_TEXT_GREY,
//                           padding: 2,
//                         }}
//                       >
//                         {item.text}
//                       </Typography>
//                     </Box>
//                   )
//                 })}
//               </Box>
//             )}
//           </Box>
//         ) : (
//           <Box
//             sx={{
//               borderRadius: '4px',
//               background: COLORS.GREY_30,
//               maxWidth: '60px',
//               maxHeight: '60px',
//               cursor: 'pointer',
//             }}
//             p={2}
//             onClick={() => {
//               setFilterOpen(!filterOpen)
//             }}
//           >
//             <img src={FilterImg} alt="filter-icon" />
//           </Box>
//         )}
//       </Grid>
//     </Grid>
//   )
// }

// export default Market
