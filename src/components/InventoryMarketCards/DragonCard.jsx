import React from 'react'
import { Box, Grid, ListItem, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

import { CustomOutlinedButton } from 'components/Button'
import * as COLORS from 'util/ColorUtils'
import { DRAGON_TYPE_NAMES } from 'util/constants'

const DragonCard = (props) => {
  const { item } = props
  let background
  let width

  if (item.type) {
    switch (DRAGON_TYPE_NAMES[item.type].name) {
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
  } else {
    background = '#72736D'
    width = '40%'
  }
  return (
    <Grid item xs={12} md={4}>
      <Box sx={{ border: `1px solid ${COLORS.SMOOTH_YELLOW_30}`, borderRadius: '4px' }}>
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
          src={item.image}
          alt="dragon img"
          height={'150px'}
          width={'100%'}
          style={{ marginTop: '60px', marginBottom: '60px' }}
        />
        <Grid container marginX={4}>
          <Grid item xs={6}>
            {item.type && (
              <Typography sx={{ color: COLORS.SECONDARY_TEXT_GREY }}>
                {DRAGON_TYPE_NAMES[item.type].name}
              </Typography>
            )}
          </Grid>
          <Grid item xs={6}>
            <Typography sx={{ color: COLORS.SECONDARY_TEXT_GREY }}>Price</Typography>
          </Grid>
        </Grid>
        <Grid container margin={4}>
          <Grid item xs={6}>
            <Typography sx={{ color: COLORS.WHITE }}>{item.name}</Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography sx={{ color: COLORS.DARK_YELLOW_1 }}>{item.price} DRGN</Typography>
          </Grid>
        </Grid>
        <Grid container margin={4}>
          <Grid item xs={3.7}>
            <Typography sx={{ color: COLORS.SECONDARY_TEXT_GREY }}>{item.id}</Typography>
          </Grid>
          <Grid item xs={7}>
            <ListItem component={Link} to={item.type ? '/buy-dragon' : '/buy-egg'}>
              <CustomOutlinedButton
                title="Buy"
                styles={{ background: COLORS.DARK_YELLOW_1, padding: 1 }}
              />
            </ListItem>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  )
}

export default DragonCard
