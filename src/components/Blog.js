import React from 'react'
import { Link } from "react-router-dom";
import {Box, Heading} from 'rebass';
import data from '../blogs/data.json';
import {useTheme} from "@emotion/react";
const maxPostNumber = 6

export const Blogs = () => {
    const theme = useTheme()
        return (
            <div>
                <Heading as={'h1'} sx={theme.h1Sx}>Posts</Heading>
                    a<ul>
                            {data.filter(post =>  post.id <= maxPostNumber).map(post => (
                                <li key={post.id}>
                                    <Box sx={theme.linkSXAlt1}>
                                        <Link style={theme.linkSXAlt1} to={
                                            {
                                                pathname: `/post/${post.id}/`,
                                                state: {
                                                    post: post
                                                },
                                            }
                                        }>{post.title}</Link>
                                    </Box>
                                </li>
                            ))}
                    </ul>
            </div>
        )
}
