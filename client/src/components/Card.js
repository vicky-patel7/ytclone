import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { styled } from 'styled-components'
import axios from 'axios';
import { format } from 'timeago.js';

const Container = styled.div`
    flex-basis : ${(props) => props.type !== 'sm' && '320px'};
    margin-bottom : ${(props) => props.type === 'sm' ? '10px' : '20px'};
    display : ${(props) => props.type === 'sm' && 'flex'};
    cursor : pointer;
    gap : 4px;
`;
const Image = styled.img`
    width : ${(props) => props.type === 'sm' ? '120px' : '300px'};
    height : ${(props) => props.type === 'sm' ? '100px' : '202px'};
    background-color : #999;
    flex : 1;
`;

const Details = styled.div`
    display : flex;
    margin-top : ${(props) => props.type !== 'sm' && '16px'};
    gap : 12px;
    flex : 1;
`;

const ChannelImage = styled.img`
    width : 36px;
    height : 36px;
    border-radius : 50%;
    background-color : #999;
    display : ${(props) => props.type === 'sm' && 'none'};
`;

const Texts = styled.div`
    margin-top : -10px;
`;
const Title = styled.h1`
    font-size : 16px;
    font-weight : 500;
    color : ${({ theme }) => theme.text};
`;
const ChannelName = styled.h2`
    font-size : 14px;
    color : ${({ theme }) => theme.textSoft};
    margin : 9px 0px;
`;
const Info = styled.div`
    color : ${({ theme }) => theme.textSoft};
`
const baseUrl = process.env.REACT_APP_URL;
const Card = ({ type, video }) => {
    const [channel, setChannel] = useState({});
    useEffect(() => {
        const fetchChannel = async () => {
            const res = await axios.get(`${baseUrl}/users/find/${video.userId}`);
            setChannel(res.data);
        }
        fetchChannel();
    }, [video.userId]);
    return (
        <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
            <Container type={type}>
                <Image type={type} src={video.imgUrl} />
                <Details type={type}>
                    <ChannelImage type={type} src={channel.img} />
                    <Texts>
                        <Title>{video.title}</Title>
                        <ChannelName>{channel.name}</ChannelName>
                        {/* eslint-disable-next-line */}
                        <Info>{video.views} views | {format(video.createdAt)}</Info>
                        {/* eslint-disable-next-line */}
                    </Texts>
                </Details>
            </Container>
        </Link>
    )
}

export default Card
