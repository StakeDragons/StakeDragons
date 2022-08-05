import React from 'react'
import { Box } from '@mui/material'
import EggSvg from 'assets/egg.svg'
import useStyles from 'styles'

const EggBox = ({ styles }) => {
  const classes = useStyles()

  return (
    <Box
      className={classes.goldBox4}
      sx={{
        display: 'flex',
        placeContent: 'center',
        ...styles,
      }}
    >
      <img src={EggSvg} alt="Egg Svg" style={{ maxWidth: '300px' }} />
    </Box>
  )
}

export default EggBox
