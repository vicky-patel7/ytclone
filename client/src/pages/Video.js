import React, { useState, useEffect } from 'react'
import { styled } from 'styled-components'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import Comments from '../components/Comments';
import { format } from 'timeago.js';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { dislike, fetchFailure, fetchStart, fetchSuccess, like } from '../redux/videoSlice';
import { subscription } from '../redux/userSlice';
import Recommendation from '../components/Recommendation';

const Container = styled.div`
    display : flex;
    gap : 24px;
`;

const Content = styled.div`
    flex : 5;
`;

const VideoWrapper = styled.div`

`;

const Title = styled.h1`
    font-size : 18px;
    font-weight : 400;
    margin-top : 20px;
    margin-bottom : 10px;
    color : ${({ theme }) => theme.text};
`;

const Details = styled.div`
    display : flex;
    align-items : center;
    justify-content : space-between;
`;

const Info = styled.span`
    color : ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
    display : flex;
    margin-top : -12px;
    align-items : center;
    gap : 10px;
`;

const Button = styled.button`
    color : ${({ theme }) => theme.text};
    background : transparent;
    display : flex;
    justify-content : center;
    align-items : center;
    border : none;
    gap : 2px;
    cursor : pointer;
`;

const Hr = styled.h1`
    border : 0.5px solid ${({ theme }) => theme.soft};
`

const Channel = styled.div`
    display : flex;
    justify-content : space-between;
`;

const ChannelInfo = styled.div`
    display : flex;
    gap : 12px;
`;

const Image = styled.img`
    width : 50px;
    height : 50px;
    border-radius : 50%;
`;

const ChannelDetail = styled.div`
    display : flex;
    flex-direction : column;
    color : ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
    font-weight : 500;
`;

const ChannelCounter = styled.span`
    margin-top : 5px;
    margin-bottom : 5px;
    color : ${({ theme }) => theme.textSoft};
`;

const Description = styled.p`
    font-size : 14px;
`;

const Subscribe = styled.button`
    background-color : #cc1a00;
    font-weight : 500;
    color : white;
    border-radius : 3px;
    border : none;
    height : max-content;
    padding : 10px 20px;
    cursor : pointer;
    font-size : 14px;
`;

const baseUrl = process.env.REACT_APP_URL;
const handleDownload = (videoUrl, title) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function () {
        const a = document.createElement('a');
        a.href = window.URL.createObjectURL(xhr.response);
        a.download = `${title}`;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };
    xhr.open('GET', videoUrl);
    xhr.send();
}


const DownloadButton = ({ videoUrl, title }) => {
    return (
        <Button onClick={() => handleDownload(videoUrl, title)}>
            <DownloadIcon />
        </Button>
    )
};

const Video = () => {
    const { currentUser } = useSelector((state) => state.user);
    const { currentVideo } = useSelector((state) => state.video);
    const dispatch = useDispatch();
    const path = useLocation().pathname.split('/')[2];
    const [channel, setChannel] = useState({});
    useEffect(() => {
        console.log();
        const fetchData = async () => {
            try {
                dispatch(fetchStart());
                const videoRes = await axios.get(`${baseUrl}/videos/${path}`);
                const channelRes = await axios.get(`${baseUrl}/users/find/${videoRes.data.userId}`);
                dispatch(fetchSuccess(videoRes.data));
                setChannel(channelRes.data);
            } catch (err) {
                console.log(err);
                dispatch(fetchFailure(err));
            }
        }
        fetchData();
    }, [path, dispatch]);

    // window.addEventListener('load', async function () {
    //     try {
    //         await axios.put(`${baseUrl}/videos/view/${currentVideo._id}`);
    //         await axios.put(`${baseUrl}/youtube/history/${currentVideo._id}`);
    //     } catch (err) {
    //         console.log(err.message);
    //     }
    // });
    useEffect(() => {
        const addViewAndHistory = async () => {
            try {
                await axios.put(`${baseUrl}/videos/view/${currentVideo._id}`);
                await axios.put(`${baseUrl}/youtube/history/${currentVideo._id}`);
            } catch (err) {
                console.log(err.message);
            }
        }
        addViewAndHistory();
    }, [currentVideo._id])
    const handleLikes = async () => {
        if (currentUser) {
            await axios.put(`${baseUrl}/users/like/${currentVideo._id}`);
            currentUser && dispatch(like(currentUser._id))
        }
    }
    const handleDisLikes = async () => {
        if (currentUser) {
            await axios.put(`${baseUrl}/users/dislike/${currentVideo._id}`);
            currentUser && dispatch(dislike(currentUser._id));
        }
    }
    const handleSubscribe = async () => {
        if (!currentUser) {
            return;
        }
        currentUser && channel && currentUser.subscribedUsers.includes(channel._id)
            ? await axios.put(`${baseUrl}/users/unsub/${channel._id}`)
            : await axios.put(`${baseUrl}/users/sub/${channel._id}`);
        channel && dispatch(subscription(channel._id));
    }

    const handleShare = async (event) => {
        let vidTitle = currentVideo.title;
        let url = document.querySelector('link[rel=canonical]') ? document.querySelector('link[rel=canonical]').href : document.location.href;
        try {
            if (navigator.share) {
                await navigator.share({
                    title: vidTitle,
                    text: 'Check out this amazing video',
                    url: url
                })
            } else {
                throw new Error('Web Share API not supported');
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            {currentVideo && (
                <Container>
                    <Content>
                        <VideoWrapper>
                            <iframe width="100%" height="390" src={currentVideo.videoUrl} title="YouTube video player" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                        </VideoWrapper>
                        <Title>{currentVideo.title}</Title>
                        <Details>
                            <Info>
                                {/* eslint-disable-next-line */}
                                {currentVideo.views} Views | {format(currentVideo.createdAt)}
                                {/* eslint-disable-next-line */}
                            </Info>
                            <Buttons>
                                <Button onClick={handleLikes}>{currentUser && currentVideo.likes?.includes(currentUser._id) ? (<ThumbUpIcon />) : (<ThumbUpOutlinedIcon />)}{currentVideo.likes?.length}</Button>
                                <Button onClick={handleDisLikes}>{currentUser && currentVideo.dislikes?.includes(currentUser._id) ? (<ThumbDownIcon />) : (<ThumbDownOutlinedIcon />)}</Button>
                                <Button onClick={handleShare}><ShareIcon /></Button>
                                <DownloadButton videoUrl={currentVideo.videoUrl} title={currentVideo.title} />
                            </Buttons>
                        </Details>
                        <Hr />
                        <Channel>
                            <ChannelInfo>
                                <Image src={channel.img} />
                                <ChannelDetail>
                                    <ChannelName>{channel.name}</ChannelName>
                                    <ChannelCounter>{channel.subscribers} Subscribers</ChannelCounter>
                                    <Description>
                                        {channel.description}
                                    </Description>
                                </ChannelDetail>
                            </ChannelInfo>
                            <Subscribe onClick={handleSubscribe}>{currentUser && channel && currentUser.subscribedUsers?.includes(channel._id) ? "SUBSCRIBED" : "SUBSCRIBE"}</Subscribe>
                        </Channel>
                        <Comments videoId={currentVideo._id} />
                    </Content>
                    <Recommendation tags={currentVideo.tags} />
                </Container>
            )}
        </>
    )
};
export default Video
