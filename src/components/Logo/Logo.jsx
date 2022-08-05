import React from 'react'
import useStyles from './styles.js'
import logo from 'assets/logo.svg'
import { useHistory } from 'react-router-dom'

const Logo = ({ isMobileView = false }) => {
  const classes = useStyles()
  const history = useHistory()
  const size = isMobileView ? '60px' : '100px'

  return (
    <img
      className={classes.root}
      src={logo}
      alt="logo"
      onClick={() => history.push('/')}
      width={size}
      height={size}
    />
  )
}

export default Logo
