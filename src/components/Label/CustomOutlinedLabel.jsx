import React from 'react'
import { Box, Typography } from '@mui/material'

import useStyles from 'styles'

const CustomOutlinedLabel = ({ title, amount, unit, styles }) => {
  const classes = useStyles()

  return (
    <Box
      className={classes.goldBox1}
      sx={{
        padding: '10px',
        ...styles,
      }}
    >
      <Typography className={classes.body1Grey}>{title}:</Typography>
      <Typography className={classes.body1}>
        {amount} {unit}
      </Typography>
    </Box>
  )
}

export default CustomOutlinedLabel
