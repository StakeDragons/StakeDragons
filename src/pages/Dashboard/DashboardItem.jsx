import React from 'react'

import { Box, Typography } from '@mui/material';


const DashboardItem = ({ dragonInfo, dragonKindCounts }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: 235,
                height: 160,
                mx: { xl: 8, xs: 4 },
                my: 4,
            }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: 48,
                border: `2px solid ${dragonInfo.color}`,
                borderRadius: '4px'
            }}>
                <Typography sx={{
                    fontSize: '20px',
                    lineHeight: '30px',
                    fontWeight: 500,
                    color: 'white',
                    textTransform: 'capitalize'
                }}>
                    {dragonInfo.name} Dragons
                </Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 3
            }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 160,
                    height: 40,
                    border: `1px solid ${dragonInfo.color}`,
                    fontSize: '16px',
                    color: 'white',
                    marginRight: 1
                }}>
                    Total
                </Box>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 40,
                    height: 40,
                    border: `1px solid ${dragonInfo.color}`,
                    fontSize: '16px',
                    color: 'white',
                    background: 'rgba(97, 97, 97, 0.3)'
                }}>
                    {dragonKindCounts[dragonInfo.name]?.totalCount ?? 0}
                </Box>
            </Box>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 1
            }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 160,
                    height: 40,
                    border: `1px solid ${dragonInfo.color}`,
                    fontSize: '16px',
                    color: 'white',
                    marginRight: 1
                }}>
                    Staked
                </Box>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 40,
                    height: 40,
                    border: `1px solid ${dragonInfo.color}`,
                    fontSize: '16px',
                    color: 'white',
                    background: 'rgba(97, 97, 97, 0.3)'
                }}>
                    {dragonKindCounts[dragonInfo.name]?.stakedCount ?? 0}
                </Box>
            </Box>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 1
            }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 160,
                    height: 40,
                    border: `1px solid ${dragonInfo.color}`,
                    fontSize: '16px',
                    color: 'white',
                    marginRight: 1
                }}>
                    On Sale
                </Box>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 40,
                    height: 40,
                    border: `1px solid ${dragonInfo.color}`,
                    fontSize: '16px',
                    color: 'white',
                    background: 'rgba(97, 97, 97, 0.3)'
                }}>
                    {dragonKindCounts[dragonInfo.name]?.onSaleCount ?? 0}
                </Box>
            </Box>
        </Box>)
}

export default DashboardItem