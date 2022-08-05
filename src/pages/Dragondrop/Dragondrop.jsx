import React from 'react'

import { Box } from '@mui/system'
import { withSnackbar } from 'notistack'
import useStyles from 'styles'

import { CustomOutlinedButton } from 'components/Button'
import whitelistContract from 'contracts/whitelist'
import { useWallet } from 'contexts/wallet'
import { useContracts } from 'contexts/contract'

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
          'Not eligible for dragondop',
          'error',
        )
      } else {
        let res = await client.getTokens(wallet.address)
        if (res && res.legth !== 0) {
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

  return (
    <Box
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      display="flex"
      sx={{ height: 'calc(100vh - 150px)' }}
    >
      <Box sx={{ height: '60%' }}>
        <Box className={classes.goldBox4} p={2}>
          <img src={logo} alt="logo" width={'100%'} height={'200px'} />
        </Box>
        <Box display={'flex'} marginTop={8} marginBottom={8} justifyContent={'center'}>
          <img src={arrowDown} alt="arrowdown" width={'80px'} height={'80px'} />
          <img src={arrowDown} alt="arrowdown" width={'80px'} height={'80px'} />
          <img src={arrowDown} alt="arrowdown" width={'80px'} height={'80px'} />
        </Box>

        <CustomOutlinedButton
          title="Claim Your Dragondrop"
          styles={{ width: { xs: '100%', md: '20vw' }, paddingY: 1 }}
          onClick={claimDragon}
        />
      </Box>
    </Box>
  )
}

export default withSnackbar(Dragondrop)
