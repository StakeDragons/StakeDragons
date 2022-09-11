// import React from 'react'
// import ComingSoon from '../../components/ComingSoon'

// const Stake = () => {
//   return <ComingSoon />
// }

// export default Stake
import React, { useEffect, useState } from 'react'
import { Box, Stack, Grid, Typography } from '@mui/material'
import { withSnackbar } from 'notistack'

import { CustomOutlinedButton } from 'components/Button'
import { CustomOutlinedLabel } from 'components/Label'
import DragonInfoStaking from '../../components/DragonInfo/DragonInfoStaking'
import NoDragon from './NoDragon'
import OvulationCountDown from '../../components/Countdown/OvulationCountDown'
import StakeDragonCard from '../../components/Stake/StakeDragonCard'

import useStyles from 'styles'
import { useWallet } from 'contexts/wallet'
import { useContracts } from 'contexts/contract'
import { showNotification } from 'util/NotificationUtils'

// const RIGHT_PANELS = {
//   DragonInfo: 'dragon-info',
//   MyDragon: 'my-dragon',
// }

const Stake = (props) => {
  const classes = useStyles()
  const wallet = useWallet()
  const contract = useContracts().dragon
  const DRAGON_CONTRACT_ADDRESS = process.env.REACT_APP_DRAGON_CONTRACT_ADDRESS

  const [error, setError] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [ownedDragonList, setOwnedDragonList] = useState([])
  const [selectedDragon, setSelectedDragon] = useState(0)
  const [displayDragon, setDisplayDragon] = useState({})
  const [display, setDisplay] = useState(false)
  const [reward, setReward] = useState(0)
  const [ovulationTimer, setOvulationTimer] = useState([0, 0, 0])
  const [unstakingTimer, setUnstakingTimer] = useState([0, 0, 0])
  const [hasEggs, setHasEggs] = useState('0 Dragon Egg')
  const [noDragon, setNoDragon] = useState(false)

  const delay = () => {
    setTimeout(() => {
      setDisplay(true)
    }, 1000)
  }

  const stake = async () => {
    try {
      if (!wallet || !contract || !ownedDragonList[selectedDragon]) return
      const client = contract.use(DRAGON_CONTRACT_ADDRESS)

      const txHash = await client.stakeDragon(
        wallet.address,
        ownedDragonList[selectedDragon].token_id,
      )

      showNotification(
        props.enqueueSnackbar,
        'Transaction Successful ',
        'Click here for TX',
        'success',
        `https://www.mintscan.io/juno/txs/${txHash}`,
      )
      setRefresh(true)
    } catch (err) {
      showNotification(props.enqueueSnackbar, 'Transaction Failed ', 'Click here for TX', 'error')
      console.warn(err)
    }
  }

  const unstake = async () => {
    try {
      if (!wallet || !contract || !ownedDragonList[selectedDragon]) return
      const client = contract.use(DRAGON_CONTRACT_ADDRESS)
      let res = await client.claimReward(wallet.address, ownedDragonList[selectedDragon].token_id)
      res = await client.unstakeDragon(wallet.address, ownedDragonList[selectedDragon].token_id)
      showNotification(
        props.enqueueSnackbar,
        'Transaction Successful ',
        'Click here for TX',
        'success',
        `https://www.mintscan.io/juno/txs/${res}`,
      )
      setRefresh(true)
    } catch (err) {
      showNotification(props.enqueueSnackbar, 'Transaction Failed ', 'Click here for TX', 'error')
    }
  }

  const startUnstakingProcess = async () => {
    try {
      if (!wallet || !contract || !ownedDragonList[selectedDragon]) return
      const client = contract.use(DRAGON_CONTRACT_ADDRESS)

      const res = await client.startUnstakingProcess(
        wallet.address,
        ownedDragonList[selectedDragon].token_id,
      )
      showNotification(
        props.enqueueSnackbar,
        'Transaction Successful ',
        'Click here for TX',
        'success',
        `https://www.mintscan.io/juno/txs/${res}`,
      )
      setRefresh(true)
    } catch (err) {
      showNotification(props.enqueueSnackbar, 'Transaction Failed ', 'Click here for TX', 'error')
    }
  }

  const calculateReward = async (id) => {
    try {
      if (!wallet || !contract || !ownedDragonList[selectedDragon]) return
      const client = contract.use(DRAGON_CONTRACT_ADDRESS)
      const dragon = await retrieveDragon(ownedDragonList[id].token_id)
      if (!dragon.is_staked) {
        setReward(0)
      } else {
        const res = await client.calculateReward(ownedDragonList[id].token_id)
        setReward((res / 1000000).toFixed(2))
      }
    } catch (err) {}
  }

  // const queryState = async () => {
  //   try {
  //     const client = contract.use(DRAGON_CONTRACT_ADDRESS)
  //     const res = await client.queryState()
  //     console.log(res)
  //   } catch (err) {}
  // }

  // const updateRewardContractAddress = async () => {
  //   try {
  //     const client = contract.use(DRAGON_CONTRACT_ADDRESS)
  //     const res = await client.updateRewardContractAddress(wallet.address)
  //   } catch (err) {}
  // }

  const claimReward = async () => {
    try {
      if (!wallet || !contract || !ownedDragonList[selectedDragon]) return
      const client = contract.use(DRAGON_CONTRACT_ADDRESS)

      await client.claimReward(wallet.address, ownedDragonList[selectedDragon].token_id)
      setRefresh(true)
      wallet.refreshBalance()
    } catch (err) {
      console.error(err)
    }
  }

  const hatch = async () => {
    try {
      if (!wallet || !contract || !ownedDragonList[selectedDragon]) return
      const client = contract.use(DRAGON_CONTRACT_ADDRESS)

      await client.hatch(wallet.address, ownedDragonList[selectedDragon].token_id)
    } catch (err) {}
  }

  const plantEgg = async () => {
    try {
      if (!wallet || !contract || !ownedDragonList[selectedDragon]) return
      const client = contract.use(DRAGON_CONTRACT_ADDRESS)

      await client.plantEgg(wallet.address, ownedDragonList[selectedDragon].token_id)
    } catch (err) {}
  }

  const selectDragon = async (id) => {
    setSelectedDragon(id)
    const dragon = await retrieveDragon(ownedDragonList[id].token_id)
    setDisplayDragon(dragon)
    if (dragon.is_staked) {
      calculateReward(id)
    } else {
      setReward(0)
    }
  }

  useEffect(() => {
    const queryUserDragons = async () => {
      try {
        if (!contract || !wallet.initialized) return
        const client = contract?.use(DRAGON_CONTRACT_ADDRESS)
        const res = await client.rangeUserDragons(wallet.address, '0', 5)
        const dragon = await retrieveDragon(res[0].token_id)
        if (!dragon.is_staked) {
          setReward(0)
        } else {
          calculateReward(0)
        }
        setOwnedDragonList(res)
      } catch (e) {}
    }
    queryUserDragons()
    setNoDragon(false)
  }, [wallet, contract, DRAGON_CONTRACT_ADDRESS, refresh])

  const retrieveDragon = async (id) => {
    try {
      const client = contract?.use(DRAGON_CONTRACT_ADDRESS)
      const res = await client.retrieveUserDragons(id)
      setDisplayDragon(res)
      calculateOvulationPeriod(res)
      calculateUnstakingPeriod(res)
      checkEggs(res)
      return res
    } catch (e) {
      return null
    }
  }

  const calculateOvulationPeriod = (dragon) => {
    if (dragon.unstaking_process || !dragon.is_staked) {
      setOvulationTimer([Number(dragon.ovulation_period) - 1, 23, 59])
    } else {
      const dateInSeconds = Date.now() / 1000
      let secondDiff = dragon.hatch - dateInSeconds
      //calculate days
      const days = Math.floor(secondDiff / 86400)
      secondDiff = secondDiff - days * 86400
      //calculate hours
      const hours = Math.floor(secondDiff / 3600)
      secondDiff = secondDiff - hours * 3600
      //calculate minutes
      const minutes = Math.floor(secondDiff / 60)
      setOvulationTimer([days, hours, minutes])
    }
  }

  const calculateUnstakingPeriod = (dragon) => {
    if (dragon.is_staked) {
      if (dragon.unstaking_process) {
        const dateInSeconds = Date.now() / 1000
        let secondDiff = Number(dragon.unstaking_start_time) + 14 * 86400 - dateInSeconds
        //calculate days
        const days = Math.floor(secondDiff / 86400)
        secondDiff = secondDiff - days * 86400
        //calculate hours
        const hours = Math.floor(secondDiff / 3600)
        secondDiff = secondDiff - hours * 3600
        //calculate minutes
        const minutes = Math.floor(secondDiff / 60)
        if (days < 0 || hours < 0 || minutes < 0) {
          setUnstakingTimer([0, 0, 0])
        } else {
          setUnstakingTimer([days, hours, minutes])
        }
      }
    }
  }

  const checkEggs = (dragon) => {
    if (dragon.unstaking_process) {
      setHasEggs('0 Dragon Egg')
    } else {
      if (dragon.is_staked) {
        setHasEggs(
          dragon.hatch < Date.now() / 1000 && hatch !== 0 ? '1 Dragon Egg' : '0 Dragon Egg',
        )
      } else {
        setHasEggs('0 Dragon Egg')
      }
    }
  }

  useEffect(() => {
    delay()
    if (ownedDragonList.length === 0) {
      setError(true)
    } else {
      setError(false)
    }
  }, [ownedDragonList, error])

  const handleScroll = async (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight
    if (bottom) {
      if (noDragon) return
      const client = contract?.use(DRAGON_CONTRACT_ADDRESS)
      let res = []
      res = await client.rangeUserDragons(
        wallet.address,
        ownedDragonList[ownedDragonList.length - 1].token_id,
        5,
      )
      if (res.length === 0) {
        setNoDragon(true)
      }
      const temp = ownedDragonList.concat(res)
      setOwnedDragonList(temp)
    }
  }

  if (error) {
    return display && <NoDragon />
  } else {
    return (
      <div
        style={{
          overflow: 'scroll',
          msOverflowStyle: '0px !important',
          scrollbarWidth: '0px !important',
          overflowX: 'hidden',
          height: '100%',
        }}
        onScroll={(e) => handleScroll(e)}
      >
        <Grid container spacing={4} sx={{ position: 'relative', paddingX: 2 }}>
          <Grid item xs={12} xl={7} lg={4} paddingBottom={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography className={classes.h2}>Dragons</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', marginTop: 3 }}>
                {ownedDragonList &&
                  ownedDragonList.map((item, idx) => {
                    return (
                      <StakeDragonCard
                        height={'410px'}
                        maxWidth={'275px'}
                        imgHeight={'180px'}
                        item={item}
                        price={'0'}
                        onClick={() => selectDragon(idx)}
                        isSelected={selectedDragon === idx}
                        key={idx}
                      />
                    )
                  })}
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} xl={5} lg={8}>
            <Box sx={{ position: 'sticky', top: 0, marginTop: 7 }}>
              <DragonInfoStaking item={ownedDragonList[selectedDragon]} />
              <Box className={classes.goldBox4} py={2} px={4} marginTop={2}>
                <Typography className={classes.h2} sx={{ fontSize: '20px !important' }}>
                  My Dragon Info (Staking and Ovulation)
                </Typography>
                <Stack direction="row" justifyContent="center" marginTop={2}>
                  <CustomOutlinedLabel
                    title="Reward Amount:"
                    amount={reward + ' DRGN'}
                    styles={{ display: 'flex', justifyContent: 'space-between', width: '60%' }}
                    textStyles={{ fontSize: '16px !important' }}
                  />
                  <CustomOutlinedButton
                    title="Claim"
                    styles={{ width: '12vw', paddingY: '10px', marginLeft: 2 }}
                    disabled={reward === 0}
                    onClick={claimReward}
                  />
                </Stack>
                <Stack direction="row" justifyContent="center" spacing={2} marginTop={2}>
                  <Box>
                    <OvulationCountDown
                      title="Ovulation Timer:"
                      days={ovulationTimer[0]}
                      hours={ovulationTimer[1]}
                      minutes={ovulationTimer[2]}
                    />
                  </Box>
                </Stack>
                <Stack direction="row" justifyContent="center" marginTop={2}>
                  <CustomOutlinedLabel
                    title={'Dragon Egg Reward:'}
                    amount={hasEggs}
                    styles={{ display: 'flex', justifyContent: 'start', width: '60%' }}
                    textStyles={{ fontSize: '16px !important' }}
                  />
                  <CustomOutlinedButton
                    title="Claim"
                    onClick={plantEgg}
                    styles={{ width: '12vw', paddingY: '10px', marginLeft: 2 }}
                    disabled={hasEggs !== '1 Dragon Egg'}
                  />
                </Stack>
                <Stack direction="column" alignItems="center" marginTop={2}>
                  {displayDragon.is_staked &&
                    (!displayDragon.unstaking_process ? (
                      <CustomOutlinedButton
                        title={'Unstake'}
                        onClick={startUnstakingProcess}
                        styles={{ width: '12vw', marginY: { xs: 2, lg: 4 }, paddingY: '10px' }}
                      />
                    ) : displayDragon.unstaking_process ? (
                      <OvulationCountDown
                        title="Unstake:"
                        days={unstakingTimer[0]}
                        hours={unstakingTimer[1]}
                        minutes={unstakingTimer[2]}
                      />
                    ) : (
                      <CustomOutlinedButton
                        title={'Unstake'}
                        onClick={unstake}
                        styles={{ width: '12vw', marginY: { xs: 2, lg: 4 }, paddingY: '10px' }}
                      />
                    ))}
                  {/* {displayDragon.is_staked && (
                    <CustomOutlinedButton
                      title={'Reward'}
                      onClick={calculateReward}
                      styles={{ width: '8vw', padding: '15px' }}
                    />
                  )}
                  {displayDragon.is_staked && (
                    <CustomOutlinedButton
                      title={'PlantEgg'}
                      onClick={plantEgg}
                      styles={{ width: '8vw', padding: '15px' }}
                    />
                  )} */}
                  {!displayDragon.is_staked && (
                    <CustomOutlinedButton
                      title="Stake"
                      onClick={stake}
                      styles={{ width: '12vw', marginY: { xs: 2, lg: 4 }, paddingY: '10px' }}
                    />
                  )}
                </Stack>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withSnackbar(Stake)
