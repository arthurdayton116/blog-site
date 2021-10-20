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
                     <Text sx={textSx}>Software Engineer, Architect, Cloud Enthusiast</Text>
                     <Text sx={textSx}>Love me some Terraform, Go, Docker, K8s, JavaScript, React and GraphQL</Text>
                     <Text sx={textSx}>Relational Database Apologist, Kimball Believer</Text>
                     <Text sx={textSx}>#Techmiscuous</Text>
                 </Box>
             </Box>

         </Flex>
     <SocialIcon bgColor={theme.colors.primaryBackground} url="https://www.linkedin.com/in/arthurdayton/" />
         </Box>
     )}

