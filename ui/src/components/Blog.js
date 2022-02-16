import { React } from 'react'
import { NavLink } from "react-router-dom";
import {Flex, Box, Card, Heading} from 'rebass';
import data from '../blogs/data.json';
import {useTheme} from "@emotion/react";
import {MDXProvider} from '@mdx-js/react';

const maxPostNumber = 6
const cardArr = [ 1, 1/2, 1/4 ]
// const plArr = [0,2,3]





export const Blogs = (props) => {
    const theme = useTheme()

        return (
            <div>
                <Flex id="posts" flexWrap={'wrap'} alignItems='center' sx={theme.linkSXAlt1}>
                    {data.filter(post =>  post.id <= maxPostNumber).sort(function (a, b) {
                        return a.order - b.order;
                    }).map(post => {
                        const textColor = post.order === 1 ? 'white' : 'black';
                        const bgColor = post.order === 1 ? 'black' : 'white';
                        return (
                    <Box width={cardArr} height={'130px'}  m={2} bg={bgColor} id={`post_${post.id}`} key={post.id}
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
                                  sx={{'textAlign': 'center', 'verticalAlign': 'middle',
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
