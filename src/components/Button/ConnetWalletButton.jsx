import React, { useEffect, useState } from 'react'
import { Button, Box, Typography, ListItem } from '@mui/material'
import { withSnackbar } from 'notistack'

import { useWallet } from 'contexts/wallet'
import { useKeplr } from 'services/keplr'
import { AddressPipe, walletBalancePipe } from 'util/Pipes'
import { showNotification } from 'util/NotificationUtils'

import walletImg from 'assets/drawer/wallet.svg'
import copy from 'assets/drawer/copy.svg'
import logout from 'assets/drawer/logout.svg'
import useStyles from 'styles'

const ConnectWalletButton = (props) => {
  const wallet = useWallet()
  const keplr = useKeplr()
  const classes = useStyles()

  const [junoBalance, setJunoBalance] = useState(0)

  const copyWalletAddress = () => {
    navigator.clipboard.writeText(wallet.address)
    showNotification(
      props.enqueueSnackbar,
      'Wallet Address Copied ',
      wallet.address + '',
      'success',
    )
  }

  useEffect(() => {
    if (wallet.initialized) {
      let balances = wallet.balance
      if (balances !== []) {
        balances.forEach((item) => {
          if (item.denom === 'ujuno') {
            setJunoBalance(Number(item.amount / 1000000))
          }
        })
      }
    }
  }, [wallet])

  return wallet.initialized ? (
    <Box
      className={classes.connectWalletBox}
      sx={{
        padding: '15px 10px',
        width: '90%',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography className={classes.body1Grey}>{wallet.name}</Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '30%',
            marginTop: '5px',
          }}
        >
          <ListItem onClick={copyWalletAddress} sx={{ padding: '0', cursor: 'pointer' }}>
            <img src={copy} alt="logo" width="16px" height="16px" />
          </ListItem>
          <ListItem onClick={() => keplr.disconnect()} sx={{ padding: '0', cursor: 'pointer' }}>
            <img src={logout} alt="logo" width="16px" height="16px" />
          </ListItem>
        </Box>
      </Box>
      <Typography textAlign={'left'}>{AddressPipe(wallet.address)}</Typography>
      <Typography textAlign={'left'}>
        {walletBalancePipe(junoBalance) + ' Juno / x.xx DRGN'}
      </Typography>
    </Box>
  ) : (
    <Button
      variant="outlined"
      className={classes.connectWalletBox}
      sx={{
        padding: '1.2rem 2.4rem',
      }}
      onClick={() => keplr.connect()}
    >
      <Box display="flex " alignItems="center">
        <Box marginRight={3}>
          <img src={walletImg} alt="logo" width="36px" height="36px" />
        </Box>
        <Typography textAlign={'left'} fontSize={'20px'}>
          Connect Wallet
        </Typography>
      </Box>
    </Button>
  )
}

export default withSnackbar(ConnectWalletButton)
