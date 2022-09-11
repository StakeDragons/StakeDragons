import React, { useState, useEffect } from 'react'
import { withSnackbar } from 'notistack'
import { Grid, Modal, Typography, Stack } from '@mui/material'
import { Box } from '@mui/system'
import TextField from '@mui/material/TextField'
import { CustomOutlinedButton } from 'components/Button'
import EggBox from 'components/EggBox'
import DragonBox from 'components/DragonBox/DragonBox'
import DragonInfo from 'components/DragonInfo'
import InventoryDragon from 'components/InventoryMarketCards/InventoryDragon'
import InventoryEgg from 'components/InventoryMarketCards/InventoryEgg'
import { CustomOutlinedLabel } from 'components/Label'
import Empty from './Empty'

import * as COLORS from 'util/ColorUtils'
import useStyles from 'styles'
import contract from 'contracts/marketplace/contract'
import { showNotification } from 'util/NotificationUtils'
import { useWallet } from 'contexts/wallet'
import { useContracts } from 'contexts/contract'
import whitelistContract from 'contracts/whitelist'

import SellIcon from 'assets/inventory/sell.svg'
import RemoveIcon from 'assets/inventory/remove.svg'
import TransferIcon from 'assets/inventory/transfer.svg'
import PurpleDragon from 'assets/inventory/starter.png'
import { getImageUrl } from '../../util/ImageUrl'
import NoEggDragon from './NoEggDragon'
import { useRef } from 'react'
import useOnScreen from '../../hooks/useOnScreen'

const Inventory = (props) => {
  const classes = useStyles()
  const wallet = useWallet()

  const dragonLimit = 5
  const eggLimit = 5

  const eggContract = useContracts().eggMint
  const dragonContract = useContracts().dragon

  const EGG_CONTRACT_ADDRESS = process.env.REACT_APP_EGG_CONTRACT_ADDRESS
  const DRAGON_CONTRACT_ADDRESS = process.env.REACT_APP_DRAGON_CONTRACT_ADDRESS

  const [selected, setSelected] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [selectedItemId, setSelectedItemId] = useState(null)
  const [selectedItemPrice, setSelectedItemPrice] = useState('0')

  const [isEgg, setIsEgg] = useState(true)
  const [error, setError] = useState(false)
  const [refresh, setRefresh] = useState(true)

  const [ownedEggList, setOwnedEggList] = useState([])
  const [ownedDragonList, setOwnedDragonList] = useState([])
  const [isDragonPage, setIsDragonPage] = useState(true)

  //const [listedEggs, setListedEggs] = useState([])
  const [listedDragons, setListedDragons] = useState([])
  const [hasStarter, setHasStarter] = useState(false)

  const [pricePanel, setPricePanel] = useState(false)
  const [price, setPrice] = useState('')
  const [transferPanel, setTransferPanel] = useState(false)
  const [transferTarget, setTransferTarget] = useState('')
  const [display, setDisplay] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [hasNext, setHasNext] = useState(false)

  const loadMoreRef = useRef(null)
  const loadMoreVisible = useOnScreen(loadMoreRef)

  const loadMore = async () => {
    try {
      if (!wallet.initialized || !eggContract || !dragonContract) return
      //LOAD MORE EGGS AND LISTED EGGS
      if (!isDragonPage) {
        //let marketStart = listedEggs.length > 0 ? listedEggs[listedEggs.length - 1].id : null
        let start = ownedEggList[ownedEggList.length - 1]

        const egg_client = eggContract?.use(EGG_CONTRACT_ADDRESS)
        //const egg_market = contract(wallet.getClient(), true)

        setIsFetching(true)
        const res_egg = await egg_client.getTokens(wallet.address, start, eggLimit)
        //const eggs = await egg_market.getListedTokensByOwner(eggLimit, marketStart, wallet.address)
        setOwnedEggList([...ownedEggList, ...res_egg])
        setHasNext(res_egg.length >= eggLimit)

        // if (eggs.tokens.length > 0) {
        //   setListedEggs([...listedEggs, ...eggs.tokens])
        // }
      } else {
        let dragonMarketStartAfter =
          listedDragons.length > 0 ? listedDragons[listedDragons.length - 1].id : null
        let dragonStartAfter
        if (hasStarter) {
          dragonStartAfter = ownedDragonList[ownedDragonList.length - 2].token_id
          setHasStarter(false)
        } else {
          dragonStartAfter = ownedDragonList[ownedDragonList.length - 1].token_id
        }
        const dragon_client = dragonContract?.use(DRAGON_CONTRACT_ADDRESS)
        const drgn_market = contract(wallet.getClient(), false)

        const res_dragon = await dragon_client.rangeUserDragons(
          wallet.address,
          dragonStartAfter,
          dragonLimit,
        )
        let all_items = ownedDragonList.concat(res_dragon)

        all_items = all_items.filter(
          (value, index, self) => index === self.findIndex((t) => t.token_id === value.token_id),
        )

        await setOwnedDragonList(all_items)

        let listed_dragons = await drgn_market.getListedTokensByOwner(
          dragonLimit,
          dragonMarketStartAfter,
          wallet.address,
        )
        await setListedDragons([...listedDragons, ...listed_dragons.tokens])
        setHasNext(res_dragon.length >= dragonLimit || listed_dragons.tokens.length >= dragonLimit)
        setIsFetching(false)
      }
    } catch (e) {
      console.log(e)
      setIsFetching(false)
    }
  }

  const switchPage = () => {
    setIsDragonPage(!isDragonPage)
  }

  useEffect(() => {
    const queryUserEggs = async () => {
      try {
        if (!wallet.initialized || !eggContract || !dragonContract) return
        const egg_client = eggContract?.use(EGG_CONTRACT_ADDRESS)
        const dragon_client = dragonContract?.use(DRAGON_CONTRACT_ADDRESS)

        setIsFetching(true)
        const res_dragon = await dragon_client.rangeUserDragons(wallet.address, '0', dragonLimit)
        const res_egg = await egg_client.getTokens(wallet.address, '0', eggLimit)

        const starter_client = whitelistContract(wallet.getClient())
        const res_starter = await starter_client.getTokens(wallet.address)

        //const egg_market = contract(wallet.getClient(), true)
        const drgn_market = contract(wallet.getClient(), false)

        let user_dragons = res_dragon
        if (res_starter.length === 1) {
          await setHasStarter(true)
          let starter = {
            kind: 'starter',
          }
          user_dragons.push(starter)
        }

        await setOwnedDragonList(res_dragon)
        await setOwnedEggList(res_egg)
        let listed_dragons = await drgn_market.getListedTokensByOwner(
          dragonLimit,
          null,
          wallet.address,
        )
        await setListedDragons(listed_dragons.tokens)
        //let listed_eggs = await egg_market.getListedTokensByOwner(eggLimit, null, wallet.address)
        //await setListedEggs(listed_eggs.tokens)

        setHasNext(
          listed_dragons.tokens.length >= dragonLimit ||
            res_dragon.length >= dragonLimit ||
            res_egg.length >= eggLimit,
        )
        await setSelected(false)
        await setPricePanel(false)
        await setPrice('')
        await setSelectedItemPrice('0')
        await setTransferPanel(false)
        await setTransferTarget('')

        await setRefresh(false)
        setIsFetching(false)
      } catch (e) {
        setIsFetching(false)
      }
    }
    if (wallet) {
      queryUserEggs()
    }
    setHasNext(true)
    // eslint-disable-next-line
  }, [wallet, eggContract, dragonContract, EGG_CONTRACT_ADDRESS, refresh, DRAGON_CONTRACT_ADDRESS])

  useEffect(() => {
    if (!isFetching && loadMoreVisible && hasNext) {
      loadMore()
    }
    // eslint-disable-next-line
  }, [isFetching, loadMoreVisible, hasNext])

  useEffect(() => {
    setIsFetching(false)
    setHasNext(true)
  }, [isDragonPage])

  const scrollToSelected = async (item, isEgg, id, price) => {
    await setSelected(true)
    await setIsEgg(isEgg)
    await setSelectedItem(item)
    await setSelectedItemId(id)
    await setSelectedItemPrice(price)
  }

  const OpenClosePricePanel = () => {
    setPricePanel(!pricePanel)
  }

  const OpenCloseTransferPanel = () => {
    setTransferPanel(!transferPanel)
  }

  const transferOnClick = async () => {
    try {
      if (!wallet || !eggContract || !dragonContract) return
      const client = isEgg
        ? eggContract.use(EGG_CONTRACT_ADDRESS)
        : dragonContract.use(DRAGON_CONTRACT_ADDRESS)

      const txHash = await client.transferNft(wallet.address, transferTarget, selectedItemId)
      showNotification(
        props.enqueueSnackbar,
        'Transaction Successful ',
        'Click here for TX',
        'success',
        `https://www.mintscan.io/juno/txs/${txHash}`,
      )
      setRefresh(true)
    } catch (err) {
      showNotification(props.enqueueSnackbar, 'Transaction Failed ', 'Click here for TX', 'error')
    }
  }

  const listToken = async () => {
    try {
      if (!wallet || !contract) return

      const client = contract(wallet.getClient(), isEgg)
      const txHash = await client.listToken(
        wallet.address,
        selectedItemId,
        price,
        isEgg ? 'Dragon Egg' : selectedItem.kind,
        isEgg ? '' : selectedItem.ovulation_period,
        isEgg ? '' : selectedItem.daily_income,
      )

      showNotification(
        props.enqueueSnackbar,
        'Transaction Successful ',
        'Click here for TX',
        'success',
        `https://www.mintscan.io/juno/txs/${txHash}`,
      )
      setRefresh(true)
    } catch (err) {
      console.log(err)
      showNotification(props.enqueueSnackbar, 'Transaction Failed ', 'Click here for TX', 'error')
    }
  }

  const updatePrice = async () => {
    try {
      if (!wallet || !contract) return

      const client = contract(wallet.getClient(), isEgg)

      const txHash = await client.updatePrice(wallet.address, selectedItemId, price)
      showNotification(
        props.enqueueSnackbar,
        'Transaction Successful ',
        'Click here for TX',
        'success',
        `https://www.mintscan.io/juno/txs/${txHash}`,
      )
      setRefresh(true)
    } catch (err) {
      console.log(err)
      showNotification(props.enqueueSnackbar, 'Transaction Failed ', 'Click here for TX', 'error')
    }
  }
  // TODO: Get the correct tokenId and delete default value
  const pricePanelOnClick = async (isSell) => {
    if (isSell) listToken(isSell)
    else updatePrice(isSell)
  }

  const removeListingOnClick = async () => {
    try {
      if (!wallet || !contract) return

      const client = contract(wallet.getClient(), isEgg)

      const txHash = await client.delistTokens(wallet.address, selectedItemId)
      showNotification(
        props.enqueueSnackbar,
        'Transaction Successful ',
        'Click here for TX',
        'success',
        `https://www.mintscan.io/juno/txs/${txHash}`,
      )
      setRefresh(true)
    } catch (err) {
      console.log(err)
      showNotification(props.enqueueSnackbar, 'Transaction Failed ', 'Click here for TX', 'error')
    }
  }

  const renderStarter = (item) => {
    return (
      <Box
        sx={{
          border: `1px solid ${COLORS.SMOOTH_YELLOW_30}`,
          borderRadius: '4px',
          cursor: 'pointer',
          height: '410px',
          maxWidth: '275px',
        }}
        onClick={() => scrollToSelected(item, false, null, '0')}
      >
        <img
          src={PurpleDragon}
          alt="dragon img"
          height={'180px'}
          width={'100%'}
          style={{ marginTop: '40px', marginBottom: '92px' }}
        />

        <Grid container margin={2}>
          <Grid item xs={12}>
            <Typography sx={{ color: COLORS.WHITE }}>{'Starter Dragon'}</Typography>
          </Grid>
        </Grid>
        <Grid container margin={2}></Grid>
      </Box>
    )
  }
  const renderPriceContainer = (isSell, title) => {
    return (
      <Box
        className={classes.goldBox2}
        style={{ borderStyle: 'none solid solid ' }}
        sx={{ display: 'flex', flexDirection: 'column', p: 4 }}
      >
        <Typography className={classes.h3Grey} sx={{ textAlign: 'left !important' }}>
          Price
        </Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} lg={8}>
            <Box className={classes.goldBox1}>
              <Typography
                className={classes.h3Grey}
                sx={{ textAlign: 'left !important', padding: '13px' }}
              >
                DRGN
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Box className={classes.goldBox1}>
              <TextField
                id="standard-basic"
                label=""
                type="tel"
                sx={{
                  width: '100%',
                  input: {
                    width: '100%',
                    color: COLORS.SECONDARY_TEXT_GREY,
                    px: 3,
                    height: '46px',
                  },
                }}
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                InputProps={{ disableUnderline: true }}
                variant="standard"
              />
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'end', mt: 3 }}>
          <Box
            marginRight={3}
            onClick={OpenClosePricePanel}
            alignItems="center"
            display="flex"
            sx={{ cursor: 'pointer' }}
          >
            <Typography className={classes.h3}>Cancel</Typography>
          </Box>
          <CustomOutlinedButton
            title={title}
            styles={{ paddingY: '10px', paddingX: 6, margin: 0 }}
            onClick={() => pricePanelOnClick(isSell)}
          />
        </Box>
      </Box>
    )
  }

  const renderTransferField = () => {
    return (
      <Box
        className={classes.goldBox2}
        style={{ borderStyle: 'none solid solid ' }}
        sx={{ display: 'flex', flexDirection: 'column', p: 4 }}
      >
        <Typography className={classes.h3Grey} sx={{ textAlign: 'left !important' }}>
          Transfer To
        </Typography>
        <Box className={classes.goldBox1} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            id="standard-basic"
            label=""
            sx={{
              width: '100%',
              input: { width: '100%', color: COLORS.SECONDARY_TEXT_GREY, px: 3, height: '46px' },
            }}
            InputProps={{ disableUnderline: true }}
            variant="standard"
            onChange={(e) => setTransferTarget(e.target.value)}
            value={transferTarget}
          />
        </Box>

        <Box sx={{ width: '100%', justifyContent: 'end', display: 'flex', mt: 3 }}>
          <Box marginRight={3} alignItems="center" display="flex" sx={{ cursor: 'pointer' }}>
            <Typography className={classes.h3}>Cancel</Typography>
          </Box>
          <CustomOutlinedButton
            title={'Transfer'}
            styles={{ paddingY: '10px', paddingX: 6, margin: 0 }}
            onClick={() => transferOnClick()}
          />
        </Box>
      </Box>
    )
  }

  const renderNotListedItem = () => {
    if (selectedItem && selectedItem.kind === 'starter') {
      // Only for starter Dragon
      return (
        <Grid item xs={12} lg={6}>
          <Box className={classes.goldBox4}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <img src={PurpleDragon} alt="dragon img" height={'auto'} width={'100%'} />
            </Box>
          </Box>
          <Box className={classes.goldBox4} py={2} px={2} marginTop={2}>
            <Typography className={classes.h2}>Dragon Info</Typography>
            <Stack direction="row" justifyContent="center" spacing={4} marginTop={5}>
              <CustomOutlinedLabel title="Rarity" amount={'Starter'} styles={{ width: '250px' }} />
              <CustomOutlinedLabel
                title="Daily (DRGN) Reward Amount"
                amount={'0'}
                unit="DRGN"
                styles={{ width: '250px' }}
              />
            </Stack>
          </Box>
        </Grid>
      )
    } else {
      return (
        <Grid item xs={12} lg={4}>
          {!isEgg ? (
            <DragonBox
              styles={{ padding: 2, marginBottom: 4 }}
              dragonType={selectedItem ? selectedItem.kind : null}
            />
          ) : (
            <EggBox styles={{ padding: 4, marginBottom: 4 }} img={getImageUrl(selectedItemId)} />
          )}
          {!isEgg && <DragonInfo inventory={true} item={selectedItem} />}

          {isEgg ? (
            <CustomOutlinedButton
              title={'Sell on Marketplace'}
              styles={{ width: '100%', background: COLORS.DARK_YELLOW_1 }}
              img={SellIcon}
              disabled={true}
            />
          ) : (
            <CustomOutlinedButton
              title={'Sell on Marketplace'}
              styles={{ width: '100%', background: COLORS.DARK_YELLOW_1 }}
              img={SellIcon}
              onClick={OpenClosePricePanel}
            />
          )}

          {!isEgg && pricePanel && renderPriceContainer(true, 'Sell')}

          <CustomOutlinedButton
            title="Transfer"
            styles={{ width: '100%', marginRight: '10%', marginY: 2 }}
            img={TransferIcon}
            onClick={OpenCloseTransferPanel}
          />
          {transferPanel && renderTransferField()}
        </Grid>
      )
    }
  }

  const renderListedItem = () => {
    let link = `/${isEgg ? 'buy-egg' : 'buy-dragon'}/${selectedItemId}`
    let item = {
      kind: selectedItem.rarity,
      daily_income: selectedItem.daily_reward,
      ovulation_period: selectedItem.ovulation_period,
    }

    return (
      <Grid item xs={12} lg={4}>
        {!isEgg ? (
          <DragonBox
            styles={{ padding: 2, marginBottom: 4 }}
            dragonType={selectedItem ? selectedItem.rarity : null}
          />
        ) : (
          <EggBox styles={{ padding: 4, marginBottom: 4 }} img={getImageUrl(selectedItemId)} />
        )}
        {!isEgg && <DragonInfo inventory={true} item={item} />}

        <CustomOutlinedButton
          title={'Update Price'}
          styles={{ width: '100%', background: COLORS.DARK_YELLOW_1, marginY: 2 }}
          img={SellIcon}
          onClick={OpenClosePricePanel}
        />
        {pricePanel && renderPriceContainer(false, 'Update')}

        <CustomOutlinedButton
          title={'Remove Listing'}
          styles={{ width: '100%', background: COLORS.DARK_YELLOW_1 }}
          img={RemoveIcon}
          onClick={removeListingOnClick}
        />

        <a href={link}>
          <CustomOutlinedButton title="View Listing" styles={{ width: '100%', marginY: 2 }} />
        </a>
      </Grid>
    )
  }

  if (error) {
    return display && <Empty />
  } else {
    return (
      <>
        <div
          style={{
            overflow: 'scroll',
            msOverflowStyle: '0px !important',
            scrollbarWidth: '0px !important',
            overflowX: 'hidden',
            height: '100%',
          }}
        >
          <Grid>
            <Grid>
              <Typography className={classes.h2}>{isDragonPage ? 'Dragons' : 'Eggs'}</Typography>
              <Grid container direction={'row'} marginTop={5} height="55vh" overflow="auto">
                {isDragonPage && listedDragons.length === 0 && ownedDragonList.length === 0 ? (
                  <NoEggDragon title={'dragons'} />
                ) : (
                  <>
                    {isDragonPage &&
                      ownedDragonList.map((item, idx) => {
                        return (
                          <Grid key={idx} m={1} item>
                            {item.kind !== 'starter' ? (
                              <Grid>
                                <InventoryDragon
                                  height={'410px'}
                                  maxWidth={'275px'}
                                  imgHeight={'180px'}
                                  item={item}
                                  price={'0'}
                                  onClick={() => scrollToSelected(item, false, item.token_id, '0')}
                                />
                              </Grid>
                            ) : (
                              <Grid>{renderStarter(item)}</Grid>
                            )}
                          </Grid>
                        )
                      })}
                  </>
                )}
                {isDragonPage &&
                  listedDragons.map((item, idx) => {
                    return (
                      <Grid key={idx} m={1}>
                        <InventoryDragon
                          height={'410px'}
                          maxWidth={'275px'}
                          imgHeight={'180px'}
                          item={{ token_id: item.id, kind: item.rarity }}
                          price={item ? item.price : '0'}
                          onClick={() => scrollToSelected(item, false, item.id, item.price)}
                        />
                      </Grid>
                    )
                  })}
                {!isDragonPage && ownedEggList.length === 0 ? (
                  <NoEggDragon title={'eggs'} />
                ) : (
                  !isDragonPage &&
                  ownedEggList.map((item, idx) => {
                    return (
                      <Grid key={idx} m={1} item>
                        <Grid>
                          <InventoryEgg
                            onClick={() => scrollToSelected(item, true, item, '0')}
                            img={getImageUrl(item)}
                            id={item}
                            price={'0'}
                          />
                        </Grid>
                      </Grid>
                    )
                  })
                )}
                {/* LISTED EGGS */}
                {/* {!isDragonPage &&
                  listedEggs.map((item, idx) => {
                    return (
                      <Grid key={idx} m={1}>
                        <InventoryEgg
                          onClick={() => scrollToSelected(item, true, item.id, item.price)}
                          img={getImageUrl(item.id)}
                          id={item.id}
                          price={item ? item.price : '0'}
                        />
                      </Grid>
                    )
                  })} */}
                <Grid m={1} item xs={12}>
                  <div
                    ref={loadMoreRef}
                    style={{
                      width: '100%',
                      height: '10vh',
                      color: COLORS.DARK_YELLOW_1,
                      fontSize: 24,
                      visibility: hasNext ? 'visible' : 'hidden',
                    }}
                  ></div>
                </Grid>
              </Grid>
            </Grid>
            <CustomOutlinedButton
              title={isDragonPage ? 'Eggs >' : '< Dragons'}
              onClick={switchPage}
              styles={{ width: '12vw', padding: '10px', float: 'right', marginY: { xs: 2, lg: 4 } }}
            />
          </Grid>
        </div>

        <Modal
          open={selected}
          onClose={() => setRefresh(true)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className={classes.modalContainer}
        >
          <Box
            className={classes.modalStyle}
            sx={{ marginTop: pricePanel && !isEgg ? '150px' : '0px' }}
          >
            {selectedItemPrice === '0' ? renderNotListedItem() : renderListedItem()}
          </Box>
        </Modal>
      </>
    )
  }
}

export default withSnackbar(Inventory)
