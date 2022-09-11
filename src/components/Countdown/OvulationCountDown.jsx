import React from 'react'
import { Box, Stack, Grid, Typography } from '@mui/material'
import useStyles from 'styles'

const OvulationCountDown = (props) => {
  const { title, grey } = props
  const classes = useStyles()

  return (
    <Grid item>
      <Box className={grey ? classes.greyBox1 : classes.goldBox1} py={1} px={2}>
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" flexWrap="wrap">
          <Typography className={classes.h3Grey} sx={{ fontSize: '14px !important', paddingRight: "10px" }}>{title}</Typography>
          <Typography className={classes.h3} sx={{ fontSize: '14px !important' }}>{props.days} D : {props.hours} H : {props.minutes} M</Typography>
        </Stack>
      </Box>
    </Grid>
  )
}

export default OvulationCountDown
