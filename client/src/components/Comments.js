import React, { useState, useEffect } from 'react'
import { styled } from 'styled-components'
import Comment from './Comment';
import { useSelector } from 'react-redux';
import axios from 'axios';


const Container = styled.div`
    display : flex;
    flex-direction : column;
`;

const NewComment = styled.div`
    display : flex;
    align-items : center;
    gap : 10px;
`;
const Avtar = styled.img`
    width : 50px;
    height : 50px;
    border-radius : 50%;
`;
const Input = styled.input`
    border : none;
    border-bottom : 1px solid ${({ theme }) => theme.soft};
    background-color : transparent;
    outline : none;
    padding : 5px;
    width : 100%;
    font-size : 13px;
    color : ${({ theme }) => theme.text};
`;
const Buttons = styled.div`
    display : flex;
    margin-top : 10px;
    align-items : center;
    gap : 10px;
    display : flex;
    justify-content : end;
`;

const Button = styled.button`
    display : flex;
    align-items : center;
    background : transparent;
    color : ${({ theme }) => theme.text};
    border-radius : 30px;
    cursor : pointer;
    padding : 8px 10px;
    &:hover {
        background-color : ${({ theme }) => theme.soft};
        border-radius : 3px;
        transition : 0.2s ease;
        transform : scale(1.1);
    }
`;

const Warning = styled.span`
    display : block;
    width : 10%;
    color : red;
    font-size : 12px;
`;

const CommentWrapper = styled.div`
    padding : 5px;
    height : auto;
`

const baseUrl = process.env.REACT_APP_URL;
const Comments = ({ videoId }) => {
    const { currentUser } = useSelector((state) => state.user);
    const { currentVideo } = useSelector((state) => state.video);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await axios.get(`${baseUrl}/comments/${videoId}`);
                setComments(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchComments();
    }, [videoId])

    // implemnting the posting of new comment on a video
    const handleCommentPost = async (newComment) => {
        if(newComment !== "") {
            try {
                if (currentUser) {
                    await axios.post(`${baseUrl}/comments`, { desc: newComment, videoId: currentVideo._id });
                } else {
                    document.getElementById('warning').innerHTML = 'Login Required';
                }
            } catch (err) {
                console.log(err);
            }
        }else {
            document.getElementById('commentInp').focus();
        }
    }

    return (
        <Container>
            <NewComment>
                {currentUser && <Avtar src={currentUser.img} />}
                <Input placeholder='Add a Comment...' onChange={(e) => setNewComment(e.target.value)} value={newComment} id = 'commentInp'/>
                <Warning id='warning' hidden></Warning>
            </NewComment>
            <Buttons>
                <Button type='clear' onClick={() => setNewComment("")}>Clear</Button>
                <Button type='submit' onClick={() => handleCommentPost(newComment)}>Submit</Button>
            </Buttons>
            <CommentWrapper>
                {comments.map((comment) => (
                    <Comment key={comment._id} comment={comment} />
                ))}
            </CommentWrapper>
        </Container>
    )
}

export default Comments
