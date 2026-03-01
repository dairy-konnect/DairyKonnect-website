import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' })
    document.body.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])

  return null
}

export default ScrollToTop
