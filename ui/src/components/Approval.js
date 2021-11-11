import React from 'react';
import { useTheme } from '@emotion/react';
import {
    Box,
    Flex
} from 'rebass';
// eslint-disable-next-line
import {gql, useQuery, useMutation} from "@apollo/client";

import {Input, Label, Textarea} from "@rebass/forms";
// const maxPostNumber = 5


const GET_UNAPPROVED_COMMENTS = gql`
    query{
        unapprovedComments {
            postid
            timestamp
            comment
            name
            CommentsTableHashKey
            okToShow
        }
    }
`;

 export const Approval = (props) => {
     const { loading, error, data } = useQuery(GET_UNAPPROVED_COMMENTS, {fetchPolicy: "network-only" });

     const theme = useTheme()
     console.log("props",props)

     if (error) {
         return <div>Error: {error.message}</div>;
     } else if (loading) {
         return <div>Loading...</div>;
     } else {
         console.log(data.unapprovedComments)
         return (
             <div>
                 <Box>
                     <Box>
                         {data.unapprovedComments.map(({CommentsTableHashKey, postid, name, comment, timestamp}) => {
                                 const dtcnvrt = new Date(timestamp)
                                 const dtfmt = dtcnvrt.toString(dtcnvrt)
                                 return (
                                     <Box key={CommentsTableHashKey}>
                                         {/*<Box sx={theme.linkSXAlt1}>*/}
                                         <Box width={1 / 3} px={0}>
                                             <hr/>
                                         </Box>
                                         <Box>
                                             <Flex mx={-2} mb={3}>
                                                 <Box width={1 / 3} px={0}>
                                                     {/*<Label htmlFor='date'>Date</Label>*/}
                                                     <Input
                                                         sx={{
                                                             border: 'none'
                                                         }}
                                                         id={'date-' + CommentsTableHashKey}
                                                         name='date'
                                                         defaultValue={dtfmt}
                                                         disabled
                                                     />
                                                 </Box>
                                             </Flex>
                                             <Flex mx={-2} mb={3}>
                                                 <Box width={1 / 3} px={2}>
                                                     <Label htmlFor='name'>Name</Label>
                                                     <Input
                                                         id={'name-' + CommentsTableHashKey}
                                                         name='name'
                                                         defaultValue={name}
                                                         disabled
                                                     />
                                                 </Box>
                                             </Flex>
                                             <Flex mx={-2} mb={3}>
                                                 <Box width={1 / 3} px={2}>
                                                     <Label htmlFor='comment'>Comment</Label>
                                                     <Textarea sx={theme.textArea}
                                                               id={'comment-' + CommentsTableHashKey}
                                                               name='comment'
                                                               value={comment}
                                                               disabled
                                                     />
                                                 </Box>
                                             </Flex>
                                         </Box>
                                     </Box>
                                 )
                             }
                         )}
                     </Box>
                 </Box>
                 }
             </div>
         )
     }
 }

export default Approval;
