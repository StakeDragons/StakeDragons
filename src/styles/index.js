import { makeStyles } from '@mui/styles'
import * as COLORS from 'util/ColorUtils'

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
  pageContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  displayFlex: {
    display: 'flex',
    flexDirection: 'column',
  },
  h1: {
    fontWeight: '800',
    color: COLORS.WHITE,
    fontFamily: 'M PLUS Rounded 1c',
  },
  h2: {
    fontSize: '25px',
    fontWeight: '300',
    color: COLORS.WHITE,
    textAlign: 'center',
    fontFamily: 'M PLUS Rounded 1c',
  },
  h3: {
    color: COLORS.WHITE,
    fontSize: '20px',
    fontWeight: '400',
    textAlign: 'center',
    fontFamily: 'M PLUS Rounded 1c',
  },
  h3Grey: {
    color: COLORS.SECONDARY_TEXT_GREY,
    fontSize: '20px',
    fontWeight: '400',
    textAlign: 'center',
    fontFamily: 'M PLUS Rounded 1c',
  },
  h4: {
    fontSize: '30px',
    color: COLORS.WHITE,
    fontFamily: 'M PLUS Rounded 1c',
  },
  h5: {
    fontSize: '27px',
    color: COLORS.WHITE,
    fontFamily: 'M PLUS Rounded 1c',
  },
  h5Grey: {
    fontSize: '27px',
    color: COLORS.SECONDARY_TEXT_GREY,
    fontFamily: 'M PLUS Rounded 1c',
  },
  body1Grey: {
    fontSize: '16px',
    fontWeight: '400',
    color: COLORS.GREY_1,
  },
  body1: { fontSize: '16px', fontWeight: '500', color: COLORS.WHITE },
  disclaimerHeader: {
    fontFamily: 'Rounded Mplus 1c',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '31.25px',
    lineHeight: '46px',
    color: COLORS.WHITE,
    textAlign: 'left',
  },
  disclaimerBody: {
    fontFamily: 'Rounded Mplus 1c',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '25px',
    lineHeight: '37px',
    color: COLORS.WHITE,
    textAlign: 'left',
  },
  inventoryContainer: {
    height: '100%',
  },
  goldBox4: {
    border: `4px solid ${COLORS.SMOOTH_YELLOW_30}`,
    borderRadius: '4px',
  },
  goldBox2: {
    border: `2px solid ${COLORS.SMOOTH_YELLOW_30}`,
    borderRadius: '4px',
  },
  goldBox1: {
    border: `1px solid ${COLORS.SMOOTH_YELLOW_30}`,
    borderRadius: '4px',
  },
  greyBox1: {
    border: `1px solid ${COLORS.DISABLED_BUTTON}`,
    borderRadius: '4px',
  },
  connectWalletBox: {
    border: `2px solid ${COLORS.DARK_YELLOW_1}`,
    '&:hover': {
      borderWidth: '2px',
    },
    width: '17rem',
    borderRadius: '9px',
    color: COLORS.WHITE,
    fontSize: '20px',
    textTransform: 'none',
    lineHeight: '30px',
  },
  modalContainer: {
    position: 'absolute',
    left: '10%',
    overflow: 'scroll',
    height: '100%',
    display: 'block',
  },
  modalStyle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    border: '2px solid #000',
    boxShadow: 24,
    background: 'black',
  },
}))

//import useStyles from 'styles'
//const classes = useStyles()
