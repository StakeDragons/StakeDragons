import React from 'react'
import { Box, Stack, Typography } from '@mui/material'
import * as COLORS from 'util/ColorUtils'

const Eggdrop = () => {
  return (
    <Stack sx={{ position: 'relative', height: '250px', margin: '200px 240px' }}>
      {/* Draw Four Corners */}
      <Box
        sx={{
          position: 'absolute',
          border: `4px solid ${COLORS.GOLD}`,
          width: '32px',
          height: '32px',
          left: 0,
          top: 0,
          borderRight: 'none',
          borderBottom: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          border: `4px solid ${COLORS.GOLD}`,
          width: '32px',
          height: '32px',
          right: 0,
          top: 0,
          borderLeft: 'none',
          borderBottom: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          border: `4px solid ${COLORS.GOLD}`,
          width: '32px',
          height: '32px',
          left: 0,
          bottom: 0,
          borderRight: 'none',
          borderTop: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          border: `4px solid ${COLORS.GOLD}`,
          width: '32px',
          height: '32px',
          right: 0,
          bottom: 0,
          borderLeft: 'none',
          borderTop: 'none',
        }}
      />
      {/* -------------- */}

      <Stack direction="column" margin="auto" textAlign="center">
        <Typography
          sx={{
            fontSize: { lg: '32px', md: '20px', xs: '15px' },
            color: COLORS.GOLD,
          }}
        >
          Your Wallet address is not in the snapshot list.
        </Typography>
        <Typography
          sx={{
            fontSize: { lg: '32px', md: '20px', xs: '15px' },
            color: COLORS.GOLD,
          }}
        >
          This means you are not eligible for the Stake Dragons Eggdrop.
        </Typography>
        <Typography
          sx={{
            fontSize: { lg: '32px', md: '20px', xs: '15px' },
            color: COLORS.GOLD,
          }}
        >
          The snapshot date is 29 March 2022 - Juno Lupercalia Update.
        </Typography>
      </Stack>
    </Stack>
  )
}

export default Eggdrop
