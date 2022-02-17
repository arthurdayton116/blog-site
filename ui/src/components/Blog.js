import { React } from 'react'
import { NavLink } from "react-router-dom";
import {Flex, Box, Card, Heading} from 'rebass';
import data from '../blogs/data.json';
import {useTheme} from "@emotion/react";
import {Helmet} from "react-helmet";


const maxPostNumber = 6
const cardArr = [ 1, 1/2, 1/4 ]
// const plArr = [0,2,3]





export const Blogs = (props) => {
    const theme = useTheme()

        return (
            <div>
                <Helmet>
                    <meta property="og:title" content="Arthur Dayton Blog" />
                    <meta property="og:description" content="Arthur uses this site to blog about and demonstrate technology concepts.  It is currently deployed using serverless technologies on AWS." />
                    <meta property="og:image" content="%PUBLIC_URL%/ObservatoryPark.jpg" />
                    <meta property="article:author" content="Arthur Dayton"/>
                    <meta property="article:published_time" content="2022-02-16"/>
                </Helmet>
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
