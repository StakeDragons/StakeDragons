import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { Logo } from 'components/Logo'
import useStyles from 'styles'

const AppHome = () => {
  const classes = useStyles()

  return (
    <Box className={[classes.pageContainer, classes.displayFlex]}>
      <Grid item>
        <Logo />
      </Grid>
      <Grid item marginTop={'3rem'}>
        <Typography className={classes.h1} sx={{ fontSize: '40px' }}>
          Stake Dragons
        </Typography>
      </Grid>
    </Box>
  )
}

export default AppHome
