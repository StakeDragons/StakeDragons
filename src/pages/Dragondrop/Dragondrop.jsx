import React from 'react'

import { Grid, Stack, Typography, Box } from '@mui/material'
import { CustomOutlinedButton } from 'components/Button'
import { AppStoreButton, GooglePlayButton } from 'components/Button'
import useStyles from 'styles'
import { withSnackbar } from 'notistack'

import whitelistContract from 'contracts/whitelist'
import { useWallet } from 'contexts/wallet'
import { useContracts } from 'contexts/contract'

import RenderSocialLinks from 'util/SocailLinks'
import { showNotification } from 'util/NotificationUtils'
import arrowDown from 'assets/drawer/arrowdown.svg'
import logo from 'assets/logo.svg'

const Dragondrop = (props) => {
  const classes = useStyles()
  const wallet = useWallet()
  const contract = useContracts().eggMint
  const minterContract = useContracts().minter

  //MAINNET MINTER
  const MINTER = 'juno1jjksuu26kfhrjqmh9h60ksewk0zarp08xfk23n76ggrg8anzv07qw20jqr'

  const claimDragon = async () => {
    try {
      if (!wallet || !contract) return
      const minterClient = minterContract.use(MINTER)

      const client = whitelistContract(wallet.getClient())
      let isMember = await client.isMember(wallet.address)
      if (!isMember) {
        showNotification(
          props.enqueueSnackbar,
          'Claim Failed ',
          'Not eligible for dragondrop',
          'error',
        )
      } else {
        let res = await client.getTokens(wallet.address)
        if (res && res.length !== 0) {
          showNotification(props.enqueueSnackbar, 'Claim Failed ', 'Already Claimed', 'error')
        } else {
          const txHash = await minterClient.dragonDrop(wallet.address)
          showNotification(
            props.enqueueSnackbar,
            'Transaction Successful ',
            'Click here for TX',
            'success',
            `https://www.mintscan.io/juno/txs/${txHash}`,
          )
        }
        await whitelistQuery()
      }
    } catch (err) {
      console.log(err)
      showNotification(props.enqueueSnackbar, 'Transaction Failed ', 'Click here for TX', 'error')
    }
  }

  const whitelistQuery = async () => {
    try {
      if (!wallet || !whitelistContract) return
      const client = whitelistContract(wallet.getClient())

      await client.getWhitelistInfo()
      await client.getAllTokens()
      await client.getTokens(wallet.address)
      await client.getMembers()
    } catch (err) {
      console.log(err)
    }
  }

  //   const addMember = async () => {
  //     try {
  //       if (!wallet || !whitelistContract) return
  //       const client = whitelistContract(wallet.getClient())
  //       await whitelistQuery()
  //       var add = []
  //       await client.addWhitelistMember(wallet.address, [
  //         'juno1hk2d8s5vlawdu2vg6z95g8ashqs6ecx0ud808x',
  //       ])

  //       await whitelistQuery()
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   }

  return (
    <Grid container className={classes.pageContainer} spacing={4}>
      <Grid item xs={12} md={4}>
        <Box sx={{ marginY: { xs: 5, lg: 0 } }}>
          <Box className={classes.goldBox4} p={2} sx={{ maxWidth: { xs: '100%', md: '20vw' } }}>
            <img src={logo} alt="logo" width={'100%'} height={'200px'} />
          </Box>
          <Box
            display={'flex'}
            marginTop={8}
            marginBottom={8}
            justifyContent={'center'}
            sx={{ maxWidth: { xs: '100%', md: '20vw' } }}
          >
            <img src={arrowDown} alt="arrowdown" width={'80px'} height={'80px'} />
            <img src={arrowDown} alt="arrowdown" width={'80px'} height={'80px'} />
            <img src={arrowDown} alt="arrowdown" width={'80px'} height={'80px'} />
          </Box>

          <CustomOutlinedButton
            title="Claim Your Dragondrop"
            styles={{
              width: { xs: '100%', md: '20vw' },
              marginY: { xs: 2, lg: 4 },
              paddingY: '10px',
            }}
            onClick={claimDragon}
          />
        </Box>
      </Grid>
      <Grid item xs={12} lg={5}>
        <Box className={classes.goldBox4} textAlign="center">
          <Typography className={classes.h5} marginY={4}>
            Once You Claim{' '}
          </Typography>
          <Typography className={classes.h3} marginY={4}>
            You can download and check out the game
          </Typography>

          <Stack
            direction="row"
            justifyContent="center"
            marginY={4}
            spacing={3}
            style={{ marginTop: '81px' }}
          >
            <GooglePlayButton />

            <AppStoreButton />
          </Stack>

          <Typography className={classes.h3} marginTop={16}>
            For further information
          </Typography>
          <Box sx={{ width: '100%', justifyContent: 'center', display: 'flex' }} marginY={2}>
            <RenderSocialLinks />
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default withSnackbar(Dragondrop)
