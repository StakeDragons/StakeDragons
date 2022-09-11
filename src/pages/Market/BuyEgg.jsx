import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router'
import { Box, Grid, Typography } from '@mui/material'
import { withSnackbar } from 'notistack'
import useStyles from 'styles'

import { CustomOutlinedButton } from 'components/Button'

import { useWallet } from 'contexts/wallet'
import contract from 'contracts/marketplace/contract'
import cw20DRGN from 'contracts/cw20-drgn'

import { showNotification } from 'util/NotificationUtils'
import { getImageUrl } from 'util/ImageUrl'
import * as COLORS from 'util/ColorUtils'
import BuyIcon from 'assets/market/buy.svg'

const BuyEgg = (props) => {
  const classes = useStyles()
  const wallet = useWallet()
  const location = useLocation()
  const history = useHistory()

  const [id, setId] = useState('')
  const [image, setImage] = useState('')
  const [price, setPrice] = useState('')
  const [owner, setOwner] = useState('')

  useEffect(() => {
    const getPrice = async () => {
      try {
        if (!wallet.initialized || !contract || id === '') return

        const client = contract(wallet.getClient(), true)
        let res = await client.getToken(id)
        await setPrice(res.token.price)
        await setImage(getImageUrl(id))
        let res2 = await client.getToken(id)
        if (res2.token) {
          setOwner(res2.token.owner)
        }
      } catch (err) {
        console.log(err)
      }
    }
    setId(location.pathname.slice(9, location.pathname.length))
    getPrice()
  }, [id, location.pathname, wallet])

  const buyOnClick = async () => {
    try {
      if (!wallet.initialized || !contract) return
      if (owner !== '' && wallet.address === owner) {
        showNotification(props.enqueueSnackbar, 'Transaction Failed ', 'Already yours', 'error')
      } else {
        const client = cw20DRGN(wallet.getClient())
        const txHash = await client.buyFromMarket(wallet.address, id, price, true)

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
    <Grid container direction={'row'} spacing={{ xs: 2, md: 10 }} className={classes.pageContainer}>
      <Grid item xs={12} md={5}>
        <Box className={classes.goldBox4}>
          <img src={image} alt="Egg Svg" width={'100%'} height={'auto'} />
        </Box>
      </Grid>

      <Grid item xs={12} md={5}>
        <Typography className={classes.h4}>Mysterious Dragon Egg</Typography>
        <Box display={'flex'} marginY={5}>
          <Typography className={classes.h5Grey}>Price:</Typography>
          <Typography className={classes.h5} marginX={2}>
            {price + ' DRGN'}
          </Typography>
        </Box>

        <CustomOutlinedButton
          title="Buy Now"
          styles={{
            width: { xs: '140px', md: '12vw' },
            padding: 2,
            background: COLORS.DARK_YELLOW_1,
          }}
          img={BuyIcon}
          onClick={() => buyOnClick()}
        />
      </Grid>
    </Grid>
  )
}

export default withSnackbar(BuyEgg)
