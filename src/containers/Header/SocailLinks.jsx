import React from 'react'

import { AiOutlineTwitter, AiOutlineGithub } from 'react-icons/ai'
import { FaTelegramPlane, FaDiscord } from 'react-icons/fa'

import { Stack, IconButton, Link, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

// Util
import * as COLORS from 'util/ColorUtils'

const RenderSocialLinks = (drawer) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const linkStyles = { color: COLORS.WHITE, fontSize: 32 }
  const socialLinks = [
    { icon: <AiOutlineTwitter style={linkStyles} />, to: 'https://twitter.com/stakedragons' },
    { icon: <FaDiscord style={linkStyles} />, to: 'https://discord.gg/ehmsvgK6Tz' },
    { icon: <FaTelegramPlane style={linkStyles} />, to: 'https://t.me/stakedragons' },
    {
      icon: <AiOutlineGithub style={linkStyles} />,
      to: 'https://github.com/StakeDragons/StakeDragons',
    },
  ]

  return (
    <Stack
      spacing={drawer ? 2 : isMobile ? 2 : 7}
      direction="row"
      justifyContent={isMobile && 'center'}
    >
      {socialLinks.map((link, idx) =>
        link.to ? (
          <IconButton
            key={idx}
            color="inherit"
            style={{ textTransform: 'none', color: COLORS.WHITE, p: 0 }}
          >
            <Link href={link.to} target="_blank">
              {link.icon}
            </Link>
          </IconButton>
        ) : (
          <IconButton
            key={idx}
            color="inherit"
            style={{ textTransform: 'none', color: COLORS.WHITE, p: 0 }}
          >
            <Link href={link.to} target="_blank">
              {link.icon}
            </Link>
          </IconButton>
        ),
      )}
    </Stack>
  )
}

export default RenderSocialLinks
