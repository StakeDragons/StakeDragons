import React, { useState, useEffect } from 'react'
import { Box, Grid, Typography } from '@mui/material'

import * as COLORS from 'util/ColorUtils'

const InventoryEgg = (props) => {
  const { id, img, onClick, price } = props

  const [displayId, setDisplayId] = useState('')

  useEffect(() => {
    if (id) {
      let item_id = '#' + id.slice(id.length - 5, id.length)
      setDisplayId(item_id)
    }
  }, [id])

  return (
    <Box
      sx={{
        border: `1px solid ${COLORS.SMOOTH_YELLOW_30}`,
        borderRadius: '4px',
        cursor: 'pointer',
        height: '410px',
      }}
      onClick={onClick}
    >
      <img src={img} alt="egg img" height={'271px'} width={'100%'} />
      <Grid container margin={2}>
        <Grid item xs={6}></Grid>
        <Grid item xs={6} sx={{ height: '24px' }}>
          {price !== '0' && (
            <Grid item xs={6}>
              <Typography sx={{ color: COLORS.SECONDARY_TEXT_GREY }}>Price</Typography>
            </Grid>
          )}
        </Grid>
      </Grid>

      <Grid container margin={2}>
        <Grid item xs={6}>
          <Typography sx={{ color: COLORS.WHITE }}>{'Dragon Egg'}</Typography>
        </Grid>
        {price !== '0' && (
          <Grid item xs={5}>
            <Typography sx={{ color: COLORS.DARK_YELLOW_1 }}>{price} DRGN</Typography>
          </Grid>
        )}
      </Grid>

      <Grid container margin={2}>
        <Grid item xs={6}>
          <Typography sx={{ color: COLORS.SECONDARY_TEXT_GREY }}>{displayId}</Typography>
        </Grid>
        <Grid item xs={5}></Grid>
      </Grid>
    </Box>
  )
}

export default InventoryEgg
