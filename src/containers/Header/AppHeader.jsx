import React, { useState, useEffect, useRef } from 'react'
import { useLocation, Link } from 'react-router-dom'

import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import {
  Stack,
  useMediaQuery,
  Tooltip,
  AppBar,
  Slide,
  Typography,
  List,
  Box,
  Fade,
} from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'

// Components
import { Logo } from 'components/Logo'
import { ConnectWalletButton } from 'components/Button'
import Disclaimer from 'components/Disclaimer'

// Util
import * as COLORS from 'util/ColorUtils'
import { walletBalancePipe } from 'util/Pipes'
import { useWallet } from 'contexts/wallet'
import { useKeplr } from 'services/keplr'
import useStyles from 'styles'

//Assets
import drgn from 'assets/drawer/drgn-coin.svg'
import hamburger from 'assets/drawer/hamburger.svg'
import hamburgerClose from 'assets/drawer/hamburger-close.svg'
import walletBtn from 'assets/drawer/wallet.svg'
import walletConnectedBtn from 'assets/drawer/wallet-connected.svg'
import arrowDown from 'assets/drawer/arrowdown.svg'
import arrowDownSelected from 'assets/drawer/arrowdown-selected.svg'
import { DRAWER_ITEMS } from './DrawerLinks'

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 2),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

export default function AppHeader(props) {
  const classes = useStyles()
  const theme = useTheme()
  const location = useLocation()
  const wallet = useWallet()
  const keplr = useKeplr()

  const [drawerOpen, setDrawerOpen] = useState(JSON.parse(localStorage.getItem('is-open')) || false)
  const [closed, setClosed] = useState(!drawerOpen)
  const [junoBalance, setJunoBalance] = useState(0)

  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const containerRef = useRef(null)

  var drawerWidth = drawerOpen ? 360 : 260

  useEffect(() => {
    localStorage.setItem('is-open', JSON.stringify(drawerOpen))
  }, [drawerOpen])

  const [shouldShowInformativeDialog, setShouldShowInformativeDialog] = useState('false')

  useEffect(() => {
    setShouldShowInformativeDialog(
      typeof window !== 'undefined' && localStorage.getItem('shouldShowInformativeDialog'),
    )
  }, [])

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

  const handleAcceptInformativeDialog = () => {
    localStorage.setItem('shouldShowInformativeDialog', 'false')
    setShouldShowInformativeDialog('false')
  }

  useEffect(() => {
    if (isMobile) {
      setClosed(true)
      setDrawerOpen(false)
    }
  }, [isMobile])

  const openDrawer = (
    <Box
      sx={{
        width: drawerWidth,
        paddingTop: 20,
        borderRight: `2px solid ${COLORS.DARK_YELLOW_1}`,
        background: 'linear-gradient(180deg, rgba(52, 52, 52, 0) -13.06%, #343434 100%)',
      }}
      ref={containerRef}
    >
      <List
        className={classes.displayFlex}
        sx={{
          justifyContent: 'space-around',
          marginLeft: 4.5,
          height: '100% ',
        }}
      >
        <div>
          {DRAWER_ITEMS.map((item, key) => {
            return (
              <ListItem
                key={key}
                component={Link}
                to={item.link}
                sx={{
                  '&:hover': {
                    textDecoration: 'none',
                  },
                  maxWidth: '250px',
                }}
              >
                <ListItemButton
                  sx={{
                    border:
                      location.pathname === item.link + ''
                        ? `3px solid ${COLORS.DARK_YELLOW_1}`
                        : 'none',
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: 3,
                      justifyContent: 'center',
                    }}
                  >
                    <Box>
                      <img
                        src={location.pathname === item.link + '' ? item.selected : item.image}
                        alt="logo"
                        width="36px"
                        height="36px"
                      />
                      {item.link === '/dragondrop' && (
                        <Box display={'flex'} marginTop={0.5}>
                          <img
                            src={
                              location.pathname === '/dragondrop' ? arrowDownSelected : arrowDown
                            }
                            alt="arrowdown"
                            width={'12px'}
                            height={'12px'}
                          />
                          <img
                            src={
                              location.pathname === '/dragondrop' ? arrowDownSelected : arrowDown
                            }
                            alt="arrowdown"
                            width={'12px'}
                            height={'12px'}
                          />

                          <img
                            src={
                              location.pathname === '/dragondrop' ? arrowDownSelected : arrowDown
                            }
                            alt="arrowdown"
                            width={'12px'}
                            height={'12px'}
                          />
                        </Box>
                      )}
                    </Box>
                  </ListItemIcon>
                  <ListItemText primary={item.text} sx={{ color: COLORS.WHITE }} />
                </ListItemButton>
              </ListItem>
            )
          })}
        </div>
        <div>
          <ListItem sx={{ display: 'flex', marginLeft: -1 }}>
            <a href={'https://junoswap.com/'} target="_blank" rel="noopener noreferrer">
              <img src={drgn} alt="logo" width="96px" height="96px" />
            </a>
            <ListItemText primary={'DRGN'} sx={{ color: COLORS.WHITE }} />
            <ListItemText primary={'$x.xx'} sx={{ color: COLORS.WHITE }} />
          </ListItem>
          <Box marginLeft={2}>
            <ConnectWalletButton />
          </Box>
        </div>
      </List>
    </Box>
  )
  const closedDrawer = (
    <Box
      marginLeft={{ xs: 0.5, lg: 3.5 }}
      sx={{ width: { xs: '120px', sm: '260px' }, marginTop: 17 }}
    >
      <List
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          height: '100% ',
        }}
      >
        <div>
          {DRAWER_ITEMS.map((item, key) => {
            return (
              <Tooltip
                placement="right"
                key={key}
                title={
                  <Typography variant="subtitle1" component="h2" px={1}>
                    {item.text}
                  </Typography>
                }
              >
                <ListItem component={Link} to={item.link} sx={{ maxWidth: '120px' }}>
                  <ListItemButton>
                    <Box
                      sx={{
                        border:
                          location.pathname === item.link + ''
                            ? `1px solid ${COLORS.DARK_YELLOW_1}`
                            : 'none',
                        borderRadius: '4px',
                        background: COLORS.GREY_30,
                      }}
                      p={2}
                    >
                      {location.pathname === item.link + '' ? (
                        <img src={item.selected} alt="logo" width="100%" height="24px" />
                      ) : (
                        <img src={item.image} alt="logo" width="24px" height="24px" />
                      )}
                      {item.link === '/dragondrop' && (
                        <Box display={'flex'} marginTop={0.5}>
                          <img
                            src={
                              location.pathname === '/dragondrop' ? arrowDownSelected : arrowDown
                            }
                            alt="arrowdown"
                            width={'8px'}
                            height={'8px'}
                          />
                          <img
                            src={
                              location.pathname === '/dragondrop' ? arrowDownSelected : arrowDown
                            }
                            alt="arrowdown"
                            width={'8px'}
                            height={'8px'}
                          />

                          <img
                            src={
                              location.pathname === '/dragondrop' ? arrowDownSelected : arrowDown
                            }
                            alt="arrowdown"
                            width={'8px'}
                            height={'8px'}
                          />
                        </Box>
                      )}
                    </Box>
                  </ListItemButton>
                </ListItem>
              </Tooltip>
            )
          })}
        </div>
        <div>
          <ListItem sx={{ marginLeft: '0.2rem' }}>
            <IconButton>
              <Tooltip
                placement="right"
                title={
                  <Box sx={{ display: 'flex' }}>
                    <Typography variant="subtitle1" component="h2" px={1}>
                      DRGN
                    </Typography>
                    <Typography variant="subtitle1" component="h2" px={1}>
                      $ x.xx
                    </Typography>
                  </Box>
                }
              >
                <a href={'https://junoswap.com/'} target="_blank" rel="noopener noreferrer">
                  <img src={drgn} alt="logo" width="72px" height="72px" />
                </a>
              </Tooltip>
            </IconButton>
          </ListItem>

          <ListItem
            sx={{ marginLeft: '0.5rem' }}
            onClick={() => (wallet.initialized ? keplr.disconnect() : keplr.connect())}
          >
            <Tooltip
              placement="right"
              title={
                wallet.initialized ? (
                  <Box sx={{ display: 'flex', background: COLORS.GREY_30 }}>
                    <Typography variant="subtitle1" component="h2" sx={{ color: COLORS.GOLD }}>
                      {walletBalancePipe(junoBalance) + ' Juno / x.xx DRGN'}
                    </Typography>
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex' }} p={1}>
                    <Typography variant="subtitle1" component="h2">
                      Connect Wallet
                    </Typography>
                  </Box>
                )
              }
            >
              <IconButton>
                <Box
                  sx={{
                    borderRadius: '4px',
                    background: wallet.initialized ? COLORS.SMOOTH_YELLOW_30 : COLORS.GREY_30,
                    display: 'flex',
                    height: '57px',
                    width: '57px',
                    placeContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {wallet.initialized ? (
                    <img src={walletConnectedBtn} alt="logo" width="24px" height="24px" />
                  ) : (
                    <img src={walletBtn} alt="logo" width="24px" height="24px" />
                  )}
                </Box>
              </IconButton>
            </Tooltip>
          </ListItem>
        </div>
      </List>
    </Box>
  )

  const handleDrawerToggle = () => {
    if (isMobile) return
    setDrawerOpen(!drawerOpen)
    setClosed(!closed)
  }

  return (
    <Box sx={{ display: 'flex', height: '100%', overflow: 'auto' }}>
      <AppBar
        sx={{
          ' &.MuiAppBar-colorPrimary': {
            backgroundColor: COLORS.DARK_BLACK_1,
          },
        }}
      >
        <Box
          py={3}
          px={isMobile ? 4 : 7}
          sx={{ borderBottom: `2px solid ${COLORS.DARK_YELLOW_1}` }}
        >
          <Stack direction="row" justifyContent={'space-between'} alignItems="center">
            <Box>
              <IconButton
                onClick={handleDrawerToggle}
                sx={{
                  marginRight: 5,
                }}
              >
                {shouldShowInformativeDialog && (
                  <>
                    {!isMobile && drawerOpen ? (
                      <img src={hamburgerClose} alt="logo" width="48px" height="48px" />
                    ) : (
                      <img src={hamburger} alt="logo" width="48px" height="48px" />
                    )}
                  </>
                )}
              </IconButton>
              {!shouldShowInformativeDialog && location.pathname === '/app' && (
                <Logo isMobileView={isMobile} />
              )}
              {location.pathname !== '/app' && <Logo isMobileView={isMobile} />}
            </Box>

            {!shouldShowInformativeDialog && location.pathname === '/app' ? (
              <Box sx={{ width: '100%', textAlign: 'center' }}>
                <Typography sx={{ fontSize: { xs: '24px', lg: '40px' } }} className={classes.h1}>
                  Stake Dragons
                </Typography>
              </Box>
            ) : (
              <Box sx={{ width: `calc(100% - ${drawerWidth}px)`, textAlign: 'center' }}>
                {location.pathname !== '/app' && (
                  <Typography sx={{ fontSize: { xs: '24px', lg: '40px' } }} className={classes.h1}>
                    Stake Dragons
                  </Typography>
                )}
              </Box>
            )}
          </Stack>
        </Box>
      </AppBar>

      {!shouldShowInformativeDialog && (
        <Disclaimer onAcceptInformativeDialog={handleAcceptInformativeDialog} />
      )}

      {shouldShowInformativeDialog === 'false' && (
        <>
          {isMobile || closed ? (
            <Fade in={closed} timeout={1000}>
              {closedDrawer}
            </Fade>
          ) : (
            <Slide
              direction="right"
              in={drawerOpen}
              container={containerRef.current}
              unmountOnExit
              timeout={1000}
            >
              {openDrawer}
            </Slide>
          )}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              overflow: 'auto',
              p: 3,
              width: `calc(100% - ${drawerWidth}px)`,
            }}
          >
            <DrawerHeader />
            {props.children}
          </Box>
        </>
      )}
    </Box>
  )
}
