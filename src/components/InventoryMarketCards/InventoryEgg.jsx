import React from 'react'
import { Box, Grid, Typography } from '@mui/material'

import * as COLORS from 'util/ColorUtils'
import EggSvg from 'assets/egg.svg'

const InventoryEgg = (props) => {
  const { onClick } = props

  return (
    <Grid item xs={12} md={5} margin={2}>
      <Box
        sx={{
          border: `1px solid ${COLORS.SMOOTH_YELLOW_30}`,
          borderRadius: '4px',
          cursor: 'pointer',
        }}
        onClick={onClick}
      >
        <img
          src={EggSvg}
          alt="egg img"
          height={'140px'}
          width={'100%'}
          style={{ marginTop: '40px', marginBottom: '40px' }}
        />
        <Grid container margin={2}>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}>
            <Typography sx={{ color: COLORS.SECONDARY_TEXT_GREY }}>Price</Typography>
          </Grid>
        </Grid>

        <Grid container margin={2}>
          <Grid item xs={6}>
            <Typography sx={{ color: COLORS.WHITE }}>{'Dragon Egg'}</Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography sx={{ color: COLORS.DARK_YELLOW_1 }}>{'00'} DRGN</Typography>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  )
}

export default InventoryEgg
