import React from 'react'
import useStyles from './styles.js'
import AppStoreSvg from 'assets/appstore.svg'

const AppStoreButton = () => {
  const classes = useStyles()

  return (
    // Just an image for now since the url will be provided later.
    <img className={classes.root} src={AppStoreSvg} alt="appstore" />
  )
}

export default AppStoreButton
