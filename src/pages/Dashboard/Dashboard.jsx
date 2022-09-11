import React, { useEffect } from 'react'

import { Grid, Box, Typography, createTheme } from '@mui/material';
import { withSnackbar } from 'notistack'
import useStyles from 'styles'
import DashboardItem from './DashboardItem';
import { DRAGON_TYPE_NAMES } from '../../util/constants';

import contract from 'contracts/marketplace/contract'
import { useWallet } from 'contexts/wallet'
import { useContracts } from 'contexts/contract'
import { useState } from 'react';

const DRAGON_CONTRACT_ADDRESS = process.env.REACT_APP_DRAGON_CONTRACT_ADDRESS

const dragonLimit = 5;

const Dashboard = () => {
    const classes = useStyles();
    const wallet = useWallet();
    const dragonContract = useContracts().dragon;
    const [dragonKindCounts, setDragonKindCounts] = useState({});

    useEffect(() => {
        const getAndGroupDragons = async () => {
            if (wallet.initialized && dragonContract) {
                const dragon_client = dragonContract?.use(DRAGON_CONTRACT_ADDRESS);
                const drgn_market = contract(wallet.getClient(), false)
                let hasNext = true;
                let lastDragonId = '0';
                let dragonList = [];
                let hasListedNext = true;
                let lastListedDragonId = '0';
                if (dragon_client?.rangeUserDragons && drgn_market.getListedTokensByOwner) {
                    while (hasNext) {
                        const dragonRes = await dragon_client.rangeUserDragons(wallet.address, lastDragonId, dragonLimit);
                        dragonList = [...dragonList, ...dragonRes];
                        lastDragonId = dragonRes[dragonRes.length - 1]?.token_id;
                        if ((dragonRes.length < dragonLimit) || (lastDragonId === undefined)) {
                            hasNext = false;
                        }
                    }

                    while (hasListedNext) {
                        const { tokens: listedDragons } = await drgn_market.getListedTokensByOwner(
                            dragonLimit,
                            lastListedDragonId,
                            wallet.address,
                        )
                        dragonList = [...dragonList, ...listedDragons.map(dragon => ({ token_id: dragon.id, kind: dragon.rarity, onSale: dragon.on_sale }))]
                        lastListedDragonId = listedDragons[listedDragons.length - 1]?.id;
                        if ((listedDragons.length < dragonLimit) || (lastListedDragonId === undefined)) {
                            hasListedNext = false;
                        }
                    }

                    dragonList = await Promise.all(dragonList.map(async (dragon) => {
                        const { is_staked } = await dragon_client.retrieveUserDragons(dragon.token_id);
                        return {
                            ...dragon,
                            onSale: dragon.onSale ? true : false,
                            is_staked
                        }
                    }))
                }

                const kindCounts = dragonList.reduce((acc, curr) => {
                    if (acc[curr.kind]) {
                        acc[curr.kind] = {
                            totalCount: acc[curr.kind].totalCount + 1,
                            stakedCount: curr.is_staked ? (acc[curr.kind].stakedCount + 1) : acc[curr.kind].stakedCount,
                            onSaleCount: curr.onSale ? (acc[curr.kind].onSaleCount + 1) : acc[curr.kind].onSaleCount
                        };
                    }
                    else {
                        acc[curr.kind] = {
                            totalCount: 1,
                            stakedCount: curr.is_staked ? 1 : 0,
                            onSaleCount: curr.onSale ? 1 : 0
                        };
                    }
                    return acc;
                }, {})
                setDragonKindCounts(kindCounts);
            }
        }
        if (wallet) {
            getAndGroupDragons();
        }
    }, [wallet, dragonContract])

    return (
        <Grid container className={classes.pageContainer}>
            <Grid item xs={12} sx={{ textAlign: '-webkit-center' }}>
                <Grid item xs={12} lg={8} style={{ maxWidth: '90%' }}>
                    <Box
                        className={classes.goldBox4}
                        sx={{
                            width: '100%',
                            paddingY: { xs: 0, lg: 3 },
                            paddingX: { xs: 0, lg: 3 },
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column'
                        }}
                    >
                        <Typography sx={{
                            marginBottom: 3,
                            fontSize: '24px',
                            lineHeight: '37px',
                            fontWeight: 400,
                            color: 'white'
                        }}>
                            Dragon Dashboard
                        </Typography>
                        <Box sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            scale: { xl: '100%', lg: '90%', md: '60%', xs: '50%' }
                        }}>
                            <Box
                                sx={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}
                            >
                                <DashboardItem key={DRAGON_TYPE_NAMES[0].name} dragonInfo={DRAGON_TYPE_NAMES[0]} dragonKindCounts={dragonKindCounts} />
                                <DashboardItem key={DRAGON_TYPE_NAMES[1].name} dragonInfo={DRAGON_TYPE_NAMES[1]} dragonKindCounts={dragonKindCounts} />
                                <DashboardItem key={DRAGON_TYPE_NAMES[2].name} dragonInfo={DRAGON_TYPE_NAMES[2]} dragonKindCounts={dragonKindCounts} />
                            </Box>
                            <Box
                                sx={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    marginTop: 10
                                }}
                            >
                                <DashboardItem key={DRAGON_TYPE_NAMES[3].name} dragonInfo={DRAGON_TYPE_NAMES[3]} dragonKindCounts={dragonKindCounts} />
                                <DashboardItem key={DRAGON_TYPE_NAMES[4].name} dragonInfo={DRAGON_TYPE_NAMES[4]} dragonKindCounts={dragonKindCounts} />
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default withSnackbar(Dashboard);