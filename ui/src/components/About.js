import React from 'react';
import { useTheme } from '@emotion/react';
import avatar from '../assets/will.jpeg';
import { SocialIcon } from 'react-social-icons';

import {
    Box,
    Image,
    Heading,
    Text,
    Flex
} from 'rebass';

import {Helmet} from "react-helmet";

 export const About = () => {
     const theme = useTheme()
     const textSx={
         pb: [3,3,2]
     }
     const h4Sx={
         color: theme.colors.primaryBackground,
         fontFamily: theme.fontFamily,
         pb: [3,3,2],
         ml: [0,0,2]
     }
     const h1Sx={
         ...theme.h1Sx,
         fontSize: [5,6,7],
         pb: 2,
         pt: 2,
     }

     return (
         <Box>
             <Helmet>
                 <meta property="og:type" content="profile"/>
                 <meta property="og:title" content="About"/>
                 <meta property="og:url" content="https://arthurdayton.com/about"/>
                 <meta property="og:image" content="%PUBLIC_URL%/will.jpg"/>
                 <meta property="og:description" content="About Arthur Dayton"/>
                 <meta property="article:author" content="Arthur Dayton"/>
                 <meta property="article:published_date" content="2022-02-16"/>
                 <meta property="article:tag" content="About"/>
                 <meta property="article:tag" content="Profile"/>
             </Helmet>
         <Flex flexWrap='wrap' p={[0,1,2]}>
             <Box sx={{width: ['1', '1/2', '1/2'],
                 display: ['flex','',''],
                 marginLeft: ['auto','auto','5%'],
                 marginRight:['auto','auto','5%']
             }}
             >
                 <Image p={[0,1,2]}
                        verticalAlign='middle'
                        src={avatar}
                        sx={{ width: ['150px','300px'], height: ['150px','300px'] ,borderRadius: 9999}}
                 />
             </Box>
             <Box
                 sx={{
                     textAlign: ['center','center','left'],
                     width: [ '1', '1/2' , '1/2'],
                     color: theme.colors.primaryBackground,
                     fontSize: 20,      // theme.fontSizes[2]
                     margin: 3,        // theme.space[3]
                 }}>
                 <Heading
                     sx={h1Sx}>
                     Arthur Dayton
                 </Heading>
                 <Box  sx={h4Sx}>
                     <Text sx={textSx}>Husband, Dad</Text>
                     <Text sx={textSx}>Skier, Hiker, Builder</Text>
                     <Text sx={textSx}>Software Engineer, Architect, Cloud Enthusiast (All of them!)</Text>
                     <Text sx={textSx}>Love Terraform, Go, Docker, K8s, JavaScript, React and GraphQL</Text>
                     <Text sx={textSx}>Relational Database Apologist, Kimball Believer</Text>
                 </Box>
             </Box>

         </Flex>
     <SocialIcon bgColor={theme.colors.primaryBackground} url="https://www.linkedin.com/in/arthurdayton/" />
         </Box>
     )}

