import React from 'react'
import { Box, Stack, Grid, Typography } from '@mui/material'

import useStyles from 'styles'

const DayCountDown = (props) => {
  const { title, grey, day } = props
  const classes = useStyles()

  return (
    <Grid item>
      <Box className={grey ? classes.greyBox1 : classes.goldBox1} py={2} px={2}>
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="center" spacing={1}>
          <Typography className={classes.h3Grey}>{title}</Typography>
          <Typography className={classes.h3}>{day}D : 0H : 0M</Typography>
        </Stack>
      </Box>
    </Grid>
  )
}

export default DayCountDown
