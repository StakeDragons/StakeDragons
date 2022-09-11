import React from 'react'
import { Box, Stack, Grid, Typography } from '@mui/material'

import useStyles from 'styles'

const DayCountDown = (props) => {
  const { title, grey, day, textStyles } = props
  const classes = useStyles()

  return (
    <Grid item sx={{ height: '100%' }}>
      <Box
        className={grey ? classes.greyBox1 : classes.goldBox1}
        py={2}
        px={2}
        sx={{ height: '100%' }}
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          sx={{ height: '100%' }}
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <Typography className={classes.h3Grey} sx={{ ...textStyles }}>
            {title}
          </Typography>
          <Typography className={classes.h3} sx={{ ...textStyles }}>
            {day} Days
          </Typography>
        </Stack>
      </Box>
    </Grid>
  )
}

export default DayCountDown
