import React from 'react';
import { FcBrokenLink } from 'react-icons/fc';
import { Box, Flex } from "rebass";
import {useTheme} from "@emotion/react";

const NoMatch = () => {
    const theme = useTheme()
    return (
    <Flex flexWrap='wrap' p={1}>
        <Box sx={{width: '100%',
            textAlign: ['center','center','center'],
            marginLeft: ['auto','auto','auto'],
            marginRight:['auto','auto','auto'],
            fontSize: [100,200,300],
        }}
        >
            <FcBrokenLink/>
        </Box>
        <Box
            sx={{
                textAlign: ['center','center','center'],
                marginLeft: ['auto','auto','auto'],
                marginRight:['auto','auto','auto'],
                width: '100%',
                fontWeight: 900,
                color: theme.linkSXAlt1.color
            }}>
                I ... I got nothing
        </Box>

    </Flex>
)}

export default NoMatch;
