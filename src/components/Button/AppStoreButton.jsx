import React from 'react'
import useStyles from './styles.js'
import AppStoreSvg from 'assets/appstore.svg'

const AppStoreButton = () => {
  const classes = useStyles()

  return (
    // Just an image for now since the url will be provided later.
    <a
      href="https://apps.apple.com/tr/app/stake-dragons/id1632278384?l=tr"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img className={classes.root} src={AppStoreSvg} alt="appstore" />
    </a>
  )
}

export default AppStoreButton
