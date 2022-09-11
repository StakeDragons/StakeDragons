import React, { useEffect, useState } from 'react'
import { Box, Grid, Typography, Checkbox } from '@mui/material'

import { DragonCard, EggCard } from 'components/InventoryMarketCards'
import useStyles from 'styles'

import { useWallet } from 'contexts/wallet'
import contract from 'contracts/marketplace/contract'

import FilterImg from 'assets/market/filter.svg'
import ArrowRight from 'assets/market/arrow-right.svg'
import ArrowDown from 'assets/market/arrow-down.svg'
import * as COLORS from 'util/ColorUtils'
import { SORT_OPTIONS, DRAGON_TYPE_NAMES } from 'util/constants'
import { getImageUrl } from 'util/ImageUrl'
import { toggleQueryParamField, useQueryParams } from 'hooks/useQueryParams'
import { useHistory } from 'react-router'
import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'

const PAGE_LIMIT = 6

const ALL_DRAGON_TYPES = DRAGON_TYPE_NAMES.map((dragon) => dragon.name)

const Market = () => {
  const classes = useStyles()
  const wallet = useWallet()
  const history = useHistory()

  const [sort, setSort] = useState(0)
  const [sortOpen, setSortOpen] = useState(false)
  const [sortChange, setSortChange] = useState(false)
  const [filterOpen, setFilterOpen] = useState(true)

  const [eggFilter, setEggFilter] = useState(undefined)
  const [selectedDragonType, setSelectedDragonType] = useState([])
  const [dragonFilterOpen, setDragonFilterOpen] = useState(false)

  // eslint-disable-next-line
  const [eggList, setEggList] = useState([])
  // eslint-disable-next-line
  const [dragonList, setDragonList] = useState([])
  const [marketList, setMarketList] = useState([])

  const query = useQueryParams('/market')

  const handleScroll = async (e) => {
    let element = e.target
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      if (marketList[marketList.length - 1]) {
        let startAfter =
          sort === 0
            ? marketList[marketList.length - 1].id
            : marketList[marketList.length - 1].price

        try {
          if (!contract || !startAfter) return

          let client
          if (wallet.initialized) {
            client = contract(wallet.getClient(), eggFilter)
          } else {
            let offline = await CosmWasmClient.connect('https://rpc.juno-1.deuslabs.fi')
            client = contract(offline, eggFilter)
          }

          const marketSize = await client.getMarketSize()

          if (marketList.length >= marketSize) return

          var res
          var newPage = []
          if (!eggFilter && selectedDragonType.length > 0) {
            if (sort === 0) {
              res = await client.getTokensByRarity(PAGE_LIMIT, startAfter, selectedDragonType)
            } else if (sort === 1) {
              res = await client.getTokensByRarityPriceDesc(
                PAGE_LIMIT,
                startAfter,
                selectedDragonType,
              )
            } else {
              res = await client.getTokensByRarityPriceAsc(
                PAGE_LIMIT,
                startAfter,
                selectedDragonType,
              )
            }
          } else {
            if (sort === 0) {
              res = await client.getListedTokens(PAGE_LIMIT, startAfter)
            } else if (sort === 1) {
              res = await client.getTokensByPriceDesc(PAGE_LIMIT, startAfter)
            } else {
              res = await client.getTokensByPriceAsc(PAGE_LIMIT, startAfter)
            }
          }

          if (res && res.tokens.length !== 0) {
            for (let i = 0; i < res.tokens.length; i++) {
              if (res.tokens[i]) {
                let newItem = {
                  type: eggFilter ? 1 : 2,
                  id: res.tokens[i].id,
                  image: eggFilter ? getImageUrl(res.tokens[i].id) : '',
                  owner: res.tokens[i].owner,
                  kind: eggFilter ? '' : res.tokens[i].rarity,
                  price: res.tokens[i].price,
                }
                newPage.push(newItem)
              }
            }
            let all_items = marketList.concat(newPage)

            all_items = all_items.filter(
              (value, index, self) => index === self.findIndex((t) => t.id === value.id),
            )

            eggFilter ? await setEggList(all_items) : await setDragonList(all_items)
            await setMarketList(all_items)
          }
        } catch (e) {
          console.log(e)
        }
      }
    }
  }

  const loadMarket = async () => {
    try {
      if (!contract) return
      let client
      if (wallet.initialized) {
        client = contract(wallet.getClient(), false)
      } else {
        let offline = await CosmWasmClient.connect('https://rpc.juno-1.deuslabs.fi')
        client = contract(offline, false)
      }

      let market = []
      var res

      if (sortChange) {
        setMarketList([])
        setDragonList([])
        setEggList([])
      }

      if (!eggFilter) {
        //QUERY BASED ON DRAGON TYPE FILTER
        if (sort === 0) {
          res = await client.getTokensByRarity(
            PAGE_LIMIT,
            null,
            selectedDragonType.length > 0 ? selectedDragonType : ALL_DRAGON_TYPES,
          )
        } else if (sort === 1) {
          res = await client.getTokensByRarityPriceDesc(
            PAGE_LIMIT,
            null,
            selectedDragonType.length > 0 ? selectedDragonType : ALL_DRAGON_TYPES,
          )
        } else {
          res = await client.getTokensByRarityPriceAsc(
            PAGE_LIMIT,
            null,
            selectedDragonType.length > 0 ? selectedDragonType : ALL_DRAGON_TYPES,
          )
        }
      } else {
        //DEFAULT QUERY FOR EGG AND DRAGON
        if (sort === 0) {
          res = await client.getListedTokens(PAGE_LIMIT, null)
        } else if (sort === 1) {
          res = await client.getTokensByPriceDesc(PAGE_LIMIT, '0')
        } else {
          res = await client.getTokensByPriceAsc(PAGE_LIMIT, '0')
        }
      }

      if (res && res.tokens.length !== 0) {
        for (let i = 0; i < res.tokens.length; i++) {
          if (res.tokens[i]) {
            let newItem = {
              type: eggFilter ? 1 : 2,
              id: res.tokens[i].id,
              image: eggFilter ? getImageUrl(res.tokens[i].id) : '',
              owner: res.tokens[i].owner,
              kind: eggFilter ? '' : res.tokens[i].rarity,
              price: res.tokens[i].price,
            }
            market.push(newItem)
          }
        }
        eggFilter ? await setEggList(market) : await setDragonList(market)
        await setMarketList(market)
      }

      await setSortChange(false)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    loadMarket()
    // eslint-disable-next-line
  }, [wallet, sort, eggFilter, sortChange])

  //   const eggFilterChange = () => {
  //     setDragonFilterOpen(false)
  //     setSortOpen(false)
  //     setSort(0)
  //     setEggFilter(true)
  //   }

  const dragonFilterChange = async (dragonTypes) => {
    setEggFilter(false)
    setSortOpen(false)
    setSort(0)
    setSelectedDragonType(dragonTypes)

    try {
      if (contract) {
        let client
        if (wallet.initialized) {
          client = contract(wallet.getClient(), false)
        } else {
          let offline = await CosmWasmClient.connect('https://rpc.juno-1.deuslabs.fi')
          client = contract(offline, eggFilter)
        }

        let filteredDragons = await client.getTokensByRarity(
          10,
          null,
          dragonTypes.length > 0 ? dragonTypes : DRAGON_TYPE_NAMES.map((dragon) => dragon.name),
        )
        let dragons = []
        filteredDragons.tokens.forEach((item) =>
          dragons.push({
            id: item.id,
            price: item.price,
            type: 2,
            kind: item.rarity,
            owner: item.owner,
          }),
        )
        setMarketList(dragons)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const dragonFilterClicked = () => {
    setDragonFilterOpen(!dragonFilterOpen)
    history.push({
      pathname: '/market',
      search: `?listType=dragon&${selectedDragonType.map((kind) => `kind=${kind}`).join('&')}`,
    })
  }

  const changeDragonFilter = (value) => {
    const newQueryFieldParam = toggleQueryParamField('kind', value)
    history.push({
      pathname: '/market',
      search: `?listType=dragon&${newQueryFieldParam}`,
    })
  }

  //   const changeEggFilter = () => {
  //     history.push({
  //       pathname: '/market',
  //       search: `?listType=egg`,
  //     })
  //   }

  useEffect(() => {
    if (query.get('listType') === 'dragon') {
      dragonFilterChange(query.getAll('kind'))
    }
    //else {
    //eggFilterChange()
    //}
    // eslint-disable-next-line
  }, [query])

  return (
    <div
      style={{
        overflow: 'scroll',
        msOverflowStyle: '0px !important',
        scrollbarWidth: '0px !important',
        overflowX: 'hidden',
        height: '100%',
      }}
      onScroll={(e) => handleScroll(e)}
    >
      <Grid container spacing={6} sx={{ height: '100%' }}>
        <Grid item xs={12} md={8.5} sx={{ display: 'flex !important', marginBottom: 4 }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            {marketList &&
              marketList !== [] &&
              marketList.map((item, idx) => {
                return item.type === 1 ? (
                  <EggCard key={idx} item={item} />
                ) : (
                  <DragonCard key={idx} item={item} market={true} />
                )
              })}
          </Box>
        </Grid>

        {/* FILTER - SORT PANEL  */}
        <Grid
          item
          md={3}
          sx={{
            display: { xs: 'none', md: 'block' },
          }}
        >
          {filterOpen ? (
            <Box
              sx={{
                borderRadius: '4px',
                border: `2px solid ${COLORS.DARK_YELLOW_1}`,
                background: 'linear-gradient(180deg, rgba(52, 52, 52, 0) -13.06%, #343434 100%)',
                padding: 2,
                cursor: 'pointer',
                position: 'absolute',
                bottom: '5rem',
                right: '5rem',
                maxWidth: '350px',
                width: '20vw',
              }}
            >
              <Box
                display="flex"
                onClick={() => {
                  setFilterOpen(!filterOpen)
                }}
              >
                <img src={FilterImg} alt="filter icon" style={{ marginRight: 10 }} />
                <Typography className={classes.h2}>Filter</Typography>{' '}
              </Box>

              <Box marginTop={1} sx={{ borderTop: `1px solid ${COLORS.SMOOTH_YELLOW_30}` }}>
                {/* <Box
                  marginY={3}
                  sx={{
                    cursor: 'pointer',
                    border: eggFilter ? `2px solid ${COLORS.DARK_YELLOW_1}` : 'none',
                    maxWidth: '70px',
                  }}
                >
                  <Typography sx={{ color: COLORS.WHITE, padding: eggFilter ? 1 : 0 }}>
                    Egg
                  </Typography>
                </Box> */}
                <Box
                  onClick={dragonFilterClicked}
                  marginY={2}
                  sx={{
                    cursor: 'pointer',
                    border: dragonFilterOpen ? `2px solid ${COLORS.DARK_YELLOW_1}` : 'none',
                    maxWidth: '120px',
                    display: 'flex',
                  }}
                >
                  <Typography
                    sx={{ color: COLORS.WHITE, padding: dragonFilterOpen ? 1 : 0, marginRight: 2 }}
                  >
                    Dragon
                  </Typography>
                  {dragonFilterOpen ? (
                    <img src={ArrowDown} alt="arrow" />
                  ) : (
                    <img src={ArrowRight} alt="arrow" />
                  )}{' '}
                </Box>

                {dragonFilterOpen &&
                  DRAGON_TYPE_NAMES.map((item, idx) => {
                    return (
                      <Box key={idx}>
                        <Box
                          sx={{ display: 'flex', cursor: 'pointer' }}
                          onClick={() => changeDragonFilter(item.name)}
                        >
                          <Checkbox
                            style={{ color: COLORS.DARK_YELLOW_1 }}
                            checked={selectedDragonType.includes(item.name)}
                          />
                          <Typography
                            sx={{ color: COLORS.WHITE, padding: 2, textTransform: 'capitalize' }}
                          >
                            {item.name}
                          </Typography>
                        </Box>
                      </Box>
                    )
                  })}
              </Box>
              <Box
                sx={{ background: COLORS.GREY_30 }}
                onClick={() => {
                  setSort(0)
                  setSortOpen(!sortOpen)
                }}
              >
                <Typography sx={{ color: COLORS.WHITE, padding: 2 }}>
                  {sort !== 0 ? 'Sort by: ' + SORT_OPTIONS[sort - 1].text : 'Sort'}
                </Typography>
              </Box>
              {sortOpen && (
                <Box
                  sx={{
                    borderTop: `1px solid ${COLORS.SMOOTH_YELLOW_30}`,
                    background: COLORS.GREY_30,
                  }}
                >
                  {SORT_OPTIONS.map((item, idx) => {
                    return (
                      <Box
                        key={idx}
                        onClick={() => {
                          setSortChange(true)
                          setSort(item.id)
                        }}
                      >
                        <Typography
                          key={idx}
                          sx={{
                            color: item.id === sort ? COLORS.WHITE : COLORS.SECONDARY_TEXT_GREY,
                            padding: 2,
                          }}
                        >
                          {item.text}
                        </Typography>
                      </Box>
                    )
                  })}
                </Box>
              )}
            </Box>
          ) : (
            <Box
              sx={{
                borderRadius: '4px',
                background: COLORS.GREY_30,
                maxWidth: '60px',
                maxHeight: '60px',
                cursor: 'pointer',
                position: 'absolute',
                bottom: '5rem',
                right: '5rem',
              }}
              p={2}
              onClick={() => {
                setFilterOpen(!filterOpen)
              }}
            >
              <img src={FilterImg} alt="filter-icon" />
            </Box>
          )}
        </Grid>
      </Grid>
    </div>
  )
}

export default Market
