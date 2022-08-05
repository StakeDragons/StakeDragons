import React from 'react'
import { useLocation } from 'react-router'

// Util
import HomeHeader from './HomeHeader'
import AppHeader from './AppHeader'

const Header = ({ children }) => {
  const location = useLocation()

  return <>{location.pathname === '/' ? <HomeHeader /> : <AppHeader children={children} />}</>
}

export default Header
