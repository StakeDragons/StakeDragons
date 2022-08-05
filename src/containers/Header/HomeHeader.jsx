import React, { useState } from 'react'

import { Button, Stack, IconButton, Box, Typography, Drawer, useMediaQuery } from '@mui/material'

import { useTheme } from '@mui/material/styles'
import MoreVertIcon from '@mui/icons-material/MoreVert'

// Components
import { Logo } from 'components/Logo'

// Util
import * as COLORS from 'util/ColorUtils'
import RenderSocialLinks from './SocailLinks'

const HomeHeader = () => {
  const [showSidebar, setShowSidebar] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const DragonpaperButton = (
    <Button
      variant="text"
      href="https://stake-dragons.gitbook.io/stakedragons/"
      target="_SEJ"
      rel="noreferrer"
      sx={{
        textTransform: 'none',
        fontSize: { lg: '20px', md: '15px', xs: '32px' },
        color: COLORS.WHITE,
      }}
    >
      Dragonpaper
    </Button>
  )

  const renderAppNavigationBar = () => (
    <Stack
      direction={isMobile ? 'column' : 'row'}
      justifyContent="flex-start"
      alignItems="center"
      spacing={isMobile ? 2 : 8}
      mt={isMobile && 4}
    >
      <Box>{DragonpaperButton}</Box>

      <Box>
        <Button
          variant="text"
          href="/app"
          sx={{
            textTransform: 'none',
            fontSize: { lg: '20px', md: '15px', xs: '32px' },
            color: COLORS.WHITE,
            whiteSpace: 'nowrap',
          }}
        >
          Enter App
        </Button>
      </Box>
    </Stack>
  )

  const renderSidebar = () => {
    return (
      <>
        <IconButton aria-label="more" id="sidebar-button" onClick={() => setShowSidebar(true)}>
          <MoreVertIcon />
        </IconButton>
        <Drawer
          anchor="right"
          open={showSidebar}
          onClose={() => setShowSidebar(!showSidebar)}
          sx={{
            '& .MuiDrawer-paper': {
              background: 'transparent',
              padding: '20px',
            },
          }}
        >
          {DragonpaperButton}
          <RenderSocialLinks />
        </Drawer>
      </>
    )
  }

  return (
    <Box pt={7} px={isMobile ? 4 : 7}>
      <Stack
        direction="row"
        justifyContent={isMobile ? 'space-between' : 'flex-start'}
        alignItems="center"
        spacing={!isMobile ? 8 : 0}
      >
        <Box sx={!isMobile && { marginRight: 6 }}>
          <Logo isMobileView={isMobile} />
        </Box>
        {!isMobile && (
          <>
            {renderAppNavigationBar()} <Box sx={{ display: 'flex', flex: 1 }} />
            <RenderSocialLinks />
          </>
        )}
        {isMobile && (
          <>
            <Typography sx={{ color: 'white', fontSize: '28px' }}>Stake Dragons</Typography>
            {renderSidebar()}
          </>
        )}
      </Stack>
    </Box>
  )
}

export default HomeHeader
