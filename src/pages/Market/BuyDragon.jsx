import React, { useEffect, useState } from 'react'
import { Box, Grid, Typography, Stack } from '@mui/material'
import { useHistory, useLocation } from 'react-router'
import { withSnackbar } from 'notistack'

import { CustomOutlinedButton } from 'components/Button'
import { CustomOutlinedLabel } from 'components/Label'
import { DayCountDown } from 'components/Countdown'
import DragonBox from 'components/DragonBox/DragonBox'

import BuyIcon from 'assets/market/buy.svg'
import * as COLORS from 'util/ColorUtils'
import useStyles from 'styles'

import { useWallet } from 'contexts/wallet'
import contract from 'contracts/marketplace/contract'
import { showNotification } from 'util/NotificationUtils'
import cw20DRGN from 'contracts/cw20-drgn'
import { DenomPipe } from '../../util/Pipes'

const BuyDragon = (props) => {
  const classes = useStyles()
  const wallet = useWallet()
  const location = useLocation()
  const history = useHistory()

  const [id, setId] = useState('')
  const [price, setPrice] = useState('')
  const [rarity, setRarity] = useState('')
  const [owner, setOwner] = useState('')
  const [ovulation, setOvulation] = useState('')
  const [dailyReward, setDailyReward] = useState('')

  useEffect(() => {
    const getPrice = async () => {
      try {
        if (!wallet.initialized || !contract || id === '') return

        const client = contract(wallet.getClient(), false)
        let res = await client.getToken(id)
        let nftInfo = await client.getTokenData(id)
        if (nftInfo.info.extension) {
          let extension = nftInfo.info.extension
          await setRarity(extension.attributes[0].value)
          await setOvulation(extension.attributes[1].value)
          await setDailyReward(extension.attributes[2].value)
        }
        let res2 = await client.getToken(id)
        if (res2.token) {
          setOwner(res2.token.owner)
        }

        await setPrice(res.token.price)
      } catch (err) {
        console.log(err)
      }
    }
    setId(location.pathname.slice(12, location.pathname.length))
    getPrice()
  }, [id, location.pathname, wallet])

  const buyOnClick = async () => {
    try {
      if (!wallet || !contract) return
      if (owner !== '' && wallet.address === owner) {
        showNotification(props.enqueueSnackbar, 'Transaction Failed ', 'Already yours', 'error')
      } else {
        const client = cw20DRGN(wallet.getClient())
        const txHash = await client.buyFromMarket(wallet.address, id, price, false)
        showNotification(
          props.enqueueSnackbar,
          'Transaction Successful ',
          'Click here for TX',
          'success',
          `https://www.mintscan.io/juno/txs/${txHash}`,
        )
        wallet.refreshBalance()
        history.push('/market')
      }
    } catch (err) {
      console.log(err)
      showNotification(props.enqueueSnackbar, 'Transaction Failed ', 'Click here for TX', 'error')
    }
  }

  return (
    <Grid container direction={'row'} spacing={4} className={classes.pageContainer}>
      <Grid item xs={12} md={5}>
        <DragonBox styles={{ paddingY: 12 }} dragonType={rarity} />
      </Grid>

      <Grid item xs={12} md={7}>
        <Typography className={classes.h4} sx={{ textTransform: 'capitalize' }}>
          {rarity + ' Dragon'}
        </Typography>
        <Box marginY={2}>
          <Box className={classes.goldBox4} py={1} px={2}>
            <Typography className={classes.h2}>Dragon Info</Typography>
            <Stack direction="row" justifyContent="center" spacing={4} marginTop={5}>
              <CustomOutlinedLabel
                title="Rarity"
                amount={rarity}
                styles={{ width: '250px', textTransform: 'capitalize' }}
              />

              <CustomOutlinedLabel
                title="Daily (DRGN) Reward Amount"
                amount={dailyReward}
                unit="DRGN"
                styles={{ width: '250px' }}
              />
            </Stack>

            <Box
              sx={{
                marginY: 2,
                display: { lg: 'flex', xs: 'block' },
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <Box marginX={2}>
                <DayCountDown title={'Ovulation Period:'} day={ovulation} />
              </Box>
              <Box marginX={2}>
                <DayCountDown title={'Unstake: '} day={14} />
              </Box>
            </Box>
          </Box>
        </Box>

        <Box display={'flex'}>
          <Typography className={classes.h5Grey}>Price:</Typography>
          <Typography className={classes.h5} marginX={2}>
            {DenomPipe(price) + ' DRGN'}
          </Typography>
        </Box>

        <CustomOutlinedButton
          title="Buy Now"
          styles={{ width: '100%', marginTop: 4, background: COLORS.DARK_YELLOW_1 }}
          img={BuyIcon}
          onClick={() => buyOnClick()}
        />
      </Grid>
    </Grid>
  )
}

export default withSnackbar(BuyDragon)
