import React, {useState} from 'react';
import { Image, Flex, Box, Link } from 'rebass';
import logo from '../assets/ObservatoryPark.jpg';
import {useTheme} from "@emotion/react";
import { FaBars } from 'react-icons/fa';

export const NavigationBar = (props) => {
    const theme = useTheme()
    const [displayVar, toggleDisplayVar] = useState('none')

    return (
        <Box pb={[2,2,4]} >
        <Flex
            bg={theme.navbar.background}
            alignItems='center'>
            <Image
                src={logo}
                display={['none','block','block']}
                sx={{
                    width: theme.navbar.imageWidth,
                    height: theme.navbar.imageHeight,
                    borderRadius: 0,
                }}
            />
                <Link variant='nav' href='/blog' display={['none','block','block']} sx={theme.linkSX} >Blog</Link>
                <Link variant='nav' href='/about' display={['none','block','block']} sx={theme.linkSX} >About</Link>
            <Box mx='auto' />
            <Box
                pr={4} sx={theme.linkSX}
                display={['block','none','none']}
                fontSize={[3,4,4]}
                onClick={() => {
                    if(displayVar==='none') return toggleDisplayVar('block'); else return toggleDisplayVar('none');
                }
                }
            ><FaBars /></Box>
        </Flex>
            <Box bg={theme.navbar.hover} display={displayVar}>
                <Flex flexWrap='wrap' textAlign='right'>
                    <Box width={'100%'} p={2}>
                        <Link variant='nav' href='/blog'  sx={theme.linkSXAlt2} onClick={() =>toggleDisplayVar('none')}>Blog</Link>
                    </Box>
                    <Box width={'100%'} p={2}>
                        <Link variant='nav' href='/about'  sx={theme.linkSXAlt2} onClick={() =>toggleDisplayVar('none')}>About</Link>
                    </Box>
                </Flex>
            </Box>
        </Box>
)}
