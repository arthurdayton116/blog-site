import React, {useEffect, useState} from 'react'
import ClipLoader from "react-spinners/ClipLoader";

import {Box, Heading, Flex, Button } from 'rebass';
import { Label, Input, Textarea } from '@rebass/forms'


// import data from '../blogs/data.json';
import {useTheme} from "@emotion/react";
import {gql, useQuery} from "@apollo/client";
// const maxPostNumber = 5


const GET_COMMENTS = gql`
    query GET_COMMENTS {
        comments {
            postid
            timestamp
            comment
            name
            CommentsTableHashKey
        }
    }
`;

function ExampleQueryFetch() {
    const { loading, error, data } = useQuery(GET_COMMENTS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    console.log(data.comment)

    const { CommentsTableHashKey, postid, name, comment, timestamp } = data.comment;
    return (
        <div key={CommentsTableHashKey}>
            <p>
                {postid}: {name} : {timestamp}
            </p>
            <p>
                {comment}
            </p>
        </div>
    );
}




const postComment = async (event, cb, obj) => {

    const URL = 'https://api.arthurneedsadomain.com/';
    const sampleData = {"name":obj.name, "age": 30};

        console.log(URL)
        console.log(sampleData)
    console.log(obj)

    await fetch(URL, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'omit', // include, same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(obj) // body data type must match "Content-Type" header
        })
           .then(response => {console.log('got hear',response); return response.text()})
           .then(data => {
               console.log('Success:', data);
               cb()
           })
           .catch((error) => {
               console.error('Error:', error);
           });


}





const Comments = (props) => {
    // eslint-disable-next-line
    // const [error, setError] = useState(null);
    // const [isLoaded, setIsLoaded] = useState(false);
    // const [items, setItems] = useState([]);

    const { loading, error, data } = useQuery(GET_COMMENTS);



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
        return data.comments.map(({ CommentsTableHashKey, postid, name, comment, timestamp }) =>
            <div>
                <Heading as={'h1'} sx={theme.h1Sx}>Comments</Heading>
                <RBForm postID={postid}/>
                <Box>
                    {data.comments.map(({ CommentsTableHashKey, postid, name, comment, timestamp }) => (
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
                                            id={'date-'+CommentsTableHashKey}
                                            name='date'
                                            defaultValue={timestamp}
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
                    ))}
                </Box>
            </div>
        )
    }
}

export default Comments;

function RBForm (props){
    console.log("RBForm props = ", props.postID)
    const [commentIsPosting, setCommentIsPosting] = useState(false);

    const currentDateTime = Date().toLocaleString();
    const theme = useTheme()
    return (
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

                setCommentIsPosting(true)

                const xx = await postComment(e,()=>{console.log('got called'); setCommentIsPosting(false)}, obj)
                console.log("xx=",xx)
            console.log("You Commented!")
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
                        defaultValue='Jane Doe'
                    />
                </Box>
            </Flex>
            <Flex mx={-2} mb={3}>
            <Box width={1/3} px={2}>
                <Label htmlFor='comment'>Comment</Label>
                <Textarea
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
                            <ClipLoader  size={25} color={"#123abc"} loading={commentIsPosting} speedMultiplier={1.5} />
                        </Box>

                    </Flex>
                </Box>

            </Flex>
        </Box>
    )
}
