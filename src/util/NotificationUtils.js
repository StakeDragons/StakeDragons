import React from 'react'
import { Stack, Typography, Zoom, Link } from '@mui/material'
import success from 'assets/success.svg'
import error from 'assets/error.svg'
import spinner from 'assets/spinner.gif'
import * as COLORS from 'util/ColorUtils'

export const classes = {
  success: {
    icon: success,
    border: `3px solid ${COLORS.SUCCESS}`,
    color: `${COLORS.SUCCESS}`,
  },
  error: {
    icon: error,
    border: `3px solid ${COLORS.FAILED}`,
    color: `${COLORS.FAILED}`,
  },
  warning: {
    icon: spinner,
    border: `3px solid ${COLORS.WARNING}`,
    color: `${COLORS.WARNING}`,
  },
}

export const showNotification = (func, title, subTitle, variant, link) => {
  func(
    <Stack spacing={variant !== 'warning' ? 2 : 0.25} ml={2} sx={{ alignItems: 'center' }}>
      <Stack direction={'row'} spacing={2} sx={{ alignItems: 'center' }}>
        <img src={classes[variant].icon} alt={variant} />
        <Typography sx={{ fontSize: '16px', fontWeight: '500', lineHeight: '19px' }}>
          {title}
        </Typography>
      </Stack>
      {link ? (
        <Link
          href={link}
          target="_blank"
          sx={{ textDecoration: 'none !important', color: classes[variant].color }}
        >
          <Typography
            sx={{ fontSize: '12px', fontWeight: '400', lineHeight: '15px', textAlign: 'center' }}
          >
            {subTitle}
          </Typography>{' '}
        </Link>
      ) : (
        <Typography
          sx={{ fontSize: '12px', fontWeight: '400', lineHeight: '15px', textAlign: 'center' }}
        >
          {subTitle}
        </Typography>
      )}
    </Stack>,
    {
      variant,
      TransitionComponent: Zoom,
      sx: {
        '& .SnackbarContent-root': {
          width: '278px',
          height: '72px',
          background: 'transparent',
          borderRadius: '4px',
          ...classes[variant],
        },
        '& .SnackbarItem-message': {
          margin: 'auto',
          padding: 0,
        },
      },
    },
  )
}
