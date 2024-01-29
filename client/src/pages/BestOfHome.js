import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import Card from '../components/Card'
import axios from 'axios';

const Container = styled.div`
    display : flex;
    justify-content : space-around;
    flex-wrap : wrap;
    gap : 1px;
`;

const baseUrl = process.env.REACT_APP_URL;
const BestOfHome = ({type}) => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`${baseUrl}/youtube/${type}`);
      setVideos(res.data);
    }
    fetchVideos();
  }, [type])

  return (
    <Container>
      {videos.length > 0 && videos.map(video => (<Card key={video._id} video={video} />))}
    </Container>
  )
}

export default BestOfHome;
