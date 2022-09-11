import React from 'react'
import { useHistory } from 'react-router-dom'
import { Box, Grid } from '@mui/material'
import useStyles from 'styles'

import title from 'assets/title2.png'
import logo from 'assets/logo.svg'

const AppHome = () => {
  const classes = useStyles()
  const history = useHistory()

  return (
    <Box className={[classes.pageContainer, classes.displayFlex]}>
      <Grid item>
        <img
          className={classes.root}
          src={logo}
          alt="logo"
          onClick={() => history.push('/')}
          width={'150px'}
          height={'150px'}
        />
      </Grid>
      <Grid item marginTop={'3rem'}>
        <img src={title} alt="Stake Dragons" height="250px" width="auto" />
      </Grid>
    </Box>
  )
}

export default AppHome
