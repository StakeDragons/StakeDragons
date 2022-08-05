import React from 'react'
import { Box, Grid, Typography } from '@mui/material'

import PurpleDragon from 'assets/market/dragon-2.svg'
import * as COLORS from 'util/ColorUtils'

const InventoryDragon = (props) => {
  const { item, onClick } = props
  let background
  let width

  switch (item.kind) {
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
      width = '40%'
  }

  return (
    <Grid item xs={12} md={5} margin={2}>
      <Box
        sx={{
          border: `1px solid ${COLORS.SMOOTH_YELLOW_30}`,
          borderRadius: '4px',
          cursor: 'pointer',
          background: item.is_staked
            ? 'linear-gradient(61.27deg, rgba(171, 137, 100, 0.3) 8.5%, rgba(196, 177, 134, 0.3) 96.2%)'
            : '',
        }}
        onClick={onClick}
      >
        <Box
          sx={{
            background: `${background}`,
            borderRadius: '3px',
            width: `${width}`,
            height: '11px',
            borderImageSlice: 1,
            border: '1px solid',
            borderImage: 'linear-gradient(90deg,#624B2C 0%, #E6E1C1 100%) 1',
          }}
        ></Box>
        <img
          src={PurpleDragon}
          alt="dragon img"
          height={'120px'}
          width={'100%'}
          style={{ marginTop: '30px', marginBottom: '30px' }}
        />
        <Grid container marginX={2}>
          <Grid item xs={6}>
            {item.kind && (
              <Typography sx={{ color: COLORS.SECONDARY_TEXT_GREY, textTransform: 'capitalize' }}>
                {item.kind}
              </Typography>
            )}
          </Grid>
        </Grid>
        <Grid container margin={2}>
          <Grid item xs={12}>
            <Typography sx={{ color: COLORS.WHITE }}>{'Purple Dragon'}</Typography>
          </Grid>
        </Grid>
        <Grid container margin={2}>
          <Grid item xs={3.7}>
            <Typography sx={{ color: COLORS.SECONDARY_TEXT_GREY }}>{'#0000' + item.id}</Typography>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  )
}

export default InventoryDragon
