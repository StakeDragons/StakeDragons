import React from 'react'
import { Box } from '@mui/material'
import useStyles from 'styles'

const EggBox = ({ styles, img }) => {
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
      <img src={img} alt="Egg Svg" style={{ maxWidth: '300px' }} />
    </Box>
  )
}

export default EggBox
