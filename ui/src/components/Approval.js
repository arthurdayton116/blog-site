import React from 'react';
import { useTheme } from '@emotion/react';
import { Box, Flex } from 'rebass';
// eslint-disable-next-line
import { gql, useQuery, useMutation } from '@apollo/client';

import { Input, Label, Textarea, Checkbox } from '@rebass/forms';

import { userVar } from '../cache';
import { postData } from '../blogs/data';

const GET_UNAPPROVED_COMMENTS = gql`
  query {
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

const APPROVE_COMMENTS = gql`
    mutation ApproveComment($comment: NewApproval!) {
        approveComment(comment: $comment) {
            postid
            timestamp
            comment
            name
            CommentsTableHashKey
            okToShow
            approverName
            approvalTimestamp
        }
    }
`;

export const Approval = (props) => {
  const { loading, error, data } = useQuery(GET_UNAPPROVED_COMMENTS, {
    fetchPolicy: 'network-only',
  });

    // eslint-disable-next-line no-unused-vars
    const [approveComment, { _data, loadingMutation, _error }] = useMutation(APPROVE_COMMENTS,{
        refetchQueries: [GET_UNAPPROVED_COMMENTS]});

    const user = userVar()

    console.log(user)
  const theme = useTheme();
  console.log('props', props);

  if (error) {
    return (
      <div id="approvalError">Error - Please contact your administrator</div>
    );
    // <div>Error: {error.message}</div>;
  } else if (loading) {
    return <div id="approvalLoading">Loading...</div>;
  } else {
    console.log(data.unapprovedComments);
    return (
      <div id="approvalData">
        <Box>
          <Box>
            {data.unapprovedComments.map(
              ({ CommentsTableHashKey, postid, name, comment, timestamp }) => {
                const dtcnvrt = new Date(timestamp);
                const dtfmt = dtcnvrt.toString(dtcnvrt);
                const { title } = postData(postid) || {title: "" };

                return (
                  <Box key={CommentsTableHashKey}>
                    {/*<Box sx={theme.linkSXAlt1}>*/}
                    <Box width={1 / 3} px={0}>
                      <hr />
                    </Box>
                    <Box>
                      <Flex mx={-2} mb={3}>
                        <Box width={1 / 3} px={0}>
                          {/*<Label htmlFor='date'>Date</Label>*/}
                          <Input
                            sx={{
                              border: 'none',
                            }}
                            id={'date-' + CommentsTableHashKey}
                            name="date"
                            defaultValue={dtfmt}
                            disabled
                          />
                        </Box>
                      </Flex>
                      <Flex mx={-2} mb={3}>
                        <Box>
                          <Label>
                            <Checkbox id="approve" name="approve"
                            onChange={
                                async (e) => {
                                    console.log('approve')
                                    console.log('user',user)
                                    return await approveComment(
                                        {variables:{
                                                "comment": {
                                                    "CommentsTableHashKey": CommentsTableHashKey,
                                                    "approverName": user.user.email,
                                                    "okToShow": "true"
                                                }
                                            }
                                        })
                                }

                            }
                            />
                            Approve
                          </Label>
                        </Box>
                      </Flex>
                      <Flex mx={-2} mb={3}>
                        <Box width={1 / 3} px={2}>
                          <Label htmlFor="name">Post</Label>
                          <Input
                            id={'postID-' + CommentsTableHashKey}
                            name="postID"
                            defaultValue={`${postid} - ${title}`}
                            disabled
                          />
                        </Box>
                      </Flex>
                      <Flex mx={-2} mb={3}>
                        <Box width={1 / 3} px={2}>
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id={'name-' + CommentsTableHashKey}
                            name="name"
                            defaultValue={name}
                            disabled
                          />
                        </Box>
                      </Flex>
                      <Flex mx={-2} mb={3}>
                        <Box width={1 / 3} px={2}>
                          <Label htmlFor="comment">Comment</Label>
                          <Textarea
                            sx={theme.textArea}
                            id={'comment-' + CommentsTableHashKey}
                            name="comment"
                            value={comment}
                            disabled
                          />
                        </Box>
                      </Flex>
                    </Box>
                  </Box>
                );
              },
            )}
          </Box>
        </Box>
      </div>
    );
  }
};

export default Approval;
