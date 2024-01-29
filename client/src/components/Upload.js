import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {app} from '../../src/firebase';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #000000a7;
    display : flex;
    align-items : center;
    justify-content : center;
    scrollY : none;  
    z-index : 4; 
`
const Wrapper = styled.div`
    width: 600px;
    height : 700px;
    background-color: ${({ theme }) => theme.bgLighter};
    color : ${({ theme }) => theme.text};
    padding : 20px;
    display : flex;
    flex-direction : column;
    gap : 20px;
    position : relative;
    border-radius : 12px;
`
const Close = styled.div`
    position : absolute;
    top : 10px;
    right : 10px;
    cursor : pointer;
`
const Title = styled.h1`
    text-align : center;
`

const Input = styled.input`
    border : 2px solid ${({ theme }) => theme.soft};
    color : ${({ theme }) => theme.text};
    border-radius : 3px;
    padding : 10px;
    background-color : transparent;
`

const Desc = styled.textarea`
    border : 1px solid ${({ theme }) => theme.soft};
    color : ${({ theme }) => theme.text};
    border-radius : 3px;
    padding : 10px;
    background-color : transparent;
`
const Button = styled.button`
    border-radius : 3px;
    border : none;
    padding : 10px 20px;
    font-weight : 500;
    cursor : pointer;
    background-color : ${({ theme }) => theme.soft};
    color : ${({ theme }) => theme.textSoft};
`
const Label = styled.label`
    font-size : 14px;
`
const Select = styled.select`
    border : 2px solid ${({ theme }) => theme.soft};
    color : ${({ theme }) => theme.text};
    border-radius : 3px;
    padding : 10px;
    background : transparent;
`;
const Option = styled.option`
    border : 2px solid ${({ theme }) => theme.soft};
    color : ${({ theme }) => theme.text};
    background : transparent;
`;
const baseUrl = process.env.REACT_APP_URL;
const Upload = ({ setOpen }) => {
    const [img, setImg] = useState(undefined);
    const [video, setVideo] = useState(undefined);
    const [imgPercent, setImgPercent] = useState(0);
    const [videoPercent, setVideoPercent] = useState(0);
    const [inputs, setInputs] = useState({});
    const [tags, setTags] = useState([]);
    const [category, setCategory] = useState("");

    const navigate = useNavigate();

    const handleTags = (e) => {
        setTags(e.target.value.split(','));
    }
    
    const handleChange = (e) => {
        setInputs(prev => {
            return { ...prev, [e.target.name]: e.target.value };
        })
    }

    const uploadFiles = (file, urlType) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);

        const uploadTask = uploadBytesResumable(storageRef, file);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(2);
                urlType === 'imgUrl' ? setImgPercent(progress) : setVideoPercent(progress);
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default: break;
                }
            },
            (error) => { },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                    setInputs((prev) => {
                        return {...prev, [urlType] : downloadUrl};
                    })
                })
            }
        );
    }

    useEffect(() => {
        video && uploadFiles(video, 'videoUrl');
    }, [video])
    useEffect(() => {
        img && uploadFiles(img, 'imgUrl');
    }, [img])

    const handleUpload = async (e) => {
        e.preventDefault();
        const res = await axios.post(`${baseUrl}/videos`, {...inputs, tags, category});
        setOpen(false);
        res.status === 200 && navigate(`${baseUrl}/video/${res.data._id}`);
    }

    return (
        <Container>
            <Wrapper>
                <Close onClick={() => setOpen(false)}>X</Close>
                <Title>Upload a New Video</Title>
                <Input type='text' placeholder='Title' name='title' onChange={handleChange} />
                <Label>Select Video to upload</Label>
                {videoPercent > 0 ? ("Uploading " + videoPercent + " %") : (<Input type='file' accept='video/*' onChange={e => setVideo(e.target.files[0])} />)}
                <Desc type='text' placeholder='Description' name='desc' rows={8} onChange={handleChange} />
                <Label>Choose a Category:</Label>
                <Select name="cars" id="cars" onChange={(e) => setCategory(e.target.value)}>
                    <Option value="" defaultValue={null}>Category</Option>
                    <Option value="music">Music</Option>
                    <Option value="sports">Sports</Option>
                    <Option value="gaming">Gaming</Option>
                    <Option value="movies">Movies</Option>
                    <Option value="news">News</Option>
                    <Option value="live">Live</Option>
                </Select>
                <Input type='text' placeholder='Separate the tags with commas.' onChange={handleTags} />
                <Label>Thumbnail</Label>
                {imgPercent > 0 ? ("Uploading " + imgPercent + " %") : (<Input type='file' accept='image/*' onChange={e => setImg(e.target.files[0])} />)}
                <Button onClick={handleUpload}>Upload</Button>
            </Wrapper>
        </Container>
    )
}

export default Upload
