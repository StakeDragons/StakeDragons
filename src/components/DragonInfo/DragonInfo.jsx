import React from 'react'
import { Box, Grid, Typography } from '@mui/material'

import { CustomOutlinedLabel } from 'components/Label'
//import { CountDown } from 'components/Countdown'
import useStyles from 'styles'
import { DayCountDown } from '../Countdown'
import { DRAGON_TYPE_NAMES } from '../../util/constants'

const DragonInfo = (props) => {
  const { item } = props
  const classes = useStyles()
  var rarity
  if (item) {
    switch (item.kind) {
      case 'uncommon':
        rarity = 2
        break
      case 'rare':
        rarity = 3
        break
      case 'epic':
        rarity = 4
        break
      case 'legendary':
        rarity = 5
        break
      default:
        rarity = 1
    }
  }

  return (
    <Box className={classes.goldBox4} py={1} px={2}>
      <Typography className={classes.h2}>Dragon Info</Typography>
      <Grid container spacing={2} sx={{ marginTop: 5, width: '100%', gridAutoRows: '1fr' }}>
        <Grid item xs={6}>
          {item && (
            <CustomOutlinedLabel
              title="Rarity"
              amount={DRAGON_TYPE_NAMES[rarity - 1].name}
              styles={{ width: '100%', height: '100%', textTransform: 'capitalize' }}
            />
          )}
        </Grid>
        <Grid item xs={6}>
          {item && (
            <CustomOutlinedLabel
              title="Daily (DRGN) Reward Amount"
              amount={item.daily_income ? item.daily_income : '0'}
              unit="DRGN"
              styles={{ width: '100%', height: '100%' }}
            />
          )}
        </Grid>
      </Grid>
      {item ? (
        <Box
          sx={{
            marginY: 2,
            display: { lg: 'flex', xs: 'block' },
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Box marginRight={2}>
            <DayCountDown title={'Ovulation Period:'} day={item.ovulation_period} />
          </Box>
          <Box marginRight={2}>
            <DayCountDown title={'Unstake: '} day={14} />
          </Box>
        </Box>
      ) : (
        <Box sx={{ marginY: 2, display: { lg: 'flex', xs: 'block' }, justifyContent: 'center' }}>
          <Box marginRight={2}>
            <DayCountDown title={'Ovulation Period:'} day={60} />
          </Box>
          <Box marginRight={2}>
            <DayCountDown title={'Unstake: '} day={14} />
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default DragonInfo
