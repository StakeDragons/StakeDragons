import { makeStyles } from '@mui/styles'

export default makeStyles(() => ({
  video: {
    display: 'block',
    objectFit: 'cover',
    width: '100vw',
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: -9999,
  },
}))
