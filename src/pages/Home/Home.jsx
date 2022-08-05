import React from 'react'
import { Typography, Box, Stack, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import BgVideo from 'assets/movie_001.mp4'
import useStyles from './styles.js'
import * as COLORS from 'util/ColorUtils'

const Home = () => {
  const classes = useStyles()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <>
      <video className={classes.video} autoPlay loop muted playsInline>
        <source src={BgVideo} type="video/mp4" />
      </video>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'end',
          mx: '10px',
          height: '100%',
          marginBottom: '72px',
        }}
      >
        <Box sx={{ width: '100%', textAlign: 'center' }}>
          <Stack spacing={3}>
            <Typography
              sx={{
                fontSize: { lg: '30px', md: '20px' },
                fontWeight: 'bold',
                color: COLORS.WHITE,
              }}
            >
              Where blockchain-integrated dragons meet mobile phones.
            </Typography>
            <Typography
              sx={{
                fontSize: { lg: '24px', md: '15px' },
                fontWeight: '300',
                color: COLORS.WHITE,
              }}
              visibility={!isMobile || 'hidden'}
            >
              Enjoy flying freely on your mobile phone with your Cosmos-Juno blockchain-empowered
              dragon.
            </Typography>
            <Typography
              sx={{
                fontSize: { lg: '24px', md: '15px' },
                fontWeight: '300',
                color: COLORS.WHITE,
              }}
              visibility={!isMobile || 'hidden'}
            >
              Increase your DRGN staking income by acquiring more unique dragons.
            </Typography>
          </Stack>
        </Box>
      </Box>
    </>
  )
}

export default Home
