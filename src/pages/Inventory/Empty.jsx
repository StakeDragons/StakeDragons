import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import * as COLORS from 'util/ColorUtils'
import useStyles from 'styles'

const Empty = () => {
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
            <Typography className={classes.h2}>
              There are no eggs or dragons in your wallet.
            </Typography>
            <Typography className={classes.h2}>You can get eggs from the</Typography>
            <Typography className={classes.h2}>
              <a href="/eggsale" style={{ color: COLORS.GOLD }}>
                Genesis Eggsale
              </a>
              {' or '}
              <a href="/market" style={{ color: COLORS.GOLD }}>
                Marketplace
              </a>{' '}
              pages.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Empty
