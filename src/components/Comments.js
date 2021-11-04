import React, {useEffect, useState} from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import {Box, Heading, Flex, Button } from 'rebass';
import { Label, Input, Textarea } from '@rebass/forms'
import {FaAngleDown, FaAngleUp, FaMinus, FaPlus} from "react-icons/fa";

import {useTheme} from "@emotion/react";
import {gql, useQuery, useMutation} from "@apollo/client";
// const maxPostNumber = 5


const GET_COMMENTS = gql`
    query GET_COMMENTS($postid: String!){
        comments(postid: $postid) {
            postid
            timestamp
            comment
            name
            CommentsTableHashKey
        }
    }
`;


const Comments = (props) => {
    // eslint-disable-next-line
    // const [error, setError] = useState(null);
    const [showForm, setshowForm] = useState(false);
    const [showComments, setshowComments] = useState(false);
    // const [items, setItems] = useState([]);
    const postid = props.postID || ''

    const { loading, error, data } = useQuery(GET_COMMENTS, { variables:{postid: `${postid}`} });



    // const { CommentsTableHashKey, postid, name, comment, timestamp } = data.comment;

    const theme = useTheme()
    console.log("props",props)
    // const commentList = getComments(props.postID)

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (loading) {
        return <div>Loading...</div>;
    } else {
        console.log(data.comments)
        return (
            <div>

                <Heading as={'h1'} mt={2} mb={2} sx={theme.h1Sx}>Comments
                    {!showComments && <FaAngleDown onClick={() => setshowComments(true)} />}
                    {showComments && <FaAngleUp onClick={() => setshowComments(false)} />}
                </Heading>

                {showComments &&
                <Box>
                <Box mt={2} mb={2} sx={theme.h1Sx}>
                    {!showForm && <FaPlus onClick={() => setshowForm(true)} />}
                    {showForm && <FaMinus onClick={() => setshowForm(false)} />}
                </Box>
                    {showForm &&
                    <RBForm postID={postid} hide={()=>setshowForm(false)}/>}

                <Box>
                    {data.comments.map(({CommentsTableHashKey, postid, name, comment, timestamp}) => {
                        const dtcnvrt = new Date(timestamp)
                        const dtfmt = dtcnvrt.toString(dtcnvrt)
                        return (
                        <Box key={postid}>
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

export default Comments;

const addCommentMutation = gql`
    mutation Mutation($comment: NewComment!) {
    addComment(comment: $comment) {
        postid
        timestamp
        comment
        name
        CommentsTableHashKey  }}
`



function RBForm (props){
    console.log("RBForm props = ", props.postID)
    // const [commentIsPosting, setCommentIsPosting] = useState(false);

    const [addComment, { data, loading, error }] = useMutation(addCommentMutation,{
        refetchQueries: [GET_COMMENTS]});

    const currentDateTime = Date().toLocaleString();
    const theme = useTheme()
    return (
        <Box p={2} fontFamily='arial'>
        <Box
             as='form'
            onSubmit={async e => {
                e.preventDefault();
                const timeStamp = e.target[0].value
                const name = e.target[1].value
                const comment = e.target[2].value
                const postid = props.postID
                const obj = {name, timeStamp, comment, postid}
                console.log(timeStamp)
                console.log(name)
                console.log(comment)
                console.log(e.target[3].value)

                await addComment(
                {variables:{
                    "comment": {
                        "postid": `${postid}`,
                            "timestamp": timeStamp,
                            "comment": comment,
                            "name": name
                    }
                }
                })
                props.hide()

            }}

            py={3}>
            <Flex mx={-2} mb={3}>
            <Box width={1/3} px={0}>
                {/*<Label htmlFor='date'>Date</Label>*/}
                <Input
                    sx={{
                        border: 'none'
                    }}
                    id='date'
                    name='date'
                    defaultValue={currentDateTime}
                    disabled
                />
            </Box>
            </Flex>
            <Flex mx={-2} mb={3}>
                <Box width={1/3} px={2}>
                    <Label htmlFor='name'>Name</Label>
                    <Input
                        id='name'
                        name='name'
                        placeholder='Jane Doe'
                    />
                </Box>
            </Flex>
            <Flex mx={-2} mb={3}>
            <Box width={1/3} px={2}>
                <Label htmlFor='comment'>Comment</Label>
                <Textarea fontFamily='arial'
                    id='comment'
                    name='comment'
                />
            </Box>
            </Flex>
            <Flex mx={-2} mb={3}>
                <Box width={1/3} px={2}>
                    <Flex>
                        <Button sx={theme.buttons}>
                            Comment
                        </Button>
                        <Box px={2}>
                            <ClipLoader  size={25} color={"#123abc"} loading={loading} speedMultiplier={1.5} />
                        </Box>

                    </Flex>
                </Box>

            </Flex>
        </Box>
        </Box>
    )
}
