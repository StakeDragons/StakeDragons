import React from 'react'
import { Box, Typography, Grid } from '@mui/material'

import useStyles from 'styles'

const CustomOutlinedLabel = ({ title, amount, unit, styles, textStyles }) => {
  const classes = useStyles()

  return (
    <Box
      className={classes.goldBox1}
      sx={{
        padding: '10px',
        ...styles,
      }}
    >
      <Grid flexDirection={'column'}>
        <Typography className={classes.body1Grey} sx={{ ...textStyles }}>
          {title}
        </Typography>
        <Typography className={classes.body1} sx={{ ...textStyles }}>
          {amount} {unit}
        </Typography>
      </Grid>
    </Box>
  )
}

export default CustomOutlinedLabel
