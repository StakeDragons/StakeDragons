import React from 'react'
import { Box, Stack, Typography } from '@mui/material'

import { CustomOutlinedLabel } from 'components/Label'
//import { CountDown } from 'components/Countdown'
import useStyles from 'styles'
import { DayCountDown } from '../Countdown'

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
    <Box className={classes.goldBox4} py={2} px={2} marginTop={2}>
      <Typography className={classes.h2}>Dragon Info</Typography>
      <Stack direction="row" justifyContent="center" spacing={4} marginTop={5}>
        {item && <CustomOutlinedLabel title="Rarity" amount={rarity} styles={{ width: '250px' }} />}

        {item && (
          <CustomOutlinedLabel
            title="Daily (DRGN) Reward Amount"
            amount={item.daily_income}
            unit="DRGN"
            styles={{ width: '250px' }}
          />
        )}
      </Stack>

      {item ? (
        <Box
          sx={{
            marginY: 2,
            display: { lg: 'flex', xs: 'block' },
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Box marginX={2}>
            <DayCountDown title={'Ovulation Period:'} day={item.ovulation_period} />
          </Box>
          <Box marginX={2}>
            <DayCountDown title={'Unstake: '} day={14} />
          </Box>
        </Box>
      ) : (
        <Box sx={{ marginY: 2, display: { lg: 'flex', xs: 'block' }, justifyContent: 'center' }}>
          <Box marginX={2}>
            <DayCountDown title={'Ovulation Period:'} day={60} />
          </Box>
          <Box marginX={2}>
            <DayCountDown title={'Unstake: '} day={14} />
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default DragonInfo
