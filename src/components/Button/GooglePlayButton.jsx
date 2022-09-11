import React from 'react'
import useStyles from './styles.js'
import GooglePlaySvg from 'assets/googleplay.svg'

const GooglePlayButton = () => {
  const classes = useStyles()

  return (
    <a
    href="https://play.google.com/store/apps/details?id=com.PurpleBlueLab.StakeDragons"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img className={classes.root} src={GooglePlaySvg} alt="googleplay" />
  </a>
  )
}

export default GooglePlayButton
