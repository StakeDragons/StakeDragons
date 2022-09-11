import React, { useEffect, useState } from 'react'
import { Grid, Typography, Stack } from '@mui/material'
import { withSnackbar } from 'notistack'
import useStyles from 'styles'

import { CustomOutlinedButton } from 'components/Button'
import { CustomOutlinedLabel } from 'components/Label'

import { useWallet } from 'contexts/wallet'
import { useContracts } from 'contexts/contract'
import OfflineQuery from 'contracts/egg-mint/offlineQuery.js'
import { showNotification } from 'util/NotificationUtils'
import { FormatDoubleValue } from 'util/FormatNumber'
import { DenomPipe } from 'util/Pipes'
import EggGIF from 'assets/eggs.gif.mp4'

//import StakeReward from 'contracts/stake-reward/contract'
//import Cw20DRGN from 'contracts/cw20-drgn'

const Eggsale = (props) => {
  const classes = useStyles()
  const wallet = useWallet()
  const minterContract = useContracts().minter

  const [totalSize, setTotalSize] = useState(0)
  const [ownedSize, setOwnedSize] = useState(0)
  const [price, setPrice] = useState(0)
  const [refresh, setRefresh] = useState(false)

  const MINTER = process.env.REACT_APP_MINTER_CONTRACT_ADDRESS

  //   const allowanceTest = async () => {
  //     try {
  //       const client = Cw20DRGN(wallet.getClient())

  //       let res = await client.increaseAllowance(
  //         wallet.address,
  //         process.env.REACT_APP_STAKE_REWARD_CONTRACT_ADDRESS,
  //         '10000000',
  //       )
  //       console.log(res)
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   }

  //   const sendRewardDrgnTest = async () => {
  //     try {
  //       const client = StakeReward(wallet.getClient())
  //       console.log(client)
  //       let res = await client.sendRewardDrgn(
  //         wallet.address,
  //         'juno1w2t2ttlyf3yk09mtr7vh7eucvgagmmdh3hc62u',
  //         '300000',
  //       )
  //       console.log(res)
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   }

  //     const instantiateStakeReward = async () => {
  //       const initMsg = {
  //         admin: wallet.address,
  //         dragon_contract: process.env.REACT_APP_DRAGON_CONTRACT_ADDRESS,
  //         cw20_contract: process.env.REACT_APP_CW20_CONTRACT_ADDRESS,
  //       }

  //       try {
  //         const result = await wallet
  //           .getClient()
  //           .instantiate(wallet.address, 884, initMsg, 'label', 'auto')
  //         console.log('stake reward contract address -> ', result)
  //         return {
  //           contractAddress: result.contractAddress,
  //           transactionHash: result.transactionHash,
  //         }
  //       } catch (err) {
  //         console.error(err)
  //       }
  //     }

  //   eslint-disable-next-line
  //     const instantiateDragonMarket = async () => {
  //       const initMsg = {
  //         admin: wallet.address,
  //         nft_addr: process.env.REACT_APP_DRAGON_CONTRACT_ADDRESS,
  //         allowed_cw20: process.env.REACT_APP_CW20_CONTRACT_ADDRESS,
  //         fee_percentage: '0.05',
  //         collector_addr: wallet.address,
  //       }

  //       try {
  //         const result = await wallet
  //           .getClient()
  //           .instantiate(wallet.address, 883, initMsg, 'label', 'auto')
  //         console.log('DRAGON market contract address -> ', result)
  //         return {
  //           contractAddress: result.contractAddress,
  //           transactionHash: result.transactionHash,
  //         }
  //       } catch (err) {
  //         console.error(err)
  //       }
  //     }

  const mint = async () => {
    try {
      if (!wallet.initialized || !minterContract) return

      const minterClient = minterContract.use(MINTER)

      const txHash = await minterClient.mintEgg(wallet.address, price)

      showNotification(
        props.enqueueSnackbar,
        'Transaction Successful ',
        'Click here for TX',
        'success',
        `https://www.mintscan.io/juno/txs/${txHash}`,
      )

      await setRefresh(true)
      wallet.refreshBalance()
    } catch (err) {
      console.log(err)
      showNotification(props.enqueueSnackbar, 'Transaction Failed ', 'Click here for TX', 'error')
    }
  }

  useEffect(() => {
    const offline = async () => {
      try {
        const res = await OfflineQuery()
        setPrice(res.base_price)
        setTotalSize(res.size)
        setOwnedSize(res.owned_eggsale)
      } catch (e) {}
    }
    const query = async () => {
      try {
        let minterClient = minterContract?.use(MINTER)
        let res = await minterClient.getEggsaleInfo()
        setPrice(res.base_price)
        setTotalSize(res.size)
        setOwnedSize(res.owned_eggsale)
        setRefresh(false)
      } catch (e) {}
    }
    if (wallet.initialized && minterContract) {
      query()
    } else {
      offline()
    }
  }, [wallet, refresh, minterContract, MINTER])

  return (
    <Grid container className={classes.pageContainer}>
      <Grid item xs={12} md={4} sx={{ marginX: { xs: 0, md: 5 } }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: '100%',
            height: 'auto',
          }}
          className={classes.goldBox4}
        >
          <source src={EggGIF} type="video/mp4" />
        </video>
      </Grid>

      <Grid
        item
        xs={12}
        md={7}
        className={classes.goldBox4}
        sx={{
          justifyContent: 'center',
          height: 'auto',
        }}
      >
        <Grid
          container
          sx={{ width: '100%', display: 'flex', justifyContent: 'space-around', paddingTop: 4 }}
        >
          <CustomOutlinedLabel
            title="Number of Eggs"
            amount={totalSize}
            styles={{ width: '150px' }}
          />

          <CustomOutlinedLabel
            title="Purchase Percent"
            amount={!ownedSize ? 0 : FormatDoubleValue((ownedSize / totalSize) * 100)}
            unit="%"
            styles={{ width: '150px' }}
          />

          <CustomOutlinedLabel
            title="Price"
            amount={!price ? 0 : DenomPipe(price)}
            unit="Juno"
            styles={{ width: '150px' }}
          />
        </Grid>

        <Stack direction="column" sx={{ alignItems: 'center' }} marginTop={{ xs: 4, md: 14 }}>
          <Typography className={classes.h3}>Enter World Here</Typography>
          <CustomOutlinedButton
            title="Mint"
            onClick={mint}
            styles={{ width: '12vw', marginY: { xs: 2, lg: 4 }, paddingY: '10px' }}
          />
        </Stack>
      </Grid>
    </Grid>
  )
}

export default withSnackbar(Eggsale)
