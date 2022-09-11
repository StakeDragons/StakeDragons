import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import useStyles from 'styles'

const NoDragon = () => {
  const classes = useStyles()
  return (
    <Grid container className={classes.pageContainer}>
      <Grid item xs={12} sx={{ textAlign: '-webkit-center' }}>
        <Grid item xs={12} lg={8}>
          <Box
            className={classes.goldBox4}
            sx={{
              paddingY: { xs: 0, lg: 8 },
              paddingX: { xs: 0, lg: 16 },
            }}
          >
            <Typography className={classes.h2}>There are no dragons in your wallet.</Typography>
            <Typography className={classes.h2}>
              You must have at least one dragon to use the
            </Typography>
            <Typography className={classes.h2}>Dragon Staking feature.</Typography>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default NoDragon
