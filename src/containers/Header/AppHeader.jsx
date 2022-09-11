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
import { useTheme } from '@mui/material/styles'

// Components
import { Logo } from 'components/Logo'
import { ConnectWalletButton } from 'components/Button'
import Disclaimer from 'components/Disclaimer'

// Util
import * as COLORS from 'util/ColorUtils'
import { walletBalancePipe } from 'util/Pipes'
import { useWallet } from 'contexts/wallet'
import { useKeplr } from 'services/keplr'
import contract from 'contracts/marketplace/contract'
import useStyles from 'styles'
import Cw20DRGN from 'contracts/cw20-drgn'
import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'

//Assets
import drgn from 'assets/drawer/drgn-coin.png'
import hamburger from 'assets/drawer/hamburger.svg'
import hamburgerClose from 'assets/drawer/hamburger-close.svg'
import walletBtn from 'assets/drawer/wallet.svg'
import walletConnectedBtn from 'assets/drawer/wallet-connected.svg'
import arrowDown from 'assets/drawer/arrowdown.svg'
import arrowDownSelected from 'assets/drawer/arrowdown-selected.svg'
import bgOuter from 'assets/bg2.png'
import bg from 'assets/bg.png'
import title from 'assets/title1.png'
import { DRAWER_ITEMS } from './DrawerLinks'
import ArrowRight from 'assets/market/arrow-right.svg'
import ArrowDown from 'assets/market/arrow-down.svg'
import { DRAGON_TYPE_NAMES } from 'util/constants'
import { DenomPipe } from '../../util/Pipes'

export default function AppHeader(props) {
  const classes = useStyles()
  const theme = useTheme()
  const location = useLocation()
  const wallet = useWallet()
  const keplr = useKeplr()

  const [drawerOpen, setDrawerOpen] = useState(JSON.parse(localStorage.getItem('is-open')) || false)
  const [closed, setClosed] = useState(!drawerOpen)
  const [isMobileHeight, setIsMobileHeight] = useState(window.innerHeight < 800)
  const [junoBalance, setJunoBalance] = useState(0)
  const [drgnBalance, setDrgnBalance] = useState(0)
  const [drgnToJuno, setDrgnToJuno] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [initLoad, setInitLoad] = useState(true)

  const [floorPricesOpen, setFloorPricesOpen] = useState(false)
  const [floorPrices, setFloorPrices] = useState([])

  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const containerRef = useRef(null)

  var drawerWidth = drawerOpen ? 360 : 260
  var drawerHeight = isMobile || isMobileHeight ? 120 : 150

  useEffect(() => {
    localStorage.setItem('is-open', JSON.stringify(drawerOpen))

    function handleResize() {
      setIsMobileHeight(window.innerHeight < 850)
    }

    window.addEventListener('resize', handleResize)
  }, [drawerOpen])

  const [shouldShowInformativeDialog, setShouldShowInformativeDialog] = useState('false')

  useEffect(() => {
    setShouldShowInformativeDialog(
      typeof window !== 'undefined' && localStorage.getItem('shouldShowInformativeDialog'),
    )
  }, [])

  useEffect(() => {
    const loadDrgnBalanceInfo = async () => {
      if (wallet.initialized) {
        try {
          let balances = wallet.balance
          if (balances !== []) {
            balances.forEach((item) => {
              if (item.denom === 'ujuno') {
                setJunoBalance(Number(item.amount / 1000000))
              }
              if (item.denom === 'DRGN') {
                setDrgnBalance(Number(item.amount))
              }
            })
          }
          const client = Cw20DRGN(wallet.getClient())
          let drgnJuno = await client.getDrgnJunoPoolInfo()
          setDrgnToJuno(drgnJuno)
        } catch (e) {}
      }
    }

    loadDrgnBalanceInfo()
  }, [wallet])

  useEffect(() => {
    const loadFloorPrices = async () => {
      try {
        if (contract) {
          let client
          if (wallet.initialized) {
            client = contract(wallet.getClient(), false)
          } else {
            let offline = await CosmWasmClient.connect('https://rpc.juno-1.deuslabs.fi')
            client = contract(offline, false)
          }

          setInitLoad(false)
          //const egg_client = contract(wallet.getClient(), true)
          let res = await client.getFloorPrices()
          let prices = []
          for (var key in res) {
            prices.push(res[key])
          }
          // let res2 = await egg_client.getTokensByPriceDesc(5, '0')
          // if (res2 && res2.tokens.length > 0) {
          //   prices.push(res2.tokens[0].price)
          // }
          setFloorPrices(prices)
        }
      } catch (e) {}
    }

    if (initLoad || seconds === 0) {
      loadFloorPrices()
    }
    const interval = setInterval(() => {
      setSeconds((seconds) => (seconds + 1) % 20)
    }, 1000)
    return () => clearInterval(interval)
  }, [wallet, seconds, initLoad])

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
        paddingTop: isMobileHeight ? `${drawerHeight}px` : 20,
        borderRight: `2px solid ${COLORS.DARK_YELLOW_1}`,
        background: 'linear-gradient(180deg, rgba(52, 52, 52, 0) -13.06%, #343434 100%)',
      }}
      ref={containerRef}
    >
      <List
        className={classes.displayFlex}
        sx={{
          justifyContent: 'space-around',
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
                  paddingTop: isMobileHeight ? '0px !important' : '4px',
                  paddingBottom: isMobileHeight ? '0px !important' : '4px',
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
              <img src={drgn} alt="logo" width="60px" height="60px" style={{ margin: '10px' }} />{' '}
            </a>
            <ListItemText primary={'1 $DRGN'} sx={{ color: COLORS.WHITE }} />
            <ListItemText primary={'='} sx={{ color: COLORS.WHITE }} />
            <ListItemText
              primary={walletBalancePipe(drgnToJuno) + ' JUNO'}
              sx={{ color: COLORS.WHITE }}
            />
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
      sx={{
        width: { xs: '120px', sm: '260px' },
        paddingTop: `${drawerHeight}px`,
      }}
    >
      <List
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
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
                <ListItem
                  component={Link}
                  to={item.link}
                  sx={{
                    maxWidth: '120px',
                    paddingTop: '0px',
                    paddingBottom: '0px',
                  }}
                >
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
                      p={isMobileHeight ? 1 : 2}
                    >
                      {location.pathname === item.link + '' ? (
                        <img
                          src={item.selected}
                          alt="logo"
                          width={isMobileHeight ? '20px' : '24px'}
                          height={isMobileHeight ? '20px' : '24px'}
                        />
                      ) : (
                        <img
                          src={item.image}
                          alt="logo"
                          width={isMobileHeight ? '20px' : '24px'}
                          height={isMobileHeight ? '20px' : '24px'}
                        />
                      )}
                      {item.link === '/dragondrop' && !isMobileHeight && (
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
          <ListItem
            sx={{
              marginLeft: '0.2rem',
              paddingTop: '0px !important',
              paddingBottom: '0px !important',
            }}
          >
            <IconButton>
              <Tooltip
                placement="right"
                title={
                  <Box sx={{ display: 'flex' }}>
                    <Typography variant="subtitle1" component="h2" px={1}>
                      1 $DRGN
                    </Typography>
                    <Typography variant="subtitle1" component="h2" px={1}>
                      =
                    </Typography>
                    <Typography variant="subtitle1" component="h2" px={1}>
                      {walletBalancePipe(drgnToJuno) + ' JUNO'}
                    </Typography>
                  </Box>
                }
              >
                <a href={'https://junoswap.com/'} target="_blank" rel="noopener noreferrer">
                  <img
                    src={drgn}
                    alt="logo"
                    width={isMobileHeight ? '36px' : '48px'}
                    height={isMobileHeight ? '36px' : '48px'}
                    style={{ marginLeft: '0.6rem' }}
                  />
                </a>
              </Tooltip>
            </IconButton>
          </ListItem>

          <ListItem
            sx={{
              marginLeft: '0.5rem',
              paddingTop: isMobileHeight ? '0px !important' : '8px',
              paddingBottom: isMobileHeight ? '0px !important' : '8px',
            }}
            onClick={() => (wallet.initialized ? keplr.disconnect() : keplr.connect())}
          >
            <Tooltip
              placement="right"
              title={
                wallet.initialized ? (
                  <Box sx={{ display: 'flex', background: COLORS.GREY_30 }}>
                    <Typography variant="subtitle1" component="h2" sx={{ color: COLORS.GOLD }}>
                      {walletBalancePipe(junoBalance) +
                        ' Juno / ' +
                        walletBalancePipe(drgnBalance) +
                        ' DRGN'}
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
                    height: isMobileHeight ? '50px' : '57px',
                    width: isMobileHeight ? '50px' : '57px',
                    placeContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {wallet.initialized ? (
                    <img
                      src={walletConnectedBtn}
                      alt="logo"
                      width={isMobileHeight ? '20px' : '24px'}
                      height={isMobileHeight ? '20px' : '24px'}
                    />
                  ) : (
                    <img
                      src={walletBtn}
                      alt="logo"
                      width={isMobileHeight ? '20px' : '24px'}
                      height={isMobileHeight ? '20px' : '24px'}
                    />
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
  const floorPricedDragonClicked = (kind) => {
    window.location.href = `/market?listType=dragon&kind=${kind}`
  }

  const floorPricedEggClicked = () => {
    window.location.href = `/market?listType=egg`
  }

  return (
    <Box sx={{ display: 'flex', height: '100%', overflow: 'auto' }}>
      <AppBar
        sx={{
          ' &.MuiAppBar-colorPrimary': {
            backgroundColor: COLORS.DARK_BLACK_1,
            backgroundImage: `url(${bgOuter})`,
            backgroundBlendMode: 'soft-light',
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
              {location.pathname !== '/app' && <Logo isMobileView={isMobile || isMobileHeight} />}
            </Box>

            {!shouldShowInformativeDialog && location.pathname === '/app' ? (
              <Box sx={{ width: '100%', textAlign: 'center' }}>
                <Typography sx={{ fontSize: { xs: '24px', lg: '40px' } }} className={classes.h1}>
                  Stake Dragons
                </Typography>
              </Box>
            ) : (
              <Box
                sx={{
                  width: { xs: `calc(100% - 170px)`, md: `calc(100% - ${drawerWidth + 320}px)` },
                  textAlign: 'center',
                }}
              >
                {location.pathname !== '/app' && (
                  <img src={title} alt="Stake Dragons" height="100px" width="auto" />
                )}
              </Box>
            )}
            <Tooltip
              TransitionComponent={Fade}
              componentsProps={{
                tooltip: {
                  sx: {
                    bgcolor: 'common.black',
                    '& .MuiTooltip-arrow': {
                      color: 'common.black',
                    },
                  },
                },
              }}
              onOpen={() => {
                setFloorPricesOpen(true)
              }}
              onClose={() => {
                setFloorPricesOpen(false)
              }}
              placement="bottom"
              title={
                <>
                  {floorPrices.map((item, idx) => {
                    return (
                      <Box
                        key={idx}
                        onClick={() =>
                          idx === 5
                            ? floorPricedEggClicked()
                            : floorPricedDragonClicked(DRAGON_TYPE_NAMES[idx].name)
                        }
                        sx={{
                          cursor: 'pointer',
                          transition: 'all',
                          transitionDuration: '300ms',
                          ':hover': { opacity: 0.5 },
                        }}
                      >
                        {idx === 5 ? (
                          <Typography
                            sx={{
                              color: COLORS.WHITE,
                              padding: 2,
                              textTransform: 'capitalize',
                            }}
                          >
                            {'Dragon Egg ' + floorPrices[5] + ' DRGN'}
                          </Typography>
                        ) : (
                          <Typography
                            sx={{
                              color: DRAGON_TYPE_NAMES[idx].color,
                              padding: 2,
                              textTransform: 'capitalize',
                              fontWeight: 'bold',
                            }}
                          >
                            {DRAGON_TYPE_NAMES[idx].name + ' ' + DenomPipe(item) + ' DRGN'}
                          </Typography>
                        )}
                      </Box>
                    )
                  })}
                </>
              }
            >
              <Box
                sx={{
                  width: '250px',
                }}
              >
                <Box
                  display={'flex'}
                  width="200px"
                  padding={'1rem'}
                  justifyContent="space-between"
                  sx={{
                    cursor: 'pointer',
                    color: 'white',
                    ':hover': { color: COLORS.DARK_YELLOW_1 },
                  }}
                >
                  <Box sx={{ textAlign: 'center', width: '90%' }}>
                    <Typography sx={{ size: 16, fontSize: "20px" }}>Marketplace </Typography>
                    <Typography sx={{ size: 16, fontSize: "20px" }}> Floor Price</Typography>
                  </Box>
                  {floorPricesOpen ? (
                    <img src={ArrowDown} alt="arrow" />
                  ) : (
                    <img src={ArrowRight} alt="arrow" />
                  )}
                </Box>
              </Box>
            </Tooltip>
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
              width: drawerOpen ? `calc(100% - 200px)` : '100%',
              marginTop: ` ${drawerHeight}px`,
              backgroundImage: `url(${bg})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              padding: 4,
            }}
          >
            {props.children}
          </Box>
        </>
      )}
    </Box>
  )
}
