import React, { useEffect, useState } from 'react'
import { Box, Grid, ListItem, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

import { CustomOutlinedButton } from 'components/Button'
import * as COLORS from 'util/ColorUtils'

const EggCard = (props) => {
  const { item } = props

  const [displayId, setDisplayId] = useState('')

  useEffect(() => {
    if (item.id) {
      let id = '#' + item.id.slice(item.id.length - 5, item.id.length)
      setDisplayId(id)
    }
  }, [item.id])

  return (
    <Box
      sx={{
        border: `1px solid ${COLORS.SMOOTH_YELLOW_30}`,
        borderRadius: '4px',
        cursor: 'pointer',
        width: '90%',
        height: '510px',
      }}
    >
      <img
        src={item.image}
        alt="egg img"
        height={'300px'}
        width={'100%'}
        style={{ marginBottom: '11px' }}
      />
      <Grid container marginX={4}>
        <Grid item xs={6}></Grid>
        <Grid item xs={6}>
          <Typography sx={{ color: COLORS.SECONDARY_TEXT_GREY, fontWeight: 'bold' }}>
            Price
          </Typography>
        </Grid>
      </Grid>
      <Grid container margin={4}>
        <Grid item xs={6}>
          <Typography sx={{ color: COLORS.WHITE }}>Dragon Egg</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography sx={{ color: COLORS.DARK_YELLOW_1 }}>
            {item.price ? item.price : '00 '} DRGN
          </Typography>
        </Grid>
      </Grid>
      <Grid container margin={4}>
        <Grid item xs={3.7}>
          <Typography sx={{ color: COLORS.SECONDARY_TEXT_GREY }}>{displayId}</Typography>
        </Grid>
        <Grid item xs={7}>
          <ListItem component={Link} to={'/buy-egg/' + item.id} sx={{ paddingTop: '0px' }}>
            <CustomOutlinedButton
              title="Buy"
              styles={{ background: COLORS.DARK_YELLOW_1, padding: 1 }}
            />
          </ListItem>
        </Grid>
      </Grid>
    </Box>
  )
}

export default EggCard
