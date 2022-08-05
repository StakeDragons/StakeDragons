import React from 'react'
import useStyles from './styles.js'
import GooglePlaySvg from 'assets/googleplay.svg'

const GooglePlayButton = () => {
  const classes = useStyles()

  return (
    // Just an image for now since the url will be provided later.
    <img className={classes.root} src={GooglePlaySvg} alt="googleplay" />
  )
}

export default GooglePlayButton
