import React from 'react'

import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'

import { CustomOutlinedButton } from 'components/Button'
import { paragraph1, paragraph2 } from './DisclaimerText'
import useStyles from 'styles'

const Disclaimer = ({ onAcceptInformativeDialog }) => {
  const classes = useStyles()
  const handleSubmit = () => {
    onAcceptInformativeDialog()
  }

  return (
    <Grid container marginTop={'120px'} justifyContent="center">
      <Grid item xs={12} lg={10}>
        <Box
          padding={8}
          sx={{
            background: 'linear-gradient(180deg, rgba(52, 52, 52, 0) 0%, #343434 100%)',
            borderRadius: '4px',
            marginBottom: '120px',
          }}
        >
          <Typography className={classes.disclaimerHeader} marginY={4}>
            Disclaimers
          </Typography>
          <Typography className={classes.disclaimerBody}>{paragraph1}</Typography>

          <Typography className={classes.disclaimerBody} marginTop={4}>
            Assumption of Risk
          </Typography>
          <Typography className={classes.disclaimerBody}>{paragraph2}</Typography>
          <Box width={'100%'} justifyContent="center" display="flex" marginTop={4}>
            <CustomOutlinedButton
              title="Continue"
              styles={{ width: '12vw', padding: '20px' }}
              onClick={handleSubmit}
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Disclaimer
