import React from 'react'
import { Box } from '@mui/material'

import BlueDragon from 'assets/market/dragon-3.svg'
import useStyles from 'styles'

const DragonBox = ({ dragonType, styles }) => {
  const classes = useStyles()
  let background
  let width

  if (dragonType) {
    switch (dragonType) {
      case 'uncommon':
        background = '#279D51'
        width = '50%'
        break
      case 'rare':
        background = '#1764C0'
        width = '68%'

        break
      case 'epic':
        background = '#8F3C74'
        width = '86%'

        break
      case 'legendary':
        background = '#D75D2A'
        width = '100%'

        break
      default:
        background = '#72736D'
    }
  } else {
    background = '#72736D'
    width = '40%'
  }

  return (
    <Box className={classes.goldBox4}>
      <Box
        sx={{
          background: `${background}`,
          borderRadius: '3px',
          width: `${width}`,
          height: '11px',
          marginTop: '-4px',
          marginLeft: '-4px',
          borderImageSlice: 1,
          border: '1px solid',
          borderImage: 'linear-gradient(90deg,#624B2C 0%, #E6E1C1 100%) 1',
        }}
      ></Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          ...styles,
        }}
      >
        <img src={BlueDragon} alt="egg img" height={'auto'} width={'100%'} />
      </Box>
    </Box>
  )
}

export default DragonBox
