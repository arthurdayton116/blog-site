import React, {useState, useEffect} from 'react';
import {useOktaAuth} from "@okta/okta-react";
import { Image, Flex, Box, Link } from 'rebass';
import logo from '../assets/ObservatoryPark.jpg';
import {useTheme} from "@emotion/react";
import {FaBars} from 'react-icons/fa';
import { accessTokenVar } from '../cache';

export const NavigationBar = () => {
// TODO - add user profile
    const { authState, oktaAuth } = useOktaAuth();

    const login = async () => { await oktaAuth.signInWithRedirect(); }
    const logout = async () => { await oktaAuth.signOut(); }

    // eslint-disable-next-line no-unused-vars
    // noinspection JSUnusedLocalSymbols
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        if (!authState || !authState.isAuthenticated) {
            // When user isn't authenticated, forget any user info
            console.log("null auth")
            setUserInfo(null);
            accessTokenVar({})
        } else {
            oktaAuth.getUser().then((info) => {
                console.log("non null auth")
                accessTokenVar({authState: authState});
                setUserInfo(info);
                console.log("info", info)
            }).catch((err) => {
                console.error("err",err);
            });
        }
    }, [authState, oktaAuth]); // Update if authState changes

    const theme = useTheme()
    const [displayVar, toggleDisplayVar] = useState('none')

    const LogOnOffButton = (props) => {
        const logOnButton =<Link id="logOnButton" variant='nav' onClick={()=>login()} display={['none','block','block']} sx={theme.linkSX} >LogIn</Link>
        const logOffButton =(<React.Fragment>
            <Link id="approvalButton" variant='nav' href='/approval' display={['none','block','block']} sx={theme.linkSX} >Approval</Link>
            <Link id="logOffButton" variant='nav' onClick={()=>logout()} display={['none','block','block']} sx={theme.linkSX} >LogOff</Link>
            </React.Fragment>)


        if (!props.authState) {
            return logOnButton
        }
        if (!props.authState.isAuthenticated) {
            return logOnButton
        }
        return logOffButton

    }

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
            <LogOnOffButton authState={authState}/>
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
