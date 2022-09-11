import React, { useEffect, useState } from 'react'
import { Box, Stack, Grid } from '@mui/material'
import { withSnackbar } from 'notistack'

import { CustomOutlinedButton } from 'components/Button'
import { CustomOutlinedLabel } from 'components/Label'
import EggBox from 'components/EggBox'

import { showNotification } from 'util/NotificationUtils'
import { useWallet } from 'contexts/wallet'
import { useContracts } from 'contexts/contract'
import cw20DRGN from 'contracts/cw20-drgn'
import useStyles from 'styles'
import { getImageUrl } from 'util/ImageUrl'
import { DenomPipe } from 'util/Pipes'
import Empty from '../Inventory/Empty'

const Hatching = (props) => {
  const classes = useStyles()
  const wallet = useWallet()
  const contract = useContracts().eggMint
  const minterContract = useContracts().minter

  const EGG_CONTRACT_ADDRESS = process.env.REACT_APP_EGG_CONTRACT_ADDRESS
  const MINTER_CONTRACT_ADDRESS = process.env.REACT_APP_MINTER_CONTRACT_ADDRESS

  const [ownedList, setOwnedList] = useState([])
  const [selectedItem, setSelectedItem] = useState('')
  const [selectedImage, setSelectedImage] = useState(getImageUrl('8'))
  const [hatchPrice, setHatchPrice] = useState('0')
  const [error, setError] = useState(false)
  const [display, setDisplay] = useState(false)
  const [refresh, setRefresh] = useState(false)

  const delay = () => {
    setTimeout(() => {
      setDisplay(true)
    }, 1000)
  }

  useEffect(() => {
    const getHatchPrice = async () => {
      try {
        const minterClient = minterContract.use(MINTER_CONTRACT_ADDRESS)
        let res = await minterClient.getState()
        setHatchPrice(res.hatch_price)
      } catch (e) {}
    }

    if (minterContract) {
      getHatchPrice()
    }
  }, [minterContract, MINTER_CONTRACT_ADDRESS])

  useEffect(() => {
    const queryUserEggs = async () => {
      try {
        const client = contract?.use(EGG_CONTRACT_ADDRESS)
        const res = await client.getTokens(wallet.address, null, 30)
        await setOwnedList(res)
        await setSelectedItem(res[res.length - 1])
        await setSelectedImage(getImageUrl(selectedItem))
        await setRefresh(false)
      } catch (e) {}
    }
    if (wallet.initialized && contract) {
      queryUserEggs()
    } else {
      setOwnedList([])
      setSelectedItem('')
      setSelectedImage(getImageUrl('9'))
    }
  }, [wallet, contract, selectedItem, EGG_CONTRACT_ADDRESS, refresh])

  useEffect(() => {
    delay()
    setError(!wallet.initialized)

    if (ownedList.length === 0) {
      setError(true)
    } else {
      setError(false)
    }
  }, [ownedList, error, wallet, refresh])

  const hatch = async () => {
    try {
      if (!wallet || !contract || ownedList.length === 0) return

      var txHash
      // eslint-disable-next-line
      if (hatchPrice == 0) {
        const minterClient = minterContract.use(MINTER_CONTRACT_ADDRESS)
        txHash = await minterClient.hatchEggFree(wallet.address, selectedItem)
      } else {
        const client = cw20DRGN(wallet.getClient())
        txHash = await client.send(wallet.address, hatchPrice, selectedItem)
      }

      showNotification(
        props.enqueueSnackbar,
        'Transaction Successful ',
        'Click here for TX',
        'success',
        `https://www.mintscan.io/juno/txs/${txHash}`,
      )

      wallet.refreshBalance()
      await setRefresh(true)
    } catch (err) {
      showNotification(props.enqueueSnackbar, 'Transaction Failed ', 'Click here for TX', 'error')
    }
  }

  if (error) {
    return display && <Empty />
  } else {
    return (
      <Grid container justifyContent="center" alignItems="center" sx={{ height: '100%' }}>
        <EggBox styles={{ height: '30vh', width: 'auto', maxWidth: 'auto' }} img={selectedImage} />
        <Grid item xs={12} sx={{ textAlign: '-webkit-center' }}>
          <Grid item xs={12} lg={8} xl={6}>
            <Box className={classes.goldBox4} p={{ xs: '3vh', lg: '6vh' }}>
              <Stack direction="row" justifyContent="space-around">
                <CustomOutlinedLabel
                  title="Number of My Egg(s)"
                  amount={ownedList.length}
                  styles={{ width: '185px', textAlign: 'left' }}
                />

                <CustomOutlinedLabel
                  title="Hatch Price"
                  amount={hatchPrice === 0 ? hatchPrice : DenomPipe(hatchPrice)}
                  unit="DRGN"
                  styles={{ width: '185px', textAlign: 'left' }}
                />
              </Stack>
              <Stack
                direction="column"
                sx={{ alignItems: 'center' }}
                marginTop={{ xs: '4vh', lg: '8vh' }}
              >
                <CustomOutlinedButton
                  title="Hatch"
                  styles={{ width: '12vw', paddingY: '10px' }}
                  onClick={hatch}
                />
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default withSnackbar(Hatching)
