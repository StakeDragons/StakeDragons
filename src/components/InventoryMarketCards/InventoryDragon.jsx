import React, { useState, useEffect } from 'react'
import { Box, Grid, Typography } from '@mui/material'

import PurpleDragon from 'assets/market/LegendaryDragon.png'
import EpicDragon from 'assets/market/EpicDragon.png'
import RareDragon from 'assets/market/RareDragon.png'
import UncommonDragon from 'assets/market/UncommonDragon.png'
import CommonDragon from 'assets/market/CommonDragon.png'
import * as COLORS from 'util/ColorUtils'
import { DenomPipe } from 'util/Pipes'
import { useContracts } from 'contexts/contract'

const InventoryDragon = (props) => {
  const { item, onClick, price } = props

  const [background, setBackground] = useState('#72736D')
  const [width, setWidth] = useState('40%')
  const [dragon, setDragon] = useState(null)
  const [displayId, setDisplayId] = useState('')
  const [dragonBackground, setDragonBackground] = useState('')

  const contract = useContracts().dragon
  const DRAGON_CONTRACT_ADDRESS = process.env.REACT_APP_DRAGON_CONTRACT_ADDRESS

  useEffect(() => {
    const retrieveDragon = async () => {
      const client = contract.use(DRAGON_CONTRACT_ADDRESS)
      const res = await client.retrieveUserDragons(item.token_id)
      if (res.is_staked) {
        setDragonBackground(
          'linear-gradient(61.27deg, rgba(171, 137, 100, 0.3) 8.5%, rgba(196, 177, 134, 0.3) 96.2%)',
        )
      } else {
        setDragonBackground('')
      }
    }
    if (item.token_id) {
      let length = item.token_id.toString().length

      let id = '#'
      if (length < 6) {
        let idLeadingZero = 5 - length
        for (let i = 0; i < idLeadingZero; i++) {
          id = id + '0'
        }
      }
      id = id + item.token_id.toString()
      setDisplayId(id)
      retrieveDragon()
    }
  }, [item, DRAGON_CONTRACT_ADDRESS, contract])

  useEffect(() => {
    if (item) {
      switch (item.kind) {
        case 'uncommon':
          setBackground('#279D51')
          setWidth('50%')
          setDragon(UncommonDragon)
          break
        case 'rare':
          setBackground('#1764C0')
          setWidth('68%')
          setDragon(RareDragon)
          break
        case 'epic':
          setBackground('#8F3C74')
          setWidth('86%')
          setDragon(EpicDragon)
          break
        case 'legendary':
          setBackground('#D75D2A')
          setWidth('100%')
          setDragon(PurpleDragon)
          break
        default:
          setBackground('#72736D')
          setWidth('40%')
          setDragon(CommonDragon)
      }
    }
  }, [item])

  return (
    <Box
      sx={{
        border: `1px solid ${COLORS.SMOOTH_YELLOW_30}`,
        borderRadius: '4px',
        cursor: 'pointer',
        background: dragonBackground,
        height: '410px',
        maxWidth: '275px',
      }}
      onClick={onClick}
    >
      <Box
        sx={{
          background: `${background}`,
          borderRadius: '3px',
          width: `${width}`,
          height: '11px',
          borderImageSlice: 1,
          border: '1px solid',
          borderImage: 'linear-gradient(90deg,#624B2C 0%, #E6E1C1 100%) 1',
        }}
      ></Box>
      <img
        src={dragon}
        alt="dragon img"
        height={props.imgHeight}
        width={'100%'}
        style={{ marginTop: '40px', marginBottom: '40px' }}
      />
      <Grid container margin={2}>
        <Grid item xs={6}>
          {item && item.kind && (
            <Typography sx={{ color: COLORS.SECONDARY_TEXT_GREY, textTransform: 'capitalize' }}>
              Rarity
            </Typography>
          )}
        </Grid>
        {price !== '0' && (
          <Grid item xs={6}>
            <Typography sx={{ color: COLORS.SECONDARY_TEXT_GREY }}>Price</Typography>
          </Grid>
        )}
      </Grid>
      <Grid container margin={2}>
        <Grid item xs={6}>
          {item && item.kind && (
            <Typography sx={{ color: COLORS.WHITE, textTransform: 'capitalize' }}>
              {item.kind} Dragon
            </Typography>
          )}
        </Grid>
        {price !== '0' && (
          <Grid item xs={5}>
            <Typography sx={{ color: COLORS.DARK_YELLOW_1 }}>{DenomPipe(price)} DRGN</Typography>
          </Grid>
        )}
      </Grid>
      <Grid container margin={2}>
        <Grid item xs={3.7}>
          <Typography sx={{ color: COLORS.SECONDARY_TEXT_GREY }}>
            {item.token_id ? displayId : ''}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default InventoryDragon
