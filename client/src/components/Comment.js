import axios from 'axios';
import React, { useState, useEffect } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from 'styled-components'
import { format } from 'timeago.js';


const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 30px 0px;
    position: relative;
`;

const Avtar = styled.img`
    flex: 1;
    width : 50px;
    height : 50px;
    border-radius : 50%;
`;

const Details = styled.div`
    flex : 18;
    display : flex;
    flex-direction : column;
    gap : 10px;
`;

const Name = styled.span`
    font-size : 13px;
    font-weight : 500;
    color : ${({ theme }) => theme.text};
`;
const Date = styled.span`
    font-size : 11px;
    font-weight : 400;
    color : ${({ theme }) => theme.textSoft};
    margin-left : 5px;
`;

const Texts = styled.p`
    font-size : 14px;
    color : ${({ theme }) => theme.text};
`;

const Button = styled.button`
    flex : 1;
    color : ${({ theme }) => theme.text};
    background : transparent;
    border : none;
    gap : 2px;
    cursor : pointer;
`
const baseUrl = process.env.REACT_APP_URL;
const Comment = ({ comment }) => {
    // const dispatch = useDispatch();
    const [channel, setChannel] = useState({});
    useEffect(() => {
        const fetchChannels = async () => {
            try {
                const res = await axios.get(`${baseUrl}/users/find/${comment.userId}`);
                setChannel(res.data);
            } catch (err) {

            }
        }
        fetchChannels();
    }, [comment.userId])

    const handleDeleteComment = async() => {
        try {
            await axios.delete(`${baseUrl}/comments/${comment._id}`)
        }catch (err) {
            console.log(err.message);
        }
    }

    return (
        <Container>
            <Avtar src={channel.img} />
            <Details>
                <Name>{channel.name} <Date>{format(channel.createdAt)}</Date></Name>
                <Texts>{comment.desc}</Texts>
            </Details>
            <Button onClick = {handleDeleteComment}><DeleteIcon /></Button>
        </Container>
    )
}

export default Comment
