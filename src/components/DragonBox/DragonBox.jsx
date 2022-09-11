import React from 'react'
import { Box } from '@mui/material'

import PurpleDragon from 'assets/market/LegendaryDragon.png'
import EpicDragon from 'assets/market/EpicDragon.png'
import RareDragon from 'assets/market/RareDragon.png'
import UncommonDragon from 'assets/market/UncommonDragon.png'
import CommonDragon from 'assets/market/CommonDragon.png'
import useStyles from 'styles'

const DragonBox = ({ dragonType, styles }) => {
  const classes = useStyles()

  let background
  let width
  let img

  if (dragonType) {
    switch (dragonType) {
      case 'uncommon':
        background = '#279D51'
        width = '50%'
        img = UncommonDragon
        break
      case 'rare':
        background = '#1764C0'
        width = '68%'
        img = RareDragon

        break
      case 'epic':
        background = '#8F3C74'
        width = '86%'
        img = EpicDragon

        break
      case 'legendary':
        background = '#D75D2A'
        width = '100%'
        img = PurpleDragon

        break
      default:
        background = '#72736D'
        width = '40%'
        img = CommonDragon
    }
  } else {
    background = '#72736D'
    width = '40%'
    img = CommonDragon
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
        <img src={img} alt="dragon img" height={'auto'} width={'100%'} />
      </Box>
    </Box>
  )
}

export default DragonBox
