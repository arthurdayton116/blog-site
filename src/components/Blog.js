import React from 'react'
import { NavLink, Link } from "react-router-dom";
import {Flex, Box, Card, Image, Heading, Text} from 'rebass';
import data from '../blogs/data.json';
import {useTheme} from "@emotion/react";
const maxPostNumber = 6
const cardArr = [ 1, 1/2, 1/4 ]
const plArr = [0,2,3]

export const Blogs = () => {
    const theme = useTheme()
        return (
            <div>
                <Flex flexWrap={'wrap'} alignItems='center' sx={theme.linkSXAlt1}>
                    {data.filter(post =>  post.id <= maxPostNumber).sort(function (a, b) {
                        return a.order - b.order;
                    }).map(post => {
                        const textColor = post.order === 1 ? 'white' : 'black';
                        const bgColor = post.order === 1 ? 'black' : 'white';
                        return (
                    <Box width={cardArr} height={'130px'}  m={2} bg={bgColor}
                         sx={{borderRadius: 20, alignContent: 'center', justifyContent: 'center',
                             borderWidth: '2px',
                             borderStyle: 'solid',
                             borderColor: 'black',
                             }} p={2} >
                            <NavLink style={{ textDecoration: 'none' }} to={
                                {
                                    pathname: `/post/${post.id}/`,
                                    state: {
                                        post: post
                                    },
                                }
                            }>
                            <Card
                                height={'115px'} alignItems='center' justifyContent='center'
                                  sx={{'text-align': 'center', 'vertical-align': 'middle',
                                      display: 'flex'}}>
                                {/*<Image src={'images/templatev2/frenchy.png'} />*/}
                                <Heading fontSize={[ 1, 2, 3 ]} fontFamily={theme.fontFamily}
                                         color={textColor}
                                >{post.title}</Heading>
                            </Card>
                            </NavLink>
                    </Box>
                    )}
                    )}
                </Flex>
            </div>
        )
}
