import React, {useEffect, useState} from 'react'
import ClipLoader from "react-spinners/ClipLoader";

import {Box, Heading, Flex, Button } from 'rebass';
import { Label, Input, Textarea } from '@rebass/forms'


// import data from '../blogs/data.json';
import {useTheme} from "@emotion/react";
import {gql, useQuery} from "@apollo/client";
// const maxPostNumber = 5


const EXAMPLE_QUERY = gql`
    query ExampleQuery {
        comment {
            CommentsTableHashKey
            name
            comment
            timestamp
            postid
        }
    }
`;

function ExampleQueryFetch() {
    const { loading, error, data } = useQuery(EXAMPLE_QUERY);

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


// const postCommentMock = (e) => new Promise((resolve, reject) => {
//
//         if (1===2) {
//             reject('flame');
//         } else {
//             console.log("e=",e)
//             resolve('yea');
//         }
// }
// )

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
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);



    useEffect(() => {
        const getComments = (postID) => {
            console.log("postID-",postID)
            const commentList = [
                {postID: 1, commentID: 1, commentText: "This is a comment", userName: "fred", dateTime: "Mon Aug 02 2021 14:29:44 GMT-0500 (Central Daylight Time)"},
                {postID: 1, commentID: 2, commentText: "This is another comment", userName: "george", dateTime: "Mon Aug 02 2021 14:29:44 GMT-0500 (Central Daylight Time)"}
            ]
            setIsLoaded(true);
            setItems(commentList);
            return 'commentList';
        }
        // const hurl = "http://" + apiHost + "/sample"
        // const fetchData = async () =>
        // {
        //     return fetch(hurl)
        //         .then(res => res.json())
        //         .then(
        //             (result) => {
        //                 setIsLoaded(true);
        //                 setItems(result);
        //                 return 'complete';
        //             },
        //             // Note: it's important to handle errors here
        //             // instead of a catch() block so that we don't swallow
        //             // exceptions from actual bugs in components.
        //             (error) => {
        //                 setIsLoaded(true);
        //                 setError(error);
        //             }
        //         )
        // }

        const result = getComments(props.postID);
        console.log(result)
    }, [props.postID])


    const theme = useTheme()
    console.log("props",props)
    // const commentList = getComments(props.postID)

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div>
                <Heading as={'h1'} sx={theme.h1Sx}>Comments</Heading>
                <RBForm postID={props.postID}/>
                <Box>
                    {items.map(com => (
                        <Box key={com.commentID}>
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
                                            id={'date-' + com.commentID}
                                            name='date'
                                            defaultValue={com.dateTime}
                                            disabled
                                        />
                                    </Box>
                                </Flex>
                                <Flex mx={-2} mb={3}>
                                    <Box width={1 / 3} px={2}>
                                        <Label htmlFor='name'>Name</Label>
                                        <Input
                                            id={'name-' + com.commentID}
                                            name='name'
                                            defaultValue={com.userName}
                                            disabled
                                        />
                                    </Box>
                                </Flex>
                                <Flex mx={-2} mb={3}>
                                    <Box width={1 / 3} px={2}>
                                        <Label htmlFor='comment'>Comment</Label>
                                        <Textarea sx={theme.textArea}
                                                  id='comment'
                                                  name='comment'
                                                  value={com.commentText}
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
