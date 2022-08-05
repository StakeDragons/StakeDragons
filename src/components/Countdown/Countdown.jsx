import React from 'react'
import { Box, Stack, Grid, Typography } from '@mui/material'

import useStyles from 'styles'

const CountDown = (props) => {
  const { title, grey } = props
  const classes = useStyles()

  return (
    <Grid item>
      <Box className={grey ? classes.greyBox1 : classes.goldBox1} py={2} px={2}>
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="center" spacing={4}>
          <Typography className={classes.h3Grey}>{title}</Typography>
          <Typography className={classes.h3}>23 H : 59 M : 59 S</Typography>
        </Stack>
      </Box>
    </Grid>
  )
}

export default CountDown
